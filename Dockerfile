FROM alpine:3.18.3 AS build
ENV PATH="${PATH}:/sbin"
RUN apk update && \
    apk add --update nodejs npm
COPY package*.json /app/
WORKDIR /app
RUN npm i
COPY ./angular.json ./tsconfig* .
COPY ./src ./src
RUN npm run build

FROM nginx:1.25.2
COPY --from=build /app/dist/* /usr/share/nginx/html
COPY nginx.conf /etc/nginx/html
CMD [ "nginx", "-g", "daemon off;" ]
