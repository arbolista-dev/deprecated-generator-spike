cd "${0%/*}" && cd ..
rm -r dist || mkdir dist &&\
  npm run babel -- src -d dist --ignore test.js,templates/,fixtures/ &&\
  npm run copy:templates &&\
  cp package.json dist &&\
  cp README.md dist
