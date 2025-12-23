import functools

from flask import (
    Blueprint, flash, g, redirect, render_template, request, session, url_for
)

from flaskr.db import get_db

bp = Blueprint('auth', __name__, url_prefix='/auth')


@bp.route('/register', methods=('POST',))
def register():
    """Takes json {"username": "example"}"""
    if request.method == 'POST':
        payload = request.json
        print(payload)
        if not payload.get("username", False):
            return {"error": "No username received."}, 400
        db = get_db()
        try:
            new_user = db.execute(
                "INSERT INTO user_info (username) VALUES (?) RETURNING *",
                (payload.get("username"),)
            ).fetchone()
            db.commit()
        except db.IntegrityError:
            return {"error": "Username is already taken."}, 400
    return dict(new_user), 200


@bp.route('/login', methods=('GET',))
def login():
    if request.method == "GET":
        payload = request.json
        if not payload.get("username", False):
            return {"error": "No username received."}, 400
        db = get_db()
        user = db.execute(
            'SELECT user_id FROM user_info WHERE username = ?',
            (payload.get("username"),)
        ).fetchone()
        return {"user_id": user["user_id"]}, 200
