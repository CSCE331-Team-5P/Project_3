import psycopg2

# Connect to the PostgreSQL database using psycopg2 library
connection = psycopg2.connect(
    user='team_5p',
    password='slimcat74',
    host='csce-315-db.engr.tamu.edu',
    database='team_5p_db'
)
cursor = connection.cursor()

# Function to copy CSV data to a PostgreSQL table
# Input arguments: CSV file path, table name, and columns string
def copy_csv_to_table(csv_file_path, table_name, columns):
    try:
        with open(csv_file_path, 'r') as f:
            # Skip the header row if present in the CSV
            next(f)

            # Execute the COPY command
            cursor.copy_expert(f"COPY {table_name} ({columns}) FROM STDIN WITH CSV", f)
            connection.commit()
            print(f"Successfully copied {csv_file_path} to {table_name}")

    # Catch error and rollback the copy query if any exception occurs
    except Exception as e:
        connection.rollback()
        print(f"Error copying {csv_file_path} to {table_name}: {e}")

# Define the CSV file paths and corresponding tables with column names
tables_info = [
    {"csv_file": "staff.csv", "table": "Staff", "columns": "idEmployee, firstNameEmployee, lastNameEmployee, dateBirth, roleEmployee, wageEmployee, statusEmployee"},
    {"csv_file": "inventory.csv", "table": "Inventory", "columns": "idInventory, nameItem, quantityItem, priceItem, categoryItem, restockTime, status"},
    {"csv_file": "transactions.csv", "table": "Transactions", "columns": "idTransaction, idEmployee, dateTransaction, amountTotal, methodPayment"},
    {"csv_file": "orders.csv", "table": "Orders", "columns": "idOrderItem, idInventory, idTransaction, typeMeal"},
    {"csv_file": "schedule.csv", "table": "Schedule", "columns": "idShift, idEmployee, dateShift, timeStart, timeEnd, job, hoursWorked, statusShift"}
]

# Traverse tables_info list and copy each CSV to the corresponding table
for table_info in tables_info:
    copy_csv_to_table(table_info["csv_file"], table_info["table"], table_info["columns"])

# Close the cursor and connection to PostgreSQL database
cursor.close()
connection.close()

print("All CSVs copied to PostgreSQL successfully!")
