import { handler as h, variantGetParameter } from '../utils';
export const variantAria = {
    name: 'aria',
    match(matcher, { theme }) {
        var _a, _b, _c;
        const variant = variantGetParameter('aria-', matcher, [':', '-']);
        if (variant) {
            const [match, rest] = variant;
            const aria = (_c = (_a = h.bracket(match)) !== null && _a !== void 0 ? _a : (_b = theme.aria) === null || _b === void 0 ? void 0 : _b[match]) !== null && _c !== void 0 ? _c : '';
            if (aria) {
                return {
                    matcher: rest,
                    selector: s => `${s}[aria-${aria}]`,
                };
            }
        }
    },
};
