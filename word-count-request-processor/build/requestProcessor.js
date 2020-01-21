"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handleTextFromUrl = exports.handleSimpleText = void 0;

var _fs = _interopRequireDefault(require("fs"));

var _https = _interopRequireDefault(require("https"));

var _uuid = _interopRequireDefault(require("uuid"));

require("regenerator-runtime/runtime");

var _queueWriter = _interopRequireDefault(require("../../queues-emulator/queueWriter"));

var _chunksFixer = _interopRequireDefault(require("./chunksFixer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var handleSimpleText =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(text) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _queueWriter["default"].writeMessage(process.env.TXT_TO_COUNT_QUEUE, text);

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function handleSimpleText(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.handleSimpleText = handleSimpleText;

var handleTextFromUrl =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee4(urlPath) {
    var chunksFixer;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            // TODO: be able to retry process file if failed in the middle of stream
            console.log("Start processing file - " + urlPath);
            chunksFixer = new _chunksFixer["default"]();
            return _context4.abrupt("return", new Promise(function (resolve, reject) {
              var req = _https["default"].request(urlPath, function (res) {
                res.on('data',
                /*#__PURE__*/
                function () {
                  var _ref3 = _asyncToGenerator(
                  /*#__PURE__*/
                  regeneratorRuntime.mark(function _callee2(chunk) {
                    var fixedChunk;
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            _context2.prev = 0;
                            fixedChunk = chunksFixer.fixLastWord(chunk);
                            _context2.next = 4;
                            return _queueWriter["default"].writeMessage(process.env.TXT_TO_COUNT_QUEUE, chunk);

                          case 4:
                            _context2.next = 9;
                            break;

                          case 6:
                            _context2.prev = 6;
                            _context2.t0 = _context2["catch"](0);
                            reject(_context2.t0);

                          case 9:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    }, _callee2, null, [[0, 6]]);
                  }));

                  return function (_x3) {
                    return _ref3.apply(this, arguments);
                  };
                }());
                res.on('end',
                /*#__PURE__*/
                _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee3() {
                  var lastWord;
                  return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while (1) {
                      switch (_context3.prev = _context3.next) {
                        case 0:
                          lastWord = chunksFixer.getPrevChunkLastWord();

                          if (!(lastWord && lastWord.length > 0)) {
                            _context3.next = 4;
                            break;
                          }

                          _context3.next = 4;
                          return _queueWriter["default"].writeMessage(process.env.TXT_TO_COUNT_QUEUE, lastWord);

                        case 4:
                          console.log("Finished processing file");
                          resolve();

                        case 6:
                        case "end":
                          return _context3.stop();
                      }
                    }
                  }, _callee3);
                })));
              });

              req.on('error', function (err) {
                reject(err);
              });
              req.end();
            }));

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function handleTextFromUrl(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

exports.handleTextFromUrl = handleTextFromUrl;