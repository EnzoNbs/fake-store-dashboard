<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

export default {
    name: "App",
    components: {
        Header,
        Footer,
    },
};
</script>

<template>
    <Header />

    <main>
        <RouterView />
    </main>

    <Footer />


</template>

<style>
    main {
        margin: 90px;
    }
</style>
