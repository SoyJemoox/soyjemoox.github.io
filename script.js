// Canvas y configuración de partículas binarias
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

// Ajustar tamaño del canvas
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Clase para las partículas binarias
class BinaryParticle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.value = Math.random() > 0.5 ? '1' : '0';
    this.speed = 0.5 + Math.random() * 1.5;
    this.opacity = 0.3 + Math.random() * 0.4;
    this.fontSize = 12 + Math.random() * 8;
  }

  update() {
    this.y += this.speed;
    
    // Si la partícula sale del canvas, reiniciarla arriba
    if (this.y > canvas.height) {
      this.y = -20;
      this.x = Math.random() * canvas.width;
    }
  }

  draw() {
    ctx.fillStyle = `rgba(0, 255, 136, ${this.opacity})`;
    ctx.font = `${this.fontSize}px monospace`;
    ctx.fillText(this.value, this.x, this.y);
  }
}

// Crear array de partículas
const particles = [];
const particleCount = 80; // Número de partículas binarias

for (let i = 0; i < particleCount; i++) {
  particles.push(new BinaryParticle());
}

// Animar partículas
function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  particles.forEach(particle => {
    particle.update();
    particle.draw();
  });
  
  requestAnimationFrame(animateParticles);
}

animateParticles();

// Animación de contadores en estadísticas
function animateCounter(element) {
  const target = parseInt(element.getAttribute('data-target'));
  const duration = 2000; // 2 segundos
  const increment = target / (duration / 16); // 60fps
  let current = 0;

  const updateCounter = () => {
    current += increment;
    if (current < target) {
      element.textContent = Math.floor(current).toLocaleString();
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target.toLocaleString();
    }
  };

  updateCounter();
}

// Intersection Observer para animar contadores cuando sean visibles
const observerOptions = {
  threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll('.stat-number');
      counters.forEach(counter => {
        animateCounter(counter);
      });
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

const statsSection = document.querySelector('.stats-section');
if (statsSection) {
  observer.observe(statsSection);
}

// Efecto de hover en las tarjetas de proyecto
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.borderColor = '#00cc66';
  });
  
  card.addEventListener('mouseleave', function() {
    this.style.borderColor = '#00ff88';
  });
});

// Efecto parallax suave en el scroll
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('.skill-item, .project-card');
  
  parallaxElements.forEach((element, index) => {
    const speed = 0.5 + (index % 3) * 0.1;
    element.style.transform = `translateY(${scrolled * speed * 0.02}px)`;
  });
});

// Smooth scroll para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Añadir efecto de escritura al título principal
const mainTitle = document.querySelector('header h1');
if (mainTitle) {
  const originalText = mainTitle.textContent;
  mainTitle.textContent = '';
  let index = 0;

  function typeWriter() {
    if (index < originalText.length) {
      mainTitle.textContent += originalText.charAt(index);
      index++;
      setTimeout(typeWriter, 100);
    }
  }

  // Iniciar el efecto después de un pequeño delay
  setTimeout(typeWriter, 500);
}

// Detectar modo oscuro del sistema
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  console.log('🌙 Modo oscuro detectado - Tema verde activado');
}

// Mostrar mensaje de bienvenida en consola
console.log('%c💻 Dev Repository', 'color: #00ff88; font-size: 24px; font-weight: bold;');
console.log('%c¡Bienvenido a mi portafolio de desarrollo!', 'color: #00cc66; font-size: 14px;');
console.log('%c¿Te gusta el código? Revisa el repositorio 🚀', 'color: #66ffaa; font-size: 12px;');
