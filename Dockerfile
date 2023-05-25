FROM ubuntu:22.04

RUN apt update -y
RUN apt install curl vim lsof -y

RUN curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
ENV NODE_VERSION=18.11.0
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"

RUN curl -fsSLO https://get.docker.com/builds/Linux/x86_64/docker-17.04.0-ce.tgz \
  && tar xzvf docker-17.04.0-ce.tgz \
  && mv docker/docker /usr/local/bin \
  && rm -r docker docker-17.04.0-ce.tgz

RUN npm i -g npm@latest
RUN npm i -g cross-env nodemon dotenv

RUN mkdir -p /home/ubuntu/api

WORKDIR /home/ubuntu/api

COPY . .

RUN npm i

RUN npm run build

# hosts db ip 추가
# RUN sudo echo 172.17.0.3      mariadb >> /etc/hosts

# CMD ["npm", "run", "start"]

# ENTRYPOINT [ "nohup", "npm", "run", "aws", "&" ]