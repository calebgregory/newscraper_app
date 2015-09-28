```
               _   _   U _____ u              ____
              | \ |"|  \| ___"|/__        __ / __"| u
             <|  \| |>  |  _|"  \"\      /"/<\___ \/
             U| |\  |u  | |___  /\ \ /\ / /\ u___) |
              |_| \_|   |_____|U  \ V  V /  U|____/>>
              ||   \\,-.<<   >>.-,_\ /\ /_,-. )(  (__)
              (_")  (_/(__) (__)\_)-'  '-(_/ (__)
  ____      ____    ____        _       ____   U _____ u   ____
 / __"| uU /"___|U |  _"\ u U  /"\  u U|  _"\ u\| ___"|/U |  _"\ u
<\___ \/ \| | u   \| |_) |/  \/ _ \/  \| |_) |/ |  _|"   \| |_) |/
 u___) |  | |/__   |  _ <    / ___ \   |  __/   | |___    |  _ <
 |____/>>  \____|  |_| \_\  /_/   \_\  |_|      |_____|   |_| \_\
  )(  (__)_// \\   //   \\_  \\    >>  ||>>_    <<   >>   //   \\_
 (__)    (__)(__) (__)  (__)(__)  (__)(__)__)  (__) (__) (__)  (__)
```

News Scraper is a selective news source.

It gathers news stories from 6 different news networks, analyzes each
story's sentiment value using a bag of words model, and gives you
positive or negative news, depending on which you choose.

# Visit
View the page at [news.caleb-gregory.com](http://news.caleb-gregory.com)

# Accomplished Goals
For this project, I wanted to
- Get two servers to talk to each other using a queuing broker like
  [RabbitMQ](http://www.rabbitmq.com/)
- Use, in some way, [nltk](http://www.nltk.org/)
- Deploy EC2 instances and coordinate communications between them

This project actually uses a total of 3 EC2 ubuntu instances:
- EC2(1) scrapes the RSS feeds of the news sources and stores information about
the articles in an RDB(1)
- EC2(2) grabs data from RDB(2), analyzses it, and stores the result in RDB(2), building an API for the Node app to talk to
- EC2(3) is connected to the Node app via RabbitMQ (using [Celery](http://www.celeryproject.org/)). When called upon, he scrapes the articles again and returns the text.

As mentioned above, I'm also using 2 Amazon RDBs running PostgreSQL, and one heroku instance that hosts the node app.

# From scrape to app
Below is a map of everything that's happening:
```
              EC2         RDS        HEROKU
              ___         ___
scrapes      |   |       (___)
rss feeds,   | 1 | ----> | 1 |
processes,   |   |   ,-- |   |
sends to     |___|   |   '___'
RDS(1)               |
              ___    |    ___
grabs data   |   | <-'   (___)
from RDS(1), | 2 | ----> | 2 |
processes,   |   |       |   | --,
sends to     |___|       '___'   |
RDS(2)                           |    ___
                  amqp           '-> |   |          ::====::
                    \                |app| -------> || .. || - browser
                     ,-------------- |   |   ,      ::====::
                     | ,-----------> |___|   |        _||_
              ___    | | \                   |
receives     |   |   | |  amqp           rendering results
url, scrapes | 3 | <-' |                 from amqp to browser
article,     |   | ----'                 via websocket
sends text   |___|
```

# Where do I see the other code?
Because of some seriously bad .git decisions, my gitflow is all messed
up in the old repository. This README serves as a table of contents
for the code. After hours of trying to fix the old repo, this is my
band-aid solution...

- EC2(1): [RSS
  scraper](https://github.com/calebgregory/entities/tree/scraper/scraper)
- EC2(2): [API
  builder](https://github.com/calebgregory/entities/tree/api_source/api_source)
- EC2(3): [Celery
  worker](https://github.com/calebgregory/entities/tree/python_server/python_server)

# Desired Features
The next step is training my lexicon to have more accurate and precise
sentiment values for each word. Then I'd like to display the
distribution of number of articles with a given sentiment value, just to see,
across all news sources, where the bulk of articles lie.

# Issues
Using a queue with a websocket to populate the page is a cool idea and
novel, but not 100% performant. To work with it, I'm [using setTimeout's
to prevent bottlenecking](https://github.com/calebgregory/newscraper_app/blob/master/app/news/messenger.js#L26-L40), but even still, it's not always reliable.

It would also probably be better to just store the text from each
article in RDB(1) and do all analysis elsewhere. That way I have the
full text for whatever other analysis I want to do in the future, rather
than being constrained to the data I have, which in terms of the article
text is incomplete.

# License
The MIT License (MIT)

Copyright (c) 2015 Caleb Gregory

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be included
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
