FROM node:alpine

EXPOSE 3000

# Set up user spike and grant permissions.
RUN addgroup -S spike && adduser -S -g spike spike &&\
  chown -R spike /usr/local &&\
  mkdir -p /home/spike/generator && chown spike /home/spike/generator &&\
  mkdir -p /home/spike/app && chown spike /home/spike/app &&\
  mkdir -p /home/spike/tests && chown spike /home/spike/tests
ENV HOME=/home/spike
USER spike

# Copy generator and install dependencies.
WORKDIR $HOME/generator
COPY . .
RUN npm install --silent

# yeoman-assert is overriding RunContext#targetDirectory
# with CWD and overwriting all files with files generated in
# the tests. Run unit tests in a separate directory as
# a workaround.
WORKDIR $HOME/tests
COPY . .
RUN cp -a $HOME/generator/node_modules $HOME/tests && npm run test

# If tests succeed, build and install the generator-spike.
WORKDIR $HOME/generator
RUN npm run build && npm install yo -g --silent && npm install $HOME/generator/dist -g --silent
# This will be health once tmp app is up and running.
HEALTHCHECK CMD sh $HOME/generator/scripts/isTmpAppRunning.sh

# create the example app
WORKDIR $HOME/app
RUN yo spike && npm run test && npm run build
CMD ISOMORPHIC=1 FIXTURES=1 npm start
