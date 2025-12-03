const starContainer = document.querySelector(".star-container");
const starCount = 100;
const stars = [];

// 随机区间函数
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

// ⭐ 鼠标吸力增强版
document.addEventListener("mousemove", (e) => {
  stars.forEach((s) => {
    const dx = e.clientX - s.originalX;
    const dy = e.clientY - s.originalY;

    const distance = Math.sqrt(dx*dx + dy*dy);
    const power = Math.max(0, 220 - distance) / 220;

    // 加大靠近力度（明显）
    const moveX = s.originalX + dx * power * 0.35;
    const moveY = s.originalY + dy * power * 0.35;

    s.el.style.left = moveX + "px";
    s.el.style.top = moveY + "px";
  });
});

animateTwinkle();