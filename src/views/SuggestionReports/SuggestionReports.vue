<template>
  <div>
    <report-filter
      @on-search-button-click="onSearchButtonClick"
      @on-clear-button-click="onSearchButtonClick"
      type="suggestions"
    />

    <v-card
            class="mt-4"
            loader-height="100%"
            shaped
            elevation="3"
    >
      <v-card-text class="pl-6 pr-6 pt-4 pb-0">
        <report-suggestion-table
          :reportSuggestion="reportSuggestion"
          :groups="groups"
        />
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts" src="./SuggestionReports.ts" />
