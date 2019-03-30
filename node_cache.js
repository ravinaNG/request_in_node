const NodeCache = require("node-cache");
const myCache = new NodeCache({ stdTTL: 100, checkperiod: 120});
myCache.set(key, val, [ ttl ], [callback] )
0 = unlimited
0 = no_periodic_chack
