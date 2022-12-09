import { preflights } from './preflights.js';
import { rules } from './rules.js';
import { theme } from './theme.js';
import { variants } from './variants.js';
export { preflights } from './preflights.js';
export { theme, colors } from './theme.js';
export { parseColor } from './utils.js';

export const presetMini = (options = {}) => {
    var _a, _b, _c;
    options.dark = (_a = options.dark) !== null && _a !== void 0 ? _a : 'class';
    options.attributifyPseudo = (_b = options.attributifyPseudo) !== null && _b !== void 0 ? _b : false;
    options.preflight = (_c = options.preflight) !== null && _c !== void 0 ? _c : true;
    return {
        name: '@unocss/preset-mini',
        theme,
        rules,
        variants: variants(options),
        options,
        postprocess: options.variablePrefix && options.variablePrefix !== 'un-'
            ? VarPrefixPostprocessor(options.variablePrefix)
            : undefined,
        preflights: options.preflight ? preflights : [],
        prefix: options.prefix,
    };
};

export default presetMini;

function VarPrefixPostprocessor(prefix) {
    return (obj) => {
        obj.entries.forEach((i) => {
            i[0] = i[0].replace(/^--un-/, `--${prefix}`);
            if (typeof i[1] === 'string')
                i[1] = i[1].replace(/var\(--un-/g, `var(--${prefix}`);
        });
    };
}
