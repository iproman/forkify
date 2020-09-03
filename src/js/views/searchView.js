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
 *
 * @param page
 * @param type
 * @return {string}
 */
const createButton = (page, type) => `
        <button class="btn-inline results__btn--${type}" 
            data-goto="${type === 'prev' ? page - 1 : page + 1}">
            <svg class="search__icon">
                <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
            </svg>
            <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        </button>`;


/**
 * Render pagination buttons.
 * @param page
 * @param numResults
 * @param resPerPage
 */
const renderButtons = (page, numResults, resPerPage) => {

    const pages = Math.ceil(numResults / resPerPage);
    let button;
    if (page === 1 && pages > 1) {
        // Show next btn
        button = createButton(page, 'next');
    } else if (page < pages) {
        // Show both buttons
        button = `${createButton(page, 'prev')}${createButton(page, 'next')}`;
    } else if (page === pages && pages > 1) {
        // Show prev btn
        button = createButton(page, 'prev');
    }
    elements.pagination.innerHTML = button;
}

/**
 * Render search results with pagination.
 * @param recipes
 * @param page
 * @param resPerPage
 */
export const renderSearchResults = (recipes, page = 1, resPerPage = 10) => {
    // render results of current page
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    recipes.slice(start, end).forEach(renderRecipe);

    // render pagination
    renderButtons(page, recipes.length, resPerPage)
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
