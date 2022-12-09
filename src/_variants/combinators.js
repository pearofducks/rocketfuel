import { handler as h, variantGetBracket } from '../utils';
const scopeMatcher = (name, combinator) => ({
    name: `combinator:${name}`,
    match(matcher) {
        var _a;
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
        let bracketValue = (_a = h.bracket(body[0])) !== null && _a !== void 0 ? _a : '';
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
