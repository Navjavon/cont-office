<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="700px">
      <v-card>
        <v-card-title class="pl-8 pr-6 pt-8 pb-2">
          <span class="headline">Шумо дар ҳақиқат мехоҳед шикоятро нест кунед?</span>
        </v-card-title>

        <v-card-text class="pl-8 pr-6 pt-0 pb-0">
          <v-container>
            <v-row>
              <v-select
                      item-text="name"
                      item-value="id"
                      :items="removeReasonGroups"
                      label="Сабаби хориҷ кардани шикоятро интихоб кунед"
                      outlined
                      color="primary"
                      v-model="selectedGroup"
              />
            </v-row>
            <v-row>
              <v-textarea
                      outlined
                      v-model="removeReason"
                      label="Шарҳи хориҷкунӣ"
                      placeholder="Сабаби хориҷ кардани шикоятро мухтасар шарҳ дихед"
              />
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions class="pl-8 pr-6 pt-0 pb-6">
          <v-spacer />
          <v-btn color="primary" height="40px" width="150px" @click="dialog = false">
            Не
          </v-btn>
          <v-btn color="error" height="40px" width="150px" @click="onDelete()">
            <v-icon left>mdi-delete</v-icon>
            Ҳа
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script src="./ComplaintDelete.ts" lang="ts" />
