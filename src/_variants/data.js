import { handler as h, variantGetParameter } from '../utils';
export const variantDataAttribute = {
    name: 'data',
    match(matcher, { theme }) {
        const variant = variantGetParameter('data-', matcher, [':', '-']);
        if (variant) {
            const [match, rest] = variant;
            const dataAttribute = h.bracket(match) ?? theme.data?.[match] ?? '';
            if (dataAttribute) {
                return {
                    matcher: rest,
                    selector: s => `${s}[data-${dataAttribute}]`,
                };
            }
        }
    },
};
