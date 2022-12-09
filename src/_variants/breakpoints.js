import { resolveBreakpoints } from '../utils';
const regexCache = {};
export const calcMaxWidthBySize = (size) => {
    var _a;
    const value = ((_a = size.match(/^-?[0-9]+\.?[0-9]*/)) === null || _a === void 0 ? void 0 : _a[0]) || '';
    const unit = size.slice(value.length);
    const maxWidth = (parseFloat(value) - 0.1);
    return Number.isNaN(maxWidth) ? size : `${maxWidth}${unit}`;
};
export const variantBreakpoints = {
    name: 'breakpoints',
    match(matcher, context) {
        var _a;
        const variantEntries = Object.entries((_a = resolveBreakpoints(context)) !== null && _a !== void 0 ? _a : {}).map(([point, size], idx) => [point, size, idx]);
        for (const [point, size, idx] of variantEntries) {
            if (!regexCache[point])
                regexCache[point] = new RegExp(`^((?:[al]t-)?${point}[:-])`);
            const match = matcher.match(regexCache[point]);
            if (!match)
                continue;
            const [, pre] = match;
            const m = matcher.slice(pre.length);
            // container rule is responsive, but also is breakpoint aware
            // it is handled on its own module (container.ts) and so we
            // exclude it from here
            if (m === 'container')
                continue;
            const isLtPrefix = pre.startsWith('lt-');
            const isAtPrefix = pre.startsWith('at-');
            let order = 1000; // parseInt(size)
            if (isLtPrefix) {
                order -= (idx + 1);
                return {
                    matcher: m,
                    handle: (input, next) => next({
                        ...input,
                        parent: `${input.parent ? `${input.parent} $$ ` : ''}@media (max-width: ${calcMaxWidthBySize(size)})`,
                        parentOrder: order,
                    }),
                };
            }
            order += (idx + 1);
            // support for windicss @<breakpoint> => last breakpoint will not have the upper bound
            if (isAtPrefix && idx < variantEntries.length - 1) {
                return {
                    matcher: m,
                    handle: (input, next) => next({
                        ...input,
                        parent: `${input.parent ? `${input.parent} $$ ` : ''}@media (min-width: ${size}) and (max-width: ${calcMaxWidthBySize(variantEntries[idx + 1][1])})`,
                        parentOrder: order,
                    }),
                };
            }
            return {
                matcher: m,
                handle: (input, next) => next({
                    ...input,
                    parent: `${input.parent ? `${input.parent} $$ ` : ''}@media (min-width: ${size})`,
                    parentOrder: order,
                }),
            };
        }
    },
    multiPass: true,
    autocomplete: '(at-|lt-|)$breakpoints:',
};
