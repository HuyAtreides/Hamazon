FROM node:14.17.5-alpine AS build

WORKDIR /usr/hamazon/front-end

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.17.1-alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /usr/hamazon/front-end/dist/hamazon /usr/share/nginx/html