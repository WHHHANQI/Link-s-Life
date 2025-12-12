(function() {
    const MY_PASSWORD = "qq2cc";

    const readyEvent = new Event('app-ready');

    function showApp() {
        // 1. 移除锁屏（如果存在）
        const lock = document.getElementById('lock-screen');
        if (lock) lock.remove();

        // 2. 显示网页内容 (解决 display: none)
        document.body.style.display = 'block';

        // 3. 记录登录状态
        sessionStorage.setItem("is_logged_in", "true");

        // 4. 【关键】派发事件，通知 finance.html 可以弹 Token 框了
        window.dispatchEvent(readyEvent);
    }

    // 检查是否已登录
    if (sessionStorage.getItem("is_logged_in") === "true") {
        // 必须延迟一点点执行，确保 HTML 解析完成
        document.addEventListener("DOMContentLoaded", showApp);
        return;
    }

    // === 创建锁屏界面 ===
    document.addEventListener("DOMContentLoaded", () => {
        // 先确保 Body 是可见的（为了显示锁），但我们要遮住内容
        // 这里用了一个技巧：先把 Body 显示出来，但锁屏层 z-index 最高，盖住一切
        document.body.style.display = 'block';
        
        const lockScreen = document.createElement("div");
        lockScreen.id = "lock-screen";
        lockScreen.style.cssText = `
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: #1e293b; color: white; z-index: 99999;
            display: flex; flex-direction: column; align-items: center; justify-content: center;
        `;

        lockScreen.innerHTML = `
            <h2 style="margin-bottom: 20px;">🔒 Link's Private Space</h2>
            <input type="password" id="pwd-input" placeholder="输入密码" 
                style="padding: 10px; width: 200px; text-align: center;">
            <button id="unlock-btn" style="margin-top: 15px;">进入</button>
            <p id="err-msg" style="color: #ef4444; margin-top: 10px; display: none;">密码错误</p>
        `;

        // 插入到 body 最前面
        document.body.insertBefore(lockScreen, document.body.firstChild);
        
        // 此时虽然 Body display:block 了，但 lockScreen 挡住了所有内容
        // 为了防止滚动看到下面，锁定滚动
        document.body.style.overflow = "hidden";

        // 解锁逻辑
        const handleUnlock = () => {
            const input = document.getElementById("pwd-input").value;
            if (input === MY_PASSWORD) {
                document.body.style.overflow = "auto"; // 恢复滚动
                showApp(); // 执行解锁成功逻辑
            } else {
                document.getElementById("err-msg").style.display = "block";
            }
        };

        document.getElementById("unlock-btn").onclick = handleUnlock;
        document.getElementById("pwd-input").onkeypress = (e) => {
            if (e.key === "Enter") handleUnlock();
        };
        
        // 自动聚焦输入框
        document.getElementById("pwd-input").focus();
    });
})();
