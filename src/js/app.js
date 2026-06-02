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
        "logo": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/V-Guard_Industries_Logo.svg/2048px-V-Guard_Industries_Logo.svg.png"
    },
    {
        "id": "texmo",
        "name": "Texmo",
        "logo": "https://texmo.com/wp-content/uploads/2021/03/texmo-logo.png"
    },
    {
        "id": "cri-pumps",
        "name": "CRI Pumps",
        "logo": "https://www.cripumps.com/wp-content/uploads/2021/03/cri-logo.png"
    },
    {
        "id": "lubi",
        "name": "Lubi",
        "logo": "https://lubipumps.com/wp-content/uploads/2021/03/lubi-logo.png"
    }
];

const FALLBACK_CONTACT = {
    "whatsappNumber": "919846012345",
    "displayPhone": "+91 98460 12345",
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
 * Hydrates data from remote JSON files or falls back gracefully
 */
async function loadData() {
    try {
        const savedProducts = localStorage.getItem('products');
        const savedBrands = localStorage.getItem('brands');
        const savedContact = localStorage.getItem('contact');

        if (savedProducts && savedBrands && savedContact) {
            products = JSON.parse(savedProducts);
            brands = JSON.parse(savedBrands);
            contact = JSON.parse(savedContact);
            console.log('Loaded custom data from localStorage.');
            return;
        }

        const [productsRes, brandsRes, contactRes] = await Promise.all([
            fetch('src/data/products.json'),
            fetch('src/data/brands.json'),
            fetch('src/data/contact.json')
        ]);

        if (productsRes.ok && brandsRes.ok && contactRes.ok) {
            products = await productsRes.json();
            brands = await brandsRes.json();
            contact = await contactRes.json();
            console.log('Loaded data from JSON sources.');
        } else {
            throw new Error('JSON load failed. HTTP status error.');
        }
    } catch (error) {
        console.warn('Unable to load server files or localStorage. Hydrating fallback data.', error);
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
    handleScroll(); // Run once initially

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
        document.body.style.overflow = 'hidden'; // Stop scrolling behind active overlay
    });

    mobileMenuClose.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close mobile drawer when clicking menu items
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

/**
 * Handles element scroll entrance animations with IntersectionObserver
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
                revealObserver.unobserve(entry.target); // Trigger only once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
}

/**
 * Populates and runs the continuous partner brand slider marquee
 */
function initBrandsMarquee() {
    const marquee = document.getElementById('partners-marquee');
    if (!marquee) return;

    // We clone the brands array to fill the width of the marquee viewport loop
    const brandsList = [...brands, ...brands, ...brands];

    marquee.innerHTML = brandsList.map(brand => `
        <div class="partner-card">
            <img src="${brand.logo}" alt="${brand.name} Authorized Logo" class="brand-logo" loading="lazy">
        </div>
    `).join('');
}

/**
 * Hydrates, filters, and renders the dynamic products gallery with Load More pagination
 */
function initProductGallery() {
    const filterContainer = document.getElementById('gallery-filters');
    const grid = document.getElementById('product-grid');
    const loadMoreContainer = document.getElementById('load-more-container');
    const loadMoreBtn = document.getElementById('load-more-btn');

    if (!grid || !filterContainer) return;

    // Pagination Constants
    const BATCH_SIZE = 3;
    let visibleCount = BATCH_SIZE;
    let activeCategory = 'All';

    // Create set of unique categories
    const categories = ['All', ...new Set(products.map(p => p.category))];

    // Build filter button markup
    filterContainer.innerHTML = categories.map(cat => `
        <button class="filter-btn ${cat === 'All' ? 'active' : ''}" data-category="${cat}" id="filter-btn-${cat.toLowerCase()}">
            ${cat}
        </button>
    `).join('');

    // Handle filter switching
    filterContainer.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            filterContainer.querySelector('.filter-btn.active').classList.remove('active');
            this.classList.add('active');
            
            activeCategory = this.getAttribute('data-category');
            visibleCount = BATCH_SIZE; // Reset page count on filter switch
            renderProductCards(activeCategory);
        });
    });

    // Handle Load More click
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            visibleCount += BATCH_SIZE;
            renderProductCards(activeCategory);
        });
    }

    // Render cards function
    const renderProductCards = (category) => {
        const filtered = category === 'All' 
            ? products 
            : products.filter(p => p.category === category);

        // Slice products to limit visible items
        const visibleProducts = filtered.slice(0, visibleCount);

        grid.innerHTML = visibleProducts.map(p => {
            // Apply responsive parameters for Unsplash URLs
            const imageSrc = p.image.includes('unsplash') 
                ? `${p.image.split('?')[0]}?auto=format&fit=crop&w=600&q=60` 
                : p.image;

            const whatsappText = encodeURIComponent(`Hello Allied Agencies, I am interested in learning more about your product: ${p.name}. Could you share detailed specifications and pricing?`);

            return `
                <div class="product-card reveal">
                    <div class="product-image">
                        <img src="${imageSrc}" alt="${p.name}" loading="lazy">
                        <span class="product-category ${p.categoryColor}">${p.category}</span>
                    </div>
                    <div class="product-content">
                        <h3 class="product-title">${p.name}</h3>
                        <p class="product-desc">${p.description}</p>
                        <div class="product-actions">
                            <span class="product-badge badge-${p.badgeColor}">${p.status}</span>
                            <a href="https://wa.me/${contact.whatsappNumber}?text=${whatsappText}" 
                               class="product-link" 
                               target="_blank" 
                               rel="noopener"
                               id="product-link-${p.id}">
                               Inquire
                            </a>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        // Show/Hide Load More Button Container
        if (loadMoreContainer) {
            if (filtered.length > visibleCount) {
                loadMoreContainer.style.display = 'block';
                // Trigger reveal scroll animation trigger
                setTimeout(() => {
                    loadMoreContainer.classList.add('active');
                }, 50);
            } else {
                loadMoreContainer.style.display = 'none';
                loadMoreContainer.classList.remove('active');
            }
        }

        // Trigger reveal animations on freshly loaded DOM nodes
        initScrollReveal();
    };

    // Initial render call
    renderProductCards('All');
}

/**
 * Hydrates Contact fields and dynamic details
 */
function initContactInfo() {
    const address = document.getElementById('contact-address');
    const phone = document.getElementById('contact-phone');
    const email = document.getElementById('contact-email');
    const days = document.getElementById('contact-days');
    const hours = document.getElementById('contact-hours');
    const whatsappLink = document.getElementById('whatsapp-link');

    if (address) address.innerHTML = contact.address.replace(/\n/g, '<br>');
    if (phone) {
        phone.textContent = contact.displayPhone;
        phone.setAttribute('href', `tel:${contact.whatsappNumber}`);
    }
    if (email) {
        email.textContent = contact.email;
        email.setAttribute('href', `mailto:${contact.email}`);
    }
    if (days) days.textContent = contact.days;
    if (hours) hours.textContent = contact.hours;
    if (whatsappLink) {
        whatsappLink.setAttribute('href', `https://wa.me/${contact.whatsappNumber}`);
    }
}

/**
 * Deferred Location Map Lazy-loading system
 */
function initDeferredMap() {
    const mapContainer = document.querySelector('.map-container');
    const mapFrame = document.getElementById('contact-map');
    const placeholder = document.getElementById('map-placeholder');

    if (!mapContainer || !mapFrame || !placeholder) return;

    // We start loading the iframe source once the map container gets within viewport range
    const mapObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                mapFrame.setAttribute('src', contact.mapEmbedUrl);
                mapObserver.unobserve(mapContainer);
            }
        });
    }, { rootMargin: '100px 0px' });

    mapObserver.observe(mapContainer);

    // Frame onload transition
    mapFrame.addEventListener('load', () => {
        placeholder.classList.add('hidden');
        mapFrame.classList.add('loaded');
        setTimeout(() => {
            placeholder.style.display = 'none';
        }, 800); // Let fade out animation complete
    });
}

// App Orchestration on Bootstrap
document.addEventListener('DOMContentLoaded', async () => {
    // Current year stamp
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Load static content data
    await loadData();

    // Hydrate modules
    initNavigation();
    initMobileMenu();
    initBrandsMarquee();
    initProductGallery();
    initContactInfo();
    initDeferredMap();
    initScrollReveal();

    // Reveal layout content fully
    document.body.classList.add('loaded');
});
