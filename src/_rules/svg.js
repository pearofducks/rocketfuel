import { colorResolver, handler as h } from '../utils';
export const svgUtilities = [
    // fills
    [/^fill-(.+)$/, colorResolver('fill', 'fill'), { autocomplete: 'fill-$colors' }],
    [/^fill-op(?:acity)?-?(.+)$/, ([, opacity]) => ({ '--un-fill-opacity': h.bracket.percent(opacity) }), { autocomplete: 'fill-(op|opacity)-<percent>' }],
    ['fill-none', { fill: 'none' }],
    // stroke size
    [/^stroke-(?:width-|size-)?(.+)$/, ([, s], { theme }) => { var _a, _b; return ({ 'stroke-width': (_b = (_a = theme.lineWidth) === null || _a === void 0 ? void 0 : _a[s]) !== null && _b !== void 0 ? _b : h.bracket.cssvar.fraction.px.number(s) }); }, { autocomplete: ['stroke-width-$lineWidth', 'stroke-size-$lineWidth'] }],
    // stroke dash
    [/^stroke-dash-(.+)$/, ([, s]) => ({ 'stroke-dasharray': h.bracket.cssvar.number(s) }), { autocomplete: 'stroke-dash-<num>' }],
    [/^stroke-offset-(.+)$/, ([, s], { theme }) => { var _a, _b; return ({ 'stroke-dashoffset': (_b = (_a = theme.lineWidth) === null || _a === void 0 ? void 0 : _a[s]) !== null && _b !== void 0 ? _b : h.bracket.cssvar.px.numberWithUnit(s) }); }, { autocomplete: 'stroke-offset-$lineWidth' }],
    // stroke colors
    [/^stroke-(.+)$/, colorResolver('stroke', 'stroke'), { autocomplete: 'stroke-$colors' }],
    [/^stroke-op(?:acity)?-?(.+)$/, ([, opacity]) => ({ '--un-stroke-opacity': h.bracket.percent(opacity) }), { autocomplete: 'stroke-(op|opacity)-<percent>' }],
    // line cap
    ['stroke-cap-square', { 'stroke-linecap': 'square' }],
    ['stroke-cap-round', { 'stroke-linecap': 'round' }],
    ['stroke-cap-auto', { 'stroke-linecap': 'butt' }],
    // line join
    ['stroke-join-arcs', { 'stroke-linejoin': 'arcs' }],
    ['stroke-join-bevel', { 'stroke-linejoin': 'bevel' }],
    ['stroke-join-clip', { 'stroke-linejoin': 'miter-clip' }],
    ['stroke-join-round', { 'stroke-linejoin': 'round' }],
    ['stroke-join-auto', { 'stroke-linejoin': 'miter' }],
    // none
    ['stroke-none', { stroke: 'none' }],
];
