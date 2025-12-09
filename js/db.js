
// GitHub API 核心配置
const GH_TOKEN_KEY = "gh_token_secure";
const GH_CONFIG_KEY = "gh_config";

class GithubDB {
    constructor(defaultFilename) {
        this.config = JSON.parse(localStorage.getItem(GH_CONFIG_KEY) || "{}");
        // 如果调用时指定了文件名，就用指定的，否则用默认的
        if (defaultFilename) this.config.filename = defaultFilename;
        
        this.token = localStorage.getItem(GH_TOKEN_KEY);
        this.fileSha = null;
    }

    // 保存全局配置 (User, Repo, Token)
    saveConfig(user, repo, token) {
        // filename 不存在配置里，而是由各个页面自己决定读哪个文件
        const baseConfig = { user, repo };
        localStorage.setItem(GH_CONFIG_KEY, JSON.stringify(baseConfig));
        if (token) {
            localStorage.setItem(GH_TOKEN_KEY, token);
            this.token = token;
        }
        // 更新当前实例
        this.config.user = user;
        this.config.repo = repo;
    }

    async load(filename) {
        const targetFile = filename || this.config.filename;
        if (!this.token || !this.config.user || !this.config.repo) return null;

        const url = `https://api.github.com/repos/${this.config.user}/${this.config.repo}/contents/${targetFile}`;
        
        try {
            const res = await fetch(url, {
                headers: { 
                    "Authorization": `token ${this.token}`,
                    "Accept": "application/vnd.github.v3+json" 
                }
            });
            
            if (res.status === 404) return []; 
            if (!res.ok) throw new Error("GitHub API Error");

            const data = await res.json();
            this.fileSha = data.sha; 
            const content = decodeURIComponent(escape(atob(data.content)));
            return JSON.parse(content);
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    async save(filename, jsonData) {
        if (!this.token) return false;
        const targetFile = filename || this.config.filename;

        // 如果 load 还没被调用过，我们需要先获取 SHA，否则无法覆盖
        if (!this.fileSha) {
             await this.load(targetFile);
        }

        const url = `https://api.github.com/repos/${this.config.user}/${this.config.repo}/contents/${targetFile}`;
        const contentStr = JSON.stringify(jsonData, null, 2);
        const contentBase64 = btoa(unescape(encodeURIComponent(contentStr)));

        const body = {
            message: `Update ${targetFile} via Link-s-Life`,
            content: contentBase64,
            sha: this.fileSha
        };

        const res = await fetch(url, {
            method: "PUT",
            headers: {
                "Authorization": `token ${this.token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        if (res.ok) {
            const data = await res.json();
            this.fileSha = data.content.sha;
            return true;
        }
        return false;
    }
}
