<template>
  <v-app id="complaints">
    <v-card class="mt-4"
            loader-height="100%"
            shaped
            elevation="3"
    >
      <v-card-text class="pl-6 pr-6 pt-4 pb-4">
        <v-simple-table>
          <template v-slot:default>
            <thead class="align-center">
            <tr>
              <th class="text-left subtitle-1 font-weight-bold">
                №
              </th>
              <th class="text-left subtitle-1 font-weight-bold">
                Санаи несткунӣ
              </th>
              <th class="text-left subtitle-1 font-weight-bold">
                Шахси масъул
              </th>
              <th class="text-left subtitle-1 font-weight-bold">
                Шикоят
              </th>
              <th class="text-left subtitle-1 font-weight-bold">
                Сабаби нест кардан
              </th>
              <th class="text-left subtitle-1 font-weight-bold">
                Амал
              </th>
            </tr>
          </thead>

          <tbody v-if="!!deletedComplaints.length">
            <tr v-for="(item, index) in deletedComplaints" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ item.removeDate | date }}</td>
              <td>{{ item.remover | authorFio }}</td>

              <td style="max-width: 400px;">
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <div class="font-weight-bold mb-1" v-on="on">
                      {{item.complainer | authorFio(true)}}
                    </div>
                  </template>
                  <span class="font-weight-bold mb-1">{{item.complainer | authorFio}}</span>
                </v-tooltip>

                <v-tooltip top max-width="400px" min-width="200px">
                  <template v-slot:activator="{ on }">
                    <span class="description" v-on="on">{{ item.description }}</span>
                  </template>
                  <span>{{ item.description }}</span>
                </v-tooltip>
              </td>
              <td>{{ item.remReason.name }}</td>

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
                      @click="onPreviewClick(item)"
                    >
                      <v-icon>mdi-eye</v-icon>
                    </v-btn>
                  </template>
                  <span>Тамошо</span>
                </v-tooltip>
              </td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>
        <paginator
                :pages="pages"
                @on-page-change="onPageChange"
        />
      </v-card-text>
    </v-card>
    <complaint-preview
      :show="previewDialog"
      :complaint="selectedComplaint"
      :isDeleteComplaint="true"
      @on-dialog-change="onPreviewDialogHide"
    />
  </v-app>
</template>

<script lang="ts" src="./DeletedComplaints.ts"/>

<style scoped>
  td {
    padding-top: 5px !important;
    padding-bottom: 5px !important;
  }

  .description {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
</style>
