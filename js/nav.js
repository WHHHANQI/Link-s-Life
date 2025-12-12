// js/nav.js
function renderNav(activePage) {
    const navItems = [
        { name: "🏠 关于 (About)", link: "index.html", id: "home" },
        { name: "💰 资产 (Wealth)", link: "finance.html", id: "finance" },
        { name: "✨ 愿望 (Wishes)", link: "wishes.html", id: "wishes" },
        { name: "🏆 日记 (Success)", link: "success.html", id: "success" },
        { name: "💡 建议 (Advice)", link: "advice.html", id: "advice" },
        { name: "❤️ For CC", link: "cc.html", id: "cc" } 
    ];

    let navLinksHtml = "";
    navItems.forEach(item => {
        const isActive = (activePage === item.id) ? "active" : "";
        navLinksHtml += `<a href="${item.link}" class="${isActive}">${item.name}</a>`;
    });

    const navHtml = `
        <div class="brand">Link's Life</div>
        <div class="nav-links">
            ${navLinksHtml}
        </div>
    `;

    const navElement = document.createElement("nav");
    navElement.className = "navbar";
    navElement.innerHTML = navHtml;

    document.body.insertBefore(navElement, document.body.firstChild);
}
