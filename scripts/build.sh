cd "${0%/*}" && cd ..
rm -r dist || mkdir dist
cd src
rsync --exclude **/dist --exclude **/node_modules --recursive --relative **/templates ../dist
cd ..
npm run babel -- src -d dist --ignore test.js,templates/,fixtures/
cp package.json dist
cp README.md dist
