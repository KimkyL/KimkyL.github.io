 // Funcionalidad del menú móvil
        document.getElementById('mobile-menu-btn').addEventListener('click', function() {
            const menu = document.getElementById('mobile-menu');
            menu.classList.toggle('hidden');
        });

        // Funcionalidad de filtros
        const filterButtons = document.querySelectorAll('.filter-btn');
        const projectCards = document.querySelectorAll('.project-card');

        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remover clase active de todos los botones
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Agregar clase active al botón clickeado
                this.classList.add('active');

                const filter = this.getAttribute('data-filter');

                projectCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.classList.remove('hidden');
                        card.classList.remove('fade-out');
                    } else {
                        card.classList.add('fade-out');
                        setTimeout(() => {
                            card.classList.add('hidden');
                        }, 250);
                    }
                });
            });
        });

    // Hecho por antropic ---^ lo de arrbiba lo de abajo lo hice yo

        // Funcionalidad del modal
        const modal = document.getElementById('projectModal');
        const modalContent = document.getElementById('modalContent');
        const closeBtn = document.getElementsByClassName('close')[0];
        //Esta funcion se entrega al css del Tailwind, ojo no puede ser cambiado ya que puede ocasionar errores y su posterior fallo.
        
        function openProject(projectId) {
            const projectData = getProjectData(projectId);

            let botonesHTML = '';


            //Anillacion de codigo ya lo se if if, pero porque se hace un if y no un else? Bueno sencillo porque no estamos creando un este que diga que si el proyectdata que es la Liveurl
            if (projectData.urlpagina && projectData.urlpagina !== "#" ){
                botonesHTML += `
                 <a href="${projectData.urlpagina}" target="_blank" class="glass-card px-6 py-2 rounded-lg hover:bg-[#96d2d3] hover:bg-opacity-25 transition-all">
                    Ver URL.
                </a> `;
            }

             if (projectData.githubUrl && projectData.githubUrl !== "#"){
                botonesHTML += `
                 <a href="${projectData.githubUrl}" target="_blank" class="glass-card px-6 py-2 rounded-lg hover:bg-[#96d2d3] hover:bg-opacity-25 transition-all">
                    Ver GitHub
                </a> `;
            }

            //Comprueba si la variable projectdata tiene estos puntos en un archivo
            const esimagen = projectData.imagen && (
                    projectData.imagen.includes('.png') || 
                    projectData.imagen.includes('.jpg') || 
                    projectData.imagen.includes('.jpeg') || 
                    projectData.imagen.includes('.gif') || 
                    projectData.imagen.includes('.svg') ||
                    projectData.imagen.includes('/') ||
                    projectData.imagen.startsWith('http') ||
                    projectData.imagen.startsWith('https')
            )

            const iconoHTML = esimagen
              ? `<img src="${projectData.imagen}" alt="iconouwu" class="w-128 h-128 mx-auto mb-4 rounded-lg object-cover">` 
              : `<div class="text-6xl mb-4 text-center">${projectData.imagen}</div>`;
            

            modalContent.innerHTML = `
                <h2 class="text-4xl font-strong mb-4 text-white">${projectData.title}</h2>
                <div class="mb-6">
                    ${iconoHTML}        
                    <p class="text-gray-300 mb-4">${projectData.description}</p>
                    <div class="flex flex-wrap gap-2 mb-6">
                        ${projectData.technologies.map(tech => `<span class="tech-tag px-3 py-1 rounded-full text-xs">${tech}</span>`).join('')}
                    </div>
                </div>
                <div class="space-y-4">
                    <div>
                        <h3 class="text-xl font-light mb-2 text-white">Características principales:</h3>
                        <ul class="text-gray-300 space-y-1">
                            ${projectData.features.map(feature => `<li>• ${feature}</li>`).join('')}
                        </ul>
                    </div>
                    <div>
                        <h3 class="text-xl font-light mb-2 text-white">Desafíos técnicos:</h3>
                        <p class="text-gray-300">${projectData.challenges}</p>
                    </div>
                        ${botonesHTML ? `<div class="flex gap-4 mt-6">${botonesHTML}</div>` : ''}
                    </div>
                </div>
            `;
            modal.style.display = 'block';
        }

        closeBtn.onclick = function() {
            modal.style.display = 'none';
        }

        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        }

        // Datos de los proyectos
        function getProjectData(projectId) {
            const projects = {
          
                 'Test': {
                    title: 'Test',
                    imagen: '',
                    description: 'Pruebas, si ves esto es que si funciona el js.',
                    technologies: ['.', '.', '.', '.'],

                    features: [
                        'test',
                        'test',
                        'test',
                        'test',
                        'test',
                        'test'
                    ],
                    challenges: 'Test',
                    urlpagina: '#',
                    githubUrl: '#'
                },

                  'RaccoonsFRCcode': {
                    title: 'Codigo Java, con subsistema Command-Based',
                    imagen: '/Recursos/FRClogo.svg',
                    description: 'Es el codigo del robot para racooons creado por mi y cambiando el antiguo, Timed-Robot a Command-Based',
                    technologies: ['Java', 'Gradlew', 'WPILib'],

                    features: [
                        'Usa Command-Based en lugar de Timed-Robot',
                        'Tiene Garra, Elevador y movimiento',
                        'El codigo sera usado para nuevas generaciones',
                        'Usa Neumatica, como solenoides y compresores.'
                    ],
                    challenges: 'El problema que tuvimos mucho fue la logica del Solenoide.',
                    urlpagina: '#',
                    githubUrl: 'https://github.com/KimkyL/Robot-Code-2025-2026'
                }
                // Proximamente agregaremos mas proyectos
            };
            
            return projects[projectId] || {
                title: 'Proyecto',
                imagen: '💻',
                description: 'Descripción del proyecto...',
                technologies: ['JavaScript'],
                features: ['Funcionalidad principal'],
                challenges: 'Desafío principal...',
                urlpagina: '/',
                githubUrl: '/'
            };
            //En caso de no tener nigun tipo de ID se mantendra en un test o sin nada que dar.
        }

        // Función para descargar CV
        function DescargadeCV() {
             // Crea un enlace para descargar el cv
            const link = document.createElement('a');
            link.href = '/Recursos/Portafolio Estilo Hardvard-Cesar Augusto.pdf';
            link.download = '/Recursos/Portafolio Estilo Hardvard-Cesar Augusto.pdf';// Aqui seria la URL o directorio donde se encuentra
            link.click();
            
            // Mostrar mensaje (opcional)
            //alert('Uwu para ti si logras descomentarlo.');
        }

        // Animaciones de entrada
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.project-card').forEach(card => {
            observer.observe(card);
        });