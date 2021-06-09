<template>
  <v-app id="complaints">
    <suggestion-filter
      @on-search="onSearch"
      @on-search-button-click="onSearchButtonClick"
    />

    <v-card class="elevation-1 mt-4" loader-height="100%" shaped>
      <v-card-text class="pl-6 pr-6 pt-4 pb-0">
        <suggestion-table
          :suggestion="suggestions"
          @on-edit-click="onEditClick"
          @on-delete-click="onDeleteClick"
        />

        <paginator
          :pages="pages"
          :pageProp="filter.page"
          @on-page-change="onPageChange"
        />
      </v-card-text>
    </v-card>
    <v-row justify="center">
      <v-dialog
        v-model="editDialog"
        max-width="1000px">
        <v-card>
          <v-card-title>
            Таҳриркунии пешниҳод
          </v-card-title>
          <v-card-text>
            <new-suggestion
              :suggestion="selectedSuggestion"
              :is-new-suggestion="false"
            />
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
    <confirm-modal :confirmData="confirmData" @on-close-confirm="onCloseConfirm"/>
  </v-app>
</template>

<script lang="ts" src="./Suggestions.ts"></script>
