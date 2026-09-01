/**
 * Allied Agencies Cochin - Core Application Script
 * Handled hydration, dynamic filtering, lazy features, and UI transitions.
 */

// Embedded Fallback Data
const FALLBACK_PRODUCTS = [
    {
        "id": "submersible-pumps",
        "name": "Submersible Pumps",
        "category": "Domestic",
        "categoryColor": "bg-blue-500",
        "badgeColor": "green",
        "description": "High-efficiency multi-stage submersible pumps engineered for open wells, borewells, and overhead tanks, delivering dependable water flow for homes and residential complexes.",
        "image": "https://imgs.search.brave.com/xiHHj4X1WWyxCLDVHmeW85noeiXzz8Lgs5xoA7merR8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi93YXRl/ci1wdW1wLWlzb2xh/dGVkLXdoaXRlLWJh/Y2tncm91bmQtMzYx/NDMwNzUuanBn",
        "featured": true,
        "status": "available"
    },
    {
        "id": "self-priming-pumps",
        "name": "Self-Priming Pumps",
        "category": "Domestic",
        "categoryColor": "bg-blue-500",
        "badgeColor": "green",
        "description": "Compact, high-suction self-priming regenerative monoblock pumps designed for municipal line suction, overhead storage filling, and domestic water network boosting.",
        "image": "https://imgs.search.brave.com/TXye1a89T0ewL9SogMBDCnFmc2dYltSDucGM_o7QCWA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NzFhdlZneWNYTEwu/anBn",
        "featured": true,
        "status": "available"
    },
    {
        "id": "centrifugal-pumps",
        "name": "Centrifugal Pumps",
        "category": "Industrial",
        "categoryColor": "bg-red-500",
        "badgeColor": "green",
        "description": "Heavy-duty industrial centrifugal pumps designed for continuous fluid transmission, cooling tower circulation, HVAC plants, and chemical processing facilities.",
        "image": "https://imgs.search.brave.com/GRTKq807Aj1r3Pzhun1mBFNmNWKhmsTmv0Xk_BFQcnM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9oYXZl/bGxzLmNvbS9tZWRp/YS9jYXRhbG9nL3By/b2R1Y3QvY2FjaGUv/YmViYjU1NmNjYWEw/NDIzNjI2MWQ4YmE1/Njc2ZGRmNGQvYy9l/L2NlbnRyaWZ1Z2Fs/X21vbm9ibG9ja19w/dW1wX2Jhc2VfOS5q/cGc",
        "featured": true,
        "status": "available"
    },
    {
        "id": "sewage-pumps",
        "name": "Sewage/Drainage Pumps",
        "category": "Industrial",
        "categoryColor": "bg-red-500",
        "badgeColor": "green",
        "description": "Heavy-duty submersible cutter and non-clog effluent pumps engineered for basement dewatering, septic tanks, stormwater drainage, and commercial wastewater management.",
        "image": "https://imgs.search.brave.com/-J_HcpMF0pVfVq-lCQi9V_fgJeF5jb4tVy_ElJqSPfY/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMxLmluZHVzdHJ5/YnV5aW5nLmNvbS9w/cm9kdWN0cy9wdW1w/cy9zZXdhZ2UtcHVt/cHMvc2V3YWdlLXN1/Ym1lcnNpYmxlLXB1/bXBzL1BVTS5TRVcu/NDYwNzMyODBfMTY4/Nzk1NDYwOTc1Ni53/ZWJw",
        "featured": true,
        "status": "available"
    },
    {
        "id": "agricultural-pumps",
        "name": "Agricultural Monoblock Pumps",
        "category": "Agriculture",
        "categoryColor": "bg-green-500",
        "badgeColor": "green",
        "description": "High-discharge open-well and monoblock irrigation pumps built to withstand harsh rural conditions while optimizing farm hydration, canal lifting, and sprinkler networks.",
        "image": "https://imgs.search.brave.com/G2Ya46-urLhLXnW_6NbcVIYjbPft9FzXVkHHZfGti7Q/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly81Lmlt/aW1nLmNvbS9kYXRh/NS9TRUxMRVIvRGVm/YXVsdC8yMDI2LzUv/NjA4NzI5Mzg2L0ta/L0hQL0pILzE0NzY1/MTE4NC9hZ3JpY3Vs/dHVyZS1tb25vYmxv/Y2stcHVtcHNldC0y/NTB4MjUwLmpwZWc",
        "featured": true,
        "status": "available"
    },
    {
        "id": "water-level-controller",
        "name": "Water Level Controller",
        "category": "Agriculture",
        "categoryColor": "bg-green-500",
        "badgeColor": "green",
        "description": "Advanced microcontroller-based automated water level controller with built-in dry-run protection, voltage surge safeguards, and automated reservoir monitoring for agricultural pump sets.",
        "image": "https://imgs.search.brave.com/Z9E2ZnuKdO9vRZ6kWLew3QqpXTW9QrTsTq916IOCiE8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly92aWRl/b24uaW4vaW1hZ2Vz/L3dhdGVyLWxldmVs/LWNvbnRyb2xsZXIv/dGhyZWUxLmpwZw",
        "featured": true,
        "status": "available"
    },
    {
        "id": "pressure-boosters",
        "name": "Pressure Booster Systems",
        "category": "Commercial",
        "categoryColor": "bg-purple-500",
        "badgeColor": "green",
        "description": "Intelligent automated multi-stage pressure booster pump systems that ensure constant, high-pressure water delivery across luxury villas, hotels, and commercial buildings.",
        "image": "https://imgs.search.brave.com/32Eb1ZWINt9_d2mjuLurynh6wpwnP7Xi49GWUdud01E/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NTFTdXFxK2ZkMkwu/anBn",
        "featured": true,
        "status": "available"
    }
];

const FALLBACK_BRANDS = [
    {
        "id": "kirloskar",
        "name": "Kirloskar",
        "logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQLt5SpzYRqMF59D3SyJaYxlAMgbEkKDbyLb2a1tQu4w&s"
    },
    {
        "id": "v-guard",
        "name": "V-Guard",
        "logo": "https://companieslogo.com/img/orig/VGUARD.NS_BIG-4b6923b2.png?t=1746796117"
    },
    {
        "id": "texmo",
        "name": "Texmo",
        "logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMZZ51CH2wDjdzVSGwxVaCODPrti384_FG3nxs4VIcyQ&s=10"
    },
    {
        "id": "ellai-laxmi",
        "name": "Sri Ellai Laxmi",
        "logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTT0wcA2vwHjcKYUHbTP9qnT6lVh5zbGk_A5TmXmXp1OA&s=10"
    },
    {
        "id": "ksb",
        "name": "KSB",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/1/1c/Official_KSB_Aktiengesellschaft_Logo.png"
    },
    {
        "id": "wilo",
        "name": "Wilo",
        "logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2TRqyX-8BWPtlC6u1meO3IULKS1XSFs4XM--XQ2v0u4cORQJLkmb203A&s=10"
    }
];

const FALLBACK_CONTACT = {
    "whatsappNumber": "919495977454",
    "displayPhone": "+91 94959 77454",
    "email": "andrewsallied@gmail.com",
    "address": "Mukkadackal Buildings,\nHill Palace Rd, Thrippunithura,\nKochi, Kerala 682301",
    "hours": "10:00 AM – 7:00 PM",
    "days": "Mon — Sat",
    "mapEmbedUrl": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3929.843463094383!2d76.34906435714718!3d9.946979262202058!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b08736fb5d50c73%3A0xe4a9dbcb890ad55f!2sAllied%20Agencies%20Cochin!5e0!3m2!1sen!2sin!4v1769162231967"
};

// Global App States
let products = [];
let brands = [];
let contact = {};

/**
 * Security: HTML Escaping Helper to mitigate XSS vulnerabilities
 */
function escapeHTML(str) {
    if (str === null || str === undefined) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

/**
 * Security: URL Protocol Validator
 */
function sanitizeURL(url) {
    if (!url || typeof url !== 'string') return '';
    const trimmed = url.trim();
    if (trimmed.startsWith('https://') || trimmed.startsWith('http://') || trimmed.startsWith('data:image/') || trimmed.startsWith('tel:') || trimmed.startsWith('mailto:')) {
        return trimmed;
    }
    return '';
}

/**
 * Hydrates data from local JSON files with graceful fallback
 */
async function loadData() {
    try {
        const [productsRes, brandsRes, contactRes] = await Promise.all([
            fetch('src/data/products.json'),
            fetch('src/data/brands.json'),
            fetch('src/data/contact.json')
        ]);

        if (productsRes.ok && brandsRes.ok && contactRes.ok) {
            products = await productsRes.json();
            brands = await brandsRes.json();
            contact = await contactRes.json();
            console.log('Loaded live data from JSON files.');
        } else {
            throw new Error('One or more JSON files failed to load.');
        }
    } catch (error) {
        console.warn('Using fallback data structure.', error);
        products = FALLBACK_PRODUCTS;
        brands = FALLBACK_BRANDS;
        contact = FALLBACK_CONTACT;
    }
}

/**
 * Navigation Bar Scroll Trigger Behavior
 */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;

    const handleScroll = () => {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
            navbar.classList.remove('transparent');
        } else {
            navbar.classList.remove('scrolled');
            navbar.classList.add('transparent');
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // Smooth scroll for internal hashes
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = navbar.offsetHeight;
                const offsetPosition = targetElement.offsetTop - navHeight + 5;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Mobile Drawer Menu Overlay Transitions
 */
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenuClose = document.getElementById('mobile-menu-close');
    const mobileMenu = document.getElementById('mobile-menu');

    if (!mobileMenuBtn || !mobileMenuClose || !mobileMenu) return;

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    mobileMenuClose.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

/**
 * Element Scroll Entrance Animations
 */
function initScrollReveal() {
    const observerOptions = {
        threshold: 0.05,
        rootMargin: '0px 0px -40px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

/**
 * Partner Brand Slider Marquee
 */
function initBrandsMarquee() {
    const marquee = document.getElementById('partners-marquee');
    if (!marquee || !brands.length) return;

    const brandsList = [...brands, ...brands];

    marquee.innerHTML = brandsList.map(brand => {
        const logoUrl = sanitizeURL(brand.logo);
        const name = escapeHTML(brand.name);
        return `
            <div class="partner-card">
                <img src="${logoUrl}" alt="${name}" class="brand-logo" loading="lazy">
            </div>
        `;
    }).join('');
}

/**
 * Dynamic Products Gallery with Filtering and Pagination
 */
function initProductGallery() {
    const filterContainer = document.getElementById('gallery-filters');
    const grid = document.getElementById('product-grid');
    const loadMoreContainer = document.getElementById('load-more-container');
    const loadMoreBtn = document.getElementById('load-more-btn');

    if (!grid || !filterContainer) return;

    const BATCH_SIZE = 6;
    let visibleCount = BATCH_SIZE;
    let activeCategory = 'All';

    const categories = ['All', ...new Set(products.map(p => p.category).filter(Boolean))];

    filterContainer.innerHTML = categories.map(cat => {
        const escapedCat = escapeHTML(cat);
        const escapedId = escapeHTML(cat.toLowerCase().replace(/[^a-z0-9]/g, '-'));
        return `
            <button class="filter-btn ${cat === 'All' ? 'active' : ''}" data-category="${escapedCat}" id="filter-btn-${escapedId}">
                ${escapedCat}
            </button>
        `;
    }).join('');

    filterContainer.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            filterContainer.querySelector('.filter-btn.active')?.classList.remove('active');
            this.classList.add('active');

            activeCategory = this.getAttribute('data-category');
            visibleCount = BATCH_SIZE;
            renderProductCards(activeCategory);
        });
    });

    if (loadMoreBtn) {
        loadMoreBtn.onclick = () => {
            visibleCount += BATCH_SIZE;
            renderProductCards(activeCategory);
        };
    }

    const renderProductCards = (category) => {
        const filtered = category === 'All'
            ? products
            : products.filter(p => p.category === category);

        const visibleProducts = filtered.slice(0, visibleCount);

        grid.innerHTML = visibleProducts.map(p => {
            const rawImage = p.image || '';
            const imageSrc = sanitizeURL(rawImage.includes('unsplash')
                ? `${rawImage.split('?')[0]}?auto=format&fit=crop&w=600&q=60`
                : rawImage);

            const name = escapeHTML(p.name);
            const description = escapeHTML(p.description);
            const cat = escapeHTML(p.category);
            const catColor = escapeHTML(p.categoryColor || '');
            const badgeColor = escapeHTML(p.badgeColor || 'green');
            const status = escapeHTML(p.status || 'available');
            const id = escapeHTML(p.id || 'item');

            const cleanWa = (contact.whatsappNumber || '919495977454').toString().replace(/[^0-9]/g, '');
            const whatsappText = encodeURIComponent(`Hello Allied Agencies, I am interested in: ${p.name || 'Water Pump'}. Could you share detailed specifications and pricing?`);

            return `
                <div class="product-card reveal">
                    <div class="product-image">
                        <img src="${imageSrc}" alt="${name}" loading="lazy">
                        <span class="product-category ${catColor}">${cat}</span>
                    </div>
                    <div class="product-content">
                        <h3 class="product-title">${name}</h3>
                        <p class="product-desc">${description}</p>
                        <div class="product-actions">
                            <span class="product-badge badge-${badgeColor}">${status}</span>
                            <a href="https://wa.me/${cleanWa}?text=${whatsappText}" 
                               class="product-link" 
                               target="_blank" 
                               rel="noopener noreferrer"
                               id="product-link-${id}"
                               aria-label="Inquire about ${name} on WhatsApp">
                                Inquire
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                    <path d="M5 12h14M12 5l7 7-7 7"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        if (loadMoreContainer) {
            if (filtered.length > visibleCount) {
                loadMoreContainer.style.display = 'block';
                setTimeout(() => loadMoreContainer.classList.add('active'), 50);
            } else {
                loadMoreContainer.style.display = 'none';
                loadMoreContainer.classList.remove('active');
            }
        }

        initScrollReveal();
    };

    renderProductCards('All');
}

/**
 * Hydrates Contact Details & Widgets
 */
function initContactInfo() {
    const address = document.getElementById('contact-address');
    const phone = document.getElementById('contact-phone');
    const email = document.getElementById('contact-email');
    const days = document.getElementById('contact-days');
    const hours = document.getElementById('contact-hours');
    const whatsappFloat = document.getElementById('whatsapp-float-widget');

    const cleanWa = (contact.whatsappNumber || '919495977454').toString().replace(/[^0-9]/g, '');

    if (address && contact.address) address.innerHTML = contact.address.replace(/\n/g, '<br>');
    if (phone && contact.displayPhone) {
        phone.textContent = contact.displayPhone;
        phone.setAttribute('href', `tel:${cleanWa ? '+' + cleanWa : '+919495977454'}`);
    }
    if (email && contact.email) {
        email.textContent = contact.email;
        email.setAttribute('href', `mailto:${contact.email}`);
    }
    if (days && contact.days) days.textContent = contact.days;
    if (hours && contact.hours) hours.textContent = contact.hours;
    if (whatsappFloat) {
        whatsappFloat.setAttribute('href', `https://wa.me/${cleanWa}`);
    }
}

/**
 * Deferred Map Loading
 */
function initDeferredMap() {
    const mapContainer = document.querySelector('.map-container');
    const mapFrame = document.getElementById('contact-map');
    const placeholder = document.getElementById('map-placeholder');

    if (!mapContainer || !mapFrame || !placeholder) return;

    const mapObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (contact.mapEmbedUrl) {
                    mapFrame.setAttribute('src', contact.mapEmbedUrl);
                }
                mapObserver.unobserve(mapContainer);
            }
        });
    }, { rootMargin: '100px 0px' });

    mapObserver.observe(mapContainer);

    mapFrame.addEventListener('load', () => {
        placeholder.classList.add('hidden');
        mapFrame.classList.add('loaded');
        setTimeout(() => {
            placeholder.style.display = 'none';
        }, 800);
    });
}

// Bootstrap
document.addEventListener('DOMContentLoaded', async () => {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    await loadData();

    initNavigation();
    initMobileMenu();
    initBrandsMarquee();
    initProductGallery();
    initContactInfo();
    initDeferredMap();
    initScrollReveal();

    document.body.classList.add('loaded');
});
