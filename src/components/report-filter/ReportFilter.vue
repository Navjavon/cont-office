<template>
  <v-card
    class="mx-auto"
    width="100%"
    outlined
    shaped
    elevation="1"
  >
    <v-card-text class="pl-8 pr-8 pt-6 pb-6">
      <v-row>
        <date-filter
          :date-prop="from"
          label="Аз санаи"
          @on-date-change="onFromChange"
        />

        <date-filter
          :date-prop="to"
          label="То санаи"
          @on-date-change="onToChange"
        />

        <shortcut-data-filter @on-shortcut-change="onShortcutChange" />
      </v-row>

      <v-row class="d-flex justify-end">
        <v-select
                item-text="name"
                item-value="id"
                :items="complaintGroups"
                label="Гурӯҳи шикоятро интихоб кунед"
                outlined
                color="primary"
                v-model="selectedGroup"
                class="ml-4 mr-6"
                v-show="type === 'complaint'"
        />

        <div class="genderSelect mr-6">
          <v-select
                  item-text="name"
                  item-value="id"
                  :items="genders"
                  label="Ҷинс"
                  outlined
                  color="primary"
                  v-model="selectedGender"
          />
        </div>

        <v-btn
                large
                color="primary"
                height="56px"
                width="200px"
                class="mr-4"
                @click="onSearchButtonClick"
        >
          <v-icon left>mdi-table-search</v-icon>
          Ҷустуҷӯ
        </v-btn>
        <v-btn
                large
                color="primary"
                height="56px"
                width="200px"
                @click="onClearButtonClick"
        >
          <v-icon left>mdi-cancel</v-icon>
          Тоза кардан
        </v-btn>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" src="./ReportFilter.ts" />

<style scoped>
  .genderSelect {
    width: 150px;
  }
</style>
