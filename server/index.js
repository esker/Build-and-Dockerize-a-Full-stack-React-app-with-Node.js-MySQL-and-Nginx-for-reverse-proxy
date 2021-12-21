const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

// Add mysql database connection
const db = mysql.createPool({
  host: 'localhost:3306', // the host name MYSQL_DATABASE: node_mysql
  user: 'admin', // database user MYSQL_USER: MYSQL_USER
  password: 'nimda', // database user password MYSQL_PASSWORD: MYSQL_PASSWORD
  database: 'budget' // database name MYSQL_HOST_IP: mysql_db
})

// Enable cors security headers
app.use(cors())

// add an express method to parse the POST method
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// home page
app.get('/', (req, res) => {
  res.send('Hi There')
});

// get all of the books in the database
app.get('/get', (req, res) => {
  const SelectQuery = " SELECT * FROM  budget";
  db.query(SelectQuery, (err, result) => {
    res.send(result)
  })
})

// add a book to the database
app.post("/insert", (req, res) => {
  const bookName = req.body.setBookName;
  const bookReview = req.body.setReview;
  const InsertQuery = "INSERT INTO budget (book_name, book_review) VALUES (?, ?)";
  db.query(InsertQuery, [bookName, bookReview], (err, result) => {
    console.log(result)
  })
})

// delete a book from the database
app.delete("/delete/:bookId", (req, res) => {
  const bookId = req.params.bookId;
  const DeleteQuery = "DELETE FROM budget WHERE id = ?";
  db.query(DeleteQuery, bookId, (err, result) => {
    if (err) console.log(err);
  })
})

// update a book review
app.put("/update/:bookId", (req, res) => {
  const bookReview = req.body.reviewUpdate;
  const bookId = req.params.bookId;
  const UpdateQuery = "UPDATE budget SET book_review = ? WHERE id = ?";
  db.query(UpdateQuery, [bookReview, bookId], (err, result) => {
    if (err) console.log(err)
  })
})

app.listen('3001', () => { })