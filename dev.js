import { createGenerator } from '@unocss/core'
import presetRocketfuel from './src/index.js'

const uno = createGenerator({
  presets: [
    presetRocketfuel({ preflight: true })
  ]
})

const result = await uno.generate(['sm:p-16'])
console.log(result.css)
