"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EQUALS = "=";
var EQ = EQUALS;
var GREATER = ">";
var GT = GREATER;
var GREATER_OR_EQUALS = ">=";
var GTE = GREATER_OR_EQUALS;
var LESS = "<";
var LT = LESS;
var LESS_OR_EQUALS = "<=";
var LTE = LESS_OR_EQUALS;
var NOT_EQUALS = "!=";
var NE = NOT_EQUALS;
var BETWEEN = "between";
var AND = 'and';
var Consts = {
  EQUALS: EQUALS,
  GREATER: GREATER,
  GREATER_OR_EQUALS: GREATER_OR_EQUALS,
  LESS: LESS,
  LESS_OR_EQUALS: LESS_OR_EQUALS,
  NOT_EQUALS: NOT_EQUALS,
  EQ: EQ,
  GT: GT,
  GTE: GTE,
  LT: LT,
  LTE: LTE,
  NE: NE
};

var SQLObject = function SQLObject() {
  _classCallCheck(this, SQLObject);
};

var Conditions = /*#__PURE__*/function (_SQLObject) {
  _inherits(Conditions, _SQLObject);

  var _super = _createSuper(Conditions);

  function Conditions() {
    var _this;

    _classCallCheck(this, Conditions);

    _this = _super.call(this);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this.args = args;
    return _this;
  }

  _createClass(Conditions, [{
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

var Disjunction = /*#__PURE__*/function (_Conditions) {
  _inherits(Disjunction, _Conditions);

  var _super2 = _createSuper(Disjunction);

  function Disjunction() {
    _classCallCheck(this, Disjunction);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _super2.call.apply(_super2, [this].concat(args));
  }

  _createClass(Disjunction, [{
    key: "toString",
    value: function toString() {
      return this.args.length ? this.args.map(function (arg) {
        return "(" + arg + ")";
      }).join(" or ") : "";
    }
  }]);

  return Disjunction;
}(Conditions);

var Conjunction = /*#__PURE__*/function (_Conditions2) {
  _inherits(Conjunction, _Conditions2);

  var _super3 = _createSuper(Conjunction);

  function Conjunction() {
    _classCallCheck(this, Conjunction);

    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return _super3.call.apply(_super3, [this].concat(args));
  }

  _createClass(Conjunction, [{
    key: "toString",
    value: function toString() {
      if (!this.args.length) return "";
      return this.args.map(function (arg) {
        var s = arg.toString ? arg.toString() : arg;
        return "(" + s + ")";
      }).join(" and ");
    }
  }]);

  return Conjunction;
}(Conditions);

var _Condition3 = /*#__PURE__*/function (_SQLObject2) {
  _inherits(Condition, _SQLObject2);

  var _super4 = _createSuper(Condition);

  function Condition(column, operator, value) {
    var _this2;

    _classCallCheck(this, Condition);

    _this2 = _super4.call(this);
    _this2.column = quoteTerm(column);
    _this2.operator = operator;
    _this2.value = value instanceof SQLObject ? value : quoteVal(value);
    return _this2;
  }

  _createClass(Condition, [{
    key: "toString",
    value: function toString() {
      if (this.operator) {
        return [this.column, this.operator, this.value].join(' ');
      } else {
        return this.column;
      }
    }
  }]);

  return Condition;
}(SQLObject);

var Negation = /*#__PURE__*/function (_Condition) {
  _inherits(Negation, _Condition);

  var _super5 = _createSuper(Negation);

  function Negation(column, operator, value) {
    _classCallCheck(this, Negation);

    return _super5.call(this, column, operator, value);
  }

  _createClass(Negation, [{
    key: "toString",
    value: function toString() {
      return "not(" + _get(_getPrototypeOf(Negation.prototype), "toString", this).call(this) + ")";
    }
  }]);

  return Negation;
}(_Condition3);

var InclusionOperator = /*#__PURE__*/function (_Condition2) {
  _inherits(InclusionOperator, _Condition2);

  var _super6 = _createSuper(InclusionOperator);

  function InclusionOperator(inclusionType, column, operator, value) {
    var _this3;

    _classCallCheck(this, InclusionOperator);

    _this3 = _super6.call(this, column, operator, value);
    _this3.operator = inclusionType;
    return _this3;
  }

  _createClass(InclusionOperator, [{
    key: "toString",
    value: function toString() {
      return [quoteTerm(this.column), " ", this.operator, " (", Array.isArray(this.value) ? this.value.map(function (val) {
        return quoteVal(val);
      }).join(',') : this.value, ")"].join('');
    }
  }]);

  return InclusionOperator;
}(_Condition3);

var In = /*#__PURE__*/function (_InclusionOperator) {
  _inherits(In, _InclusionOperator);

  var _super7 = _createSuper(In);

  function In() {
    _classCallCheck(this, In);

    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    return _super7.call.apply(_super7, [this, "in"].concat(args));
  }

  return In;
}(InclusionOperator);

var NotIn = /*#__PURE__*/function (_InclusionOperator2) {
  _inherits(NotIn, _InclusionOperator2);

  var _super8 = _createSuper(NotIn);

  function NotIn() {
    _classCallCheck(this, NotIn);

    for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      args[_key5] = arguments[_key5];
    }

    return _super8.call.apply(_super8, [this, "not in"].concat(args));
  }

  return NotIn;
}(InclusionOperator);

var GlobalNotIn = /*#__PURE__*/function (_InclusionOperator3) {
  _inherits(GlobalNotIn, _InclusionOperator3);

  var _super9 = _createSuper(GlobalNotIn);

  function GlobalNotIn() {
    _classCallCheck(this, GlobalNotIn);

    for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
      args[_key6] = arguments[_key6];
    }

    return _super9.call.apply(_super9, [this, "global not in"].concat(args));
  }

  return GlobalNotIn;
}(InclusionOperator);

var GlobalIn = /*#__PURE__*/function (_InclusionOperator4) {
  _inherits(GlobalIn, _InclusionOperator4);

  var _super10 = _createSuper(GlobalIn);

  function GlobalIn() {
    _classCallCheck(this, GlobalIn);

    for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
      args[_key7] = arguments[_key7];
    }

    return _super10.call.apply(_super10, [this, "global in"].concat(args));
  }

  return GlobalIn;
}(InclusionOperator);

var Between = /*#__PURE__*/function (_SQLObject3) {
  _inherits(Between, _SQLObject3);

  var _super11 = _createSuper(Between);

  function Between(column, leftBoundary, rightBoundary) {
    var _this4;

    _classCallCheck(this, Between);

    _this4 = _super11.call(this);
    _this4.column = column;
    _this4.leftBoundary = leftBoundary;
    _this4.rightBoundary = rightBoundary;
    return _this4;
  }

  _createClass(Between, [{
    key: "quoteBoundary",
    value: function quoteBoundary(b) {
      return b instanceof SQLObject ? b.toString() : quoteVal(b);
    }
  }, {
    key: "toString",
    value: function toString() {
      return [quoteTerm(this.column), " ", BETWEEN, // because super class adding parents around value and I didn't find an elegant
      // way how to avoid this. So I'm overloading toString() and copy-pasting implementation
      this.quoteBoundary(this.leftBoundary), AND, this.quoteBoundary(this.rightBoundary)].join(' ');
    }
  }]);

  return Between;
}(SQLObject);

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
      return args[0] instanceof _Condition3 ? args[0] : new _Condition3(args[0]);

    case 2:
      return new _Condition3(args[0], EQUALS, args[1]);

    case 3:
      return _construct(_Condition3, args);

    default:
      throw new Error("Invalid condition args: ", args);
  }
}

var commonReplacer = [/[\0\n\r\b\t\\\x1a]/g, function (s) {
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

    default:
      console.error("uncovered case in replacer:", s);
      return '';
    //logic error
  }
}];

var Value = /*#__PURE__*/function (_SQLObject4) {
  _inherits(Value, _SQLObject4);

  var _super12 = _createSuper(Value);

  function Value(value) {
    var _this5;

    _classCallCheck(this, Value);

    _this5 = _super12.call(this);
    _this5.value = value;
    return _this5;
  }

  _createClass(Value, [{
    key: "toString",
    value: function toString() {
      if (typeof this.value === "string") {
        var _this$value;

        return "'" + (_this$value = this.value).replace.apply(_this$value, commonReplacer).replace(/'/g, "''") + "'";
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

var Term = /*#__PURE__*/function (_SQLObject5) {
  _inherits(Term, _SQLObject5);

  var _super13 = _createSuper(Term);

  function Term(term) {
    var _this6;

    _classCallCheck(this, Term);

    _this6 = _super13.call(this);
    _this6.term = term;
    return _this6;
  }

  _createClass(Term, [{
    key: "toString",
    value: function toString() {
      var _this$term;

      var parts = this.term.split('.');

      if (parts.length > 1) {
        return [new Term(parts[0]).toString(), new Term(parts[1]).toString()].join('.');
      }

      return '`' + (_this$term = this.term).replace.apply(_this$term, commonReplacer).replace(/`/g, '\\`') + '`';
    }
  }]);

  return Term;
}(SQLObject);

function quoteVal(value) {
  return value instanceof SQLObject ? value : new Value(value);
}

function quoteTerm(term) {
  return term instanceof SQLObject || Number.isFinite(term) ? term : new Term(term);
}

var SQLFunction = /*#__PURE__*/function (_SQLObject6) {
  _inherits(SQLFunction, _SQLObject6);

  var _super14 = _createSuper(SQLFunction);

  function SQLFunction(name) {
    var _this7;

    _classCallCheck(this, SQLFunction);

    _this7 = _super14.call(this);
    _this7.name = name;

    for (var _len9 = arguments.length, args = new Array(_len9 > 1 ? _len9 - 1 : 0), _key9 = 1; _key9 < _len9; _key9++) {
      args[_key9 - 1] = arguments[_key9];
    }

    _this7.args = args;
    return _this7;
  }

  _createClass(SQLFunction, [{
    key: "toString",
    value: function toString() {
      return this.name + "(" + this.args.map(function (arg) {
        return arg instanceof SQLObject || Number.isFinite(arg) ? arg : quoteTerm(arg);
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

    return _construct(SQLFunction, [name].concat(args));
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
  uniqExact: _curry_f('uniqExact'),
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
  toDate: _curry_f('toDate'),
  toDateTime: _curry_f('toDateTime'),
  toDateTime64: _curry_f('toDateTime64'),
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
var IPAddrFunctions = {
  toIPv4: _curry_f('toIPv4'),
  toIPv6: _curry_f('toIPv6'),
  IPv4NumToString: _curry_f('IPv4NumToString'),
  IPv4StringToNum: _curry_f('IPv4StringToNum'),
  IPv4NumToStringClassC: _curry_f('IPv4NumToStringClassC'),
  IPv6NumToString: _curry_f('IPv6NumToString'),
  IPv6StringToNum: _curry_f('IPv6StringToNum')
};

var Raw = /*#__PURE__*/function (_SQLObject7) {
  _inherits(Raw, _SQLObject7);

  var _super15 = _createSuper(Raw);

  function Raw(string) {
    var _this8;

    _classCallCheck(this, Raw);

    _this8 = _super15.call(this);
    _this8.raw = string;
    return _this8;
  }

  _createClass(Raw, [{
    key: "toString",
    value: function toString() {
      return this.raw;
    }
  }]);

  return Raw;
}(SQLObject);

var Query = /*#__PURE__*/function (_SQLObject8) {
  _inherits(Query, _SQLObject8);

  var _super16 = _createSuper(Query);

  function Query() {
    _classCallCheck(this, Query);

    return _super16.apply(this, arguments);
  }

  return Query;
}(SQLObject);

var Select = /*#__PURE__*/function (_Query) {
  _inherits(Select, _Query);

  var _super17 = _createSuper(Select);

  function Select() {
    var _this9;

    _classCallCheck(this, Select);

    _this9 = _super17.call(this);
    _this9.tables = [];
    _this9.joins = [];
    _this9.conditions = new Conjunction();
    _this9.having_conditions = new Conjunction();
    _this9.preconditions = new Conjunction();
    _this9.aggregations = [];
    _this9.select_list = [];
    _this9.order_expressions = [];
    _this9.request_totals = undefined;
    _this9.sampling = undefined;
    _this9.limits = undefined;
    _this9.limitbycolumns = undefined;
    _this9.fmt = undefined;
    return _this9;
  }

  _createClass(Select, [{
    key: "select",
    value: function select() {
      var _this10 = this;

      for (var _len11 = arguments.length, columns = new Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
        columns[_key11] = arguments[_key11];
      }

      if (columns.length === 0) {
        return this.select_list;
      }

      columns.forEach(function (col) {
        return _this10.select_list.push(col);
      });
      return this;
    }
    /**
     * @usage
     *  q = selectBuilder->from('table0', ['table1', 'alias1'], { 'table2' : 'alias2'})->toString()
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
        if (typeof table === "string") return [quoteTerm(table)];

        if (Array.isArray(table)) {
          if (table[0] instanceof Select) table[0] = '(' + table[0].toString() + ')';else table[0] = quoteTerm(table[0]);
          table[1] = quoteTerm(table[1]);
          return table;
        }

        if (table instanceof Select) return ['(' + table.toString() + ')'];
        var alias = Object.values(table)[0];
        if (alias instanceof Select) alias = '(' + alias.toString() + ')';else alias = quoteTerm(alias);
        return [alias, quoteTerm(Object.keys(table)[0])];
      });
      this.tables = tables;
      return this;
    }
  }, {
    key: "join",
    value: function join(table, type) {
      for (var _len13 = arguments.length, conditions = new Array(_len13 > 2 ? _len13 - 2 : 0), _key13 = 2; _key13 < _len13; _key13++) {
        conditions[_key13 - 2] = arguments[_key13];
      }

      if (typeof table === "string") table = quoteTerm(table);

      if (!Array.isArray(conditions)) {
        conditions = [conditions];
      }

      if (conditions.length > 1) {
        conditions = Conjunction(conditions);
      }

      this.joins.push({
        table: table,
        type: type,
        conditions: conditions
      });
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
      if (arguments.length === 1 && (arguments.length <= 0 ? undefined : arguments[0]) instanceof _Condition3) {
        this.conditions.push(arguments.length <= 0 ? undefined : arguments[0]);
      } else {
        this.conditions.push(createCondition.apply(void 0, arguments));
      }

      return this;
    }
  }, {
    key: "orWhere",
    value: function orWhere() {
      var condition = createCondition.apply(void 0, arguments);

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
      var _this11 = this;

      for (var _len14 = arguments.length, aggregateExpressions = new Array(_len14), _key14 = 0; _key14 < _len14; _key14++) {
        aggregateExpressions[_key14] = arguments[_key14];
      }

      aggregateExpressions.forEach(function (a) {
        return _this11.aggregations.push(a);
      });
      return this;
    }
  }, {
    key: "withTotals",
    value: function withTotals() {
      var request_totals = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      this.request_totals = request_totals;
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
      for (var _len15 = arguments.length, columns = new Array(_len15 > 1 ? _len15 - 1 : 0), _key15 = 1; _key15 < _len15; _key15++) {
        columns[_key15 - 1] = arguments[_key15];
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
      var _this12 = this;

      for (var _len16 = arguments.length, expressions = new Array(_len16), _key16 = 0; _key16 < _len16; _key16++) {
        expressions[_key16] = arguments[_key16];
      }

      expressions.forEach(function (e) {
        return _this12.order_expressions.push(e);
      });
      return this;
    }
  }, {
    key: "format",
    value: function format(fmt) {
      this.fmt = fmt;
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
        return table.length === 1 ? table[0] : table[0] + ' as ' + table[1];
      });
      from = from.length ? "from " + from.join() : "";
      var join = this.joins.map(function (join) {
        return (join.type ? join.type + ' ' : '') + 'join ' + join.table + ' on ' + join.conditions;
      }).join(' ');
      var prewhere = this.preconditions.length ? "prewhere " + this.preconditions : "";
      var where = this.conditions.length ? "where " + this.conditions : "";
      var groupby = this.aggregations.length ? "group by " + this.aggregations.map(function (c) {
        return quoteTerm(c);
      }).join() : "";
      var having = this.having_conditions.length ? "having " + this.having_conditions : "";
      var order_by = this.order_expressions.length ? "order by " + this.order_expressions.map(function (e) {
        return Array.isArray(e) ? quoteTerm(e[0]) + " " + e[1] : quoteTerm(e);
      }).join() : "";
      var with_totals = this.request_totals ? "with totals" : "";
      var sample = this.sampling ? "sample " + this.sampling : "";
      var limitby = this.limitbycolumns && this.limitbycolumns.columns.length ? "limit " + this.limitbycolumns.limit + " by " + this.limitbycolumns.columns.map(function (c) {
        return quoteTerm(c);
      }).join() : '';
      var limit = this.limits ? "limit " + (typeof this.limits.offset === "undefined" ? this.limits.number : this.limits.offset + ", " + this.limits.number) : '';
      var format = this.fmt ? " format " + this.fmt.toUpperCase() : "";
      var parts = ["select", select_list, from, join, sample, prewhere, where, groupby, with_totals, having, order_by, limitby, limit, format].filter(function (v) {
        return v != '';
      });
      return parts.join(' ');
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
  },
  Condition: function Condition() {
    for (var _len17 = arguments.length, args = new Array(_len17), _key17 = 0; _key17 < _len17; _key17++) {
      args[_key17] = arguments[_key17];
    }

    return _construct(_Condition3, args);
  }
};
var Shortcuts = {
  And: function And() {
    for (var _len18 = arguments.length, args = new Array(_len18), _key18 = 0; _key18 < _len18; _key18++) {
      args[_key18] = arguments[_key18];
    }

    return _construct(Conjunction, args);
  },
  Or: function Or() {
    for (var _len19 = arguments.length, args = new Array(_len19), _key19 = 0; _key19 < _len19; _key19++) {
      args[_key19] = arguments[_key19];
    }

    return _construct(Disjunction, args);
  },
  Eq: function Eq(col, val) {
    return new _Condition3(col, Consts.EQ, val);
  },
  Ne: function Ne(col, val) {
    return new _Condition3(col, Consts.NE, val);
  },
  Gte: function Gte(col, val) {
    return new _Condition3(col, Consts.GTE, val);
  },
  Lte: function Lte(col, val) {
    return new _Condition3(col, Consts.LTE, val);
  },
  Lt: function Lt(col, val) {
    return new _Condition3(col, Consts.LT, val);
  },
  Gt: function Gt(col, val) {
    return new _Condition3(col, Consts.GT, val);
  },
  "in": function _in(col, values) {
    return new In(col, null, values);
  },
  notIn: function notIn(col, values) {
    return new NotIn(col, null, values);
  },
  cast: function cast(thing, t) {
    return new SQLFunction('cast', thing, quoteVal(t));
  },
  between: function between(col, left, right) {
    return new Between(col, left, right);
  }
};

var Dialect = _objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({}, Operators), AggregateFunctions), ArithmeticFunctions), TimeFunctions), IPAddrFunctions), Consts), Queries), Utility), Shortcuts);

var _default = Dialect;
exports["default"] = _default;
//# sourceMappingURL=index.js.map