// js/lock.js
(function() {
    const MY_PASSWORD = "link777"; //

    // 检查是否已经登录过 (SessionStorage 关闭浏览器后失效)
    if (sessionStorage.getItem("is_logged_in") === "true") {
        return; // 已经登录过，直接放行
    }

    // 创建遮罩层 HTML
    const lockScreen = document.createElement("div");
    lockScreen.id = "lock-screen";
    lockScreen.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: #1e293b; color: white; z-index: 9999;
        display: flex; flex-direction: column; align-items: center; justify-content: center;
    `;

    lockScreen.innerHTML = `
        <h2 style="margin-bottom: 20px;">🔒 私人领地，闲人免进</h2>
        <input type="password" id="pwd-input" placeholder="请输入访问密码" 
            style="padding: 10px; border-radius: 5px; border: none; width: 200px; text-align: center;">
        <button id="unlock-btn" style="margin-top: 15px; padding: 10px 20px; border-radius: 5px; border: none; background: #2563eb; color: white; cursor: pointer;">
            解锁
        </button>
        <p id="err-msg" style="color: #ef4444; margin-top: 10px; display: none;">密码错误！</p>
    `;

    document.body.appendChild(lockScreen);

    // 锁定滚动
    document.body.style.overflow = "hidden";

    // 解锁逻辑
    const handleUnlock = () => {
        const input = document.getElementById("pwd-input").value;
        if (input === MY_PASSWORD) {
            lockScreen.style.display = "none";
            document.body.style.overflow = "auto"; // 恢复滚动
            sessionStorage.setItem("is_logged_in", "true"); // 记录登录状态
        } else {
            document.getElementById("err-msg").style.display = "block";
        }
    };

    // 绑定事件
    document.getElementById("unlock-btn").onclick = handleUnlock;
    document.getElementById("pwd-input").onkeypress = (e) => {
        if (e.key === "Enter") handleUnlock();
    };
})();
