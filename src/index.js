const EQUALS = "=";
const GREATER = ">";
const GREATER_OR_EQUALS = ">=";
const LESS = "<";
const LESS_OR_EQUALS = "<=";
const NOT_EQUALS = "!=";

const Consts = {
  EQUALS,
  GREATER,
  GREATER_OR_EQUALS,
  LESS,
  LESS_OR_EQUALS,
  NOT_EQUALS
};

class SQLObject {
}

class Conditions extends SQLObject {
  constructor(...args) {
    super();
    this.args = args;
  }

  push(arg) {
    this.args.push(arg);
  }

  get length() {
    return this.args.length;
  }
}

class Disjunction extends Conditions {
  constructor(...args) {
    super(...args);
  }

  toString() {
    return this.args.length ? this.args.map(arg => "(" + arg + ")").join(" or ") : "";
  }
}

class Conjunction extends Conditions {
  constructor(...args) {
    super(...args);
  }

  toString() {
    return this.args.length
      ? this.args.map(arg => "(" + arg + ")").join(" and ")
      : "";
  }

}

class Condition extends SQLObject {
  constructor(column, operator, value) {
    super();
    this.column = column;
    this.operator = operator;
    this.value = value;
  }

  toString() {
    if (this.operator) {
      return [quoteTerm(this.column), this.operator, quoteVal(this.value)].join(' ');
    } else {
      return this.column;
    }
  }
}

class Negation extends Condition {
  constructor(column, operator, value) {
    super(column, operator, value);
  }

  toString() {
    return "not(" + super.toString() + ")";
  }
}

class InclusionOperator extends Condition {
  constructor(inclusionType, column, operator, value) {
    super(column, operator, value);
    this.operator = inclusionType;
  }

  toString() {
    return [
      this.column,
      this.operator,
      "(",
      Array.isArray(this.value)
        ? this.value.map(val => quoteVal(val)).join(',')
        : this.value,
      ")"
    ].join('');
  }
}

class In extends InclusionOperator {
  constructor(...args) {
    super("in", ...args);
  }
}

class NotIn extends InclusionOperator {
  constructor(...args) {
    super("not in", ...args);
  }
}

class GlobalNotIn extends InclusionOperator {
  constructor(...args) {
    super("global not in", ...args);
  }
}

class GlobalIn extends InclusionOperator {
  constructor(...args) {
    super("global in", ...args);
  }
}

const Operators = {
  Conjunction, Disjunction, Negation,
  In, NotIn, GlobalIn, GlobalNotIn
};

function createCondition(...args) {
  switch (args.length) {
    case 1:
      return args[0] instanceof Condition ? args[0] : new Condition(args[0]);
    case 2:
      return new Condition(args[0], EQUALS, args[1]);
    case 3:
      return new Condition(...args);
    default:
      throw new Error("Invalid condition args: ", args);
  }
}

let commonReplacer = [
  /[\0\n\r\b\t\\'"\x1a]/g, (s) => {
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
      case "\x1a" :
        return "\\Z";
    }
  }
];

class Value extends SQLObject {
  constructor(value) {
    super();
    this.value = value;
  }

  toString() {
    if (typeof this.value === "string") {
      return "'" + this.value.replace(...commonReplacer).replace(/'/g, "''") + "'";
    }
    if (typeof this.value === 'undefined') {
      return "''";
    }

    if (Array.isArray(this.value)) {
      return this.value.map(val => new Value(val)).join();
    }

    return this.value + '';
  }
}

class Term extends SQLObject {
  constructor(term) {
    super();
    this.term = term;
  }

  toString() {
    return '`' + this.term.replace(...commonReplacer).replace(/`/g, '\\`') + '`';
  }
}

function quoteVal(value) {
  return value instanceof SQLObject ? value : new Value(value);
}

function quoteTerm(term) {
  return term instanceof SQLObject || Number.isFinite(term) ? term : new Term(term);
}


class SQLFunction extends SQLObject {
  constructor(name, ...args) {
    super();
    this.name = name;
    this.args = args;
  }

  toString() {
    return this.name +
      "(" +
      this.args.map((arg) => arg instanceof SQLObject || Number.isFinite(arg) ? arg : quoteTerm(arg)).join() +
      ")";
  }
}

const _curry_f = (name) => {
  return (...args) => new SQLFunction(name, ...args)
};

const AggregateFunctions = {
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

const ArithmeticFunctions = {
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

const TimeFunctions = {
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

class Raw extends SQLObject {
  constructor(string) {
    super();
    this.raw = string;
  }

  toString() {
    return this.raw;
  }
}

class Query extends SQLObject {
}

class Select extends Query {
  constructor() {
    super();

    this.tables = [];
    this.conditions = new Conjunction();
    this.having_conditions = new Conjunction();
    this.preconditions = new Conjunction();
    this.aggregations = [];
    this.select_list = [];
    this.order_expressions = [];
    this.request_totals = [];
    this.sampling = undefined;
    this.limits = undefined;
    this.limitbycolumns = undefined;

  }

  select(...columns) {
    if (columns.length === 0) {
      return this.select_list;
    }

    columns.forEach((col) => this.select_list.push(col));
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
  from(...tables) {
    if (!tables.length) {
      return this.tables;
    }

    tables = tables.map(table => {
      if (typeof table === "string") return [table, table];
      if (Array.isArray(table)) return table;

      return [Object.keys(table)[0], Object.values(table)[0]]
    });

    this.tables = tables;
    return this;
  }

  prewhere(...args) {
    this.preconditions.push(createCondition(...args));
    return this;
  }

  orPrewhere(...args) {
    let condition = createCondition(...args);
    if (this.preconditions.length) {
      this.preconditions = new Disjunction(this.preconditions, condition)
    } else {
      this.preconditions.push(condition)
    }

    return this;
  }

  where(...args) {
    this.conditions.push(createCondition(...args));
    return this;
  }

  orWhere(...args) {
    let condition = createCondition(...args);
    if (this.conditions.length) {
      this.conditions = new Disjunction(this.conditions, condition)
    } else {
      this.conditions.push(condition);
    }

    return this;
  }

  groupBy(...aggregateExpressions) {
    aggregateExpressions.forEach(a => this.aggregations.push(a));
    return this;
  }

  withTotals(request_totals = true) {
    this.request_totals = request_totals;
    return this;
  }

  limit(number, offset) {
    this.limits = {
      number, offset
    };
    return this;
  }

  limitBy(limit, ...columns) {
    this.limitbycolumns = {
      limit, columns
    };
    return this;
  }

  orderBy(...expressions) {
    expressions.forEach(e => this.order_expressions.push(e));
    return this;
  }

  toString() {
    let select_list;
    if (this.select_list.length === 0) {
      select_list = "*";
    } else {
      select_list = this.select_list.map(
        c => Array.isArray(c)
          ? quoteTerm(c[0]) + ' as ' + quoteTerm(c[1])
          : quoteTerm(c)
      ).join();
    }


    let from = this.from().map(
      (table) =>
        table[0] === table[1]
          ? quoteTerm(table[0])
          : quoteTerm(table[0]) + ' as ' + quoteTerm(table[1])
    );
    from = from.length ? "from " + from.join() : "";


    let prewhere = this.preconditions.length ? " prewhere " + this.preconditions : "";
    let where = this.conditions.length ? " where " + this.conditions : "";

    let groupby = this.aggregations.length
      ? " group by " + this.aggregations.map(c => quoteTerm(c)).join()
      : "";

    let having = this.having_conditions.length ? " having " + this.having_conditions : "";

    let order_by = this.order_expressions.length
      ? "order by " + this.order_expressions.map(e => Array.isArray(e) ? quoteTerm(e[0]) + " " + e[1] : quoteTerm(e)).join()
      : "";


    let with_totals = this.request_totals ? " with totals " : "";
    let sample = this.sampling ? " sample " + this.sampling : "";

    let limitby = this.limitbycolumns && this.limitbycolumns.columns.length
      ? " limit " + this.limitbycolumns.limit + " by " + this.limitbycolumns.columns.map(c => quoteTerm(c)).join()
      : '';

    let limit = this.limits
      ? " limit " + this.limits.number + (typeof this.limits.offset === "undefined" ? "" : "," + this.limits.offset)
      : '';

    return [
      "select ",
      select_list,
      from,
      sample,
      prewhere,
      where,
      groupby,
      with_totals,
      having,
      order_by,
      limitby,
      limit
    ].join(' ');

  }
}


const Queries = {
  Select
};

const Utility = {
  quoteVal, val: quoteVal,
  quoteTerm, term: quoteTerm,
  raw: (s) => new Raw(s),

};


const Dialect = {
  ...Operators,
  ...AggregateFunctions,
  ...ArithmeticFunctions,
  ...TimeFunctions,
  ...Consts,
  ...Queries,
  ...Utility
};
export default Dialect;
