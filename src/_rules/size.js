import { handler as h, resolveBreakpoints, resolveVerticalBreakpoints } from '../utils';
const sizeMapping = {
    h: 'height',
    w: 'width',
    inline: 'inline-size',
    block: 'block-size',
};
function getPropName(minmax, hw) {
    return `${minmax || ''}${sizeMapping[hw]}`;
}
function getSizeValue(minmax, hw, theme, prop) {
    var _a;
    const str = getPropName(minmax, hw).replace(/-(\w)/g, (_, p) => p.toUpperCase());
    const v = (_a = theme[str]) === null || _a === void 0 ? void 0 : _a[prop];
    if (v != null)
        return v;
    switch (prop) {
        case 'fit':
        case 'max':
        case 'min':
            return `${prop}-content`;
    }
    return h.bracket.cssvar.global.auto.fraction.rem(prop);
}
export const sizes = [
    [/^(min-|max-)?([wh])-?(.+)$/, ([, m, w, s], { theme }) => ({ [getPropName(m, w)]: getSizeValue(m, w, theme, s) })],
    [/^(min-|max-)?(block|inline)-(.+)$/, ([, m, w, s], { theme }) => ({ [getPropName(m, w)]: getSizeValue(m, w, theme, s) }), {
            autocomplete: [
                '(w|h)-$width|height|maxWidth|maxHeight|minWidth|minHeight|inlineSize|blockSize|maxInlineSize|maxBlockSize|minInlineSize|minBlockSize',
                '(block|inline)-$width|height|maxWidth|maxHeight|minWidth|minHeight|inlineSize|blockSize|maxInlineSize|maxBlockSize|minInlineSize|minBlockSize',
                '(max|min)-(w|h|block|inline)',
                '(max|min)-(w|h|block|inline)-$width|height|maxWidth|maxHeight|minWidth|minHeight|inlineSize|blockSize|maxInlineSize|maxBlockSize|minInlineSize|minBlockSize',
            ],
        }],
    [/^(min-|max-)?(h)-screen-(.+)$/, ([, m, w, s], context) => { var _a; return ({ [getPropName(m, w)]: (_a = resolveVerticalBreakpoints(context)) === null || _a === void 0 ? void 0 : _a[s] }); }],
    [/^(min-|max-)?(w)-screen-(.+)$/, ([, m, w, s], context) => { var _a; return ({ [getPropName(m, w)]: (_a = resolveBreakpoints(context)) === null || _a === void 0 ? void 0 : _a[s] }); }, {
            autocomplete: [
                '(w|h)-screen',
                '(min|max)-(w|h)-screen',
                'h-screen-$verticalBreakpoints',
                '(min|max)-h-screen-$verticalBreakpoints',
                'w-screen-$breakpoints',
                '(min|max)-w-screen-$breakpoints',
            ],
        }],
];
function getAspectRatio(prop) {
    if (/^\d+\/\d+$/.test(prop))
        return prop;
    switch (prop) {
        case 'square': return '1/1';
        case 'video': return '16/9';
    }
    return h.bracket.cssvar.global.auto.number(prop);
}
export const aspectRatio = [
    [/^aspect-(?:ratio-)?(.+)$/, ([, d]) => ({ 'aspect-ratio': getAspectRatio(d) }), { autocomplete: ['aspect-(square|video|ratio)', 'aspect-ratio-(square|video)'] }],
];
