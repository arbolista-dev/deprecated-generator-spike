export BRANCH_NAME=spike
export BUILD_NUMBER=10
docker-compose -f docker-compose.ci.yml pull hub &&\
  docker-compose -f docker-compose.ci.yml pull chrome &&\
  docker build --pull --no-cache --tag spike:${BRANCH_NAME}_${BUILD_NUMBER} . &&\
  docker-compose -f docker-compose.ci.yml up -d &&\
  docker-compose -f docker-compose.ci.yml run --rm -w"/home/spike/generator" spike npm run test:integration

  docker-compose -f docker-compose.ci.yml down
docker rmi spike:spike_10

