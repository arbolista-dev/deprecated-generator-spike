cd "${0%/*}" && cd ..
yarn global add yo
yarn global add ./
rm -r tmp/ || mkdir tmp && cd tmp
yo spike
cd ..
