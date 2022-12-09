import { handler as h } from '../utils';
const directions = {
    '': '',
    'x': 'column-',
    'y': 'row-',
};
const handleGap = ([, d = '', s], { theme }) => {
    var _a, _b;
    const v = (_b = (_a = theme.spacing) === null || _a === void 0 ? void 0 : _a[s]) !== null && _b !== void 0 ? _b : h.bracket.cssvar.global.rem(s);
    if (v != null) {
        return {
            [`grid-${directions[d]}gap`]: v,
            [`${directions[d]}gap`]: v,
        };
    }
};
export const gaps = [
    [/^(?:flex-|grid-)?gap-?()(.+)$/, handleGap, { autocomplete: ['gap-$spacing', 'gap-<num>'] }],
    [/^(?:flex-|grid-)?gap-([xy])-?(.+)$/, handleGap, { autocomplete: ['gap-(x|y)-$spacing', 'gap-(x|y)-<num>'] }],
];
