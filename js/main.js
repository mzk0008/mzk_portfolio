"use strict";

// hamburger
const hamburger = document.querySelector(".js_hamburger");
const navigation = document.querySelector(".js_navigation");
const body = document.querySelector(".js_body");

//ハンバーガーをクリックしたら
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("is-active");
  navigation.classList.toggle("is-active");
  body.classList.toggle("is-active");
});

const navLinks = document.querySelectorAll(".l_header_nav-link");
navLinks.forEach((navLink) => {
  navLink.addEventListener("click", () => {
    hamburger.classList.remove("is-active");
    navigation.classList.remove("is-active");
    body.classList.remove("is-active");
  });
});

window.addEventListener("resize", () => {
  if (window.innerWidth >= 1080) {
    // is-activeを全部外す
    document.querySelector(".js_hamburger")?.classList.remove("is-active");
    document.querySelector(".js_navigation")?.classList.remove("is-active");
    document.querySelector(".js_body")?.classList.remove("is-active");
  }
});

// header pc固定
const header = document.querySelector(".js_header");
const main = document.querySelector(".l_main");

window.addEventListener("scroll", () => {
  const mainTop = main.getBoundingClientRect().top;
  const triggerPoint = window.innerHeight * 0.3;

  if (mainTop <= triggerPoint) {
    header.classList.add("is-fixed");
  } else {
    header.classList.remove("is-fixed");
  }
});

// faqのアコーディオン
const faq = document.querySelectorAll(".js_faq");

faq.forEach(function (element) {
  const faqA = element.querySelector(".js_faq-a");

  element.addEventListener("click", function () {
    if (element.classList.contains("is-active")) {
      // アコーディオンを閉じるときの処理
      // アイコン操作用クラスを切り替える(クラスを取り除く)
      element.classList.toggle("is-active");
      element.querySelector(".js_faq_mark").classList.toggle("is-open");

      // アニメーション実行
      closingAnim(faqA);
    } else {
      // アコーディオンを開くときの処理
      // アイコン操作用クラスを切り替える(クラスを付与)
      element.classList.toggle("is-active");
      element.querySelector(".js_faq_mark").classList.toggle("is-open");

      // アニメーション実行
      openingAnim(faqA);
    }
  });
});

const closingAnim = function (content) {
  gsap.to(content, {
    height: 0,
    opacity: 0,
    duration: 0.6,
    ease: "Power4.inOut",
  });
};

const openingAnim = function (content) {
  gsap.fromTo(
    content,
    {
      height: 0,
      opacity: 0,
    },
    {
      height: "auto",
      opacity: 1,
      duration: 0.6,
      ease: "Power4.inOut",
    }
  );
};

// フッター消える
document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  ScrollTrigger.create({
    trigger: ".js_cta",
    start: "center center",
    toggleClass: {
      targets: ".js_header",
      className: "is-hide",
    },
    endTrigger: ".js_footer",
    end: "center center",
  });
});
