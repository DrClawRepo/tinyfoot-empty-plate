# 🚀 Deploying "Operation Empty Plate" to GitHub Pages

Since this is a fully static React + Vite web application, you can deploy it to **GitHub Pages** completely for free in just a few simple steps.

---

## 🛠️ Prerequisites

Make sure you have the following installed on your computer:
1. **Node.js** (v18 or higher)
2. **Git**

---

## 📦 Local Setup & Verification

Before uploading to GitHub, you should verify the project builds correctly on your computer:

1. **Extract the ZIP file** to a folder on your computer.
2. Open your terminal, navigate to the extracted folder, and run:
   ```bash
   pnpm install
   # or 'npm install' / 'yarn install' if you prefer
   ```
3. Run the local development server to test:
   ```bash
   pnpm dev
   ```
4. Open your browser to `http://localhost:5173` to see your site!

---

## 🌐 Deploying to GitHub Pages (The Easiest Way)

We can use the standard `gh-pages` npm package to automate building and publishing directly from your terminal.

### Step 1: Initialize Git Repository
If you haven't already initialized git in your folder, run:
```bash
git init
git add .
git commit -m "Initial commit"
```

### Step 2: Create a New GitHub Repository
1. Go to [GitHub](https://github.com/) and create a new **Public** repository (e.g., `operation-empty-plate`).
2. Do **NOT** initialize it with a README, `.gitignore`, or license.
3. Copy your repository's remote URL (it will look like `https://github.com/your-username/operation-empty-plate.git`).

### Step 3: Link Your Local Code to GitHub
In your local terminal, run:
```bash
git remote add origin https://github.com/your-username/operation-empty-plate.git
git branch -M main
git push -u origin main
```

### Step 4: Configure the Base Path in Vite
Because GitHub Pages hosts your project at a sub-path (e.g., `https://your-username.github.io/operation-empty-plate/`), you must tell Vite about this sub-path.

1. Open `vite.config.ts` in your code editor.
2. Add a `base` property with your repository name. For example:
   ```typescript
   import { defineConfig } from "vite";
   import react from "@vitejs/plugin-react";

   export default defineConfig({
     plugins: [react()],
     base: "/operation-empty-plate/", // 👈 Add this line (replace with your exact repo name)
     resolve: {
       alias: {
         "@": "/src",
       },
     },
   });
   ```

### Step 5: Install and Run Deploy Script
1. Install the `gh-pages` package as a dev dependency:
   ```bash
   pnpm add -D gh-pages
   # or 'npm install --save-dev gh-pages'
   ```
2. Open your `package.json` file and add the following scripts:
   ```json
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist",
     ...
   }
   ```
3. Run the deploy command in your terminal:
   ```bash
   pnpm deploy
   # or 'npm run deploy'
   ```

This command will automatically:
- Build your React application into the `dist` folder.
- Create a special `gh-pages` branch on GitHub.
- Push your built site directly to that branch.

---

## ⚙️ Enable GitHub Pages in Repository Settings

1. Go to your repository on GitHub.
2. Click the **Settings** tab.
3. In the left sidebar, click **Pages**.
4. Under **Build and deployment**, ensure:
   - **Source**: `Deploy from a branch`
   - **Branch**: `gh-pages`
   - **Folder**: `/ (root)`
5. Click **Save**.

Your site will be live at: **`https://your-username.github.io/operation-empty-plate/`**! 🎉

---

## 🎨 Custom Domains (Optional)

If you want to use a custom domain (like `emptyplate.tinyfoot.eco`) instead of the `.github.io` address:
1. In your GitHub repository **Settings** > **Pages**.
2. Under **Custom domain**, enter your domain name (e.g., `emptyplate.tinyfoot.eco`) and click **Save**.
3. In your DNS manager (like Cloudflare), create a **CNAME** record:
   - **Name**: `emptyplate`
   - **Target**: `your-username.github.io`
   - **Proxy status**: DNS Only (or Proxied if SSL is fully set up)
