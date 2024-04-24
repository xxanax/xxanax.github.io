import sqlite3

def create_prompts_table():
    db = sqlite3.connect("database.db")
    cursor = db.cursor()

    sql = '''
            CREATE TABLE prompts (
                                id INTEGER PRIMARY KEY,
                                user_id INTEGER,
                                prompt TEXT,
                                answer TEXT,
                                asking_date timestamp DEFAULT CURRENT_TIMESTAMP);
    '''

    try: 
        cursor.execute(sql)
        print('Prompts table created')
    except sqlite3.OperationalError:
        print('Prompts table exist')

def create_users_table():
    db = sqlite3.connect("database.db")
    cursor = db.cursor()

    sql = '''
            CREATE TABLE users (
                                user_id INTEGER PRIMARY KEY,
                                username TEXT,
                                joining_date timestamp DEFAULT CURRENT_TIMESTAMP);
    '''

    try: 
        cursor.execute(sql)
        print('Users table created')
    except sqlite3.OperationalError:
        print('Users table exist')

def get_user(user_id):
    db = sqlite3.connect("database.db", detect_types=sqlite3.PARSE_DECLTYPES)
    cursor = db.cursor()

    sql = f"SELECT * from users WHERE user_id = {user_id}"

    cursor.execute(sql)

    result = cursor.fetchall()
    cursor.close()
    db.close()

    if len(result) > 0:
        return result[0]
    else:
        return []

def add_user(user_id, username):
    db = sqlite3.connect("database.db")
    cursor = db.cursor()

    sql = "INSERT INTO users (user_id, username) VALUES (?,?)"
    val = (user_id,username)

    cursor.execute(sql, val)

    db.commit()
    cursor.close()
    db.close()

def update_username(user_id, username):
    db = sqlite3.connect("database.db")
    cursor = db.cursor()

    sql = "UPDATE users SET username = ? WHERE user_id = ?"
    val = (username, user_id)

    cursor.execute(sql,val)
    db.commit()

    cursor.close()
    db.close()

def get_user_today_prompts(user_id):
    db = sqlite3.connect("database.db", detect_types=sqlite3.PARSE_DECLTYPES)
    cursor = db.cursor()

    sql = f"SELECT * from prompts WHERE user_id = {user_id} AND asking_date >= date('now','localtime','start of day')"
    cursor.execute(sql)

    result = cursor.fetchall()
    cursor.close()
    db.close()

    return result

def add_prompt(user_id, prompt, answer):
    db = sqlite3.connect("database.db")
    cursor = db.cursor()

    sql = "INSERT INTO prompts (user_id, prompt, answer) VALUES (?,?,?)"
    val = (user_id, prompt, answer)

    cursor.execute(sql, val)

    db.commit()
    cursor.close()
    db.close()