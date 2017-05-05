import flask
from flask import request, jsonify

test_bp = flask.Blueprint(
    'test',
    __name__,
    url_prefix=''
)


@test_bp.route("/api/hello", methods=["GET"])
def hello():
    return "Hello World!!!!!!!"

@test_bp.route("/api/cms", methods=["GET"])
def cms():
    page=request.args.get('page');

    posts1={
        'meta':{'pagination': {'page': 1, 'limit': 7, 'total': 99}},
        'posts':[
            {'id': 1, 'title': "hello world", 'accepted': False, 'publishedAt': "Jan 21, 2017", 'status': 0},
            {'id': 2, 'title': "hello world", 'accepted': False, 'publishedAt': "Jan 22, 2017", 'status': 0},
            {'id': 3, 'title': "hello world", 'accepted': False, 'publishedAt': "Jan 23, 2017", 'status': 0},
            {'id': 4, 'title': "hello world", 'accepted': False, 'publishedAt': "Jan 24, 2017", 'status': 0},
            {'id': 5, 'title': "hello world", 'accepted': False, 'publishedAt': "Jan 25, 2017", 'status': 0},
            {'id': 6, 'title': "hello world", 'accepted': False, 'publishedAt': "Jan 26, 2017", 'status': 0},
            {'id': 7, 'title': "hello world", 'accepted': False, 'publishedAt': "Jan 27, 2017", 'status': 0},
        ]
    }
    posts2={
        'meta':{'pagination': {'page': 2, 'limit': 7, 'total': 99}},
        'posts':[
            {'id': 1, 'title': "hello world second", 'accepted': False, 'publishedAt': "Jan 21, 2017", 'status': 0},
            {'id': 2, 'title': "hello world second", 'accepted': False, 'publishedAt': "Jan 22, 2017", 'status': 0},
            {'id': 3, 'title': "hello world second", 'accepted': False, 'publishedAt': "Jan 23, 2017", 'status': 0},
            {'id': 4, 'title': "hello world second", 'accepted': False, 'publishedAt': "Jan 24, 2017", 'status': 0},
            {'id': 5, 'title': "hello world second", 'accepted': False, 'publishedAt': "Jan 25, 2017", 'status': 0},
            {'id': 6, 'title': "hello world second", 'accepted': False, 'publishedAt': "Jan 26, 2017", 'status': 0},
            {'id': 7, 'title': "hello world second", 'accepted': False, 'publishedAt': "Jan 27, 2017", 'status': 0},
        ]
    }
    posts3={
        'meta':{'pagination': {'page': 3, 'limit': 7, 'total': 99}},
        'posts':[
            {'id': 1, 'title': "hello world again", 'accepted': False, 'publishedAt': "Jan 21, 2017", 'status': 0},
            {'id': 2, 'title': "hello world again", 'accepted': False, 'publishedAt': "Jan 22, 2017", 'status': 0},
            {'id': 3, 'title': "hello world again", 'accepted': False, 'publishedAt': "Jan 23, 2017", 'status': 0},
            {'id': 4, 'title': "hello world again", 'accepted': False, 'publishedAt': "Jan 24, 2017", 'status': 0},
            {'id': 5, 'title': "hello world again", 'accepted': False, 'publishedAt': "Jan 25, 2017", 'status': 0},
            {'id': 6, 'title': "hello world again", 'accepted': False, 'publishedAt': "Jan 26, 2017", 'status': 0},
            {'id': 7, 'title': "hello world again", 'accepted': False, 'publishedAt': "Jan 27, 2017", 'status': 0},
            {'id': 8, 'title': "hello world again", 'accepted': False, 'publishedAt': "Jan 27, 2017", 'status': 0},
            {'id': 9, 'title': "hello world again", 'accepted': False, 'publishedAt': "Jan 27, 2017", 'status': 0},
        ]
    }
    if page == '1':
        return jsonify(posts1)
    elif page == '2':
        return jsonify(posts2)
    else:
        return jsonify(posts3)  



@test_bp.route("/api/cms/new", methods=["GET"])
def cmsnew():
    postnew = {"id":"","title":"","accepted":False,"leadSentence":"","publishedAt":"","tagSuggestions":["RoR","Node.js"],"items":[],"tags":[]}
    return jsonify(postnew)







