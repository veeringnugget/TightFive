from flask import Blueprint, render_template, request, jsonify, make_response, url_for, redirect
import sqlite3

sets = Blueprint("sets", __name__, static_folder="static", template_folder="templates")

@sets.route('/sets',methods=["GET", "POST"])
def new_set():
    connect = sqlite3.connect("tightfive.db")
    cursor = connect.cursor()
    # Load current sets
    sets = connect.execute("SELECT * FROM sets").fetchall()
    if not sets:
        sets = "No Sets Created"
    # Load up SQL set information:
    if request.method == "POST":
        setName = request.get_json()
        setId = cursor.execute("SELECT id FROM sets WHERE title = ?", (setName,)).fetchall()[0][0]
        setTable = cursor.execute("SELECT id, title, description FROM sets WHERE id = ?", (setId,)).fetchone()
        connect.close()
        return jsonify({"setInfo": setTable)
    return render_template('sets.html', active_page='sets', sets=sets)