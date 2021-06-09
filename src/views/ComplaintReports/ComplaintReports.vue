<template>
  <div>
    <report-filter
      @on-search-button-click="onSearchButtonClick"
      @on-clear-button-click="onSearchButtonClick"
      @on-group-change="onGroupChange"
      type="complaint"
    />

    <v-card
            class="mt-4"
            loader-height="100%"
            shaped
            elevation="1"
    >
      <v-card-text class="pl-6 pr-6 pt-4 pb-0">
        <report-complaint-table
          :reportComplaints="filteredReportComplaints"
          :statuses="statuses"
          :groups="filteredGroups"
        />
      </v-card-text>
    </v-card>
  </div>
</template>

<script lang="ts" src="./ComplaintReports.ts" />
