document.addEventListener('DOMContentLoaded', () => {
    // 1. Apply Theme Colors
    const root = document.documentElement;
    root.style.setProperty('--primary-color', config.colors.primary);
    root.style.setProperty('--secondary-color', config.colors.secondary);
    root.style.setProperty('--bg-color', config.colors.background);
    root.style.setProperty('--text-color', config.colors.text);

    // 2. Populate Basic Info
    document.title = `${config.businessName} - Restaurant`;

    const brandLogo = document.getElementById('brand-logo');
    if (config.logo) {
        brandLogo.src = config.logo;
        brandLogo.style.display = 'inline-block';
        document.getElementById('brand-name').style.display = 'none'; // Optional: hide text if logo exists
    } else {
        document.getElementById('brand-name').textContent = config.businessName;
    }
    document.getElementById('footer-brand').textContent = config.businessName;
    document.getElementById('hero-title').textContent = config.heroTitle;
    document.getElementById('hero-subtitle').textContent = config.heroSubtitle;
    document.getElementById('about-text').textContent = config.aboutText;

    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // 3. Populate Contact Info
    document.getElementById('contact-address').innerHTML = `📍 ${config.contact.address}`;
    document.getElementById('contact-phone').innerHTML = `📞 ${config.contact.phone}`;
    document.getElementById('contact-email').innerHTML = `✉️ ${config.contact.email}`;

    // 4. Set WhatsApp Link
    const whatsappBtn = document.getElementById('whatsapp-btn');
    const message = encodeURIComponent(`Hello ${config.businessName}, I would like to make a reservation.`);
    whatsappBtn.href = `https://wa.me/${config.contact.whatsappNumber}?text=${message}`;

    // 5. Populate Menu/Services
    const servicesList = document.getElementById('services-list');
    config.services.forEach(item => {
        const itemCard = document.createElement('div');
        itemCard.className = 'service-card';
        itemCard.innerHTML = `
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <p class="service-price">${item.price}</p>
        `;
        servicesList.appendChild(itemCard);
    });

    // 6. Embed Google Map
    const mapContainer = document.getElementById('map-container');
    if (config.contact.mapUrl) {
        mapContainer.innerHTML = `
            <iframe
                src="${config.contact.mapUrl}"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade">
            </iframe>
        `;
    } else {
        mapContainer.innerHTML = '<p>Map not available.</p>';
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});