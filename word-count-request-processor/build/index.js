"use strict";

var _dotenv = _interopRequireDefault(require("dotenv"));

var _uuid = _interopRequireDefault(require("uuid"));

var _queueReader = _interopRequireDefault(require("../../queues-emulator/queueReader"));

var _queueWriter = _interopRequireDefault(require("../../queues-emulator/queueWriter"));

var _requestProcessor = require("./requestProcessor");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_dotenv["default"].config();

console.log("Start word-count-request-processor");

_queueWriter["default"].initQueue(process.env.TXT_TO_COUNT_QUEUE);

_queueReader["default"].readMessagesFromQueue(process.env.WORD_COUNT_REQUEST_QUEUE,
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
            return processMessage(data);

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

var processMessage =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(data) {
    var request;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            console.log("Processing message - " + data);
            request = JSON.parse(data);

            if (!request.hasOwnProperty('value')) {
              _context2.next = 7;
              break;
            }

            _context2.next = 5;
            return (0, _requestProcessor.handleSimpleText)(request.value);

          case 5:
            _context2.next = 15;
            break;

          case 7:
            if (!request.hasOwnProperty('file')) {
              _context2.next = 12;
              break;
            }

            _context2.next = 10;
            return (0, _requestProcessor.handleTextFromUrl)(request.file);

          case 10:
            _context2.next = 15;
            break;

          case 12:
            if (!request.hasOwnProperty('url')) {
              _context2.next = 15;
              break;
            }

            _context2.next = 15;
            return (0, _requestProcessor.handleTextFromUrl)(request.url);

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function processMessage(_x2) {
    return _ref2.apply(this, arguments);
  };
}();