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

//Cart Items Fetch

app.get('/cartItems', (req, res) => {
  const { email } = req.query;

  const q = "SELECT * FROM cart WHERE email = ?";
  db.query(q, [email], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Database query failed" });
    }
    return res.status(200).json(data);
  });
});



app.delete('/cartItems', (req, res) => {
  const { email, id } = req.query; 

  const sqlQuery = "DELETE FROM cart WHERE email = ? AND _id = ?";

  db.query(sqlQuery, [email, id], (err, result) => {
      if (err) {
        console.log(err)
          return res.status(500).send('Error deleting cart item');
      }
      res.status(200).send('Cart item deleted successfully');
  });
});

