DROP TABLE IF EXISTS user_info;
DROP TABLE IF EXISTS habit;
DROP TABLE IF EXISTS habit_log;

CREATE TABLE user_info (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL
);
CREATE TABLE habit (
    habit_id INTEGER PRIMARY KEY AUTOINCREMENT,
    habit_name TEXT NOT NULL,
    frequency INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) references user_info (user_id),
    UNIQUE (habit_name, frequency, user_id)
);
CREATE TABLE habit_log (
    habit_log_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    habit_id INTEGER NOT NULL,
    date_practiced date NOT NULL,
    FOREIGN KEY (user_id) references user_info (user_id),
    FOREIGN KEY (habit_id) references habit(habit_id)
);