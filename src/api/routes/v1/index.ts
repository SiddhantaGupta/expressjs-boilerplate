import express from 'express';
import config from '../../../config/config.js';
import rootRoutes from './root.routes.js';
import authRoutes from './auth.routes.js';
import Environments from '../../../globals/Environments.js';
import { Router } from 'express';

const router = express.Router();

type RouteObject = {
    path: string;
    routes: Router;
};

const defaultRoutes: RouteObject[] = [
    { path: '/', routes: rootRoutes },
    { path: '/auth', routes: authRoutes },
];

const devRoutes: RouteObject[] = [
    // routes available only in local or development mode like swagger docs
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.routes);
});

if (config.env == Environments.Local || config.env === Environments.Development) {
    devRoutes.forEach((route) => {
        router.use(route.path, route.routes);
    });
}

export default router;
