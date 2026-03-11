// KBM Security - JavaScript

document.addEventListener('DOMContentLoaded', function () {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Typing effect
    const typingText = document.getElementById('typing-text');
    const fullText = "  Descubra como manter seus dados fora do alcance inimigo!";
    let i = 0;

    function typeWriter() {
        if (i < fullText.length) {
            typingText.textContent += fullText.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }
    typeWriter();

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    mobileMenuBtn.addEventListener('click', function () {
        const isOpen = !mobileMenu.classList.contains('hidden');

        if (isOpen) {
            mobileMenu.classList.add('hidden');
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            mobileMenuBtn.setAttribute('aria-label', 'Open menu');
        } else {
            mobileMenu.classList.remove('hidden');
            menuIcon.classList.add('hidden');
            closeIcon.classList.remove('hidden');
            mobileMenuBtn.setAttribute('aria-expanded', 'true');
            mobileMenuBtn.setAttribute('aria-label', 'Close menu');
        }
    });

    // Close mobile menu when clicking a link
    mobileLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            mobileMenu.classList.add('hidden');
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
        });
    });

    // Navbar scroll effect
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', function () {
        // Desktop: frosted glass transition
        if (window.scrollY > 50) {
            navbar.classList.add('navbar-scrolled');
            navbar.classList.remove('bg-transparent', 'py-6');
            navbar.classList.add('py-2');
        } else {
            navbar.classList.remove('navbar-scrolled');
            navbar.classList.add('bg-transparent', 'py-6');
            navbar.classList.remove('py-2');
        }

        // Mobile only: hide during hero, reveal after
        if (window.innerWidth < 768) {
            const heroHeight = window.innerHeight * 0.75;
            if (window.scrollY > heroHeight) {
                navbar.classList.add('mobile-nav-visible');
            } else {
                navbar.classList.remove('mobile-nav-visible');
            }
        }
    });

    // On resize: if switching to desktop, make sure navbar is always visible
    window.addEventListener('resize', function () {
        if (window.innerWidth >= 768) {
            navbar.classList.remove('mobile-nav-visible');
        }
    });

    // ── Interactive blink on hover / tap ──
    const catEyes = document.getElementById('cat-eyes-logo');
    if (catEyes) {
        const eyelidL = catEyes.querySelector('.eyelid-left');
        const eyelidR = catEyes.querySelector('.eyelid-right');
        let blinking = false;

        function triggerBlink() {
            if (blinking) return;
            blinking = true;
            eyelidL.classList.add('blink-now');
            eyelidR.classList.add('blink-now');

            function onEnd() {
                eyelidL.classList.remove('blink-now');
                eyelidR.classList.remove('blink-now');
                blinking = false;
                eyelidL.removeEventListener('animationend', onEnd);
            }
            eyelidL.addEventListener('animationend', onEnd);
        }

        // Desktop hover
        catEyes.addEventListener('mouseenter', triggerBlink);
        // Mobile tap
        catEyes.addEventListener('touchstart', triggerBlink, { passive: true });
    }

    // Contact form submission (guarded — form may not be present)
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = document.getElementById('btn-text');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            submitBtn.disabled = true;
            btnText.textContent = 'Processando...';

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const company = document.getElementById('company').value;
            const message = document.getElementById('message').value;

            const subject = encodeURIComponent('Contato KBM Security - ' + (company || name));
            const body = encodeURIComponent(
                'Nome: ' + name + '\n' +
                'Email: ' + email + '\n' +
                'Empresa: ' + company + '\n\n' +
                'Mensagem:\n' + message
            );

            window.location.href = 'mailto:kbmsecurity@gmail.com?subject=' + subject + '&body=' + body;

            setTimeout(function () {
                submitBtn.disabled = false;
                btnText.textContent = 'Iniciar Protocolo de Contato';
                contactForm.reset();
            }, 1000);
        });
    }
});
