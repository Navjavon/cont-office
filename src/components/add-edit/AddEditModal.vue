<template>
  <v-dialog v-model="show" persistent max-width="600" @keydown.esc="onCloseAddModal(true)">
    <v-card class="pt-8  pl-2 pr-2">
      <v-card-text>
        <v-row>
            <v-btn icon
                   @click="onCloseAddModal(true)"
                   color="primary"
                   style="position: absolute; top: 0; right: 0;">
              <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-row>
        <v-form
                ref="form"
                v-model="valid">
            <v-text-field
                    outlined
                    clearable
                    :label="regLabel"
                    v-model="newData.name"
                    :rules="[rules.required]"
            />
            <v-text-field
                    v-if="isDepartment"
                    outlined
                    clearable
                    label="Номи мудир:"
                    v-model="newData.chief.name"
                    :rules="[rules.required]"
            />
            <v-text-field
                    v-if="isDepartment"
                    outlined
                    clearable
                    label="Насаби мудир:"
                    v-model="newData.chief.lastName"
                    :rules="[rules.required]"
            />
            <v-select
                    v-if="isGroupType"
                    v-model="selectedParent"
                    :items="parentCategory"
                    item-text="name"
                    item-value="id"
                    label="Категорияи волидайн:"
                    outlined
                    return-object
            />
          <v-row justify="space-around">
            <v-switch
                label="Сабт фаъол аст"
                v-model="newData.isActive"
            />
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer/>
        <v-btn elevation="0"
               large
               color="primary"
               :disabled="!valid"
               class="mb-5"
               width="47%"
               @click="onCloseAddModal(false)"
        >
          Сабт
        </v-btn>
        <v-btn elevation="0"
               large
               color="primary"
               class="mb-5"
               width="47%"
               @click="onCloseAddModal(true)">
          Бекор
        </v-btn>
        <v-spacer/>
      </v-card-actions>
    </v-card>

  </v-dialog>
</template>
<script lang="ts" src="./AddEditModal.ts"/>
