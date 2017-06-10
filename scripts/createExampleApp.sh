cd "${0%/*}" && cd ..
npm uninstall yo -g
npm install yo -g
npm install $PWD/dist -g
rm -rf tmp/ && mkdir tmp
yo spike -d tmp
cd tmp
npm install --silent
npm run test
npm run build
cd ..
