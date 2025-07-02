from flask import Flask, render_template, request, redirect, url_for, flash
from datetime import datetime
import sqlite3
import random
import requests

app = Flask(__name__)
app.secret_key = '9yZ)<2$lc`*pG>948{(ZrHk~]FpFSrk%M_<aeBDZ2~JyFV[6tk]ww!y%PB<X|3['

@app.route('/')
def index():
    # API for Joke Generator
    api_url = "https://icanhazdadjoke.com/"
    headers = {"Accept": "application/json"}
    response = requests.get(api_url, headers=headers)
    joke = response.json()

    # Output a random prompt
    with open("resources/comedy_prompts.txt", "r") as file:
        prompt = [line.strip() for line in file if line.strip()]
    randomprompt = (random.choice(prompt))

    return render_template('home.html', active_page='home', joke=joke, prompt=randomprompt)

@app.route('/new_joke', methods=["GET", "POST"])
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
        return render_template('new_joke.html')
    with open("resources/tags.txt", "r") as file:
        tags = [line.strip() for line in file if line.strip()]
    return render_template('new_joke.html', active_page='new_joke', tags=tags)

@app.route('/sets')
def sets():
    return render_template('sets.html', active_page='build_set')

@app.route('/archive')
def archive():
    return render_template('archive.html', active_page='archive')

if __name__ == "__main__":
    app.run(debug=True, use_reloader=True)
