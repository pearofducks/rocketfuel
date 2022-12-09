import { handler as h, variantGetParameter } from '../utils';
export const variantSupports = {
    name: 'supports',
    match(matcher, { theme }) {
        var _a, _b, _c;
        const variant = variantGetParameter('supports-', matcher, [':', '-']);
        if (variant) {
            const [match, rest] = variant;
            let supports = (_a = h.bracket(match)) !== null && _a !== void 0 ? _a : '';
            if (supports === '')
                supports = (_c = (_b = theme.supports) === null || _b === void 0 ? void 0 : _b[match]) !== null && _c !== void 0 ? _c : '';
            if (supports) {
                return {
                    matcher: rest,
                    handle: (input, next) => next({
                        ...input,
                        parent: `${input.parent ? `${input.parent} $$ ` : ''}@supports ${supports}`,
                    }),
                };
            }
        }
    },
    multiPass: true,
};
