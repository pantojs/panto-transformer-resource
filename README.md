# panto-transformer-resource
[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency status][david-dm-image]][david-dm-url] [![Dev Dependency status][david-dm-dev-image]][david-dm-dev-url] [![Coverage Status][coveralls-image]][coveralls-url]

Resource transformer for panto.

```js
panto.loadTransformer('resource');

panto.pick('**/*.html').read().resource({
    getResourceAlias: res => {
        return 'http://cdn.com/' + res;
    }
});
```

## options
 - getResourceAlias: function

[npm-url]: https://npmjs.org/package/panto-transformer-resource
[downloads-image]: http://img.shields.io/npm/dm/panto-transformer-resource.svg
[npm-image]: http://img.shields.io/npm/v/panto-transformer-resource.svg
[travis-url]: https://travis-ci.org/pantojs/panto-transformer-resource
[travis-image]: http://img.shields.io/travis/pantojs/panto-transformer-resource.svg
[david-dm-url]:https://david-dm.org/pantojs/panto-transformer-resource
[david-dm-image]:https://david-dm.org/pantojs/panto-transformer-resource.svg
[david-dm-dev-url]:https://david-dm.org/pantojs/panto-transformer-resource#info=devDependencies
[david-dm-dev-image]:https://david-dm.org/pantojs/panto-transformer-resource/dev-status.svg
[coveralls-image]:https://coveralls.io/repos/github/pantojs/panto-transformer-resource/badge.svg?branch=master
[coveralls-url]:https://coveralls.io/github/pantojs/panto-transformer-resource?branch=master
