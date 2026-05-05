function loadComponent(id, file, callback) {
    fetch(file)
        .then(res => res.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
            if (callback) callback();
        });
}

loadComponent("navbar", "navbar.html", initApp);
    loadComponent("footer", "footer.html");

    function initApp() {
        initHamburger();
        initSearch();
    }

    
    function initHamburger() {

        const hamburger = document.getElementById("hamburger");
        const overlay = document.querySelector(".overlay");
        const closeBtn = document.querySelector(".close");

        if (!hamburger || !overlay || !closeBtn) return;

        hamburger.addEventListener("click", () => {
            overlay.style.display = "flex";
            document.body.style.overflow = "hidden";
        });

        closeBtn.addEventListener("click", () => {
            overlay.style.display = "none";
            document.body.style.overflow = "auto";
        });

        overlay.addEventListener("click", (e) => {
            if (e.target === overlay) {
                overlay.style.display = "none";
                document.body.style.overflow = "auto";
            }
        });
    }
