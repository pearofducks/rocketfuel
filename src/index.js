import { preflights } from './preflights';
import { rules } from './rules';
import { theme } from './theme';
import { variants } from './variants';
export { preflights } from './preflights';
export { theme, colors } from './theme';
export { parseColor } from './utils';

// console.log({ rules })
for (const r of rules) {
  const lastProp = r.at(-1)
  if (typeof lastProp === 'object' && lastProp.core) {
    console.log("OMG", r)
  }
}

/** @type {import('@unocss/core').Preset<object>} */
export const presetMini = (options = {}) => {
  // options.dark = options.dark ?? 'class'; // we do not want to support darkmode via a class by default
  options.attributifyPseudo = options.attributifyPseudo ?? false;
  options.preflight = options.preflight ?? true;
  console.log("OPTIONS", options)
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
