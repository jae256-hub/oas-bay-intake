<img width="1686" height="816" alt="Screenshot 2026-08-17 231635" src="https://github.com/user-attachments/assets/92e49a6c-3904-4867-8296-d172f7f450b0" />
<img width="1686" height="816" alt="Screenshot 2026-08-17 231635" src="https://github.com/user-attachments/assets/df148c36-b970-440a-a1f8-76336c806a09" />
# OAS Bay Intake — Oyera Auto Service Bay Ltd

> **Refactory Vue.js Course — Week 1 Assignment**  
> Student: Joshua  
> Marks: 50

## Overview

A single-page **Job Card Intake** application built in **Vue 3 + Vite** (TypeScript). A Senior Technician registers a vehicle, selects services, issues parts from live stock, and sees a real-time running total and confirmation card.

---

## How to Run

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open your browser at:
#    http://localhost:5173
```

---

## File Structure

```
oas-bay-intake/
├── index.html
├── package.json
├── vite.config.ts
└── src/
    ├── main.ts                          # App entry point
    ├── App.vue                          # Root shell with header/footer
    ├── assets/
    │   └── main.css                     # Global design tokens + resets
    └── components/
        ├── JobCardForm.vue              # Part B + C: main intake form
        ├── PartCard.vue                 # Part C: child card component
        └── ConfirmationCard.vue         # Part E: live summary panel
```

---

## Vue Concepts Demonstrated

| Concept | Where |
|---|---|
| Vite + Vue 3 project scaffolded | `package.json`, `vite.config.ts` |
| ≥ 3 Single File Components (SFCs) | `App.vue`, `JobCardForm.vue`, `PartCard.vue`, `ConfirmationCard.vue` |
| `ref()` for simple values | `parts`, `issuedParts`, `plateError`, `ownerError` |
| `reactive()` for complex object | `jobCard` in `JobCardForm.vue` |
| `v-model` on ≥ 3 inputs | Plate, Owner, Vehicle Class, checkboxes |
| `v-for` with `:key` | Services checkboxes, parts grid, confirmation tags |
| `v-if` / `v-else` | "Issue to Job" vs "Out of Stock", placeholder text |
| Props parent → child | `PartCard` receives `name`, `unitPrice`, `qtyInStock`; `ConfirmationCard` receives job data |
| Emits child → parent | `PartCard` emits `issue-part`; parent reduces stock + adds to total |
| `onMounted` lifecycle | Logs "OAS Bay Intake loaded" + pre-populates parts array |
| Scoped CSS | `PartCard.vue` and all other components use `<style scoped>` |
| Read-only Labour charge | `<input disabled>` pre-filled with UGX 20,000 |
| Live running total | `grandTotal` computed property via `{{ }}` interpolation |

---

## Business Rules Implemented

- **Plate format** — `3 letters, space, 3 digits, 1 letter` (e.g. `UBK 123A`) — validated with regex
- **Owner name** — Alphabets + spaces only, ≥ 2 characters
- **Labour charge** — Fixed UGX 20,000, read-only `<input disabled>`
- **Wheel Alignment** — Fixed UGX 30,000, labelled "fixed"
- **Wheel Balancing** — Fixed UGX 20,000, labelled "fixed"
- **Parts stock** — "Issue to Job" only shown when `qtyInStock > 0`; "Out of Stock" shown otherwise
- **Stock decrements** — Each issue click reduces `qtyInStock` by 1 reactively

---

## Screenshot

> *(Add a screenshot of `http://localhost:5173` here after running the app)*

![OAS Bay Intake Screenshot](./screenshot.png)

---

## Tech Stack

- **Vue 3** (Composition API, `<script setup>`)
- **Vite** (dev server + bundler)
- **TypeScript**
- **Plain CSS** (no UI libraries — Vuetify / PrimeVue explicitly excluded per spec)
