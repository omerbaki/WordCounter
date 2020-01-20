"use strict";

var _cors = _interopRequireDefault(require("cors"));

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _dotenv = _interopRequireDefault(require("dotenv"));

require("regenerator-runtime/runtime");

var _db = _interopRequireDefault(require("../../document-db-emulator/db"));

var _queueWriter = _interopRequireDefault(require("../../queues-emulator/queueWriter"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

_dotenv["default"].config();

_queueWriter["default"].initQueue(process.env.WORD_COUNT_REQUEST_QUEUE);

var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use(_bodyParser["default"].json());
app.get('/word-stats',
/*#__PURE__*/
function () {
  var _ref = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(req, res) {
    var dbData, word, wordCount;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = JSON;
            _context.next = 3;
            return _db["default"].read();

          case 3:
            _context.t1 = _context.sent;
            dbData = _context.t0.parse.call(_context.t0, _context.t1);
            word = req.query.word;
            wordCount = dbData.hasOwnProperty(word) ? dbData[word] : 0;
            res.status(200).send(wordCount.toString());

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());
app.post('/word-counter',
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee2(req, res) {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(!req.body.hasOwnProperty('value') && !req.body.hasOwnProperty('file') && !req.body.hasOwnProperty('url'))) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt("return", res.status(400).send("Body should contain one of the following properties: value, file, url"));

          case 2:
            _context2.prev = 2;
            _context2.next = 5;
            return _queueWriter["default"].writeMessage(process.env.WORD_COUNT_REQUEST_QUEUE, JSON.stringify(req.body));

          case 5:
            res.sendStatus(200);
            _context2.next = 12;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](2);
            console.log("Failed to process request - " + _context2.t0);
            res.status(500).send("Server failed to process request");

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[2, 8]]);
  }));

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}());
app.listen(process.env.PORT, function () {
  return console.log("WordApi listening on port ".concat(process.env.PORT, "!"));
});