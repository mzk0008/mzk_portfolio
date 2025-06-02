"use strict";

// hamburger
const hamburger = document.querySelector(".js_hamburger");
const navigation = document.querySelector(".js_navigation");
const body = document.querySelector(".js_body");

//ハンバーガーをクリックしたら
hamburger.addEventListener("click", () => {
  //それぞれに対してis-activeクラスをつけ外しする
  hamburger.classList.toggle("is-active");
  navigation.classList.toggle("is-active");
  body.classList.toggle("is-active");
});

const navLinks = document.querySelectorAll(".l_header-nav_link");
navLinks.forEach((navLink) => {
  navLink.addEventListener("click", () => {
    hamburger.classList.remove("is-active");
    navigation.classList.remove("is-active");
    body.classList.remove("is-active");
  });
});

// header pc固定
const header = document.querySelector(".l_header");
const trigger = document.querySelector(".top_kv");

window.addEventListener("scroll", () => {
  const triggerBottom = trigger.getBoundingClientRect().bottom;

  if (triggerBottom <= 0) {
    if (!header.classList.contains("is-fixed")) {
      header.classList.add("is-fixed");
    }
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

// フッター
document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".js_header");
  const footer = document.querySelector(".js_footer");

  if (!header || !footer) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          header.classList.add("is-hidden");
        } else {
          header.classList.remove("is-hidden");
        }
      });
    },
    {
      root: null, // ビューポートを基準にする
      rootMargin: "0px", // 余白なし
      threshold: 0, // 一部でも見えたら発火
    }
  );

  observer.observe(footer);
});
