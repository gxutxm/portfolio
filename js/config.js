// === GAME CONFIGURATION ===

const GAME_CONFIG = {
    width: 1920,
    height: 1080,
    tileSize: 32,
    playerSpeed: 200,
    
    // Room dimensions (in tiles) - 60x34 tiles = 1920x1088
    roomWidth: 60,
    roomHeight: 34,
    
    // Colors for procedural sprites
    colors: {
        // Floor
        floor: 0x3d4f5f,
        floorAlt: 0x4a5d6e,
        floorAccent: 0x2c3a47,
        floorWood: 0x5d4e37,
        floorWoodDark: 0x4a3f2f,
        
        // Walls
        wall: 0x5d6d7e,
        wallTop: 0x85929e,
        wallDark: 0x2c3e50,
        
        // Player - BLUE CHARACTER
        playerBody: 0x3498db,
        playerBodyDark: 0x2980b9,
        playerBodyLight: 0x5dade2,
        playerFace: 0x85c1e9,
        playerEyes: 0xffffff,
        
        // Receptionist
        recepBody: 0x9b59b6,
        recepBodyDark: 0x8e44ad,
        recepFace: 0xbb8fce,
        
        // Furniture & Decor
        wood: 0x8b5a2b,
        woodDark: 0x654321,
        woodLight: 0xa67c52,
        stone: 0x7f8c8d,
        stoneDark: 0x5d6d7e,
        
        // Stall colors
        resumeColor: 0x27ae60,
        socialColor: 0xe91e63,
        projectsColor: 0x9b59b6,
        skillsColor: 0xf39c12,
        timelineColor: 0x00bcd4,
        trophiesColor: 0xffc107,
        contactColor: 0xe74c3c,
        jukeboxColor: 0x8e44ad,
        infoDeskColor: 0x1abc9c,
        
        // Effects
        fireOrange: 0xff6b35,
        fireYellow: 0xffd93d,
        fireRed: 0xc0392b,
        torchWood: 0x5d4e37,
        
        // Nature
        treeTrunk: 0x6d4c41,
        treeLeaves: 0x27ae60,
        treeLeavesLight: 0x2ecc71,
        
        // Path
        pathStone: 0x95a5a6,
        pathStoneDark: 0x7f8c8d,
        
        // Rug
        rugRed: 0xc0392b,
        rugGold: 0xd4af37,
        rugPattern: 0x922b21,
    }
};

// === PORTFOLIO DATA - CUSTOMIZE THIS! ===

const PORTFOLIO_DATA = {
    name: "GG",
    title: "Developer",
    
    aboutMe: {
        bio: "I'm a passionate developer who loves building interactive experiences and solving complex problems with elegant code.",
        interests: ["Web Development", "Data Science", "Game Design", "Machine Learning"],
        funFacts: [
            "🎮 Built this portfolio as a game!",
            "☕ Coffee enthusiast",
            "🌙 Night owl coder",
            "📚 Always learning something new"
        ]
    },
    
    resume: {
        summary: "A passionate developer who loves creating interactive experiences.",
        downloadUrl: "#",
    },
    
    social: [
        { name: "GitHub", url: "https://github.com/yourusername", icon: "🐙" },
        { name: "LinkedIn", url: "https://linkedin.com/in/yourusername", icon: "💼" },
        { name: "Twitter", url: "https://twitter.com/yourusername", icon: "🐦" },
        { name: "Email", url: "mailto:you@email.com", icon: "📧" },
    ],
    
    projects: [
        {
            title: "Project Alpha",
            description: "A cool project that does amazing things with data.",
            tags: ["Python", "NumPy", "Pandas"],
            url: "#",
            github: "#"
        },
        {
            title: "Project Beta",
            description: "An interactive web application built with modern tech.",
            tags: ["JavaScript", "React", "Node.js"],
            url: "#",
            github: "#"
        },
        {
            title: "Project Gamma",
            description: "Machine learning model for predictive analytics.",
            tags: ["Python", "TensorFlow", "Scikit-learn"],
            url: "#",
            github: "#"
        }
    ],
    
    skills: [
        { name: "Python", level: 90 },
        { name: "JavaScript", level: 85 },
        { name: "NumPy/Pandas", level: 88 },
        { name: "React", level: 75 },
        { name: "SQL", level: 80 },
        { name: "Git", level: 85 }
    ],
    
    timeline: [
        {
            date: "2024",
            title: "Current Role",
            description: "Working on exciting projects and learning new technologies."
        },
        {
            date: "2023",
            title: "Previous Experience",
            description: "Built impactful solutions and grew as a developer."
        },
        {
            date: "2022",
            title: "Started Journey",
            description: "Began learning programming and fell in love with code."
        }
    ],
    
    trophies: [
        { name: "Dean's List", icon: "🏆" },
        { name: "Hackathon Winner", icon: "🥇" },
        { name: "Open Source Contributor", icon: "⭐" },
        { name: "Certified Developer", icon: "📜" }
    ],
    
    chatbotResponses: {
        greeting: "Hey there! 👋 Welcome to GG's Helpdesk! Ask me about skills, projects, experience, or just say hi!",
        skills: "I'm proficient in Python, JavaScript, and data analysis tools like NumPy and Pandas. I also work with React for frontend development!",
        projects: "Check out the Projects stall to see my work! I've built data analysis tools, web applications, and ML models.",
        education: "I'm currently focused on numerical methods and statistics, building a strong foundation in computational mathematics.",
        contact: "You can reach me through the social links or drop a message at the Contact Mailbox!",
        hobbies: "When I'm not coding, I enjoy learning new technologies and working on side projects.",
        default: "That's an interesting question! Feel free to explore the room to learn more about me, or ask about my skills, projects, or experience."
    },
    
    easterEggs: [
        "🎮 Fun fact: This entire portfolio is a game!",
        "☕ I'm powered by coffee and curiosity.",
        "🌙 I do my best coding at night.",
        "🎵 Lo-fi beats are my coding soundtrack."
    ]
};

// === STALL POSITIONS (in tile coordinates) ===

const STALL_POSITIONS = {
    // Center area for title on floor
    floorTitle: { x: 30, y: 17 },
    
    // Helpdesk - CENTER RIGHT
    helpdesk: { x: 48, y: 17 },
    
    // Stalls spread around evenly
    resume: { x: 10, y: 9 },
    aboutMe: { x: 22, y: 9 },
    social: { x: 50, y: 9 },
    projects: { x: 10, y: 25 },
    skills: { x: 50, y: 25 },
    timeline: { x: 10, y: 17 },
    trophies: { x: 30, y: 28 },
    contact: { x: 38, y: 9 },
};
