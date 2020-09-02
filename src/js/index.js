import Search from './models/Search';
import * as searchView from './views/searchView';
import {clearLoader, elements, loader} from './views/base';

/**
 * Global state of app
 * - Search obj
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};

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

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    // Promise returned
    controlSearch();
});
