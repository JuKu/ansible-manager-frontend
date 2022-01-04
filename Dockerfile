FROM node:16-alpine as build
WORKDIR /app
COPY package*.json /app/

# Update npm
RUN npm install -g npm@7.20.6
RUN npm install -g @angular/cli

ENV BACKEND_API_URL http://anman-manager/
ENV DEFAULT_LANGUAGE de

# Install ionic
RUN npm install -g ionic

#RUN npm install -g cordova ionic
#RUN npm install -g bower
#RUN npm install -g gulp

RUN npm install
COPY ./ /app/
#RUN ng build --prod
RUN npm run-script build:prod

FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/www/ /usr/share/nginx/html/

# replace BACKEND_API_URL, see also: https://blog.codecentric.de/en/2019/03/docker-angular-dockerize-app-easily/
RUN echo "mainFileName=\"\$(ls /usr/share/nginx/html/main*.js)\" && \
          envsubst '\$BACKEND_API_URL \$DEFAULT_LANGUAGE ' < \${mainFileName} > main.tmp && \
          mv main.tmp  \${mainFileName} && nginx -g 'daemon off;'" > run.sh

ENTRYPOINT ["sh", "run.sh"]
