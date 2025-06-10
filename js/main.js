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

window.addEventListener("scroll", () => {
  document.body.classList.toggle("is-scrolled", window.scrollY > 0);
});

// 下層からトップでもスクロール
window.addEventListener("DOMContentLoaded", () => {
  const hash = window.location.hash;
  if (hash) {
    const target = document.querySelector(hash);
    if (target) {
      // 少し遅らせるとスムーズ（必要に応じて調整）
      setTimeout(() => {
        target.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
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

// フッター見えたらヘッダー消える
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

// ページ遷移
window.addEventListener("DOMContentLoaded", () => {
  gsap.to("body", {
    opacity: 1,
    duration: 0.5,
    ease: "power2.out",
    onStart: () => {
      document.body.classList.add("is-show");
    },
  });

  // リンククリック時のフェードアウト
  const links = document.querySelectorAll(
    'a[href]:not([target]):not([href^="#"])'
  );
  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const url = this.href;
      gsap.to("body", {
        opacity: 0,
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          window.location.href = url;
        },
      });
    });
  });
});

const openBtn = document.querySelector(".js_open_modal");
const modal = document.getElementById("privacy_modal");
const closeBtns = document.querySelectorAll(".js_close_modal");
const contentBox = document.getElementById("modal_policy_content");

openBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // display: block にして初期状態で描画（opacity: 0）
  modal.style.display = "block";
  document.body.style.overflow = "hidden";

  // 2フレーム目で .show を付けることで transition 発火
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      modal.classList.add("show");
    });
  });

  // 一度だけ読み込み
  if (!contentBox.dataset.loaded) {
    fetch("privacypolicy.html")
      .then((res) => res.text())
      .then((data) => {
        contentBox.innerHTML = data;
        contentBox.dataset.loaded = "true";
      })
      .catch(() => {
        contentBox.innerHTML =
          "<p>プライバシーポリシーの読み込みに失敗しました。</p>";
      });
  }
});

// 閉じる処理（ボタン・背景クリック）
closeBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    modal.classList.remove("show");
    document.body.style.overflow = "";

    // 非表示に戻すのは transition 終了後に
    setTimeout(() => {
      modal.style.display = "none";
    }, 600); // ← CSSの transition時間（0.6s）に合わせる
  });
});
