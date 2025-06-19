var slideIndex = 1;
showSlides(slideIndex);

function changeSlide(n) {
  showSlides((slideIndex += n));
  // console.log(showSlides(slideIndex))
  // console.log(slideIndex)
}

// we have to pass n as an parameter in function
// we'll get the value of n by calling function and passing slideIndex as an argument
function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  console.log(typeof slides + " " + slides.length);

  // let's write condition to loop a slideshow
  // when n is greater then slides.length then value of slideIndex should be 1
  if (n > slides.length) {
    slideIndex = 1;
  }
  // when n is less then 1 then value of slideIndex should be equal to slides.length
  if (n < 1) {
    slideIndex = slides.length;
  }

  /* hiding all images by default using display none  */
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    slides[i].classList.remove("flip-in"); // Remove animation class
  }

  var currentSlide = slides[slideIndex - 1];
  currentSlide.style.display = "block";
  // Force reflow to restart animation
  void currentSlide.offsetWidth;
  currentSlide.classList.add("flip-in"); // Add animation class
}

document.addEventListener("contextmenu", (event) => event.preventDefault());
document.onkeydown = function (e) {
  // disable F12 key
  if (e.keyCode == 123) {
    return false;
  }

  // disable I key
  if (e.ctrlKey && e.shiftKey && e.keyCode == 73) {
    return false;
  }

  // disable J key
  if (e.ctrlKey && e.shiftKey && e.keyCode == 74) {
    return false;
  }

  // disable U key
  if (e.ctrlKey && e.keyCode == 85) {
    return false;
  }
};

// 3D animated background particles
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
const particleCount = 60;
const colors = ['#00fff7', '#ff00ea', '#00ff6a', '#fffd00'];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

function createParticles() {
  particles = [];
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: randomBetween(0, canvas.width),
      y: randomBetween(0, canvas.height),
      z: randomBetween(0.2, 1),
      radius: randomBetween(2, 6),
      color: colors[Math.floor(Math.random() * colors.length)],
      dx: randomBetween(-0.5, 0.5),
      dy: randomBetween(-0.5, 0.5)
    });
  }
}
createParticles();

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let p of particles) {
    ctx.save();
    ctx.globalAlpha = 0.6 * p.z;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius * p.z, 0, 2 * Math.PI);
    ctx.fillStyle = p.color;
    ctx.shadowColor = p.color;
    ctx.shadowBlur = 20 * p.z;
    ctx.fill();
    ctx.restore();
    // Move
    p.x += p.dx * p.z * 2;
    p.y += p.dy * p.z * 2;
    // Bounce
    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  }
}

function animateParticles() {
  drawParticles();
  requestAnimationFrame(animateParticles);
}
animateParticles();
