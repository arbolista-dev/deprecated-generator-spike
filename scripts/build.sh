rm -r dist || mkdir dist
npm run babel -- src -d dist --ignore test.js,templates/
cp -r src/app/templates dist/app/templates
cp -r src/actions/templates dist/actions/templates
cp package.json dist
cp README.md dist
