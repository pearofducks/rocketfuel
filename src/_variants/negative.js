import { CONTROL_MINI_NO_NEGATIVE, getComponent } from '../utils';
const numberRE = /[0-9.]+(?:[a-z]+|%)?/;
const ignoreProps = [
    /opacity|color|flex/,
];
const negateFunctions = (value) => {
    var _a;
    const match = value.match(/^(calc|clamp|max|min)\s*(\(.*)/);
    if (match) {
        const [fnBody, rest] = (_a = getComponent(match[2], '(', ')', ' ')) !== null && _a !== void 0 ? _a : [];
        if (fnBody)
            return `calc(${match[1]}${fnBody} * -1)${rest ? ` ${rest}` : ''}`;
    }
};
export const variantNegative = {
    name: 'negative',
    match(matcher) {
        if (!matcher.startsWith('-'))
            return;
        return {
            matcher: matcher.slice(1),
            body: (body) => {
                if (body.find(v => v[0] === CONTROL_MINI_NO_NEGATIVE))
                    return;
                let changed = false;
                body.forEach((v) => {
                    var _a;
                    const value = (_a = v[1]) === null || _a === void 0 ? void 0 : _a.toString();
                    if (!value || value === '0')
                        return;
                    if (ignoreProps.some(i => v[0].match(i)))
                        return;
                    const negated = negateFunctions(value);
                    if (negated) {
                        v[1] = negated;
                        changed = true;
                    }
                    else if (numberRE.test(value)) {
                        v[1] = value.replace(numberRE, i => `-${i}`);
                        changed = true;
                    }
                });
                if (changed)
                    return body;
                return [];
            },
        };
    },
};
