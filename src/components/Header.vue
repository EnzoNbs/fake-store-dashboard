<script setup>
import { RouterLink } from 'vue-router';

</script>

<template>
    <header>
        <h1>The Fake Store 🛒</h1>
        <div class="wrapper">
            <nav>
                <RouterLink to="/" exact>Home</RouterLink>
                <RouterLink to="/products">Produtos</RouterLink>
                <RouterLink to="/carts">Carrinhos</RouterLink>
                <RouterLink to="/users">Usuários</RouterLink>
            </nav>
        </div>
    </header>
</template>

<style>
header {
    background-color: #42454780;
    position: fixed;
    width: 100%;
    max-height: 100px;
    top: 0;
    left: 0;
    z-index: 1000;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
    padding: 5px;
    color: #ffffffd7;
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
}

.wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    
}

nav {
    display: flex;
    justify-content: center;
    gap: 15px;
}

nav a {
    text-align: center;
    width: 200px;
    display: block;
    background-color: #42454769;
    text-decoration: none;
    font-size: 1em;
    font-weight: bold;
    padding: 10px 15px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    transition: background-color 0.3s, color 0.3s;
    margin-bottom: 10px;
}

nav a:hover {
    background-color: #ffffff;
    color: #424547;
}

h1 {
    padding-left: 20px;
    margin: 0;
    font-size: 1.5em;
}

main {
    padding-top: 50px;
}

@media (max-width: 768px) {
  .wrapper {
    flex-direction: column;
    align-items: flex-start;
  }

  nav {
    flex-direction: column;
    align-items: flex-start;
  }

  nav a {
    width: 100%;
    text-align: left;
    padding: 10px;
  }
}

@media (max-width: 480px) {
  h1 {
    font-size: 1.2em;
    padding: 10px;
  }

  nav a {
    font-size: 0.9em;
    padding: 8px;
  }
}


</style>
