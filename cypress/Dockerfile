FROM cypress/browsers:node14.17.0-chrome91-ff89

WORKDIR /app 

COPY cypress.config.js package.json /app/
RUN yarn install

COPY . /app/cypress

RUN yarn cypress verify

CMD /app/cypress/script/wait_for.sh $DOMAIN && yarn cypress run --config-file cypress.config.js --headless
