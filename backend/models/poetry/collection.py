#coding:utf-8
from datetime import datetime
from models._base import db


class Collection(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    order = db.Column(db.Integer, default=0)
    name = db.Column(db.String(200), unique=True)
    full_name = db.Column(db.String(200), unique=True)
    desc = db.Column(db.Text())
    cover = db.Column(db.String(200))
    link = db.Column(db.String(300))
    abbr = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, default=datetime.now)
    kind_id = db.Column(db.Integer, db.ForeignKey('collection_kind.id'))
    kind = db.relationship('CollectionKind', backref=db.backref('collections', lazy='dynamic',
                                                                order_by="asc(Collection.order)"))

    @property
    def max_work_order(self):
        if self.works.count() == 0:
            return 0
        return CollectionWork.query.filter(CollectionWork.collection_id == self.id). \
            order_by(CollectionWork.order.desc()).first().order

    def __repr__(self):
        return '<Collection %s>' % self.name


class CollectionKind(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    order = db.Column(db.Integer, default=0)
    name = db.Column(db.String(50), unique=True)
    created_at = db.Column(db.DateTime, default=datetime.now)


    @property
    def max_collection_order(self):
        if self.collections.count() == 0:
            return 0
        return Collection.query.filter(Collection.kind_id == self.id). \
            order_by(Collection.order.desc()).first().order


class CollectionWork(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    order = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.now)

    work_id = db.Column(db.Integer, db.ForeignKey('work.id'))
    work = db.relationship('Work', backref=db.backref('collections', lazy='dynamic'))

    collection_id = db.Column(db.Integer, db.ForeignKey('collection.id'))
    collection = db.relationship('Collection', backref=db.backref('works', lazy='dynamic',
                                                                  order_by="asc(CollectionWork.order)"))
