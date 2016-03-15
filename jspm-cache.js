/**
 * SystemJS hook that caches load and transpilation results of sources that haven't changed in IndexedDB storage.
 * In Chrome dev tools the cache is easily managed under Resources > IndexedDB > jspm
 * There's a global dependency on Dexie.js (ex: //npmcdn.com/dexie@1.3.3/dist/dexie.min.js)
 * Add the following to your index.ghtml <script src="http://npmcdn.com/dexie@1.3.3/dist/dexie.min.js"></script>
 * Adapted from https://gist.github.com/ineentho/70303c2ccdb69ad3661d
 */
;(function(){
    var db = new Dexie("jspm");
    db.version(1).stores({ files: "&url,format,hash,contents" });
    db.open();

    var log = console.log.bind(console);

    function hash(str) {
        // Source: http://stackoverflow.com/a/7616484/502126
        var hash = 0, i, chr, len
        if (str.length === 0) return hash
        for (i = 0, len = str.length; i < len; i++) {
            chr   = str.charCodeAt(i)
            hash  = ((hash << 5) - hash) + chr
            hash |= 0
        }
        return hash.toString()
    }

    var cachedCall = function(loader, load, file, originalFunction, filter) {
        if (!filter || filter(load)) {
            return db.files.where('url').equals(file.url).first().then(function(cached) {
                if (!cached || cached.hash != file.hash) {
                    // console.log(file.url + " not in cache");
                    return originalFunction.apply(loader, [load]).then(function(translated) {
                        file.format = load.metadata.format;
                        file.contents = translated;
                        return (cached ? db.files.delete(file.url) : Promise.resolve())
              						.then(db.files.add(file))
              						.then(function() {
              							return translated;
              						}).catch(log);
                    });
                } else {
                    // console.log(file.url + " from cache");
                    load.metadata.format = cached.format || undefined;
                    return cached.contents;
                }
            }).catch(log);
        } else {
          return originalFunction.apply(loader, [load]);
        }
    }

    var onlyScriptDependencies = /.*\/jspm_packages\/.*\.[tj]s/;

    // override fetch
    System.originalFetch = System.fetch;
    System.fetch = function (load) {
      if (!load.metadata.deps) {
          load.metadata.deps = []; // avoid https://github.com/systemjs/systemjs/pull/1158
      }
        var file = {url:"load_"+load.address, hash:hash(load.address)};
        return cachedCall(this, load, file, System.originalFetch, function() {
          return load.address.search(onlyScriptDependencies)>=0;
        });

    }

    // override translate
    System.originalTranslate = System.translate;
    System.translate = function (load) {
        if (!load.metadata.deps) {
            load.metadata.deps = []; // avoid https://github.com/systemjs/systemjs/pull/1158
        }

        var file = {url:"translate_"+load.address, hash:hash(load.source)};
        return cachedCall(this, load, file, System.originalTranslate);

    }
})();
