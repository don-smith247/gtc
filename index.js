     document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
            this.classList.toggle('menu-active');
            document.querySelector('.nav-links').classList.toggle('active');
            document.querySelector('.menu-overlay').classList.toggle('active');
            
            // Prevent body scrolling when menu is open
            document.body.style.overflow = this.classList.contains('menu-active') ? 'hidden' : '';
        });
        
        // Close menu when clicking overlay
        document.querySelector('.menu-overlay').addEventListener('click', function() {
            document.querySelector('.mobile-menu-btn').classList.remove('menu-active');
            document.querySelector('.nav-links').classList.remove('active');
            document.querySelector('.menu-overlay').classList.remove('active');
            document.body.style.overflow = '';
        });
 
 document.addEventListener('DOMContentLoaded', function() {
      const particles = document.querySelector('.particles');
      const particleCount = 30;
      
      for (let i = 0; i < particleCount; i++) {
        createParticle(particles);
      }
      
      // Create counter animation for stats
      const statNumbers = document.querySelectorAll('.stat-number');
      
      const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
      };
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateValue(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);
      
      statNumbers.forEach(stat => {
        if (!stat.textContent.includes('April')) {
          observer.observe(stat);
        }
      });

      // Add smooth scrolling for anchor links
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop,
              behavior: 'smooth'
            });
          }
        });
      });
    });
    
    function createParticle(container) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      // Random size
      const size = Math.random() * 20 + 5;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Random position
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      
      // Random animation duration and delay
      const duration = Math.random() * 30 + 15;
      const delay = Math.random() * 5;
      particle.style.animation = `float ${duration}s ${delay}s infinite linear`;
      
      container.appendChild(particle);
    }
    
    function animateValue(obj) {
      const text = obj.textContent;
      let value = parseInt(text);
      
      if (isNaN(value)) {
        return;
      }
      
      const suffix = text.replace(/[0-9]/g, '');
      const duration = 2000;
      const start = 0;
      const end = value;
      const startTime = new Date().getTime();
      
      const timer = setInterval(function() {
        const time = new Date().getTime() - startTime;
        const val = Math.floor(easeOutQuad(time, start, end - start, duration));
        
        if (time >= duration) {
          clearInterval(timer);
          obj.textContent = end + suffix;
        } else {
          obj.textContent = val + suffix;
        }
      }, 20);
    }
    
    function easeOutQuad(t, b, c, d) {
      return -c * (t /= d) * (t - 2) + b;
    }