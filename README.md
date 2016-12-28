# rollup-plugin-legacy

Add `export` declarations to legacy non-module scripts.

## Installation

```bash
npm install --save-dev rollup-plugin-legacy
```

## Usage

```js
// rollup.config.js
import legacy from 'rollup-plugin-legacy';

export default {
  entry: 'src/main.js',
  dest: 'bundle.js',
  format: 'iife',
  plugins: [
    legacy({
      // add a default export, corresponding to `someLibrary`
      'vendor/some-library.js': 'someLibrary',

      // add named exports
      'vendor/another-library.js': {
        foo: 'anotherLib.foo',
        bar: 'anotherLib.bar',
        baz: 'anotherLib.baz'
      }
    })
  ]
}
```

## License

MIT
