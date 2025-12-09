// js/nav.js
function renderNav(activePage) {
    // 1. 定义所有的菜单项
    const navItems = [
        { name: "🏠 关于 (About)", link: "index.html", id: "home" },
        { name: "💰 资产 (Wealth)", link: "finance.html", id: "finance" },
        { name: "✨ 愿望 (Wishes)", link: "wishes.html", id: "wishes" },
        { name: "🏆 日记 (Success)", link: "success.html", id: "success" },
        { name: "💡 建议 (Advice)", link: "advice.html", id: "advice" } // 新增的页面
    ];

    // 2. 生成 HTML 字符串
    let navLinksHtml = "";
    navItems.forEach(item => {
        // 判断当前是哪个页面，如果是，就加 active 类
        const isActive = (activePage === item.id) ? "active" : "";
        navLinksHtml += `<a href="${item.link}" class="${isActive}">${item.name}</a>`;
    });

    // 3. 组装完整的导航栏结构
    const navHtml = `
        <div class="brand">Link's Life</div>
        <div class="nav-links">
            ${navLinksHtml}
        </div>
    `;

    // 4. 插入到页面中
    const navElement = document.createElement("nav");
    navElement.className = "navbar";
    navElement.innerHTML = navHtml;

    // 插入到 body 的最前面
    document.body.insertBefore(navElement, document.body.firstChild);
}
