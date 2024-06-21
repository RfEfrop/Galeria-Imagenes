// scripts.js
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const imageItems = document.querySelectorAll('.image-item');
    const slider = document.querySelector('.slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;

    function updateSlider() {
        const category = document.querySelector('.filter-btn.active')?.getAttribute('data-category') || 'all';
        const visibleItems = Array.from(imageItems).filter(item => category === 'all' || item.getAttribute('data-category') === category);
        const offset = currentIndex * -100;
        slider.style.transform = `translateX(${offset}%)`;

        // Hide/show navigation buttons based on currentIndex and visibleItems length
        prevBtn.style.display = currentIndex === 0 ? 'none' : 'block';
        nextBtn.style.display = currentIndex === visibleItems.length - 1 ? 'none' : 'block';
    }

    function filterImages(category) {
        imageItems.forEach(item => {
            item.style.display = category === 'all' || item.getAttribute('data-category') === category ? 'block' : 'none';
        });
        currentIndex = 0;
        updateSlider();
    }

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterImages(button.getAttribute('data-category'));
        });
    });

    prevBtn.addEventListener('click', () => {
        currentIndex = Math.max(currentIndex - 1, 0);
        updateSlider();
    });

    nextBtn.addEventListener('click', () => {
        const category = document.querySelector('.filter-btn.active')?.getAttribute('data-category') || 'all';
        const visibleItems = Array.from(imageItems).filter(item => category === 'all' || item.getAttribute('data-category') === category);
        currentIndex = Math.min(currentIndex + 1, visibleItems.length - 1);
        updateSlider();
    });

    // Initialize filter with 'all'
    filterImages('all');
});
