# Astro + Tailwind Starter Template

This is a starter template for building high-performance websites with Astro and Tailwind CSS.
It includes a pre-configured setup with a clean project structure and reusable UI components.

## Features

- **Astro 5.0**: The latest version of the modern web framework.
- **Tailwind CSS**: Utility-first CSS framework configured with a custom theme.
- **UI Components**: Reusable `Button` and `Card` components.
- **Dark Mode**: Built-in dark theme variables (check `src/styles/global.css`).
- **Clean Structure**: Organized `components/`, `layouts/`, and `pages/` directories.

## Getting Started

1.  **Install dependencies:**

    ```bash
    npm install
    ```

2.  **Start development server:**

    ```bash
    npm run dev
    ```

3.  **Build for production:**

    ```bash
    npm run build
    ```

## Project Structure

```text
/
├── public/
├── src/
│   ├── components/
│   │   └── ui/
│   │       ├── Button.astro
│   │       └── Card.astro
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   └── index.astro
│   └── styles/
│       └── global.css
├── astro.config.mjs
├── tailwind.config.mjs
└── package.json
```

## Customization

- **Colors**: Edit `src/styles/global.css` to change the CSS variables for the theme.
- **Tailwind Config**: Update `tailwind.config.mjs` to extend the theme further.
