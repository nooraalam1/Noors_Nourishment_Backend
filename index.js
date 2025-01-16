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

//Add to cart
app.post('/addtocart',(req,res)=>{
  const {_id,email,name,image,description,price} = req.body
  const q = 'INSERT INTO cart(_id,email,name,image,description,price) VALUES (?,?,?,?,?,?)'
  db.query(q, [_id,email,name,image,description,price],(err,data)=>{
  if(err) return res.json(err)
  return res.json(data) 
  })
  })