from flask import Flask
from config import BaseConfig
from models import db, bcrypt
from controllers import blueprints


def create_app():
	#app = Flask(__name__, static_folder="../frontend", template_folder="../frontend/src")
	app = Flask(__name__)
	app.config.from_object(BaseConfig)
	db.init_app(app)
	bcrypt.init_app(app)
	register_blueprint(app)
	return app


def register_blueprint(app):
    # register blueprints
    for bp in blueprints:
        app.register_blueprint(bp)