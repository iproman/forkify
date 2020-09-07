import axios from 'axios';
import {env} from '../env';

export default class Recipe {

    constructor(id) {
        this.id = id;
    }

    /**
     * Get recipe
     * @return {Promise<void>}
     */
    async getRecipe() {
        try {
            const res = await axios(`${env.proxy}${env.url}/api/get?rId=${this.id}`);

            const recipe = res.data.recipe;
            this.title = recipe.title;
            this.author = recipe.publisher;
            this.img = recipe.image_url;
            this.url = recipe.source_url;
            this.ingredients = recipe.ingredients;

        } catch (e) {
            console.error('Something went wrong :(', e);
        }
    }

    /**
     * Calculate time.
     */
    calcTime() {
        // Assuming that we need 15 min for each 3 ingredients
        const numImg = this.ingredients.length;
        const periods = Math.ceil(numImg / 3);
        this.time = periods * 15;
    }

    /**
     * Calculate servings.
     */
    calcServings() {
        this.servings = 4;
    }

    /**
     * Parse ingredients.
     */
    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];

        const newIngredients = this.ingredients.map(el => {
            // Uniform units
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, i) => {
                if (el === unit) {
                    ingredient = ingredient.replace(unit, unitsShort[i])
                }
            });
        });
        this.ingredients = newIngredients;
    }
}
