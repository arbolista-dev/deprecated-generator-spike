npm run babel -- src/generators -d dist/generators --ignore test.js,templates/
cp -r src/generators/app/templates dist/generators/app/templates
cp package.json dist
