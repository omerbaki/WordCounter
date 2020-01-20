"use strict";

var _dotenv = _interopRequireDefault(require("dotenv"));

require("regenerator-runtime/runtime");

var _queueReader = _interopRequireDefault(require("../../queues-emulator/queueReader"));

var _db = _interopRequireDefault(require("../../document-db-emulator/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_dotenv["default"].config();

var reduceAndUpdateDb =
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2() {
    var finalCount, dirtyFlag;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log("start word count reducer");
            _context2.t0 = JSON;
            _context2.next = 4;
            return _db["default"].read();

          case 4:
            _context2.t1 = _context2.sent;
            finalCount = _context2.t0.parse.call(_context2.t0, _context2.t1);
            dirtyFlag = false;
            _context2.next = 9;
            return _queueReader["default"].readMessagesFromQueue(process.env.COUNTED_WORDS_QUEUE,
            /*#__PURE__*/
            function () {
              var _ref2 = _asyncToGenerator(
              /*#__PURE__*/
              regeneratorRuntime.mark(function _callee(countedWordsStr) {
                var countedWords;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        if (countedWordsStr) {
                          _context.next = 2;
                          break;
                        }

                        return _context.abrupt("return");

                      case 2:
                        dirtyFlag = true;
                        countedWords = JSON.parse(countedWordsStr);
                        Object.keys(countedWords).reduce(function (prev, nxt) {
                          prev[nxt] = prev[nxt] + countedWords[nxt] || countedWords[nxt];
                          return prev;
                        }, finalCount);

                      case 5:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee);
              }));

              return function (_x) {
                return _ref2.apply(this, arguments);
              };
            }());

          case 9:
            if (dirtyFlag) {
              _db["default"].write(JSON.stringify(finalCount));

              console.log("Updated word count in DB");
            }

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function reduceAndUpdateDb() {
    return _ref.apply(this, arguments);
  };
}();

setInterval(
/*#__PURE__*/
_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee3() {
  return regeneratorRuntime.wrap(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return reduceAndUpdateDb();

        case 2:
          return _context3.abrupt("return", _context3.sent);

        case 3:
        case "end":
          return _context3.stop();
      }
    }
  }, _callee3);
})), 10000);