"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.name = void 0;
class name {
    constructor(container) {
        this.container = container;
    }
    render(item) {
        const li = document.createElement("li");
        const h4 = document.createElement("h4");
        h4.innerText = item.format();
        li.append(h4);
        const p = document.createElement("p");
        p.innerText = item.format();
        li.append(p);
    }
}
exports.name = name;
