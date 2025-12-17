export default class ResponsiveSlider {
  constructor(selector) {
    this.slider = document.querySelector(selector);
    if (!this.slider) return;

    this.sliderList = this.slider.querySelector('.slider-list');
    this.items = this.slider.querySelectorAll('.slider-list__item');
    this.btnPrev = this.slider.querySelector('[data-slider-prevBtn]');
    this.btnNext = this.slider.querySelector('[data-slider-nextBtn]');

    this.currentIndex = 0;
    
    this.init();
  }

  init() {
    const resizeObserver = new ResizeObserver(() => {
      this.updateMetrics();
      this.goToSlide(this.currentIndex, false);
    });
    
    resizeObserver.observe(this.slider);

    this.addEventListeners();
    this.updateMetrics();
    this.goToSlide(this.currentIndex, false);
  }

  updateMetrics() {
    if (!this.items.length) return;
    const containerWidth = this.slider.getBoundingClientRect().width;
    this.itemWidth = this.items[0].offsetWidth;
    const style = window.getComputedStyle(this.sliderList);
    this.gap = parseFloat(style.gap) || 0;
    const stepWidth = this.itemWidth + this.gap;
    const visibleItems = Math.floor((containerWidth + this.gap) / stepWidth);
    this.maxIndex = Math.max(0, this.items.length - (visibleItems || 1));
    if (this.currentIndex > this.maxIndex) {
      this.currentIndex = this.maxIndex;
    }

    this.updateNavigationButtons();
  }

  goToSlide(index, animate = true) {
    this.currentIndex = Math.max(0, Math.min(index, this.maxIndex));
    const scrollStep = this.itemWidth + this.gap;
    const translateX = -(this.currentIndex * scrollStep);

    this.sliderList.style.transition = animate ? 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none';
    this.sliderList.style.transform = `translateX(${translateX}px)`;

    this.updateNavigationButtons();
  }

  addEventListeners() {
    this.btnPrev?.addEventListener('click', () => this.goToSlide(this.currentIndex - 1));
    this.btnNext?.addEventListener('click', () => this.goToSlide(this.currentIndex + 1));
  }

  updateNavigationButtons() {
    const isAtStart = this.currentIndex <= 0;
    const isAtEnd = this.currentIndex >= this.maxIndex;

    if (this.btnPrev) {
      this.btnPrev.disabled = isAtStart;
      this.btnPrev.style.opacity = isAtStart ? '0.3' : '1';
      this.btnPrev.style.cursor = isAtStart ? 'default' : 'pointer';
    }

    if (this.btnNext) {
      this.btnNext.disabled = isAtEnd;
      this.btnNext.style.opacity = isAtEnd ? '0.3' : '1';
      this.btnNext.style.cursor = isAtEnd ? 'default' : 'pointer';
    }
  }
}