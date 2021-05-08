/**
 * Generates a random integer between a range.
 *
 * @export
 * @param {number} min - min integer
 * @param {number} max - max integer
 *
 * @returns {number}
 */
export function randomNumber(min, max) {
    return ~~(Math.random() * (max - min + 1)) + min;
}

/**
 * Generates a random resolution
 * between 200 and 600.
 *
 * @export
 * @returns {Array<number, number>}
 */
export function randomResolution() {
    return [randomNumber(200, 600), randomNumber(200, 600)];
}
