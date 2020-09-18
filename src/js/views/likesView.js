import {limitRecipeTitle} from './searchView';
/**
 * Toggle like btn.
 * @param isLiked
 */
import {elements} from './base';

export const toggleLikeBtn = isLiked => {
    const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';

    document.querySelector('.recipe__love svg use').setAttribute('href', `img/icons.svg#${iconString}`);
}

/**
 * Show or hide like menu.
 * @param numLikes
 */
export const toggleLikeMenu = numLikes => {
    elements.likesMenu.style.visibility = numLikes ? 'visible' : 'hidden';
}
/**
 * Render new like.
 * @param like
 */
export const renderLike = like => {
    const markup = `
    <li>
        <a class="likes__link" href="#${like.id}">
            <figure class="likes__fig">
                <img src="${like.img}" alt="${like.title}">
            </figure>
            <div class="likes__data">
                <h4 class="likes__name">${limitRecipeTitle(like.title)}</h4>
                <p class="likes__author">${like.author}</p>
            </div>
        </a>
    </li>
    `;
    elements.likesList.insertAdjacentHTML('beforeend', markup);
}
