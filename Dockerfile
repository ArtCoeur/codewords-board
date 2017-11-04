FROM ubuntu:latest

MAINTAINER Tim Rodger

# Install dependencies
RUN apt-get update -qq && \
    apt-get -y install \
    nodejs \
    yarn

CMD ["/home/app/run.sh"]

# Move files into place
COPY src/ /home/app/
COPY npm-shrinkwrap.json /home/app/
COPY package.json /home/app/
COPY yarn.lock /home/app/

# deal with unbuntu's daft naming of node binary
RUN sudo ln -s "$(which nodejs)" /usr/bin/node

# Install dependencies
WORKDIR /home/app

RUN yarn install
