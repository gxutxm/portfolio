# 🎮 Portfolio Game

A top-down pixel art portfolio website disguised as a game! Explore the room, interact with stalls, and discover everything about the developer.

## 🚀 Quick Start

1. Open `index.html` in a browser (use a local server for best results)
2. Use **WASD** or **Arrow Keys** to move
3. Press **E** to interact with stalls when prompted

### Running Locally

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## 🎨 Customizing Your Portfolio

All your content is in **`js/config.js`**. Edit the `PORTFOLIO_DATA` object:

### Personal Info
```javascript
PORTFOLIO_DATA = {
    name: "Your Name",
    title: "Your Title / Role",
    // ...
}
```

### Resume
```javascript
resume: {
    summary: "Your professional summary here.",
    downloadUrl: "/path/to/your/resume.pdf",
}
```

### Social Links
```javascript
social: [
    { name: "GitHub", url: "https://github.com/you", icon: "🐙" },
    { name: "LinkedIn", url: "https://linkedin.com/in/you", icon: "💼" },
    // Add more...
]
```

### Projects
```javascript
projects: [
    {
        title: "Project Name",
        description: "What it does",
        tags: ["Python", "React"],
        url: "https://project-link.com",
        github: "https://github.com/you/project"
    },
    // Add more...
]
```

### Skills
```javascript
skills: [
    { name: "Python", level: 90 },  // 0-100
    { name: "JavaScript", level: 85 },
    // Add more...
]
```

### Timeline
```javascript
timeline: [
    {
        date: "2024",
        title: "Current Role",
        description: "What you're doing now"
    },
    // Add more (oldest last)...
]
```

### Trophies/Achievements
```javascript
trophies: [
    { name: "Award Name", icon: "🏆" },
    // Add more...
]
```

### Chatbot Responses
```javascript
chatbotResponses: {
    greeting: "Your welcome message",
    skills: "Response about skills",
    projects: "Response about projects",
    // Customize all responses...
}
```

## 📁 Project Structure

```
portfolio-game/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # All styling
├── js/
│   ├── config.js       # ⭐ YOUR CONTENT HERE
│   ├── sprites.js      # Procedural sprite generation
│   ├── modals.js       # Modal/popup system
│   ├── main.js         # Game initialization
│   └── scenes/
│       ├── BootScene.js    # Loading scene
│       └── GameScene.js    # Main game logic
└── assets/             # For custom assets (optional)
    ├── sprites/
    ├── tiles/
    └── audio/
```

## 🎵 Adding Music

1. Add your audio file to `assets/audio/`
2. Update the jukebox in `GameScene.js` to load and play it
3. Or use Web Audio API in `modals.js` jukebox section

## 🎨 Customizing Visuals

### Colors
Edit `GAME_CONFIG.colors` in `config.js`:
```javascript
colors: {
    floor: 0x2d3436,
    player: 0x4ade80,  // Your color
    // ...
}
```

### CSS Theme
Edit CSS variables in `style.css`:
```css
:root {
    --primary: #4ade80;
    --secondary: #f472b6;
    --accent: #fbbf24;
    // ...
}
```

## 🛠️ Advanced Customization

### Adding New Stalls

1. Add position in `config.js`:
```javascript
STALL_POSITIONS.newStall = { x: 10, y: 10 };
```

2. Generate sprite in `sprites.js`:
```javascript
this.generateStall('newStall', 0xff0000, '🆕');
```

3. Add to stall list in `GameScene.js`

4. Add modal content in `modals.js`:
```javascript
newStallContent() {
    return `<h2>New Stall</h2><p>Content here</p>`;
}
```

### Room Size
Adjust in `config.js`:
```javascript
roomWidth: 25,  // tiles
roomHeight: 18, // tiles
```

## 📱 Mobile Support

The game includes basic responsive design. For full mobile support, consider adding:
- Touch controls (virtual joystick)
- Tap-to-interact instead of E key
- Larger touch targets

## 🚀 Deployment

Deploy to any static hosting:
- GitHub Pages
- Netlify
- Vercel
- Firebase Hosting

Just upload all files - no build step required!

## 🐛 Troubleshooting

**Game not loading?**
- Use a local server (CORS issues with `file://`)
- Check browser console for errors

**Sprites not appearing?**
- Phaser may still be loading
- Check if `SpriteGenerator` ran successfully

**Modal not opening?**
- Ensure `modalManager` is initialized
- Check for JavaScript errors

## 📜 License

MIT License - Use freely for your portfolio!

---

Made with 💚 and Phaser.js
