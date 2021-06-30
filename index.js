var PORT = process.env.PORT || 5000
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

app.use('/', require('./routes/nobi'))

app.listen(PORT, () => console.log(`Example app listening at http://localhost:${PORT}`))