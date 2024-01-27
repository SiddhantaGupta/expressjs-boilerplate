import express from 'express';
import rootRoutes from './rootRoutes.js';
import authRoutes from './authRoutes.js';

const router = express.Router();

const defaultRoutes = [
    { path: '/', routes: rootRoutes },
    { path: '/auth', routes: authRoutes },
];

const devRoutes = [
    // routes available only in development mode like swagger docs
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.routes);
});

if (process.env.NODE_ENV === 'development') {
    devRoutes.forEach((route) => {
        router.use(route.path, route.route);
    });
}

export default router;
