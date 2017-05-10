#coding:utf-8
from models._base import db


class Dynasty(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    intro = db.Column(db.Text())
    start_year = db.Column(db.Integer)
    end_year = db.Column(db.Integer)


    def __repr__(self):
        return '<Dynasty %s>' % self.name