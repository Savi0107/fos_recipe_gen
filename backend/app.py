from flask import Flask, jsonify, request
from flask_cors import CORS
from routes.recipe import recipe_bp

app = Flask(__name__)
CORS(app)

# define mock user BEFORE login endpoint
VALID_USER = {
    "username": "sahana@123",
    "password": "sahana@123"
}

@app.get("/")
def home():
    return jsonify({"status": "ok", "message": "FOS backend running"})

@app.post("/login")
def login():
    username = request.json.get("username")
    password = request.json.get("password")

    if not username or not password:
        return jsonify({
            "status": "error",
            "message": "username and password are required"
        }), 400

    if username != VALID_USER["username"] or password != VALID_USER["password"]:
        return jsonify({
            "status": "error",
            "message": "invalid credentials"
        }), 401

    return jsonify({
        "status": "ok",
        "message": "Login successful"
    }), 200

# 🔹 register blueprint
app.register_blueprint(recipe_bp, url_prefix="/app")

if __name__ == "__main__":
    app.run(debug=True)

