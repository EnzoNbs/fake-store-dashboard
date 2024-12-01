<template>
    <div class="cart-modal">
        <div class="modal-content">
            <h2>Editar Carrinho</h2>
            <form @submit.prevent="save">
                <label for="userId">ID do Usuário</label>
                <input type="text" id="userId" v-model="form.userId" required />

                <label for="user">Usuário</label>
                <input type="text" id="user" v-model="form.user" required />

                <label for="date">Data</label>
                <input type="date" id="date" v-model="form.date" required />

                <div class="actions">
                    <button type="submit">Salvar</button>
                    <button type="button" @click="close">Cancelar</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        cart: {
            type: Object,
            default: null,
        },
    },
    data() {
        return {
            form: {
                userId: "",
                user: "",
                date: "",
            },
        };
    },
    created() {
        if (this.cart) {
            this.form = { ...this.cart };
        }
    },
    methods: {
        save() {
            this.$emit("save", { ...this.form });
        },
        close() {
            this.$emit("close");
        },
    },
};
</script>

<style scoped>

.cart-modal {
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
