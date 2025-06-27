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


//slider
const imageList = ['images/slider1.png', 'images/slider2.png', 'images/slider3.png', 'images/slider4.png', 'images/slider5.png'];
let currentList = [...imageList];

const slide = document.getElementById('slide');
const next = document.getElementById('next');
const prev = document.getElementById('prev');
const indicators = document.querySelectorAll('#indicator .list');

// 初期表示
currentList.forEach((src) => {
 const sliderLine = `<div><img src="${src}"></div>`;
 slide.insertAdjacentHTML('beforeend', sliderLine);
});

// 右
function rightRemove() {
 const removed = currentList.shift();
 slide.classList.add('slide_right_remove');
 return removed;
};

function rightAdd(removed) {
 currentList.push(removed);
 const addHtml = `<div><img src="${removed}"></div>`;
 slide.insertAdjacentHTML('beforeend', addHtml);
}

// 左
function leftRemove() {
 const removed = currentList.pop();
 slide.classList.add('slide_left_remove');
 return removed;
};

function leftMove() {
 slide.classList.add('slide_left');
};

function leftAdd(removed) {
 currentList.unshift(removed);
 const addHtml = `<div><img src="${removed}"></div>`;
 slide.insertAdjacentHTML('afterbegin', addHtml);
}

// スケールアニメーション
function addScaleAnimation() {
 const images = slide.querySelectorAll('img');
 images.forEach(img => {
   img.classList.remove('scale_anim');
   void img.offsetWidth; // アニメリセット
   img.classList.add('scale_anim');
 });
}

let isAnimating = false; // アニメ中フラグ

// 右クリック
next.onclick = () => {
 if (isAnimating) return;
 isAnimating = true;

 const removed = rightRemove();
 slide.classList.add('animating');
 slide.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
 slide.style.transform = 'translateX(-24.9%)';

 setTimeout(() => {
   rightAdd(removed);
   slide.removeChild(slide.firstElementChild);

   slide.style.transition = 'none';
   slide.style.transform = 'translateX(-10.6%)';
   slide.classList.remove('animating');

   updateIndicator();
   addScaleAnimation();
   isAnimating = false;
 }, 500);
};

// 左クリック
prev.onclick = () => {
 if (isAnimating) return;
 isAnimating = true;

 const removed = leftRemove();
 leftMove();
 slide.classList.add('animating');
 slide.style.transition = 'transform 0.5s ease, opacity 0.5s ease,';
 slide.style.transform = 'translateX(3.7%)';

  setTimeout(() => {
   leftAdd(removed);
   slide.removeChild(slide.lastElementChild);

   slide.style.transition = 'none';
   slide.style.transform = 'translateX(-10.6%)'; // 元の位置に戻す
   slide.classList.remove('animating');

   updateIndicator();
   addScaleAnimation();
   isAnimating = false;
 }, 500);
};

// 自動再生
let autoPlay = setInterval(() => {
 if (isAnimating) return;
 isAnimating = true;

 const removed = rightRemove();
 slide.classList.add('animating');
 slide.style.transition = 'transform 0.5s ease, opacity 0.5s ease';
 slide.style.transform = 'translateX(-24.9%)';

 setTimeout(() => {
   rightAdd(removed);
   slide.removeChild(slide.firstElementChild);

   slide.style.transition = 'none';
   slide.style.transform = 'translateX(-10.6%)';
   slide.classList.remove('animating');

   updateIndicator();
   addScaleAnimation();
   isAnimating = false;
 }, 500);
}, 3000);

// インジケーター更新
function updateIndicator() {
 const currentImage = currentList[0];
 const activeIndex = imageList.indexOf(currentImage);
 indicators.forEach((ind, i) => {
   ind.classList.toggle('active', i === activeIndex);
 });
}

// インジケータークリック移動
indicators.forEach((indicator, i) => {
 indicator.addEventListener('click', () => {
   if (isAnimating) return;
   const targetImage = imageList[i];
   const currentIndex = imageList.indexOf(currentList[0]);
   let diff = i - currentIndex;
   if (diff === 0) return;

   // アニメーションクラスの追加（1回だけ）
   if (diff > 0) {
     slide.classList.add('slide_right_remove');
     for (let j = 0; j < diff; j++) { 
       const removed = rightRemove();
       currentList.push(removed);
       slide.insertAdjacentHTML('beforeend', `<div><img src="${removed}"></div>`);
       slide.removeChild(slide.firstElementChild);
     }
   } else { 
     slide.classList.add('slide_left_remove');
     for (let j = 0; j < Math.abs(diff); j++) {
       const removed = leftRemove();
       currentList.unshift(removed);
       slide.insertAdjacentHTML('afterbegin', `<div><img src="${removed}"></div>`);
       slide.removeChild(slide.lastElementChild);
     }
   }

   updateIndicator();
   addScaleAnimation();

   // アニメーションフラグ解除 + クラスリセット
   setTimeout(() => {
     slide.classList.remove('slide_left_remove', 'slide_right_remove');
     isAnimating = false;
   }, 500); // アニメ時間に応じて調整
 });
});

// SP版スワイプ感知
let touchStartX = 0;
let touchEndX = 0;

slide.addEventListener('touchstart', (e) => {
 touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

slide.addEventListener('touchend', (e) => {
 touchEndX = e.changedTouches[0].screenX;
 handleSwipeGesture();
}, { passive: true });

function handleSwipeGesture() {
 const swipeThreshold = 50; // スワイプとみなす最小距離(px)
 const distance = touchEndX - touchStartX;

 if (Math.abs(distance) > swipeThreshold && !isAnimating) {
   if (distance < 0) {
     next.click();
   } else {
     prev.click();
   }
 }
}


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
