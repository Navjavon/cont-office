<template>
  <v-card
          v-show="show"
          class="pa-6 print-card"
          :id="id"
          width="100%"
          :set="complainer = complaint.complainer"
  >
    <v-container class="main-container">
      <v-row>
        <v-col cols="3" class="font-weight-bold bottom-to-top-text text-center d-flex align-center">
          <span>ВАРАҚАИ ҚАБУЛИ МУРОҶИАТ <i>(ба муштарӣ дода мешавад)</i></span>
        </v-col>

        <div class="print-btn">
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn
                      small
                      outlined
                      fab
                      color="primary"
                      class="ma-1 elevation-1"
                      v-on="on"
                      @click="onPrintClick"
              >
                <v-icon>mdi-printer</v-icon>
              </v-btn>
            </template>
            <span>Чоп кардан</span>
          </v-tooltip>
        </div>

        <v-col cols="9" class="head-content">
          <p class="text-center font-weight-bold headline">
            <span>{{companyName}}</span>
          </p>

          <div class="pb-2">
            <span class="font-weight-bold">Рақами бақайдгирӣ: </span>
            <span>№{{complaint.number | complaintNumber}}</span>
          </div>
          <div class="pb-2">
            <span class="font-weight-bold">Санаи муроҷиат: </span>
            <span>{{complaint.creationDate | date('.')}}</span>
          </div>
          <div class="pb-2">
              <span class="font-weight-bold">
                  Ному насаби қабулкунанда:
              </span>
            <span>{{complaint.creator | authorFio(true)}}</span>
          </div>
          <div class="pb-2">
            <span class="font-weight-bold">Категорияи муроҷиат: </span>
            <span>{{complaint.group.name}}</span>
          </div>
          <div class="font-weight-bold">
            <u>Мӯҳлати баррасӣ</u>: {{getExecutionDiff()}} рӯз
          </div>
        </v-col>
      </v-row>
    </v-container>

    <v-divider />

    <v-container class="d-none">
      <v-row>
        <span> хатти буриш </span>
      </v-row>
    </v-container>

    <v-container class="my-con">
      <v-row>
        <v-col cols="12">
          <p>
            <span class="font-weight-bold">Рақами бақайдгирӣ: </span>
            <span>№{{complaint.number | complaintNumber}}</span>
          </p>
          <p>
            <span class="font-weight-bold">Санаи муроҷиат: </span>
            <span>{{complaint.creationDate | date('.')}}</span>
          </p>
          <p>
            <span class="font-weight-bold">Ному насаби истеъмолкунанда: </span>
            <span>{{complainer | authorFio}}</span>
          </p>
          <p>
            <span class="font-weight-bold">Суроғаи зист: </span>
            <span>кӯчаи {{complainer.street}}, бинои №{{complainer.home}} {{complainer.room ? `, ҳуҷраи ${complainer.room}` : ''}}</span>
          </p>
          <p>
            <span class="font-weight-bold">Рақами телефон: </span>
            <span>{{complainer.phone}}</span>
          </p>
          <p>
            <span class="font-weight-bold">Категорияи муроҷиат: </span>
            <span>{{complaint.group.name}}</span>
          </p>
          <p>
            <span class="font-weight-bold">Шӯъбаи (шахси) баррасикунанда: </span>
            <span>{{complaint.execution.resDepartment.name}} {{complaint.execution.resDepartment.chief ? `(${complaint.execution.resDepartment.chief})` : ''}}</span>
          </p>

          <p>
            <strong>
              <u>Шарҳи муроҷиат</u>:
            </strong>
            <span>{{complaint.description}}</span>
          </p>

          <p>
              <span class="font-weight-bold">
                <u>Амал</u>:
              </span>
              {{complaint.execution.canalComments}}
          </p>

          <p class="font-weight-bold">
            <u>Мӯҳлати баррасӣ</u>: {{getExecutionDiff()}} рӯз
          </p>

          <div v-if="isDeleteComplaint">
            <p class="font-weight-bold">
              <u>Шахси масъул (несткунӣ)</u>: {{complaint.remover | authorFio}}
            </p>

            <p class="font-weight-bold">
              <u>Сабаби нест кардан</u>: {{complaint.remReason.name}}
            </p>

            <p class="font-weight-bold">
              <u>Шарҳи нест кардан</u>: {{complaint.remReasonDesc}}
            </p>

            <p class="font-weight-bold">
              <u>Санаи нест кардан</u>: {{complaint.removeDate | date('.')}}
            </p>
          </div>
          <v-row>
            <v-col>
                <span class="font-weight-bold">
                  <u>
                    Ному насаби қабулкунанда
                  </u>
                </span>:
              <span>{{complaint.creator | authorFio(true)}}</span>
            </v-col>

            <v-col>
                <span class="font-weight-bold">
                  Имзо: ___________________
                </span>
            </v-col>
          </v-row>

        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script lang="ts" src="./ComplaintPrint.ts"/>

<style scoped>
  .bottom-to-top-text {
    writing-mode: vertical-rl;
    transform: rotate(-180deg);
    max-height: 250px;
  }

  .print-btn {
    position: absolute;
  }

  @media print {
    @page { margin: 0.6cm; }
    body { margin: 2.6cm; }

    .v-application p {
      margin-bottom: 10px !important;
    }

    .print-btn {
      display: none;
    }

    .print-card {
      width: 100%;
    }

    .v-application .pa-6 {
      padding: 0 !important;
    }

    .v-card {
      box-shadow: none;
    }

    .v-divider {
      border-color: #000 !important;
      width: 100vw;
    }

    .bottom-to-top-text {
      border-left: 1px solid #000;
    }

    .head-content {
      padding-left: 20px;
      width: 100%;
    }

    .head-content .headline {
      font-size: 22px !important;
    }
  }
</style>
