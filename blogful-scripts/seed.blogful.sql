INSERT INTO blogful_articles (title, content, date_published)
VALUES
    ('A', 'Some content goes here', now()),
    ('B', 'Some other content goes here', now() - '2 days'::INTERVAL),
    ('C', 'Some content goes here', now() - '3 days'::INTERVAL),
    ('D', 'Some fun content goes here', now() - '10 days'::INTERVAL),
    ('E', 'Some content goes here', now() - '3 days'::INTERVAL),
    ('F', 'Some content goes here', now() - '7 days'::INTERVAL),
    ('G', 'Some content goes here', now() - '9 days'::INTERVAL),
    ('H', 'Some blah blah content goes here', now() - '12 days'::INTERVAL),
    ('I', 'Some content goes here', now() - '8 days'::INTERVAL),
    ('J', 'Some content goes here', now() - '5 days'::INTERVAL),
    ('K', 'Some content goes here', now()),
    ('L', 'Some funny content goes here', now() - '3 days'::INTERVAL),
    ('M', 'Some content goes here', now() - '4 days'::INTERVAL),
    ('N', 'Some christmas content goes here', now() - '5 days'::INTERVAL),
    ('O', 'Some content goes here', now() - '6 days'::INTERVAL),
    ('P', 'Some sports content goes here', now() - '2 days'::INTERVAL),
    ('Q', 'Some thanksgiving content goes here', now() - '15 days'::INTERVAL),
    ('R', 'Some content goes here', now() - '5 days'::INTERVAL),
    ('S', 'Some content goes here', now()),
    ('T', 'Some content goes here', now())
;