cd "${0%/*}" && cd ..
# babel compile server javascript
npm run babel -- src/shared -d dist/shared --ignore test.js &&\
  npm run babel -- src/server -d dist/server --ignore wds.js,test.js,src/server/test &&\
  # copy assets and views
  cp -r src/shared/assets dist/shared && \
  cp -r src/server/views dist/server/views
