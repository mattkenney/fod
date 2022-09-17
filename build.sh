#!/bin/sh

set -e

BIN=./node_modules/.bin

# Install dev dependencies
npm install

# Make clean output dir and zip
rm -fr dist dist.zip
mkdir -p dist

cp package.json package-lock.json dist
cd dist
npm install --omit=dev
cd ..

# Compress client side JavaScript as MJS
printf '%s\n' 'export const script = `' > dist/script.mjs
$BIN/terser src/script.js --compress --mangle >> dist/script.mjs
printf '%s\n' '`;' >> dist/script.mjs

# Compile SASS to CSS as MJS
printf '%s\n' 'export const style = `' > dist/style.mjs
cat src/style.scss | \
  $BIN/sass --no-source-map --stdin --style=compressed \
  >> dist/style.mjs
printf '%s\n' '`;' >> dist/style.mjs

# Compile PUG to MJS
node -e \
  'console.log(require("pug").compileFileClient("src/template.pug"))' \
  > dist/template.mjs
printf '\n%s\n' 'export { template };' >> dist/template.mjs

# Copy MJS
cp src/*.mjs dist

cd dist
zip -r ../dist.zip *
