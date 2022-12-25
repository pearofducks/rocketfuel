import { createGenerator } from '@unocss/core'
import presetRocketfuel from './src/index.js'
import * as lightning from 'lightningcss'

const uno = createGenerator({
  presets: [
    presetRocketfuel({ preflight: false })
  ]
})

const result = await uno.generate(['p-xl', 'm-xl', 'bg-gray-300'])
console.log(result.css)

const { code } = lightning.transform({
  code: Buffer.from(result.css),
  minify: true,
  // targets: {}
})

console.log("MINIFIED")
console.log(code.toString())
