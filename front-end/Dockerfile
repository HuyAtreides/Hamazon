FROM node:14.17.5

WORKDIR /usr/hamazon/front-end

COPY package*.json ./

RUN npm install --no-package-lock

COPY . .

CMD [ "npm", "run", "start" ]