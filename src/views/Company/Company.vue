<template>
  <v-card
          class="mx-auto mb-5"
          width="80%"
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
                  label="Номи корхона"
                  placeholder="Номи корхонаро дохил намоед"
                  v-model="companyName"
          />
        </v-col>

        <v-col cols="12" sm="6" md="3">
          <v-btn color="primary"
                 width="100%"
                 height="56px"
                 @click="updateName"
          >
            <span>
                Сабт
              </span>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" src="./Company.ts" />
