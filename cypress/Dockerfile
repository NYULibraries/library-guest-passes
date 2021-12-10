FROM cypress/browsers:node14.17.0-chrome91-ff89

WORKDIR /app 
COPY . /app

RUN yarn install

RUN yarn cypress verify

CMD /app/cypress/script/wait_for.sh $DOMAIN && yarn cypress run --headless
