var hamburgerDrawer = document.getElementById('hamburger-menu');
var hamburgerBtn = document.getElementById('hamburger-btn');
var hamburgerDrawerBg = document.getElementById('hamburger-menu__bg');

var axisCords;
var hamburgerDrawerWidth = hamburgerDrawer.clientWidth;
var oneByForthScreen = window.innerWidth / 4;
var openStatus = false;

function drawToStart() {
  hamburgerDrawer.animate([
    {
      transform: `translate3d(${axisCords ? axisCords + 'px' : 0 + 'px'}, 0, 0)`
    },
    {
      transform: 'translate3d(-100%, 0, 0)'
    }
  ], {
      duration: 500,
      easing: 'ease-in-out'
    });
  hamburgerDrawer.style.transform = 'translate3d(-100%, 0, 0)';
  openStatus = false;
}

function drawToEnd() {
  hamburgerDrawer.animate([
    {
      transform: `translate3d(${axisCords ? axisCords + 'px' : -100 + '%'}, 0, 0)`
    },
    {
      transform: 'translate3d(0, 0, 0)'
    }
  ], {
      duration: 500,
      easing: 'ease-in-out'
    });
  hamburgerDrawer.style.transform = 'translate3d(0, 0, 0)';
  openStatus = true;
}

// Click on Menu Button to Drawer
hamburgerBtn.addEventListener('click', drawToEnd);

// Click on Background to Close
hamburgerDrawerBg.addEventListener('click', function(){
  if (openStatus) drawToStart();
});

hamburgerDrawer.addEventListener('touchmove',
  function(e) {
    axisCords = e.changedTouches[0].pageX - hamburgerDrawerWidth;
    if (axisCords > 0) axisCords = 0;
    this.style.transform = 'translate3d(' + axisCords + 'px, 0, 0)';
});

hamburgerDrawer.addEventListener('touchend',
  function(e) {
    var endPoint = e.changedTouches[0].pageX;
    var isOverThreshold = endPoint > oneByForthScreen && endPoint < hamburgerDrawerWidth;
    if (endPoint < oneByForthScreen) {
      drawToStart();
    } else if (isOverThreshold) {
      drawToEnd();
    } else {
      openStatus = true;
    }
    axisCords = null;
  });
