// وظيفة البحث للصفحة الثانية
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('#searchInput');
    const searchButton = document.querySelector('#searchButton');
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
            const gameCards = document.querySelectorAll('.games-grid .game-card');
            gameCards.forEach(card => {
                card.style.display = 'block';
            });
            return;
        }

        // البحث في جميع البطاقات في الصفحة الحالية فقط
        const gameCards = document.querySelectorAll('.games-grid .game-card');
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
});