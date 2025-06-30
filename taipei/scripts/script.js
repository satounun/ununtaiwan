'use strict';

//loading　佐藤さん提供
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

//モーダルここから　台南ページでの流用も考慮。とりあえず、配列風オブジェクトでマッピング（エクセル表みたいな考えで）みたいに格納。
//町田先生からのご教示をヒント（流用できる部分は別ファイル化）にテキストも.jsファイルに記載。
const MODAL_DATA = {
  ningxia: {
    img: 'images/pcYasuka.png',
    title: '寧夏夜市',
    description: '寧夏路夜市は台湾伝統の屋台料理やB級グルメがメインの夜市です。特に大同区の圓環付近には懐かしいグルメがたくさん集まっていますので、思う存分味わってください。また、ここの夜市は歩道と車道が分かれているので、食事やショッピングに便利です。食の夜市とも言われる寧夏路夜市には毎日、大勢の人々が訪れています。',
    hours: [
      '営業時間',
      '日曜日 17:00 - 25:00',
      '月曜日 17:00 - 25:00',
      '火曜日 17:00 - 25:00',
      '水曜日 17:00 - 25:00',
      '木曜日 17:00 - 25:00',
      '金曜日 17:00 - 25:00',
      '土曜日 17:00 - 25:00'
    ]
  },
  raohe: {
    img: 'images/pcGyoga.png',
    title: '饒河街夜市',
    description: '饒河街観光夜市は、屋台料理から雑貨や生活用品も扱う夜市です。その手ごろな値段が魅力的で、多くの人々で賑わいます。最も観光客に人気があるのは「藥燉排骨」「胡椒餅」「水煎包」「蚵仔麵線」など行列ができる人気料理と、「麻辣臭豆腐」「牛肉麵」「天婦羅」など台湾の伝統的な屋台料理も定番です。　',
    hours: [
      '営業時間',
      '日曜日 17:00 - 23:00',
      '月曜日 17:00 - 23:00',
      '火曜日 17:00 - 23:00',
      '水曜日 17:00 - 23:00',
      '木曜日 17:00 - 23:00',
      '金曜日 17:00 - 23:00',
      '土曜日 17:00 - 23:00'
    ]
  },
  shilin: {
    img: 'images/pcShilin.png',
    title: '士林夜市',
    description: 'ここは市内で最も規模が大きく知名度の高い夜市で、台湾のおいしい屋台グルメからユニークな雑貨まで、ありとあらゆるものが売られています。その種類の豊富さ、敷地の広さ、歴史、そして夜遊びスポットとしての人気度と、士林夜市の魅力は何から何まで台北ナンバーワン。台北観光では絶対にはずせない魅惑スポットです。い。',
    hours: [
      '営業時間',
      '月曜日 16:00 - 00:00',
      '日曜日 16:00 - 00:00',
      '火曜日 16:00 - 00:00',
      '水曜日 16:00 - 00:00',
      '木曜日 16:00 - 00:00',
      '金曜日 16:00 - 00:00',
      '土曜日 16:00 - 00:00'
    ]
  },
  tonghua: {
    img: 'images/pcTuka.png',
    title: '通化夜市',
    description: '台北の他の夜市と比べると小規模ではあるものの、食べ物においてはどの夜市にも決して劣りません。有名な駱記小炒(炒め物)、裕品元の氷火湯円、平価鉄板焼、通化夜市の揚げサツマイモボールは、ぜひとも賞味したい特色的な伝統軽食です。マッサージ店もたくさんあり、1日の終わりに最適な夜市です。',
    hours: [
      '営業時間',
      '日曜日 17:00 - 24:00',
      '月曜日 17:00 - 24:00',
      '火曜日 17:00 - 24:00',
      '水曜日 17:00 - 24:00',
      '木曜日 17:00 - 24:00',
      '金曜日 17:00 - 24:00',
      '土曜日 17:00 - 24:00'
    ]
  }
};

// 画面の開閉を定義
document.addEventListener('DOMContentLoaded', function () {
  const overlay = document.getElementById('modal-overlay');
  const modalImg = overlay.querySelector('.modal-img');
  const modalTitle = overlay.querySelector('.modal-title');
  const modalDesc = overlay.querySelector('.modal-description');
  const modalHours = overlay.querySelector('.modal-hours');
  const closeBtn = overlay.querySelector('.modal-close');

  // 開く動作
  document.querySelectorAll('.js-modal-trigger').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const key = btn.dataset.modal;
      const d = MODAL_DATA[key];
      if (!d) return;

      modalTitle.textContent = d.title;
      modalImg.src = d.img;
      modalImg.alt = d.title;
      modalDesc.textContent = d.description;
      modalHours.innerHTML = d.hours.map(t => `<li>${t}</li>`).join('');
      overlay.classList.add('active');
      overlay.style.display = 'flex';
      overlay.setAttribute('aria-hidden', 'false');
      closeBtn.focus();
      document.body.style.overflow = 'hidden';
    });
  });

  // 閉じる動作
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
  
  // Escキーでも閉じる（だれかのネット情報から流用）
  document.addEventListener('keydown', function(e){
    if(overlay.classList.contains('active') && e.key === 'Escape') closeModal();
  });
});

//ドロワーnavi　佐藤さんご提供
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

//TOPに戻るボタンの出現と消滅
document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.querySelector('.back-to-top');
    const footer = document.querySelector('footer'); // footerが表示され始めたら消滅。

    // ボタンの出現位置（ページ上部から812pxスクロールしたら出現）
    const appearanceThreshold = 812;

    function handleScroll() {
        // 現在のスクロール位置
        const scrollY = window.scrollY || document.documentElement.scrollTop;

        // フッターの位置情報
        // getBoundingClientRect() はビューポートを基準とした要素の位置とサイズを返す。
        // top は要素の上端からの縦位置Y。
        // footer.getBoundingClientRect().top が window.innerHeight を超えている間はフッターは画面の外。
        const footerRect = footer.getBoundingClientRect();
        const isFooterVisible = footerRect.top < window.innerHeight;

        // ボタンの表示/非表示ロジック
        if (scrollY > appearanceThreshold && !isFooterVisible) {
            // スクロール位置が出現値を超えてからフッターが画面内に出てくるまで
            backToTopButton.style.display = 'block'; // 表示の指示
        } else {
            // それ以外の場合（スクロール位置が閾値以下、またはフッターが画面内にある場合）
            backToTopButton.style.display = 'none';
        }
    }

    // ページ読み込み時とスクロール時に実行
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // 初期表示の状態を設定するため、ページ読み込み時にも一度実行
});

