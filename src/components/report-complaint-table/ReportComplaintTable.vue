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
                Сабаби шикоят
              </th>
              <th v-for="(status, i) in statuses" :key="i"
                      class="text-center subtitle-1 font-weight-bold"
              >
                {{ status.name }}
              </th>
              <th class="text-center subtitle-1 font-weight-bold">
                Миқдор
              </th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(group, i) in groups" :key="i">
              <td>{{ i + 1 }}</td>
              <td>{{ group.name }}</td>
              <td v-for="(status, j) in statuses" :key="j" class="text-center">
                {{ getCountByStatusAndGroup(status.id, group.id) }}
              </td>
              <td class="text-center font-weight-bold">{{ getCountByGroup(group.id) }}</td>
            </tr>

            <tr>
              <td />
              <td class="font-weight-bold title">Ҳамагӣ</td>
              <td v-for="(status, j) in statuses" :key="j" class="text-center font-weight-bold title">
                {{ getCountByStatus(status.id) }}
              </td>
              <td class="text-center font-weight-bold title">{{ getSum(reportComplaints) }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-col>
  </v-row>
</template>

<script lang="ts" src="./ReportComplaintTable.ts"/>
