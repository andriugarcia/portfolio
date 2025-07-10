# Portfolio with Automatic Resume Generation

A modern, fast, and responsive portfolio website built with **Astro** and **Tailwind CSS**. This static site generator-powered portfolio features automatic PDF resume generation directly from structured data.

## ✨ Features

- **🚀 Astro-powered**: Ultra-fast static site generation with optimal performance
- **📱 Responsive Design**: Beautiful UI that works on all devices
- **📄 Automatic Resume Generation**: Generate PDF resumes dynamically from JSON data
- **🎨 Modern UI Components**: Built with Radix UI and Tailwind CSS
- **⚡ Performance-first**: Optimized for speed and SEO
- **🔧 TypeScript**: Fully typed for better development experience

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **PDF Generation**: jsPDF with autoTable
- **Language**: TypeScript
- **Deployment**: Static site generation ready

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── data/               # Portfolio content (JSON)
│   ├── about.json      # Personal information
│   ├── experience.json # Work experience data
│   └── filters.json    # Project filtering options
├── pages/              # Astro pages
├── resume/             # PDF resume generation logic
├── types/              # TypeScript type definitions
└── styles/             # Global styles
```

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio-1
   ```

2. **Install dependencies**
   ```bash
   yarn install
   # or
   npm install
   ```

3. **Start development server**
   ```bash
   yarn dev
   # or
   npm run dev
   ```

4. **Build for production**
   ```bash
   yarn build
   # or
   npm run build
   ```

## 📄 Resume Generation

The portfolio features an automatic resume generation system that:
- Reads experience data from `src/data/experience.json`
- Generates a professional PDF resume using jsPDF
- Maintains consistent formatting and styling
- Supports multiple sections including experience, projects, and highlights

## 🎨 Customization

1. **Update personal information**: Edit `src/data/about.json`
2. **Add work experience**: Update `src/data/experience.json`
3. **Modify styling**: Customize Tailwind classes or add to `src/styles/`
4. **Add projects**: Update the experience data with project information

## 📦 Key Dependencies

- `astro` - Static site generator
- `@astrojs/react` - React integration for Astro
- `@radix-ui/*` - Accessible UI components
- `jspdf` & `jspdf-autotable` - PDF generation
- `tailwindcss` - Utility-first CSS framework

## 🌟 About

This portfolio is designed for frontend developers who want a fast, modern, and feature-rich personal website with the ability to generate professional resumes on-demand. Built with performance and user experience in mind.
