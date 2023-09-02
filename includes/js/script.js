AOS.init();
$(document).ready(function () {
  // Init fancyBox
  Fancybox.bind("[data-fancybox='gallery']", {
    autoFocus: false,
    dragToClose: true,
    autoStart: false,
    selector: ".swiper-slide",
  });
  Fancybox.bind("[data-fancybox='gallery2']", {
    autoFocus: false,
    dragToClose: true,
    autoStart: false,
    selector: ".swiper-slide",
  });
  // Init Swiper
  const swiper = new Swiper('.swiper', {
    loop: true,
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 50,
      stretch: 0,
      depth: 100,
      modifier: 1,
      slideShadows: true,
    },
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true,
    },

  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Loading Page
  setTimeout(function () {
    document.querySelector("html").style.overflowY = "auto";
    document.querySelector(".loadingPage").classList.remove("active");
  }, 1000);
  const navbar = document.getElementById("navbar");
  const sticky = navbar.offsetTop;
  const tentang = document.getElementById("tentang");
  const divisi = document.getElementById("divisi");
  const prestasi = document.getElementById("prestasi");
  const programmer = document.getElementById("programmer1");
  const design = document.getElementById("design1");
  const imgProgrammer = document.getElementById("programmer");
  const imgDesign = document.getElementById("design");
  const imgPrestasi = document.getElementById("prestasijpg");
  const imgYoutube = document.getElementById("youtube");
  const navTentang = document.getElementById("nav1");
  const navDivisi = document.getElementById("nav2");
  const navPrestasi = document.getElementById("nav3");
  const learn = document.getElementById("learn");
  const secgambar = document.querySelector('.secgambar');
  function stickyNav() {
    if (window.pageYOffset >= sticky) {
      navbar.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
      navbar.style.backdropFilter = "blur(10px)";
    } else {
      navbar.style.backgroundColor = "transparent";
      navbar.classList.backdropFilter = "unset";
    }
  }

  function changeImg() {
    if (window.pageYOffset >= tentang.offsetTop) {
      imgYoutube.style = "display: flex; justify-content: center;";
      imgDesign.style = "display: none;";
      imgPrestasi.style = "display: none;";
      imgProgrammer.style = "display: none;";
      navTentang.classList.add("active");
      navDivisi.classList.remove("active");
      navPrestasi.classList.remove("active");
    }
    if (window.pageYOffset >= divisi.offsetTop) {
      imgProgrammer.style = "display: inline;";
      imgDesign.style = "display: none;";
      imgPrestasi.style = "display: none;";
      imgYoutube.style = "display: none;";
      navTentang.classList.remove("active");
      navDivisi.classList.add("active");
      navPrestasi.classList.remove("active");
    }
    if (window.pageYOffset >= design.offsetTop) {
      imgDesign.style = "display: inline;";
      imgProgrammer.style = "display: none;";
      imgYoutube.style = "display: none;";
      imgPrestasi.style = "display: none;";
    }
    if (window.pageYOffset >= prestasi.offsetTop) {
      navTentang.classList.remove("active");
      navDivisi.classList.remove("active");
      navPrestasi.classList.add("active");
      imgDesign.style = "display: none;";
      imgProgrammer.style = "display: none;";
      imgYoutube.style = "display: none;";
      imgPrestasi.style = "display: inline;";
    }
  }
  window.onscroll = function () {
    changeImg();
    stickyNav();
  };
});