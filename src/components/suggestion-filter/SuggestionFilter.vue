<template>
  <v-card
    class="mx-auto"
    width="100%"
    outlined
    shaped
  >
    <v-card-text class="pl-8 pr-8 pt-6 pb-0">
      <v-row>
        <v-col cols="10">
          <v-text-field
            outlined
            clearable
            item-text="Description"
            item-value="API"
            label="Ҷустуҷӯ"
            placeholder="Ҷустуҷӯ аз рӯи ному насаб ва рақами телефони арзкунанда ва шарҳи пешниҳод"
            prepend-icon="mdi-database-search"
            v-model="search"
          />
        </v-col>

        <v-col cols="2">
          <v-btn color="primary"
                 width="100%"
                 height="56px"
                 :outlined="!showFilter"
                 @click="showFilter = !showFilter"
          >
            <v-icon>mdi-tune</v-icon>
            <span style="padding-left: 15px;">
              Филтрҳо
            </span>
          </v-btn>
        </v-col>
      </v-row>

      <v-divider class="mb-5" v-show="showFilter" />

      <v-row v-show="showFilter">
        <date-filter
                :date-prop="from"
                label="Аз санаи"
                @on-date-change="onFromChange"
        />

        <date-filter
                :date-prop="to"
                label="То санаи"
                @on-date-change="onToChange"
        />

        <shortcut-data-filter @on-shortcut-change="onShortcutChange" />


      </v-row>

      <v-row v-show="showFilter">
        <v-col cols="8">
          <v-select
                  item-text="name"
                  item-value="id"
                  :items="suggestionGroups"
                  label="Гурӯҳи пешниҳодро интихоб кунед"
                  outlined
                  color="primary"
                  v-model="selectedGroup"
          />
        </v-col>

        <v-col cols="2">
          <v-btn
                  large
                  color="primary"
                  height="50px"
                  width="100%"
                  @click="onSearchButtonClick"
          >
            <v-icon left>mdi-table-search</v-icon>
            Ҷустуҷӯ
          </v-btn>
        </v-col>

        <v-col cols="2">
          <v-btn large
                 color="primary"
                 height="50px"
                 width="100%"
                 @click="resetFilter">
            <v-icon left>mdi-cancel</v-icon>
            Тоза кардан
          </v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" src="./SuggestionFilter.ts" />
