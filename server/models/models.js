const { Pool } = require('pg');

const PG_URI = 'postgres://ecrfsdnj:kTUtIwfYNLe_ZfiP8BGKms02tDvlQpu1@drona.db.elephantsql.com/ecrfsdnj';

const pool = new Pool({
  connectionString: PG_URI
});

module.exports = {
  query: async(text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};