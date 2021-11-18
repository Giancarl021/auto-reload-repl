# auto-reload-repl
Auto Reloads REPL if target folder is changed

### Installation (Global/CLI)

npm:
```bash
npm install --global auto-reload-repl
```

Yarn:
```bash
yarn global add auto-reload-repl
```

### Usage

#### API

```javascript
const repl = require('auto-reload-repl');

repl({
    target: 'path/to/module', // Required
    moduleName: 'myModule', // Optional, default: "m"
    input: process.stdin, // Optional, default: process.stdin
    output: process.stdout // Optional, default: process.stdout
}).catch(console.error);
```

Parameters:

* ``target``: The path to the module to be loaded;
* ``moduleName``: The variable name used in the global context;
* ``input``: The input stream;
* ``output``: The output stream.

#### CLI

```bash
repl-ar <target> [-m|--module-name <moduleName>]
```

Arguments:

* ``target``: **Required**, the path to the module to be loaded.

Flags:

* ``-m`` or ``--module-name``: **Optional**, the variable name used in the global context.