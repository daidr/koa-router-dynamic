import Router from '@koa/router'
import Layer from '@koa/router/lib/layer'

interface Router {
    searchRoutesByPath(path: string | Array<string>): Array<Layer>

    searchRoutes(handler: (layer: Layer) => Array<Layer>): Array<Layer>

    removeAllRoutes(): Router

    removeRoutes(routes: Layer | Array<Layer>): Router
}