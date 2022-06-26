

let isDesktop = null;

function onResize() {
    var queryMatch = window.matchMedia("only screen and (min-width: 1366px)").matches;
    if (queryMatch !== isDesktop) {
        isDesktop = queryMatch;
        reorderAlternatingElements(queryMatch);
    }
}

function reorderAlternatingElements(isDesktop) {
    const parents = document.querySelectorAll('.workshop-section-content-wrapper:nth-of-type(even)');
    for (let i = 0; i < parents.length; i++)
    {
        let parent = parents[i];
        const boxes = parent.children;
        const textBox = Array.prototype.find.call(boxes, (el, j, arr) => {
            const isAlternate = $(el).hasClass('alternate');
            return isDesktop && !isAlternate // Selects video box if on desktop
                || !isDesktop && isAlternate; // Selects text box if on mobile
        });
        const videoBox = Array.prototype.find.call(boxes, (el, j, arr) => { 
            const isAlternate = $(el).hasClass('alternate');
            return isDesktop && isAlternate // Selects text box if on desktop
            || !isDesktop && !isAlternate; // Selects video box if on mobile
        });
        $(boxes).remove();

        console.log("text: ", textBox, "video:", videoBox);

        parent.append(videoBox, textBox);
    }
}

function innit() {
    $(window).resize(function () {
        onResize();
    });
    onResize();
}

$(document).ready(innit);
