# TwiChat
![](./web/public/images/og_image.png)

This service received [over 120 retweets](https://twitter.com/919takagi/status/1506935485310324737) and [over 1350 users](https://i.imgur.com/pqw92bC.png) in about a month.

## Install

Run `$ docker-compose up -d --build`

Environment variable setting in backend is required.
```
POSTGRES_DB=twichat
POSTGRES_USER=twichat
POSTGRES_PASSWORD=twichat
POSTGRES_HOST=postgres
SECRET_KEY=secret
DEBUG=true
TWITTER_API_CONKEY=xxx
TWITTER_API_CONSEC=xxx
BACKEND_HOSTNAME=http://localhost
WEBPAGE_BASE_URL=http://localhost
```

## References
- [jsvine/markovify](https://github.com/jsvine/markovify)
- [MeCab](https://taku910.github.io/mecab)
- [cordx56/tweet-generator](https://github.com/cordx56/tweet-generator)

## LICENSE
MIT License