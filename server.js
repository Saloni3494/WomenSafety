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

        // Create customMessage table (if it doesn't already exist)
        db.run(`
            CREATE TABLE IF NOT EXISTS customMessage (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                message TEXT NOT NULL,
                isActive BOOLEAN NOT NULL DEFAULT 0
            )
        `, (err) => {
            if (err) {
                console.error("Error creating customMessage table:", err);
            } else {
                console.log("customMessage table created successfully");
            }
        });
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

    if (isCall) {
        // If the 'isCall' field is true, update all other contacts to set 'isCall' to false
        const updateCallFieldSQL = `
            UPDATE contacts
            SET isCall = false
        `;
        db.run(updateCallFieldSQL, function (err) {
            if (err) {
                console.error("Error updating other contacts' call fields:", err);
                return res.status(500).send("Error updating call fields for other contacts");
            }

            // Proceed to insert the new contact
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
    } else {
        // If 'isCall' is not true, insert the new contact as usual
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
    }
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

// PUT: Update a contact
app.put('/contacts/:id', (req, res) => {
    const { id } = req.params;
    const { name, phone, isSms, isCall } = req.body;

    console.log("Updating contact with ID:", id);
    console.log("Data received:", { name, phone, isSms, isCall });

    if (isCall) {
        // If 'isCall' is set to true, update all other contacts' 'isCall' to false
        const updateCallFieldSQL = `
            UPDATE contacts
            SET isCall = false
            WHERE id != ?
        `;
        db.run(updateCallFieldSQL, [id], function (err) {
            if (err) {
                console.error("Error updating other contacts' call fields:", err);
                return res.status(500).send("Error updating call fields for other contacts");
            }

            // Proceed to update the current contact
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
    } else {
        // If 'isCall' is not true, just update the contact
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
    }
});

// -------------Custom Message Section ----------

// GET: Fetch all custom messages
app.get("/customMessage", (req, res) => {
    const sql = "SELECT * FROM customMessage";
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error("Error fetching custom messages:", err);
            res.status(500).send("Server error");
        } else {
            res.json(rows);  // Send the rows as the response
        }
    });
});

// POST: Add a new message
app.post("/add-message", (req, res) => {
    const { message, isActive } = req.body;

    if (isActive) {
        // If the new message is set to active, deactivate all other messages
        const deactivateOtherMessagesSQL = `
            UPDATE customMessage
            SET isActive = false
        `;
        db.run(deactivateOtherMessagesSQL, function (err) {
            if (err) {
                console.error("Error deactivating other messages:", err);
                return res.status(500).send("Error deactivating other messages");
            }

            // Proceed to insert the new message with isActive = true
            const sql = "INSERT INTO customMessage (message, isActive) VALUES (?, ?)";
            const params = [message, isActive];

            db.run(sql, params, function (err) {
                if (err) {
                    console.error("Failed to add message:", err);
                    res.status(500).send("Server error");
                } else {
                    res.status(201).json({
                        id: this.lastID,
                        message,
                        isActive
                    });
                }
            });
        });
    } else {
        // If the message is not active, just insert it as normal
        const sql = "INSERT INTO customMessage (message, isActive) VALUES (?, ?)";
        const params = [message, isActive];

        db.run(sql, params, function (err) {
            if (err) {
                console.error("Failed to add message:", err);
                res.status(500).send("Server error");
            } else {
                res.status(201).json({
                    id: this.lastID,
                    message,
                    isActive
                });
            }
        });
    }
});


// DELETE: Delete a message
app.delete("/customMessage/:id", (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM customMessage WHERE id = ?";
    db.run(sql, [id], function (err) {
        if (err) {
            console.error("Failed to delete message:", err);
            res.status(500).send("Server error");
        } else {
            res.status(200).send(`Message with ID ${id} deleted`);
        }
    });
});

//Put : Update message
app.put('/customMessage/:id', (req, res) => {
    const { id } = req.params;
    const { message, isActive } = req.body;

    console.log("Updating message with ID:", id);
    console.log("Data received:", { message, isActive });

    // SQL query to update the selected message
    const updateSelectedMessageSQL = `
        UPDATE customMessage 
        SET message = ?, isActive = ?
        WHERE id = ?
    `;
    const params = [message, isActive, id];

    db.run(updateSelectedMessageSQL, params, function (err) {
        if (err) {
            console.error("Error updating message:", err);
            res.status(500).send("Error updating message");
        } else {
            if (isActive) {
                // If the updated record is set to active, make all other records inactive
                const deactivateOtherMessagesSQL = `
                    UPDATE customMessage
                    SET isActive = false
                    WHERE id != ?
                `;
                db.run(deactivateOtherMessagesSQL, [id], function (err) {
                    if (err) {
                        console.error("Error deactivating other messages:", err);
                        res.status(500).send("Error deactivating other messages");
                    } else {
                        res.status(200).send("Message updated successfully and others deactivated");
                    }
                });
            } else {
                // If not active, only update the current record
                res.status(200).send("Message updated successfully");
            }
        }
    });
});


// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
