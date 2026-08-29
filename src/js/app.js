/**
 * Allied Agencies Cochin - Core Application Script
 * Handled hydration, dynamic filtering, lazy features, and UI transitions.
 */

// Embedded Fallback Data
const FALLBACK_PRODUCTS = [
    {
        "id": "submersible-pumps",
        "name": "Submersible Pumps",
        "category": "Residential",
        "categoryColor": "bg-blue-500",
        "badgeColor": "green",
        "description": "High-efficiency, multi-stage submersible pumps engineered for borewells and open wells, providing consistent water flow for homes.",
        "image": "https://images.unsplash.com/photo-1564769625744-392248449b1c?auto=format&fit=crop&w=700&q=50",
        "featured": true,
        "status": "available"
    },
    {
        "id": "centrifugal-pumps",
        "name": "Centrifugal Pumps",
        "category": "Industrial",
        "categoryColor": "bg-red-500",
        "badgeColor": "green",
        "description": "Heavy-duty centrifugal pumps designed for continuous industrial fluid transmission, cooling systems, and process industries.",
        "image": "https://images.unsplash.com/photo-1581091012217-3c332b9b989c?auto=format&fit=crop&w=700&q=50",
        "featured": true,
        "status": "available"
    },
    {
        "id": "agricultural-pumps",
        "name": "Agricultural Pumps",
        "category": "Agriculture",
        "categoryColor": "bg-green-500",
        "badgeColor": "green",
        "description": "High-volume monoblock and sprinkler pumps built to withstand harsh rural environments while optimizing water distribution.",
        "image": "https://images.unsplash.com/photo-1560072816-61a1e425c60b?auto=format&fit=crop&w=700&q=50",
        "featured": true,
        "status": "available"
    },
    {
        "id": "solar-pumps",
        "name": "Solar Pumps",
        "category": "Renewable",
        "categoryColor": "bg-yellow-500",
        "badgeColor": "amber",
        "description": "Off-grid, solar-powered DC pumping systems optimized for irrigation and remote locations with zero operational power costs.",
        "image": "https://images.unsplash.com/photo-1509395062183-67c3a4117813?auto=format&fit=crop&w=700&q=50",
        "featured": true,
        "status": "available"
    },
    {
        "id": "pressure-boosters",
        "name": "Pressure Boosters",
        "category": "Commercial",
        "categoryColor": "bg-purple-500",
        "badgeColor": "green",
        "description": "Intelligent pressure-boosting pump sets that ensure constant, high-pressure water delivery across large villas, hotels, and apartments.",
        "image": "https://images.unsplash.com/photo-1581092528805-1b1cba13ef54?auto=format&fit=crop&w=700&q=50",
        "featured": true,
        "status": "available"
    },
    {
        "id": "water-treatment",
        "name": "Water Treatment Systems",
        "category": "Treatment",
        "categoryColor": "bg-teal-500",
        "badgeColor": "green",
        "description": "Custom filtration, softening, and reverse osmosis plants designed to deliver safe, purified water for residential and corporate use.",
        "image": "https://images.unsplash.com/photo-1560072816-61a1e425c60b?auto=format&fit=crop&w=700&q=50",
        "featured": true,
        "status": "available"
    }
];

const FALLBACK_BRANDS = [
    {
        "id": "kirloskar",
        "name": "Kirloskar",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Kirloskar_Group_Logo.svg/2560px-Kirloskar_Group_Logo.svg.png"
    },
    {
        "id": "v-guard",
        "name": "V-Guard",
        "logo": "https://companieslogo.com/img/orig/VGUARD.NS_BIG-4b6923b2.png?t=1746796117"
    },
    {
        "id": "texmo",
        "name": "Texmo",
        "logo": "https://texmo.com/wp-content/uploads/2021/03/texmo-logo.png"
    },
    {
        "id": "ellai-laxmi",
        "name": "Sri Ellai Laxmi",
        "logo": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2TRqyX-8BWPtlC6u1meO3IULKS1XSFs4XM--XQ2v0u4cORQJLkmb203A&s=10"
    },
    {
        "id": "ksb",
        "name": "KSB",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/1/1c/Official_KSB_Aktiengesellschaft_Logo.png"
    },
    {
        "id": "wilo",
        "name": "Wilo",
        "logo": "https://upload.wikimedia.org/wikipedia/commons/c/cd/WILO_Logo_2013.svg"
    }
];

const FALLBACK_CONTACT = {
    "whatsappNumber": "919495977454",
    "displayPhone": "+91 94959 77454",
    "email": "sales@alliedcochin.com",
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
        anchor.addEventListener('click', function(e) {
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

    const brandsList = [...brands, ...brands, ...brands];

    marquee.innerHTML = brandsList.map(brand => `
        <div class="partner-card">
            <img src="${brand.logo}" alt="${brand.name}" class="brand-logo" loading="lazy">
        </div>
    `).join('');
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

    const categories = ['All', ...new Set(products.map(p => p.category))];

    filterContainer.innerHTML = categories.map(cat => `
        <button class="filter-btn ${cat === 'All' ? 'active' : ''}" data-category="${cat}" id="filter-btn-${cat.toLowerCase()}">
            ${cat}
        </button>
    `).join('');

    filterContainer.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
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
            const imageSrc = p.image.includes('unsplash') 
                ? `${p.image.split('?')[0]}?auto=format&fit=crop&w=600&q=60` 
                : p.image;

            const whatsappText = encodeURIComponent(`Hello Allied Agencies, I am interested in: ${p.name}. Could you share detailed specifications and pricing?`);

            return `
                <div class="product-card reveal">
                    <div class="product-image">
                        <img src="${imageSrc}" alt="${p.name}" loading="lazy">
                        <span class="product-category ${p.categoryColor || ''}">${p.category}</span>
                    </div>
                    <div class="product-content">
                        <h3 class="product-title">${p.name}</h3>
                        <p class="product-desc">${p.description}</p>
                        <div class="product-actions">
                            <span class="product-badge badge-${p.badgeColor || 'green'}">${p.status || 'available'}</span>
                            <a href="https://wa.me/${contact.whatsappNumber || '919495977454'}?text=${whatsappText}" 
                               class="product-link" 
                               target="_blank" 
                               rel="noopener noreferrer"
                               id="product-link-${p.id}">
                               Inquire
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

    if (address && contact.address) address.innerHTML = contact.address.replace(/\n/g, '<br>');
    if (phone && contact.displayPhone) {
        phone.textContent = contact.displayPhone;
        phone.setAttribute('href', `tel:+${contact.whatsappNumber}`);
    }
    if (email && contact.email) {
        email.textContent = contact.email;
        email.setAttribute('href', `mailto:${contact.email}`);
    }
    if (days && contact.days) days.textContent = contact.days;
    if (hours && contact.hours) hours.textContent = contact.hours;
    if (whatsappFloat && contact.whatsappNumber) {
        whatsappFloat.setAttribute('href', `https://wa.me/${contact.whatsappNumber}`);
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
