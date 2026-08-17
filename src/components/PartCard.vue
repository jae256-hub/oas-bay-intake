<script setup lang="ts">
// =====================================================================
// PartCard.vue — Child component for a single part in the catalogue
// Rubric: props (Part C-2), emits (Part C-4), v-if/v-else (Part C-3),
//         scoped CSS (Part D-2)
// =====================================================================

// --- PROPS (parent → child) ---
const props = defineProps<{
  name: string
  unitPrice: number
  qtyInStock: number
}>()

// --- EMITS (child → parent) ---
// Emits 'issue-part' with { name, unitPrice } when button is clicked
const emit = defineEmits<{
  (e: 'issue-part', payload: { name: string; unitPrice: number }): void
}>()

function handleIssue() {
  emit('issue-part', { name: props.name, unitPrice: props.unitPrice })
}

/** Format a number as UGX currency string */
function ugx(amount: number): string {
  return amount.toLocaleString('en-UG')
}
</script>

<template>
  <!-- Each PartCard rendered via v-for in parent (Part C-1) -->
  <div class="part-card" :class="{ 'out-of-stock': qtyInStock === 0 }">
    <div class="part-header">
      <span class="part-icon">🔩</span>
      <h3 class="part-name">{{ name }}</h3>
    </div>

    <div class="part-details">
      <div class="detail-row">
        <span class="detail-label">Unit Price</span>
        <!-- Props displayed — Part C-2 -->
        <span class="detail-value price">UGX {{ ugx(unitPrice) }}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">In Stock</span>
        <!-- Stock count updates immediately (reactivity) — Part C-5 -->
        <span class="detail-value stock" :class="{ low: qtyInStock <= 2 }">
          {{ qtyInStock }} unit{{ qtyInStock !== 1 ? 's' : '' }}
        </span>
      </div>
    </div>

    <!-- v-if / v-else conditional rendering — Part C-3 -->
    <button v-if="qtyInStock > 0" class="btn-issue" @click="handleIssue">
      ➕ Issue to Job
    </button>
    <div v-else class="out-of-stock-badge">⚠ Out of Stock</div>
  </div>
</template>

<!-- Scoped CSS — Part D-2: styles are isolated to PartCard only -->
<style scoped>
.part-card {
  background: var(--color-surface);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius);
  padding: 1.2rem 1.1rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: border-color 0.2s, transform 0.15s, box-shadow 0.2s;
  position: relative;
  overflow: hidden;
}

.part-card::before {
  content: '';
  position: absolute;
  inset: 0 0 auto;
  height: 3px;
  background: linear-gradient(90deg, var(--color-accent), #a78bfa);
  border-radius: var(--radius) var(--radius) 0 0;
}

.part-card:hover {
  border-color: var(--color-accent);
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(79, 124, 255, 0.15);
}

.part-card.out-of-stock {
  opacity: 0.6;
}
.part-card.out-of-stock::before {
  background: linear-gradient(90deg, var(--color-danger), #f97316);
}

.part-header {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.part-icon {
  font-size: 1.4rem;
}

.part-name {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--color-text);
  line-height: 1.3;
}

.part-details {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
}

.detail-label {
  color: var(--color-text-muted);
}

.detail-value {
  font-weight: 600;
}

.detail-value.price {
  color: var(--color-gold);
}

.detail-value.stock {
  color: var(--color-success);
}

.detail-value.stock.low {
  color: var(--color-warning);
}

.btn-issue {
  background: linear-gradient(135deg, var(--color-accent), #6b93ff);
  color: #fff;
  border: none;
  border-radius: var(--radius-sm);
  padding: 0.55rem 0.9rem;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s, transform 0.15s;
  width: 100%;
  letter-spacing: 0.02em;
}

.btn-issue:hover {
  opacity: 0.88;
  transform: scale(1.02);
}

.btn-issue:active {
  transform: scale(0.97);
}

.out-of-stock-badge {
  background: rgba(239, 68, 68, 0.12);
  border: 1px solid rgba(239, 68, 68, 0.35);
  color: var(--color-danger);
  border-radius: var(--radius-sm);
  padding: 0.5rem 0.9rem;
  font-size: 0.85rem;
  font-weight: 600;
  text-align: center;
}
</style>
