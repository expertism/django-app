(() => {
    const STORAGE_KEY = "theme-preference";

    const getStoredTheme = () => localStorage.getItem(STORAGE_KEY);
    const setStoredTheme = (theme) => localStorage.setItem(STORAGE_KEY, theme);

    const getSystemTheme = () =>
        window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

    const getEffectiveTheme = (pref) =>
        pref === "system" || !pref ? getSystemTheme() : pref;

    const THEME_ICONS = { system: "🖥️", dark: "🌙", light: "☀️" };

    const setThemeAttribute = (pref) => {
        document.documentElement.setAttribute("data-theme", getEffectiveTheme(pref));
    };

    const updateToggleIcon = (pref) => {
        const icon = document.querySelector(".theme-toggle-icon");
        if (icon) icon.textContent = THEME_ICONS[pref || "system"];
    };

    const updateActiveOption = (pref) => {
        document.querySelectorAll(".theme-option").forEach((btn) => {
            btn.classList.toggle("active", btn.dataset.theme === (pref || "system"));
        });
    };

    const applyTheme = (pref) => {
        setThemeAttribute(pref);
        updateToggleIcon(pref);
        updateActiveOption(pref);
    };

    setThemeAttribute(getStoredTheme() || "system");

    const setupDropdownToggle = (dropdown) => {
        const toggle = document.querySelector(".theme-toggle");
        if (!toggle || !dropdown) return;

        toggle.addEventListener("click", (e) => {
            e.stopPropagation();
            dropdown.classList.toggle("open");
        });

        document.addEventListener("click", () => {
            dropdown.classList.remove("open");
        });

        dropdown.addEventListener("click", (e) => {
            e.stopPropagation();
        });
    };

    const setupThemeOptions = (dropdown) => {
        document.querySelectorAll(".theme-option").forEach((btn) => {
            btn.addEventListener("click", () => {
                setStoredTheme(btn.dataset.theme);
                applyTheme(btn.dataset.theme);
                dropdown.classList.remove("open");
            });
        });
    };

    const setupSystemThemeListener = () => {
        window.matchMedia("(prefers-color-scheme: dark)")
            .addEventListener("change", () => {
                const current = getStoredTheme() || "system";
                if (current === "system") applyTheme("system");
            });
    };

    document.addEventListener("DOMContentLoaded", () => {
        applyTheme(getStoredTheme() || "system");
        const dropdown = document.querySelector(".theme-dropdown");
        setupDropdownToggle(dropdown);
        setupThemeOptions(dropdown);
        setupSystemThemeListener();
    });
})();
