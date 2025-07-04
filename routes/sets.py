from flask import Blueprint, render_template, request, flash
import sqlite3

sets = Blueprint("sets", __name__, static_folder="static", template_folder="templates")

@sets.route('/sets')
def new_set():
    return render_template('sets.html', active_page='sets')