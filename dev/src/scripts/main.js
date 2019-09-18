function component() { // eslint-disable-line no-unused-vars
    const element = document.createElement('div');

    element.innerHTML = ['Hello', 'webpack',].join(' ');

    return element;
}

function init() {
    document.getElementById('copyright-year').innerText = new Date().getFullYear();


    const devToggles = {
        bg: {
            element: document.querySelector('.dev-toggle[name="bg"]'),
            callback: function () {
                document.querySelector('html').classList.toggle('dev-bg');
            },
        },
        border: {
            element: document.querySelector('.dev-toggle[name="border"]'),
            callback: function () {
                document.querySelector('html').classList.toggle('dev-border');
            },
        },
    };
    
    for (const toggleName in devToggles) {
        const toggle = devToggles[toggleName];
        if (toggle.element) {
            toggle.element.addEventListener('click', toggle.callback);
        }
    }
}

window.onload = function() {
    init();
};

// document.body.appendChild(component());
