# Ritik Kumar — Creative Portfolio & Design System

A premium, high-performance portfolio website built from scratch using a custom modular CSS design system. Architected for speed, responsiveness, and fluid interaction, the portfolio showcases commercial products and custom experimental web builds.

---

## 🚀 Technical Architecture & Stack

- **Core Framework**: React.js 19 (Vite)
- **Smooth Scrolling**: Lenis Scroll Engine
- **Choreographed Motion**: GSAP 3 (ScrollTrigger) & Framer Motion
- **Styling Paradigm**: Vanilla CSS (Modular Stylesheets per Component)
- **Typography System**: Google Fonts (DM Sans, DM Serif Display, Inter)
- **Backend Connector**: Node.js & Express contact pipeline hosted on Render
- **Assets Curation**: Premium vector graphics, SVGs, and high-fidelity project captures

---

## 🎨 Design System & Highlights

1. **Premium Dark Theme**
   - Sleek dark background overlaying customized assets to maintain high visual contrast.
   - Curated crimson/coral accent color system (`--accent-color: #f06a5f`).
   
2. **Dynamic Glassmorphic Cards**
   - Custom backdrops with `20px` blur filters and layered dark gradients.
   - 3D interactive transforms on hover featuring glowing red borders:
     `box-shadow: 0 45px 85px rgba(0, 0, 0, 0.75), 0 0 45px rgba(240, 106, 95, 0.28)`

3. **Asymmetric Curation Gallery**
   - Section 07 featuring centered headers, a dual 4:3 showcase grid with scroll parallax drift, and a clean 3-column detail layout below.

4. **Horizontal Scrolling Workflow**
   - Interactive horizontal scroll layout in Section 06 tracking design-to-deployment phases, integrated with glowing glassmorphic icons.



---

## 📂 Project Directory Structure

```text
MyPortfolio/
├── public/                 # Static assets (logo, favicon)
├── src/
│   ├── assets/             # Media and static images (workCollection, profiles)
│   ├── components/         # Modular React Components
│   │   ├── About/          # Profile bio & portrait
│   │   ├── Contact/        # Connect channels and footer
│   │   ├── ContactForm/    # Integrated contact panel
│   │   ├── ContactModal/   # Full screen portal form
│   │   ├── CustomCursor/   # Cursor tracer logic
│   │   ├── Experience/     # Career history timeline
│   │   ├── FeaturedWorks/  # Selected client videos
│   │   ├── Hero/           # Large serif intro headers
│   │   ├── Introduction/   # Core philosophy manifesto
│   │   ├── Loader/         # Kinetic load screen
│   │   ├── Navbar/         # Floating header & mobile drawer
│   │   ├── PersonalProjects/ # Personal work grid
│   │   └── Skills/         # Technical competency matrix
│   ├── App.jsx             # Section layout order routing
│   ├── App.css             # Root design variables & resets
│   └── main.jsx            # Application entry point
├── vercel.json             # Vercel deployment rewrite rules
└── package.json            # Dependencies configuration
```

---

## 🛠️ Local Development & Execution

### 1. Installation
Install all required package dependencies:
```bash
npm install
```

### 2. Run Locally (Dev Mode)
Start the local Vite development server:
```bash
npm run dev
```

### 3. Production Bundle Build
Generate optimized static distribution builds:
```bash
npm run build
```

---

## 🌐 Deployment Configuration

The codebase contains a `vercel.json` redirection scheme configured for Vercel Serverless Hosting, ensuring seamless single page application routing and load paths.
