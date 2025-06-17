//Si te lo preguntas, no no hice esto ya que en si js no entiendo mucho.
        // Menu movil para descargar
        document.getElementById('mobile-menu-btn').addEventListener('click', function() {
            const mobileMenu = document.getElementById('mobile-menu');
            mobileMenu.classList.toggle('hidden');
        });

        // Funcion de descarga del cv
        function downloadCV() {
            // Crea un enlace temporal para crear el Cv
            const link = document.createElement('a');
            link.href = 'Recursos/Portafolio Estilo Hardvard-Cesar Augusto.pdf';
            link.download = 'Recursos/Portafolio Estilo Hardvard-Cesar Augusto.pdf';
            link.click();
            
            // Mostrar mensaje (opcional)
            //alert('Tengo 5 pesos que haria con 90 varos?');
        }

        // Smooth scrolling
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

        // Chart.js, este se lo copie de un chart creado por tailwind, todavia no se .js
        const ctx = document.getElementById('skillChart').getContext('2d');
        const skillChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Desarrollador', 'Diseñador'],
                datasets: [{
                    data: [73, 37],
                    backgroundColor: [
                        'rgba(68, 209, 211, 0.5)',
                        'rgba(40, 45, 48, 0.3)'
                    ],
                    borderColor: [
                        'rgba(255, 255, 255, 1)',
                        'rgba(255, 255, 255, 0.5)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                cutout: '60%'
            }
        });

        // Animación de barras de progreso
        function animateSkillBars() {
            const skillBars = document.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const width = bar.getAttribute('data-width');
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width + '%';
                }, 500);
            });
        }

        // Observador de intersección para animaciones
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    
                    // Animar barras si están en la sección de skills
                    if (entry.target.querySelector('.skill-progress')) {
                        setTimeout(animateSkillBars, 500);
                    }
                }
            });
        }, observerOptions);

        // Aplicar animación a elementos
        document.querySelectorAll('.fade-in-up').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 1s ease-out';
            observer.observe(el);
        });

        // Efecto de hover elegante en las tarjetas
        document.querySelectorAll('.glass-card').forEach(card => {
            //Si el mouse se centra en el, este automaticamente hara estas dos funciones
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-8px)'; //Mueve hacia arrba 8 pixeles
                card.style.boxShadow = '0 15px 15px rgba(150, 210, 211, 0.75)'; //La caja tiene una sombra que se activa cuando se pone el raton cerca
            });
            
            card.addEventListener('mouseleave', () => { //Si el mouse se va
                card.style.transform = 'translateY(0)'; //Vuelve a su posicion original
                card.style.boxShadow = 'none';// No se le da color (bruh imagine using the same shadow lol.)
            });
        });