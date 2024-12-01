<template>
    <div class="cart-details">
        <h2>Detalhes do Carrinho</h2>

        <div v-if="cart">
            <p><strong>ID do Carrinho:</strong> {{ cart.id }}</p>
            <p><strong>ID do Usuário:</strong> {{ cart.userId }}</p>
            <p><strong>Data:</strong> {{ formatDate(cart.date) }}</p>

            <table>
                <thead>
                    <tr>
                        <th>Produto</th>
                        <th>Quantidade</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in cart.products" :key="item.productId">
                        <td>{{ getProductTitle(item.productId) }}</td>
                        <td>{{ item.quantity }}</td>
                    </tr>
                </tbody>
            </table>

            <div class="action-buttons">
                <button class="edit" @click="openModal">Editar Carrinho</button>
                <button class="delete" @click="deleteCart">Excluir Carrinho</button>
                <button class="back-btn" @click="goBack">Voltar</button>
            </div>
        </div>

        <p v-else>Carregando detalhes do carrinho...</p>

        <!-- Modal para edição -->
        <div v-if="showModal" class="modal">
            <div class="modal-content">
                <h3>Editar Carrinho</h3>
                <!-- Exemplo de formulário para edição -->
                <form @submit.prevent="updateCart">
                    <div v-for="item in cart.products" :key="item.productId">
                        <label>
                            {{ getProductTitle(item.productId) }}
                            <input type="number" v-model.number="item.quantity" min="1" />
                        </label>
                    </div>
                    <div class="modal-actions">
                        <button type="submit" class="save">Salvar</button>
                        <button type="button" @click="closeModal" class="cancel">Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import api from "../services/api";

export default {
    data() {
        return {
            cart: null,
            products: [],
            showModal: false,
        };
    },
    async created() {
        await this.fetchCartDetails();
        await this.fetchProducts();
    },
    methods: {
        async fetchCartDetails() {
            try {
                const { id } = this.$route.params;
                const response = await api.get(`/carts/${id}`);
                this.cart = response.data;
            } catch (error) {
                console.error("Erro ao carregar detalhes do carrinho:", error);
                this.$router.push("/dashboard/carts");
            }
        },
        async fetchProducts() {
            try {
                const response = await api.get("/products");
                this.products = response.data;
            } catch (error) {
                console.error("Erro ao carregar produtos:", error);
            }
        },
        getProductTitle(productId) {
            const product = this.products.find((p) => p.id === productId);
            return product ? product.title : "Produto não encontrado";
        },
        formatDate(date) {
            return new Date(date).toLocaleDateString("pt-BR");
        },
        goBack() {
            this.$router.push("/carts");
        },
        async deleteCart() {
            try {
                const confirmDelete = confirm("Você tem certeza que deseja excluir este carrinho?");
                if (!confirmDelete) return;

                await api.delete(`/carts/${this.cart.id}`);
                alert("Carrinho excluído com sucesso!");
                this.goBack();
            } catch (error) {
                console.error("Erro ao excluir carrinho:", error);
                alert("Erro ao excluir o carrinho. Tente novamente.");
            }
        },
        openModal() {
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        },
        async updateCart() {
            try {
                const updatedCart = {
                    ...this.cart,
                    products: this.cart.products,
                };

                await api.put(`/carts/${this.cart.id}`, updatedCart);
                alert("Carrinho atualizado com sucesso!");
                this.closeModal();
            } catch (error) {
                console.error("Erro ao atualizar carrinho:", error);
                alert("Erro ao atualizar o carrinho. Tente novamente.");
            }
        },
    },
};
</script>

<style scoped>
.cart-details {
    padding: 20px;
    width: 1000px;
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

.action-buttons {
    margin-top: 20px;
    display: flex;
    gap: 10px;
}

.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background: #424547;
    padding: 20px;
    border-radius: 8px;
    width: 80%;
    max-width: 500px;
}

.modal-actions {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}

button.save {
    background-color: #4caf50;
    color: white;
}

button.cancel {
    background-color: #d9534f;
    color: white;
}

input {
    width: 15%;
    padding: 6px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 14px;
}

@media (max-width: 768px) {
  .cart-details {
    width: 100%;
    padding: 10px;
  }

  .action-buttons {
    flex-direction: column;
    align-items: stretch;
  }

  button {
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

  .modal-content {
    width: 90%;
  }
}

@media (max-width: 480px) {
  .cart-details {
    padding: 5px;
  }

  th,
  td {
    font-size: 0.8rem;
  }

  button {
    padding: 8px;
    font-size: 0.9rem;
  }

  .modal-content {
    width: 95%;
  }
}

</style>
