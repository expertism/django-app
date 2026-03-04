(() => {
    const STORAGE_KEY = "theme-preference";

    const getStoredTheme = () => localStorage.getItem(STORAGE_KEY);
    const setStoredTheme = (theme) => localStorage.setItem(STORAGE_KEY, theme);

    const getSystemTheme = () =>
        window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

    const getEffectiveTheme = (pref) =>
        pref === "system" || !pref ? getSystemTheme() : pref;

    const applyTheme = (pref) => {
        const effective = getEffectiveTheme(pref);
        document.documentElement.setAttribute("data-theme", effective);
        // Update dropdown button icon
        const icon = document.querySelector(".theme-toggle-icon");
        if (icon) {
            if (pref === "system" || !pref) icon.textContent = "🖥️";
            else if (pref === "dark") icon.textContent = "🌙";
            else icon.textContent = "☀️";
        }
        // Update active state in dropdown
        document.querySelectorAll(".theme-option").forEach((btn) => {
            btn.classList.toggle("active", btn.dataset.theme === (pref || "system"));
        });
    };

    // Apply saved theme immediately (before DOM ready) to prevent flash
    const saved = getStoredTheme() || "system";
    document.documentElement.setAttribute(
        "data-theme",
        getEffectiveTheme(saved)
    );

    document.addEventListener("DOMContentLoaded", () => {
        const pref = getStoredTheme() || "system";
        applyTheme(pref);

        // Dropdown toggle
        const toggle = document.querySelector(".theme-toggle");
        const dropdown = document.querySelector(".theme-dropdown");

        if (toggle && dropdown) {
            toggle.addEventListener("click", (e) => {
                e.stopPropagation();
                dropdown.classList.toggle("open");
            });

            // Close dropdown when clicking outside
            document.addEventListener("click", () => {
                dropdown.classList.remove("open");
            });

            dropdown.addEventListener("click", (e) => {
                e.stopPropagation();
            });
        }

        // Theme option buttons
        document.querySelectorAll(".theme-option").forEach((btn) => {
            btn.addEventListener("click", () => {
                const theme = btn.dataset.theme;
                setStoredTheme(theme);
                applyTheme(theme);
                dropdown.classList.remove("open");
            });
        });

        // Listen for system theme changes
        window
            .matchMedia("(prefers-color-scheme: dark)")
            .addEventListener("change", () => {
                const current = getStoredTheme() || "system";
                if (current === "system") {
                    applyTheme("system");
                }
            });
    });
})();
