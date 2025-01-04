const express = require("express");
const sqlite3 = require("sqlite3");
const cors = require("cors");
const app = express();
const port = 5000;

// Enable CORS
app.use(cors());

// Parse incoming JSON data
app.use(express.json());

// Set up SQLite database connection
const db = new sqlite3.Database("./contacts.db", (err) => {
    if (err) {
        console.error("Failed to open database:", err);
    } else {
        console.log("Database opened successfully");
    }
});

// Create contacts table (if it doesn't already exist)
db.run(`
    CREATE TABLE IF NOT EXISTS contacts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        phone TEXT NOT NULL,
        isSms BOOLEAN NOT NULL DEFAULT 0,
        isCall BOOLEAN NOT NULL DEFAULT 0
    )
`);

// GET: Fetch all contacts
app.get("/contacts", (req, res) => {
    const sql = "SELECT * FROM contacts";
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error("Error fetching contacts:", err);
            res.status(500).send("Server error");
        } else {
            res.json(rows);
        }
    });
});

// POST: Add a new contact
app.post("/add-contact", (req, res) => {
    const { name, phone, isSms, isCall } = req.body;

    const sql = "INSERT INTO contacts (name, phone, isSms, isCall) VALUES (?, ?, ?, ?)";
    const params = [name, phone, isSms, isCall];

    db.run(sql, params, function (err) {
        if (err) {
            console.error("Failed to add contact:", err);
            res.status(500).send("Server error");
        } else {
            res.status(201).json({
                id: this.lastID,
                name,
                phone,
                isSms,
                isCall,
            });
        }
    });
});

// DELETE: Delete a contact
app.delete("/contacts/:id", (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM contacts WHERE id = ?";
    db.run(sql, [id], function (err) {
        if (err) {
            console.error("Failed to delete contact:", err);
            res.status(500).send("Server error");
        } else {
            res.status(200).send(`Contact with ID ${id} deleted`);
        }
    });
});

app.put('/contacts/:id', (req, res) => {
    const { id } = req.params;
    const { name, phone, isSms, isCall } = req.body;

    console.log("Updating contact with ID:", id);
    console.log("Data received:", { name, phone, isSms, isCall });

    const sql = `
        UPDATE contacts 
        SET name = ?, phone = ?, isSms = ?, isCall = ?
        WHERE id = ?
    `;
    const params = [name, phone, isSms, isCall, id];

    db.run(sql, params, function (err) {
        if (err) {
            console.error("Error updating contact:", err);
            res.status(500).send("Error updating contact");
        } else {
            if (this.changes > 0) {
                res.status(200).send("Contact updated successfully");
            } else {
                res.status(404).send("Contact not found");
            }
        }
    });
});


// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
