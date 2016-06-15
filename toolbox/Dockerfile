FROM debian:jessie

ARG artifactory_credentials

# apt-get
RUN apt-get update \
        && apt-get install -y --force-yes node-gyp curl \
        && rm -rf /var/lib/apt/lists/*

## Install node
WORKDIR /
ADD https://${artifactory_credentials}@bin.barco.com/artifactory/www-cache/node-v4.2.4-linux-x64.tar.gz /
RUN tar xvf node-v4.2.4-linux-x64.tar.gz
RUN ln -s /node-v4.2.4-linux-x64/bin/npm /usr/local/bin
RUN ln -s /node-v4.2.4-linux-x64/bin/node /usr/local/bin

## Npm package server, credentials must be stored in ~/.npmrc
#ENV NPM_CONFIG_REGISTRY=https://bin.barco.com/artifactory/api/npm/npm-virtual
