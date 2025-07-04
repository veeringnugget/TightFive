from flask import Flask, render_template, request, redirect, url_for, flash
from datetime import datetime
import sqlite3
import random
import requests

app = Flask(__name__)
app.secret_key = '9yZ)<2$lc`*pG>948{(ZrHk~]FpFSrk%M_<aeBDZ2~JyFV[6tk]ww!y%PB<X|3['

@app.route('/', methods=["GET", "POST"])
def index():
    # API for Joke Generator
    api_url = "https://icanhazdadjoke.com/"
    headers = {"Accept": "application/json"}
    response = requests.get(api_url, headers=headers)
    joke = response.json()["joke"]

    # Generate a random prompt when the page loads
    row = open("resources/comedy_prompts.txt")
    randomprompt = random.choice(row.readlines())

    # If user clicks "save to vault" check not empty, else add it to the notes SQL table
    if request.method == "POST":
            note = request.form.get("notes")
            if not note:
                flash("Note is blank", "notes")
                return render_template('home.html', active_page='home', joke=joke, prompt=randomprompt)
            # add to sql database
            print(note)
            connect = sqlite3.connect("tightfive.db")
            cursor = connect.cursor()
            cursor.execute("INSERT INTO notes (note, created_at) VALUES(?, datetime('now', 'localtime'))", (note,))
            connect.commit()
            connect.close()

    return render_template('home.html', active_page='home', joke=joke, prompt=randomprompt)

@app.route('/gen_new_prompt')
def gen_new_prompt():
    # Store in a variable a random line from comedy_prompts.txt
    row = open("resources/comedy_prompts.txt")
    randomprompt = random.choice(row.readlines())

    # Return the randomprompt
    return randomprompt

@app.route('/new_material', methods=["GET", "POST"])
def new_joke():
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
            print(title, setup, punchline, status, notes, datetime.now())
            # cursor.execute("INSERT INTO jokes (title, setup, punchline, status, notes, created_at, last_edited) VALUES(?, ?, ?, ?, ?, ?, ?)", (title, setup, punchline, status, notes, datetime.now()))
        connect.close()








        return render_template('new_material.html')
    tags = open("resources/tags.txt")
    tags = tags.readlines()
    return render_template('new_material.html', active_page='new_material', tags=tags)

@app.route('/sets')
def sets():
    return render_template('sets.html', active_page='sets')

@app.route('/joke_vault')
def joke_library():
    return render_template('joke_vault.html', active_page='joke_vault')

if __name__ == "__main__":
    app.run(debug=True, use_reloader=True)
