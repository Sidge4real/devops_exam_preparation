const postgres = require('pg');


const pool = new postgres.Pool({
    user: process.env.POSTGRES_USER || 'user',
    host: process.env.POSTGRES_HOST || 'localhost',
    database: process.env.POSTGRES_DB || 'postgres',
    password: process.env.POSTGRES_PASSWORD || 'password',
});

async function getPostOverview() {
    const result = await pool.query('SELECT id, title, date from posts');
    return result.rows;
}

async function getPost(id) {
    const result = await pool.query('SELECT * from posts where id = $1', [id]);
    return result.rows[0];
}

async function createPost(title, content, date) {
    const result = await pool.query('INSERT INTO posts (title, content, date) VALUES ($1, $2, $3) RETURNING *', [title, content, date]);
    return result.rows[0];
}

async function updatePost(id, title, content, date) {
    const result = await pool.query('UPDATE posts SET title = $1, content = $2, date = $3 WHERE id = $4 RETURNING *', [title, content, date, id]);
    return result.rows[0];
}

async function deletePost(id) {
    const result = await pool.query('DELETE FROM posts WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
}

async function verifyConnection() {
    const result = await pool.query(`SELECT table_name
        FROM information_schema.tables
       WHERE table_schema='public'
         AND table_type='BASE TABLE';`);
    return result.rows;
}

async function createTable() {
    await pool.query(`CREATE table posts (
        id serial primary key,
        title varchar(255) not null,
        content text not null,
        date varchar(255) not null
    );`);
}

module.exports = {
    getPostOverview,
    getPost,
    createPost,
    updatePost,
    deletePost,
    verifyConnection,
    createTable,
};
