
/* =========================
   MOBILE NAVIGATION
========================= */

const menuIcon = document.querySelector("#menu-icon");
const navbar = document.querySelector("#navbar");
const navLinks = document.querySelectorAll(".navbar a");

function closeMenu() {
    navbar.classList.remove("open");
    menuIcon.setAttribute("aria-expanded", "false");
    menuIcon.setAttribute("aria-label", "Open navigation menu");

    menuIcon.innerHTML = '<i class="bx bx-menu"></i>';
}

menuIcon.addEventListener("click", () => {
    const isOpen = navbar.classList.toggle("open");

    menuIcon.setAttribute("aria-expanded", String(isOpen));
    menuIcon.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    menuIcon.innerHTML = isOpen
        ? '<i class="bx bx-x"></i>'
        : '<i class="bx bx-menu"></i>';
});

// Close the mobile menu after selecting a link.
navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        closeMenu();
    });
});

// Close the menu when returning to desktop width.
window.addEventListener("resize", () => {
    if (window.innerWidth > 760) {
        closeMenu();
    }
});


/* =========================
   TYPING ANIMATION
========================= */

const typingElement = document.querySelector(".multiple-text");

const roles = [
    
    "IT Student",
    "Future Programmer",
    
];

let roleIndex = 0;
let characterIndex = 0;
let deleting = false;

const typingSpeed = 100;
const deletingSpeed = 55;
const pauseAfterTyping = 1500;

function typeRole() {
    // Respect the user's reduced-motion preference.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        typingElement.textContent = roles[0];
        return;
    }

    const currentRole = roles[roleIndex];

    if (!deleting) {
        characterIndex++;

        typingElement.textContent =
            currentRole.substring(0, characterIndex);

        if (characterIndex === currentRole.length) {
            deleting = true;
            setTimeout(typeRole, pauseAfterTyping);
            return;
        }
    } else {
        characterIndex--;

        typingElement.textContent =
            currentRole.substring(0, characterIndex);

        if (characterIndex === 0) {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }
    }

    setTimeout(
        typeRole,
        deleting ? deletingSpeed : typingSpeed
    );
}

typeRole();


/* =========================
   FOOTER YEAR
========================= */

const yearElement = document.querySelector("#year");

yearElement.textContent = new Date().getFullYear();


/* =========================
   ACTIVE NAVIGATION LINK
========================= */

const sections = document.querySelectorAll(
    "main section[id]"
);

if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    navLinks.forEach((link) => {
                        const isActive =
                            link.getAttribute("href") ===
                            `#${entry.target.id}`;

                        link.classList.toggle("active", isActive);
                    });
                }
            });
        },
        {
            rootMargin: "-30% 0px -55% 0px"
        }
    );

    sections.forEach((section) => {
        sectionObserver.observe(section);
    });
}
