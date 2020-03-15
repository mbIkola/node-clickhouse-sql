ClickHouse SQL Dialect implementation for JS
====

[![codecov](https://codecov.io/gh/mbIkola/node-clickhouse-sql/branch/master/graph/badge.svg)](https://codecov.io/gh/mbIkola/node-clickhouse-sql)

## How? 

```js 
import Dialect from "clickhouse-sql";
const s = Dialect;

  let sql = new s.Select();

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
    .limitBy(5, 'presetId');


console.log(sql.toString());

```

