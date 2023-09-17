import express from "express";
import mysql from "mysql";

// Use Express for application--
const app = express();

// Create Connection with the SQL Server--
const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "library",
});

// Creating Table--
const createTable = (table) => {
    const sql = `CREATE TABLE ${table} (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(50), author VARCHAR(50), yop YEAR(4), rent DOUBLE)`;
    console.log(sql);
    con.query(sql, (err, result) => {
        if (err) throw err;

        console.log("Table Created");
    });
    con.end((err) => {
        if (err) throw err;
        console.log("Disconnected");
    });
};

// Insert Into Table--
const insertIntoTable = (table, id, name, author, yop, rent) => {
    const sql = `INSERT INTO ${table} (id, name, author, yop, rent) VALUES (${id}, '${name}', '${author}', ${yop}, ${rent})`;
    con.query(sql, (err, result) => {
        if (err) throw err;

        console.log("1 Record Inserted!");
    });
    con.end((err) => {
        if (err) throw err;
        console.log("Disconnected");
    });
};

// Remove From Table--
const removeFromTable = (table, id) => {
    const sql = `DELETE FROM ${table} WHERE id = ${id}`;
    con.query(sql, (err, result) => {
        if (err) throw err;

        console.log("Number of records deleted: " + result.affectedRows);
    });
    con.end((err) => {
        if (err) throw err;
        console.log("Disconnected");
    });
};

// Read From Table--
const readFromTable = (table) => {
    const sql = `SELECT * FROM ${table}`;
    con.query(sql, (err, result) => {
        if (err) throw err;

        console.log(result);
    });
    con.end((err) => {
        if (err) throw err;
        console.log("Disconnected");
    });
};

// Update the Table--
const updateTheTable = (table, id, name, author, yop, rent) => {
    const sql = `UPDATE ${table} SET name='${name}', author='${author}', yop = ${yop}, rent=${rent} WHERE id = ${id}`;
    con.query(sql, (err, result) => {
        if (err) throw err;

        console.log(result.affectedRows + " Record(s) Updated");
    });
    con.end((err) => {
        if (err) throw err;
        console.log("Disconnected");
    });
};

// Connect to SQL Server--
con.connect((err) => {
    if (err) throw err;
    console.log("MySQL Connected!");

    // createTable("books");
    // insertIntoTable("books", 4, "ACE", "MRS. XXX", 2017, 199.9);

    // removeFromTable("books", 4);
    // readFromTable("books");

    // updateTheTable("books", 4, "NEW", "MRS. XXX", 2011, 299.9);
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
