// انتظر حتى يتم تحميل الصفحة بالكامل
document.addEventListener('DOMContentLoaded', function() {
    // وظيفة البحث
    const searchInput = document.querySelector('.search-bar input');
    const searchButton = document.querySelector('.search-bar button');
    const gamesGrid = document.querySelector('.games-grid');

    // إنشاء قائمة نتائج البحث
    const searchResults = document.createElement('div');
    searchResults.className = 'search-results';
    searchResults.style.display = 'none';
    searchResults.style.position = 'absolute';
    searchResults.style.top = '100%';
    searchResults.style.left = '0';
    searchResults.style.right = '0';
    searchResults.style.backgroundColor = 'white';
    searchResults.style.boxShadow = '0 4px 8px rgba(0,0,0,0.1)';
    searchResults.style.borderRadius = '0 0 8px 8px';
    searchResults.style.zIndex = '1000';
    searchResults.style.maxHeight = '300px';
    searchResults.style.overflowY = 'auto';
    
    // إضافة قائمة النتائج بعد شريط البحث
    const searchContainer = document.querySelector('.search-bar');
    searchContainer.style.position = 'relative';
    searchContainer.appendChild(searchResults);

    function filterGames() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        // إذا كان البحث فارغًا، إخفاء النتائج وعرض كل الألعاب
        if (!searchTerm) {
            searchResults.style.display = 'none';
            const gameCards = document.querySelectorAll('.game-card');
            gameCards.forEach(card => {
                card.style.display = 'block';
            });
            return;
        }

        // البحث في جميع البطاقات
        const gameCards = document.querySelectorAll('.game-card');
        const matchedGames = [];

        gameCards.forEach(card => {
            const gameTitle = card.querySelector('h3') ? card.querySelector('h3').textContent.toLowerCase() : '';
            const gameDescription = card.querySelector('.game-description') ? card.querySelector('.game-description').textContent.toLowerCase() : '';
            const gameCategory = card.querySelector('.game-category') ? card.querySelector('.game-category').textContent.toLowerCase() : '';

            // البحث في العنوان والوصف والتصنيف
            if (gameTitle.includes(searchTerm) ||
                gameDescription.includes(searchTerm) ||
                gameCategory.includes(searchTerm)) {
                matchedGames.push({
                    title: card.querySelector('h3').textContent,
                    card: card
                });
            }
        });

        // عرض النتائج في القائمة المنسدلة
        searchResults.innerHTML = '';
        
        if (matchedGames.length > 0) {
            searchResults.style.display = 'block';
            
            matchedGames.forEach(game => {
                const resultItem = document.createElement('div');
                resultItem.className = 'search-result-item';
                resultItem.style.padding = '10px 15px';
                resultItem.style.cursor = 'pointer';
                resultItem.style.borderBottom = '1px solid #eee';
                resultItem.style.transition = 'background-color 0.2s';
                resultItem.textContent = game.title;
                
                // عند النقر على نتيجة البحث
                resultItem.addEventListener('click', function() {
                    // التمرير إلى البطاقة وتسليط الضوء عليها
                    game.card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    game.card.style.border = '2px solid #ff6b6b';
                    
                    // إزالة التسليط بعد 3 ثوانٍ
                    setTimeout(() => {
                        game.card.style.border = '';
                    }, 3000);
                    
                    // إخفاء نتائج البحث
                    searchResults.style.display = 'none';
                });
                
                // تأثير التحويم
                resultItem.addEventListener('mouseenter', function() {
                    this.style.backgroundColor = '#f5f5f5';
                });
                
                resultItem.addEventListener('mouseleave', function() {
                    this.style.backgroundColor = '';
                });
                
                searchResults.appendChild(resultItem);
            });
        } else {
            searchResults.style.display = 'block';
            const noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.style.padding = '15px';
            noResults.style.textAlign = 'center';
            noResults.style.color = '#666';
            noResults.textContent = 'لا توجد نتائج للبحث';
            searchResults.appendChild(noResults);
        }

        // تصفية البطاقات في الشبكة
        gameCards.forEach(card => {
            const gameTitle = card.querySelector('h3') ? card.querySelector('h3').textContent.toLowerCase() : '';
            const gameDescription = card.querySelector('.game-description') ? card.querySelector('.game-description').textContent.toLowerCase() : '';
            const gameCategory = card.querySelector('.game-category') ? card.querySelector('.game-category').textContent.toLowerCase() : '';

            if (gameTitle.includes(searchTerm) ||
                gameDescription.includes(searchTerm) ||
                gameCategory.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    if (searchInput && searchButton) {
        searchButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            filterGames();
        });
        searchInput.addEventListener('keyup', filterGames);
        
        // إخفاء نتائج البحث عند النقر خارجها
        document.addEventListener('click', function(e) {
            if (!searchContainer.contains(e.target)) {
                searchResults.style.display = 'none';
            }
        });
    }
    // شاشة التحميل
    const loadingScreen = document.querySelector('.loading-screen');
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.visibility = 'hidden';
    }, 2000);

    // تغيير لون شريط التنقل عند التمرير
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(26, 26, 26, 0.95)';
        } else {
            navbar.style.backgroundColor = 'rgba(26, 26, 26, 0.9)';
        }
    });

    // قائمة الموبايل
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');

        // تحويل شريط القائمة إلى X
        const spans = menuToggle.querySelectorAll('span');
        if (navLinks.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(8px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // إغلاق القائمة عند النقر على رابط
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active');
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // تأثيرات التمرير للعناصر
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .gallery-item');

        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // إعداد التأثيرات الأولية
    document.querySelectorAll('.feature-card, .gallery-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // تشغيل التأثير عند التمرير
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // تشغيله مرة واحدة عند تحميل الصفحة

    // معالجة نموذج الاتصال
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // إنشاء رسالة نجاح بأسلوب Ghost of Tsushima
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.';
            successMessage.style.backgroundColor = 'rgba(212, 175, 55, 0.2)';
            successMessage.style.color = '#d4af37';
            successMessage.style.border = '1px solid #d4af37';
            successMessage.style.padding = '15px';
            successMessage.style.marginTop = '20px';
            successMessage.style.textAlign = 'center';
            successMessage.style.fontFamily = "'Noto Serif', serif";

            // إضافة الرسالة بعد النموذج
            contactForm.appendChild(successMessage);

            // إعادة تعيين النموذج
            contactForm.reset();

            // إزالة الرسالة بعد 5 ثوانٍ
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        });
    }

    // معالجة نموذج النشرة البريدية
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // إنشاء رسالة نجاح بأسلوب Ghost of Tsushima
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'شكراً لاشتراكك في نشرتنا البريدية!';
            successMessage.style.backgroundColor = 'rgba(212, 175, 55, 0.2)';
            successMessage.style.color = '#d4af37';
            successMessage.style.border = '1px solid #d4af37';
            successMessage.style.padding = '15px';
            successMessage.style.marginTop = '20px';
            successMessage.style.textAlign = 'center';
            successMessage.style.fontFamily = "'Noto Serif', serif";

            // إضافة الرسالة بعد النموذج
            newsletterForm.appendChild(successMessage);

            // إعادة تعيين النموذج
            newsletterForm.reset();

            // إزالة الرسالة بعد 5 ثوانٍ
            setTimeout(() => {
                successMessage.remove();
            }, 5000);
        });
    }

    // تأثيرات التمرير السلس للأقسام
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 70; // تعديل حسب ارتفاع شريط التنقل

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // تأثيرات التمرير للصور في المعرض
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.querySelector('img').style.transform = 'scale(1.05)';
        });

        item.addEventListener('mouseleave', function() {
            this.querySelector('img').style.transform = 'scale(1)';
        });
    });

    // تأثيرات التمرير للبطاقات
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.querySelector('.feature-icon').style.transform = 'scale(1.1)';
        });

        card.addEventListener('mouseleave', function() {
            this.querySelector('.feature-icon').style.transform = 'scale(1)';
        });
    });

    // تأثيرات التمرير للصور الرئيسية
    const gameImage = document.querySelector('.game-image');
    if (gameImage) {
        gameImage.addEventListener('mouseenter', function() {
            this.querySelector('img').style.transform = 'scale(1.03)';
        });

        gameImage.addEventListener('mouseleave', function() {
            this.querySelector('img').style.transform = 'scale(1)';
        });
    }

    // تأثيرات التمرير للأزرار
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});