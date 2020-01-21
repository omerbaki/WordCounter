module.exports = class ChunksFixer {
    constructor() {
        this._prevChunkLastWord = '';
    }

    getPrevChunkLastWord() {
        return this._prevChunkLastWord;
    }

    fixLastWord(chunk) {
        const words = chunk.toString().split(' ');
        if (this._prevChunkLastWord.length > 0) {
            // concat last word from previous chunk to the first word of next chunk
            words[0] = this._prevChunkLastWord.concat(words[0]);
        }

        // remove last word of chunk to be added to next chunk
        this._prevChunkLastWord = words.pop();
        return words.join(' ');
    }
}