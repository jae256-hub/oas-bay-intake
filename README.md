# OAS Bay Intake — Oyera Auto Service Bay Ltd

> **Refactory Vue.js Course — Week 1 Assignment**  
> Student: Joshua  

## Overview

A Job Card Intake web app for **Oyera Auto Service Bay Ltd**, built with **Vue 3 + Vite**. Technicians log in, register vehicles, pick services, issue parts from stock, and see a live running total with a confirmation summary.

---

## How to Run

```bash
npm install
npm run dev
# open http://localhost:5173
```

---

## File Structure

```
oas-bay-intake/
├── index.html
├── package.json
├── vite.config.ts
└── src/
    ├── main.js
    ├── App.vue
    ├── assets/
    │   ├── base.css
    │   └── main.css
    ├── router/
    │   └── index.js
    ├── components/
    │   ├── HomePage.vue
    │   └── Navbar.vue
    └── views/
        ├── Login.vue
        ├── IntakeView.vue
        ├── JobCardForm.vue
        ├── PartCard.vue
        └── ConfirmationCard.vue
```

---

## Tech Stack

- Vue 3 (Composition API, `<script setup>`)
- Vite
- Vue Router
- Bootstrap 5
- TypeScript (in form components)
