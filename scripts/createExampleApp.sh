cd "${0%/*}" && cd ..
yarn global add yo
yarn global remove file:$PWD/dist
yarn global add file:$PWD/dist
rm -rf tmp/ && mkdir tmp
#yo spike -d tmp
#cd tmp
#yarn
# npm run test
#npm run build
#cd ..
