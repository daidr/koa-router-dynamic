/**
 * RESTful resource routing middleware for koa.
 *
 * @author daidr <daidr@daidr.me>
 * @link https://github.com/daidr/koa-router-dynamic
 */

const Router = require('@koa/router');


/**
 * Search routes in the stack by path(s).
 *
 * @example
 *
 * ```javascript
 * const Koa = require('koa');
 * const Router = require('koa-router-dynamic');
 *
 * const app = new Koa();
 * const router = new Router();
 * 
 * router.get("/example/:id", ctx => {
 *   ctx.body = "test";
 * })
 *
 * app.use(router.routes());
 * 
 * console.log(router.searchRoutesByPath("/example/:id"));
 * ```
 * 
 * @param {String|Array.<String>} path Path string(Array).
 * @returns {Array.<Layer>}
 */

Router.prototype.searchRoutesByPath = function (path) {
    const stack = this.stack;
    let result = [];

    // support array of paths
    if (Array.isArray(path)) {
        for (let layer of stack) {
            if (path.includes(layer.path)) {
                result.push(layer);
            }
        }
    } else {
        for (let layer of stack) {
            if (path === layer.path) {
                result.push(layer);
            }
        }
    }

    return result;
};


/**
 * Search routes in the stack by custom handler.
 * 
 * @example
 *
 * ```javascript
 * const Koa = require('koa');
 * const Router = require('koa-router-dynamic');
 *
 * const app = new Koa();
 * const router = new Router();
 *
 * router.get("/example/:id", ctx => {
 *   ctx.body = "test";
 * })
 *
 * app.use(router.routes());
 *
 * console.log(router.searchRoutes(layer => layer.path === "/example/:id"));
 * ```
 * 
 * @param {Function} handler Handler function.
 * @returns {Array.<Layer>}
 */

Router.prototype.searchRoutes = function (handler) {
    const stack = this.stack;
    let result = [];

    for (let layer of stack) {
        if (handler(layer)) {
            result.push(layer);
        }
    }
    return result;
};

/**
 * Remove all routes in the stack.
 * 
 * @example
 *
 * ```javascript
 * const Koa = require('koa');
 * const Router = require('koa-router-dynamic');
 *
 * const app = new Koa();
 * const router = new Router();
 *
 * router.get("/example/:id", ctx => {
 *   ctx.body = "test";
 * })
 *
 * app.use(router.routes());
 *
 * router.delAllRoutes();
 * ```
 * 
 * @returns {Router}
 */

Router.prototype.removeAllRoutes = function () {
    this.stack = [];
    return this;
};

/**
 * Remove routes in the stack.
 * 
 * @example
 *
 * ```javascript
 * const Koa = require('koa');
 * const Router = require('koa-router-dynamic');
 *
 * const app = new Koa();
 * const router = new Router();
 *
 * router.get("/example/:id", ctx => {
 *   ctx.body = "test";
 * })
 *
 * app.use(router.routes());
 *
 * let routesToRemove = router.searchRoutes(layer => layer.path === "/example/:id");
 * router.removeRoutes(routesToRemove);
 * ```
 * 
 * @param {Layer|Array.<Layer>} routes routes to remove.
 * @returns {Router}
 */

Router.prototype.removeRoutes = function (routes) {
    const stack = this.stack;

    // support array of routes
    if (Array.isArray(routes)) {
        for (let layer of routes) {
            stack.splice(stack.findIndex(e => e === layer), 1);
        }
    } else {
        stack.splice(stack.findIndex(e => e === routes), 1);
    }

    return this;
};