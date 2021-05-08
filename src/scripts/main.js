import DomHandler from "./dom-handler.js";
import { randomNumber } from './utils.js';

window.onload = () => {
    // initializes grid DOM handler and
    // attaches it to global window element
    window.domHandler = new DomHandler("cards-container");

    // begins with random cards count
    domHandler.add(randomNumber(5, 20));
    domHandler.render();
};
