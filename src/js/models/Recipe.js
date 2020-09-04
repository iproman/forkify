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
}
