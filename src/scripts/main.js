import DomHandler from "./dom-handler.js";
import { randomNumber } from './utils.js';

var topButton;

window.onload = () => {
    // initializes grid DOM handler and
    // attaches it to global window element
    window.domHandler = new DomHandler("cards-container");

    // begins with random cards count
    domHandler.add(randomNumber(5, 20));
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
