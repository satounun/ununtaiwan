const buttons = document.querySelectorAll(".openModal");
const modals = document.querySelectorAll(".modal");
const closes = document.querySelectorAll(".closeModal");

// ボタンにクリックイベントを一気に設定
buttons.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    modals[i].style.display = "block";
  });
});

// ×アイコンに閉じる処理を
closes.forEach((span, i) => {
  span.addEventListener("click", () => {
    const modal = modals[i];
    modal.style.animation = "fadeOut 0.5s forwards";
    modal.addEventListener("animationend", function handler() {
      modal.style.display = "none";
      modal.style.animation = ""; // アニメーションをリセット
      modal.removeEventListener("animationend", handler); // 一度だけ実行
    });
  });
});

// モーダル外クリックで閉じる (共通)
window.addEventListener("click", (event) => {
  modals.forEach(modal => {
    if (event.target === modal) {
      modal.style.animation = "fadeOut 0.5s forwards";
      modal.addEventListener("animationend", function handler() {
        modal.style.display = "none";
        modal.style.animation = "";
        modal.removeEventListener("animationend", handler);
      });
    }
  });
});
// ドロワー
document.addEventListener('DOMContentLoaded', function () {
  const openNav = document.getElementById('open_nav');
  const nav = document.getElementById('nav');
  const closeNav = document.getElementById('batu');
  const close_nav = document.getElementsByClassName('close');

  openNav.addEventListener('click', function () {
    nav.classList.add('show');
    nav.classList.remove('show_reverse');
  });

  closeNav.addEventListener('click', function () {
    nav.classList.remove('show_reverse');
    nav.classList.add('show_reverse');
  });

  Array.from(close_nav).forEach(function (el) {
    el.addEventListener('click', function () {
      nav.classList.remove('show');
      nav.classList.add('show_reverse');
    });
  });

  window.addEventListener('scroll', function () {
    if (nav.classList.contains('show')) {
      nav.classList.remove('show');
      nav.classList.add('show_reverse');
    }
  });
});

//loading
document.addEventListener('DOMContentLoaded', function() {
    const loading = document.getElementById('loading');
    const content = document.getElementById('wrapper')

    function showLoading() {
        loading.style.display = 'flex';
        content.classList.remove('show_body');
    }

    function hideLoading() {
        loading.style.display = 'none';
        content.classList.add('show_body');
    }

    showLoading();

    setTimeout(hideLoading, 3000);
    buttons.forEach((btn, i) => {
  btn.addEventListener("click", () => {
    modals[i].style.display = "block";
    document.body.style.overflow = 'hidden'; // スクロールロック
  });
});
});
