[![CircleCI](https://circleci.com/gh/kapekost/indexaki.svg?style=svg)](https://circleci.com/gh/kapekost/indexaki)
[![Code Climate](https://codeclimate.com/github/kapekost/indexaki/badges/gpa.svg)](https://codeclimate.com/github/kapekost/indexaki)
[![Test Coverage](https://codeclimate.com/github/kapekost/indexaki/badges/coverage.svg)](https://codeclimate.com/github/kapekost/indexaki/coverage)
# indexaki

###### (Nodejs rest API, firebase, circleci, webpack, Heroku)

##### Create endpoints to push documents in firebase
- #### to add a document
    POST /document/:data
- #### to get the document you added
    GET /document/:data
- #### web interface
    GET /web

## development

```shell
 npm dev
 ```

- set env vars for Firebase
```javascript
var config = {
    apiKey: process.env.FB_APIKEY,
    authDomain: process.env.FB_AUTHDOMAIN,
    databaseURL: process.env.FB_DBURL || "ws://localhost.firebaseio.test:5000", //for mocha
    storageBucket: process.env.FB_BUCKET
};
```

under development