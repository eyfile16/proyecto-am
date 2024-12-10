<template>
  <q-layout view="hHh lpR fFf">
    <!-- Header -->
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title>Menú</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <!-- Left Drawer -->
    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <q-list>
        <q-item clickable v-ripple @click="navigateTo('/Articulos')">
          <q-item-section avatar>
            <q-icon name="shopping_cart" />
          </q-item-section>
          <q-item-section>Artículos</q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="navigateTo('/Categorias')">
          <q-item-section avatar>
            <q-icon name="category" />
          </q-item-section>
          <q-item-section>Categorías</q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="navigateTo('/Movimientos')">
          <q-item-section avatar>
            <q-icon name="swap_horiz" />
          </q-item-section>
          <q-item-section>Movimientos</q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="navigateTo('/Usuarios')">
          <q-item-section avatar>
            <q-icon name="group" />
          </q-item-section>
          <q-item-section>Usuarios</q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="navigateTo('/Terceros')">
          <q-item-section avatar>
            <q-icon name="account_circle" />
          </q-item-section>
          <q-item-section>Terceros</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- Main Content -->
    <q-page-container>
      <div>
        <q-table
          title="Lista de Artículos"
          :rows="articulos"
          :columns="columns"
          row-key="id"
        >
          <template v-slot:body-cell-imagen="props">
            <q-td :props="props" class="q-pa-sm">
            </q-td>
          </template>

          <template v-slot:body-cell-estado="props">
            <q-td :props="props" class="q-pa-sm">
              <span
                style="color: white; padding: 5px;"
                :style="{
                  backgroundColor:
                    props.row.estado === 'Disponible' ? 'green' : 'red',
                }"
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

<script>
import { ref, onMounted } from "vue";
import { getData } from "../services/apiClient";
import { useRouter } from "vue-router";

export default {
  setup() {
    const leftDrawerOpen = ref(false);
    const router = useRouter();

    const navigateTo = (route) => {
      router.push(route);
    };

    const columns = ref([
      { name: "nombre", align: "center", label: "Nombre", field: "nombre", sortable: true },
      { name: "precio", align: "center", label: "Precio", field: "precio", sortable: true },
      { name: "stock", align: "center", label: "Stock", field: "stock", sortable: true },
      { name: "imagen", align: "center", label: "Imagen", field: "imagen", sortable: false },
      { name: "categoria", align: "center", label: "Categoría", field: "categoria", sortable: true },
      { name: "estado", align: "center", label: "Estado", field: "estado", sortable: true },
      { name: "opciones", align: "center", label: "Opciones", sortable: false },
    ]);

    const articulos = ref([]);

    const toggleLeftDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    };

    onMounted(async () => {
      try {
        const token = localStorage.getItem("apiClient");
        const response = await getData("/articulos/articulos", token);
        console.log(response); 
        articulos.value = response.articulos || response; 
      } catch (error) {
        console.error("Error al cargar los artículos:", error);
      }
    });

    return {
      leftDrawerOpen,
      toggleLeftDrawer,
      columns,
      articulos,
      navigateTo,
    };
  },
};
</script>

<style scoped>
.q-drawer {
  min-width: 250px;
}
</style>
