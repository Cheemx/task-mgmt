import pg from "pg";
const {Pool} = pg

const poolConfig = {
    user: "postgres",
    password: "1234",
    host: "localhost",
    port: 5432,
    database: "taskmgmt"
}
const pool = new Pool(poolConfig);

export default pool