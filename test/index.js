/**
 * Module tests
 */

const http = require('http');
const Koa = require('koa');
const request = require('supertest');
const Router = require('@koa/router');
require('../');
const expect = require('expect.js');

describe('Router Remove', function () {
  describe('Router Remove', function () {
    it('Remove All Routes', function (done) {
      const app = new Koa();
      const router = new Router();

      router.get('/test', function (ctx, next) {
        ctx.body = 'ok';
      });

      app.use(router.routes());

      router.removeAllRoutes();
      request(http.createServer(app.callback()))
        .get('/test')
        .expect(404)
        .end(function (err, res) {
          if (err) return done(err);
          done();
        });
    });

    it('Search Routes By Path', function (done) {
      const router = new Router();

      router.get('/test/1/:id', function (ctx, next) {
        ctx.body = 'ok';
      });

      router.get('/test/2/:id', function (ctx, next) {
        ctx.body = 'ok';
      });

      router.get('/test/2/:id', function (ctx, next) {
        ctx.body = 'ok';
      });

      const ret = router.searchRoutesByPath('/test/2/:id');
      expect(ret).to.be.an('array');
      expect(ret.length).to.be.equal(2);
      done();
    });

    it('Search Routes By Paths', function (done) {
      const router = new Router();

      router.get('/test/1/:id', function (ctx, next) {
        ctx.body = 'ok';
      });

      router.get('/test/2/:id', function (ctx, next) {
        ctx.body = 'ok';
      });

      router.get('/test/2/:id', function (ctx, next) {
        ctx.body = 'ok';
      });

      const ret = router.searchRoutesByPath(['/test/2/:id', '/test/1/:id']);
      expect(ret).to.be.an('array');
      expect(ret.length).to.be.equal(3);
      done();
    });

    it('Search Routes By Custom Handler', function (done) {
      const router = new Router();

      router.get('/test/1/:id', function (ctx, next) {
        ctx.body = 'ok';
      });

      router.get('/test/2/:id', function (ctx, next) {
        ctx.body = 'ok';
      });

      router.get('/test/2/:id', function (ctx, next) {
        ctx.body = 'ok';
      });

      const ret = router.searchRoutes(layer => ['/test/1/:id'].includes(layer.path));
      expect(ret).to.be.an('array');
      expect(ret.length).to.be.equal(1);
      done();
    });

    it('Remove Routes', function (done) {
      const app = new Koa();
      const router = new Router();

      router.get('/test/1/:id', function (ctx, next) {
        ctx.body = 'ok';
      });

      router.get('/test/2/:id', function (ctx, next) {
        ctx.body = 'ok';
      });

      router.get('/test/2/:id', function (ctx, next) {
        ctx.body = 'ok';
      });

      app.use(router.routes());

      const ret = router.searchRoutesByPath('/test/2/:id');

      router.removeRoutes(ret);

      request(http.createServer(app.callback()))
        .get('/test/2/2')
        .expect(404)
        .end(function (err, res) {
          if (err) return done(err);
          request(http.createServer(app.callback()))
            .get('/test/1/2')
            .expect(200)
            .end(function (err, res) {
              if (err) return done(err);
              done();
            });
        });
    });
  });
});