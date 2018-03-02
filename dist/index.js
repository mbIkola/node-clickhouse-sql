"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _values = _interopRequireDefault(require("@babel/runtime/core-js/object/values"));

var _keys = _interopRequireDefault(require("@babel/runtime/core-js/object/keys"));

var _isFinite = _interopRequireDefault(require("@babel/runtime/core-js/number/is-finite"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _getPrototypeOf = _interopRequireDefault(require("@babel/runtime/core-js/object/get-prototype-of"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var EQUALS = "=";
var GREATER = ">";
var GREATER_OR_EQUALS = ">=";
var LESS = "<";
var LESS_OR_EQUALS = "<=";
var NOT_EQUALS = "!=";
var Consts = {
  EQUALS: EQUALS,
  GREATER: GREATER,
  GREATER_OR_EQUALS: GREATER_OR_EQUALS,
  LESS: LESS,
  LESS_OR_EQUALS: LESS_OR_EQUALS,
  NOT_EQUALS: NOT_EQUALS
};

var SQLObject = function SQLObject() {
  (0, _classCallCheck2.default)(this, SQLObject);
};

var Conditions =
/*#__PURE__*/
function (_SQLObject) {
  (0, _inherits2.default)(Conditions, _SQLObject);

  function Conditions() {
    var _this;

    (0, _classCallCheck2.default)(this, Conditions);
    _this = (0, _possibleConstructorReturn2.default)(this, (Conditions.__proto__ || (0, _getPrototypeOf.default)(Conditions)).call(this));

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this.args = args;
    return _this;
  }

  (0, _createClass2.default)(Conditions, [{
    key: "push",
    value: function push(arg) {
      this.args.push(arg);
    }
  }, {
    key: "length",
    get: function get() {
      return this.args.length;
    }
  }]);
  return Conditions;
}(SQLObject);

var Disjunction =
/*#__PURE__*/
function (_Conditions) {
  (0, _inherits2.default)(Disjunction, _Conditions);

  function Disjunction() {
    var _ref;

    (0, _classCallCheck2.default)(this, Disjunction);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return (0, _possibleConstructorReturn2.default)(this, (_ref = Disjunction.__proto__ || (0, _getPrototypeOf.default)(Disjunction)).call.apply(_ref, [this].concat(args)));
  }

  (0, _createClass2.default)(Disjunction, [{
    key: "toString",
    value: function toString() {
      return this.args.length ? this.args.map(function (arg) {
        return "(" + arg + ")";
      }).join(" or ") : "";
    }
  }]);
  return Disjunction;
}(Conditions);

var Conjunction =
/*#__PURE__*/
function (_Conditions2) {
  (0, _inherits2.default)(Conjunction, _Conditions2);

  function Conjunction() {
    var _ref2;

    (0, _classCallCheck2.default)(this, Conjunction);

    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return (0, _possibleConstructorReturn2.default)(this, (_ref2 = Conjunction.__proto__ || (0, _getPrototypeOf.default)(Conjunction)).call.apply(_ref2, [this].concat(args)));
  }

  (0, _createClass2.default)(Conjunction, [{
    key: "toString",
    value: function toString() {
      return this.args.length ? this.args.map(function (arg) {
        return "(" + arg + ")";
      }).join(" and ") : "";
    }
  }]);
  return Conjunction;
}(Conditions);

var Condition =
/*#__PURE__*/
function (_SQLObject2) {
  (0, _inherits2.default)(Condition, _SQLObject2);

  function Condition(column, operator, value) {
    var _this2;

    (0, _classCallCheck2.default)(this, Condition);
    _this2 = (0, _possibleConstructorReturn2.default)(this, (Condition.__proto__ || (0, _getPrototypeOf.default)(Condition)).call(this));
    _this2.column = column;
    _this2.operator = operator;
    _this2.value = value;
    return _this2;
  }

  (0, _createClass2.default)(Condition, [{
    key: "toString",
    value: function toString() {
      if (this.operator) {
        return [quoteTerm(this.column), this.operator, quoteVal(this.value)].join(' ');
      } else {
        return this.column;
      }
    }
  }]);
  return Condition;
}(SQLObject);

var Negation =
/*#__PURE__*/
function (_Condition) {
  (0, _inherits2.default)(Negation, _Condition);

  function Negation(column, operator, value) {
    (0, _classCallCheck2.default)(this, Negation);
    return (0, _possibleConstructorReturn2.default)(this, (Negation.__proto__ || (0, _getPrototypeOf.default)(Negation)).call(this, column, operator, value));
  }

  (0, _createClass2.default)(Negation, [{
    key: "toString",
    value: function toString() {
      return "not(" + (0, _get2.default)(Negation.prototype.__proto__ || (0, _getPrototypeOf.default)(Negation.prototype), "toString", this).call(this) + ")";
    }
  }]);
  return Negation;
}(Condition);

var InclusionOperator =
/*#__PURE__*/
function (_Condition2) {
  (0, _inherits2.default)(InclusionOperator, _Condition2);

  function InclusionOperator(inclusionType, column, operator, value) {
    var _this3;

    (0, _classCallCheck2.default)(this, InclusionOperator);
    _this3 = (0, _possibleConstructorReturn2.default)(this, (InclusionOperator.__proto__ || (0, _getPrototypeOf.default)(InclusionOperator)).call(this, column, operator, value));
    _this3.operator = inclusionType;
    return _this3;
  }

  (0, _createClass2.default)(InclusionOperator, [{
    key: "toString",
    value: function toString() {
      return [this.column, this.operator, "(", Array.isArray(this.value) ? this.value.map(function (val) {
        return quoteVal(val);
      }).join(',') : this.value, ")"].join('');
    }
  }]);
  return InclusionOperator;
}(Condition);

var In =
/*#__PURE__*/
function (_InclusionOperator) {
  (0, _inherits2.default)(In, _InclusionOperator);

  function In() {
    var _ref3;

    (0, _classCallCheck2.default)(this, In);

    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    return (0, _possibleConstructorReturn2.default)(this, (_ref3 = In.__proto__ || (0, _getPrototypeOf.default)(In)).call.apply(_ref3, [this, "in"].concat(args)));
  }

  return In;
}(InclusionOperator);

var NotIn =
/*#__PURE__*/
function (_InclusionOperator2) {
  (0, _inherits2.default)(NotIn, _InclusionOperator2);

  function NotIn() {
    var _ref4;

    (0, _classCallCheck2.default)(this, NotIn);

    for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      args[_key5] = arguments[_key5];
    }

    return (0, _possibleConstructorReturn2.default)(this, (_ref4 = NotIn.__proto__ || (0, _getPrototypeOf.default)(NotIn)).call.apply(_ref4, [this, "not in"].concat(args)));
  }

  return NotIn;
}(InclusionOperator);

var GlobalNotIn =
/*#__PURE__*/
function (_InclusionOperator3) {
  (0, _inherits2.default)(GlobalNotIn, _InclusionOperator3);

  function GlobalNotIn() {
    var _ref5;

    (0, _classCallCheck2.default)(this, GlobalNotIn);

    for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
      args[_key6] = arguments[_key6];
    }

    return (0, _possibleConstructorReturn2.default)(this, (_ref5 = GlobalNotIn.__proto__ || (0, _getPrototypeOf.default)(GlobalNotIn)).call.apply(_ref5, [this, "global not in"].concat(args)));
  }

  return GlobalNotIn;
}(InclusionOperator);

var GlobalIn =
/*#__PURE__*/
function (_InclusionOperator4) {
  (0, _inherits2.default)(GlobalIn, _InclusionOperator4);

  function GlobalIn() {
    var _ref6;

    (0, _classCallCheck2.default)(this, GlobalIn);

    for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
      args[_key7] = arguments[_key7];
    }

    return (0, _possibleConstructorReturn2.default)(this, (_ref6 = GlobalIn.__proto__ || (0, _getPrototypeOf.default)(GlobalIn)).call.apply(_ref6, [this, "global in"].concat(args)));
  }

  return GlobalIn;
}(InclusionOperator);

var Operators = {
  Conjunction: Conjunction,
  Disjunction: Disjunction,
  Negation: Negation,
  In: In,
  NotIn: NotIn,
  GlobalIn: GlobalIn,
  GlobalNotIn: GlobalNotIn
};

function createCondition() {
  for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
    args[_key8] = arguments[_key8];
  }

  switch (args.length) {
    case 1:
      return args[0] instanceof Condition ? args[0] : new Condition(args[0]);

    case 2:
      return new Condition(args[0], EQUALS, args[1]);

    case 3:
      return new (Function.prototype.bind.apply(Condition, [null].concat(args)))();

    default:
      throw new Error("Invalid condition args: ", args);
  }
}

var commonReplacer = [/[\0\n\r\b\t\\'"\x1a]/g, function (s) {
  switch (s) {
    case "\0":
      return "\\0";

    case "\n":
      return "\\n";

    case "\b":
      return "\\b";

    case "\r":
      return "\\r";

    case "\t":
      return "\\t";

    case "\\":
      return "\\\\";

    case "\x1a":
      return "\\Z";
  }
}];

var Value =
/*#__PURE__*/
function (_SQLObject3) {
  (0, _inherits2.default)(Value, _SQLObject3);

  function Value(value) {
    var _this4;

    (0, _classCallCheck2.default)(this, Value);
    _this4 = (0, _possibleConstructorReturn2.default)(this, (Value.__proto__ || (0, _getPrototypeOf.default)(Value)).call(this));
    _this4.value = value;
    return _this4;
  }

  (0, _createClass2.default)(Value, [{
    key: "toString",
    value: function toString() {
      if (typeof this.value === "string") {
        var _value;

        return "'" + (_value = this.value).replace.apply(_value, commonReplacer).replace(/'/g, "''") + "'";
      }

      if (typeof this.value === 'undefined') {
        return "''";
      }

      if (Array.isArray(this.value)) {
        return this.value.map(function (val) {
          return new Value(val);
        }).join();
      }

      return this.value + '';
    }
  }]);
  return Value;
}(SQLObject);

var Term =
/*#__PURE__*/
function (_SQLObject4) {
  (0, _inherits2.default)(Term, _SQLObject4);

  function Term(term) {
    var _this5;

    (0, _classCallCheck2.default)(this, Term);
    _this5 = (0, _possibleConstructorReturn2.default)(this, (Term.__proto__ || (0, _getPrototypeOf.default)(Term)).call(this));
    _this5.term = term;
    return _this5;
  }

  (0, _createClass2.default)(Term, [{
    key: "toString",
    value: function toString() {
      var _term;

      return '`' + (_term = this.term).replace.apply(_term, commonReplacer).replace(/`/g, '\\`') + '`';
    }
  }]);
  return Term;
}(SQLObject);

function quoteVal(value) {
  return value instanceof SQLObject ? value : new Value(value);
}

function quoteTerm(term) {
  return term instanceof SQLObject || (0, _isFinite.default)(term) ? term : new Term(term);
}

var SQLFunction =
/*#__PURE__*/
function (_SQLObject5) {
  (0, _inherits2.default)(SQLFunction, _SQLObject5);

  function SQLFunction(name) {
    var _this6;

    (0, _classCallCheck2.default)(this, SQLFunction);
    _this6 = (0, _possibleConstructorReturn2.default)(this, (SQLFunction.__proto__ || (0, _getPrototypeOf.default)(SQLFunction)).call(this));
    _this6.name = name;

    for (var _len9 = arguments.length, args = new Array(_len9 > 1 ? _len9 - 1 : 0), _key9 = 1; _key9 < _len9; _key9++) {
      args[_key9 - 1] = arguments[_key9];
    }

    _this6.args = args;
    return _this6;
  }

  (0, _createClass2.default)(SQLFunction, [{
    key: "toString",
    value: function toString() {
      return this.name + "(" + this.args.map(function (arg) {
        return arg instanceof SQLObject || (0, _isFinite.default)(arg) ? arg : quoteTerm(arg);
      }).join() + ")";
    }
  }]);
  return SQLFunction;
}(SQLObject);

var _curry_f = function _curry_f(name) {
  return function () {
    for (var _len10 = arguments.length, args = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
      args[_key10] = arguments[_key10];
    }

    return new (Function.prototype.bind.apply(SQLFunction, [null].concat([name], args)))();
  };
};

var AggregateFunctions = {
  count: _curry_f('count'),
  any: _curry_f('any'),
  anyLast: _curry_f('anyLast'),
  min: _curry_f('min'),
  max: _curry_f('max'),
  sum: _curry_f('sum'),
  avg: _curry_f('avg'),
  uniq: _curry_f('uniq'),
  uniqCombined: _curry_f('uniqCombined'),
  uniqHLL12: _curry_f('uniqHLL12'),
  uniqExact: _curry_f('uniqExect'),
  groupArray: _curry_f('groupArray'),
  groupUniqArray: _curry_f('groupUniqArray')
};
var ArithmeticFunctions = {
  plus: _curry_f('plus'),
  minus: _curry_f('minus'),
  multiply: _curry_f('multiply'),
  divide: _curry_f('divide'),
  intDiv: _curry_f('intDiv'),
  intDivOrZero: _curry_f('intDivOrZero'),
  modulo: _curry_f('modulo'),
  negate: _curry_f('negate'),
  abs: _curry_f('abs')
};
var TimeFunctions = {
  toYear: _curry_f('toYear'),
  toMonth: _curry_f('toMonth'),
  toDayOfMonth: _curry_f('toDayOfMonth'),
  toDayOfWeek: _curry_f('toDayOfWeek'),
  toHour: _curry_f('toHour'),
  toMinute: _curry_f('toMinute'),
  toTime: _curry_f('toTime'),
  toStartOfDay: _curry_f('toStartOfDay'),
  toStartOfMonth: _curry_f('toStartOfMonth'),
  toStartOfQuarter: _curry_f('toStartOfQuarter'),
  toStartOfYear: _curry_f('toStartOfYear'),
  toStartOfMinute: _curry_f('toStartOfMinute'),
  toStartOfFiveMinute: _curry_f('toStartOfFiveMinute'),
  toStartOfHour: _curry_f('toStartOfHour'),
  now: _curry_f('now'),
  today: _curry_f('today'),
  yesterday: _curry_f('yesterday')
};

var Raw =
/*#__PURE__*/
function (_SQLObject6) {
  (0, _inherits2.default)(Raw, _SQLObject6);

  function Raw(string) {
    var _this7;

    (0, _classCallCheck2.default)(this, Raw);
    _this7 = (0, _possibleConstructorReturn2.default)(this, (Raw.__proto__ || (0, _getPrototypeOf.default)(Raw)).call(this));
    _this7.raw = string;
    return _this7;
  }

  (0, _createClass2.default)(Raw, [{
    key: "toString",
    value: function toString() {
      return this.raw;
    }
  }]);
  return Raw;
}(SQLObject);

var Query =
/*#__PURE__*/
function (_SQLObject7) {
  (0, _inherits2.default)(Query, _SQLObject7);

  function Query() {
    (0, _classCallCheck2.default)(this, Query);
    return (0, _possibleConstructorReturn2.default)(this, (Query.__proto__ || (0, _getPrototypeOf.default)(Query)).apply(this, arguments));
  }

  return Query;
}(SQLObject);

var Select =
/*#__PURE__*/
function (_Query) {
  (0, _inherits2.default)(Select, _Query);

  function Select() {
    var _this8;

    (0, _classCallCheck2.default)(this, Select);
    _this8 = (0, _possibleConstructorReturn2.default)(this, (Select.__proto__ || (0, _getPrototypeOf.default)(Select)).call(this));
    _this8.tables = [];
    _this8.conditions = new Conjunction();
    _this8.having_conditions = new Conjunction();
    _this8.preconditions = new Conjunction();
    _this8.aggregations = [];
    _this8.select_list = [];
    _this8.order_expressions = [];
    _this8.request_totals = [];
    _this8.sampling = undefined;
    _this8.limits = undefined;
    _this8.limitbycolumns = undefined;
    return _this8;
  }

  (0, _createClass2.default)(Select, [{
    key: "select",
    value: function select() {
      var _this9 = this;

      for (var _len11 = arguments.length, columns = new Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
        columns[_key11] = arguments[_key11];
      }

      if (columns.length === 0) {
        return this.select_list;
      }

      columns.forEach(function (col) {
        return _this9.select_list.push(col);
      });
      return this;
    }
    /**
     * @usage
     *  q = selectBuilder->from('table0')->from(['table1', 'alias1'])->from({ 'table2' : 'alias2'})->toString()
     *  assertEquals(q, "select * from table0, table1 as alias1, table2 as alias2");
     *
     * @param tables
     * @return {Select|Array}
     */

  }, {
    key: "from",
    value: function from() {
      for (var _len12 = arguments.length, tables = new Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
        tables[_key12] = arguments[_key12];
      }

      if (!tables.length) {
        return this.tables;
      }

      tables = tables.map(function (table) {
        if (typeof table === "string") return [table, table];
        if (Array.isArray(table)) return table;
        return [(0, _keys.default)(table)[0], (0, _values.default)(table)[1]];
      });
      this.tables = tables;
      return this;
    }
  }, {
    key: "prewhere",
    value: function prewhere() {
      this.preconditions.push(createCondition.apply(void 0, arguments));
      return this;
    }
  }, {
    key: "orPrewhere",
    value: function orPrewhere() {
      var condition = createCondition.apply(void 0, arguments);

      if (this.preconditions.length) {
        this.preconditions = new Disjunction(this.preconditions, condition);
      } else {
        this.preconditions.push(condition);
      }

      return this;
    }
  }, {
    key: "where",
    value: function where() {
      this.conditions.push(createCondition.apply(void 0, arguments));
      return this;
    }
  }, {
    key: "orWhere",
    value: function orWhere() {
      var condition = createCondition(condition, operator, value);

      if (this.conditions.length) {
        this.conditions = new Disjunction(this.conditions, condition);
      } else {
        this.conditions.push(condition);
      }

      return this;
    }
  }, {
    key: "groupBy",
    value: function groupBy() {
      var _this10 = this;

      for (var _len13 = arguments.length, aggregateExpressions = new Array(_len13), _key13 = 0; _key13 < _len13; _key13++) {
        aggregateExpressions[_key13] = arguments[_key13];
      }

      aggregateExpressions.forEach(function (a) {
        return _this10.aggregations.push(a);
      });
      return this;
    }
  }, {
    key: "withTotals",
    value: function withTotals() {
      this.request_totals = true;
      return this;
    }
  }, {
    key: "limit",
    value: function limit(number, offset) {
      this.limits = {
        number: number,
        offset: offset
      };
      return this;
    }
  }, {
    key: "limitBy",
    value: function limitBy(limit) {
      for (var _len14 = arguments.length, columns = new Array(_len14 > 1 ? _len14 - 1 : 0), _key14 = 1; _key14 < _len14; _key14++) {
        columns[_key14 - 1] = arguments[_key14];
      }

      this.limitbycolumns = {
        limit: limit,
        columns: columns
      };
      return this;
    }
  }, {
    key: "orderBy",
    value: function orderBy() {
      var _this11 = this;

      for (var _len15 = arguments.length, expressions = new Array(_len15), _key15 = 0; _key15 < _len15; _key15++) {
        expressions[_key15] = arguments[_key15];
      }

      expressions.forEach(function (e) {
        return _this11.order_expressions.push(e);
      });
      return this;
    }
  }, {
    key: "toString",
    value: function toString() {
      var select_list;

      if (this.select_list.length === 0) {
        select_list = "*";
      } else {
        select_list = this.select_list.map(function (c) {
          return Array.isArray(c) ? quoteTerm(c[0]) + ' as ' + quoteTerm(c[1]) : quoteTerm(c);
        }).join();
      }

      var from = this.from().map(function (table) {
        return table[0] === table[1] ? quoteTerm(table[0]) : quoteTerm(table[0]) + ' as ' + quoteTerm(table[1]);
      });
      from = from.length ? "from " + from.join() : "";
      var prewhere = this.preconditions.length ? " prewhere " + this.preconditions : "";
      var where = this.conditions.length ? " where " + this.conditions : "";
      var groupby = this.aggregations.length ? " group by " + this.aggregations.map(function (c) {
        return quoteTerm(c);
      }).join() : "";
      var having = this.having_conditions.length ? " having " + this.having_conditions : "";
      var order_by = this.order_expressions.length ? "order by " + this.order_expressions.map(function (e) {
        return Array.isArray(e) ? quoteTerm(e[0]) + " " + e[1] : quoteTerm(e);
      }).join() : "";
      var with_totals = this.request_totals ? " with totals " : "";
      var sample = this.sampling ? " sample " + this.sampling : "";
      var limitby = this.limitbycolumns && this.limitbycolumns.columns.length ? " limit " + this.limitbycolumns.limit + " by " + this.limitbycolumns.columns.map(function (c) {
        return quoteTerm(c);
      }).join() : '';
      var limit = this.limits ? " limit " + this.limits.number + (typeof this.limits.offset === "undefined" ? "" : "," + this.limits.offset) : '';
      return ["select ", select_list, from, sample, prewhere, where, groupby, with_totals, having, order_by, limitby, limit].join(' ');
    }
  }]);
  return Select;
}(Query);

var Queries = {
  Select: Select
};
var Utility = {
  quoteVal: quoteVal,
  val: quoteVal,
  quoteTerm: quoteTerm,
  term: quoteTerm,
  raw: function raw(s) {
    return new Raw(s);
  }
};
var Dialect = (0, _extends2.default)({}, Operators, AggregateFunctions, ArithmeticFunctions, TimeFunctions, Consts, Queries, Utility);
var _default = Dialect;
exports.default = _default;
//# sourceMappingURL=index.js.map