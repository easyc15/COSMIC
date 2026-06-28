document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Theme & Config Data
    const root = document.documentElement;
    root.style.setProperty('--primary-color', config.colors.primary);
    root.style.setProperty('--secondary-color', config.colors.secondary);
    root.style.setProperty('--bg-color', config.colors.background);
    root.style.setProperty('--text-color', config.colors.text);
    if(config.colors.surface) root.style.setProperty('--surface-color', config.colors.surface);

    document.title = `${config.businessName} - Salon`;
    document.getElementById('footer-brand-name').textContent = config.businessName;
    document.getElementById('footer-copy-brand').textContent = config.businessName;
    document.getElementById('hero-subtitle').textContent = config.heroSubtitle;
    document.getElementById('about-text').textContent = config.aboutText;

    const brandLogo = document.getElementById('brand-logo');
    if (config.logo) {
        brandLogo.src = config.logo;
        brandLogo.style.display = 'inline-block';
        document.getElementById('brand-name').style.display = 'none';
    } else {
        document.getElementById('brand-name').textContent = config.businessName;
    }

    document.getElementById('current-year').textContent = new Date().getFullYear();

    document.getElementById('contact-address').innerHTML = `${config.contact.address}`;
    document.getElementById('contact-phone').innerHTML = `${config.contact.phone}`;
    document.getElementById('contact-email').innerHTML = `${config.contact.email}`;

    const whatsappBtn = document.getElementById('whatsapp-btn');
    const message = encodeURIComponent(`Hello ${config.businessName}, I would like to book an appointment.`);
    whatsappBtn.href = `https://wa.me/${config.contact.whatsappNumber}?text=${message}`;

    // Populate Counters
    document.getElementById('count-years').setAttribute('data-target', config.counters.yearsExperience);
    document.getElementById('count-services').setAttribute('data-target', config.counters.servicesOffered);
    document.getElementById('count-clients').setAttribute('data-target', config.counters.happyClients);

    // Populate Services Grid
    const servicesList = document.getElementById('services-list');
    config.services.forEach((item, index) => {
        const itemCard = document.createElement('div');
        itemCard.className = 'card reveal';
        itemCard.style.transitionDelay = `${index * 0.1}s`;
        itemCard.innerHTML = `
            <span class="card-icon">${item.icon}</span>
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <div class="card-price">${item.price}</div>
        `;
        servicesList.appendChild(itemCard);
    });

    // Map
    const mapContainer = document.getElementById('map-container');
    if (config.contact.mapUrl) {
        mapContainer.innerHTML = `<iframe src="${config.contact.mapUrl}" allowfullscreen="" loading="lazy"></iframe>`;
    }

    // 2. Page Loader Removal
    window.addEventListener('load', () => {
        const loader = document.getElementById('loader');
        loader.style.opacity = '0';
        setTimeout(() => loader.style.display = 'none', 500);
        typeWriter();
    });

    // 3. Typewriter Effect
    const typeWriterElement = document.getElementById('typewriter');
    const text = config.businessName;
    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            typeWriterElement.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 150);
        }
    }

    // 4. Navbar & Back to Top
    const header = document.getElementById('header');
    const backToTop = document.getElementById('back-to-top');
    const progressCircle = document.getElementById('scroll-progress');
    const circumference = 2 * Math.PI * 10;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) header.classList.add('scrolled');
        else header.classList.remove('scrolled');

        let scrollPos = window.scrollY;
        let docHeight = document.body.scrollHeight - window.innerHeight;
        let scrollPercent = scrollPos / docHeight;

        if (scrollPos > 300) backToTop.classList.add('visible');
        else backToTop.classList.remove('visible');

        progressCircle.style.strokeDashoffset = circumference - (scrollPercent * circumference);
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 5. Mobile Hamburger Menu
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if(targetElement) targetElement.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // 6. Scroll Reveal & Counters
    const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    let countersStarted = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                if (entry.target.classList.contains('counters') && !countersStarted) {
                    countersStarted = true;
                    startCounters();
                }
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => { observer.observe(el); });

    function startCounters() {
        const counters = document.querySelectorAll('.counter');
        const speed = 200;
        counters.forEach(counter => {
            const animate = () => {
                const value = +counter.getAttribute('data-target');
                const data = +counter.innerText;
                const time = value / speed;
                if (data < value) {
                    counter.innerText = Math.ceil(data + time);
                    setTimeout(animate, 10);
                } else {
                    counter.innerText = value;
                }
            }
            animate();
        });
    }
});