DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS news_items;
DROP TABLE IF EXISTS stocks;
DROP TABLE IF EXISTS portfolio;
DROP TABLE IF EXISTS lists;


CREATE TABLE users (
    id SERIAL NOT NULL PRIMARY KEY,
    username VARCHAR(50) NOT NULL
);


CREATE TABLE news_items (
    id SERIAL NOT NULL PRIMARY KEY,
    title VARCHAR(5000),
    time_published VARCHAR(50),
    banner_image VARCHAR(5000),
    summary TEXT
);


CREATE TABLE stocks (
    id SERIAL NOT NULL PRIMARY KEY,
    symbol VARCHAR(10)
);


CREATE TABLE portfolio (
    id SERIAL NOT NULL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users("id") ON DELETE CASCADE,
    stock_id INT NOT NULL REFERENCES stocks("id") ON DELETE CASCADE,
    num_shares SMALLINT,
    cost_basis FLOAT
);

CREATE TABLE saved_news_items (
    id SERIAL NOT NULL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users("id") ON DELETE CASCADE,
    item_id INT NOT NULL REFERENCES news_items("id") ON DELETE CASCADE,
    preference VARCHAR(5) check(preference='hate' or preference='heart')
);

CREATE TABLE saved_stocks (
    id SERIAL NOT NULL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users("id") ON DELETE CASCADE,
    item_id INT NOT NULL REFERENCES stocks("id") ON DELETE CASCADE,
    preference VARCHAR(5) check(preference='hate' or preference='heart')
);


INSERT INTO users VALUES
    (1, 'wpooh'),
    (2, 'ccat'),
    (3, 'twinky')
;

INSERT INTO news_items VALUES
    (1, 'Best news title ever', '20201010', 'bannerimageurl.com', 'summarysummarysummarysummary'),
    (2, 'Worst news title ever', '19991010', 'woah.com', 'summarysummarysummarysummary'),
    (3, 'Okest news title ever', '20061010', 'sosocool.com', 'summarysummarysummarysummary')
;

INSERT INTO stocks VALUES
    (1, 'AAPL'),
    (2, 'NFLX'),
    (2, 'NFLX')
;

INSERT INTO portfolio VALUES
    (1, 1, 1, '10', '100.00'),
    (2, 2, 2, '12', '100.00')
;

INSERT INTO saved_news_items VALUES
    (1, 2, 1, 'hate'),
    (1, 2, 3, 'heart')
;

INSERT INTO saved_stocks VALUES
    (1, 2, 1, 'hate'),
    (1, 2, 3, 'heart')
;
