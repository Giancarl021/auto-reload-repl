const chokidar = require('chokidar');
const locate = require('@giancarl021/locate');
const repl = require('repl');

async function main({ target, moduleName = 'm' }) {
    const path = require.resolve(locate(target, true));

    const r = repl.start({
        input: process.stdin,
        output: process.stdout
    });

    const ch = chokidar.watch(path, {
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
        delete require.cache[path];
        r.context[moduleName] = require(path);
    }
}

module.exports = main;