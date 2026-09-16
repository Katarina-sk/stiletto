document.addEventListener('contextmenu', (event) => {
  event.preventDefault();
});

document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
      document.body.classList.toggle('nav-open', isOpen);
    });

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('nav-open');
      });
    });
  }

  function enterFullscreen(el) {
    const request = el.requestFullscreen
      || el.webkitRequestFullscreen
      || el.webkitEnterFullscreen;

    if (request) {
      request.call(el);
    }
  }

  function isMobilePhone() {
    const ua = navigator.userAgent || '';
    const isPhoneUA = /iPhone|Android/i.test(ua) && !/iPad|Tablet/i.test(ua);
    const isCoarsePointer = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
    return isPhoneUA && isCoarsePointer;
  }

  if (window.Vimeo) {
    document.querySelectorAll('.video-item iframe').forEach((iframe) => {
      const player = new Vimeo.Player(iframe);
      const videoItem = iframe.closest('.video-item');

      player.on('play', () => {
        if (isMobilePhone() && videoItem && !document.fullscreenElement) {
          enterFullscreen(videoItem);
        }
      });
    });
  }
});
