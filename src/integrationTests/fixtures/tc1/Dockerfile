FROM node:alpine

EXPOSE 3000

# Set up specific user "app" and grant permissions.
RUN addgroup -S app && adduser -S -g app app &&\
  chown -R app /usr/local &&\
  mkdir -p /home/app/code && chown app /home/app/code
ENV HOME=/home/app
USER spike

WORKDIR $HOME/code

COPY . .
RUN npm install --silent && npm run test && npm run build

CMD ["npm", "start"]
