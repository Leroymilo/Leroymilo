// ==UserScript==
// @name         Tumblr post link remover
// @namespace
// @version      2025-11-26
// @description  Removes the event handler that causes the whole area of posts to open them on click
// @author       Leroymilo
// @match        https://www.tumblr.com/dashboard/*
// @icon         https://assets.tumblr.com/pop/manifest/favicon-cfddd25f.svg
// @grant        none
// ==/UserScript==


console.log("post link remover running!");

const react_props_key = Object.keys(document.getElementsByTagName("div").item(1)).filter((key) => {return key.startsWith("__reactProps")})[0];

const dash = document.getElementsByClassName("zAlrA").item(0);

const callback = (mutationList, observer) => {
    let culprits = dash.querySelectorAll(".eA_DC.uaaSl.y3qwY, .u2tXn.fa1Zw.fNoJp, .qYXF9.aXLOG.ouMsp");
    culprits.forEach((elt) => {
        if (!elt.hasOwnProperty(react_props_key)) return;
        if (elt[react_props_key].onClick == null) return;
        elt[react_props_key].onClick = null;
        // console.log("cleaned", elt, elt[react_props_key].onClick);
        // elt.classList.add("cleaned");  // To avoid cleaning a post multiple times
        //But the onClick property is set after this again somehow?

        //Tried to monitor the onClick property to keep it null, but doesn't seem to work...
        // Reflect.defineProperty(elt[react_props_key], "onClick", {
        //     set: function(value) {
        //         console.log("onClick of ", elt, " was set with ", value);
        //         this.onClick = null;
        //     }
        // })
    })
}
const observer = new MutationObserver(callback);

observer.observe(document.body, { attributes: false, childList: true, subtree: true });
