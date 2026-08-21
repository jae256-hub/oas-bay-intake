<script setup lang="ts">
// App.vue — Root component
// Imports Google Fonts and renders the page header + JobCardForm
import JobCardForm from "./components/JobCardForm.vue";
</script>

<template>
  <div class="app-shell">
    <!-- Page header / brand bar -->
    <header class="app-header">
      <div class="header-inner">
        <div class="brand">
          <div class="brand-logo">OAS</div>
          <div class="brand-text">
            <span class="brand-name">Oyera Auto Service</span>
            <span class="brand-tag">Bay Job Card Intake System</span>
          </div>
        </div>
        <div class="header-badge">
          <span class="badge-dot"></span>
          <span>System Online</span>
        </div>
      </div>
    </header>

    <main class="app-main">
      <!-- JobCardForm is the single-page SFC for all intake logic -->
      <JobCardForm />
    </main>

    <footer class="app-footer">
      <p>
        © 2024 Oyera Auto Service Bay Ltd &mdash; Refactory Vue.js Course | Week
        1 Assignment
      </p>
    </footer>
  </div>
</template>

<style scoped>
/* Google Fonts import — Inter typeface */
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap");

.app-shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* ── Header ── */
.app-header {
  background: linear-gradient(135deg, #111420 0%, #1a1d27 100%);
  border-bottom: 1px solid #2e3147;
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(12px);
}

.header-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 1rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.brand {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.brand-logo {
  background: linear-gradient(135deg, #4f7cff, #a78bfa);
  color: #fff;
  font-size: 0.95rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  border-radius: 10px;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 14px rgba(79, 124, 255, 0.35);
}

.brand-text {
  display: flex;
  flex-direction: column;
}

.brand-name {
  font-size: 1rem;
  font-weight: 700;
  color: #e2e8f0;
  line-height: 1.2;
}

.brand-tag {
  font-size: 0.72rem;
  color: #64748b;
  letter-spacing: 0.03em;
}

.header-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.3);
  border-radius: 20px;
  padding: 0.35rem 0.85rem;
  font-size: 0.78rem;
  font-weight: 600;
  color: #22c55e;
}

.badge-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #22c55e;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
}

/* ── Main ── */
.app-main {
  flex: 1;
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
  padding: 2rem 1.5rem 3rem;
}

/* ── Footer ── */
.app-footer {
  border-top: 1px solid #2e3147;
  padding: 1rem 1.5rem;
  text-align: center;
  font-size: 0.78rem;
  color: #475569;
}
</style>
