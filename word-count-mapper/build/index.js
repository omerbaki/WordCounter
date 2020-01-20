"use strict";

var _dotenv = _interopRequireDefault(require("dotenv"));

var _uuid = _interopRequireDefault(require("uuid"));

require("regenerator-runtime/runtime");

var _queueReader = _interopRequireDefault(require("../../queues-emulator/queueReader"));

var _queueWriter = _interopRequireDefault(require("../../queues-emulator/queueWriter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_dotenv["default"].config();

console.log("Start word-count-mapper");

_queueWriter["default"].initQueue(process.env.COUNTED_WORDS_QUEUE);

_queueReader["default"].readMessagesFromQueue(process.env.TXT_TO_COUNT_QUEUE,
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(data) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return countWords(data);

          case 2:
            return _context.abrupt("return", _context.sent);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}());

var countWords =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(txt) {
    var words, wordsCount;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (txt) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt("return");

          case 2:
            words = txt.toLowerCase().split(/[ .:;?!~,`"'&|()<>{}\[\]\r\n/\\]+/);
            wordsCount = words.reduce(function (prev, nxt) {
              if (nxt && nxt.length >= 2) {
                prev[nxt] = prev[nxt] + 1 || 1;
              }

              return prev;
            }, {});
            _context2.next = 6;
            return _queueWriter["default"].writeMessage(process.env.COUNTED_WORDS_QUEUE, JSON.stringify(wordsCount));

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function countWords(_x2) {
    return _ref2.apply(this, arguments);
  };
}();