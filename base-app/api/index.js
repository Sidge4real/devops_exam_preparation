const express = require('express');
const app = express();
const port = 3000;
let datastore = require('./postgres');
let circuitbreaker = false;

app.use(express.json());

app.get('/posts', (req, res) => {
    datastore.getPostOverview()
        .then(data => res.json(data))
        .catch(err => res.status(500).json(err))
});

app.get('/posts/:id', (req, res) => {
    datastore.getPost(parseInt(req.params.id))
        .then(data => res.json(data))
        .catch(err => res.status(500).json(err))
});

app.post('/posts', (req, res) => {
    datastore.createPost(req.body.title, req.body.content, req.body.date)
        .then(data => res.json(data))
        .catch(err => res.status(500).json(err))
});

app.put('/posts/:id', (req, res) => {
    datastore.updatePost(parseInt(req.params.id), req.body.title, req.body.content, req.body.date)
        .then(data => res.json(data))
        .catch(err => res.status(500).json(err))
});

app.get('/verify', async (req, res) => {
    let tables;
    let error;
    if (!circuitbreaker) {
        try {
            const postgres = require('./postgres');
            tables = await postgres.verifyConnection();
        
        } catch (err) {
            error = err;
        } 

        res.json({ circuitbreaker, tables, error });    
    } else {
	res.json({ circuitbreaker });
    }
})

app.listen(port, () => {
    console.log(`API listening at http://localhost:${port}`);
});

setTimeout(() => {
    datastore.verifyConnection().then((result) => {
        console.log('Connection to postgres successful');
        console.log('List of tables:', result);
        if (!result.includes('posts')) {
            console.log('Table posts does not exist, creating it');
            datastore.createTable().then(() => console.log('Table posts created')).catch((err) => console.log('Unable to create table posts', err));
        }
    }).catch((err) => {
        console.log('Connection to postgres failed');
        circuitbreaker = true;
        datastore = require('./inmemory');
        console.log(err);
    })
}, 5000);
