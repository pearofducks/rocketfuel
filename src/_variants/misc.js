import { getBracket, handler as h, variantGetBracket, variantGetParameter } from '../utils';
export const variantSelector = {
    name: 'selector',
    match(matcher) {
        const variant = variantGetBracket('selector-', matcher, [':', '-']);
        if (variant) {
            const [match, rest] = variant;
            const selector = h.bracket(match);
            if (selector) {
                return {
                    matcher: rest,
                    selector: () => selector,
                };
            }
        }
    },
};
export const variantCssLayer = {
    name: 'layer',
    match(matcher) {
        var _a;
        const variant = variantGetParameter('layer-', matcher, [':', '-']);
        if (variant) {
            const [match, rest] = variant;
            const layer = (_a = h.bracket(match)) !== null && _a !== void 0 ? _a : match;
            if (layer) {
                return {
                    matcher: rest,
                    handle: (input, next) => next({
                        ...input,
                        parent: `${input.parent ? `${input.parent} $$ ` : ''}@layer ${layer}`,
                    }),
                };
            }
        }
    },
};
export const variantInternalLayer = {
    name: 'uno-layer',
    match(matcher) {
        var _a;
        const variant = variantGetParameter('uno-layer-', matcher, [':', '-']);
        if (variant) {
            const [match, rest] = variant;
            const layer = (_a = h.bracket(match)) !== null && _a !== void 0 ? _a : match;
            if (layer) {
                return {
                    matcher: rest,
                    layer,
                };
            }
        }
    },
};
export const variantScope = {
    name: 'scope',
    match(matcher) {
        const variant = variantGetBracket('scope-', matcher, [':', '-']);
        if (variant) {
            const [match, rest] = variant;
            const scope = h.bracket(match);
            if (scope) {
                return {
                    matcher: rest,
                    selector: s => `${scope} $$ ${s}`,
                };
            }
        }
    },
};
export const variantVariables = {
    name: 'variables',
    match(matcher) {
        var _a, _b;
        if (!matcher.startsWith('['))
            return;
        const [match, rest] = (_a = getBracket(matcher, '[', ']')) !== null && _a !== void 0 ? _a : [];
        if (!(match && rest))
            return;
        let newMatcher;
        for (const separator of [':', '-']) {
            if (rest.startsWith(separator)) {
                newMatcher = rest.slice(separator.length);
                break;
            }
        }
        if (newMatcher == null)
            return;
        const variant = (_b = h.bracket(match)) !== null && _b !== void 0 ? _b : '';
        const useParent = variant.startsWith('@');
        if (!(useParent || variant.includes('&')))
            return;
        return {
            matcher: newMatcher,
            handle(input, next) {
                const updates = useParent
                    ? {
                        parent: `${input.parent ? `${input.parent} $$ ` : ''}${variant}`,
                    }
                    : {
                        selector: variant.replace(/&/g, input.selector),
                    };
                return next({
                    ...input,
                    ...updates,
                });
            },
        };
    },
    multiPass: true,
};
