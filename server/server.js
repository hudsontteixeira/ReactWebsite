const express = require('express');
const pg = require("pg");
const app = express();

var conString = 'postgres://postgres:6268@localhost:5433/tp1';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Default to accept all requests
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
function getSQLResult(req,res,sqlRequest,values){
  var client = new pg.Client(conString);
  client.connect(function(err){
    if(err){
      //failled to connect
      console.log("Failled to connect to postgres");
      res.status(500).end('Database Connection Error!'); 
    } else{
      //sucssesfuly connected
      client.query(sqlRequest,values, function(err,result){
        if(err){
          //bad Request
          console.log("Bad request", err);
          res.status(500).end('Bad Request Error!');  
        } else{
          var results = [];
          for (let index in result.rows) {
            results.push(result.rows[index]);
          }
          //Convert to JSON
          res.setHeader('Content-Type', 'application/json');
          res.send(JSON.stringify(results));
        }
        client.end();
      })
    }
  })
}
//Auth Website
app.get("/authenticate", function (req,res){
  var login = req.query.login;
  var passwd = req.query.passwd;
  var jsonString;
  if((login === "admin")&&(passwd === "admin")){
      jsonString = JSON.stringify({ok:1})
  } else{
    jsonString = JSON.stringify({ok:0})
  }
  res.setHeader('Content-Type', 'application/json');
  res.send(jsonString);
})
function postSQLResult(req,res,sqlRequest,values){
  var client = new pg.Client(conString);
  client.connect(function(err){
    if(err){
      //failled to connect
      console.log("Failled to connect to postgres");
      res.status(500).end('Database Connection Error!'); 
    } else{
      //sucssesfuly connected
      client.query(sqlRequest,values, function(err,result){
        if(err){
          //bad Request
          console.log("Bad request", err);
          res.status(500).end('Bad Request Error!');  
        } else{
          const jsonResp = {ok:1}
          //Convert to JSON
          res.setHeader('Content-Type', 'application/json');
          res.send(JSON.stringify(jsonResp));
        }
        client.end();
      })
    }
  })
}

app.post("/authenticate", function (req,res){
  var login = req.body.login;
  var passwd = req.body.passwd;
  var jsonString;
  if((login === "admin")&&(passwd === "admin")){
      jsonString = JSON.stringify({ok:1})
  } else{
    jsonString = JSON.stringify({ok:0})
  }
  res.setHeader('Content-Type', 'application/json');
  res.send(jsonString);
})

//Users List
app.post("/users", function (req,res){
var sqlRequest = "SELECT * FROM Person";
var values = [];
getSQLResult(req,res,sqlRequest,values)
});

//User Update
app.post("/updateUser", function (req,res){
  var sqlRequest = `UPDATE Person SET person_firstname = $1, person_lastname = $2, person_birthdate = $3 WHERE person_id = $4; `;
  var values = [];
  values.push(req.body.person_firstname);
  values.push(req.body.person_lastname);
  values.push(req.body.person_birthdate);
  values.push(req.body.id);
  postSQLResult(req,res,sqlRequest,values)
  });

//User create
app.post("/createUser", function (req,res){
  var sqlRequest = "INSERT INTO Person(person_firstname, person_lastname, person_birthdate, password) VALUES($1,$2,$3,$4) RETURNING person_id;";
  var values = [];
  values.push(req.body.person_firstname);
  values.push(req.body.person_lastname);
  values.push(req.body.person_birthdate);
  values.push(req.body.password);
  postSQLResult(req,res,sqlRequest,values)
  });

//User delete
app.post("/deleteUser", function (req,res){
  var sqlRequest = `Delete from Person WHERE person_id = $1; `;
  var values = [];
  values.push(req.body.id);
  postSQLResult(req,res,sqlRequest,values)
  });

//Books List
app.post("/books", function (req,res){
var sqlRequest = "SELECT * FROM book";
var values = [];
getSQLResult(req,res,sqlRequest,values)
});

//Book Update
app.post("/updateBook", function (req,res){
  var sqlRequest = `UPDATE book SET book_title = $1, book_authors = $2 WHERE book_id = $3; `;
  var values = [];
  values.push(req.body.book_title);
  values.push(req.body.book_authors);
  values.push(req.body.id);
  postSQLResult(req,res,sqlRequest,values)
  });

//Book create
app.post("/createBook", function (req,res){
  var sqlRequest = "INSERT INTO book(book_title, book_authors) VALUES($1,$2) RETURNING book_id;";
  var values = [];
  values.push(req.body.book_title);
  values.push(req.body.book_authors);
  postSQLResult(req,res,sqlRequest,values)
  });

//Book delete
app.post("/deleteBook", function (req,res){
  var sqlRequest = `Delete from book WHERE book_id = $1; `;
  var values = [];
  values.push(req.body.id);
  postSQLResult(req,res,sqlRequest,values)
  });
//Borrowed books by user
app.post("/borrow", function (req,res){
  var sqlRequest = "SELECT * FROM borrow INNER JOIN book ON (borrow.book_id = book.book_id) WHERE borrow.person_id =$1;";
  var values = [];
  values.push(req.body.id);
  getSQLResult(req,res,sqlRequest,values)
  });
//Borrowed books
app.post("/borrows", function (req,res){
  var sqlRequest = "SELECT * FROM borrow INNER JOIN book ON (borrow.book_id = book.book_id) INNER JOIN person ON (person.person_id = borrow.person_id) WHERE borrow.borrow_return IS NULL;";
  var values = [];
  getSQLResult(req,res,sqlRequest,values)
  });

//Borrowed books update
app.post("/updateBorrow", function (req,res){
  var sqlRequest = "UPDATE borrow SET borrow_return = $1 WHERE borrow_id = $2;";
  var values = [];
  values.push(req.body.return_date);
  values.push(req.body.id);
  postSQLResult(req,res,sqlRequest,values)
  });

//Borrowed Add
app.post("/createBorrow", function (req,res){
  var sqlRequest = "INSERT INTO public.borrow(person_id, book_id, borrow_date) VALUES ($1, $2, $3);";
  var values = [];
  values.push(req.body.id);
  values.push(req.body.book_id);
  values.push(req.body.borrow_date);

  postSQLResult(req,res,sqlRequest,values)
  });
// Must be LAST instruction of the file
// Listen to port 8000
app.listen(8000, () => {
  console.log('Server started!')
});

