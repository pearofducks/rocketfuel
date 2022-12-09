import { warnOnce } from '@unocss/core';
import { handler as h, variantGetParameter } from '../utils';
export const variantContainerQuery = {
    name: '@',
    match(matcher, { theme }) {
        var _a, _b;
        if (matcher.startsWith('@container'))
            return;
        const variant = variantGetParameter('@', matcher, [':', '-']);
        if (variant) {
            const [match, rest, label] = variant;
            const unbracket = h.bracket(match);
            let container;
            if (unbracket) {
                const minWidth = h.numberWithUnit(unbracket);
                if (minWidth)
                    container = `(min-width: ${minWidth})`;
            }
            else {
                container = (_b = (_a = theme.containers) === null || _a === void 0 ? void 0 : _a[match]) !== null && _b !== void 0 ? _b : '';
            }
            if (container) {
                warnOnce('The container query variant is experimental and may not follow semver.');
                return {
                    matcher: rest,
                    handle: (input, next) => next({
                        ...input,
                        parent: `${input.parent ? `${input.parent} $$ ` : ''}@container${label ? ` ${label} ` : ' '}${container}`,
                    }),
                };
            }
        }
    },
    multiPass: true,
};
