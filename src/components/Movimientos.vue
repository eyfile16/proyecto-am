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
          title="Movimientos"
          :rows="facturas"
          :columns="columns"
          row-key="id"
        >
          <template v-slot:body-cell-estado="props">
            <q-td :props="props" class="q-pa-sm">
              <span
                style="color: white; padding: 5px;"
                :style="{ backgroundColor: props.row.estado === 'Pagada' ? 'green' : 'red' }"
              >
                {{ props.row.estado }}
              </span>
            </q-td>
          </template>

          <template v-slot:body-cell-opciones="props">
            <q-td :props="props" class="q-pa-sm">
              <button @click="editarFactura(props.row)">📝</button>
              <button @click="eliminarFactura(props.row)">❌</button>
            </q-td>
          </template>
        </q-table>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getData } from "../services/apiClient";

let columns = ref([
  { name: "tipo", align: "center", label: "Tipo", field: "tipo", sortable: true },
  { name: "numeroFactura", align: "center", label: "Número de Factura", field: "numeroFactura", sortable: true },
  { name: "fecha", align: "center", label: "Fecha", field: "fecha", sortable: true },
  { name: "articulos", align: "center", label: "Artículos", field: "articulos", sortable: true },
  { name: "valor", align: "center", label: "Valor", field: "valor", sortable: true },
  { name: "iva", align: "center", label: "IVA", field: "iva", sortable: true },
  { name: "total", align: "center", label: "Total", field: "total", sortable: true },
  { name: "estado", align: "center", label: "Estado", field: "estado", sortable: true },
  { name: "opciones", align: "center", label: "Opciones", sortable: false },
]);

let facturas = ref([]);

onMounted(async () => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await getData("/facturas", token);
    facturas.value = response;
  } catch (error) {
    console.error("Error al cargar las facturas:", error);
  }
});

function editarFactura(factura) {
  console.log("Editar factura:", factura);
}

async function eliminarFactura(factura) {
  try {
    const token = localStorage.getItem("authToken");
    await deleteData(`/facturas/${factura.numeroFactura}`, token);
    facturas.value = facturas.value.filter(f => f.numeroFactura !== factura.numeroFactura);
    console.log("Factura eliminada:", factura);
  } catch (error) {
    console.error("Error al eliminar factura:", error);
  }
}
</script>
