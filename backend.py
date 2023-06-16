from flask import Flask, request, jsonify, render_template
import pandas as pd

app = Flask(__name__)

# Шляхи до CSV файлів
RECIPES_FILE = 'recipes.csv'
USERS_FILE = 'users.csv'

# Завантаження даних з CSV файлів
recipes_df = pd.read_csv(RECIPES_FILE)
users_df = pd.read_csv(USERS_FILE)

# Маршрут для головної сторінки
@app.route('/')
def index():
    return render_template('recepies.html')

# Маршрут для отримання всіх рецептів
@app.route('/recipes', methods=['GET'])
def get_recipes():
    return recipes_df.to_json(orient='records')

# Маршрут для додавання нового рецепту
@app.route('/recipes', methods=['POST'])
def add_recipe():
    data = request.json
    recipe_data = {
        'title': data['title'],
        'ingredients': data['ingredients'],
        'instructions': data['instructions'],
        'image': data['image']
    }
    recipes_df = recipes_df.append(recipe_data, ignore_index=True)
    recipes_df.to_csv(RECIPES_FILE, index=False)
    return jsonify({'message': 'Recipe added successfully'})

# Запуск серверу
if __name__ == '__main__':
    app.run()