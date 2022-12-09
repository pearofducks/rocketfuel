import { handler as h, variantGetParameter } from '../utils';
export const variantDataAttribute = {
    name: 'data',
    match(matcher, { theme }) {
        var _a, _b, _c;
        const variant = variantGetParameter('data-', matcher, [':', '-']);
        if (variant) {
            const [match, rest] = variant;
            const dataAttribute = (_c = (_a = h.bracket(match)) !== null && _a !== void 0 ? _a : (_b = theme.data) === null || _b === void 0 ? void 0 : _b[match]) !== null && _c !== void 0 ? _c : '';
            if (dataAttribute) {
                return {
                    matcher: rest,
                    selector: s => `${s}[data-${dataAttribute}]`,
                };
            }
        }
    },
};
