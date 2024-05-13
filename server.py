# server.py
from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

@app.route('/api/data', methods=['POST'])
def receive_data():
    data = request.json
    print('Received data:', data)
    # 여기서 데이터를 처리하고 필요한 작업을 수행합니다.
    # 데이터를 MySQL에 저장하거나 추가적인 처리를 수행할 수 있습니다.
    return jsonify({'message': 'Data received successfully'})

if __name__ == '__main__':
    app.run(debug=True)
