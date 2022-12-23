import { handler as h, variantGetBracket } from '../utils';
const scopeMatcher = (name, combinator) => ({
    name: `combinator:${name}`,
    match(matcher) {
        if (!matcher.startsWith(name))
            return;
        let body = variantGetBracket(`${name}-`, matcher, [':', '-']);
        if (!body) {
            for (const separator of [':', '-']) {
                if (matcher.startsWith(`${name}${separator}`)) {
                    body = ['', matcher.slice(name.length + separator.length)];
                    break;
                }
            }
            if (!body)
                return;
        }
        let bracketValue = h.bracket(body[0]) ?? '';
        if (bracketValue === '')
            bracketValue = '*';
        return {
            matcher: body[1],
            selector: s => `${s}${combinator}${bracketValue}`,
        };
    },
    multiPass: true,
});
export const variantCombinators = [
    scopeMatcher('all', ' '),
    scopeMatcher('children', '>'),
    scopeMatcher('next', '+'),
    scopeMatcher('sibling', '+'),
    scopeMatcher('siblings', '~'),
];
