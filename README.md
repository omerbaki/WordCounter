# WordCounter

![Design](https://github.com/omerbaki/WordCounter/blob/master/design.png)


# word-api
### /word-counter
This endpoint accepts POST request with the following options and write the request to queue for processing.
request format options:
1) {"value":"some text"}
2) {"file":"https://path-to-some-file.txt"}
3) {"url":"https://some-api"}

### /word-stats
This endpoint accepts GET request with a word param and returns the number of occurences in db.
example: word-api/word-stats?word=some_word
