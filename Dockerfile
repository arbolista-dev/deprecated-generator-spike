# WARN: For test purposes only.
FROM node:7.10-alpine

RUN mkdir -p /opt

WORKDIR /opt/app

COPY package.json /tmp/
RUN cd /tmp && npm install -s
RUN mkdir -p /opt/app && cd /opt/app && ln -s /tmp/node_modules

COPY . .

ENTRYPOINT ["npm", "test"]
