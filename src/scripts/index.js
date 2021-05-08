import DomHandler from "./dom-handler.js";
import { randomResolution } from './utils.js';

window.onload = () => {
    window.domHandler = new DomHandler("cards-container");


    domHandler.add(60);
    domHandler.render();
};
