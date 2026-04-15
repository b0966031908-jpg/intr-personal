/* =============================================
   data.js — 個人資料設定
   ✏️ 在這裡填入你的資訊，網頁會自動更新
============================================= */

const PORTFOLIO_DATA = {

  /* ===== 基本資料 ===== */
  name: 'CHENG-CHIH-YANG',           // ✏️ 改成你的名字
  role: '求職方向:',    // ✏️ 例如：前端工程師 / 設計師
  email: 'b0966031908@email.com',    // ✏️ 你的 Email
  location: '台灣-彰化縣-溪湖鎮中山里銀錠路762號',// ✏️ 居住地

  /* ===== 打字機輪播文字 ===== */
  // 英雄區會自動輪播這些文字
  typewriterTexts: [
    '靜宜大學資訊管理學系',   // ✏️ 例如：前端開發者
    '第15屆領頭羊',   // ✏️ 例如：UI 設計愛好者
    '靜宜崇德蔬食社社員',   // ✏️ 例如：終身學習者
  ],

  /* ===== 社群連結 ===== */
  social: {
    github:    'https://github.com/b0966031908-jpg',     // ✏️ 改成你的
    Gmail:  'https://mail.google.com/mail/u/0/#inbox?compose=DmwnWrRnZFTJbJGhKsVNqVQMJvzmFrcjBDwnPVNCnmwVGpSKmHSqRcQGVpSHmFmhcQlKcCMFxDkg', // ✏️ 改成你的
    instagram: 'https://www.instagram.com/change.0317/',   // ✏️ 改成你的（不需要可刪除）
  },

};

/* ===== 自動套用資料到頁面 ===== */
document.addEventListener('DOMContentLoaded', () => {
  // 套用 Logo 名字
  document.querySelectorAll('.nav-logo').forEach(el => {
    el.textContent = PORTFOLIO_DATA.name;
  });

  // 啟動打字機
  const typewriterEl = document.getElementById('typewriter');
  if (typewriterEl) {
    startTypewriter(typewriterEl, PORTFOLIO_DATA.typewriterTexts);
  }
});

/* 打字機效果函式 */
function startTypewriter(el, texts) {
  let tIdx = 0, cIdx = 0, deleting = false;
  const speed = { type: 90, delete: 50, pause: 1800 };

  function tick() {
    const current = texts[tIdx];
    if (deleting) {
      el.textContent = current.slice(0, --cIdx);
      if (cIdx === 0) {
        deleting = false;
        tIdx = (tIdx + 1) % texts.length;
        setTimeout(tick, 400);
      } else {
        setTimeout(tick, speed.delete);
      }
    } else {
      el.textContent = current.slice(0, ++cIdx);
      if (cIdx === current.length) {
        deleting = true;
        setTimeout(tick, speed.pause);
      } else {
        setTimeout(tick, speed.type);
      }
    }
  }
  setTimeout(tick, 600);
}