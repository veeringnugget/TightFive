from flask import Blueprint, render_template, request, flash
import sqlite3

sets = Blueprint("sets", __name__, static_folder="static", template_folder="templates")

@sets.route('/sets')
def new_set():
    connect = sqlite3.connect("tightfive.db")
    cursor = connect.cursor()
    # Load current sets
    sets = connect.execute("SELECT * FROM sets").fetchall()
    if not sets:
        sets = "No Sets Created"
    connect.commit()
    connect.close()
    return render_template('sets.html', active_page='sets', sets=sets)