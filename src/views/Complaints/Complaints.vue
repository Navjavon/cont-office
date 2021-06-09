<template>
  <v-app id="complaints">
    <complaint-filter
            @on-search="onSearch"
            @on-search-button-click="onSearchButtonClick"
    />

    <v-card class="elevation-1 mt-4" loader-height="100%" shaped>
      <v-card-text class="pl-6 pr-6 pt-4 pb-0">
        <complaint-table
                :complaints="complaints"
                :page="filter.page"
                @on-delete-click="onDeleteClick"
                @on-preview-click="onPreviewClick"
                @on-print-click="onPrintClick"
                @on-edit-click="onEditClick"
        />

        <paginator
                :pages="pages"
                :pageProp="filter.page"
                @on-page-change="onPageChange"
        />
      </v-card-text>
    </v-card>

    <complaint-print
            :show="false"
            :complaint="selectedComplaint"
            :id="printId"
    />

    <complaint-preview
            :show="previewDialog"
            :complaint="selectedComplaint"
            @on-dialog-change="onPreviewDialogHide"
    />

    <complaint-delete
            :show="deleteDialog"
            :complaintId="complaintId"
            @on-dialog-change="onDeleteDialogHide"
            @on-delete="onComplaintDelete"
    />

    <v-row justify="center">
      <v-dialog
              v-model="editDialog"
              max-width="1000px">
        <v-card>
          <v-card-title>
            Таҳриркунии шикоят
          </v-card-title>

          <v-card-text>
            <new-complaint
                    :complaint="selectedComplaint"
                    :is-new-complaint="false"
            />
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
  </v-app>
</template>

<script lang="ts" src="./Complaints.ts" />
