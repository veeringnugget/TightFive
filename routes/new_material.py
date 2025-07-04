from flask import Blueprint, render_template, request, flash
import sqlite3

new_material = Blueprint("new_material", __name__, static_folder="static", template_folder="templates")

@new_material.route('/new_material', methods=["GET", "POST"])
def new_joke():
    tags = open("resources/tags.txt")
    tags = tags.readlines()
    if request.method == "POST":
        # Get fields from user input and validate:
        error = False
        # Title
        title = request.form.get("title")
        if not title:
            flash("Please enter a title", "title")
            error = True
        # Tag
        tag = request.form.get("tag")
        if not tag:
            flash("Please select a tag", "tag")
            error = True
        # Setup
        setup = request.form.get("setup")
        if not setup:
            flash("Please enter a setup", "setup")
            error = True
        # Punchline
        punchline = request.form.get("punchline")
        if not punchline:
            flash("Please enter a punchline", "punchline")
            error = True
        
        # Status / Extra Notes (not mandatory)
        status = request.form.get("status")
        notes = request.form.get("notes")

        # Database Connection
        connect = sqlite3.connect("tightfive.db")
        cursor = connect.cursor()
        
        #If no errors are found, can add info to the database
        if error == False:
            cursor.execute("INSERT INTO jokes (title, setup, punchline, status, notes, created_at, last_edited) VALUES(?, ?, ?, ?, ?, datetime('now', 'localtime'), datetime('now', 'localtime'))", (title, setup, punchline, status, notes))
            joke_id = cursor.lastrowid
            cursor.execute("INSERT OR IGNORE INTO tags (name) VALUES (?)", (tag,))
            tag_id = cursor.execute("SELECT id FROM tags WHERE name = ?", (tag,)).fetchone()[0]
            cursor.execute("INSERT INTO jokes_tags (joke_id, tags_id) VALUES (?, ?)", (joke_id, tag_id))
            cursor.execute("INSERT INTO joke_versions (joke_id, setup, punchline, edited_at) VALUES (?, ?, ?, datetime('now', 'localtime'))", (joke_id, setup, punchline))
            cursor.execute("INSERT INTO writing_log (date, joke_id) VALUES (datetime('now', 'localtime'), ?)", (joke_id,))
        connect.commit()
        connect.close()
        return render_template('new_material.html', active_page='new_material', tags=tags)
    return render_template('new_material.html', active_page='new_material', tags=tags)