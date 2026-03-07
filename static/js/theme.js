(() => {
    const STORAGE_KEY = 'theme-preference';
    const ICONS = { system: '🖥️', dark: '🌙', light: '☀️' };

    // --- Helpers ---

    const getStored = () => localStorage.getItem(STORAGE_KEY);
    const setStored = (t) => localStorage.setItem(STORAGE_KEY, t);
    const getSystem = () => matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const resolve = (p) => (p === 'system' || !p) ? getSystem() : p;

    // --- Apply theme to DOM ---

    function apply(pref) {
        document.documentElement.setAttribute('data-theme', resolve(pref));

        const icon = document.querySelector('.theme-toggle-icon');
        if (icon) icon.textContent = ICONS[pref || 'system'];

        document.querySelectorAll('.theme-option').forEach((btn) => {
            btn.classList.toggle('active', btn.dataset.theme === (pref || 'system'));
        });
    }

    // Apply early (before DOMContentLoaded) to prevent flash
    apply(getStored() || 'system');

    // --- Wire up controls after DOM is ready ---

    document.addEventListener('DOMContentLoaded', () => {
        apply(getStored() || 'system');

        const dropdown = document.querySelector('.theme-dropdown');
        const toggle = document.querySelector('.theme-toggle');
        if (!dropdown || !toggle) return;

        // Open / close dropdown
        toggle.addEventListener('click', (e) => { e.stopPropagation(); dropdown.classList.toggle('open'); });
        document.addEventListener('click', () => dropdown.classList.remove('open'));
        dropdown.addEventListener('click', (e) => e.stopPropagation());

        // Theme option buttons
        document.querySelectorAll('.theme-option').forEach((btn) => {
            btn.addEventListener('click', () => {
                setStored(btn.dataset.theme);
                apply(btn.dataset.theme);
                dropdown.classList.remove('open');
            });
        });

        // Re-apply if OS theme changes while "system" is selected
        matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
            if ((getStored() || 'system') === 'system') apply('system');
        });
    });
})();
