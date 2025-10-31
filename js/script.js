// انتظر تحميل الصفحة بالكامل
document.addEventListener('DOMContentLoaded', function() {
    // قائمة الهامبرغر للشاشات الصغيرة
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // تغيير شكل القائمة عند التمرير
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.padding = '10px 0';
            navbar.style.backgroundColor = 'rgba(44, 62, 80, 0.95)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.backgroundColor = 'var(--dark-color)';
        }
    });

    // الكاروسيل (دوران الصور)
    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    let currentSlide = 0;

    function showSlide(index) {
        carouselItems.forEach(item => item.classList.remove('active'));
        carouselItems[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % carouselItems.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + carouselItems.length) % carouselItems.length;
        showSlide(currentSlide);
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // تغيير الشريحة تلقائياً كل 5 ثوان
    setInterval(nextSlide, 5000);

    // فلترة الألعاب
    const filterSelect = document.querySelectorAll('.filter-select');
    const gameCards = document.querySelectorAll('.game-card');

    filterSelect.forEach(select => {
        select.addEventListener('change', filterGames);
    });

    function filterGames() {
        const categoryFilter = document.querySelector('.filter-select:first-child').value;
        const sortFilter = document.querySelector('.filter-select:last-child').value;

        let filteredGames = Array.from(gameCards);

        // تطبيق فلتر الفئة
        if (categoryFilter !== 'all') {
            filteredGames = filteredGames.filter(card => {
                const category = card.querySelector('.game-category').textContent.trim();
                return category === getCategoryName(categoryFilter);
            });
        }

        // تطبيق ترتيب الفرز
        switch(sortFilter) {
            case 'popular':
                // في تطبيق حقيقي، سيتم ترتيبها حسب شعبيتها
                break;
            case 'newest':
                // في تطبيق حقيقي، سيتم ترتيبها حسب تاريخ الإصدار
                break;
            case 'rating':
                filteredGames.sort((a, b) => {
                    const ratingA = parseFloat(a.querySelector('.game-rating span').textContent);
                    const ratingB = parseFloat(b.querySelector('.game-rating span').textContent);
                    return ratingB - ratingA;
                });
                break;
            case 'downloads':
                // في تطبيق حقيقي، سيتم ترتيبها حسب عدد التحميلات
                break;
        }

        // إعادة عرض الألعاب المفلترة
        const gamesGrid = document.querySelector('.games-grid');
        gamesGrid.innerHTML = '';

        filteredGames.forEach(card => {
            gamesGrid.appendChild(card);
        });
    }

    function getCategoryName(category) {
        const categories = {
            'action': 'أكشن',
            'adventure': 'مغامرات',
            'strategy': 'استراتيجية',
            'sports': 'رياضة',
            'racing': 'سباق',
            'puzzle': 'ألغاز',
            'horror': 'رعب'
        };
        return categories[category] || category;
    }

    // عرض الألعاب كقائمة أو شبكة
    const viewBtns = document.querySelectorAll('.view-btn');
    const gamesGrid = document.querySelector('.games-grid');

    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            viewBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            if (this.querySelector('.fa-list')) {
                gamesGrid.classList.add('list-view');
            } else {
                gamesGrid.classList.remove('list-view');
            }
        });
    });

    // وظيفة البحث
    const searchInput = document.querySelector('.search-bar input');
    const searchBtn = document.querySelector('.search-bar button');

    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', performSearch);
        searchInput.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });

        // البحث أثناء الكتابة
        searchInput.addEventListener('input', function() {
            performSearch();
        });
    }

    function performSearch() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        const gameCards = document.querySelectorAll('.game-card');
        let found = false;
        let resultsCount = 0;

        // إذا كان البحث فارغًا، عرض كل الألعاب
        if (!searchTerm) {
            gameCards.forEach(card => {
                card.style.display = 'block';
            });
            return;
        }

        gameCards.forEach(card => {
            const title = card.querySelector('h3') ? card.querySelector('h3').textContent.toLowerCase() : '';
            const category = card.querySelector('.game-category') ? card.querySelector('.game-category').textContent.toLowerCase() : '';
            const description = card.querySelector('.game-description') ? card.querySelector('.game-description').textContent.toLowerCase() : '';

            if (title.includes(searchTerm) || category.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'block';
                found = true;
                resultsCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // عرض رسالة إذا لم يتم العثور على نتائج
        const gamesGrid = document.querySelector('.games-grid');
        let noResultsMessage = document.querySelector('.no-results-message');
        
        if (!found) {
            if (!noResultsMessage) {
                noResultsMessage = document.createElement('div');
                noResultsMessage.className = 'no-results-message';
                noResultsMessage.innerHTML = `<div class="alert alert-warning" style="text-align: center; padding: 20px; margin: 20px 0; border-radius: 8px; background-color: #fff3cd; border: 1px solid #ffeeba; color: #856404;"><i class="fas fa-search"></i> لم يتم العثور على ألعاب تطابق بحثك عن "${searchInput.value}"</div>`;
                gamesGrid.appendChild(noResultsMessage);
            }
        } else {
            if (noResultsMessage) {
                noResultsMessage.remove();
            }
            
            // عرض عدد النتائج في وحدة التحكم
            console.log(`تم العثور على ${resultsCount} نتيجة لبحثك عن "${searchTerm}"`);
        }
    }

    // تفاصيل اللعبة
    const detailsBtns = document.querySelectorAll('.details-btn');

    detailsBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const gameCard = this.closest('.game-card');
            const gameTitle = gameCard.querySelector('h3').textContent;

            // في تطبيق حقيقي، سيتم عرض صفحة تفاصيل اللعبة أو نافذة منبثقة
            console.log(`عرض تفاصيل اللعبة: ${gameTitle}`);
        });
    });

    // زر التحميل
    const downloadBtns = document.querySelectorAll('.download-btn');

    downloadBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const gameCard = this.closest('.game-card');
            const gameTitle = gameCard.querySelector('h3').textContent;

            // في تطبيق حقيقي، سيتم بدء تحميل اللعبة
            console.log(`بدء تحميل اللعبة: ${gameTitle}`);

            // محاكاة عملية التحميل
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            this.disabled = true;

            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-check"></i>';

                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-download"></i>';
                    this.disabled = false;
                }, 2000);
            }, 2000);
        });
    });

    // التمرير السلس للأقسام
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 70,
                    behavior: 'smooth'
                });

                // تحديث الرابط النشط
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');

                // إغلاق القائمة في الشاشات الصغيرة
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // تحديث الرابط النشط عند التمرير
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // إضافة تأثيرات عند التمرير
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.category-card, .game-card');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;

            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // إعداد العناصر للتحريك
    document.querySelectorAll('.category-card, .game-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // تشغيل التأثير عند التمرير
    window.addEventListener('scroll', animateOnScroll);

    // تشغيل التأثير مرة واحدة عند تحميل الصفحة
    animateOnScroll();

    // نافذة منبثقة لعرض الصور
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    const captionText = document.getElementById('caption');
    const closeModal = document.querySelector('.close-modal');

    // الحصول على جميع صور لقطات الشاشة
    const screenshots = document.querySelectorAll('.screenshot-item img');

    // إضافة حدث النقر لكل صورة
    screenshots.forEach(screenshot => {
        screenshot.style.cursor = 'pointer';
        screenshot.addEventListener('click', function() {
            modal.style.display = 'block';
            modalImg.src = this.src;
            captionText.innerHTML = this.alt;
            document.body.style.overflow = 'hidden'; // منع التمرير عند فتح النافذة
        });
    });

    // إغلاق النافذة عند النقر على زر الإغلاق
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // إعادة التمرير عند إغلاق النافذة
    });

    // إغلاق النافذة عند النقر خارج الصورة
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // إعادة التمرير عند إغلاق النافذة
        }
    });

    // وظيفة البحث
    const searchInput = document.querySelector('.search-bar input');
    const searchBtn = document.querySelector('.search-bar button');
    const gameCards = document.querySelectorAll('.game-card');

    // دالة البحث
    function searchGames() {
        const searchTerm = searchInput.value.toLowerCase().trim();

        gameCards.forEach(card => {
            const gameTitle = card.querySelector('h3').textContent.toLowerCase();
            const gameDescription = card.querySelector('.game-description').textContent.toLowerCase();
            const gameCategory = card.querySelector('.game-category').textContent.toLowerCase();

            if (gameTitle.includes(searchTerm) || 
                gameDescription.includes(searchTerm) || 
                gameCategory.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });

        // التحقق إذا كانت هناك نتائج
        let hasResults = false;
        gameCards.forEach(card => {
            if (card.style.display !== 'none') {
                hasResults = true;
            }
        });

        // عرض رسالة إذا لم تكن هناك نتائج
        const gamesGrid = document.querySelector('.games-grid');
        const noResultsMessage = document.querySelector('.no-results-message');

        if (!hasResults && searchTerm !== '') {
            if (!noResultsMessage) {
                const message = document.createElement('div');
                message.className = 'no-results-message';
                message.innerHTML = `
                    <i class="fas fa-search"></i>
                    <h3>لم يتم العثور على نتائج</h3>
                    <p>جرب البحث بكلمات مختلفة</p>
                `;
                message.style.cssText = `
                    text-align: center;
                    padding: 40px;
                    grid-column: 1 / -1;
                    color: #666;
                `;
                message.querySelector('i').style.cssText = `
                    font-size: 3rem;
                    margin-bottom: 20px;
                    color: var(--primary-color);
                `;
                message.querySelector('h3').style.cssText = `
                    margin-bottom: 10px;
                    font-size: 1.5rem;
                `;
                gamesGrid.appendChild(message);
            }
        } else if (noResultsMessage) {
            noResultsMessage.remove();
        }
    }

    // البحث عند النقر على زر البحث
    searchBtn.addEventListener('click', searchGames);

    // البحث عند الضغط على Enter في حقل البحث
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            searchGames();
        }
    });
});
