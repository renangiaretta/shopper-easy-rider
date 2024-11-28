FROM node:20.11.1-alpine

WORKDIR .

COPY package*.json ./

COPY . .

RUN npm cache clean --force


RUN npm install --legacy-peer-deps

RUN npm run build

EXPOSE 80

CMD [  "npm", "run", "start" ]