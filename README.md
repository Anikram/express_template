# Simple Express.js server #
### *with basic sessions (MongoDb stored)* ###

## Description ##

This is basic express server to kickstart a tiny project.
Your code goes to src/app.js, where Express.js server is listening.

Template has a MongoDb storage settled up ( packages: 'mongoose', 'connect-mongo') and attached to 
express sessions (packages: 'express-sessions').

The project is composed with docker. There are 2 services(app and mongodb), one volume (db).

## Starting up ##

1. Clone repo ```git@github.com:Anikram/express_template.git```
2. Create a ``.env`` file with credentials using hint in  `` .env_example``
3. Run a ```docker-compose up --build``` inside of project's root
4. The app will be accessible on ``localhost:5000``

