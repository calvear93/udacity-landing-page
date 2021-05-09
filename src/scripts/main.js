var topButton;

window.onload = () => {
    // initializes grid DOM handler and
    // attaches it to global window element
    window.domHandler = new DomHandler("cards-container", "selected-cards-container");

    // begins with random cards count
    domHandler.add(randomNumber(10, 20));
    domHandler.render();
};

window.onscroll = () => {
    // gets top button DOM element
    topButton = topButton ?? document.getElementById('top-button');

    // validates scroll position
    if (window.scrollX === 0 && window.scrollY)
        topButton.classList.remove("hide");
    else
        topButton.classList.add("hide");
};

/**
 * Retrieves toolbar input value as number.
 *
 * @returns {number | NaN}
 */
function getCountInputValue() {
    const input = document.getElementById("count-input");

    return +input.value;
}

/**
 * Adds n items to grid.
 */
function addItems() {
    const count = getCountInputValue();

    if (!count)
        return;

    domHandler.add(count);
    domHandler.render();
}

/**
 * Removes n items to grid.
 */
function removeItems() {
    const count = getCountInputValue();

    if (!count)
        return;

    domHandler.remove(count);
    domHandler.render();
}

/**
 * Removes all items from grid.
 */
function clearItems() {
    domHandler.clear();
    domHandler.render();
}

/**
 * Scrolls to top of the page.
 */
function toTop() {
    window.scrollTo(0, 0);
}

/**
 * Generates a random integer between a range.
 *
 * @param {number} min - min integer
 * @param {number} max - max integer
 *
 * @returns {number}
 */
function randomNumber(min, max) {
    return ~~(Math.random() * (max - min + 1)) + min;
}

/**
 * Generates a random resolution
 * between 200 and 600.
 *
 * @returns {Array<number, number>}
 */
function randomResolution() {
    return [randomNumber(200, 600), randomNumber(200, 600)];
}

/**
 * Handles DOM items grid.
 *
 * @class
 */
class DomHandler {

    /**
     * Constructor.
     *
     * @param {string} rootNodeId - id from parent grid
     * @param {string} selectedRootNodeId - id from parent selected grid
     */
    constructor(rootNodeId, selectedRootNodeId) {
        this.rootNode = document.getElementById(rootNodeId);
        this.selectedRootNode = document.getElementById(selectedRootNodeId);
        this.items = []; // current grid items (may be a little Virtual DOM, but as list)
        this.selected = {}; // selected items
        this.index = {}; // for eases item access by it's id
        this.isEmpty = true; // empty element flag
        this.incrementalId = 0;
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
     * Triggers selected grid re-render.
     */
    renderSelected() {
        if (this.isEmpty)
            this.clear();

        let fragment = document.createDocumentFragment();

        for (let item of Object.values(this.selected))
            fragment.appendChild(item);

        // appends empty li to end for aspect ratio fix
        !this.isEmpty && fragment.appendChild(this._createItem(true));

        this.selectedRootNode.textContent = ""; // clears grid content
        this.selectedRootNode.appendChild(fragment);
    }

    /**
     * Adds 'n' random items to grid.
     *
     * @param {number} count
     */
    add(count) {
        while (count-- > 0) {
            const item = this._createItem();

            this.index = {
                ...this.index,
                [item.id]: item
            };
            this.items.push(item);
        }
    }

    /**
     * Removes selected all items from grid.
     */
    clear() {
        this.selected = { _: this._noItemsBanner() };
        this.isEmpty = true;
    }

    /**
     * Toggles item selection state.
     *
     * @param {number} id item id
     */
    _select(id) {
        const { [id]: item, ...rest } = this.selected;

        if (item) {
            this.selected = rest;
            this.index[id].classList.remove("selected");

            if (Object.keys(this.selected).length === 0)
                this.isEmpty = true;
        } else {
            if (this.isEmpty)
                this.selected = {};

            this.selected[id] = this.index[id].cloneNode(true);
            this.selected[id].id = `${id}-selected`;
            this.selected[id].classList.remove("hoverable");

            this.index[id].classList.add("selected");
            this.isEmpty = false;
        }

        this.renderSelected();
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

            item.className = "item card depth-2 hoverable cursor";
            item.id = ++this.incrementalId;

            item.onclick = () => this._select(item.id);

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
        text.textContent = "No Items";

        item.appendChild(text);

        return item;
    }
}
