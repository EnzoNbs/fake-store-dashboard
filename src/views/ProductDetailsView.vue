<template>
    <div class="product-details">
        <h2>Detalhes do Produto</h2>

        <div v-if="product" class="product-info">
            <img :src="product.image" :alt="product.title" />
            <div class="details">
                <h3>{{ product.title }}</h3>
                <p><strong>Categoria:</strong> {{ product.category }}</p>
                <p><strong>Descrição:</strong> {{ product.description }}</p>
                <p><strong>Preço: R$</strong> {{ product.price | currency }}</p>
                <p>
                    <strong>Classificação:</strong>
                    {{ product.rating?.rate }} ({{ product.rating?.count }} avaliações)
                </p>
                <div class="action-buttons">
                    <button class="edit" @click="editProduct">Editar Produto</button>
                    <button class="delete" @click="deleteProduct">Excluir Produto</button>
                    <button class="back-btn" @click="goBack">Voltar</button>
                </div>
            </div>
        </div>

        <p v-else>Carregando os detalhes do produto...</p>

        <!-- Modal para editar o produto -->
        <ProductModal
            v-if="showModal"
            :product="product"
            @close="closeModal"
            @save="saveProduct"
        />
    </div>
</template>


<script>
import api from "../services/api";
import ProductModal from "../components/ProductModal.vue";

export default {
    data() {
        return {
            product: null,
            showModal: false,
        };
    },
    components: {
        ProductModal,
    },
    async created() {
        await this.fetchProductDetails();
    },
    methods: {
        async fetchProductDetails() {
            try {
                const { id } = this.$route.params;
                const response = await api.get(`/products/${id}`);
                this.product = response.data;
            } catch (error) {
                console.error("Erro ao carregar detalhes do produto:", error);
                this.$router.push("/products");
            }
        },
        goBack() {
            this.$router.push("/products");
        },
        editProduct() {
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false; 
        },
        async deleteProduct() {
            try {
                const confirmDelete = confirm("Você tem certeza que deseja excluir este produto?");
                if (!confirmDelete) return;

                await api.delete(`/products/${this.product.id}`);
                alert("Produto excluído com sucesso!");
                this.goBack();
            } catch (error) {
                console.error("Erro ao excluir produto:", error);
                alert("Erro ao excluir o produto. Tente novamente.");
            }
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
};
</script>

<style scoped>
h2 {
    justify-content: center;
    margin-bottom: 5px;
    color: #08923d;

}

.product-details {
    padding: 20px;
    width: 1000px;
    margin: 0 auto;
    background-color: #42454780;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.back-btn {
    background-color: #08923d;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease transform 0.2s ease;
    font-size: 1rem;
    font-weight: bold;
}

button:hover {
  opacity: 0.6;
}

.product-info {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.product-info img {
    max-width: 300px;
    border-radius: 5px;
    object-fit: cover;
}

.details {
    flex: 1;
    min-width: 300px;
}

.details h3 {
    margin: 0 0 10px;
    font-size: 1.6rem;
    color: #ffffff;
}

.details p {
    margin: 8px 0;
    font-size: 1rem;
    line-height: 1.4;
}

.action-buttons {
    
    margin-top: 200px;
    margin-left: 30px;
    display: flex;
    gap: 10px;
}

button {
    padding: 10px 15px;
    font-size: 1rem;
    font-weight: bold;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
}

button.edit {
    background-color: #e6ad02;
    color: white;
}


button.delete {
    background-color: #ff1100;
    color: white;
}

@media (max-width: 768px) {
  .product-details {
    width: 100%;
    padding: 10px;
  }

  .product-info {
    flex-direction: column;
    align-items: center;
  }

  .product-info img {
    max-width: 100%;
    margin-bottom: 20px;
  }

  .details {
    text-align: center;
  }

  .action-buttons {
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  }

  button {
    width: 100%;
    margin-bottom: 10px;
  }
}

@media (max-width: 480px) {
  .product-details {
    padding: 5px;
  }

  .details h3 {
    font-size: 1.4rem;
  }

  .details p {
    font-size: 0.9rem;
  }

  button {
    padding: 8px;
    font-size: 0.9rem;
  }
}


</style>
