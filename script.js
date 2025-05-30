const phrases = [
  "💘 Trái tim yêu thương",
  "Thảo iuiu 💕",
  "Love u forever ❤️",
  "You are my world 💗🌍",
  "Nguyễn Thị Thảo 💖",
  "Fall in love 💗",
  "💓💓💓"
];

const container = document.getElementById("container");

// Tạo chữ rơi 3D
function createFallingText() {
  const el = document.createElement("div");
  el.classList.add("falling");
  el.textContent = phrases[Math.floor(Math.random() * phrases.length)];

  const fontSize = Math.random() * 10 + 18; // Nhỏ hơn
  const left = Math.random() * 90;
  const z = Math.random() * 600 - 300;

  el.style.fontSize = `${fontSize}px`;
  el.style.left = `${left}vw`;
  el.style.transform = `translateZ(${z}px)`;
  // Tắt đổ bóng nếu chữ quá nhỏ
  if (fontSize < 34) {
    el.style.textShadow = "none";
  }

  container.appendChild(el);
  setTimeout(() => el.remove(), 6000);
}

// Giảm tần suất tạo chữ: mỗi 200ms
setInterval(createFallingText, 200);

// Xử lý xoay 3D bằng chuột hoặc cảm ứng
let isDragging = false;
let lastX = 0, lastY = 0;
let rotateX = 0, rotateY = 0;
const scene = document.getElementById('scene');

// Hàm cập nhật xoay
function updateRotation() {
  container.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
}

// Dùng requestAnimationFrame để throttle xoay cho mượt
let animationFrameId = null;
function throttledRotate(dx, dy) {
  if (animationFrameId) return;
  animationFrameId = requestAnimationFrame(() => {
    rotateY += dx * 0.3;
    rotateX -= dy * 0.3;
    updateRotation();
    animationFrameId = null;
  });
}

// Mouse
scene.addEventListener('mousedown', (e) => {
  isDragging = true;
  lastX = e.clientX;
  lastY = e.clientY;
});

scene.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  const dx = e.clientX - lastX;
  const dy = e.clientY - lastY;
  lastX = e.clientX;
  lastY = e.clientY;
  throttledRotate(dx, dy);
});

scene.addEventListener('mouseup', () => isDragging = false);
scene.addEventListener('mouseleave', () => isDragging = false);

// Touch (mobile)
scene.addEventListener('touchstart', (e) => {
  isDragging = true;
  lastX = e.touches[0].clientX;
  lastY = e.touches[0].clientY;
});

scene.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  const dx = e.touches[0].clientX - lastX;
  const dy = e.touches[0].clientY - lastY;
  lastX = e.touches[0].clientX;
  lastY = e.touches[0].clientY;
  throttledRotate(dx, dy);
});

scene.addEventListener('touchend', () => isDragging = false);
