import { randomResolution } from './utils.js';

/**
 * Handles DOM items grid.
 *
 * @export
 * @class
 */
export default class {

    /**
     * Constructor.
     *
     * @param {string} rootNodeId - id from parent grid
     */
    constructor(rootNodeId) {
        this.rootNode = document.getElementById(rootNodeId);
        this.items = []; // current grid items (may be a little Virtual DOM, but as list)
    }

    /**
     * Triggers grid re-render.
     */
    render() {
        let fragment = document.createDocumentFragment();

        for (let item of this.items)
            fragment.appendChild(item);

        // appends empty li to end for aspect ratio fix
        fragment.appendChild(this._createItem(true));

        this.rootNode.textContent = ""; // clears grid content
        this.rootNode.appendChild(fragment);
    }

    /**
     * Adds 'n' random items to grid.
     *
     * @param {number} count
     */
    add(count) {
        while (count-- > 0) {
            this.items.push(this._createItem());
        }
    }

    /**
     * Removes 'n' random items to grid.
     *
     * @param {number} count
     */
    remove(count) {
        this.items = this.items.splice(0, this.items.length - count);
    }

    /**
     * Removes all items from grid.
     */
    clear() {
        this.items = [this._noItemsBanner()];
    }

    /**
     * Creates a new HTMLElement (li) for grid.
     *
     * @param {boolean} empty - whether li must be empty
     *
     * @returns {HTMLLIElement}
     */
    _createItem(empty) {
        let item = document.createElement("li");

        if (!empty) {
            const [width, height] = randomResolution();

            item.className = "item card depth-2";

            let img = document.createElement("img");
            img.className = "card-image";
            img.src = `https://picsum.photos/${width}/${height}`;

            item.appendChild(img);
        }

        return item;
    }

    /**
     * Creates default HTMLElement (li)
     * for grid when no elements are rendered.
     *
     * @returns {HTMLLIElement}
     */
    _noItemsBanner() {
        let item = document.createElement("li");

        item.className = "item card empty";

        let text = document.createElement("h1");
        img.textContent = "No Items";

        item.appendChild(img);

        return item;
    }
}
