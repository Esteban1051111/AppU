import postgres from 'postgres';

const sql = postgres({
database: 'AppUcaldas',
user: 'postgres',
password: 'admin'
});// will use psql environment variables

export default sql;
