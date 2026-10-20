document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================================================
     2. mo switch akong pfp tungod ani 
     ========================================================================== */
  const realImg = document.getElementById('realImg');
  if (realImg) {
    const isLight = document.body.classList.contains('light');
    realImg.src = isLight ? 'images/mypfplight.jpg' : 'images/mypfpdark.jpg';
  }

  /* ==========================================================================
     3. moouse glow sa project cards
     ========================================================================== */
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach((card) => {
  
  });

  /* ==========================================================================
     4. Theme Switcher with wipe animation ni nga part
     ========================================================================== */
  const themeToggleBtn = document.getElementById('theme-toggle');
  let isWiping = false;

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', (e) => {
      if (isWiping) return;
      isWiping = true;

      const isLight = document.body.classList.contains('light');
      const targetIsLight = !isLight;

      const rect = themeToggleBtn.getBoundingClientRect();
      const x = e.clientX || rect.left + rect.width / 2;
      const y = e.clientY || rect.top + rect.height / 2;
      const radius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      const overlay = document.createElement('div');
      overlay.className = 'theme-wipe-overlay';
      overlay.style.backgroundColor = targetIsLight ? '#f8fafc' : '#09090b';
      overlay.style.willChange = 'clip-path, opacity';
      document.body.appendChild(overlay);

      const applyThemeChanges = () => {
        document.body.classList.toggle('light', targetIsLight);

        // pfp
        if (realImg) {
          realImg.src = targetIsLight ? 'images/mypfplight.jpg' : 'images/mypfpdark.jpg';
        }

        // lucide icon ni
        const icon = document.getElementById('theme-icon');
        if (icon) {
          icon.setAttribute('data-lucide', targetIsLight ? 'moon' : 'sun');
          if (window.lucide) lucide.createIcons();
        }
      };

      if (window.gsap) {
        gsap.fromTo(
          overlay,
          { clipPath: `circle(0px at ${x}px ${y}px)` },
          {
            clipPath: `circle(${radius}px at ${x}px ${y}px)`,
            duration: 0.85,
            ease: 'power2.inOut',
            onComplete: () => {
              applyThemeChanges();

              gsap.to(overlay, {
                opacity: 0,
                duration: 0.15,
                onComplete: () => {
                  overlay.remove();
                  isWiping = false;
                },
              });
            },
          }
        );
      } else {
        applyThemeChanges();
        overlay.remove();
        isWiping = false;
      }
    });
  }

  // lucode icon japon
  if (window.lucide) {
    lucide.createIcons();
  }
});

/* ==========================================================================
     5. PFP Video Hover part
     ========================================================================== */
  const pfpContainer = document.getElementById('pfpContainer');
  if (pfpContainer) {
    function getActiveVideo() {
      const isLight = document.body.classList.contains('light');
      return isLight
        ? pfpContainer.querySelector('.light-asset.pfp-video')
        : pfpContainer.querySelector('.dark-asset.pfp-video');
    }

    function playPfpVideo(e) {
      if (e.type === 'touchstart') e.preventDefault();
      pfpContainer.classList.add('active');

      const activeVideo = getActiveVideo();
      if (activeVideo) {
        activeVideo.currentTime = 0;
        activeVideo.play().catch(() => {});
      }
    }

    function stopPfpVideo() {
      pfpContainer.classList.remove('active');
      const videos = pfpContainer.querySelectorAll('.pfp-video');
      videos.forEach((vid) => {
        vid.pause();
        vid.currentTime = 0;
      });
    }

    // Desktop Mouse Hover
    pfpContainer.addEventListener('mouseenter', playPfpVideo);
    pfpContainer.addEventListener('mouseleave', stopPfpVideo);

    // Mobile Touch & Hold
    pfpContainer.addEventListener('touchstart', playPfpVideo, { passive: false });
    pfpContainer.addEventListener('touchend', stopPfpVideo);
    pfpContainer.addEventListener('touchcancel', stopPfpVideo);
  }

 