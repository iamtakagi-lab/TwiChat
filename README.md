# TwiChat
![](./web/public/images/og_image.png)

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