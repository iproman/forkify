export default class Likes {
    constructor() {
        this.likes = [];
    }

    /**
     * Add recipe to favourite.
     *
     * @param id
     * @param title
     * @param author
     * @param img
     * @return {{img: *, author: *, id: *, title: *}}
     */
    addLike(id, title, author, img) {
        const like = {
            id,
            title,
            author,
            img
        };

        this.likes.push(like);

        // Persist data in localstorage
        this.persistData();

        return like;
    }

    /**
     * Delete recipe from favorite.
     * @param id
     */
    deleteLike(id) {
        let elId = this.likes.findIndex(el => el.id === id);
        this.likes.splice(elId, 1);

        // Persist data in localstorage
        this.persistData();
    }

    /**
     * Check if recipe is liked.
     * @param id
     * @return {boolean}
     */
    isLiked(id) {
        return this.likes
            .findIndex(el => el.id === id) !== -1;
    }

    /**
     * Total number of likes.
     * @return {number}
     */
    getNumLikes() {
        return this.likes.length;
    }

    /**
     * Persist liked recipes in localstorage.
     */
    persistData() {
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }
}
