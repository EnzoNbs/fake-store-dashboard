<template>
  <div class="products-view">
    <br>
    <div class="controls">
      <select v-model="selectedCategory" @change="filterByCategory">
        <option value="">Todas as Categorias</option>
        <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
      </select>

      <select v-model="sortOption" @change="sortProducts">
        <option value="">Ordenar</option>
        <option value="price-asc">Preço: Menor para Maior</option>
        <option value="price-desc">Preço: Maior para Menor</option>
        <option value="rating-asc">Classificação: Menor para Maior</option>
        <option value="rating-desc">Classificação: Maior para Menor</option>
      </select>

      <button @click="openModal()">Adicionar Produto</button>
    </div>

    <table>
      <thead>
        <tr>
          <th>Imagem</th>
          <th>Nome</th>
          <th>Categoria</th>
          <th>Preço</th>
          <th>Classificação</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in filteredProducts" :key="product.id">
          <td><img :src="product.image" :alt="product.title" class="product-image" /></td>
          <td>{{ product.title }}</td>
          <td>{{ product.category }}</td>
          <td>{{ product.price | currency }}</td>
          <td>{{ product.rating?.rate }}</td>
          <td>
            <button class="view-button" @click="viewDetails(product.id)">...</button>
            <button class="edit-button" @click="openModal(product)">✎</button>
            <button class="delete-button" @click="deleteProduct(product.id)">✖</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal para adicionar ou editar produtos -->
    <ProductModal v-if="showModal" :product="selectedProduct" @close="closeModal" @save="saveProduct" />
  </div>
</template>

<script>
import api from "../services/api";
import ProductModal from "../components/ProductModal.vue";

export default {
  data() {
    return {
      products: [],
      categories: [],
      filteredProducts: [],
      selectedCategory: "",
      sortOption: "",
      showModal: false,
      selectedProduct: null,
    };
  },
  async created() {
    await this.fetchProducts();
    await this.fetchCategories();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await api.get("/products");
        this.products = response.data;
        this.filteredProducts = [...this.products];
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    },
    async fetchCategories() {
      try {
        const response = await api.get("/products/categories");
        this.categories = response.data;
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    },
    filterByCategory() {
      this.filteredProducts = this.selectedCategory
        ? this.products.filter((product) => product.category === this.selectedCategory)
        : [...this.products];
    },
    sortProducts() {
      const [key, order] = this.sortOption.split("-");
      const sorted = [...this.filteredProducts].sort((a, b) => {
        const valA = key === "price" ? a[key] : a.rating?.rate;
        const valB = key === "price" ? b[key] : b.rating?.rate;
        return order === "asc" ? valA - valB : valB - valA;
      });
      this.filteredProducts = sorted;
    },
    openModal(product = null) {
      this.selectedProduct = product ? { ...product } : null;
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
    },
    async saveProduct(product) {
      try {
        if (product.id) {
          // Atualizar produto existente
          await api.put(`/products/${product.id}`, product);
          const index = this.products.findIndex((p) => p.id === product.id);
          if (index !== -1) {
            this.products.splice(index, 1, product); // Atualiza o produto na lista local
          }
        } else {
          // Adicionar novo produto
          const response = await api.post("/products", product);
          this.products.push(response.data);
        }
        this.filteredProducts = [...this.products]; // Atualiza a lista filtrada
        this.closeModal();
      } catch (error) {
        console.error("Erro ao salvar produto:", error);
      }
    },

    async deleteProduct(id) {
      try {
        const confirmDelete = confirm("Você tem certeza que deseja excluir este produto?");
        if (!confirmDelete) return; // Cancela a exclusão se o usuário clicar em "Cancelar"

        await api.delete(`/products/${id}`);
        this.products = this.products.filter((product) => product.id !== id);
        this.filteredProducts = [...this.products];
        alert("Produto excluído com sucesso!"); // Mensagem de confirmação
      } catch (error) {
        console.error("Erro ao excluir produto:", error);
        alert("Erro ao excluir o produto. Tente novamente."); // Mensagem de erro
      }
    },
    viewDetails(id) {
      this.$router.push(`/products/${id}`);
    },
  },
  filters: {
    currency(value) {
      return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(value);
    },
  },
  components: {
    ProductModal,
  },
};
</script>

<style>
h2 {
  display: flex;
  justify-content: center;
}

.controls {
  display: flex;
  gap: 15px;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #42454780;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
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

table {
  width: 1000px;
  border-collapse: collapse;
  margin-top: 25px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

th,
td {
  border: 1px solid #ddd;
  padding: 15px;
  align-items: center;
}

th {
  background-color: #08923d;
  color: #fff;
}

.product-image {
  width: 70px;
  height: 70px;
  object-fit: contain;
}

button {
  margin: 5px;
  padding: 5px 8px;
  border: none;
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

@media (max-width: 768px) {
  .controls {
    flex-direction: column;
    align-items: stretch;
  }

  .controls select,
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
}

@media (max-width: 480px) {
  .controls {
    padding: 5px;
  }

  .controls select,
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
