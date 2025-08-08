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
        sectionsTable = cursor.execute("SELECT section_id, section_name, LENGTH FROM sections WHERE set_id = ?", (setId,)).fetchall()
        sectionJokes = cursor.execute("SELECT sectional_jokes.section_id, jokes.title, sectional_jokes.order_index FROM sectional_jokes JOIN jokes ON sectional_jokes.joke_id=jokes.id WHERE sectional_jokes.set_id = ? ORDER BY sectional_jokes.section_id, sectional_jokes.order_index", (setId,)).fetchall()
        connect.close()
        return jsonify({"setInfo": setTable, "sectionsInfo": sectionsTable, "jokesData": sectionJokes})
    return render_template('sets.html', active_page='sets', sets=sets)