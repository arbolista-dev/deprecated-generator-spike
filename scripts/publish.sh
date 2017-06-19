cd "${0%/*}" && cd ..
if [ -z "$1" ]
  then
    echo "No must supply a new package version"
    exit 1
fi
git checkout develop &&\
  git pull origin develop &&\
  npm version "$1" &&\
  git add package.json &&\
  npm run changelog &&\
  git add CHANGELOG.md -- -n "$1" &&\
  sh scripts/build.sh &&\
  git commit -m "publish at $1" &\
  git push origin develop &&\
  git tag -a "$1" -m "npm version $1" &&\
  git push origin "$1" &&\
  git checkout master &&\
  git merge develop &&\
  git push origin master &&\
  npm publish dist
