import express from "express";
const app = express();

app.get('/', (req,res) => {
    res.send("Server is ready")
})

// get list of 5 jokes
app.get('/api/jokes', (req, res) => {
    const jokes = [
        {
            id: 1,
            tittle: 'A jokes',
            content: 'This is a joke'
        },
        {
            id: 2,
            tittle: 'A second jokes',
            content: 'This is second joke'
        },
        {
            id: 3,
            tittle: 'A third jokes',
            content: 'This is third joke'
        },
        {
            id: 4,
            tittle: 'A fourth jokes',
            content: 'This is fourth joke'
        },
        {
            id: 5,
            tittle: 'A five jokes',
            content: 'This is five joke'
        },
    ]
    res.send(jokes);
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`server at http://localhost:${port}`);
})



