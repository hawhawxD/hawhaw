const body = document.querySelector('body');
const main = document.querySelector('main');


function toggleView() {
    body.classList.toggle('thumbnail-view');
}


addEventListener("DOMContentLoaded", (event) => {
    main.style.display = "flex";
})