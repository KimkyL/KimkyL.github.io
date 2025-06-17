    // Mobile menu toggle
        document.getElementById('mobile-menu-btn').addEventListener('click', function() {
            const mobileMenu = document.getElementById('mobile-menu');
            mobileMenu.classList.toggle('hidden');
        });

        // Funcion de descarga para un CV todo pitero
        function DescargadeCV() {
            const link = document.createElement('a');
            link.href = '/Recursos/Portafolio Estilo Hardvard-Cesar Augusto.pdf';
            link.download = '/Recursos/Portafolio Estilo Hardvard-Cesar Augusto.pdf';
            link.click();
            //alert('Cuanto te amo lo lograste -Cesar');
        }

        // Send Email function
        function sendEmail(event) {
            event.preventDefault();
            
            const formData = new FormData(event.target);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Crear mailto link
            const mailtoLink = `mailto:F1nkyDev@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`)}`;
            
            window.location.href = mailtoLink;
            
            // Mostrar mensaje de confirmación
            alert('Se abrirá tu cliente de correo para enviar el mensaje');
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
            card.addEventListener('mouseenter', () => {
                if (!card.classList.contains('social-btn')) {
                    card.style.transform = 'translateY(-8px)';
                    card.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.5)';
                }
            });
            
            card.addEventListener('mouseleave', () => {
                if (!card.classList.contains('social-btn')) {
                    card.style.transform = 'translateY(0)';
                    card.style.boxShadow = 'none';
                }
            });
        });
