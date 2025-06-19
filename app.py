from flask import Flask, render_template, request, redirect, url_for, flash
from datetime import datetime
import sqlite3

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('home.html', active_page='home')

if __name__ == "__main__":
    app.run(debug=True, use_reloader=True)
