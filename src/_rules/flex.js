import { handler as h } from '../utils';
export const flex = [
    // display
    ['flex', { display: 'flex' }],
    ['inline-flex', { display: 'inline-flex' }],
    ['flex-inline', { display: 'inline-flex' }],
    // flex
    [/^flex-(.*)$/, ([, d]) => ({ flex: h.bracket(d) != null ? h.bracket(d).split(' ').map(e => { var _a; return (_a = h.cssvar.fraction(e)) !== null && _a !== void 0 ? _a : e; }).join(' ') : h.cssvar.fraction(d) })],
    ['flex-1', { flex: '1 1 0%' }],
    ['flex-auto', { flex: '1 1 auto' }],
    ['flex-initial', { flex: '0 1 auto' }],
    ['flex-none', { flex: 'none' }],
    // shrink/grow/basis
    [/^(?:flex-)?shrink(?:-(.*))?$/, ([, d = '']) => { var _a; return ({ 'flex-shrink': (_a = h.bracket.cssvar.number(d)) !== null && _a !== void 0 ? _a : 1 }); }, { autocomplete: ['flex-shrink-<num>', 'shrink-<num>'] }],
    [/^(?:flex-)?grow(?:-(.*))?$/, ([, d = '']) => { var _a; return ({ 'flex-grow': (_a = h.bracket.cssvar.number(d)) !== null && _a !== void 0 ? _a : 1 }); }, { autocomplete: ['flex-grow-<num>', 'grow-<num>'] }],
    [/^(?:flex-)?basis-(.+)$/, ([, d], { theme }) => { var _a, _b; return ({ 'flex-basis': (_b = (_a = theme.spacing) === null || _a === void 0 ? void 0 : _a[d]) !== null && _b !== void 0 ? _b : h.bracket.cssvar.auto.fraction.rem(d) }); }, { autocomplete: ['flex-basis-$spacing', 'basis-$spacing'] }],
    // directions
    ['flex-row', { 'flex-direction': 'row' }],
    ['flex-row-reverse', { 'flex-direction': 'row-reverse' }],
    ['flex-col', { 'flex-direction': 'column' }],
    ['flex-col-reverse', { 'flex-direction': 'column-reverse' }],
    // wraps
    ['flex-wrap', { 'flex-wrap': 'wrap' }],
    ['flex-wrap-reverse', { 'flex-wrap': 'wrap-reverse' }],
    ['flex-nowrap', { 'flex-wrap': 'nowrap' }],
];
