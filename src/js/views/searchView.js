import {elements} from './base';

/**
 * Get value from search input.
 * @return {*}
 */
export const getSearchInput = () => elements.searchInput.value;

/**
 * Render single recipe.
 * @param recipe
 */
const renderRecipe = recipe => {
    let markUp = `
            <li>
                <a class="results__link results__link--active" href="${recipe.recipe_id}">
                    <figure class="results__fig">
                        <img src="${recipe.image_url}" alt="${recipe.title}">
                    </figure>
                    <div class="results__data">
                        <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                        <p class="results__author">${recipe.publisher}</p>
                    </div>
                </a>
            </li>
         `;
    elements.searchResultList.insertAdjacentHTML('beforeend', markUp);
};

/**
 * @param recipes
 * @param recipes
 */
export const renderSearchResults = recipes => {
    recipes.forEach(renderRecipe);
};

/**
 * Clear search input.
 */
export const clearInput = () => {
    elements.searchInput.value = '';
};

/**
 * Clear results.
 */
export const clearResults = () => {
    elements.searchResultList.innerHTML = '';
}

/**
 * Limit recipe title.
 * @param title
 * @param limit
 * @return {string|*}
 */
const limitRecipeTitle = (title, limit = 17) => {
    if (title.length > limit) {
        const newTitle = [];
        title.split(' ').reduce((prev, cur) => {
            // prev = 15;
            if (prev + cur.length <= limit) {
                newTitle.push(cur);
            }

            return prev + cur.length;
        }, 0);

        return `${newTitle.join(' ')} ...`;
    }

    return title;
}
