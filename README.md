# Team Enigma Portfolio Website

A modern, clean, and minimal portfolio website for Team Enigma - a research-driven student team from SLIIT (Sri Lanka Institute of Information Technology).

![Next.js](https://img.shields.io/badge/Next.js-16.0.5-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8)

## 🎯 About

Team Enigma is a multidisciplinary research and competition team bringing together talented students from Computer Systems Engineering and Computer Science programs. This website showcases our research projects, team members, competitions, and achievements.

## ✨ Features

- **Responsive Design** - Fully mobile-responsive layout that works on all devices
- **Modern UI/UX** - Clean, minimal, academic-style design with smooth transitions
- **Sticky Navigation** - Easy navigation with sticky top navbar
- **Smooth Scrolling** - Seamless scrolling between sections
- **Performance Optimized** - Built with Next.js App Router for optimal performance
- **SEO Friendly** - Proper meta tags and semantic HTML

## 📑 Sections

1. **Navbar** - Sticky navigation with links to all sections
2. **Hero Section** - Eye-catching introduction with call-to-action buttons
3. **About** - Overview of Team Enigma and our mission
4. **Members** - Showcase of team members with their roles and expertise
5. **Research** - Display of current research work and publications
6. **Projects** - Portfolio of active and planned projects
7. **Competitions** - Timeline of competitions and achievements
8. **Contact** - Contact information and location
9. **Footer** - Copyright and institutional information

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd team-enigma-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the website.

## 🛠️ Built With

- **[Next.js 16](https://nextjs.org/)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Inter Font](https://fonts.google.com/specimen/Inter)** - Modern, clean typography

## 📁 Project Structure

```
team-enigma-portfolio/
├── app/
│   ├── layout.tsx      # Root layout with metadata
│   ├── page.tsx        # Main page with all sections
│   └── globals.css     # Global styles and Tailwind imports
├── public/             # Static assets
├── next.config.ts      # Next.js configuration
├── tailwind.config.ts  # Tailwind CSS configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Project dependencies
```

## 🎨 Customization

### Updating Team Members

Edit the members array in `app/page.tsx`:

```tsx
// Find the Members Section and update the cards
<div className="bg-white rounded-xl shadow-md p-6...">
  <h3>Your Name</h3>
  <p>Your Role</p>
  <p>Your Description</p>
</div>
```

### Adding Projects

Add new project cards in the Projects Section:

```tsx
<div className="bg-white rounded-xl shadow-md...">
  <h3>Project Name</h3>
  <p>Project Description</p>
</div>
```

### Changing Colors

Update Tailwind color classes throughout the components or modify the theme in `tailwind.config.ts`.

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🌐 Deployment

This project can be easily deployed on:

- **[Vercel](https://vercel.com)** (Recommended)
- **[Netlify](https://netlify.com)**
- **[Railway](https://railway.app)**
- Any platform supporting Next.js

### Deploy to Vercel

1. Push your code to GitHub
2. Import the repository on Vercel
3. Deploy with default settings

## 👥 Team Members

- **Dilusha Chamika** - Computer Systems Engineering Undergraduate
- **Hesara Perera** - Computer Science Undergraduate
- **Sandil Perera** - Computer Science Undergraduate

## 📧 Contact

Team Email: contact@teamenigma.lk  
Location: SLIIT, Malabe, Sri Lanka

## 📄 License

© 2025 Team Enigma. All rights reserved.

---

Built with ❤️ by Team Enigma
