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
        return like;
    }

    /**
     * Delete recipe from favorite.
     * @param id
     */
    deleteLike(id) {
        let elId = this.likes.findIndex(el => el.id === id);
        this.likes.splice(elId, 1);
    }
}
