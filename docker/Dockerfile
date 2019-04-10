FROM basebuilder:latest as stage1

RUN cd /app && npm install @common/intels@0.0.1

COPY . /app
RUN cd /app && npm run build-prod

# Stage 2 build nginx
FROM nginx:alpine

COPY --from=stage1 /app/dist/quantum-ui /usr/share/nginx/html
COPY nginx-custom.conf /etc/nginx/conf.d/default.conf
