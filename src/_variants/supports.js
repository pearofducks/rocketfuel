import { handler as h, variantGetParameter } from '../utils';
export const variantSupports = {
    name: 'supports',
    match(matcher, { theme }) {
        const variant = variantGetParameter('supports-', matcher, [':', '-']);
        if (variant) {
            const [match, rest] = variant;
            let supports = h.bracket(match) ?? '';
            if (supports === '')
                supports = theme.supports?.[match] ?? '';
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
