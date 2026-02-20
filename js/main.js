// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
});

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease',
        once: true
    });

    // Counter Animation (if needed)
    const counters = document.querySelectorAll('.counter');
    if (counters.length > 0) {
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.round(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(counter);
        });
    }
});

// hero section animation
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()";
const text1 = "Securing the Future";
const text2 = "Through Education";

function hackerTypeEffect(element, finalText, callback) {
  let iteration = 0;
  const interval = setInterval(() => {
    element.textContent = finalText
      .split("")
      .map((char, i) => {
        if (i < iteration) return finalText[i];
        return letters[Math.floor(Math.random() * letters.length)];
      })
      .join("");

    if (iteration >= finalText.length) {
      clearInterval(interval);
      if (callback) callback();
    }
    iteration += 1 / 2; // Speed
  }, 30);
}

function startAnimation() {
  const l1 = document.getElementById("line1");
  const l2 = document.getElementById("line2");

  l1.textContent = "";
  l2.textContent = "";

  hackerTypeEffect(l1, text1, () => {
    setTimeout(() => {
      hackerTypeEffect(l2, text2, () => {
        setTimeout(startAnimation, 3000); // 3s pause before repeating
      });
    }, 300);
  });
}

window.onload = startAnimation;

// FAQ Functionality (if needed)
function toggleFAQ(element) {
    if (!element) return;
    
    const content = element.nextElementSibling;
    const arrow = element.querySelector('svg');
    
    if (content && arrow) {
        content.classList.toggle('hidden');
        
        if (content.classList.contains('hidden')) {
            arrow.classList.remove('rotate-180');
        } else {
            arrow.classList.add('rotate-180');
        }
    }
}


// mobile menu
const menuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const hamburgerIcon = document.getElementById('hamburger-icon');

menuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('translate-y-[-100%]');
    mobileMenu.classList.toggle('fade-in');

    // Toggle hamburger icon to X with smooth animation
    if (mobileMenu.classList.contains('hidden')) {
        hamburgerIcon.classList.remove('fa-times');
        hamburgerIcon.classList.add('fa-bars');
        hamburgerIcon.style.transform = 'rotate(0deg)';
    } else {
        hamburgerIcon.classList.remove('fa-bars');
        hamburgerIcon.classList.add('fa-times');
        hamburgerIcon.style.transform = 'rotate(180deg)';
    }
});



