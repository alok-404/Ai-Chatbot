const expresss = require('express');

const app = expresss()

app.get('/' , (req, res) => {
    res.send('Hello World!')
})

module.exports = app