FROM node:9.5.0

RUN mkdir -p /usr/src/server
WORKDIR /usr/src/server

RUN curl -sS http://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - 
RUN echo "deb http://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN apt-get update && apt-get install yarn

RUN yarn global add @adonisjs/cli

RUN yarn install 

COPY . /usr/src/server
COPY package.json .

# RUN adonis migration:run

ENV HOST 0.0.0.0

EXPOSE 3334
  
CMD ["yarn", "run", "start"]



