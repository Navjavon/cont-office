<template>
  <v-row>
    <v-col cols="12">
      <v-simple-table>
        <template v-slot:default>
          <thead class="align-center">
          <tr>
            <th class="text-left subtitle-1 font-weight-bold">
              №
            </th>
            <th class="text-left subtitle-1 font-weight-bold">
             Намуди пешниҳод
            </th>
            <th class="text-center subtitle-1 font-weight-bold">
              Миқдор
            </th>
          </tr>
          </thead>

          <tbody>
            <tr v-for="(item, index) in reportSuggestion" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ getGroupName(item.groupId) }}</td>
              <td class="text-center font-weight-bold">{{ item.count }}</td>
            </tr>
            <tr>
              <td />
              <td class="font-weight-bold title">Ҳамагӣ</td>
              <td class="text-center font-weight-bold title">{{ getSum(reportSuggestion) }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-col>
  </v-row>
</template>

<script lang="ts" src="./ReportSuggestionTable.ts"/>

<style scoped>
  td {
    padding-top: 5px !important;
    padding-bottom: 5px !important;
  }
</style>

