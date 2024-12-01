<template>
  <div class="carts-view">
    <div class="controls">
      <input type="date" id="filter-date" v-model="filterDate" @change="applyFilters" />

      <select id="filter-user" v-model="filterUser" @change="applyFilters">
        <option value="">Todos os nomes</option>
        <option v-for="user in users" :key="user.id" :value="user.id">
          {{ user.name.firstname }} {{ user.name.lastname }}
        </option>
      </select>

      <button @click="openModal()">Adicionar Carrinho</button>
    </div>

    <table>
      <thead>
        <tr>
          <th>ID do Carrinho</th>
          <th>Usuário</th>
          <th>Data</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cart in filteredCarts" :key="cart.id">
          <td>{{ cart.id }}</td>
          <td>{{ getUserById(cart.userId) }}</td>
          <td>{{ formatDate(cart.date) }}</td>
          <td>
            <button class="view-button" @click="viewDetails(cart.id)">...</button>
            <button class="edit-button" @click="openModal(cart.id)">✎</button>
            <button class="delete-button" @click="deleteCart(cart.id)">✖</button>
          </td>
        </tr>
      </tbody>
    </table>

    <CartModal v-if="showModal" :cart="selectedCart" @close="closeModal" @save="updateCart" />
  </div>
</template>

<script>
import api from "../services/api";
import CartModal from "../components/CartModal.vue";

export default {
  components: {
    CartModal,
  },
  data() {
    return {
      carts: [], // Lista de carrinhos
      users: [], // Dados de usuários para exibir os nomes
      selectedCart: null, // Carrinho selecionado para o modal
      showModal: false, // Controle do modal
      filterDate: "", // Filtro de data
      filterUser: "", // Filtro de usuário
    };
  },
  computed: {
    filteredCarts() {
      return this.carts.filter(cart => {
        const matchesDate = this.filterDate ? this.formatDate(cart.date) === this.filterDate : true;
        const matchesUser = this.filterUser ? cart.userId === this.filterUser : true;
        return matchesDate && matchesUser;
      });
    },
  },
  async created() {
    await this.fetchCarts();
    await this.fetchUsers(); // Carrega os usuários
  },
  methods: {
    async fetchCarts() {
      try {
        const response = await api.get("/carts");
        this.carts = response.data;
      } catch (error) {
        console.error("Erro ao carregar carrinhos:", error);
      }
    },
    async fetchUsers() {
      try {
        const response = await api.get("/users");
        this.users = response.data;
      } catch (error) {
        console.error("Erro ao carregar usuários:", error);
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString("pt-BR");
    },
    getUserById(userId) {
      const user = this.users.find((u) => u.id === userId);
      return user ? `${user.name.firstname} ${user.name.lastname}` : "Usuário desconhecido";
    },
    async deleteCart(cartId) {
      try {
        const confirmDelete = confirm("Você tem certeza que deseja excluir este carrinho?");
        if (!confirmDelete) return;

        await api.delete(`/carts/${cartId}`);
        this.carts = this.carts.filter((cart) => cart.id !== cartId);
      } catch (error) {
        console.error("Erro ao excluir carrinho:", error);
      }
    },
    viewDetails(id) {
      this.$router.push(`/carts/${id}`);
    },
    openModal(cart = null) {
      this.selectedCart = cart;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.selectedCart = null;
    },
    updateCart(updatedCart) {
      const index = this.carts.findIndex((cart) => cart.id === updatedCart.id);
      if (index !== -1) {
        this.carts.splice(index, 1, updatedCart);
      }
      this.closeModal();
    },
    async addCart() {
      try {
        const newCart = {
          userId: this.users[0].id, // Exemplo: atribuir ao primeiro usuário
          date: new Date().toISOString().split('T')[0], // Data atual
          products: [], // Produtos vazios inicialmente
        };
        const response = await api.post("/carts", newCart);
        this.carts.push(response.data);
      } catch (error) {
        console.error("Erro ao adicionar carrinho:", error);
      }
    },
    applyFilters() {
      // Este método é chamado quando os filtros são alterados
    },
  },
};
</script>

<style scoped>
.filters {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.controls {
  display: flex;
  align-items: center;
  background-color: #42454780;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.controls select {
  padding: 10px 15px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #616669cb;
  transition: border-color 0.3s ease;
  cursor: pointer;
  color: #fff;
}

.controls select:focus {
  outline: none;
  border-color: #014894;
}

.controls button {
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  background-color: #08923d;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.controls button:hover {
  background-color: #08923d8c;
  transform: translateY(-2px);
}

.controls button:active {
  background-color: #003f80;
  transform: translateY(0);
}

input[type="date"] {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #616669cb;
  /* Cor de fundo */
  color: #fff;
  /* Cor do texto */
  font-size: 14px;
  transition: border-color 0.3s ease, background-color 0.3s ease;
}

input[type="date"]:focus {
  border-color: #08923d;
  /* Cor da borda ao focar */
  background-color: #616669cb;
  /* Cor de fundo ao focar */
  outline: none;
}

.add-button {
  background-color: #08923d;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
  margin-bottom: 20px;
}

.add-button:hover {
  background-color: #388e3c;
}

h2 {
  display: flex;
  justify-content: center;
  font-size: 2rem;
  margin-bottom: 20px;
}

table {
  border-collapse: collapse;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 1000px;
  margin-top: 60px;

}

th,
td {
  border: 1px solid #ddd;
  align-items: center;
}

th {
  background-color: #08923d;
  color: #fff;
}

button {
  border: none;
  margin: 5px;
  background: #08923d;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.view-button {
  background-color: #0068e7;
  color: white;
  display: flex;
  font-weight: bold;
}

.edit-button {
  background-color: #dda603;
  color: white;
}

.delete-button {
  background-color: #ff0019;
  color: white;
}

button:hover {
  opacity: 0.6;
}

.details-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f9f9f9;
  padding: 10px 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
}

@media (max-width: 768px) {
  .controls {
    flex-direction: column;
    align-items: stretch;
  }

  .controls select,
  .controls input[type="date"],
  .controls button {
    width: 100%;
    margin-bottom: 10px;
  }

  table {
    width: 100%;
    overflow-x: auto;
    display: block;
  }

  th,
  td {
    padding: 8px;
    font-size: 0.9rem;
  }

  .details-row {
    flex-direction: column;
    align-items: flex-start;
  }
}

@media (max-width: 480px) {
  .controls {
    padding: 5px;
  }

  .controls select,
  .controls input[type="date"],
  .controls button {
    padding: 8px;
    font-size: 0.9rem;
  }

  th,
  td {
    font-size: 0.8rem;
  }
}
</style>
