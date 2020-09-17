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
