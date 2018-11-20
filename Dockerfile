FROM mhart/alpine-node:11

WORKDIR /app

RUN apk --no-cache add --virtual .build-deps make python g++
COPY . .
RUN npm install && npm rebuild bcrypt --build-from-source && apk del .build-deps

CMD ["npm", "run", "start:dev"]
