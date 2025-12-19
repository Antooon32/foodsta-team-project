import './js/burger';
import './js/modal';
import ResponsiveSlider from './js/slider';

const initSlider = () => {
    if (document.querySelector('.slider')) {
        new ResponsiveSlider('.slider');
    }
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSlider);
} else {
    initSlider();
}

(() => {
    const preloader = document.querySelector('[data-preloader]');
    if (!preloader) return;

    const MIN_VISIBLE_TIME = 600;
    const startTime = Date.now();

    function hidePreloader() {
        const elapsed = Date.now() - startTime;
        const delay = Math.max(MIN_VISIBLE_TIME - elapsed, 0);

        setTimeout(() => {
            preloader.classList.add('is-hidden');

            preloader.addEventListener(
                'transitionend',
                () => preloader.remove(),
                { once: true }
            );
        }, delay);
    }

    if (document.readyState === 'complete') {
        hidePreloader();
    } else {
        window.addEventListener('load', hidePreloader, { once: true });
    }
})();
