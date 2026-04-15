/* =============================================
   main.js — 互動效果與動畫邏輯
   不需要修改此檔案
============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ===== 1. 導覽列：捲動時加陰影 ===== */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ===== 2. 漢堡選單（手機） ===== */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger?.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // 點選手機選單連結後關閉
  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger?.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ===== 3. 捲動進場動畫 (IntersectionObserver) ===== */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
  });

  /* ===== 4. 技能條動畫（履歷頁） ===== */
  const barObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const fills = entry.target.querySelectorAll('.skill-bar-fill');
          fills.forEach(fill => {
            const target = fill.getAttribute('data-width') || 0;
            fill.style.width = target + '%';
          });
          barObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  const skillBarsSection = document.querySelector('.skill-bars');
  if (skillBarsSection) barObserver.observe(skillBarsSection);

  /* ===== 5. 作品集 Lightbox ===== */
  const lightbox      = document.getElementById('lightbox');
  const lightboxImg   = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxDesc  = document.getElementById('lightboxDesc');
  const lightboxClose = document.getElementById('lightboxClose');

  function openLightbox(imgSrc, title, desc) {
    if (!lightbox) return;
    lightboxImg.src = imgSrc;
    lightboxTitle.textContent = title;
    lightboxDesc.textContent  = desc;
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => { lightboxImg.src = ''; }, 350);
  }

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const img   = item.querySelector('img');
      const title = item.getAttribute('data-title') || '';
      const desc  = item.getAttribute('data-desc')  || '';
      if (img && img.complete && img.naturalWidth > 0) {
        openLightbox(img.src, title, desc);
      } else {
        // 圖片不存在時只顯示文字
        openLightbox('', title, desc);
        lightboxImg.style.display = 'none';
      }
    });
  });

  lightboxClose?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  /* ===== 6. 平滑捲動（補強 hash 連結） ===== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    });
  });

  /* ===== 7. 導覽列 active 高亮 ===== */
  const sections = document.querySelectorAll('section[id]');
  const navAs    = document.querySelectorAll('.nav-links a[href^="#"]');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navAs.forEach(a => {
            a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );
  sections.forEach(s => sectionObserver.observe(s));

});