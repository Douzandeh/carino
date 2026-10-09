# Carino 🚗

> Choose and buy your car.

Carino is a lightweight car-marketplace front end built with **Next.js (App Router)** and **React 19**. Users can browse listings, filter by category or price range, and view detailed information for each car.

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=black)
![License](https://img.shields.io/badge/license-MIT-green)

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Routes](#routes)
- [Data Model](#data-model)
- [Architecture Notes](#architecture-notes)
- [Known Limitations & Roadmap](#known-limitations--roadmap)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Browse cars**: home page highlights featured cars; `/cars` lists the full catalog.
- **Category browsing**: Sedan, SUV, Hatchback and Sport.
- **Price-range search**: filter listings by minimum and maximum price.
- **Car details page**: specs (brand, model, first registration, mileage, location), description and price.
- **Responsive UI**: mobile-friendly layouts via CSS media queries.
- **Server Components first**: data pages are rendered on the server; only interactive parts (search bar) are client components.

## Tech Stack

| Area        | Choice                                  |
| ----------- | --------------------------------------- |
| Framework   | [Next.js](https://nextjs.org) 16 (App Router) |
| UI          | React 19                                |
| Styling     | CSS Modules + a small global stylesheet |
| Images      | `next/image`                            |
| Linting     | ESLint 9 with `eslint-config-next` (core-web-vitals) |
| Data        | Static in-repo module (`carsData.js`)   |

## Getting Started

### Prerequisites

- **Node.js** `>= 20.9.0` (required by Next.js 16)
- **npm** (a `package-lock.json` is provided)

### Installation

```bash
# 1. Clone the repository
git clone <your-repo-url>
cd carino

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production build

```bash
npm run build
npm run start
```

## Available Scripts

| Script          | Description                         |
| --------------- | ----------------------------------- |
| `npm run dev`   | Start the dev server with HMR       |
| `npm run build` | Create an optimized production build |
| `npm run start` | Serve the production build          |
| `npm run lint`  | Run ESLint                          |

## Project Structure

```text
.
├── public/
│   └── images/                # Car images referenced by carsData
├── src/
│   ├── app/                   # Routes (App Router)
│   │   ├── layout.js          # Root layout (wraps pages with <Layout />)
│   │   ├── globals.css
│   │   ├── page.js            # Home
│   │   ├── cars/
│   │   │   ├── page.js        # All cars
│   │   │   └── [carId]/page.js        # Car details
│   │   ├── categories/
│   │   │   └── [category]/page.js     # Cars by category
│   │   └── filter/
│   │       └── [...slug]/page.js      # Price filter: /filter/:min/:max
│   ├── components/
│   │   ├── layout/            # Header / footer shell
│   │   ├── module/            # Reusable UI pieces (Card, SearchBar, Categories, buttons…)
│   │   ├── templates/         # Page-level compositions (CarsPage, CarsList, CarDetails)
│   │   └── icons/             # SVG icon components
│   └── data/
│       └── carsData.js        # Static car listings
├── eslint.config.mjs
├── jsconfig.json              # "@/*" → "./src/*" alias
├── next.config.mjs
└── package.json
```

### Component layering

- **`layout/`**: global chrome (header, footer).
- **`module/`**: small, reusable building blocks with their own CSS Module.
- **`templates/`**: compose modules into full page sections; receive data via props.
- **`app/**/page.js`**: fetch/filter data and hand it to a template. Pages stay thin.

## Routes

| Route                         | Description                                   |
| ----------------------------- | --------------------------------------------- |
| `/`                           | Home: search bar, categories, 3 featured cars |
| `/cars`                       | Full catalog                                  |
| `/cars/[carId]`               | Details for a single car                      |
| `/categories/[category]`      | Cars filtered by `sedan`, `suv`, `hatchback`, `sport` |
| `/filter/[min]/[max]`         | Cars whose price is between `min` and `max`   |

## Data Model

Each car in `src/data/carsData.js` follows this shape:

```js
{
  id: 1,                       // unique, 1-based
  name: "Dodge",               // brand
  model: "Challenger 362",
  year: "2018",                // first registration
  distance: "56000",           // kms driven
  location: "Germany",
  price: 41399,                // number (USD)
  description: "…",
  image: "/images/Dodge.jpeg", // path inside /public
  category: "sport",           // sedan | suv | hatchback | sport
}
```

**Adding a car:** append an object to `carsData`, drop its image in `public/images/`, and use one of the supported categories.

## Architecture Notes

- **Server vs. client components**: only `SearchBar` uses `"use client"` (it needs state and `useRouter`). Everything else stays on the server, keeping the client bundle small.
- **Dynamic params are async**: in Next.js 15+/16, `params` is a Promise, so pages `await params` before use.
- **Path alias**: `@/` resolves to `src/` (see `jsconfig.json`).
- **Styling**: each component owns a `*.module.css` file, so class names are locally scoped. The brand color is `#befa00`.

## Known Limitations & Roadmap

Honest notes on current trade-offs, and where I'd take the project next:

- [ ] **Look up cars by `id`, not array index.** `/cars/[carId]` currently uses `carsData[carId - 1]`, which breaks if the list is reordered or an item is removed. Switch to `carsData.find(c => c.id === Number(carId))` and call `notFound()` when missing.
- [ ] **Add a proper 404 for the filter page.** It currently renders a plain `NotFound` heading; use `notFound()` / a `not-found.js` file instead.
- [ ] **Make price filtering inclusive** (`>=` / `<=`) and validate numeric input (and `min <= max`) in `SearchBar`.
- [ ] **Replace `alert()`** in `SearchBar` with inline validation messages.
- [ ] **Format values**: show thousands separators for price and mileage; the "Inter min-price" placeholder should read "Enter min price".
- [ ] **Accessibility**: add `rel="noopener noreferrer"` to the external footer link, and make sure interactive elements have clear focus states.
- [ ] **Metadata / SEO**: add `metadata` (title, description, Open Graph) per route and `generateStaticParams` for car details.
- [ ] **Real data source**: move from the static module to an API or database.
- [ ] **Tests**: add unit tests (Vitest/Jest + Testing Library) and an e2e smoke test (Playwright).
- [ ] **TypeScript** migration for safer data contracts.
- [ ] Implement the **Buy** action (currently a placeholder button).

## Contributing

1. Fork the repo and create a feature branch: `git checkout -b feat/my-change`
2. Make your changes and run `npm run lint`
3. Commit using clear messages (Conventional Commits are encouraged: `feat:`, `fix:`, `docs:`…)
4. Open a pull request describing **what** changed and **why**

## License

Released under the [MIT License](./LICENSE). © 2026 Hossein.
