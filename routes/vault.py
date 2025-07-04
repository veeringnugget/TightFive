from flask import Blueprint, render_template, request, flash
import sqlite3

joke_vault = Blueprint("joke_vault", __name__, static_folder="static", template_folder="templates")


@joke_vault.route('/joke_vault')
def vault():
    return render_template('joke_vault.html', active_page='joke_vault')