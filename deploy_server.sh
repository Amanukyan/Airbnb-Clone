#! /bin/bash
yarn build:server
heroku container:push --app=blooming-bastion-58487 web
heroku container:release --app=blooming-bastion-58487 web