from flask import Blueprint, render_template, request, make_response, jsonify
import json
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

            setName = req['setName']
            setDesc = req['setDesc']
            sectionNo = 0
            cursor.execute("INSERT INTO sets (title, description) VALUES (?, ?)", (setName, setDesc))
            connect.commit()
            set_id = cursor.execute("SELECT id FROM sets WHERE title = ?", (setName,)).fetchone()[0]

            for section in req['sections']:
                 jokeNo = 0
                 sectionNo = sectionNo + 1 # Tracks the set No that we are in (checked and working)
                 sectionName = section['sectionName'] # Tracks the section name we are in (checked and working)
                 sectionLength = section['sectionLength'] # Tracks the length per section (checked and working)
                 cursor.execute("INSERT INTO sections (set_id, section_id, section_name, length) VALUES (?, ?, ?, ?)", (set_id, sectionNo, sectionName, sectionLength))
                 connect.commit()
                 for joke in section['joke']:
                      # find the id which corresponds with the current joke
                      joke_id = cursor.execute("SELECT id FROM jokes WHERE title = ?", (joke,)).fetchone()[0]
                      jokeNo = jokeNo + 1
                      cursor.execute("INSERT INTO section_joke (section_id, joke_id, order_index) VALUES (?, ?, ?)", (sectionNo, joke_id, jokeNo))
                      connect.commit()
                      cursor.execute("INSERT INTO set_jokes (set_id, joke_id, order_index) VALUES (?, ?, ?)", (set_id, joke_id, jokeNo))
                      connect.commit()
                      
            make_response(jsonify({"message": "JSON received"}), 200)
    connect.close()
    return render_template('new_set.html', active_page='sets', sets=sets, jokes=jokes)