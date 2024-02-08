import logger from '../config/logger.js';

const logRegisteredRoutes = (app) => {
    app._router.stack.forEach(print.bind(null, []));
};

function print(path, layer) {
    if (layer.route) {
        layer.route.stack.forEach(print.bind(null, path.concat(split(layer.route.path))));
    } else if (layer.name === 'router' && layer.handle.stack) {
        layer.handle.stack.forEach(print.bind(null, path.concat(split(layer.regexp))));
    } else if (layer.method) {
        logger.silly(
            '%s /%s',
            layer.method.toUpperCase(),
            path.concat(split(layer.regexp)).filter(Boolean).join('/'),
        );
    }
}

function split(thing) {
    if (typeof thing === 'string') {
        return thing.split('/');
    }

    if (thing.fast_slash) {
        return '';
    }

    const match = thing
        .toString()
        .replace('\\/?', '')
        .replace('(?=\\/|$)', '$')
        .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//);

    return match
        ? match[1].replace(/\\(.)/g, '$1').split('/')
        : `'<complex:'${thing.toString()}'>'`;
}

export default logRegisteredRoutes;
