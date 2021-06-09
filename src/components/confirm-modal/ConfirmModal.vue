<template>
  <v-dialog v-model="confirmData.show" max-width="500" @keydown.esc="onCloseConfirm('no')">
    <v-card>
      <v-card-text v-show="!!confirmData.message" class="pa-8 text-center text-size">{{ confirmData.message }}</v-card-text>
      <v-card-actions class="justify-center">
        <v-btn color="primary" dark @click="onCloseConfirm(false)">
          Не
        </v-btn>
        <v-btn color="red" dark @click="onCloseConfirm(true)">
          Ҳа
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" src="./ConfirmModal.ts" />
<style>
  .text-size {
    font-size: 22px !important;
  }
</style>
