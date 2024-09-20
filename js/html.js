// banner套件
  function bannerSwitcher() {
    next = $('.sec-1-input').filter(':checked').next('.sec-1-input');
    if (next.length) next.prop('checked', true);
    else $('.sec-1-input').first().prop('checked', true);
  }

  var bannerTimer = setInterval(bannerSwitcher, 5000);

  $('nav .controls label').click(function() {
    clearInterval(bannerTimer);
    bannerTimer = setInterval(bannerSwitcher, 5000)
  });




$(function () {

  // 滑動至指定位置
  $('.menulist a').click(function () {/* 物件名稱要抓對不然找不到 */
      let menulist = $(this).attr('href');
      let loc = $(menulist).offset();/* location */
      $('html,body').animate({ scrollTop: loc.top }, 1000);//1000=1秒 幾秒滾過去
      /* 任何卷軸的都要去抓html body */
  });

  const topbar = document.getElementById('topbar');
  const newsection = document.getElementById('new');
  const menuOffsetTop = topbar.offsetTop; // 取得清單初始位置
  
  window.addEventListener('scroll', () => {
      if (window.pageYOffset >= menuOffsetTop) {
          topbar.style.position = 'fixed';
          topbar.style.top = '0';
          topbar.style.zIndex = '999';
          topbar.style.width = '100%'; // 保持寬度
          newsection.style.marginTop='10vh';
      } else {
        topbar.style.position = 'static'; // 恢復初始樣式
        newsection.style.marginTop='0';
      }
  });

  
  const wiperTrack = document.querySelector(".wiper-track");
  const wipes = Array.from(wiperTrack.children);
  const wipePrevBtn = document.querySelector(".wiper-button__right");
  const wipeNextBtn = document.querySelector(".wiper-button__left");
  const wipeWidth = wipes[0].getBoundingClientRect().width;
  
  const arrowsBehaviour = (wipePrevBtn, wipeNextBtn, index) => {
    if (index === 0) {
      wipePrevBtn.classList.add("is-hidden");
      wipeNextBtn.classList.remove("is-hidden");
    } else if (index === wipes.length - 1) {
      wipePrevBtn.classList.remove("is-hidden");
      wipeNextBtn.classList.add("is-hidden");
    } else {
      wipePrevBtn.classList.remove("is-hidden");
      wipeNextBtn.classList.remove("is-hidden");
    }
  };
  
  const wipeSlide = (wiperTrack, activeSlide, nextSlide, targetIndex) => {
    wiperTrack.style.transform =
      "translateX(-" + (wipeWidth + 24) * (targetIndex - 1) + "px)";
    activeSlide.classList.remove("active-swipe");
    activeSlide.style.transform = "scale(1)";
    nextSlide.classList.add("active-swipe");
    nextSlide.style.transform = "scale(1.1)";
  };
  
  wipeNextBtn.addEventListener("click", (e) => {
    const activeSlide = wiperTrack.querySelector(".active-swipe");
    const nextSlide = activeSlide.nextElementSibling;
    const targetIndex = wipes.findIndex((slide) => slide === nextSlide);
    wipeSlide(wiperTrack, activeSlide, nextSlide, targetIndex);
    arrowsBehaviour(wipePrevBtn, wipeNextBtn, targetIndex);
  });
  wipePrevBtn.addEventListener("click", (e) => {
    const activeSlide = wiperTrack.querySelector(".active-swipe");
    const nextSlide = activeSlide.previousElementSibling;
    const targetIndex = wipes.findIndex((slide) => slide === nextSlide);
    wipeSlide(wiperTrack, activeSlide, nextSlide, targetIndex);
    arrowsBehaviour(wipePrevBtn, wipeNextBtn, targetIndex);
  });




 

});



/* jQuery Smoove套件 */
/* 這是別人寫的套件 已經可以用了就不用丟進去 */
$('.smoove').smoove({/* 全部人共用寫這邊 */
  offset: '20%'/* offset離螢幕底部 */
});
$('.smoove-z').smoove({
  moveZ:'-500px',
  rotateX:'90deg',
  moveY:'250px'
  
});






