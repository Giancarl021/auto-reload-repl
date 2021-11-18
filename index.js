const chokidar = require('chokidar');
const repl = require('repl');
const fs = require('fs');
const { dirname } = require('path');

async function main({ target, moduleName = 'm', input = process.stdin, output = process.stdout }) {
    const dirPath = fs.lstatSync(target).isDirectory() ? target : dirname(target);
    const path = require.resolve(target);

    const r = repl.start({
        input,
        output
    });

    const ch = chokidar.watch(dirPath, {
        ignoreInitial: true
    });

    ch.on('all', async () => {
        r.output.write('\n[REPL-AR] Reloading module...\n');
        reloadModule();
        r.output.write('[REPL-AR] Module reloaded!');
        r.write('\n');
    });

    r.on('close', () => ch.close());

    reloadModule();

    function reloadModule() {
        Object.keys(require.cache).forEach(key => {
            delete require.cache[key];
        });
        r.context[moduleName] = require(path);
    }
}

module.exports = main;