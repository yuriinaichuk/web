const menuButton = document.querySelector('.burger');
const navigation = document.getElementById('primary-navigation');
const header = document.querySelector('header');

if (menuButton && navigation && header) {
    const desktopNavigation = window.matchMedia('(min-width: 768px)');

    const setMenuOpen = (open, restoreFocus = false) => {
        menuButton.classList.toggle('active', open);
        navigation.classList.toggle('nav-active', open);
        menuButton.setAttribute('aria-expanded', String(open));
        menuButton.setAttribute('aria-label', open ? 'Закрити меню' : 'Відкрити меню');
        if (restoreFocus) menuButton.focus();
    };

    menuButton.addEventListener('click', () => {
        if (!desktopNavigation.matches) {
            setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true');
        }
    });

    navigation.addEventListener('click', (event) => {
        const link = event.target.closest('a');
        if (!link || desktopNavigation.matches) return;
        setMenuOpen(false, link.id !== 'search-btn');
        if (link.id === 'search-btn') {
            document.querySelector('#search-modal input')?.focus();
        }
    });

    document.addEventListener('click', (event) => {
        if (!header.contains(event.target)) setMenuOpen(false);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
            setMenuOpen(false, true);
        }
    });

    header.addEventListener('focusout', (event) => {
        if (!header.contains(event.relatedTarget)) setMenuOpen(false);
    });

    desktopNavigation.addEventListener('change', (event) => {
        const focusInNavigation = navigation.contains(document.activeElement);
        setMenuOpen(false, !event.matches && focusInNavigation);
        if (event.matches && document.activeElement === menuButton) {
            navigation.querySelector('a')?.focus();
        }
    });
}

const approachCards = document.querySelector('.about-section .cards-block');

if (approachCards) {
    const cards = Array.from(approachCards.querySelectorAll('.cars-block'));
    let hoveredCard = null;

    const activateCard = (activeCard) => {
        cards.forEach((card) => card.classList.toggle('is-active', card === activeCard));
    };

    cards.forEach((card) => {
        card.addEventListener('pointerenter', (event) => {
            if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
            hoveredCard = card;
            activateCard(card);
        });
        card.addEventListener('focusin', () => activateCard(card));
    });

    approachCards.addEventListener('pointerleave', () => {
        hoveredCard = null;
        activateCard(cards.find((card) => card.contains(document.activeElement)) || cards[0]);
    });

    approachCards.addEventListener('focusout', (event) => {
        if (!approachCards.contains(event.relatedTarget)) activateCard(hoveredCard || cards[0]);
    });
}

// Модальне вікно
const searchBtn = document.getElementById('search-btn');
const modal = document.getElementById('search-modal');
const closeBtn = document.querySelector('.close-btn');
const searchForm = modal.querySelector('form');

searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modal.style.display = 'flex';
});
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Не знайдено');
    modal.style.display = 'none';
});

const btnBackToTop = document.getElementById('btnBackToTop');

if (btnBackToTop) {
  // показувати / ховати кнопку при скролі
  window.addEventListener('scroll', function () {
    if (window.scrollY > 400) {
      btnBackToTop.classList.add('btn-back-to-top--visible');
    } else {
      btnBackToTop.classList.remove('btn-back-to-top--visible');
    }
  });

  // плавна прокрутка догори
  btnBackToTop.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

