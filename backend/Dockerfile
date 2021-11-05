FROM node:alpine

WORKDIR /backend

COPY package*.json ./

RUN npm install
RUN npx prisma init

COPY . .

RUN npx prisma generate

CMD [ "node", "server.js" ]