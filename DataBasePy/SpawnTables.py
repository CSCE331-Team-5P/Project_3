import psycopg2

# Connect to PostgreSQL
connection = psycopg2.connect(
    user='team_5p',
    password='slimcat74',
    host='csce-315-db.engr.tamu.edu',
    database='team_5p_db'
)
cursor = connection.cursor()

# --- Step 1: Create Tables ---
# SQL statements to create the tables in the correct order
create_table_queries = [
    """
    CREATE TABLE IF NOT EXISTS Staff (
        idEmployee INT NOT NULL,
        firstNameEmployee VARCHAR(50),
        lastNameEmployee VARCHAR(50),
        dateBirth DATE,
        roleEmployee VARCHAR(50), -- Enum can't be used easily, so use VARCHAR
        wageEmployee DECIMAL(10,2),
        statusEmployee VARCHAR(50), -- Enum can't be used easily, so use VARCHAR
        PRIMARY KEY(idEmployee)
    );
    """,
    """
    CREATE TABLE IF NOT EXISTS Inventory (
        idInventory INT NOT NULL,
        nameItem VARCHAR(255),
        quantityItem INT,
        priceItem DECIMAL(10,2),
        categoryItem VARCHAR(100),
        restockTime TIMESTAMP,
        status VARCHAR(45), -- Added new status field
        PRIMARY KEY(idInventory)
    );
    """,
    """
    CREATE TABLE IF NOT EXISTS Transactions (
        idTransaction INT NOT NULL,
        idEmployee INT NOT NULL,
        dateTransaction TIMESTAMP,
        amountTotal DECIMAL(10,2),
        methodPayment VARCHAR(50),
        PRIMARY KEY(idTransaction),
        FOREIGN KEY (idEmployee) REFERENCES Staff(idEmployee)
    );
    """,
    """
    CREATE TABLE IF NOT EXISTS Orders (
        idOrderItem INT NOT NULL,
        idInventory INT NOT NULL,
        idTransaction INT NOT NULL,
        typeMeal VARCHAR(25),
        PRIMARY KEY(idOrderItem),
        FOREIGN KEY (idInventory) REFERENCES Inventory(idInventory),
        FOREIGN KEY (idTransaction) REFERENCES Transactions(idTransaction)
    );
    """,
    """
    CREATE TABLE IF NOT EXISTS Schedule (
        idShift INT NOT NULL,
        idEmployee INT NOT NULL,
        dateShift DATE,
        timeStart TIME,
        timeEnd TIME,
        job VARCHAR(50),
        hoursWorked INT,
        statusShift VARCHAR(50),
        PRIMARY KEY(idShift),
        FOREIGN KEY (idEmployee) REFERENCES Staff(idEmployee)
    );
    """
]

# Before creating new tables, drop existing tables in reverse order of dependencies
drop_table_queries = [
    "DROP TABLE IF EXISTS Schedule CASCADE;",
    "DROP TABLE IF EXISTS Orders CASCADE;",
    "DROP TABLE IF EXISTS Transactions CASCADE;",
    "DROP TABLE IF EXISTS Inventory CASCADE;",
    "DROP TABLE IF EXISTS Staff CASCADE;"
]

# Execute each drop table query
print("Dropping existing tables...")
for query in drop_table_queries:
    cursor.execute(query)

# Execute each table creation query
print("Creating new tables...")
for query in create_table_queries:
    cursor.execute(query)

# Commit the changes to the database
connection.commit()

# Close the cursor and connection
cursor.close()
connection.close()
print("Tables created successfully!")
