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
            return {"error": "habit already exists"}, 400
    return dict(new_habit), 200


# @bp.route('/log', methods=('POST',))
# def log_habit():
#     """Takes json {"habit_name": "x", "user_id": y, "date_practiced": "YYYY-MM-DD"}"""
#     if request.method == 'POST':
#         payload = request.json
#         if not (payload.get("habit_name", False)
#                 and payload.get("user_id", False)
#                 and payload.get("date_practiced", False)):
#             return {"error": "missing data"}, 400
#         db = get_db()
#         habit_info = db.execute(

#         )
#         try:
#             db.execute(
#                 "INSERT INTO habit_log (habit_name, frequency, user_id) VALUES (?, ?, ?)",
#                 (payload.get("habit_name"), payload.get(
#                     "frequency"), payload.get("user_id"))
#             )
#             db.commit()
#         except db.IntegrityError:
#             return {"error": "habit already exists"}, 400
#     return {"message": "success"}, 200


# @bp.route('/log', methods=('',))
# def login():
#     if request.method == "GET":
#         payload = request.json
#         if not payload.get("username", False):
#             return {"error": "No username received."}, 400
#         db = get_db()
#         user = db.execute(
#             'SELECT user_id FROM user_info WHERE username = ?',
#             (payload.get("username"),)
#         ).fetchone()
#         return {"user_id": user["user_id"]}, 200
