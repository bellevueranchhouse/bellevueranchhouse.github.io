(() => {
    const header = document.querySelector('[data-header]');
    const menuToggle = document.querySelector('[data-menu-toggle]');
    const mobileMenu = document.querySelector('[data-menu]');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', String(!expanded));
            mobileMenu.classList.toggle('is-open');
        });

        mobileMenu.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('is-open');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    const syncHeader = () => {
        if (!header) {
            return;
        }
        if (window.scrollY > 14) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    syncHeader();
    window.addEventListener('scroll', syncHeader, { passive: true });

    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length > 0) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) {
                        return;
                    }
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                });
            },
            {
                threshold: 0.16,
            }
        );

        revealElements.forEach((element) => revealObserver.observe(element));
    }

    document.querySelectorAll('[data-faq-trigger]').forEach((button) => {
        button.addEventListener('click', () => {
            const parent = button.closest('.faq-item');
            if (!parent) {
                return;
            }
            const currentlyOpen = parent.classList.contains('open');

            document.querySelectorAll('.faq-item.open').forEach((item) => {
                item.classList.remove('open');
                const trigger = item.querySelector('[data-faq-trigger]');
                const panel = item.querySelector('.faq-answer');
                if (trigger) {
                    trigger.setAttribute('aria-expanded', 'false');
                }
                if (panel) {
                    panel.style.maxHeight = '0px';
                }
            });

            if (!currentlyOpen) {
                parent.classList.add('open');
                button.setAttribute('aria-expanded', 'true');
                const panel = parent.querySelector('.faq-answer');
                if (panel) {
                    panel.style.maxHeight = `${panel.scrollHeight}px`;
                }
            }
        });
    });

    window.addEventListener('resize', () => {
        document.querySelectorAll('.faq-item.open .faq-answer').forEach((panel) => {
            panel.style.maxHeight = `${panel.scrollHeight}px`;
        });
    });

    document.querySelectorAll('.faq-item').forEach((item) => {
        const panel = item.querySelector('.faq-answer');
        if (panel) {
            panel.style.maxHeight = '0px';
        }
    });

    const galleryModal = document.querySelector('[data-gallery-modal]');
    if (galleryModal) {
        const modalImage = galleryModal.querySelector('[data-gallery-modal-image]');
        const modalCaption = galleryModal.querySelector('[data-gallery-modal-caption]');
        const closeButtons = galleryModal.querySelectorAll('[data-gallery-close]');

        const openModal = (src, alt) => {
            if (!modalImage || !modalCaption) {
                return;
            }
            modalImage.src = src;
            modalImage.alt = alt;
            modalCaption.textContent = alt;
            galleryModal.classList.add('is-open');
            document.body.classList.add('modal-open');
        };

        const closeModal = () => {
            galleryModal.classList.remove('is-open');
            document.body.classList.remove('modal-open');
            if (modalImage) {
                modalImage.src = '';
            }
        };

        document.querySelectorAll('[data-gallery-item]').forEach((item) => {
            item.addEventListener('click', () => {
                const src = item.getAttribute('data-gallery-src') || '';
                const alt = item.getAttribute('data-gallery-alt') || 'Photo';
                if (src) {
                    openModal(src, alt);
                }
            });
        });

        closeButtons.forEach((button) => button.addEventListener('click', closeModal));

        galleryModal.addEventListener('click', (event) => {
            if (event.target === galleryModal) {
                closeModal();
            }
        });

        window.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                closeModal();
            }
        });
    }

    document.querySelectorAll('[data-current-year]').forEach((node) => {
        node.textContent = String(new Date().getFullYear());
    });
})();
