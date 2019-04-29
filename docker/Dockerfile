FROM node:11-alpine as stage1

WORKDIR /app

RUN apk add --no-cache --virtual .build-deps alpine-sdk python \
 && npm install --production --silent \
    && apk del .build-deps

ENV PATH /usr/src/app/node_modules/.bin:$PATH

ARG USE_NPM_REGISTRY
RUN npm set registry ${USE_NPM_REGISTRY}

COPY ./package.json /app

## Takes ton of time
RUN cd /app && npm install --no-audit

COPY . /app

ARG ALT_NPM_INSTALL_PACKAGES
RUN cd /app && npm install ${ALT_NPM_INSTALL_PACKAGES} --no-audit

ARG NG_BUILD_ARGS

RUN cd /app && ng build ${NG_BUILD_ARGS}

FROM nginx:alpine

COPY --from=stage1 /app/dist/quantum-ui /usr/share/nginx/html
COPY nginx-custom.conf /etc/nginx/conf.d/default.conf

ARG GIT_HASH_TAG
LABEL GIT_HASH_TAG ${GIT_HASH_TAG}
