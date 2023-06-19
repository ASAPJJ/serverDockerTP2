const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'mypassword',
  database: 'mydatabase',
  connectionLimit: 20
});

async function getConnection() {
  try {
    const connection = await pool.getConnection();
    return connection;
  } catch (error) {
    console.error(error);
  }
}

async function query(sql, values) {
  let conn;
  try {
    conn = await getConnection();
    const result = await conn.query(sql, values);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    if (conn) conn.end();
  }
}

module.exports = { getConnection, query };
