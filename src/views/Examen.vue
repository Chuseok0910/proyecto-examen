<template>
  <v-row justify="center">
    <v-expansion-panels accordion>
      <v-expansion-panel
        v-for="item in expansions"
        :key="item.id"
      >
        <v-expansion-panel-header>{{ item.titulo }}</v-expansion-panel-header>
        
        <v-expansion-panel-content>
          {{ item.contenido }}
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-row>
</template>

<script>
export default {
  name: 'Examen',

  data: () => ({
    expansions: [
      { 
        id: 1, 
        titulo: 'Item de Titulo', 
        contenido: 'Item de contenido 1.' 
      },
      { 
        id: 2, 
        titulo: 'Item de titulo 2', 
        contenido: 'Item de contenido 2.' 
      },
        { 
            id: 3, 
            titulo: 'Item de titulo 3', 
            contenido: 'Item de contenido 3.' 
        },
        { 
            id: 4, 
            titulo: 'Item de titulo 4', 
            contenido: 'Item de contenido 4.' 
        }
    ]
  }),
};
</script>