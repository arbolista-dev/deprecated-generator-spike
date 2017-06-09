cd "${0%/*}" && cd ../dist
yarn global add yo
yarn global remove .
yarn global add .
cd ..
rm -rf tmp/ && mkdir tmp
yo spike -d tmp
cd tmp
yarn
# npm run test
npm run build
cd ..
