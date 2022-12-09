import { entriesToCss, toArray } from '@unocss/core';
export const preflights = [
    {
        layer: 'preflights',
        getCSS(ctx) {
            var _a;
            if (ctx.theme.preflightBase) {
                const css = entriesToCss(Object.entries(ctx.theme.preflightBase));
                const roots = toArray((_a = ctx.theme.preflightRoot) !== null && _a !== void 0 ? _a : ['*,::before,::after', '::backdrop']);
                return roots.map(root => `${root}{${css}}`).join('');
            }
        },
    },
];
