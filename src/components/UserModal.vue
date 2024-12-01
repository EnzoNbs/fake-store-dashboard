<template>
  <div class="user-modal">
    <div class="modal-content">
      <h2>{{ user ? "Editar Usuário" : "Adicionar Usuário" }}</h2>
      <form @submit.prevent="save">
        <label for="firstname">Primeiro Nome</label>
        <input type="text" id="firstname" v-model="form.firstname" required />

        <label for="lastname">Último Nome</label>
        <input type="text" id="lastname" v-model="form.lastname" required />

        <label for="email">Email</label>
        <input type="email" id="email" v-model="form.email" required />

        <label for="phone">Telefone</label>
        <input type="tel" id="phone" v-model="form.phone" required />

        <label for="address">Endereço</label>
        <textarea id="address" v-model="form.address" required></textarea>
        
        <div class="actions">
          <button type="submit">{{ user ? "Salvar" : "Adicionar" }}</button>
          <button type="button" @click="$emit('close')">Cancelar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      form: {
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        address: "",
        image: "",
      },
    };
  },
  created() {
    if (this.user) {
      this.form = { ...this.user };
    }
  },
  methods: {
    save() {
      this.$emit("save", { ...this.form });
    },
  },
};
</script>

<style scoped>
.user-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Arial', sans-serif;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.3s ease;
}
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #333;
}
input,
textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
}
input:focus,
textarea:focus {
  border-color: #2196f3;
  outline: none;
}
.actions {
  display: flex;
  justify-content: space-between;
}
button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}
button[type="submit"] {
  background-color: #2196f3;
  color: white;
}
button[type="submit"]:hover {
  background-color: #1976d2;
}
button[type="button"] {
  background-color: #f44336;
  color: white;
}
button[type="button"]:hover {
  background-color: #d32f2f;
}
</style>
