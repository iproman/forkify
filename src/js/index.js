import Search from './models/Search';
import * as searchView from './views/searchView';
import {clearLoader, elements, loader} from './views/base';
import Recipe from './models/Recipe';

/**
 * Global state of app
 * - Search obj
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};

/**
 * Search controller
 * @return {Promise<void>}
 */
const controlSearch = async () => {
    // Get query
    const query = searchView.getSearchInput();
    if (query) {
        // New search object and add to state
        state.search = new Search(query);

        // Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        loader(elements.searchResult);

        // Search for recipes
        await state.search.getResults();

        // Render results on UI
        clearLoader();
        searchView.renderSearchResults(state.search.result);
    }
}

/**
 * Event listener for search.
 */
elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    // Promise returned
    controlSearch();
});

/**
 * Event listener for pagination.
 */
elements.pagination.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderSearchResults(state.search.result, goToPage);
    }
});

/**
 * Recipe controller
 */
const controlRecipe = async () => {
    // Get ID from url
    const id = window.location.hash.replace('#', '');

    if (id) {
        // Prepare UI for changes

        // Create new recipe object
        state.recipe = new Recipe(id);

        try {
            // Get recipe data
            await state.recipe.getRecipe();

        } catch (e) {
            console.error('Error processing recipe!', e);
        }

    }
}
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe))
