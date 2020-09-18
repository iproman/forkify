import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
import {clearLoader, elements, loader} from './views/base';

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

        try {
            // Search for recipes
            await state.search.getResults();

            // Render results on UI
            clearLoader();
            searchView.renderSearchResults(state.search.result);
        } catch (e) {
            console.error('Something wrong with the search ...', e);
            clearLoader();
        }
    }
}

/**
 * Recipe controller.
 */
const controlRecipe = async () => {
    // Get ID from url
    const id = window.location.hash.replace('#', '');

    if (id) {
        // Prepare UI for changes
        recipeView.clearRecipe();
        loader(elements.recipe);

        // Highlight recipe
        if (state.search) searchView.highlightSelected(id);

        // Create new recipe object
        state.recipe = new Recipe(id);

        try {
            // Get recipe data and parse ingredients
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            // Calculate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            // Render recipe
            clearLoader();

            // Check if state.likes not exist
            if (!state.likes) state.likes = new Likes();

            // Render recipe
            recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));

        } catch (e) {
            clearLoader();
            console.error('Error processing recipe!', e);
        }

    }
}

/**
 * Like controller.
 */
const controlLike = () => {
    if (!state.likes) state.likes = new Likes();

    const recipe = state.recipe;
    const currentID = recipe.id;

    // User has NOT liked current recipe
    if (!state.likes.isLiked(currentID)) {
        // Add like to the state
        const newLike = state.likes.addLike(
            currentID,
            recipe.title,
            recipe.author,
            recipe.img
        );

        // Toggle the like button
        likesView.toggleLikeBtn(true);

        // Add like to UI list
        likesView.renderLike(newLike);

        // User has liked current recipe.
    } else {
        // Remove like from the state
        state.likes.deleteLike(currentID);

        // Toggle the like button
        likesView.toggleLikeBtn(false);

        // Remove like from UI list
        likesView.deleteLike(currentID);
    }

    // Toggle like menu
    likesView.toggleLikeMenu(state.likes.getNumLikes())
}

/**
 * Load recipe if hash exists or changed.
 */
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe))

/**
 * Shop list controller.
 */
const controlList = () => {
    // Create a new list IF there is none yet
    if (!state.list) state.list = new List();

    // Add each ingredients to the list
    state.recipe.ingredients.forEach(ing => {
        state.list.addItem(ing.count, ing.unit, ing.ingredient);
    });

    // Render each ingredient
    state.list.items.forEach(e => {
        listView.renderItem(e);
    });
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
 * Event listener for
 * - increase/decrease servings;
 * - add to shop;
 * - like recipe
 */
elements.recipe.addEventListener('click', (e) => {

    // Decrease servings and ingredients
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {

        if (state.recipe.servings > 1) {
            state.recipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.recipe);
        }

        // Increase servings and ingredients
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {

        state.recipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.recipe);

        // Add to shop
    } else if (e.target.matches('.recipe__btn--add-shop, .recipe__btn--add-shop *')) {
        controlList();

        // Add recipe to favourite
    } else if (e.target.matches('.recipe__love, .recipe__love *')) {
        controlLike();
    }
})

/**
 * Event listener for delete/update shopping list item.
 */
elements.shoppingList.addEventListener('click', e => {

    // Handle the delete button
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {

        const id = e.target.closest('.shopping__item').dataset.itemid;

        // Delete from state
        state.list.deleteItem(id);

        // Delete from UI
        listView.deleteItem(id);

        // Handle the count update
    } else if (e.target.matches('.shopping__count-value')) {
        const id = e.target.closest('.shopping__item').dataset.itemid;
        const value = parseFloat(e.target.value);

        // Update state
        state.list.updateCount(id, value);
    }
})
