# Repository Guidelines

## Project Structure & Module Organization

This repository is a small static HTML guide. The main page is `index.html` inside the top-level guide directory, with page styles in `style.css` and small interactions in `script.js`. Screenshot assets used by the page are stored beside it as numbered PNG files, for example `1.PNG`, `2.png`, and `13.PNG`.

Keep new page-specific assets close to the HTML that references them. If the project grows beyond a single guide, create one directory per guide and keep each guide's `index.html` and images together.

## Build, Test, and Development Commands

There is no package manager, build step, or generated output in the current project.

- Open locally: double-click the guide directory's `index.html` or open it from a browser.
- Optional local server: run `python -m http.server 8000` from the repository root, then visit the guide directory URL under `http://localhost:8000/`.
- File inventory: run `rg --files` to list tracked project files quickly.

Do not add build tooling unless the site needs reusable components, bundling, or automated checks.

## Coding Style & Naming Conventions

Use standard HTML5 in `index.html` and keep visual styling in `style.css`. Match the current two-space CSS indentation and concise selector style. Prefer semantic HTML elements such as `header`, `section`, `h1`, `h2`, `p`, `ul`, and `li`.

Preserve UTF-8 encoding and Russian text content. Keep image references relative, for example `src="1.PNG"`. When adding assets, use clear numeric or descriptive filenames and ensure the case in HTML exactly matches the filename on disk.

## Testing Guidelines

Testing is manual for now. After edits, open the page in a browser and verify:

- All screenshots load without broken image icons.
- Text is readable on desktop and narrow mobile widths.
- Links, code blocks, and step numbering render as expected.

If JavaScript or multi-page behavior is added later, add a lightweight automated check and document the command here.

## Commit & Pull Request Guidelines

This folder currently has no Git history, so no local commit convention can be inferred. Use short, imperative commit messages, such as `Update instruction screenshots` or `Fix mobile layout`.

Pull requests should include a brief description, screenshots for visual changes, and notes about manual browser checks performed. Link related issues or task descriptions when available.

## Agent-Specific Instructions

Keep changes narrowly scoped. Do not rename the guide directory or numbered screenshot files unless updating every reference and confirming the page still renders.
