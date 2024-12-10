<template>
    <div id="app">
      <!-- Layout principal -->
      <q-layout view="hHh lpR fFf">
        <!-- Header y navegación, solo si no estamos en Login -->
        <q-header elevated class="bg-primary text-white" v-if="!isLogin">
          <q-toolbar>
            <q-toolbar-title>
              <q-avatar>
                <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
              </q-avatar>
              Mi Empresa
            </q-toolbar-title>
          </q-toolbar>
  
          <!-- Barra de navegación -->
          <q-tabs align="left">
            <q-route-tab to="/Home" label="Inicio" />
            <q-route-tab to="/Articulos" label="Artículos" />
            <q-route-tab to="/Categorias" label="Categorías" />
            <q-route-tab to="/Movimientos" label="Movimientos" />
            <q-route-tab to="/Usuarios" label="Usuarios" />
          </q-tabs>
        </q-header>
  
        <!-- Drawer lateral, solo si no estamos en Login -->
        <q-drawer v-model="drawerOpen" side="left" bordered v-if="!isLogin">
          <q-list>
            <q-item to="/Home" clickable>
              <q-item-section>Inicio</q-item-section>
            </q-item>
            <q-item to="/Articulos" clickable>
              <q-item-section>Artículos</q-item-section>
            </q-item>
            <q-item to="/Categorias" clickable>
              <q-item-section>Categorías</q-item-section>
            </q-item>
            <q-item to="/Movimientos" clickable>
              <q-item-section>Movimientos</q-item-section>
            </q-item>
            <q-item to="/Usuarios" clickable>
              <q-item-section>Usuarios</q-item-section>
            </q-item>
          </q-list>
        </q-drawer>
  
        <!-- Contenedor de la página -->
        <q-page-container>
          <router-view />
        </q-page-container>
      </q-layout>
    </div>
  </template>
  
  <script>
  import { ref, computed } from "vue";
  import { useRoute } from "vue-router";
  
  export default {
    setup() {
      const drawerOpen = ref(false);
      const route = useRoute();
  
      // Determina si estamos en la página de login
      const isLogin = computed(() => route.path === "/");
  
      return {
        drawerOpen,
        isLogin,
      };
    },
  };
  </script>
  