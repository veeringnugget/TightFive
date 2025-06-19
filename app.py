from flask import Flask, render_template, request, redirect, url_for, flash
from datetime import datetime
import sqlite3

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('home.html', active_page='home')

@app.route('/new_joke')
def new_joke():
    return render_template('new_joke.html', active_page='new_joke')

@app.route('/sets')
def sets():
    return render_template('sets.html', active_page='build_set')

@app.route('/archive')
def archive():
    return render_template('archive.html', active_page='archive')

if __name__ == "__main__":
    app.run(debug=True, use_reloader=True)
