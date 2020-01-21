"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

module.exports =
/*#__PURE__*/
function () {
  function ChunksFixer() {
    _classCallCheck(this, ChunksFixer);

    this._prevChunkLastWord = '';
  }

  _createClass(ChunksFixer, [{
    key: "getPrevChunkLastWord",
    value: function getPrevChunkLastWord() {
      return this._prevChunkLastWord;
    }
  }, {
    key: "fixLastWord",
    value: function fixLastWord(chunk) {
      var words = chunk.toString().split(' ');

      if (this._prevChunkLastWord.length > 0) {
        // concat last word from previous chunk to the first word of next chunk
        words[0] = this._prevChunkLastWord.concat(words[0]);
      } // remove last word of chunk to be added to next chunk


      this._prevChunkLastWord = words.pop();
      return words.join(' ');
    }
  }]);

  return ChunksFixer;
}();