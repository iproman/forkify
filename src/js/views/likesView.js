/**
 * Toggle like btn.
 * @param isLiked
 */
export const toggleLikeBtn = isLiked => {
    const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';

    document.querySelector('.recipe__love svg use').setAttribute('href', `img/icons.svg#${iconString}`);
}
