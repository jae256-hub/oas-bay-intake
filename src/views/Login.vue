<script setup>
import {reactive} from 'vue';
import {useRouter} from 'vue-router';

const router = useRouter();

const form = reactive({
    userrole:'',
    email:'',
    password:''
});

function login(){
    if(form.userrole==='bay_tech' && form.email==="jmwesigwa272@gmail.com" && form.password==="joshua22335"){
        localStorage.setItem("user", JSON.stringify({
            user: form.email,
            role: form.userrole,
            status: true
        }));
        alert("Login successful");
        router.push("/parts");
    }else{
        alert("Wrong credential, please try again")
    }
}

</script>
<template>
    <main class="d-flex align-items-center justify-content py-5">
        <div class="container">
            <div class="row justify-content-center">
                <div class="text-center mb-4">
                    <i class="bi bi-wrench-adjustable-circle-fill brand-icon"></i>
                    <h4 class="fw-bold mt-2 text-dark mb-1">OAS Bay</h4>
                    <p class="text-muted small">Oyera Auto Service Bay Ltd</p>
                </div>
                <form @submit.prevent="login">
                    <div class="mb-3">
                        <label for="userRole" class="form-label small fw-bold text-secondary">System Role</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-person-badge text-muted"></i></span>
                            <select v-model="form.userrole" class="form-select form-control-icon" id="userRole" required>
                                <option value="" disabled>Select role...</option>
                                <option value="tech">Senior Technician</option>
                                <option value="bay_tech">Bay Technician</option>
                                <option value="reception">Reception / Billing</option>
                                <option value="manager">Bay Manager</option>
                            </select>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="username" class="form-label small fw-bold text-secondary">Tech ID or Email</label>
                        <div class="input-group">
                            <span class="input-group-text"><i class="bi bi-person text-muted"></i></span>
                            <input v-model="form.email" type="text" class="form-control form-control-icon" id="username" placeholder="e.g OAS or mwesigwa@oasbay.co.ug" required>
                        </div>
                    </div>
                    <div class="mb-3">
                        <div class="d-flex justify-content-between align-items-center">
                            <label for="password" class="form-label small fw-bold text-secondary mb-0">Password</label>
                            <a href="#" class="text-decoration-none small text-primary" data-bs-toggle="modal" data-bs-target="#forgotPasswordModal">Forgot?</a>
                        </div>
                        <div class="input-group mt-1">
                            <span class="input-group-text"><i class="bi bi-lock text-muted"></i></span>
                            <input v-model="form.password" type="password" class="form-control form-control-icon" id="password" placeholder="............." required>
                            <button class="btn btn-outline-secondary" type="button" id="togglePassword">
                            <i class="bi bi-eye" id="toggleIcon"></i></button>
                        </div>
                    </div>
                    <div class="mb-4 form-check">
                        <input type="checkbox" class="form-check-input" id="rememberMe">
                        <label class="form-check-label small text-muted" for="rememberMe">Keep me logged in on this bay terminal</label>
                    </div>

                    <button type="submit" class="btn btn-warning text-dark fw-bold w-100 py-2 shadow-sm">
                        <i class="bi bi-box-arrow-in-right me-1"></i>Sign-in
                    </button>
                </form>
            </div>

            <div class="card-footer bg-transparent border-0 text-center pt-0 pb-2">
                <hr class="text-muted opacity-25 mt-3 mb-3">
                <small class="text-muted d-block">Refactory Software Engineering Project</small>
                <small class="text-secondary">&copy; Oyera Auto Service Bay Ltd</small>
            </div>
        </div>

        <div class="modal fade" id="forgotPasswordModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title fw-bold fs-6"><i class="bi bi-shield-lock me-2 text-warning"></i>Reset Password Request</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div class="modal-body">
                        <p class="small text-muted">Please enter your registered staff email or Technician ID to request a password reset from Bay Manager</p>
                        <div class="mb-3">
                            <label class="form-label small fw-bold text-secondary">Staff ID / Email</label>
                            <input type="text" class="form-control" placeholder="e.g. OAS Bay">
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-sm btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" class="btn btn-sm btn-warning" data-bs-dismiss="modal" onclick="alert('Reset request sent to Station Administrator')">Send Reset Request</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>
<style scoped>
main{
    background:linear-gradient(135deg,#d2dfeb 0%, #2c3e50 100%);
    min-height:100vh;
}
.login-card{
    border: none;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(155, 174, 191, 0.3);
}
.brand-icon{
    font-size:2.8rem;
    color: #f3f2ed;
}
.input-group-text{
    background-color:#dee5ec;
    border-right: none;
}
.form-control:focus{
    box-shadow:none;
    border-color: #0d6efd;
}
.form-control-icon{
    border-left:none;
}
</style>