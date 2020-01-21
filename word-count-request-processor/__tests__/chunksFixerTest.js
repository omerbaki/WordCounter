const ChunksFixer = require('../src/chunksFixer');

test('Testing 1234...', () => {
    const chunksFixer = new ChunksFixer();
    expect(chunksFixer.getPrevChunkLastWord()).toBe('');
});