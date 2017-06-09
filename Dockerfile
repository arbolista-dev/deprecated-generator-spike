FROM node:alpine

# Install Yarn.
RUN apk add --no-cache --virtual .build-deps \
    ca-certificates \
    wget \
    tar && \
    cd /usr/local/bin && \
    wget https://yarnpkg.com/latest.tar.gz && \
    tar zvxf latest.tar.gz && \
    ln -s /usr/local/bin/dist/bin/yarn.js /usr/local/bin/yarn.js && \
    apk del .build-deps

EXPOSE 3000

RUN mkdir -p /app
WORKDIR /app

COPY package.json ./
RUN yarn

COPY . .

RUN npm run test
RUN npm run build
RUN sh ./scripts/createExampleApp
ENTRYPOINT npm run test:integration
