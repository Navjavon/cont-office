<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="900px" :set="complainer = complaint.complainer">
      <complaint-print
        :isDeleteComplaint="isDeleteComplaint"
        :show="true"
        :complaint="complaint"
      />
    </v-dialog>
  </v-row>
</template>

<script lang="ts" src="./ComplaintPreview.ts" />
