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