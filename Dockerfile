FROM node:alpine as stage1

WORKDIR /app

ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY ./package.json /app
RUN cd /app && npm install

COPY .  /app
RUN cd /app && npm run build-prod

# Stage 2 build nginx
FROM nginx:alpine

COPY --from=stage1 /app/dist/quantum-ui /usr/share/nginx/html
COPY nginx-custom.conf /etc/nginx/conf.d/default.conf
