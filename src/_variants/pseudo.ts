import type { VariantObject } from '@unocss/core'
import { escapeRegExp, escapeSelector, warnOnce } from '@unocss/core'
import type { PresetMiniOptions } from '..'
import { handler as h, variantGetBracket } from '../_utils'

const PseudoClasses: Record<string, string> = Object.fromEntries([
  // pseudo elements part 1
  ['first-letter', '::first-letter'],
  ['first-line', '::first-line'],

  // location
  'any-link',
  'link',
  'visited',
  'target',
  ['open', '[open]'],

  // user action
  'hover',
  'active',
  'focus-visible',
  'focus-within',
  'focus',

  // input
  'autofill',
  'enabled',
  'disabled',
  'read-only',
  'read-write',
  'placeholder-shown',
  'default',
  'checked',
  'indeterminate',
  'valid',
  'invalid',
  'in-range',
  'out-of-range',
  'required',
  'optional',

  // tree-structural
  'root',
  'empty',
  ['even-of-type', ':nth-of-type(even)'],
  ['even', ':nth-child(even)'],
  ['odd-of-type', ':nth-of-type(odd)'],
  ['odd', ':nth-child(odd)'],
  'first-of-type',
  ['first', ':first-child'],
  'last-of-type',
  ['last', ':last-child'],
  'only-child',
  'only-of-type',

  // pseudo elements part 2
  ['placeholder', '::placeholder'],
  ['before', '::before'],
  ['after', '::after'],
  ['selection', '::selection'],
  ['marker', '::marker'],
  ['file', '::file-selector-button'],
].map(key => Array.isArray(key) ? key : [key, `:${key}`]))

const PseudoClassesColon: Record<string, string> = Object.fromEntries([
  ['backdrop', '::backdrop'],
].map(key => Array.isArray(key) ? key : [key, `:${key}`]))

const PseudoClassFunctions = [
  'not',
  'is',
  'where',
  'has',
]

const PseudoClassesStr = Object.entries(PseudoClasses).filter(([, pseudo]) => !pseudo.startsWith('::')).map(([key]) => key).join('|')
const PseudoClassesColonStr = Object.entries(PseudoClassesColon).filter(([, pseudo]) => !pseudo.startsWith('::')).map(([key]) => key).join('|')
const PseudoClassFunctionsStr = PseudoClassFunctions.join('|')

const sortValue = (pseudo: string) => {
  if (pseudo === 'active')
    return 1
}

const taggedPseudoClassMatcher = (tag: string, parent: string, combinator: string): VariantObject => {
  const rawRE = new RegExp(`^(${escapeRegExp(parent)}:)(\\S+)${escapeRegExp(combinator)}\\1`)
  const pseudoRE = new RegExp(`^${tag}-(?:(?:(${PseudoClassFunctionsStr})-)?(${PseudoClassesStr}))(?:(/\\w+))?[:-]`)
  const pseudoColonRE = new RegExp(`^${tag}-(?:(?:(${PseudoClassFunctionsStr})-)?(${PseudoClassesColonStr}))(?:(/\\w+))?[:]`)

  const matchBracket = (input: string) => {
    const body = variantGetBracket(`${tag}-`, input, [])
    if (!body)
      return

    const [match, rest] = body
    const bracketValue = h.bracket(match)
    if (bracketValue == null)
      return

    const label = rest.split(/[:-]/, 1)?.[0] ?? ''
    const prefix = `${parent}${escapeSelector(label)}`
    return [
      label,
      input.slice(input.length - (rest.length - label.length - 1)),
      bracketValue.includes('&') ? bracketValue.replace(/&/g, prefix) : `${prefix}${bracketValue}`,
    ]
  }

  const matchPseudo = (input: string) => {
    const match = input.match(pseudoRE) || input.match(pseudoColonRE)
    if (!match)
      return

    const [original, fn, pseudoKey] = match
    const label = match[3] ?? ''
    let pseudo = PseudoClasses[pseudoKey] || PseudoClassesColon[pseudoKey] || `:${pseudoKey}`
    if (fn)
      pseudo = `:${fn}(${pseudo})`

    return [
      label,
      input.slice(original.length),
      `${parent}${escapeSelector(label)}${pseudo}`,
      sortValue(pseudoKey),
    ]
  }

  return {
    name: `pseudo:${tag}`,
    match(input) {
      if (!input.startsWith(tag))
        return

      const result = matchBracket(input) || matchPseudo(input)
      if (!result)
        return

      const [label, matcher, prefix, sort] = result as [string, string, string, number | undefined]
      if (label !== '')
        warnOnce('The labeled variant is experimental and may not follow semver.')

      return {
        matcher,
        handle: (input, next) => next({
          ...input,
          prefix: `${prefix}${combinator}${input.prefix}`.replace(rawRE, '$1$2:'),
        }),
        sort,
      }
    },
    multiPass: true,
  }
}

const PseudoClassesAndElementsStr = Object.entries(PseudoClasses).map(([key]) => key).join('|')
const PseudoClassesAndElementsColonStr = Object.entries(PseudoClassesColon).map(([key]) => key).join('|')
const PseudoClassesAndElementsRE = new RegExp(`^(${PseudoClassesAndElementsStr})[:-]`)
const PseudoClassesAndElementsColonRE = new RegExp(`^(${PseudoClassesAndElementsColonStr})[:]`)
export const variantPseudoClassesAndElements: VariantObject = {
  name: 'pseudo',
  match(input) {
    const match = input.match(PseudoClassesAndElementsRE) || input.match(PseudoClassesAndElementsColonRE)
    if (match) {
      const pseudo = PseudoClasses[match[1]] || PseudoClassesColon[match[1]] || `:${match[1]}`
      return {
        matcher: input.slice(match[0].length),
        handle: (input, next) => {
          const selectors = pseudo.startsWith('::')
            ? {
                pseudo: `${input.pseudo}${pseudo}`,
              }
            : {
                selector: `${input.selector}${pseudo}`,
              }

          return next({
            ...input,
            ...selectors,
            sort: sortValue(match[1]),
          })
        },
      }
    }
  },
  multiPass: true,
  autocomplete: `(${PseudoClassesAndElementsStr}):`,
}

const PseudoClassFunctionsRE = new RegExp(`^(${PseudoClassFunctionsStr})-(${PseudoClassesStr})[:-]`)
const PseudoClassColonFunctionsRE = new RegExp(`^(${PseudoClassFunctionsStr})-(${PseudoClassesColonStr})[:]`)
export const variantPseudoClassFunctions: VariantObject = {
  match(input) {
    const match = input.match(PseudoClassFunctionsRE) || input.match(PseudoClassColonFunctionsRE)
    if (match) {
      const fn = match[1]
      const pseudo = PseudoClasses[match[2]] || PseudoClassesColon[match[2]] || `:${match[2]}`
      return {
        matcher: input.slice(match[0].length),
        selector: s => `${s}:${fn}(${pseudo})`,
      }
    }
  },
  multiPass: true,
  autocomplete: `(${PseudoClassFunctionsStr})-(${PseudoClassesStr}|${PseudoClassesColonStr}):`,
}

export const variantTaggedPseudoClasses = (options: PresetMiniOptions = {}): VariantObject[] => {
  const attributify = !!options?.attributifyPseudo

  return [
    taggedPseudoClassMatcher('group', attributify ? '[group=""]' : '.group', ' '),
    taggedPseudoClassMatcher('peer', attributify ? '[peer=""]' : '.peer', '~'),
    taggedPseudoClassMatcher('parent', attributify ? '[parent=""]' : '.parent', '>'),
    taggedPseudoClassMatcher('previous', attributify ? '[previous=""]' : '.previous', '+'),
  ]
}

const PartClassesRE = /(part-\[(.+)]:)(.+)/
export const partClasses: VariantObject = {
  match(input) {
    const match = input.match(PartClassesRE)
    if (match) {
      const part = `part(${match[2]})`
      return {
        matcher: input.slice(match[1].length),
        selector: s => `${s}::${part}`,
      }
    }
  },
  multiPass: true,
}
