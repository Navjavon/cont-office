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
                Сана
              </th>
              <th class="text-left subtitle-1 font-weight-bold">
                Рақам
              </th>
              <th class="text-left subtitle-1 font-weight-bold">
                Шикояткунанда
              </th>
              <th class="text-left subtitle-1 font-weight-bold">
                Шарҳи мухтасар
              </th>
              <th class="text-left subtitle-1 font-weight-bold">
                Ҳолат
              </th>
              <th class="text-left subtitle-1 font-weight-bold">
                Амалҳо
              </th>
            </tr>
          </thead>

          <tbody v-if="!!complaints.length">
            <tr v-for="(item, index) in complaints" :key="index">
              <td>{{ index + 1 + page * 10 }}</td>
              <td>{{ item.creationDate | date }}</td>
              <td>{{ item.number | complaintNumber }}</td>

              <td>
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <span v-on="on">
                      {{item.complainer | authorFio(true)}}
                    </span>
                  </template>
                  <span>{{item.complainer | authorFio}}</span>
                </v-tooltip>
              </td>

              <td>
                <v-tooltip top max-width="400px" min-width="200px">
                  <template v-slot:activator="{ on }">
                    <span class="description" v-on="on">{{ item.description }}</span>
                  </template>
                  <span>{{ item.description }}</span>
                </v-tooltip>
              </td>

              <td>{{ item.status.name }}</td>

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
                      @click="onPrintClick(item)"
                    >
                      <v-icon>mdi-printer</v-icon>
                    </v-btn>
                  </template>
                  <span>Чоп кардан</span>
                </v-tooltip>

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
                      color="primary"
                      class="ma-1 elevation-1"
                      v-on="on"
                      @click="onPreviewClick(item)"
                    >
                      <v-icon>mdi-eye</v-icon>
                    </v-btn>
                  </template>
                  <span>Тамошо</span>
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
                      v-on="on"
                    >
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

<script lang="ts" src="./ComplaintTable.ts" />

<style scoped>
  .description {
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 300px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .v-list-item__icon:first-child {
    margin-right: 15px !important;
  }

  .v-data-table td, .v-data-table th {
    padding: 10px 2px !important;
  }
</style>

