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
              Санаи пешниҳод
            </th>
            <th class="text-left subtitle-1 font-weight-bold">
              Маълумот оиди муроҷиаткунанда
            </th>
            <th class="text-left subtitle-1 font-weight-bold">
              Пешниҳод
            </th>
            <th class="text-left subtitle-1 font-weight-bold">
              Амалҳо
            </th>
          </tr>
          </thead>

          <tbody v-if="!!suggestion.length">
          <tr v-for="(item, index) in suggestion" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ item.date | date }}</td>
            <td>{{ item.author | authorFio }}</td>

            <td>
              <v-tooltip top max-width="400px" min-width="200px">
                <template v-slot:activator="{ on }">
                  <span class="description" v-on="on">{{ item.group.name }}</span>
                </template>
                <span>{{item.group.name  }}</span>
              </v-tooltip>
            </td>
            <td>
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    small
                    outlined
                    fab
                    color="primary"
                    class="ma-1 elevation-1"
                    v-on="on"
                    @click="onEditClick(item)"
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </template>
                <span>Иваз кардан</span>
              </v-tooltip>
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-btn
                    small
                    outlined
                    fab
                    color="error"
                    @click="onDeleteClick(item.id)"
                    class="ma-1 elevation-1"
                    v-on="on">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </template>
                <span>Тоза кардан</span>
              </v-tooltip>
            </td>
          </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-col>
  </v-row>
</template>

<script lang="ts" src="./SuggestionTable.ts"/>

<style scoped>
  td {
    padding-top: 5px !important;
    padding-bottom: 5px !important;
  }

  .description {
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 300px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
</style>

