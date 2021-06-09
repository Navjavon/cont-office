<template>
  <v-col cols="4">
    <v-menu
            v-model="menu"
            :close-on-content-click="true"
            transition="scale-transition"
            offset-y
            min-width="290px"
    >
      <template v-slot:activator="{ on }">
        <v-text-field
                outlined
                :value="formattedDate(date)"
                :label="label"
                prepend-icon="mdi-calendar"
                v-on="on"
                color="primary"
        />
      </template>
      <v-date-picker
              no-title
              scrollable
              locale="ru"
              v-model="date"
              @input="menuTo = false"
              color="primary"
      />
    </v-menu>
  </v-col>
</template>

<script src="./DateFilter.ts" />
