# rollup-plugin-legacy

Add `export` declarations to legacy non-module scripts.

## Installation

```bash
npm install --save-dev rollup-plugin-legacy
```

## Motivation

Occasionally you'll find a useful snippet of code from the Old Days, before newfangled technology like npm. These scripts will typically expose themselves as `var someLibrary = ...` or `window.someLibrary = ...`, the expectation being that other scripts will grab a reference to the library from the global namespace.

It's usually easy enough to convert these to modules. But why bother? You can just add the `legacy` plugin, configure it accordingly, and it will be turned into a module automatically. With the example config below, the following code...

```js
// vendor/some-library.js
var someLibrary = {
  square: function(n) {
    return n * n;
  },
  cube: function(n) {
    return n * n * n;
  }
};
```

...will have a default export appended to it, allowing other modules to access it:

```js
export default someLibrary;
```

It can also handle named exports. Using the same config, this...

```js
// vendor/another-library.js
var anotherLibrary = {
  foo: ...,
  bar: ...,
  baz: ...
};
```

...will get the following appended:

```js
var __export0 = anotherLibrary.foo; export { __export0 as foo };
var __export0 = anotherLibrary.bar; export { __export0 as bar };
var __export0 = anotherLibrary.baz; export { __export0 as baz };
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
