import express from "express";
import mysql from "mysql";

// Use Express for application--
const app = express();

// Use Body Parser--
app.use(express.urlencoded({ extended: true }));

// Create Connection with the SQL Server--
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "library",
});

// Creating Table--
// const createTable = (table) => {
//     const sql = `CREATE TABLE ${table} (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(50), author VARCHAR(50), yop YEAR(4), rent DOUBLE)`;
//     console.log(sql);
//     con.query(sql, (err, result) => {
//         if (err) throw err;

//         console.log("Table Created");
//     });
//     con.end((err) => {
//         if (err) throw err;
//         console.log("Disconnected");
//     });
// };

// Insert Into Table--
app.post("/books", (req, res) => {
    const { id, name, author, yop, rent } = req.body;

    const sql = `INSERT INTO books (id, name, author, yop, rent) VALUES (${id}, '${name}', '${author}', ${yop}, ${rent})`;
    con.query(sql, (err, result) => {
        if (err) {
            console.error(err);

            return res.status(500).json({ error: "Failed to create Book." });
        }

        console.log("1 Record Inserted!");
        return res.status(201).json({ message: "Book created Successfully!" });
    });
});

// Remove From Table--
app.delete("/books/:id", (req, res) => {
    const { id } = req.params;

    const sql = `DELETE FROM books WHERE id = ${id}`;
    con.query(sql, (err, result) => {
        if (err) {
            console.error(err);

            return res.status(500).json({ error: "Failed to remove Book." });
        }

        console.log("Number of records deleted: " + result.affectedRows);
        return res.status(201).json({ message: "Book Deleted Successfully!" });
    });
});

// Read From Table--
app.get("/books", (req, res) => {
    const sql = `SELECT * FROM books`;
    con.query(sql, (err, result) => {
        if (err) {
            console.error(err);

            return res.status(500).json({ error: "Failed to read Books." });
        }

        return res.json(result);
    });
});

// Update the Table--
app.put("/books/:id", (req, res) => {
    const { id } = req.params;
    const { name, author, yop, rent } = req.body;

    const sql = `UPDATE books SET name='${name}', author='${author}', yop = ${yop}, rent=${rent} WHERE id = ${id}`;
    con.query(sql, (err, result) => {
        if (err) {
            console.error(err);

            return res.status(500).json({ error: "Failed to Update Book." });
        }

        console.log(result.affectedRows + " Record(s) Updated");
        return res.status(201).json({ message: "Book Updated Successfully!" });
    });
});

// Connect to SQL Server--
con.connect((err) => {
    if (err) throw err;
    console.log("MySQL Connected!");
});

// Express Router--
app.get("/", (req, res) => {
    res.send("<H1>Hello World!</H1>");
});

// Listening to the Server--
app.listen(3000, (err) => {
    if (err) throw err;
    console.log("Listening to Port 3000!");
});

// When Server is about the exit this function is called--
process.on("exit", () => {
    con.end((err) => {
        if (err) throw err;
        console.log("Exit");
    });
});
