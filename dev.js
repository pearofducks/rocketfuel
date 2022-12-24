import { createGenerator } from '@unocss/core'
import presetRocketfuel from './src/index.js'

const uno = createGenerator({
  presets: [
    presetRocketfuel({ preflight: false })
  ]
})

const result = await uno.generate(['p-16'])
console.log(result.css)
