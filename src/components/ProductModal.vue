<template>
  <div class="product-modal">
    <div class="modal-content">
      <h2>{{ product ? "Editar Produto" : "Adicionar Produto" }}</h2>
      <form @submit.prevent="save">
        <label for="title">Título</label>
        <input type="text" id="title" v-model="form.title" required />

        <label for="price">Preço</label>
        <input type="number" id="price" v-model="form.price" step="0.01" required />

        <label for="category">Categoria</label>
        <select id="category" v-model="form.category" required>
          <option value="" disabled>Selecione uma categoria</option>
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>

        <label for="description">Descrição</label>
        <textarea id="description" v-model="form.description" required></textarea>

        <label for="image">URL da Imagem</label>
        <input type="url" id="image" v-model="form.image" required />

        <div class="actions">
          <button type="submit">{{ product ? "Salvar" : "Adicionar" }}</button>
          <button type="button" @click="$emit('close')">Cancelar</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      default: null,
    },
    categories: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      form: {
        title: "",
        price: "",
        category: "", // Deve ser string para corresponder ao select
        description: "",
        image: "",
      },
    };
  },

  created() {
    if (this.product) {
      this.form = { ...this.product }; // Copia os dados do produto para o form
    }
  },
  watch: {
    product: {
      immediate: true,
      handler(newProduct) {
        this.form = newProduct ? { ...newProduct } : {
          title: "",
          price: "",
          category: "",
          description: "",
          image: "",
        };
      },
    },
  },
}
</script>

<style scoped>
.product-modal {
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
select,
textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 14px;
}

input:focus,
select:focus,
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
