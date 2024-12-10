<template>
  <div>
    <q-table
      title="Usuarios"
      :rows="usuarios"
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
          <button @click="editarUsuario(props.row)">📝</button>
          <button @click="eliminarUsuario(props.row)">❌</button>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getData } from "../services/apiClient";

let columns = ref([
  { name: "email", align: "center", label: "Email", field: "email", sortable: true },
  { name: "contraseña", align: "center", label: "Contraseña", field: "contraseña", sortable: true },
  { name: "estado", align: "center", label: "Estado", field: "estado", sortable: true },
  { name: "opciones", align: "center", label: "Opciones", sortable: false },
]);

let usuarios = ref([]);

onMounted(async () => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await getData("/usuarios", token);
    usuarios.value = response;
  } catch (error) {
    console.error("Error al cargar los usuarios:", error);
  }
});

function editarUsuario(usuario) {
  console.log("Editar usuario:", usuario);
  // Implementar lógica para abrir un formulario de edición
}

async function eliminarUsuario(usuario) {
  try {
    const token = localStorage.getItem("authToken");
    await deleteData(`/usuarios/${usuario.email}`, token);
    usuarios.value = usuarios.value.filter(u => u.email !== usuario.email);
    console.log("Usuario eliminado:", usuario);
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
  }
}
</script>
