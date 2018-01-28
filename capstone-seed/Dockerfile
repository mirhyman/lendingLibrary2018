FROM node:8.1.4
MAINTAINER playbuzz

# System packages
RUN apt-get update && \
   apt-get install -y \
   build-essential \
   htop \
   vim && rm -rf /var/lib/apt/lists/*

# Install yarn
RUN npm set progress=false && \
    npm install -g --progress=false yarn && \
    npm install pm2 -g

ENV PLAYBUZZ_FOLDER=/opt/playbuzz/

# Force Docker not to use the cache
ADD package.json /tmp/

# github key
ARG key

RUN echo "# Enforce SSH\n[url \"git+ssh://git@github.com/playbuzz\"]\n  insteadOf = https://github.com/playbuzz" >  ~/.gitconfig

RUN cd /tmp && \
    eval "$(ssh-agent -s)" && \
    if [ $(echo $key | grep -c "Expires") -eq 1 ]; then wget "${key}" -q -O - > ./ssh_key; else echo "${key}" > ./ssh_key; fi && \
    chmod 700 ./ssh_key && \
    ssh-add ./ssh_key && \
    ssh -o StrictHostKeyChecking=no git@github.com || true && \
    yarn install  && \
    rm ./ssh_key && \
    rm -rf ~/.ssh/*

#ADD node_modules /tmp/node_modules
RUN mkdir -p $PLAYBUZZ_FOLDER && cp -a /tmp/node_modules $PLAYBUZZ_FOLDER

ADD . $PLAYBUZZ_FOLDER
WORKDIR $PLAYBUZZ_FOLDER

EXPOSE 8081

CMD ["pm2-docker", "app.js"]
