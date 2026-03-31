<div align="center">

# 💬 GIT LIVE CHAT

<img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&weight=600&size=28&pause=1000&color=FFFFFF&center=true&vCenter=true&width=600&lines=Real-Time+GitHub+Chat;Click+Below+to+Send+Message;Built+with+Pusher+%26+Vercel;Join+the+Conversation!" alt="Typing SVG" />

[![GitHub Stars](https://img.shields.io/github/stars/JustLachin/git-live-chat?style=for-the-badge&logo=github&color=yellow&labelColor=black)](https://github.com/JustLachin/git-live-chat/stargazers)
[![Live Demo](https://img.shields.io/badge/LIVE-CHAT-success?style=for-the-badge&logo=vercel&color=green&labelColor=black)](https://git-live-chat.vercel.app)
[![License](https://img.shields.io/badge/LICENSE-MIT-blue?style=for-the-badge&color=blue&labelColor=black)](LICENSE)

</div>

---

## 🚀 LIVE CHAT

<div align="center">

<a href="https://git-live-chat.vercel.app" target="_blank">
  <img src="https://git-live-chat.vercel.app/api/og" width="100%" alt="Live Chat" />
</a>

**👆 Click above to open the live chat!**

</div>

---

## ⚡ FEATURES

<table>
<tr>
<td width="50%">

### 🎯 Core Features
- ✅ **Quick Messages** - Send via GitHub Issues
- ✅ **Full Chat App** - Real-time with GitHub OAuth
- ✅ **No Login Required** - For quick messages
- ✅ **Auto avatars** - From your GitHub profile
- ✅ **Online counter** - See active users
- ✅ **No message limit** - Chat freely
- ✅ **Mobile responsive** - Works everywhere

</td>
<td width="50%">

### 🛠️ Tech Stack
- ⚛️ **Next.js 14** - React framework
- 🔐 **NextAuth.js** - GitHub OAuth
- 📡 **Pusher Channels** - WebSocket real-time
- 🎨 **TailwindCSS** - Styling
- ☁️ **Vercel** - Deployment
- 🐙 **GitHub API** - User authentication
- 📬 **GitHub Issues** - Quick messaging

</td>
</tr>
</table>

---

## 📊 REPOSITORY STATS

<div align="center">

![GitHub Activity](https://github-readme-activity-graph.vercel.app/graph?username=JustLachin&theme=github-compact&hide_border=true&area=true)

<img src="https://github-readme-stats.vercel.app/api?username=JustLachin&show_icons=true&theme=default&hide_border=true&count_private=true" width="48%" />
<img src="https://github-readme-streak-stats.herokuapp.com/?user=JustLachin&theme=default&hide_border=true" width="48%" />

</div>

---

## 🎬 HOW IT WORKS

### Quick Message (GitHub Issues)
1. Click "Send Message" button above
2. Fill in your name and message
3. Click "Submit new issue"
4. Done! Your message is posted

### Full Chat App
1. Click "Open Full Chat" button
2. Sign in with GitHub
3. Start chatting in real-time
4. See who's online and chat history

---

## 🔧 LOCAL SETUP

Want to run this locally or deploy your own version?

### 1️⃣ Clone Repository

```bash
git clone https://github.com/JustLachin/git-live-chat.git
cd git-live-chat
npm install
```

### 2️⃣ Configure Pusher

1. Create account at [pusher.com](https://pusher.com)
2. Create new **Channels** app
3. Copy credentials from **App Keys** tab

### 3️⃣ Configure GitHub OAuth

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Create **New OAuth App**:
   - **Name**: `Git Live Chat`
   - **Homepage**: `http://localhost:3000`
   - **Callback**: `http://localhost:3000/api/auth/callback/github`
3. Copy **Client ID** and **Client Secret**

### 4️⃣ Environment Variables

Create `.env.local`:

```env
# Pusher
PUSHER_APP_ID=your_app_id
PUSHER_KEY=your_key
PUSHER_SECRET=your_secret
PUSHER_CLUSTER=eu

NEXT_PUBLIC_PUSHER_KEY=your_key
NEXT_PUBLIC_PUSHER_CLUSTER=eu

# GitHub OAuth
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate_random_32_char_string
```

### 5️⃣ Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🌐 DEPLOY TO VERCEL

<div align="center">

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/JustLachin/git-live-chat)

</div>

### Manual Deploy:

```bash
npm i -g vercel
vercel
```

Add environment variables in Vercel Dashboard and update GitHub OAuth callback URL.

---

## 🤝 CONTRIBUTING

Contributions welcome! Here's how:

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing`
5. Open Pull Request

---

## 📄 LICENSE

MIT License - see [LICENSE](LICENSE) for details.

---

## 🔗 LINKS

<div align="center">

[![Portfolio](https://img.shields.io/badge/Portfolio-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://justlachin.dev)
[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/JustLachin)
[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/JustLachin)

</div>

---

<div align="center">

### ⭐ STAR THIS REPO IF YOU LIKE IT! ⭐

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=0,2,3,4,5&height=100&section=footer" width="100%" />

**Made with 🔥 by [JustLachin](https://github.com/JustLachin)**

**🐺 The wolf runs alone — but always leaves the door open for the right pack.**

</div>
