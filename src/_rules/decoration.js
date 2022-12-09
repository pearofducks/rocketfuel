import { colorResolver, globalKeywords, handler as h } from '../utils';
const decorationStyles = ['solid', 'double', 'dotted', 'dashed', 'wavy', ...globalKeywords];
export const textDecorations = [
    [/^(?:decoration-)?(underline|overline|line-through)$/, ([, s]) => ({ 'text-decoration-line': s }), { autocomplete: 'decoration-(underline|overline|line-through)' }],
    // size
    [/^(?:underline|decoration)-(?:size-)?(.+)$/, ([, s], { theme }) => { var _a, _b; return ({ 'text-decoration-thickness': (_b = (_a = theme.lineWidth) === null || _a === void 0 ? void 0 : _a[s]) !== null && _b !== void 0 ? _b : h.bracket.cssvar.global.px(s) }); }, { autocomplete: '(underline|decoration)-<num>' }],
    [/^(?:underline|decoration)-(auto|from-font)$/, ([, s]) => ({ 'text-decoration-thickness': s }), { autocomplete: '(underline|decoration)-(auto|from-font)' }],
    // colors
    [/^(?:underline|decoration)-(.+)$/, (match, ctx) => {
            const result = colorResolver('text-decoration-color', 'line')(match, ctx);
            if (result) {
                return {
                    '-webkit-text-decoration-color': result['text-decoration-color'],
                    ...result,
                };
            }
        }, { autocomplete: '(underline|decoration)-$colors' }],
    [/^(?:underline|decoration)-op(?:acity)?-?(.+)$/, ([, opacity]) => ({ '--un-line-opacity': h.bracket.percent(opacity) }), { autocomplete: '(underline|decoration)-(op|opacity)-<percent>' }],
    // offset
    [/^(?:underline|decoration)-offset-(.+)$/, ([, s], { theme }) => { var _a, _b; return ({ 'text-underline-offset': (_b = (_a = theme.lineWidth) === null || _a === void 0 ? void 0 : _a[s]) !== null && _b !== void 0 ? _b : h.auto.bracket.cssvar.global.px(s) }); }, { autocomplete: '(underline|decoration)-(offset)-<num>' }],
    // style
    ...decorationStyles.map(v => [`underline-${v}`, { 'text-decoration-style': v }]),
    ...decorationStyles.map(v => [`decoration-${v}`, { 'text-decoration-style': v }]),
    ['no-underline', { 'text-decoration': 'none' }],
    ['decoration-none', { 'text-decoration': 'none' }],
];