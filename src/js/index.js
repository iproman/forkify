import Search from './models/Search';

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
    const query = 'pizza' // TODO
    if (query) {
        // New search object and add to state
        state.search = new Search(query);

        // Prepare UI for results

        // Search for recipes
        await state.search.getResults();

        // Render results on UI
        console.log(state.search.result);
    }
}

document.querySelector('.search').addEventListener('submit', e => {
    e.preventDefault();
    // Promise returned
    controlSearch();
});
