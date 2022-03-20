#build stage for a Node.js application
FROM node:lts-alpine as build-stage
WORKDIR /app
COPY ./*.json ./

RUN npm install
COPY . .
RUN npm run ci-build

#production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist/ui /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]