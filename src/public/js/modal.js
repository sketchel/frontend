
// Edit profile modal

document.addEventListener('DOMContentLoaded', () => {
    const el = document.getElementById("showModal");    
    if (el) {
        el.addEventListener('click', () => {
            const target = el.dataset.target;
            const $target = document.getElementById(target);
            el.classList.toggle('is-active');
            $target.classList.toggle('is-active');
        })
    }  
})

document.addEventListener('DOMContentLoaded', () => {
    const el = document.getElementById("exitModal");  
    if (el) {
        el.addEventListener('click', () => {
            const target = el.dataset.target;
            const $target = document.getElementById(target);
            el.classList.toggle('is-active');
            $target.classList.toggle('is-active');
        })
    }  
})

// Following modal

document.addEventListener('DOMContentLoaded', () => {
    const el = document.getElementById("openFollowingModal");    
    el.addEventListener('click', () => {
        const target = el.dataset.target;
        const $target = document.getElementById(target);
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
    })
})

document.addEventListener('DOMContentLoaded', () => {
    const el = document.getElementById("exitFollowingModal");    
    el.addEventListener('click', () => {
        const target = el.dataset.target;
        const $target = document.getElementById(target);
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
    })
})

// Followers modal

document.addEventListener('DOMContentLoaded', () => {
    const el = document.getElementById("openFollowerModal");    
    el.addEventListener('click', () => {
        const target = el.dataset.target;
        const $target = document.getElementById(target);
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
    })
})

document.addEventListener('DOMContentLoaded', () => {
    const el = document.getElementById("exitFollowerModal");    
    el.addEventListener('click', () => {
        const target = el.dataset.target;
        const $target = document.getElementById(target);
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
    })
})