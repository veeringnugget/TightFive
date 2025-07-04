from flask import Blueprint, render_template, request, redirect, url_for, flash
import sqlite3
from datetime import datetime
import random
import requests

home = Blueprint("home", __name__, static_folder="static", template_folder="templates")

@home.route('/', methods=["GET", "POST"])
def index():
    connect = sqlite3.connect("tightfive.db")
    cursor = connect.cursor()

    # Track Number of jokes written
    jokeCount = cursor.execute("SELECT COUNT(*) FROM jokes").fetchone()[0]

    # Track Most used Tags
    topTags = cursor.execute("SELECT tags.name, COUNT(jokes_tags.tags_id) FROM tags JOIN jokes_tags ON tags.id=jokes_tags.tags_id GROUP BY jokes_tags.tags_id LIMIT 5").fetchall();

    print(topTags)
    # Track how many days in a row user has written for

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
            cursor.execute("INSERT INTO notes (note, created_at) VALUES(?, datetime('now', 'localtime'))", (note,))
    connect.commit()
    connect.close()
    return render_template('home.html', active_page='home', joke=joke, prompt=randomprompt, jokeCount=jokeCount)

@home.route('/gen_new_prompt')
def gen_new_prompt():
    # Store in a variable a random line from comedy_prompts.txt
    row = open("resources/comedy_prompts.txt")
    randomprompt = random.choice(row.readlines())

    # Return the randomprompt
    return randomprompt