FROM node:18.14.2-alpine3.17

WORKDIR /usr/app/src

COPY package*.json ./

RUN npm install

# COPY . .

EXPOSE ${PORT}

CMD [ "npm", "run", "start:dev" ]
