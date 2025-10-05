# MAS.S60 2025 - Course Portfolio Website

A modern, interactive portfolio website for the MAS.S60 2025 course at MIT Media Lab, showcasing group projects, team members, and students.

## 🌟 Features

- **Full-page Scroll Snapping** - Smooth section-by-section navigation
- **Interactive Project Showcase** - Hover effects with color transitions
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Modern Typography** - Using Inter font throughout
- **Team & Student Profiles** - Circular avatars with descriptions

## 📂 Project Structure

```
MAS.S60_Final/
├── index.html              # Main HTML file
├── css/
│   ├── style.css          # Base styles and global layout
│   └── home.css           # Section-specific styles
├── js/
│   ├── app.js             # Core application logic
│   └── home.js            # Homepage interactions
├── images/
│   ├── cover.jpg          # Landing page cover image
│   ├── logo.svg           # Logo assets
│   └── members/           # Team member photos
│       ├── behnaz.png
│       ├── saetbyeol.png
│       ├── rui.png
│       ├── melo.png
│       ├── annie.png
│       ├── cyan.png
│       └── yuxiang.png
├── README.md              # This file
└── LICENSE
```

## 🎨 Website Sections

### 1. Landing Page

- Full-screen cover image
- Navigation menu (Group Projects | Team | Students)
- Animated down arrow for scrolling

### 2. Group Projects

- 5 course projects
- Each project displays:
  - Project name (left)
  - Team member names (right)
- Interactive hover effects with unique background colors
- Full viewport height (100vh)

### 3. Team

- Lead faculty member (left): Behnaz Farahi, PhD
- 6 team members (right, 3×2 grid):
  - Saetbyeol Leeyouk (MIT MAS)
  - Ruipeng Wang, M.Sc. (MIT MAS)
  - Qiyao Chen/Melo (Harvard)
  - Annie Xing (Harvard MDes)
  - Cyan D'Anjou (Harvard MDes)
  - Yuxiang Cheng (Harvard MDes)
- Circular profile images
- Academic affiliation and research areas

### 4. Students

- 23 course students organized in 5 groups
- 5 rows × 5 columns layout (last row has 3 students)
- Right-aligned on desktop
- Group labels on the left side of each row

## 🚀 How to Run

### Method 1: Python HTTP Server

```bash
# Navigate to project directory
cd /path/to/MAS.S60_Final

# Start server (Python 3)
python3 -m http.server 8000

# Open browser
# Visit: http://localhost:8000
```

### Method 2: Node.js HTTP Server

```bash
# Install http-server globally (if not installed)
npm install -g http-server

# Run server
http-server -p 8000

# Visit: http://localhost:8000
```

### Method 3: VS Code Live Server

1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## 🎯 Technical Details

### Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern layouts with Flexbox and Grid
- **Vanilla JavaScript** - No framework dependencies
- **Inter Font** - Google Fonts integration
- **Scroll Snap API** - Smooth section navigation

### Key CSS Features

- Scroll snapping on all sections
- Flexbox for flexible layouts
- CSS Grid for student/team member grids
- CSS transitions for smooth hover effects
- Responsive breakpoints at 1400px, 1200px, 960px, and 720px

### Browser Support

- Chrome 105+ (recommended)
- Safari 15.4+
- Firefox 121+
- Edge 105+

_Note: Requires modern browser support for CSS `:has()` selector and scroll-snap properties_

## 📝 Customization

### Adding Team Member Photos

1. Save photos as PNG files in `images/members/`
2. Use these exact filenames:
   - `behnaz.png`, `saetbyeol.png`, `rui.png`, `melo.png`, `annie.png`, `cyan.png`, `yuxiang.png`
3. Recommended image size: 300×300px or larger (will be cropped to circles)

### Updating Student Information

Edit `index.html` lines 68-116 to modify:

- Student names
- Group assignments
- Add/remove students

### Customizing Colors

Edit `css/home.css` to change hover colors:

- Lines 55-69: Project hover colors
- Line 85: Team section background
- Line 285: Students section background

### Adjusting Layout

- **Team member spacing**: Line 207 (`gap: 80px`)
- **Student card size**: Lines 352-357
- **Student group spacing**: Line 329 (`gap: 18px`)

## 🔧 Development Notes

### Scroll Snap Configuration

- Enabled in `css/style.css` lines 14-15
- Applied to all sections via line 123-124
- Mandatory snapping for consistent navigation

### Section Heights

- Landing Page: 100% viewport height
- Group Projects: 100vh
- Team: 100vh (with flex centering)
- Students: 100vh (with absolute centering)

## 📄 License

See [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Original design inspiration: [Behnaz Farahi's portfolio](https://behnazfarahi.com/)
- Course: MAS.S60 - Special Subject in Media Technology
- Institution: MIT Media Lab
- Year: 2025

---

**Last Updated:** October 2025  
**Maintained by:** MAS.S60 2025 Team
