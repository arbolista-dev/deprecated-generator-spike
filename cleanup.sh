export BRANCH_NAME=spike
export BUILD_NUMBER=10
docker-compose -f docker-compose.ci.yml down
docker rmi spike:spike_10
