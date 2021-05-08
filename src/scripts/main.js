import DomHandler from "./dom-handler.js";
import { randomResolution } from './utils.js';

window.onload = () => {
    // initializes grid DOM handler and
    // attaches it to global window element
    window.domHandler = new DomHandler("cards-container");
};
