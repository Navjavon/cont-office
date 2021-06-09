<template>
  <v-col cols="4">
    <v-select
            item-text="text"
            item-value="value"
            :items="shortcuts"
            label="Филтри сана"
            outlined
            color="primary"
            v-model="selectedShortcut"
    />
  </v-col>
</template>

<script src="./ShortcutDateFilter.ts" />
