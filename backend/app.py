from flask import Flask, jsonify, request
from flask_cors import CORS
from routes.recipe import recipe_bp

app = Flask(__name__)
CORS(app)

@app.get("/")
def home():
    return jsonify({"status": "ok", "message": "FOS backend running"})

@app.post("/login")
def login():
    username = request.json.get("username")
    password = request.json.get("password")

    

    return jsonify({"status": "ok",
                    "message": "Login successful"})

# 🔹 register blueprint
app.register_blueprint(recipe_bp, url_prefix="/app")

if __name__ == "__main__":
    app.run(debug=True)


# sample test case
{
    method: "POST",
    username: 'sahana@123',
    password: "sahana@123"
}
