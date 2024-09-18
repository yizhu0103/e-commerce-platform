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


