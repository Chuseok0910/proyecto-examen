<template>
  <v-app id="inspire">
    <v-app-bar
      app
      color="white"
      flat
    >
      <v-avatar
        :color="$vuetify.breakpoint.smAndDown ? 'grey darken-1' : 'transparent'"
        size="32"
      ></v-avatar>

      <v-tabs
        centered
        class="ml-n9"
        color="grey darken-1"
      >
        <v-tab
          v-for="link in links"
          :key="link.text"
          :to="link.path"
        >
          {{ link.text }}
        </v-tab>
      </v-tabs>

      <v-avatar
        class="hidden-sm-and-down"
        color="grey darken-1 shrink"
        size="32"
      ></v-avatar>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col
            cols="12"
            sm="2"
          >
            <v-sheet
              rounded="lg"
              min-height="268"
              class="pa-4"
            >
              <div class="d-flex justify-center">
                <v-btn
                  class="mx-2"
                  fab
                  dark
                  color="indigo"
                  @click="addCard"
                >
                  <v-icon dark>
                    mdi-plus
                  </v-icon>
                </v-btn>
              </div>
            </v-sheet>
          </v-col>
          <v-col
            cols="12"
            sm="8"
          >
            <v-sheet
              min-height="70vh"
              rounded="lg"
              class="pa-4"
            >
            <v-alert
                v-model="alertVisible"
                :type="alertType"
                dismissible
                transition="scale-transition"
                class="mb-4"
              >
                {{ alertMessage }}
              </v-alert>
              <v-row v-if="$route.path === '/'">
                <v-col
                  v-for="card in cards"
                  :key="card.id"
                  cols="12"
                  md="6"
                >
                  <v-card
                    class="mx-auto"
                    max-width="344"
                    outlined
                  >
                    <v-list-item three-line>
                      <v-list-item-content>
                        <div class="text-overline mb-4">
                          {{ card.overline }}
                        </div>
                        <v-list-item-title class="text-h5 mb-1">
                          {{ card.headline }}
                        </v-list-item-title>
                        <v-list-item-subtitle>{{ card.subtitle }}</v-list-item-subtitle>
                      </v-list-item-content>

                      <v-list-item-avatar
                        tile
                        size="80"
                        color="grey"
                      ></v-list-item-avatar>
                    </v-list-item>

                    <v-card-actions>
                      <v-spacer></v-spacer>

                      <v-btn icon color="primary" @click="openEditDialog(card)">
                        <v-icon>mdi-pencil</v-icon>
                      </v-btn>

                      <v-btn icon color="error" @click="deleteCard(card.id)">
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-col>
                </v-row>
                <router-view v-else></router-view>
            </v-sheet>
          </v-col>

          <v-col
            cols="12"
            sm="2"
          >
            <v-sheet
              rounded="lg"
              min-height="268"
            >
              </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Editar Tarjeta</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="editedItem.overline"
                  label="Overline"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="editedItem.headline"
                  label="Headline"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="editedItem.subtitle"
                  label="Subtitle"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDialog">
            Cancelar
          </v-btn>
          <v-btn color="blue darken-1" text @click="saveEdit">
            Guardar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-app>
</template>

<script>
  export default {
    data: () => ({
      links: [
        { text: 'Dashboard', path: '/' },       // Apunta a tu ruta 'home'
        { text: 'Messages', path: '/messages' }, // Apunta a tu ruta 'Messages'
        { text: 'Profile', path: '/profile' },   // Apunta a tu ruta 'Profile'
        { text: 'Updates', path: '/updates' },   // Apunta a tu ruta 'Updates'
        { text: 'Examen', path: '/examen' }      // Apunta a tu ruta 'Examen'
      ],

      // --- VVV CAMBIOS EN EL SCRIPT VVV ---
      
      // 1. 'cards' es ahora un array de objetos
      cards: [
        {
          id: 1,
          overline: 'OVERLINE',
          headline: 'Headline 5',
          subtitle: 'Greyhound divisely hello coldly fonwderfully'
        }
      ],
      // 2. Contador para IDs únicos
      nextCardId: 3,

      // 3. Estado para el diálogo (pop-up)
      dialog: false,
      
      // 4. Objeto temporal para guardar la tarjeta que estamos editando
      editedItem: {
        id: null,
        overline: '',
        headline: '',
        subtitle: ''
      },

      // Objeto por defecto para una nueva tarjeta
      defaultItem: {
        id: null,
        overline: 'NUEVO',
        headline: 'Nueva Tarjeta',
        subtitle: 'Haz clic en el lápiz para editar'
      },
      // VVV AÑADE ESTAS TRES LÍNEAS VVV
      alertVisible: false,
      alertMessage: '',
      alertType: 'success',
      // ^^^ FIN DE LÍNEAS AÑADIDAS ^^^
      // --- ^^^ FIN CAMBIOS EN EL SCRIPT ^^^ ---
    }),

    // 5. Métodos para manejar la lógica
    methods: {
      /**
       * Añade una nueva tarjeta al array 'cards'
       */
      addCard () {
        // VVV LÍNEAS AÑADIDAS VVV
        // Si no estamos en la página principal...
        if (this.$route.path !== '/') {
          // ...navegamos a la página principal.
          this.$router.push('/');
        }
        // Creamos una copia del item por defecto y le asignamos un nuevo ID
        const newCard = Object.assign({}, this.defaultItem)
        newCard.id = this.nextCardId
        // Mostramos una alerta al usuario
        this.showAlert('Nueva tarjeta añadida.', 'success')
        // Añadimos la nueva tarjeta al array
        this.cards.push(newCard)

        // Incrementamos el contador de ID para la próxima vez
        this.nextCardId++
      },

      /**
       * Borra una tarjeta basado en su ID
       */
      deleteCard (id) {
        // Creamos un nuevo array que filtra y excluye la tarjeta con el id que recibimos
        this.cards = this.cards.filter(card => card.id !== id)

        // Mostramos una alerta al usuario
        this.showAlert('Tarjeta eliminada correctamente.', 'error')
      },

      /**
       * Abre el diálogo de edición
       */
      openEditDialog (card) {
        // Hacemos una copia de los datos de la tarjeta a 'editedItem'
        // Usamos Object.assign para evitar modificar la tarjeta original
        // si el usuario presiona "Cancelar".
        this.editedItem = Object.assign({}, card)
        // Mostramos el diálogo
        this.dialog = true
      },

      /**
       * Cierra el diálogo y resetea 'editedItem'
       */
      closeDialog () {
        this.dialog = false
        // Reseteamos el objeto 'editedItem'
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedItem.id = null
        })
      },

      /**
       * Guarda los cambios del diálogo en la tarjeta original
       */
      saveEdit () {
        // Buscamos el índice (la posición) de la tarjeta original en el array 'cards'
        const index = this.cards.findIndex(card => card.id === this.editedItem.id)

        // Si la encontramos, actualizamos el objeto original con los datos de 'editedItem'
        if (index > -1) {
          // Object.assign actualiza las propiedades del primer objeto
          // con las propiedades del segundo.
          Object.assign(this.cards[index], this.editedItem)
        }
        
        // Cerramos el diálogo
        this.closeDialog()
        // Mostramos una alerta al usuario 
        this.showAlert('Tarjeta actualizada correctamente.', 'warning')
      },

      /**
       * Muestra una alerta temporal
       * @param {string} message El texto a mostrar
       * @param {string} type El tipo de alerta (success, info, error)
       */
      showAlert (message, type = 'success') {
        this.alertMessage = message
        this.alertType = type
        this.alertVisible = true // ¡La muestra!

        // Opcional: Oculta la alerta automáticamente después de 3 segundos
        setTimeout(() => {
          this.alertVisible = false
        }, 3000)
      }
    }
  }
</script>