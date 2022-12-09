import { handler as h } from '../utils';
const rowCol = (s) => s.replace('col', 'column');
const rowColTheme = (s) => s[0] === 'r' ? 'Row' : 'Column';
const autoDirection = (c, theme, prop) => {
    var _a;
    const v = (_a = theme[`gridAuto${rowColTheme(c)}`]) === null || _a === void 0 ? void 0 : _a[prop];
    if (v != null)
        return v;
    switch (prop) {
        case 'min': return 'min-content';
        case 'max': return 'max-content';
        case 'fr': return 'minmax(0,1fr)';
    }
    return h.bracket.cssvar.auto.rem(prop);
};
export const grids = [
    // displays
    ['grid', { display: 'grid' }],
    ['inline-grid', { display: 'inline-grid' }],
    // global
    [/^(?:grid-)?(row|col)-(.+)$/, ([, c, v], { theme }) => {
            var _a, _b;
            return ({
                [`grid-${rowCol(c)}`]: (_b = (_a = theme[`grid${rowColTheme(c)}`]) === null || _a === void 0 ? void 0 : _a[v]) !== null && _b !== void 0 ? _b : h.bracket.cssvar.auto(v),
            });
        }],
    // span
    [/^(?:grid-)?(row|col)-span-(.+)$/, ([, c, s]) => {
            if (s === 'full')
                return { [`grid-${rowCol(c)}`]: '1/-1' };
            const v = h.bracket.number(s);
            if (v != null)
                return { [`grid-${rowCol(c)}`]: `span ${v}/span ${v}` };
        }, { autocomplete: ['grid-(row|col)-span-<num>', '(row|col)-span-<num>'] }],
    // starts & ends
    [/^(?:grid-)?(row|col)-start-(.+)$/, ([, c, v]) => { var _a; return ({ [`grid-${rowCol(c)}-start`]: (_a = h.bracket.cssvar(v)) !== null && _a !== void 0 ? _a : v }); }],
    [/^(?:grid-)?(row|col)-end-(.+)$/, ([, c, v]) => { var _a; return ({ [`grid-${rowCol(c)}-end`]: (_a = h.bracket.cssvar(v)) !== null && _a !== void 0 ? _a : v }); }, { autocomplete: ['grid-(row|col)-(start|end)-<num>'] }],
    // auto flows
    [/^(?:grid-)?auto-(rows|cols)-(.+)$/, ([, c, v], { theme }) => ({ [`grid-auto-${rowCol(c)}`]: autoDirection(c, theme, v) }), { autocomplete: ['grid-auto-(rows|cols)-<num>'] }],
    // grid-auto-flow, auto-flow: uno
    // grid-flow: wind
    [/^(?:grid-auto-flow|auto-flow|grid-flow)-(.+)$/, ([, v]) => ({ 'grid-auto-flow': h.bracket.cssvar(v) })],
    [/^(?:grid-auto-flow|auto-flow|grid-flow)-(row|col|dense|row-dense|col-dense)$/, ([, v]) => ({ 'grid-auto-flow': rowCol(v).replace('-', ' ') }), { autocomplete: ['(grid-auto-flow|auto-flow|grid-flow)-(row|col|dense|row-dense|col-dense)'] }],
    // templates
    [/^grid-(rows|cols)-(.+)$/, ([, c, v], { theme }) => {
            var _a, _b;
            return ({
                [`grid-template-${rowCol(c)}`]: (_b = (_a = theme[`gridTemplate${rowColTheme(c)}`]) === null || _a === void 0 ? void 0 : _a[v]) !== null && _b !== void 0 ? _b : h.bracket.cssvar(v),
            });
        }],
    [/^grid-(rows|cols)-minmax-([\w.-]+)$/, ([, c, d]) => ({ [`grid-template-${rowCol(c)}`]: `repeat(auto-fill,minmax(${d},1fr))` })],
    [/^grid-(rows|cols)-(\d+)$/, ([, c, d]) => ({ [`grid-template-${rowCol(c)}`]: `repeat(${d},minmax(0,1fr))` }), { autocomplete: ['grid-(rows|cols)-<num>', 'grid-(rows|cols)-none'] }],
    // areas
    [/^grid-area(s)?-(.+)$/, ([, s, v]) => {
            var _a;
            if (s != null)
                return { 'grid-template-areas': (_a = h.cssvar(v)) !== null && _a !== void 0 ? _a : v.split('-').map(s => `"${h.bracket(s)}"`).join(' ') };
            return { 'grid-area': h.bracket.cssvar(v) };
        }],
    // template none
    ['grid-rows-none', { 'grid-template-rows': 'none' }],
    ['grid-cols-none', { 'grid-template-columns': 'none' }],
];
