import uniqid from 'uniqid';

export default class List {

    constructor() {
        this.items = [];
    }

    /**
     * Add new item.
     * @param count
     * @param unit
     * @param ingredient
     * @return {{unit: *, ingredient: *, count: *, id: *}}
     */
    addItem(count, unit, ingredient) {
        const item = {
            id: uniqid(),
            count,
            unit,
            ingredient
        }
        this.items.push(item);
        return item;
    }

    /**
     * Delete item.
     * @param id
     */
    deleteItem(id) {
        const index = this.items.findIndex(el => el.id === id);
        this.items.splice(index, 1);
    }

    /**
     * Update item count.
     * @param id
     * @param newCount
     */
    updateCount(id, newCount) {
        this.items.find(el => el.id === id).count = newCount;
    }
}
