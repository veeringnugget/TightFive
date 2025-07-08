from flask import Blueprint, render_template, request, flash
import sqlite3

new_set = Blueprint("new_set", __name__, static_folder="static", template_folder="templates")

@new_set.route('/new_set')
def new_set_form():
    connect = sqlite3.connect("tightfive.db")
    cursor = connect.cursor()
    # Load current sets
    sets = connect.execute("SELECT * FROM sets").fetchall()
    if not sets:
        sets = "No Sets Created"
    # Load Jokes
    jokes = connect.execute("SELECT * FROM jokes").fetchall()
    if not jokes:
        jokes = "No Jokes Written"
    connect.commit()
    connect.close()
    return render_template('new_set.html', active_page='sets', sets=sets, jokes=jokes)