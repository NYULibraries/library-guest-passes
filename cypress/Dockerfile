FROM cypress/browsers

WORKDIR /app 
ADD . /app

RUN yarn install

RUN yarn cypress verify

CMD yarn cypress run --headless