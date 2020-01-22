const ChunksFixer = require('../src/chunksFixer');

test('Test init state', () => {
    const chunksFixer = new ChunksFixer();
    expect(chunksFixer.getPrevChunkLastWord()).toBe('');
});

test('Fix chunk should remove last word and concat to the beginning next chunk', () => {
    const testChunks = ["This is a chunk exa", "mple to check"];
    const chunksFixer = new ChunksFixer();

    const firstChunk = chunksFixer.fixLastWord(testChunks[0]);
    expect(firstChunk).toBe('This is a chunk');

    const secondChunk = chunksFixer.fixLastWord(testChunks[1]);
    expect(secondChunk).toBe('example to');

    expect(chunksFixer.getPrevChunkLastWord()).toBe('check');
});