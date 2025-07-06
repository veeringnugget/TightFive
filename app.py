from flask import Flask, render_template
from routes.home import home
from routes.new_material import new_material
from routes.sets import sets
from routes.vault import joke_vault
from routes.new_set import new_set


app = Flask(__name__)
app.register_blueprint(home)
app.register_blueprint(new_material)
app.register_blueprint(sets)
app.register_blueprint(joke_vault)
app.register_blueprint(new_set)

app.secret_key = '9yZ)<2$lc`*pG>948{(ZrHk~]FpFSrk%M_<aeBDZ2~JyFV[6tk]ww!y%PB<X|3['


if __name__ == "__main__":
    app.run(debug=True, use_reloader=True)
