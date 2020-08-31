import axios from 'axios';
import {env} from '../env';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        try {
            const search_url = `${env.proxy}${env.url}/api/search?q=`;
            const res = await axios(`${search_url}${this.query}`);
            this.result = res.data.recipes;
        } catch (e) {
            console.log(e)
        }
    }
}
