import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './_astro/_@astrojs-ssr-adapter.CvSoi7hX.js';
import { manifest } from './manifest__bYoGhtR.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/admin.astro.mjs');
const _page2 = () => import('./pages/bodas-de-destino-medellin.astro.mjs');
const _page3 = () => import('./pages/bodas-destino-guia-invitados.astro.mjs');
const _page4 = () => import('./pages/bodas-igualitarias.astro.mjs');
const _page5 = () => import('./pages/catering-bodas-gourmet.astro.mjs');
const _page6 = () => import('./pages/en/wedding-destination.astro.mjs');
const _page7 = () => import('./pages/en.astro.mjs');
const _page8 = () => import('./pages/es.astro.mjs');
const _page9 = () => import('./pages/lugares/_id_.astro.mjs');
const _page10 = () => import('./pages/lugares-bodas-eventos.astro.mjs');
const _page11 = () => import('./pages/requisitos-legales-bodas-destino-colombia.astro.mjs');
const _page12 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/admin.astro", _page1],
    ["src/pages/bodas-de-destino-medellin.astro", _page2],
    ["src/pages/bodas-destino-guia-invitados.astro", _page3],
    ["src/pages/bodas-igualitarias.astro", _page4],
    ["src/pages/catering-bodas-gourmet.astro", _page5],
    ["src/pages/en/wedding-destination.astro", _page6],
    ["src/pages/en/index.astro", _page7],
    ["src/pages/es/index.astro", _page8],
    ["src/pages/lugares/[id].astro", _page9],
    ["src/pages/lugares-bodas-eventos.astro", _page10],
    ["src/pages/requisitos-legales-bodas-destino-colombia.astro", _page11],
    ["src/pages/index.astro", _page12]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "3af26520-1df4-44cb-bc6d-4c06cd36e1de"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
