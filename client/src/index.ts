// console.log('Hello, world 👋');

function updateButtons(elems, type) {
    if(type == 'light') elems.forEach(elem => elem.children[0].innerText = 'dark_mode');
    else if(type == 'dark') elems.forEach(elem => elem.children[0].innerText = 'light_mode');
}

[...document.getElementsByClassName('theme-toggle')].forEach(elem => {
    elem.addEventListener('click', () => {
        switch (document.body.getAttribute('data-type')) {
            case 'dark':
                document.body.setAttribute('data-type', 'light');
                localStorage.setItem('theme', 'light');
                updateButtons([...document.getElementsByClassName('theme-toggle')], 'light');
                break;
            default:
                document.body.setAttribute('data-type', 'dark');
                localStorage.setItem('theme', 'dark');
                updateButtons([...document.getElementsByClassName('theme-toggle')], 'dark');
        }
    })
})

window.addEventListener('load', () => {
    let theme = localStorage.getItem('theme');
    if(theme != undefined && theme != null && theme === 'light' || theme === 'dark') {
        document.body.setAttribute('data-type', theme);
        updateButtons([...document.getElementsByClassName('theme-toggle')], theme);
    }
})