const assert = require('assert');
const Dialect = require('../');

const equalsIgnoringWhitespaces = (expected, actual) => {
  expected = (expected || '').replace(/\s+/g, '').trim();
  actual = (actual || '').replace(/\s+/g, '').trim();

  return assert.equal(expected, actual);
}

describe('main', function() {
    it('sanity', () => {
      const s = Dialect;
      let sql = new Dialect.Select();

      sql
        .from('solved_hashes')
        .select(
          'presetId',
          [s.toStartOfMinute('ts'), 't'],
          s.uniq('minerId'),
          s.sum('cpuTime'),
          s.sum('hashes'),
          [s.divide(s.sum('hashes'), 60), 'hashrate'],
          s.avg('blockReward'),
          s.avg('avgReward'),
          s.max('netDiff'),
          s.min('netDiff'),
          [s.sum(s.multiply(s.multiply('hashes', s.divide('blockReward', 'netDiff')), 0.8)), 'approx reward in XMR']
        )
        .prewhere('ts', s.LESS, s.toStartOfMinute(s.now()))
        .prewhere('accountId', s.EQUALS, '5a7484afe90bab6ecc346aa4')
        .groupBy('presetId')
        .groupBy('t')
        .withTotals()
        .orderBy('t')
        .limit(1000)
        .limitBy(5, 'presetId')
        .format('json');

      equalsIgnoringWhitespaces(sql.toString(), "select " +
        "`presetId`,toStartOfMinute(`ts`) as `t`," +
        "uniq(`minerId`),sum(`cpuTime`),sum(`hashes`)," +
        "divide(sum(`hashes`),60) as `hashrate`,avg(`blockReward`)," +
        "avg(`avgReward`),max(`netDiff`),min(`netDiff`)," +
        "sum(multiply(multiply(`hashes`,divide(`blockReward`,`netDiff`)),0.8)) as `approx reward in XMR` " +
        "from `solved_hashes`   " +
        "prewhere (`ts` < toStartOfMinute(now())) and (`accountId` = '5a7484afe90bab6ecc346aa4')   " +
        "group by `presetId`,`t`  with totals   " +
        "order by `t`  limit 5 by `presetId`  limit 1000  format JSON")
    });

    it('from chain', () => {
      const s = Dialect;
      let selectBuilder = new Dialect.Select();

      const q = selectBuilder
        .from('table0', ['table1', 'alias1'], {'alias2': 'table2'})
        .withTotals(false)
        .prewhere('ts', s.LESS, s.toStartOfMinute(s.now()))
        .orPrewhere('ts', s.GREATER, s.toStartOfYear(s.now()))
        .where('my life', s.EQUALS, 'is taken')
        .orWhere('annihilation', s.LESS_OR_EQUALS, s.any('Suffocation', 'disintegration'))
          .toString();

      equalsIgnoringWhitespaces(
        q,
        "select * from `table0`,`table1` as `alias1`,`table2` as `alias2` " +
        "prewhere ((`ts` < toStartOfMinute(now()))) or (`ts` > toStartOfYear(now())) " +
        "where ((`my life` = 'is taken')) or (`annihilation` <= any(`Suffocation`,`disintegration`))"
      );
    });

    it('in operator', () => {
      const s = Dialect;
      let selectBuilder = new Dialect.Select();

      const q = selectBuilder
        .from('table0')
        .select('a', 'b')
        .where(s.in('a', [1, 2, 3]))
        .toString();

      equalsIgnoringWhitespaces(
        q,
        "select  `a`,`b` from `table0`    where (`a` in (1,2,3))"
      );
    });


    it('derived table', () => {
      const s = Dialect;
      let tableBuilder = new s.Select();
      let selectBuilder = new s.Select();

      const q0 = tableBuilder
        .select('a', 'b', 'c')
        .from('table1')
        .where('a', s.EQ, 1);

      const q = selectBuilder
        .select('a.a', 'a.b', 'b.c', 'b.d')
        .from(['table0', 'a'], [q0, 'b'])
        .where('a.c', s.EQ, s.term('b.c'))
        .toString();

      equalsIgnoringWhitespaces(
        q,
        "select  `a`.`a`,`a`.`b`,`b`.`c`,`b`.`d` from `table0` as `a`," +
        "(select  `a`,`b`,`c` from `table1`    where (`a` = 1) ) as `b` " +
        "where (`a`.`c` = `b`.`c`)"
      );
    });

    it('mixed boolean operators', () => {
      const s = Dialect;
      let selectBuilder = new Dialect.Select();

      const q = selectBuilder
        .from('table0')
        .where(s.Or(s.Eq('a', 1), s.Eq('a', 2)))
        .where(s.And(s.Eq('b', 1), s.Eq('c', 1)))
        .toString();

      equalsIgnoringWhitespaces(
        q,
        "select * from `table0` where ((`a` = 1) or (`a` = 2)) and ((`b` = 1) and (`c` = 1))"
      )
    });

});
