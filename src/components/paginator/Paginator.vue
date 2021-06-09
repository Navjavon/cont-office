<template>
  <div class="text-center pa-4" v-if="pages > 1">
    <v-pagination
            v-model="page"
            color="primary"
            :length="pages"
            circle
            total-visible="10"
    />
  </div>
</template>

<script lang="ts" src="./Paginator.ts" />
