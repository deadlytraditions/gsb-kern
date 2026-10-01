/*
 * Progressive enhancement for the KERN page shell. Without JS the navigation is fully expanded.
 */
(() => {
    'use strict';

    document.documentElement.classList.add('gk-js');

    // Main navigation: collapsible behind the menu button on small screens
    const toggle = document.querySelector('.gk-nav-toggle');
    const nav = document.getElementById('gk-mainnav');
    if (toggle && nav) {
        const setOpen = (open) => {
            toggle.setAttribute('aria-expanded', String(open));
            nav.classList.toggle('is-open', open);
        };
        toggle.hidden = false;
        toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && nav.classList.contains('is-open')) {
                setOpen(false);
                toggle.focus();
            }
        });
    }

    // Section navigation: open on large screens, collapsed (but reachable) on small ones
    const largeScreen = window.matchMedia('(min-width: 992px)');
    document.querySelectorAll('.gk-sectionnav__details').forEach((details) => {
        const sync = () => {
            details.open = largeScreen.matches;
        };
        sync();
        largeScreen.addEventListener('change', sync);
    });

    // Print: closed accordions and the collapsed sections would be missing on paper
    let closedForScreen = [];
    window.addEventListener('beforeprint', () => {
        closedForScreen = [...document.querySelectorAll('.gk-main details:not([open])')];
        closedForScreen.forEach((details) => {
            details.open = true;
        });
    });
    window.addEventListener('afterprint', () => {
        closedForScreen.forEach((details) => {
            details.open = false;
        });
        closedForScreen = [];
    });
})();
