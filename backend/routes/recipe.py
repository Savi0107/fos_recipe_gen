# backend/routes/recipe.py

from flask import Blueprint, request, jsonify

recipe_bp = Blueprint("recipe", __name__)

@recipe_bp.post("/generate")
def generate_recipe():
    data = request.get_json() or {}

    ingredients = (data.get("ingredients") or "").lower()
    cuisine = data.get("cuisine") or "Generic"
    preferences = data.get("preferences") or ""
    time = data.get("time") or "15 mins"
    fireless = bool(data.get("fireless"))

    # 🔹 SUPER SIMPLE MOCK LOGIC FOR MVP
    if "egg" in ingredients and "tomato" in ingredients:
        recipe = {
            "title": "Tomato Egg Bhurji",
            "cuisine": cuisine or "Indian",
            "time": "10–15 mins",
            "fireless": False,
            "ingredients": ["Tomato", "Egg", "Salt", "Oil"],
            "steps": [
                "Chop the tomatoes.",
                "Beat the eggs with salt.",
                "Heat oil and cook tomato + egg together.",
            ],
        }
    elif "bread" in ingredients and fireless:
        recipe = {
            "title": "No-Fire Bread Sandwich",
            "cuisine": cuisine or "Indian",
            "time": "5–10 mins",
            "fireless": True,
            "ingredients": ["Bread", "Butter", "Tomato", "Cucumber"],
            "steps": [
                "Spread butter on bread slices.",
                "Layer tomato and cucumber slices.",
                "Close the sandwich and cut into halves.",
            ],
        }
    else:
        recipe = {
            "title": "Basic Mixed Veg Bowl",
            "cuisine": cuisine,
            "time": time,
            "fireless": fireless,
            "ingredients": ["Any veggies you have", "Salt", "Spices"],
            "steps": [
                "Chop whatever vegetables you have.",
                "Mix with salt and simple spices.",
                "Cook lightly (or keep raw if fireless).",
            ],
        }

    return jsonify(recipe)
