import sqlite3

# Connect to SQLite database (it will create the database if it doesn't exist)
conn = sqlite3.connect("Contacts.db")

# Create a cursor object to execute SQL commands
cursor = conn.cursor()

# Create the Contacts table
cursor.execute("""
CREATE TABLE IF NOT EXISTS Contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    phone_number TEXT NOT NULL,
    SMS TEXT CHECK(SMS IN ('on', 'off')) NOT NULL,
    Call TEXT CHECK(Call IN ('on', 'off')) NOT NULL
)
""")

# Commit changes and close the connection
conn.commit()
conn.close()

print("Database and Contacts table created successfully!")
