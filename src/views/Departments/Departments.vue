<template>
  <div id="inspire">
    <v-card
            class="mx-auto mb-5"
            width="100%"
            outlined
            shaped
            elevation="1"
    >
      <v-card-text class="pl-8 pr-8 pt-6 pb-0">
        <v-row>
          <v-col cols="12" sm="6" md="9">
            <v-text-field
                    outlined
                    clearable
                    item-text="Description"
                    item-value="API"
                    label="Ҷустуҷӯ"
                    placeholder="Ҷустуҷӯ аз рӯи номи шӯъба ва номи мудир..."
                    prepend-icon="mdi-database-search"
                    v-model="search"
            />
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <v-btn color="primary"
                   width="100%"
                   height="56px"
                   @click="addDepartment"
            >
              <v-icon>mdi-plus</v-icon>
              <span style="padding-left: 15px;">
                Сабти нав
              </span>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card
            loader-height="100%"
            shaped
            elevation="3"
    >
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
              <th class="text-left subtitle-1 font-weight-bold">
                Мудир
              </th>
              <th class="text-center subtitle-1 font-weight-bold">
                Сабт фаъол аст
              </th>
              <th class="text-left pl-8 subtitle-1 font-weight-bold">
                Амалҳо
              </th>
            </tr>
            </thead>

            <tbody v-if="!!filteredDepartment.length">
            <tr v-for="(item, index) in filteredDepartment" :key="index">
              <td>{{index + 1}}</td>
              <td>{{item.name}}</td>
              <td>{{item.chief}}</td>
              <td>
                <v-tooltip top max-width="200">
                  <template v-slot:activator="{ on }">
                    <v-switch disabled class="justify-center" v-on="on" v-model="item.isActive" :readonly="true"/>
                  </template>
                  <span>Тугмачаи иваз карданро пахш намоед &#9998;</span>
                </v-tooltip>
              </td>
              <td>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on }">
                    <v-btn
                            v-on="on"
                            small
                            outlined
                            fab
                            color="primary"
                            class="ma-1 elevation-1"
                            @click="editDepartment(index)"
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
                            @click="deleteDepartment(index)"
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

    <add-edit-modal
            v-if="showAddEdit"
            :addEditData="addEditData"
            @on-close-add-modal="onCloseAddModal"
    />

    <confirm-modal
            :confirmData="confirmData"
            @on-close-confirm="onCloseConfirm"
    />
  </div>
</template>

<script lang="ts" src="./Departments.ts"/>
