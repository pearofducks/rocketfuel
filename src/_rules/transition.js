import { globalKeywords, handler as h, makeGlobalStaticRules } from '../utils';
const transitionPropertyGroup = {
    all: 'all',
    colors: ['color', 'background-color', 'border-color', 'text-decoration-color', 'fill', 'stroke'].join(','),
    none: 'none',
    opacity: 'opacity',
    shadow: 'box-shadow',
    transform: 'transform',
};
const transitionProperty = (prop) => {
    var _a;
    return (_a = h.properties(prop)) !== null && _a !== void 0 ? _a : transitionPropertyGroup[prop];
};
export const transitions = [
    // transition
    [/^transition(?:-([a-z-]+(?:,[a-z-]+)*))?(?:-(\d+))?$/, ([, prop, d], { theme }) => {
            var _a, _b;
            const p = prop != null
                ? transitionProperty(prop)
                : [transitionPropertyGroup.colors, 'opacity', 'box-shadow', 'transform', 'filter', 'backdrop-filter'].join(',');
            if (p) {
                const duration = (_b = (_a = theme.duration) === null || _a === void 0 ? void 0 : _a[d || 'DEFAULT']) !== null && _b !== void 0 ? _b : h.time(d || '150');
                return {
                    'transition-property': p,
                    'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
                    'transition-duration': duration,
                };
            }
        }, { autocomplete: `transition-(${Object.keys(transitionPropertyGroup).join('|')})` }],
    // timings
    [/^(?:transition-)?duration-(.+)$/,
        ([, d], { theme }) => { var _a, _b; return ({ 'transition-duration': (_b = (_a = theme.duration) === null || _a === void 0 ? void 0 : _a[d || 'DEFAULT']) !== null && _b !== void 0 ? _b : h.bracket.cssvar.time(d) }); },
        { autocomplete: ['transition-duration-$duration', 'duration-$duration'] }],
    [/^(?:transition-)?delay-(.+)$/,
        ([, d], { theme }) => { var _a, _b; return ({ 'transition-delay': (_b = (_a = theme.duration) === null || _a === void 0 ? void 0 : _a[d || 'DEFAULT']) !== null && _b !== void 0 ? _b : h.bracket.cssvar.time(d) }); },
        { autocomplete: ['transition-delay-$duration', 'delay-$duration'] }],
    [/^(?:transition-)?ease(?:-(.+))?$/,
        ([, d], { theme }) => { var _a, _b; return ({ 'transition-timing-function': (_b = (_a = theme.easing) === null || _a === void 0 ? void 0 : _a[d || 'DEFAULT']) !== null && _b !== void 0 ? _b : h.bracket.cssvar(d) }); },
        { autocomplete: ['transition-ease-(linear|in|out|in-out|DEFAULT)', 'ease-(linear|in|out|in-out|DEFAULT)'] }],
    // props
    [/^(?:transition-)?property-(.+)$/,
        ([, v]) => ({ 'transition-property': h.bracket.global(v) || transitionProperty(v) }),
        { autocomplete: [`transition-property-(${[...globalKeywords, ...Object.keys(transitionPropertyGroup)].join('|')})`] }],
    // none
    ['transition-none', { transition: 'none' }],
    ...makeGlobalStaticRules('transition'),
];
