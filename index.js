const express = require('express')
const app = express()
const port = process.env.PORT || 3000
var cors = require('cors')
var mysql = require('mysql2');
var db = mysql.createConnection({
host: "localhost",
user: "root",
password: "",
database: "noor_nourishment"
});
//middleware
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello Noor A Alam')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})