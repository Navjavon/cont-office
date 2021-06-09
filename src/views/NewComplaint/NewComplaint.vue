<template>
  <div id="inspire">
    <v-expansion-panels
      inset
      focusable
      multiple
      disabled
      v-model="panel"
    >
      <v-expansion-panel>
        <v-expansion-panel-header>
          <span>
            <v-icon class="mr-4">mdi-bookmark</v-icon>
            Маълумоти асосӣ
          </span>
        </v-expansion-panel-header>

        <v-expansion-panel-content>
          <v-row>
            <v-col cols="5">
              <v-text-field
                disabled
                outlined
                label="Рақами шикоят"
                prepend-icon="mdi-format-list-numbered"
                :value="complaintNumber"
              />
            </v-col>

            <v-col cols="7">
              <v-select
                outlined
                label="Ноҳия"
                v-model="complaint.region.id"
                :rules="[rule.required]"
                ref="region.id"
                :items="regions"
                item-text="name"
                item-value="id"
                :disabled="!isNewComplaint"
              />
            </v-col>

            <v-col cols="5">
              <v-menu
                v-model="menu"
                :close-on-content-click="true"
                :nudge-right="40"
                transition="scale-transition"
                min-width="290px"
              >
                <template v-slot:activator="{ on }">
                  <v-text-field
                    outlined
                    readonly
                    disabled
                    label="Санаи шикоят"
                    :value="formattedDate(creationDate)"
                    v-on="on"
                    prepend-icon="mdi-calendar"
                  />
                </template>
                <v-date-picker
                  no-title
                  scrollable
                  locale="ru"
                  v-model="creationDate"
                  color="primary"
                />
              </v-menu>
            </v-col>

            <v-col cols="7">
              <v-select
                outlined
                :disabled="isNewComplaint"
                label="Ҳолати шикоят"
                v-model="complaint.status.id"
                :items="statuses"
                item-text="name"
                item-value="id"
              />
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          <span>
            <v-icon class="mr-4">mdi-account-card-details</v-icon>
            Маълумот оиди муроҷиаткунанда
          </span>
        </v-expansion-panel-header>

        <v-expansion-panel-content>
          <v-row>
            <v-col cols="4">
              <v-text-field
                type="text"
                clearable
                outlined
                label="Насаб"
                v-model="complaint.complainer.surname"
                :rules="[rule.required]"
                ref="complainer.surname"
                :disabled="!isNewComplaint"
              />
            </v-col>

            <v-col cols="4">
              <v-text-field
                type="text"
                clearable
                outlined
                label="Ном"
                v-model="complaint.complainer.name"
                :rules="[rule.required]"
                ref="complainer.name"
                :disabled="!isNewComplaint"
              />
            </v-col>

            <v-col cols="4">
              <v-text-field
                type="text"
                clearable
                outlined
                label="Номи падар"
                v-model="complaint.complainer.patronymic"
                :disabled="!isNewComplaint"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="2" />
            <v-col cols="5">
              <v-text-field
                type="number"
                clearable
                outlined
                prepend-icon="mdi-phone"
                label="Телефон"
                :rules="[rule.required]"
                ref="complainer.phone"
                v-model="complaint.complainer.phone"
                :disabled="!isNewComplaint"
              />
            </v-col>

            <v-col cols="3">
              <v-radio-group
                 row
                 ref="complainer.gender"
                 :rules="[rule.required]"
                 v-model="complaint.complainer.gender"
                 :disabled="!isNewComplaint"
              >
                <v-radio label="Мард" :value="1" />
                <v-radio label="Зан" :value="2" />
              </v-radio-group>
            </v-col>

            <v-col cols="2"/>
          </v-row>

          <v-row>
            <v-col cols="8">
              <v-text-field
                clearable
                outlined
                label="Кӯча"
                prepend-icon="mdi-map"
                :rules="[rule.required]"
                ref="complainer.street"
                v-model="complaint.complainer.street"
                :disabled="!isNewComplaint"
              />
            </v-col>

            <v-col cols="2">
              <v-text-field
                clearable
                outlined
                label="Хона"
                ref="complainer.home"
                :rules="[rule.required]"
                prepend-icon="mdi-home-city"
                v-model="complaint.complainer.home"
                :disabled="!isNewComplaint"
              />
            </v-col>

            <v-col cols="2">
              <v-text-field
                  clearable
                  outlined
                  label="Ҳуҷра"
                  prepend-icon="mdi-home-floor-1"
                  v-model="complaint.complainer.room"
                  :disabled="!isNewComplaint"
              />
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          <span>
            <v-icon class="mr-4">mdi-book-open</v-icon>
            Шикоят
          </span>
        </v-expansion-panel-header>

        <v-expansion-panel-content>
          <v-row>
            <v-col cols="12">
              <v-select
                outlined
                label="Гурӯҳи шикоят"
                v-model="complaint.group.id"
                ref="group.id"
                :rules="[rule.required]"
                :items="complaintGroups"
                item-text="name"
                item-value="id"
                :disabled="!isNewComplaint"
              />
            </v-col>
            <v-col cols="12">
              <v-textarea
                outlined
                label="Мазмуни мухтасари шикоят"
                v-model="complaint.description"
                ref="description"
                :rules="[rule.required]"
                :disabled="!isNewComplaint"
              />
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <v-expansion-panel>
        <v-expansion-panel-header>
          <span>
            <v-icon class="mr-4">mdi-arrow-collapse-down</v-icon>
            Маълумот оиди иҷрои ариза
          </span>
        </v-expansion-panel-header>

        <v-expansion-panel-content>
          <v-row>
            <v-col cols="7">
              <v-select
                outlined
                label="Шуъбаи масъул"
                v-model="complaint.execution.resDepartment.id"
                :rules="[rule.required]"
                :items="departments"
                item-text="name"
                item-value="id"
                ref="execution.resDepartment.id"
                :disabled="!isNewComplaint"
              />
            </v-col>

            <v-col cols="5">
              <v-menu
                v-model="performanceMenu"
                :close-on-content-click="true"
                :nudge-right="40"
                transition="scale-transition"
                min-width="290px">
                <template v-slot:activator="{ on }">
                  <v-text-field
                    outlined
                    clearable
                    :value="formattedDate(executionDate)"
                    :rules="[rule.required]"
                    ref="execution.date"
                    v-on="on"
                    color="primary"
                    label="Санаи муайяншуда барои иҷроиш"
                    :disabled="!isNewComplaint"
                  />
                </template>
                <v-date-picker
                  no-title
                  locale="ru"
                  scrollable
                  :min="(new Date()).toISOString()"
                  v-model="executionDate"
                  color="primary"
                />
              </v-menu>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <v-textarea
                outlined
                type="text"
                label="Амал"
                v-model="complaint.execution.canalComments"
                :rules="[rule.required]"
                ref="execution.canalComments"
              />
            </v-col>
          </v-row>

          <v-btn
            large
            color="primary"
            height="50px"
            width="200px"
            @click="onSubmit"
          >
            <v-icon left>mdi-content-save</v-icon>
            Сабт намудан
          </v-btn>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <complaint-preview
            :show="previewDialog"
            :complaint="complaint"
            @on-dialog-change="onPreviewDialogHide"
    />
  </div>
</template>

<script lang="ts" src="./NewComplaint.ts"/>

<style>
  .v-expansion-panel-content__wrap {
    padding-top: 16px !important;
  }

  .v-expansion-panel:first-child {
    border-left: 3px solid #00bcd4;
  }

  .v-expansion-panel:nth-child(2) {
    border-left: 3px solid #ffeb3b;
  }

  .v-expansion-panel:nth-child(3) {
    border-left: 3px solid #ff9800;
  }

  .v-expansion-panel:nth-child(4) {
    border-left: 3px solid #009688;
  }

  .theme--light.v-expansion-panels .v-expansion-panel--disabled {
    color: rgba(0,0,0,.87) !important;
  }
</style>
