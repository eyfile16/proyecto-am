<template>
  <q-layout view="hHh lpR fFf">
    <!-- Header -->
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>Menú</q-toolbar-title>
      </q-toolbar>
    </q-header>


    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <q-list>
        <q-item clickable v-ripple @click="navigateTo('/articulos')">
          <q-item-section avatar>
            <q-icon name="shopping_cart" />
          </q-item-section>
          <q-item-section>Artículos</q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="navigateTo('/categorias')">
          <q-item-section avatar>
            <q-icon name="category" />
          </q-item-section>
          <q-item-section>Categorías</q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="navigateTo('/movimientos')">
          <q-item-section avatar>
            <q-icon name="swap_horiz" />
          </q-item-section>
          <q-item-section>Movimientos</q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="navigateTo('/usuarios')">
          <q-item-section avatar>
            <q-icon name="group" />
          </q-item-section>
          <q-item-section>Usuarios</q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="navigateTo('/terceros')">
          <q-item-section avatar>
            <q-icon name="account_circle" />
          </q-item-section>
          <q-item-section>Terceros</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>


    <q-page-container>
      <div>
        <q-table
          title="Categorias"
          :rows="articulos"
          :columns="columns"
          row-key="id"
        >
          <template v-slot:body-cell-imagen="props">
            <q-td :props="props" class="q-pa-sm">
              <img
                :src="props.row.imagen"
                alt="Imagen"
                style="height: 50px; width: 50px;"
              />
            </q-td>
          </template>

          <template v-slot:body-cell-estado="props">
            <q-td :props="props" class="q-pa-sm">
              <span
                style="color: white; padding: 5px;"
                :style="{ backgroundColor: props.row.estado === 'Disponible' ? 'green' : 'red' }"
              >
                {{ props.row.estado }}
              </span>
            </q-td>
          </template>

          <template v-slot:body-cell-opciones="props">
            <q-td :props="props" class="q-pa-sm">
              <button>📝</button>
              <button v-if="props.row.estado === 'Disponible'">❌</button>
              <button v-else>✅</button>
            </q-td>
          </template>
        </q-table>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { getData } from "../services/apiClient";

const leftDrawerOpen = ref(false);
const router = useRouter();

const navigateTo = (route) => {
  router.push(route);
};

const columns = ref([
  { name: "descripcion", align: "center", label: "Descripción", field: "descripcion", sortable: true },
  { name: "estado", align: "center", label: "Estado", field: "estado", sortable: true },
  { name: "opciones", align: "center", label: "Opciones", sortable: false },
]);

const articulos = ref([]);

onMounted(async () => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await getData("/articulos/articulos", token);
    articulos.value = response;
  } catch (error) {
    console.error("Error al cargar los artículos:", error);
  }
});

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
</script>

<style scoped>
.q-drawer {
  min-width: 250px;
}
</style>
