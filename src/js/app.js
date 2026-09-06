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
        "image": "src/images/submersible-pumps.png",
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
        "image": "src/images/self-priming-pumps.png",
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
        "image": "src/images/centrifugal-pumps.png",
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
        "image": "src/images/sewage-pumps.png",
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
        "image": "src/images/agricultural-pumps.png",
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
        "image": "src/images/water-level-controller.png",
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
        "image": "src/images/pressure-boosters.png",
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
 * Security: URL Protocol Validator (supports HTTPS, HTTP, Data URIs, relative assets)
 */
function sanitizeURL(url) {
    if (!url || typeof url !== 'string') return '';
    const trimmed = url.trim();
    if (trimmed.startsWith('https://') || 
        trimmed.startsWith('http://') || 
        trimmed.startsWith('data:image/') || 
        trimmed.startsWith('tel:') || 
        trimmed.startsWith('mailto:') ||
        trimmed.startsWith('src/') ||
        trimmed.startsWith('/') ||
        trimmed.startsWith('./')) {
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

    const openMenu = () => {
        mobileMenu.classList.add('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
    };

    const closeMenu = () => {
        mobileMenu.classList.remove('active');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    };

    mobileMenuBtn.addEventListener('click', openMenu);
    mobileMenuClose.addEventListener('click', closeMenu);

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Keyboard navigation: Close mobile drawer on Escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMenu();
        }
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
                <img src="${logoUrl}" alt="${name} Logo" class="brand-logo" width="160" height="60" loading="lazy" onerror="this.onerror=null; this.parentElement.style.opacity='0.6';">
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
            <button class="filter-btn ${cat === 'All' ? 'active' : ''}" data-category="${escapedCat}" id="filter-btn-${escapedId}" type="button">
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
                        <img src="${imageSrc}" alt="${name}" width="400" height="300" loading="lazy" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=600&q=60';">
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
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
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
 * Deferred Map Loading via IntersectionObserver
 */
function initDeferredMap() {
    const mapContainer = document.querySelector('.map-container');
    const mapFrame = document.getElementById('contact-map');
    const placeholder = document.getElementById('map-placeholder');

    if (!mapContainer || !mapFrame || !placeholder) return;

    mapFrame.addEventListener('load', () => {
        if (mapFrame.src && mapFrame.src !== 'about:blank') {
            placeholder.classList.add('hidden');
            mapFrame.classList.add('loaded');
            setTimeout(() => {
                placeholder.style.display = 'none';
            }, 600);
        }
    });

    const loadMapSrc = () => {
        const dataSrc = mapFrame.getAttribute('data-src');
        if (dataSrc && (!mapFrame.src || mapFrame.src === 'about:blank' || mapFrame.src.endsWith('about:blank'))) {
            mapFrame.src = dataSrc;
        }
    };

    if ('IntersectionObserver' in window) {
        const mapObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    loadMapSrc();
                    mapObserver.unobserve(entry.target);
                }
            });
        }, { rootMargin: '300px' });

        mapObserver.observe(mapContainer);
    } else {
        // Fallback for legacy environments
        setTimeout(loadMapSrc, 2000);
    }
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
});
