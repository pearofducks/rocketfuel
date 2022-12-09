import { handler as h, variantGetParameter, variantParentMatcher } from '../utils';
export const variantPrint = variantParentMatcher('print', '@media print');
export const variantCustomMedia = {
    name: 'media',
    match(matcher, { theme }) {
        var _a, _b, _c;
        const variant = variantGetParameter('media-', matcher, [':', '-']);
        if (variant) {
            const [match, rest] = variant;
            let media = (_a = h.bracket(match)) !== null && _a !== void 0 ? _a : '';
            if (media === '')
                media = (_c = (_b = theme.media) === null || _b === void 0 ? void 0 : _b[match]) !== null && _c !== void 0 ? _c : '';
            if (media) {
                return {
                    matcher: rest,
                    handle: (input, next) => next({
                        ...input,
                        parent: `${input.parent ? `${input.parent} $$ ` : ''}@media ${media}`,
                    }),
                };
            }
        }
    },
    multiPass: true,
};
