import sqlite3

# Function to insert a record into the customMessage table
def insert_custom_message(message, is_active):
    try:
        # Connect to the SQLite database
        conn = sqlite3.connect("contacts.db")  # Use the correct path to your database
        cursor = conn.cursor()

        # Insert a new record into the customMessage table
        cursor.execute("""
            INSERT INTO customMessage (message, isActive) 
            VALUES (?, ?)
        """, (message, is_active))

        # Commit the changes
        conn.commit()
        print("Record inserted successfully")

    except sqlite3.Error as e:
        print(f"Error inserting record: {e}")
    
    finally:
        # Close the database connection
        if conn:
            conn.close()

# Example usage
if __name__ == "__main__":
    # You can change these values to insert different records
    message = "message 3"
    is_active = True

    insert_custom_message(message, is_active)
