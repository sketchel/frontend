
function openFollowerModal() {

}

document.addEventListener('DOMContentLoaded', () => {
    const el = document.getElementById("showModal");    
    el.addEventListener('click', () => {
        const target = el.dataset.target;
        const $target = document.getElementById(target);
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
    })
})

document.addEventListener('DOMContentLoaded', () => {
    const el = document.getElementById("exitModal");    
    el.addEventListener('click', () => {
        const target = el.dataset.target;
        const $target = document.getElementById(target);
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
    })
})
