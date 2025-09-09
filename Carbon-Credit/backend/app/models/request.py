from app import db
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.ext.mutable import MutableList

class Request(db.Model):
    __tablename__ = 'requests'
    id = db.Column(db.Integer, primary_key=True)
    credit_id = db.Column(db.Integer, db.ForeignKey('credits.id'), nullable=False)
    creator_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    auditors = db.Column(MutableList.as_mutable(ARRAY(db.Integer)))
    score = db.Column(db.Integer, default=0)

    credit = db.relationship('Credit', backref='requests')
    creator = db.relationship('User', backref='requests')
