from flask import Flask, jsonify
from flask_mysqldb import MySQL
import MySQLdb.cursors

app = Flask(__name__)

# MySQL 설정
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '1234'
app.config['MYSQL_DB'] = 'test'

mysql = MySQL(app)

@app.route('/users')
def users():
    # MySQL 커서 생성
    cursor = mysql.connection.cursor(MySQLdb.cursors.DictCursor)
    
    # 데이터 삽입
    cursor.execute("INSERT INTO users (name) VALUES ('yerin')")
    cursor.execute("INSERT INTO users (name) VALUES ('dalkong')")
    
    # 변경 사항 커밋
    mysql.connection.commit()
    
    # 데이터 조회
    cursor.execute("SELECT * FROM users")
    users = cursor.fetchall()
    
    return jsonify({"members": users})

if __name__ == "__main__":
    app.run(debug=True)
