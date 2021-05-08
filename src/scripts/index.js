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
