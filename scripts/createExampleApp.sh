cd "${0%/*}" && cd ..
sh ./scripts/build.sh
npm uninstall yo -g
npm install yo -g
npm uninstall $PWD/dist -g
npm install $PWD/dist -g
rm -rf tmp/ && mkdir tmp
yo spike -d tmp
cd tmp
npm install
npm run test
npm run build
cd ..
