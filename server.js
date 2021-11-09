const express = require('express');

const app = express()

app.get('/', (req, res) => res.send('API Up & Running'))

// if no env var set, will default to PORT 5000
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is up and running on port ${PORT}`));