document.addEventListener("DOMContentLoaded", () => {
  // ================ 星星系统 ==================
  const starContainer = document.querySelector(".star-container");
  const starCount = 100;
  const stars = [];

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  for (let i = 0; i < starCount; i++) {
    const star = document.createElement("img");
    star.src = "Images/star2.PNG";
    star.classList.add("star");

    const originalX = Math.random() * window.innerWidth;
    const originalY = Math.random() * window.innerHeight;

    star.style.left = originalX + "px";
    star.style.top = originalY + "px";
    star.style.opacity = rand(0.4, 0.9);

    stars.push({
      el: star,
      originalX,
      originalY,
    });

    starContainer.appendChild(star);
  }

  document.addEventListener("mousemove", (e) => {
    stars.forEach((s) => {
      const dx = e.clientX - s.originalX;
      const dy = e.clientY - s.originalY;

      const distance = Math.sqrt(dx * dx + dy * dy);
      const power = Math.max(0, 220 - distance) / 220;

      const moveX = s.originalX + dx * power * 0.35;
      const moveY = s.originalY + dy * power * 0.35;

      s.el.style.left = moveX + "px";
      s.el.style.top = moveY + "px";
    });
  });

  // 如果你以后想要 twinkle 再加，不然我们先不调用，避免报错
  // function animateTwinkle() { ... }
  // animateTwinkle();


  //  首页访问系统（彩色记忆）
  const floatingBtns = document.querySelectorAll(".floating-btn");

  // 页面加载时：恢复已点击状态
  floatingBtns.forEach((btn) => {
    const id = btn.dataset.id;
    if (id && localStorage.getItem("visited-" + id)) {
      btn.classList.add("visited");
    }
  });

  // 点击时：记录已访问 + 立即加类
  floatingBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.id;
      if (!id) return;

      localStorage.setItem("visited-" + id, "true");
      btn.classList.add("visited");
    });
  });


  // ========== 标题清空按钮 ==========
  const title = document.querySelector(".title");

  if (title) {
    title.addEventListener("click", () => {
      floatingBtns.forEach((btn) => {
        const id = btn.dataset.id;
        if (!id) return;

        localStorage.removeItem("visited-" + id);
        btn.classList.remove("visited");
      });

      title.classList.add("cleared");
    });
  }

  // ========== 左上角 Comfort Object 展开/收起介绍 ==========
  const infoLeft = document.querySelector(".info-left");
  const infoTitleToggle = document.querySelector(".info-title-toggle");

  if (infoLeft && infoTitleToggle) {
    infoTitleToggle.addEventListener("click", () => {
      infoLeft.classList.toggle("open");
    });
  }


});



