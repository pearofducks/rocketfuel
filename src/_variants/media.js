import { handler as h, variantGetParameter, variantParentMatcher } from '../utils';
export const variantPrint = variantParentMatcher('print', '@media print');
export const variantCustomMedia = {
    name: 'media',
    match(matcher, { theme }) {
        const variant = variantGetParameter('media-', matcher, [':', '-']);
        if (variant) {
            const [match, rest] = variant;
            let media = h.bracket(match) ?? '';
            if (media === '')
                media = theme.media?.[match] ?? '';
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
