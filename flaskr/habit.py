from flask import (
    Blueprint, request
)

from flaskr.db import get_db

bp = Blueprint('habit', __name__, url_prefix='/habit')


@bp.route('/new', methods=('POST',))
def add_habit():
    """Takes json {"habit_name": "x", "frequency": y, "user_id": z}"""
    if request.method == 'POST':
        payload = request.json
        if not (payload.get("habit_name", False)
                and payload.get("frequency")
                and payload.get("user_id")):
            return {"error": "missing data"}, 400
        db = get_db()
        try:
            new_habit = db.execute(
                "INSERT INTO habit (habit_name, frequency, user_id) VALUES (?, ?, ?) RETURNING *",
                (payload.get("habit_name"), payload.get(
                    "frequency"), payload.get("user_id"))
            ).fetchone()
            db.commit()
        except db.IntegrityError:
            return {"error": "habit already exists or user_id is wrong"}, 400
    return dict(new_habit), 200


@bp.route('/log', methods=('POST',))
def log_habit():
    """Takes json {"habit_id": x, "user_id": y, "date_practiced": "YYYY-MM-DD"}"""
    if request.method == 'POST':
        payload = request.json
        if not (payload.get("habit_id", False)
                and payload.get("user_id", False)
                and payload.get("date_practiced", False)):
            return {"error": "missing data"}, 400
        db = get_db()
        try:
            db.execute(
                "INSERT INTO habit_log (habit_id, user_id, date_practiced) VALUES (?, ?, ?)",
                (payload.get("habit_id"), payload.get(
                    "user_id"), payload.get("date_practiced"))
            )
            db.commit()
        except Exception as exc:
            return {"error": str(exc)}, 400
    return {"message": "success"}, 200


@bp.route('/<int:user_id>', methods=('GET',))
def get_habits(user_id):
    db = get_db()
    habits = db.execute(
        "SELECT habit_id, habit_name, frequency FROM habit WHERE user_id = ?",
        (user_id,)
    ).fetchall()
    return [dict(habit) for habit in habits], 200


@bp.route('/score', methods=('GET',))
def score():
    """returns score on integer scale of 0 to 7"""
    if request.method == "GET":
        user_id = request.args.get("user_id", None)
        habit_id = request.args.get("habit_id", None)
        frequency = request.args.get("freq", type=int, default=None)
        if not (user_id and habit_id and frequency):
            return {"error": "missing url parameter, need user_id, habit_id and freq"}, 400
        db = get_db()
        try:
            user = db.execute(
                'SELECT COUNT(habit_log_id) as num FROM habit_log WHERE user_id = ? AND habit_id = ? AND date_practiced >= date("now", "-7 days") ',
                (user_id, habit_id)
            ).fetchone()
        except Exception as exc:
            return {"error": str(exc)}
        score = int(7 * user["num"]/frequency)
        if score >= 7:
            score = 7
        return {"score": score}, 200
