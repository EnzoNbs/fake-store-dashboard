<template>
    <div class="login-view">
        <form @submit.prevent="handleLogin">
            <h2>Login</h2>
            <label for="username">Email</label>
            <input type="text" id="username" v-model="form.username" placeholder="Digite seu email" required
                :class="{ 'input-error': error }" aria-label="Email" />

            <label for="password">Senha</label>
            <input type="password" id="password" v-model="form.password" placeholder="Digite sua senha" required
                :class="{ 'input-error': error }" aria-label="Senha" />

            <button type="submit">Entrar</button>

            <p v-if="error" class="error">{{ error }}</p>
        </form>
    </div>
</template>

<script>
import api from "../services/api";

export default {
    data() {
        return {
            form: {
                username: "",
                password: "",
            },
            error: null,
        };
    },
    methods: {
        async handleLogin() {
            if (!this.form.username || !this.form.password) {
                this.error = "Todos os campos são obrigatórios.";
                return;
            }

            try {
                const response = await api.get("/users");
                const users = response.data;

                const user = users.find(u => u.email === this.form.username);
                if (user) {
                    const phoneEnding = user.phone.slice(-4);
                    if (this.form.password === phoneEnding) {
                        localStorage.setItem("authToken", "fakeToken123");
                        this.$router.push("/");
                    } else {
                        this.error = "Senha incorreta. Tente novamente.";
                    }
                } else {
                    this.error = "Email não encontrado. Tente novamente.";
                }
            } catch (err) {
                this.error = "Erro ao tentar fazer login. Tente novamente.";
            }
        },
    },
};
</script>

<style scoped>
.login-view {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #1e1e1e;
    font-family: 'Arial', sans-serif;
    margin: -40px;
    position: relative;
}


form {
    background: #2e2e2e;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 350px;
    display: flex;
    flex-direction: column;
    transition: all 0.3s ease;
}

form:hover {
    box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}


h2 {
    margin-bottom: 20px;
    text-align: center;
    color: #08923d;
    ;
    font-size: 1.5rem;
    font-weight: bold;
}


label {
    margin-bottom: 5px;
    font-weight: bold;
    color: #ddd;
}


input {
    margin-bottom: 15px;
    padding: 10px;
    border: 1px solid #444;
    border-radius: 5px;
    font-size: 14px;
    background-color: #3e3e3e;
    color: #fff;
    transition: border-color 0.3s ease;
}

input:focus {
    border-color: #08923d;
    ;
    /* Verde */
    outline: none;
}

input.input-error {
    border-color: red;
}

button {
    background-color: #08923d;
    ;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s ease;
}

button:hover {
    opacity: 0.6;
}

.error {
    color: red;
    font-size: 14px;
    margin-top: 10px;
    text-align: center;
}

h2 {
    font-size: 1.3rem;
}

button {
    font-size: 14px;
}

@media (max-width: 768px) {
    .login-view {
        padding: 20px;
    }

    form {
        width: 100%;
        padding: 20px;
    }

    h2 {
        font-size: 1.2rem;
    }

    input {
        font-size: 1rem;
        padding: 8px;
    }

    button {
        font-size: 1rem;
        padding: 8px 10px;
    }
}

@media (max-width: 480px) {
    .login-view {
        padding: 10px;
    }

    form {
        width: 100%;
        padding: 15px;
    }

    h2 {
        font-size: 1rem;
    }

    input {
        font-size: 0.9rem;
        padding: 6px;
    }

    button {
        font-size: 0.9rem;
        padding: 6px 8px;
    }
}
</style>
