<script setup lang="ts">
// =====================================================================
// ConfirmationCard.vue — Live-updating summary panel (Part E)
// Receives all job data as props and renders a formatted confirmation.
// Rubric: props (Part E-1 reactive updates), v-if/v-else (Part E-2)
// =====================================================================

export interface IssuedPart {
  name: string
  unitPrice: number
  qty: number
}

// --- PROPS received from parent (JobCardForm) ---
const props = defineProps<{
  plate: string
  owner: string
  vehicleClass: string
  selectedServices: string[]
  issuedParts: IssuedPart[]
  labourCharge: number
  servicesTotal: number
  partsTotal: number
  grandTotal: number
}>()

function ugx(n: number): string {
  return n.toLocaleString('en-UG')
}
</script>

<template>
  <!-- Part E — Confirmation card, all fields reactive -->
  <section class="confirm-card">
    <div class="confirm-header">
      <div class="confirm-badge">📋</div>
      <div>
        <h2 class="confirm-title">Job Card Confirmation</h2>
        <p class="confirm-subtitle">Live summary — updates as you fill the form</p>
      </div>
    </div>

    <!-- Vehicle details row -->
    <div class="confirm-grid">
      <div class="confirm-field">
        <span class="cf-label">Plate Number</span>
        <!-- Part E-1: v-if/v-else placeholder if empty — Part E-2 -->
        <span class="cf-value mono">{{ plate || '—' }}</span>
      </div>
      <div class="confirm-field">
        <span class="cf-label">Owner</span>
        <span class="cf-value">{{ owner || '—' }}</span>
      </div>
      <div class="confirm-field">
        <span class="cf-label">Vehicle Class</span>
        <span class="cf-value">{{ vehicleClass || '—' }}</span>
      </div>
    </div>

    <div class="confirm-divider"></div>

    <!-- Services selected -->
    <div class="confirm-row">
      <span class="cf-label">Services</span>
      <!-- v-if/v-else for "None selected" placeholder — Part E-2 -->
      <span v-if="selectedServices.length > 0" class="cf-tags">
        <span
          v-for="svc in selectedServices"
          :key="svc"
          class="cf-tag"
        >{{ svc }}</span>
      </span>
      <span v-else class="cf-placeholder">None selected</span>
    </div>

    <!-- Parts issued -->
    <div class="confirm-row">
      <span class="cf-label">Parts Issued</span>
      <span v-if="issuedParts.length > 0" class="cf-tags">
        <span
          v-for="part in issuedParts"
          :key="part.name"
          class="cf-tag parts-tag"
        >{{ part.name }} (×{{ part.qty }})</span>
      </span>
      <span v-else class="cf-placeholder">None selected</span>
    </div>

    <div class="confirm-divider"></div>

    <!-- Cost breakdown -->
    <div class="cost-breakdown">
      <div class="cost-row">
        <span>Labour Charge</span>
        <span>UGX {{ ugx(labourCharge) }}</span>
      </div>
      <div class="cost-row">
        <span>Services Total</span>
        <span>UGX {{ ugx(servicesTotal) }}</span>
      </div>
      <div class="cost-row">
        <span>Parts Total</span>
        <span>UGX {{ ugx(partsTotal) }}</span>
      </div>
      <div class="cost-row total-row">
        <span>GRAND TOTAL</span>
        <!-- Grand total via interpolation, updates live — Part B-6 -->
        <span class="grand-total">UGX {{ ugx(grandTotal) }}</span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.confirm-card {
  background: linear-gradient(135deg, #1a1d27 0%, #1e2235 100%);
  border: 1.5px solid var(--color-accent);
  border-radius: var(--radius);
  padding: 1.8rem;
  box-shadow: 0 0 0 1px rgba(79, 124, 255, 0.1), var(--shadow-lg);
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.confirm-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.confirm-badge {
  font-size: 2rem;
  line-height: 1;
  background: rgba(79, 124, 255, 0.12);
  border-radius: 50%;
  width: 52px;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.confirm-title {
  font-size: 1.15rem;
  color: var(--color-text);
  margin-bottom: 0.1rem;
}

.confirm-subtitle {
  font-size: 0.8rem;
  color: var(--color-text-faint);
}

.confirm-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1rem;
}

.confirm-field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.confirm-row {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.cf-label {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-text-faint);
}

.cf-value {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--color-text);
}

.cf-value.mono {
  font-family: 'Courier New', monospace;
  letter-spacing: 0.08em;
  color: var(--color-accent);
}

.cf-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.cf-tag {
  background: rgba(79, 124, 255, 0.15);
  border: 1px solid rgba(79, 124, 255, 0.3);
  color: var(--color-accent-hover);
  border-radius: 20px;
  padding: 0.25rem 0.75rem;
  font-size: 0.82rem;
  font-weight: 500;
}

.cf-tag.parts-tag {
  background: rgba(240, 165, 0, 0.12);
  border-color: rgba(240, 165, 0, 0.3);
  color: var(--color-gold);
}

.cf-placeholder {
  color: var(--color-text-faint);
  font-size: 0.88rem;
  font-style: italic;
}

.confirm-divider {
  height: 1px;
  background: var(--color-border);
  border-radius: 1px;
}

.cost-breakdown {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.cost-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: var(--color-text-muted);
}

.total-row {
  margin-top: 0.4rem;
  padding-top: 0.75rem;
  border-top: 1.5px solid var(--color-border);
  font-size: 1rem;
  font-weight: 700;
  color: var(--color-text);
}

.grand-total {
  font-size: 1.2rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--color-gold), #fb923c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
