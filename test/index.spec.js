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
          s.cast('total', 'Int32'),
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
        .join('foo', 'left', s.Condition('col1', s.EQ, s.quoteTerm('col2')))
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
        "`presetId`," +
        "cast(`total`,'Int32')," +
        "toStartOfMinute(`ts`) as `t`," +
        "uniq(`minerId`),sum(`cpuTime`),sum(`hashes`)," +
        "divide(sum(`hashes`),60) as `hashrate`,avg(`blockReward`)," +
        "avg(`avgReward`),max(`netDiff`),min(`netDiff`)," +
        "sum(multiply(multiply(`hashes`,divide(`blockReward`,`netDiff`)),0.8)) as `approx reward in XMR` " +
        "from `solved_hashes`   " +
        "leftjoin`foo`on`col1`=`col2`" +
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

    // This is just for code coverage
    it('ne/gte/lte/gt/gt bug', () => {
      const s = Dialect;
      let selectBuilder = new Dialect.Select();

      const q = selectBuilder
        .from('table0')
        .where(s.Or(s.Lt('a', 1), s.Gt('a', 2)))
        .where(s.And(s.notIn('b', [1,2,3]), s.Lte('c', 1)))
        .where(s.Ne('a', s.term('c')))
        .where(s.Gte('c', 1.004))
        .toString();

      equalsIgnoringWhitespaces(
        q,
        "select * from `table0` where " +
        "( (`a`<1) or (`a` > 2) ) and " +
        "( (`b` notin (1,2,3) ) and (`c`<=1) ) and " +
        "( `a` != `c` ) and " +
        "( `c` >= 1.004 ) "
      );
    });

    it('gt bug', () => {
        const s = Dialect;
        const q =  s.Gt('a', 2).toString();

        equalsIgnoringWhitespaces(
          q,
          "`a` > 2"
        );

    });

    it('quoteVal', () => {
      assert.equal(
        Dialect.quoteVal("indi\n\tfference").toString(),
        "'indi\\n\\tfference'"
      );
      assert.equal(
        Dialect.quoteVal("despai'r").toString(),
        "'despai''r'"
      );

    });

    it('between values', () => {

      // https://github.com/mbIkola/node-clickhouse-sql/issues/24
      //SELECT count() AS count
      //FROM tracking_events
      //WHERE date BETWEEN '12-01-2017' AND '12-01-2018'
      const query =  new Dialect.Select();
      const between = Dialect.between;
      equalsIgnoringWhitespaces(
          query
            .from('tracking_events')
            .select([Dialect.count(), 'count'])
            .where(between('date', '12-01-2017', '12-01-2018'))
            .toString(),
        "select count() as `count` from `tracking_events` where (`date` between '12-01-2017' and '12-01-2018')"
      );

    });

  it('between terms', () => {
    const query =  new Dialect.Select();
    const col = Dialect.quoteTerm;
    const between = Dialect.between;
    equalsIgnoringWhitespaces(
      query
        .from('tracking_events')
        .select([Dialect.count(), 'hope'], 'despair', 'indifference')
        .where(between('hope', col('despair'), col('indifference')))
        .toString(),
      "select count() as `hope`, `despair`, `indifference` from `tracking_events`" +
      " where (`hope` between `despair` and `indifference`)"
    );
  });

    it('conjunction', () => {
      const quote = Dialect.quoteVal;
      const s = new Dialect.Conjunction(quote('12-01-2017'), quote('12-01-2018'));

      assert.equal(Dialect.quoteVal('12-01-2017'), "'12-01-2017'");
      assert.equal(s.toString(), "('12-01-2017') and ('12-01-2018')");
    })
});
