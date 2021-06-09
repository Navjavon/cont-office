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
                    placeholder="Ҷустуҷӯ аз рӯи ному насаб ва рақами телефони истифодабар..."
                    prepend-icon="mdi-database-search"
                    v-model="search"
            />
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <v-btn color="primary"
                   width="100%"
                   height="56px"
                   @click="onAddNewUser">
              <v-icon>mdi-account-plus</v-icon>
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
                Истифодабарандагон
              </th>
              <th class="text-left subtitle-1 font-weight-bold">
                Телефон
              </th>
              <th class="text-center subtitle-1 font-weight-bold">
                Оператор
              </th>
              <th class="text-center subtitle-1 font-weight-bold">
                Администратор
              </th>
              <th class="text-center subtitle-1 font-weight-bold">
                Сабт фаъол аст
              </th>
              <th class="text-left pl-8 subtitle-1 font-weight-bold">
                Амалҳо
              </th>
            </tr>
            </thead>

            <tbody v-if="!!filteredUsers.length">
            <tr v-for="(item, index) in filteredUsers" :key="index">
              <td>{{index + 1}}</td>
              <td>{{item.name}}</td>
              <td>{{item.phone}}</td>
              <td>
                <v-tooltip top max-width="200">
                  <template v-slot:activator="{ on }">
                    <v-switch disabled class="justify-center" v-on="on" v-model="item.isOperator" :readonly="true"/>
                  </template>
                  <span>Тугмачаи иваз карданро пахш намоед &#9998;</span>
                </v-tooltip>
              </td>
              <td>
                <v-tooltip top max-width="200">
                  <template v-slot:activator="{ on }">
                    <v-switch disabled class="justify-center" v-on="on" v-model="item.isAdmin" :readonly="true"/>
                  </template>
                  <span>Тугмачаи иваз карданро пахш намоед &#9998;</span>
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
                            @click="onEditUser(item.phone)"
                    >
                      <v-icon>mdi-account-edit</v-icon>
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
                            @click="onDeleteUser(item.phone)"
                            class="ma-1 elevation-1"
                    >
                      <v-icon>mdi-account-minus</v-icon>
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

    <new-user-component
            v-if="showNewUser"
            :userData="userComponentData"
            @on-close-user-dialog="onCloseNewUserDialog"
    />

    <confirm-modal
            v-if="confirmDialog"
            :confirmData="confirmData"
            @on-close-confirm="onCloseConfirm"
    />

  </div>
</template>

<script lang="ts" src="./Users.ts"/>
