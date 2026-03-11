const { readFileSync, writeFileSync } = require('fs')
const { join } = require('path')
const { Resvg } = require('@resvg/resvg-js')

const publicDir = join(__dirname, '..', 'public')
const svgPath = join(publicDir, 'icon.svg')
const svg = readFileSync(svgPath)

for (const size of [192, 512]) {
  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: size },
    background: '#ffffff',
  })
  const png = resvg.render().asPng()
  const outPath = join(publicDir, `icon-${size}.png`)
  writeFileSync(outPath, png)
  console.log(`Written ${outPath}`)
}

console.log('PWA icons generated.')
