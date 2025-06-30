'use strict';

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
});

//モーダルここから
const MODAL_DATA = {
  danzai: {
    img: 'images/pcTnFoodDanzai.png',
  },
  ebi: {
    img: 'images/pcTnFoodEbi.png',
  },
  xiao: {
    img: 'images/pcTnFoodXiao.png',
  },
  yarou: {
    img: 'images/pcTnFoodYarou.png',
  }
};

// 開閉・描画ロジック
document.addEventListener('DOMContentLoaded', function () {
  const overlay = document.getElementById('modal-overlay');
  const modalImg = overlay.querySelector('.modal-img');
  const closeBtn = overlay.querySelector('.modal-close');

  // 開く
  document.querySelectorAll('.js-modal-trigger').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const key = btn.dataset.modal;
      const d = MODAL_DATA[key];
      if (!d) return;

      modalImg.src = d.img;
      modalImg.alt = d.title;
      overlay.classList.add('active');
      overlay.style.display = 'flex';
      overlay.setAttribute('aria-hidden', 'false');
      closeBtn.focus();
      document.body.style.overflow = 'hidden';
    });
  });

  // 閉じる関数
  function closeModal() {
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
    setTimeout(() => {
      overlay.style.display = 'none';
      document.body.style.overflow = '';
    }, 700);
  }
  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', function(e){
    if(e.target === overlay) closeModal();
  });
  // Escキー対応
  document.addEventListener('keydown', function(e){
    if(overlay.classList.contains('active') && e.key === 'Escape') closeModal();
  });
});

//ドロワーnavi 佐藤さんご提供
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

document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.querySelector('.back-to-top');
    const footer = document.querySelector('footer'); // footer要素を取得。適切なセレクタに変更してください。

    // ボタンの出現位置（ページ上部から812pxスクロールしたら出現）
    const appearanceThreshold = 812;

    function handleScroll() {
        // 現在のスクロール位置
        const scrollY = window.scrollY || document.documentElement.scrollTop;

        // フッターの位置情報
        // getBoundingClientRect() はビューポートを基準とした要素の位置とサイズを返します。
        // top は要素の上端がビューポートの上端からどれだけ離れているかを示します。
        // footer.getBoundingClientRect().top が window.innerHeight を超えている間はフッターは画面外（下方向）です。
        const footerRect = footer.getBoundingClientRect();
        const isFooterVisible = footerRect.top < window.innerHeight;

        // ボタンの表示/非表示ロジック
        if (scrollY > appearanceThreshold && !isFooterVisible) {
            // スクロール位置が閾値を超え、かつフッターが画面内にない場合
            backToTopButton.style.display = 'block'; // または 'flex', 'inline-block' など、元のdisplayプロパティに合わせてください
        } else {
            // それ以外の場合（スクロール位置が閾値以下、またはフッターが画面内にある場合）
            backToTopButton.style.display = 'none';
        }
    }

    // ページ読み込み時とスクロール時に実行
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 初期表示の状態を設定するため、ページ読み込み時にも一度実行
});