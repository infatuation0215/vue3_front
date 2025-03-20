from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # 允许跨域请求

# 假设的用户数据
users = {
    "admin": {"password": "admin123", "role": "admin"},
    "user": {"password": "user123", "role": "user"},
}

@app.route('/login', methods=['POST'])
def login():
    # 获取请求体中的数据
    data = request.json
    username = data.get("username")
    password = data.get("password")
    role = data.get("role")

    # 校验用户名、密码和角色
    if username in users and users[username]["password"] == password and users[username]["role"] == role:
        # 登录成功，返回 token
        return jsonify({
            "code": 200,
            "message": "登录成功",
            "data": {
                "token": f"mock-jwt-token-{username}-{role}"
            }
        }), 200

    # 登录失败，返回错误信息
    return jsonify({
        "code": 401,
        "message": "用户名或密码错误",
        "data": None
    }), 401


@app.route('/logout', methods=['POST'])
def logout():
    return jsonify({"message": "登出成功"}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
