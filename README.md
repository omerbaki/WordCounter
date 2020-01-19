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

# word-count-request-processor
Handle the word count request.
1) For simple text - simply insert the text to txt-to-count-queue
2) For files and urls - get the response from the file/url in chunks and insert each chunk as a job to txt-to-count-queue

# word-count-mapper
Count the words in each txt-to-count job. Split the text to words and remove special characters.
Insert each count to counted-words-queue for final reduction.

# word-count-reducer
Read all counts in counted-words-queue and reduce the count into single count per word and merge with count in DB.
