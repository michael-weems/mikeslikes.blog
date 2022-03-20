#build stage for a Node.js application
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY ./*.json ./

RUN npm install
COPY . .
RUN npm run ci-build

#production stage
FROM nginx:stable-alpine as production-stage
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist/ui /usr/share/nginx/html
CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'