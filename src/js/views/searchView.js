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
                        <h4 class="results__name">${recipe.title}</h4>
                        <p class="results__author">${recipe.publisher}</p>
                    </div>
                </a>
            </li>
         `;
    elements.searchResultList.insertAdjacentHTML('beforeend', markUp);
};

/**
 * Render recipes.
 * @param recipes
 * @return {*}
 */
export const renderSearchResults = recipes => recipes.forEach(renderRecipe);
