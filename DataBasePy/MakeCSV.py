from faker import Faker
import csv
from random import randint, choice
from datetime import datetime, timedelta

fake = Faker()

# Helper function to generate a date within the last 39 weeks with time between 10 AM and 9 PM
def generate_date_over_weeks(start_date, weeks):
    random_days = randint(0, weeks * 7)
    random_hour = randint(10, 20)  # 10 AM to 8 PM
    random_minute = randint(0, 59)
    random_second = randint(0, 59)
    date = start_date + timedelta(days=random_days)
    date = date.replace(hour=random_hour, minute=random_minute, second=random_second, microsecond=0)
    return date

def generate_time_within_day(specific_date):
    random_hour = randint(10, 20)  # 10 AM to 8 PM
    random_minute = randint(0, 59)
    random_second = randint(0, 59)
    date = specific_date.replace(hour=random_hour, minute=random_minute, second=random_second, microsecond=0)
    return date

# Function to generate a random time between two hours
def generate_random_time_between(start_hour, end_hour):
    start_seconds = start_hour * 3600
    end_seconds = end_hour * 3600 - 1
    random_seconds = randint(start_seconds, end_seconds)
    return (datetime.combine(datetime.today(), datetime.min.time()) + timedelta(seconds=random_seconds)).time()

# Define the start date for the 39-week period
start_date = datetime.now() - timedelta(weeks=39)

# --- Step 1: Generate Staff CSV ---
print("Generating Staff CSV...")

with open('staff.csv', mode='w', newline='') as file:
    writer = csv.writer(file)
    
    # Write header row
    writer.writerow(['idEmployee', 'firstNameEmployee', 'lastNameEmployee', 'dateBirth', 'roleEmployee', 'wageEmployee', 'statusEmployee'])
    
    # Generate staff data (15 employees)
    staff_ids = []
    id_employee = 0
    for _ in range(15):
        first_name = fake.first_name()
        last_name = fake.last_name()
        date_birth = fake.date_of_birth(minimum_age=18, maximum_age=60)
        role = choice(['Cook', 'Server', 'Cashier'])
        wage = round(randint(15, 20) + fake.random_number(digits=2) / 100, 2)
        status = choice(['Active', 'Inactive'])
        
        writer.writerow([id_employee, first_name, last_name, date_birth, role, wage, status])
        staff_ids.append(id_employee)
        id_employee += 1

print("Finished generating Staff CSV.")

# --- Step 2: Generate Inventory CSV ---
print("Generating Inventory CSV...")

# Define the menu items for each category
category_hash = {
    'Side': ['Fried Rice', 'White Steamed Rice', 'Chow Mein', 'Super Greens'],
    'Entree': ['Orange Chicken', 'Beijing Beef', 'Honey Walnut Shrimp', 'Kung Pow Chicken',
               'Broccoli Beef', 'Black Pepper Sirloin Steak', 'Mushroom Chicken',
               'Sweet Fire Chicken Breast', 'String Bean Chicken Breast', 'Grilled Teriyaki Chicken',
               'Honey Sesame Chicken', 'Black Pepper Chicken', 'Blazing Burbon Chicken'],
    'Extras': ['Chicken Egg Roll', 'Veggie Spring Roll', 'Cream Cheese Rangoon', 'Apple Pie Roll'],
    'Drink': ['Dr Pepper', 'Coca Cola', 'Diet Coke', 'Manga Guava Flavored Tea', 'Peach Lychee Flavored Refresher', 
              'Pomegranate Pineapple Flavored Lemonade', 'Watermelon Manga Flavored Refresher', 'Barq\'s Root Berr', 
              'Fanta Orange', 'Minute Maid Lemonade', 'Powerade Mountain Berry Blast', 'Sprite', 'Coca Cola Cherry', 
              'Fuze Raspberry Iced Tea', 'Sweet Tea', 'Powerade Fruit Punch', 'Dasani', 'Powerade Berry Blast', 
              'Minute Maid Orange', 'Minute Maid Apple Juice', 'Coke Mexico', 'Coke Zero', 'Smartwater', 'Bai Coco Fusion',
              'Drink small', 'Drink medium', 'Drink large']
}

# Write inventory data to CSV file
with open('inventory.csv', mode='w', newline='') as file:
    writer = csv.writer(file)
    
    # Write header row - Added status field
    writer.writerow(['idInventory', 'nameItem', 'quantityItem', 'priceItem', 'categoryItem', 'restockTime', 'status'])
    
    id_inventory = 0
    for key, value in category_hash.items():
        for name_item in value:
            quantity_item = randint(50, 300)
            # Adjust prices based on category
            if key == 'Extras':
                price_item = round(randint(2, 4) + fake.random_number(digits=2) / 100, 2)
            else:
                price_item = round(randint(3, 5) + fake.random_number(digits=2) / 100, 2)
            category_item = key
            restock_time = fake.date_time_between(start_date='-30d', end_date='now')
            status = "ACTIVE"  # New status field
            
            writer.writerow([id_inventory, name_item, quantity_item, price_item, category_item, restock_time, status])
            id_inventory += 1

print("Finished generating Inventory CSV.")

# --- Step 3: Generate Transactions Data ---
print("Generating Transactions Data (this will take some time)...")
transactions_data = []

# Prepare to generate transactions data
transaction_ids = []
id_transaction = 0
total_transactions = 750_000
peak_day_transactions = total_transactions // 5  # 20% on peak day

# Choose a peak day
peak_day = generate_date_over_weeks(start_date, 39)

# Generate transactions data
for i in range(total_transactions):
    if i % 100_000 == 0:
        print(f"Generated {i} transactions so far...")
        
    if i < peak_day_transactions:
        transaction_date = generate_time_within_day(peak_day)
    else:
        transaction_date = generate_date_over_weeks(start_date, 39)
    
    id_employee = choice(staff_ids)
    method_payment = choice(['Cash', 'Card', 'Dining Dollars', 'Meal Swipe'])
    amount_total = 0  # Placeholder
    
    transactions_data.append([id_transaction, id_employee, transaction_date, amount_total, method_payment])
    id_transaction += 1
    transaction_ids.append(id_transaction)

print("Finished generating Transactions Data.")

# --- Step 4: Generate Orders CSV ---
print("Generating Orders CSV and updating transaction totals...")

def get_inventory_id(item_name, inventory):
    for inv in inventory:
        if inv[1] == item_name:
            return inv[0]
    return None

# Define meal types for their corresponding prices
meal_type = ['A la carte', 'Bowl', 'Plate', 'Bigger Plate']

with open('orders.csv', mode='w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(['idOrderItem', 'idInventory', 'idTransaction', 'typeMeal'])
    
    # Read inventory data
    inventory = []
    with open('inventory.csv', mode='r') as inv_file:
        inv_reader = csv.reader(inv_file)
        next(inv_reader)
        for row in inv_reader:
            inventory.append(row)
    
    id_order = 0
    for transaction_id in range(total_transactions):
        if transaction_id % 100_000 == 0:
            print(f"Generated orders for {transaction_id} transactions so far...")
            
        meal = choice(meal_type)
        entrees, sides, drinks, extras = [], [], [], []
        price = 0
        
        # Handle main meal components
        if meal == 'A la carte':
            food_type = choice(['Entree', 'Side'])
            selected_item = choice(category_hash[food_type])
            if food_type == 'Entree':
                entrees.append(selected_item)
            else:
                sides.append(selected_item)
            price = 5.30
        elif meal == 'Bowl':
            entrees.append(choice(category_hash['Entree']))
            sides.append(choice(category_hash['Side']))
            price = 6.10
        elif meal == 'Plate':
            entrees += [choice(category_hash['Entree']) for _ in range(2)]
            sides.append(choice(category_hash['Side']))
            price = 7.30
        elif meal == 'Bigger Plate':
            entrees += [choice(category_hash['Entree']) for _ in range(3)]
            sides.append(choice(category_hash['Side']))
            price = 8.80
        # elif meal == 'Family Platter':
        #     entrees += [choice(category_hash['Entree']) for _ in range(3)]
        #     sides += [choice(category_hash['Side']) for _ in range(2)]
        #     price = 32.00
            
        # Add extras with 40% probability
        if randint(1, 100) <= 40:
            num_extras = randint(1, 3)  # Add 1-3 extras
            for _ in range(num_extras):
                extra_item = choice(category_hash['Extras'])
                extras.append(extra_item)
                price += 2.50  # Average price for extras
                
        # Add drinks with 50% probability
        if choice([True, False]):
            drinks.append(choice(category_hash['Drink']))
            price += 1.50
            
        # Insert all items into Orders CSV
        for food_item in entrees + sides + drinks + extras:
            id_inventory = get_inventory_id(food_item, inventory)
            if id_inventory is not None:
                writer.writerow([id_order, id_inventory, transaction_id, meal])
                id_order += 1
                
        # Update transaction total
        transactions_data[transaction_id][3] = round(price, 2)

print("Finished generating Orders CSV.")

# --- Step 5: Update Transactions CSV ---
print("Updating Transactions CSV with calculated totals...")

with open('transactions.csv', mode='w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(['idTransaction', 'idEmployee', 'dateTransaction', 'amountTotal', 'methodPayment'])
    writer.writerows(transactions_data)

print("Finished updating Transactions CSV.")

# --- Step 6: Generate Schedule CSV ---
print("Generating Schedule CSV...")

with open('schedule.csv', mode='w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(['idShift', 'idEmployee', 'dateShift', 'timeStart', 'timeEnd', 'job', 'hoursWorked', 'statusShift'])
    
    id_shift = 0
    min_shift_duration = 4
    max_shift_duration = 8
    
    for _ in range(150 * 39):  # 150 shifts over 39 weeks
        latest_start_hour = 21 - min_shift_duration
        
        id_employee = choice(staff_ids)
        date_shift = generate_date_over_weeks(start_date, 39)
        time_start = generate_random_time_between(10, latest_start_hour)
        
        start_datetime = datetime.combine(datetime.today(), time_start)
        end_of_shift = datetime.combine(datetime.today(), datetime.strptime('21:00:00', '%H:%M:%S').time())
        max_possible_duration = (end_of_shift - start_datetime).total_seconds() / 3600.0
        
        if max_possible_duration < min_shift_duration:
            continue
            
        hours_worked = int(min(randint(min_shift_duration, max_shift_duration), max_possible_duration))
        time_end_datetime = start_datetime + timedelta(hours=hours_worked)
        time_end = time_end_datetime.time()
        job = choice(['Server', 'Cook', 'Manager'])
        status_shift = choice(['Completed', 'Scheduled'])
        
        writer.writerow([id_shift, id_employee, date_shift, time_start, time_end, job, hours_worked, status_shift])
        id_shift += 1

print("Finished generating Schedule CSV.")
print("All data has been generated successfully!")