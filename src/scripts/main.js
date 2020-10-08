function init() {
    // #region *** Developer Style Toggles
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
    // #endregion

    // #region *** Hamburger Menu
    const navToggleElement = document.querySelector('header .nav-toggle');
    const navMenuElement = document.querySelector('header nav');
    if (navToggleElement && navMenuElement) {
        navToggleElement.addEventListener('click', () => {
            const navIsHidden =
                navMenuElement.attributes['aria-hidden'] && navMenuElement.attributes['aria-hidden'].value === 'true';
            navMenuElement.setAttribute('aria-hidden', !navIsHidden);
        });
    }
    // #endregion
}

window.onload = function () {
    init();
};
