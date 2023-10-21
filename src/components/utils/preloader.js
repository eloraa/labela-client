export default class Preloader {
  constructor({ element }) {
    this.selector = element;
    this.isAnimating = false;
    this.isHidden = false;
    this.timeline = [];
    // overlay (SVG path element)
    this.overlayPath = this.selector.querySelector('.overlay__path');
    this.layer = this.selector.querySelector('.layer');
  }

  animate(timeline) {
    if (!timeline) return;
    let currentTime = 0;

    timeline.forEach((step, index) => {
      this.timeline.push(
        setTimeout(() => {
          this.overlayPath.setAttribute('d', step.attribute);
          this.overlayPath.style.transition = `d ${step.duration}ms ease`;

          if (step === timeline[timeline.length - 1]) {
            this.isAnimating = false;
          }
        }, currentTime)
      );

      if (step.duration === 0 && index > 0) {
        currentTime += timeline[index - 2].duration;
      }
      currentTime += step.duration;
    });
  }

  // opens the menu
  open() {
    if (this.isAnimating) return;
    if (this.isHidden) {
      this.isAnimating = true;
      this.shpw();
      // Set the initial attribute
      this.overlayPath.setAttribute('d', 'M 0 100 V 100 Q 50 100 100 100 V 100 z');
      if (this.isHidden) {
        this.selector.removeAttribute('style');
        this.isHidden = false;
      }

      // Define the animation
      const timeline = [
        { duration: 800, ease: 'power4.in', attribute: 'M 0 100 V 50 Q 50 0 100 50 V 100 z' },
        { duration: 300, ease: 'power2', attribute: 'M 0 100 V 0 Q 50 0 100 0 V 100 z' },
        { duration: 0, ease: 'power2', attribute: 'M 0 0 V 100 Q 50 100 100 100 V 0 z' },
      ];
      this.animate(timeline);
    }
  }

  hide() {
    if (this.isTransitioning) return;
    this.isTransitioning = true;

    this.layer.style.transition = 'opacity 200ms ease';
    this.layer.style.opacity = 0;
    setTimeout(() => {
      this.overlayPath.setAttribute('d', 'M 0 0 V 100 Q 50 100 100 100 V 0 z')
      this.selector.style.opacity = '0';
      this.selector.style.display = 'none';
      this.selector.style.pointerEvents = 'none';
      this.selector.style.visibility = 'hidden';
      document.body.removeAttribute('style');
      this.isHidden = true;
      this.isTransitioning = false;
    }, 1000);
  }

  shpw() {
    if (this.isTransitioning) return;
    this.layer.style.transition = 'opacity 200ms ease';
    this.layer.style.opacity = 1;
    this.selector.removeAttribute('style');
    document.body.style.overflow = 'hidden';
    this.isHidden = false;
    this.isTransitioning = false;
  }

  // opens the menu
  close() {
    if (this.isAnimating) {
      this?.timeline.map(t => clearTimeout(t))
      this.isAnimating = false
    }
    this.isAnimating = true;

    // Set the initial attribute
    this.overlayPath.setAttribute('d', 'M 0 0 V 100 Q 50 100 100 100 V 0 z');
    this.overlayPath.addEventListener('transitionend', this.hide.bind(this), { once: true });
    this.overlayPath.addEventListener('webkittransitionend', this.hide.bind(this), { once: true });

    // Define the animation
    const timeline = [
      { duration: 0, ease: 'power2', attribute: 'M 0 0 V 100 Q 50 100 100 100 V 0 z' },
      { duration: 300, ease: 'power2.in', attribute: 'M 0 0 V 50 Q 50 0 100 50 V 0 z' },
      { duration: 800, ease: 'power4', attribute: 'M 0 0 V 0 Q 50 0 100 0 V 0 z' }
    ];
    this.animate(timeline);
  }
}
