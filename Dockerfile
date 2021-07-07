FROM node:14-alpine

ENV INSTALL_PATH /app

COPY package.json yarn.lock /tmp/
RUN cd /tmp && yarn install --frozen-lockfile --ignore-scripts \
  && mkdir -p ${INSTALL_PATH} \
  && cd ${INSTALL_PATH} \
  && cp -R /tmp/node_modules ${INSTALL_PATH} \
  && rm -r /tmp/* && yarn cache clean

WORKDIR ${INSTALL_PATH}

COPY . .

EXPOSE 3000 5000

CMD ["yarn", "start"]