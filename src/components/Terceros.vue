<template>
    <div>
      <q-table
        title="Lista de Clientes"
        :rows="clientes"
        :columns="columns"
        row-key="id"
      >
        <template v-slot:body-cell-estado="props">
          <q-td :props="props" class="q-pa-sm">
            <span style="color: white; padding: 5px;"
              :style="{ backgroundColor: props.row.estado === 'Activo' ? 'green' : 'red' }">
              {{ props.row.estado }}
            </span>
          </q-td>
        </template>
  
        <template v-slot:body-cell-opciones="props">
          <q-td :props="props" class="q-pa-sm">
            <button @click="editarCliente(props.row)">📝</button>
            <button @click="eliminarCliente(props.row)">❌</button>
          </q-td>
        </template>
      </q-table>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { getData, } from "../services/apiClient";
  
  let columns = ref([
    { name: "nombre", align: "center", label: "Nombre", field: "nombre", sortable: true },
    { name: "identificacion", align: "center", label: "Identificación", field: "identificacion", sortable: true },
    { name: "direccion", align: "center", label: "Dirección", field: "direccion", sortable: true },
    { name: "telefono", align: "center", label: "Teléfono", field: "telefono", sortable: true },
    { name: "tipo", align: "center", label: "Tipo", field: "tipo", sortable: true },
    { name: "estado", align: "center", label: "Estado", field: "estado", sortable: true },
    { name: "opciones", align: "center", label: "Opciones", sortable: false },
  ]);
  
  let clientes = ref([]);
  
  onMounted(async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await getData("/clientes", token);
      clientes.value = response;
    } catch (error) {
      console.error("Error al cargar los clientes:", error);
    }
  });
  
  function editarCliente(cliente) {
    console.log("Editar cliente:", cliente);

  }
  
  async function eliminarCliente(cliente) {
    try {
      const token = localStorage.getItem("authToken");
      await deleteData(`/clientes/${cliente.identificacion}`, token);
      clientes.value = clientes.value.filter(c => c.identificacion !== cliente.identificacion);
      console.log("Cliente eliminado:", cliente);
    } catch (error) {
      console.error("Error al eliminar cliente:", error);
    }
  }
</script>