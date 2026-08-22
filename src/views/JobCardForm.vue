<script setup lang="ts">
import PartCard from "./PartCard.vue";
import ConfirmationCard from "../views/ConfirmationCard.vue";
import type { IssuedPart } from "../views/ConfirmationCard.vue";
import { ref, computed, onMounted } from "vue";
import {useRoute} from 'vue-router';

const route = useRoute()
const plate = computed(()=>route.params.plate);

const LABOUR_CHARGE = 20000; 

interface Service {
  id: string;
  label: string;
  price: number;
}

const services: Service[] = [
  { id: "oil-change", label: "Oil Change", price: 0 },
  { id: "wheel-alignment", label: "Wheel Alignment", price: 30000 },
  { id: "wheel-balancing", label: "Wheel Balancing", price: 20000 },
  { id: "engine-service", label: "Engine Service", price: 0 },
  { id: "brake-service", label: "Brake Service", price: 0 },
];

interface Part {
  id: string;
  name: string;
  unitPrice: number;
  qtyInStock: number;
}

const parts = ref<Part[]>([]);

const jobCard = ref({
  plate: "", 
  owner: "",
  vehicleClass: "", 
  services: [] as string[],
});

const issuedParts = ref<IssuedPart[]>([]);

const plateError = ref("");
const ownerError = ref("");


function validatePlate(val: string): boolean {
  return /^[A-Za-z]{3} \d{3}[A-Za-z]$/.test(val);
}

function onPlateInput() {
  plateError.value = validatePlate(jobCard.value.plate)
    ? ""
    : "Format: 3 letters, space, 3 digits, 1 letter (e.g. UBK 123A)";
}


function validateOwner(val: string): boolean {
  return /^[A-Za-z\s]{2,}$/.test(val.trim());
}

function onOwnerInput() {
  ownerError.value = validateOwner(jobCard.value.owner)
    ? ""
    : "Owner name: letters only, at least 2 characters";
}

const servicesTotal = computed(() => {
  return jobCard.value.services.reduce((sum, id) => {
    const svc = services.find((s) => s.id === id);
    return sum + (svc?.price ?? 0);
  }, 0);
});

const partsTotal = computed(() =>
  issuedParts.value.reduce((sum, p) => sum + p.unitPrice * p.qty, 0),
);

const grandTotal = computed(
  () => LABOUR_CHARGE + servicesTotal.value + partsTotal.value,
);

const issuedPartsList = computed<IssuedPart[]>(() => issuedParts.value);

const selectedServiceLabels = computed(() =>
  jobCard.value.services.map((id) => services.find((s) => s.id === id)?.label ?? id),
);

onMounted(() => {

  parts.value = [
    {
      id: "engine-oil",
      name: "Engine Oil (20W-50)",
      unitPrice: 120000,
      qtyInStock: 10,
    },
    { id: "oil-filter", name: "Oil Filter", unitPrice: 18000, qtyInStock: 8 },
    { id: "brake-fluid", name: "Brake Fluid", unitPrice: 15000, qtyInStock: 5 },
    {
      id: "brake-pads",
      name: "Brake Pads (Front)",
      unitPrice: 45000,
      qtyInStock: 4,
    },
  ];
});


function onIssuePart(payload: { name: string; unitPrice: number }) {
  
  const part = parts.value.find((p) => p.name === payload.name);
  if (!part || part.qtyInStock <= 0) return;
  part.qtyInStock--;

  
  const existing = issuedParts.value.find((p) => p.name === payload.name);
  if (existing) {
    existing.qty++;
  } else {
    issuedParts.value.push({
      name: payload.name,
      unitPrice: payload.unitPrice,
      qty: 1,
    });
  }
}

function isFixedService(id: string): boolean {
  return id === "wheel-alignment" || id === "wheel-balancing";
}

function servicePrice(id: string): number {
  return services.find((s) => s.id === id)?.price ?? 0;
}

function ugx(n: number): string {
  return n.toLocaleString("en-UG");
}
</script>

<template >
  <h1>Job card - {{ plate }}</h1>
  <div class="job-form-wrapper">
    <section class="form-card">
      <div class="form-card-header">
        <span class="header-icon"></span>
        <div>
          <h2>Job Card Intake</h2>
          <p class="header-sub">Oyera Auto Service Bay Ltd</p>
        </div>
      </div>

      <div class="form-body">
        <div class="form-section">
          <h3 class="section-title">Vehicle Information</h3>
          <div class="field-grid">
            <div class="field-group">
              <label for="plate">Plate Number</label>
              <input
                id="plate"
                type="text"
                v-model="jobCard.plate"
                @input="onPlateInput"
                placeholder="UBK 123A"
                maxlength="8"
              />
              <span v-if="plateError" class="field-error">{{
                plateError
              }}</span>
            </div>

            <div class="field-group">
              <label for="owner">Owner Name</label>
              <input
                id="owner"
                type="text"
                v-model="jobCard.owner"
                @input="onOwnerInput"
                placeholder="Mukasa James"
              />
              <span v-if="ownerError" class="field-error">{{
                ownerError
              }}</span>
            </div>

            <div class="field-group">
              <label for="vehicle-class">Vehicle Class</label>
              <select id="vehicle-class" v-model="jobCard.vehicleClass">
                <option value="" disabled>Select class…</option>
                <option value="Heavy">Heavy</option>
                <option value="Small">Small</option>
                <option value="Commercial">Commercial</option>
              </select>
            </div>

        
            <div class="field-group">
              <label for="labour">Labour Charge (UGX)</label>
              <input
                id="labour"
                type="text"
                :value="ugx(LABOUR_CHARGE)"
                disabled
                class="read-only-badge"
              />
              <span class="field-hint">Fixed per job — read only</span>
            </div>
          </div>
        </div>

        <div class="form-section">
          <h3 class="section-title">Services</h3>
          <div class="services-grid">
            <label
              v-for="svc in services"
              :key="svc.id"
              class="service-item"
              :class="{ checked: jobCard.services.includes(svc.id) }"
            >
              <input
                type="checkbox"
                :value="svc.id"
                v-model="jobCard.services"
                class="service-checkbox"
              />
              <div class="service-info">
                <span class="service-label">{{ svc.label }}</span>
                <span v-if="isFixedService(svc.id)" class="service-price fixed">
                  UGX {{ugx(servicePrice(svc.id)) }} <em>(fixed)</em>
                </span>
                <span v-else-if="svc.price > 0" class="service-price">
                  UGX {{ ugx(svc.price) }}
                </span>
                <span v-else class="service-price muted">Labour only</span>
              </div>
            </label>
          </div>
        </div>

        <div class="running-total-bar">
          <div class="total-line">
            <span class="total-label">⚡ Running Total</span>
            <span class="total-amount">UGX {{ ugx(grandTotal) }}</span>
          </div>
          <div class="total-breakdown">
            Labour: {{ ugx(LABOUR_CHARGE) }} &nbsp;|&nbsp; Services:
            {{ ugx(servicesTotal) }} &nbsp;|&nbsp; Parts: {{ ugx(partsTotal) }}
          </div>
        </div>
      </div>
    </section>

    <section class="parts-section">
      <div class="parts-header">
        <h2>Parts Catalogue</h2>
        <p class="header-sub">
          Click Issue Job
        </p>
      </div>

      <div class="parts-grid">
        <PartCard
          v-for="part in parts"
          :key="part.id"
          :name="part.name"
          :unitPrice="part.unitPrice"
          :qtyInStock="part.qtyInStock"
          @issue-part="onIssuePart"
        />
      </div>
    </section>

    <ConfirmationCard
      :plate="jobCard.plate"
      :owner="jobCard.owner"
      :vehicleClass="jobCard.vehicleClass"
      :selectedServices="selectedServiceLabels"
      :issuedParts="issuedPartsList"
      :labourCharge="LABOUR_CHARGE"
      :servicesTotal="servicesTotal"
      :partsTotal="partsTotal"
      :grandTotal="grandTotal"
    />
  </div>
  <RouterLink :to="`/job/${plate}`">Open job card</RouterLink>
</template>

<style scoped>
.job-form-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.form-card {
  background: rgb(34, 34, 44);
  border: 1.5px solid rgb(29, 62, 68);
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow);
}

.form-card-header {
  background: linear-gradient(135deg, #1e2235, #252a3e);
  border-bottom: 1px solid whitesmoke;
  padding: 1.4rem 1.8rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.header-icon {
  font-size: 2rem;
  line-height: 1;
}

.form-card-header h2 {
  margin-bottom: 0.15rem;
}

.header-sub {
  font-size: 0.82rem;
  color: var(--color-text-faint);
}

.form-body {
  padding: 1.8rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.form-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.section-title {
  font-size: 0.78rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color:white;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.section-title::after {
  content: "";
  flex: 1;
  height: 1px;
  background: var(--color-border);
}

.field-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.2rem;
}

.field-group {
  display: flex;
  flex-direction: column;
}

.field-error {
  margin-top: 0.35rem;
  font-size: 0.78rem;
  color: var(--color-danger);
}

.field-hint {
  margin-top: 0.35rem;
  font-size: 0.78rem;
  color: var(--color-text-faint);
}

.read-only-badge {
  background: rgba(79, 124, 255, 0.08) !important;
  border-color: rgba(79, 124, 255, 0.25) !important;
  color: var(--color-accent) !important;
  font-weight: 700;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0.7rem;
}

.service-item {
  background: var(--color-surface-2);
  border: 1.5px solid var(--color-border);
  border-radius: var(--radius-sm);
  padding: 0.85rem 1rem;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  cursor: pointer;
  transition:
    border-color 0.2s,
    background 0.2s;
  user-select: none;
}

.service-item:hover {
  border-color: var(--color-accent);
}

.service-item.checked {
  border-color: var(--color-accent);
  background: rgba(79, 124, 255, 0.08);
}

.service-checkbox {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  margin-top: 2px;
  accent-color: var(--color-accent);
  cursor: pointer;
}

.service-info {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.service-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-text);
}

.service-price {
  font-size: 0.78rem;
  color: var(--color-gold);
  font-weight: 500;
}

.service-price.fixed {
  color: var(--color-warning);
}

.service-price.muted {
  color: var(--color-text-faint);
}

/* ── Running total bar ── */
.running-total-bar {
  background: linear-gradient(
    135deg,
    rgba(79, 124, 255, 0.1),
    rgba(107, 147, 255, 0.05)
  );
  border: 1.5px solid rgba(79, 124, 255, 0.3);
  border-radius: var(--radius-sm);
  padding: 1rem 1.3rem;
}

.total-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.3rem;
}

.total-label {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--color-text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.total-amount {
  font-size: 1.4rem;
  font-weight: 800;
  background: linear-gradient(135deg, var(--color-accent), #a78bfa);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.total-breakdown {
  font-size: 0.78rem;
  color: var(--color-text-faint);
}

/* ── Parts section ── */
.parts-section {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  box-sizing:border-box;
  background-color: #1e2132;
  width:1050px;
  height:300px;
}

.parts-header h2 {
  margin-bottom: 0.2rem;
}

.parts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
  gap: 1rem;
  box-sizing: border-box;
  width:1100px;
  height:200px;
  border:20px;
  border: white;
  display:flex;
  flex-direction:row;
}
template{
  background-color: red;
}
</style>
