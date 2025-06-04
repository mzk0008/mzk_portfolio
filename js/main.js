"use strict";

// hamburger
const hamburger = document.querySelector(".js_hamburger");
const navigation = document.querySelector(".js_navigation");
const body = document.querySelector("body"); // .js_body でなく bodyに直接適用

hamburger.addEventListener("click", () => {
  const isOpen = navigation.classList.contains("is-active");

  hamburger.classList.toggle("is-active");
  body.classList.toggle("is-active");

  if (isOpen) {
    navigation.classList.remove("is-active");
    body.style.overflow = "";
  } else {
    navigation.classList.add("is-active");
    body.style.overflow = "hidden";
  }
});

// リンククリックで閉じる
document.querySelectorAll(".l_header_nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("is-active");
    navigation.classList.remove("is-active");
    body.classList.remove("is-active");
    body.style.overflow = "";
  });
});

// リサイズ時ハンバーガーちらつき防止
class Resize {
  constructor(target) {
    this.timeoutId;
    this.target = document.querySelector(target);

    window.addEventListener("resize", this._resize.bind(this));
  }

  _resize() {
    this.target.classList.add("is-resize");
    clearTimeout(this.timeoutId);

    this.timeoutId = setTimeout(() => {
      this.target.classList.remove("is-resize");
    }, 300);
  }
}

new Resize("html"); // htmlタグでもbodyタグでもOK

// 1080px以上でハンバーガー閉じる
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
