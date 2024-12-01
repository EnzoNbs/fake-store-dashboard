<template>
  <div class="logout">
    <button @click="handleLogout">Sair</button>
  </div>
  <div class="dashboard">
    <h2 class="dashboard-title">Painel de Informações</h2>
    <div class="dashboard-overview">
      <div class="card" v-for="indicator in indicators" :key="indicator.label">
        <h3>{{ indicator.label }}</h3>
        <p>{{ indicator.value }}</p>
      </div>
    </div>

    <div class="dashboard-details">
      <div class="details-section">
        <h2>Produtos</h2>
        <ul>
          <li>Total de Produtos: {{ productsData.total }}</li>
          <li>Produtos em Estoque: {{ productsData.inStock }}</li>
          <li>Produtos Esgotados: {{ productsData.outOfStock }}</li>
        </ul>
      </div>

      <div class="details-section">
        <h2>Pedidos</h2>
        <ul>
          <li>Total de Pedidos: {{ cartsData.total }}</li>
          <li>Pedidos Finalizados: {{ cartsData.completed }}</li>
          <li>Pedidos Pendentes: {{ cartsData.pending }}</li>
        </ul>
      </div>

      <div class="details-section">
        <h2>Usuários</h2>
        <ul>
          <li>Total de Usuários: {{ usersData.total }}</li>
          <li>Novos Usuários (Últimos 30 dias): {{ usersData.recent }}</li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script>
import api from "../services/api";

export default {
  data() {
    return {
      indicators: [],
      productsData: {
        total: 0,
        inStock: 0,
        outOfStock: 0,
      },
      cartsData: {
        total: 0,
        completed: 0,
        pending: 0,
      },
      usersData: {
        total: 0,
        recent: 0,
      },
      categoriesData: {
        total: 0,
      },
    };
  },
  async created() {
    await this.fetchData();
  },
  methods: {
    async fetchData() {
      try {
        const [productsRes, cartsRes, usersRes, categoriesRes] = await Promise.all([
          api.get("/products"),
          api.get("/carts"),
          api.get("/users"),
          api.get("/products/categories"),
        ]);

        const products = productsRes.data;
        this.productsData.total = products.length;
        this.productsData.inStock = products.filter((p) => p.stock > 0).length;
        this.productsData.outOfStock = products.filter((p) => p.stock === 0).length;

        const carts = cartsRes.data;
        this.cartsData.total = carts.length;
        this.cartsData.completed = carts.filter((c) => c.completed).length;
        this.cartsData.pending = carts.filter((c) => !c.completed).length;

        const users = usersRes.data;
        this.usersData.total = users.length;
        const last30Days = new Date();
        last30Days.setDate(last30Days.getDate() - 30);
        this.usersData.recent = users.filter(
          (u) => new Date(u.registrationDate) >= last30Days
        ).length;

        const categories = categoriesRes.data;
        this.categoriesData.total = categories.length;

        this.indicators = [
          { label: "Total de Produtos", value: this.productsData.total },
          { label: "Número de Categorias", value: this.categoriesData.total },
          { label: "Pedidos Realizados", value: this.cartsData.total },
          { label: "Total de Usuários", value: this.usersData.total },
        ];
      } catch (error) {
        console.error("Erro ao carregar os dados:", error);
      }
    },
    handleLogout() {
      localStorage.removeItem("authToken");
      this.$router.push("/login");
    }
  },
};
</script>

<style scoped>

.wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

button {
  background-color: #08923d;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #388e3c;
}

h1 {
  padding-left: 20px;
  margin: 0;
  font-size: 1.5em;
}

.logout {
  position: fixed;
  right: 20px;
  margin-top: -160px;
}

.dashboard {
  padding: 20px;
  font-family: 'Arial', sans-serif;
  background-color: #42454780;
  border-radius: 2%;
}

.dashboard-title {
  text-align: center;
  font-size: 2rem;
  color: #08923d;
  margin-bottom: 30px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.dashboard-overview {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.card {
  flex: 1;
  background-color: #08923d;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.card h3 {
  margin-bottom: 10px;
  font-size: 10px;
  color: #ffffff;
}

.card p {
  font-size: 24px;
  font-weight: bold;
  color: #dfdfdfe3;
}

.dashboard-details {
  display: flex;
  gap: 20px;
  flex-wrap: nowrap;
}

.details-section {
  flex: 1;
  min-width: 300px;
  background-color: #42454780;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.details-section h2 {
  margin-bottom: 15px;
  font-size: 20px;
  color: #ffffff;
  border-bottom: 2px solid #2196f3;
  padding-bottom: 5px;
}

.details-section ul {
  list-style: none;
  padding: 0;
}

.details-section li {
  font-size: 16px;
  color: #ffffff;
  margin-bottom: 10px;
}

@media (max-width: 768px) {
  .dashboard-overview {
    flex-direction: column;
  }

  .card {
    margin-bottom: 20px;
  }

  .dashboard-details {
    flex-direction: column;
  }

  .details-section {
    margin-bottom: 20px;
  }
}

@media (max-width: 480px) {
  .dashboard-title {
    font-size: 1.5rem;
  }

  .card h3 {
    font-size: 0.9rem;
  }

  .card p {
    font-size: 1.5rem;
  }

  .details-section h2 {
    font-size: 1.2rem;
  }

  .details-section li {
    font-size: 0.9rem;
  }
}


</style>
