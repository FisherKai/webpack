let express = require('express');

let app = express();

app.get('/user', (req, res) => {
    res.json({ name: 'yukai' })
})

app.listen(3000);