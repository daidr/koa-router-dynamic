# [koa-router-dynamic](https://github.com/daidr/koa-router-dynamic)

> A patch for [@koa/router](https://github.com/koajs/router).

[![NPM version](https://img.shields.io/npm/v/koa-router-dynamic.svg?style=flat)](https://npmjs.org/package/koa-router-dynamic) 
[![NPM Downloads](https://img.shields.io/npm/dm/koa-router-dynamic.svg?style=flat)](https://npmjs.org/package/koa-router-dynamic) 
[![Node.js Version](https://img.shields.io/node/v/koa-router-dynamic.svg?style=flat)](http://nodejs.org/download/)

* Search routes by path(s)
* Search routes by custom handler
* Remove routes without restarting the process

## Installation

```bash
# npm .. 
npm i koa-router-dynamic
# yarn .. 
yarn add koa-router-dynamic
```

## Usage

### router.searchRoutesByPath(path) ⇒ <code>Array.&lt;Layer&gt;</code>
Search routes in the stack by path(s).

**Kind**: instance method of Router  

| Param | Type                                                     | Description         |
|-------|----------------------------------------------------------|---------------------|
| path  | <code>String</code> \| <code>Array.&lt;String&gt;</code> | Path string(Array). |

**Example**  
```javascript
const Koa = require('koa');
const Router = require('@koa/router');
require('koa-router-dynamic');

const app = new Koa();
const router = new Router();

router.get("/example/:id", ctx => {
  ctx.body = "test";
})

app.use(router.routes());

console.log(router.searchRoutesByPath("/example/:id"));
```

### router.searchRoutes(handler) ⇒ <code>Array.&lt;Layer&gt;</code>
Search routes in the stack by custom handler.

**Kind**: instance method of Router

| Param   | Type                  | Description       |
|---------|-----------------------|-------------------|
| handler | <code>function</code> | Handler function. |

**Example**  
```javascript
const Koa = require('koa');
const Router = require('@koa/router');
require('koa-router-dynamic');

const app = new Koa();
const router = new Router();

router.get("/example/:id", ctx => {
  ctx.body = "test";
})

app.use(router.routes());

console.log(router.searchRoutes(layer => layer.path === "/example/:id"));
```


### router.removeAllRoutes() ⇒ <code>Router</code>
Remove all routes in the stack.

**Kind**: instance method of Router
**Example**  
```javascript
const Koa = require('koa');
const Router = require('@koa/router');
require('koa-router-dynamic');

const app = new Koa();
const router = new Router();

router.get("/example/:id", ctx => {
  ctx.body = "test";
})

app.use(router.routes());

router.removeAllRoutes();
```

### router.removeRoutes(layers) ⇒ <code>Router</code>
Remove routes in the stack.

**Kind**: instance method of Router

| Param  | Type                                                   | Description       |
|--------|--------------------------------------------------------|-------------------|
| layers | <code>Layer</code> \| <code>Array.&lt;Layer&gt;</code> | layers to remove. |

**Example**  
```javascript
const Koa = require('koa');
const Router = require('@koa/router');
require('koa-router-dynamic');

const app = new Koa();
const router = new Router();

router.get("/example/:id", ctx => {
  ctx.body = "test";
})

app.use(router.routes());

let routesToRemove = router.searchRoutes(layer => layer.path === "/example/:id");
router.removeRoutes(routesToRemove);
```

## Contributing

Please submit all issues and pull requests to the [daidr/koa-router-dynamic](http://github.com/daidr/koa-router-dynamic) repository!

## Support

If you have any problem or suggestion please open an issue [here](https://github.com/daidr/koa-router-dynamic/issues).

## License

[MIT](LICENSE)