FROM node:current-buster 

RUN mkdir -p /usr/src/app

ADD ./ /usr/src/app

WORKDIR /usr/src/app

RUN npm install

EXPOSE 4000

CMD ["node", "server.js" ]
