<template>
  <div id="inspire">
    <v-row justify="center">
      <v-col md="10">
        <v-row>
          <v-col cols="12">
            <v-btn color="primary"
                   width="100%"
                   height="56px"
                   @click="addReason">
              <v-icon>mdi-plus</v-icon>
              <span style="padding-left: 15px;">
                Сабти нав
              </span>
            </v-btn>
          </v-col>
        </v-row>

        <v-card
                elevation="3"
                loader-height="100%"
                shaped>
          <v-card-text class="pl-6 pr-6 pt-4 pb-0">
            <v-simple-table>
              <template v-slot:default>
                <thead class="align-center">
                  <tr>
                    <th class="text-left subtitle-1 font-weight-bold">
                      №
                    </th>
                    <th class="text-left subtitle-1 font-weight-bold">
                      Номгуй
                    </th>
                    <th class="text-center subtitle-1 font-weight-bold">
                      Сабт фаъол аст
                    </th>
                    <th class="text-center pl-2 subtitle-1 font-weight-bold">
                      Амалҳо
                    </th>
                  </tr>
                </thead>

                <tbody v-if="!!filteredGroup.length">
                <tr v-for="(item, index) in filteredGroup" :key="index">
                  <td>{{index + 1}}</td>
                  <td>
                    <v-tooltip top>
                      <template
                              v-slot:activator="{ on }"
                      >
                         <span v-on="on">
                          {{item.name}}
                         </span>
                      </template>
                      <span>{{item.name}}</span>
                    </v-tooltip>
                  </td>
                  <td>
                    <v-tooltip top max-width="200">
                      <template v-slot:activator="{ on }">
                        <v-switch disabled class="justify-center" v-on="on" v-model="item.isActive" :readonly="true"/>
                      </template>
                      <span>Тугмачаи иваз карданро пахш намоед &#9998;</span>
                    </v-tooltip>
                  </td>
                  <td class="text-center">
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-btn
                                v-on="on"
                                small
                                outlined
                                fab
                                color="primary"
                                class="ma-1 elevation-1"
                                @click="editReason(index)"
                        >
                          <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                      </template>
                      <span>Иваз кардан</span>
                    </v-tooltip>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on }">
                        <v-btn
                                v-on="on"
                                small
                                outlined
                                fab
                                color="error"
                                class="ma-1 elevation-1"
                                @click="deleteReason(index)"
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
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <add-edit-modal
            v-if="showAddEdit"
            :addEditData="addEditData"
            @on-close-add-modal="onCloseAddModal"
    />

    <confirm-modal :confirmData="confirmData" @on-close-confirm="onCloseConfirm" />
  </div>
</template>

<script lang="ts" src="./DeleteReasons.ts"/>
