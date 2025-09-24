const navLinks = document.querySelectorAll("nav ul li a");
const navLinksContainer = document.querySelector("nav ul"); // container <ul>
const menuToggle = document.getElementById("menu-toggle");

// klik link untuk aktif
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");
  });
});

// toggle menu untuk mobile
menuToggle.addEventListener("click", () => {
  navLinksContainer.classList.toggle("show");
});

// tutup menu otomatis setelah klik link
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navLinksContainer.classList.remove("show");
  });
});


// === ANIMASI KOTAK NAIK ===
function createRectangle() {
    const rect = document.createElement("div");
    rect.classList.add("rectangle");
  
    // acak ukuran & posisi
    rect.style.width = 40 + Math.random() * 100 + "px";
    rect.style.height = 20 + Math.random() * 60 + "px";
    rect.style.left = Math.random() * window.innerWidth + "px";
  
    document.querySelector(".overlay").appendChild(rect);
  
    // hapus setelah animasi selesai
    rect.addEventListener("animationend", () => {
      rect.remove();
    });
}
  
// spawn kotak tiap 500ms
setInterval(createRectangle, 500);
  
// === ANIMASI CIRCUIT LINE ===
const canvas = document.createElement("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.position = "absolute";
canvas.style.top = 0;
canvas.style.left = 0;
canvas.style.zIndex = 0;
  
document.querySelector(".overlay").appendChild(canvas);
  
const ctx = canvas.getContext("2d");
  
const lines = [];
for (let i = 0; i < 40; i++) {
  lines.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    dx: (Math.random() - 0.5) * 1,
    dy: (Math.random() - 0.5) * 1,
    length: 40 + Math.random() * 80,
  });
}
  
function animateCircuit() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "rgba(0, 140, 255, 0.4)";
  ctx.lineWidth = 1;
  
  lines.forEach((line) => {
    ctx.beginPath();
    ctx.moveTo(line.x, line.y);
    ctx.lineTo(line.x + line.length * line.dx, line.y + line.length * line.dy);
    ctx.stroke();
  
    line.x += line.dx;
    line.y += line.dy;
  
    if (line.x < 0 || line.x > canvas.width) line.dx *= -1;
    if (line.y < 0 || line.y > canvas.height) line.dy *= -1;
  });
  
  requestAnimationFrame(animateCircuit);
}
  
animateCircuit();
  
// update ukuran canvas saat resize
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
