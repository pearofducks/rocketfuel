import { variantMatcher, variantParentMatcher } from '../utils';
export const variantColorsMediaOrClass = (options = {}) => {
    if ((options === null || options === void 0 ? void 0 : options.dark) === 'class' || typeof options.dark === 'object') {
        const { dark = '.dark', light = '.light' } = typeof options.dark === 'string'
            ? {}
            : options.dark;
        return [
            variantMatcher('dark', input => ({ prefix: `${dark} $$ ${input.prefix}` })),
            variantMatcher('light', input => ({ prefix: `${light} $$ ${input.prefix}` })),
        ];
    }
    return [
        variantParentMatcher('dark', '@media (prefers-color-scheme: dark)'),
        variantParentMatcher('light', '@media (prefers-color-scheme: light)'),
    ];
};
