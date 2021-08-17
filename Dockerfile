FROM node:16-alpine as build
WORKDIR /app
COPY package*.json /app/

# Update npm
RUN npm install -g npm@7.20.6

# Install ionic
RUN npm install -g ionic

#RUN npm install -g cordova ionic
#RUN npm install -g bower
#RUN npm install -g gulp

RUN npm install
COPY ./ /app/
RUN npm run-script build:prod

FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/www/ /usr/share/nginx/html/
