'use strict';

function changeColor(type) {
    localStorage.setItem('cssAcessibilidade', type);
    // Carrega o estilo selecionado
    loadStyle();
}

function onLoad() {
    loadStyle();
}

function loadStyle() {
    // Verifica se o cookie já existe
    let cookie = getStyleValue('cssAcessibilidade');
    let style = document.getElementById('colorsCSS');
    console.log("Valor do cookie: " + cookie);
    if (cookie != null && style != null) {
        // Se existir, carrega a página com o style do cookie
        style.innerHTML = '<link rel="stylesheet" href="css/colors/' + cookie + '.css">'
    } else {
        // Do contrário, carrega por padrão o default css
        let head = document.getElementsByTagName('HEAD')[0];
        let link = document.createElement('link');
        link.id = 'colorsCSS';
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = 'css/colors/default.css';
        head.appendChild(link);
    }
}

// Manter a seleção por cookies.
// https://www.w3schools.com/js/js_cookies.asp
function getStyleValue(wantedKey) {
    return localStorage.getItem(wantedKey);
}

async function menuAcessibilidade() {
    const icon = document.getElementById('menu-acessibilidade');
    const status = icon.style.getPropertyValue('visibility');
    const value = status != 'visible' ? 'visible' : 'hidden';

    if (value == 'visible') {
        playAnimation('menu-acessibilidade', 'play-popup');
    } else {
        playAnimation('menu-acessibilidade', 'play-fadeout');
        await sleep(900);  // Valor deve ser alterado no CSS também
    }

    icon.style.visibility = value;
}

function sleep(ms) {
    return new Promise(resolver => setTimeout(resolver, ms));
};

function playAnimation(elementId, name) {
    const elem = document.getElementById(elementId);
    elem.style.animationPlayState = 'running';
    elem.classList.remove('play-popup');
    elem.classList.remove('play-fadeout');
    void elem.offsetWidth;
    elem.classList.add(name);
}

function playFadeout() {
    const elem = document.getElementById('menu-acessibilidade');
    elem.style.animationPlayState = 'running';
    void elem.offsetWidth;
    elem.classList.add('play-fadeout');
}

