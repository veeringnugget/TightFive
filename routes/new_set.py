from flask import Blueprint, render_template, request, jsonify, make_response
import sqlite3

new_set = Blueprint("new_set", __name__, static_folder="static", template_folder="templates")

@new_set.route('/new_set', methods=["GET", "POST"])
def new_set_form():
    connect = sqlite3.connect("tightfive.db")
    cursor = connect.cursor()

    # Load current sets
    sets = cursor.execute("SELECT * FROM sets").fetchall()
    if not sets:
        sets = "No Sets Created"
    # Load Jokes
    jokes = cursor.execute("SELECT * FROM jokes").fetchall()
    if not jokes:
        jokes = "No Jokes Written"
        
    if request.method == "POST":
            req = request.get_json()
            print(req["setName"])
            return render_template('new_set.html', active_page='sets', sets=sets, jokes=jokes)
    connect.commit()
    connect.close()
    return render_template('new_set.html', active_page='sets', sets=sets, jokes=jokes)