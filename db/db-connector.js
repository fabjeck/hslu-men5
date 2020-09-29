import mysql from 'promise-mysql';

const config = {
  host: process.env.RDS_HOST,
  user: process.env.RDS_USER,
  password: process.env.RDS_PASSWORD,
  port: process.env.RDS_PORT,
  database: process.env.RDS_DB,
};

const pool = mysql.createPool(config);

export default pool;
