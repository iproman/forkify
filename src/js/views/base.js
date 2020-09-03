/**
 * All selectors.
 */
export const elements = {
    searchResult: document.querySelector('.results'),
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchResultList: document.querySelector('.results__list'),
    pagination: document.querySelector('.results__pages')
};

/**
 * Element strings.
 */
export const elementStrings = {
    loader: 'loader'
}

/**
 * Show loader.
 */
export const loader = parent => {
    const loader = `
        <div class="${elementStrings.loader}">
            <svg>
                <use href="./img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
};

/**
 * Remove loader.
 */
export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader) {
        loader.remove();
    }
}
