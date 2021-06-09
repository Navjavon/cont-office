<template>
  <div id="inspire">
    <v-expansion-panels
      inset
      focusable
      multiple
      disabled
      v-model="panel">
      <v-expansion-panel>
        <v-expansion-panel-header>
        <span>
          <v-icon class="mr-4">mdi-bookmark</v-icon>
          Маълумоти асосӣ
        </span>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row>
            <v-col cols="4">
              <v-text-field
                type="text"
                clearable
                outlined
                label="Ном"
                v-model="suggestion.author.name"
                :rules="[rule.required]"
                ref="author.name"
              />
            </v-col>
            <v-col cols="4">
              <v-text-field
                type="text"
                clearable
                outlined
                label="Насаб"
                v-model="suggestion.author.surname"
                :rules="[rule.required]"
                ref="author.surname"
              />
            </v-col>
            <v-col cols="4">
              <v-text-field
                type="text"
                clearable
                outlined
                label="Номи падар"
                v-model="suggestion.author.patronymic"
              />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="2"/>
            <v-col cols="5">
              <v-text-field
                type="number"
                clearable
                outlined
                prepend-icon="mdi-phone"
                label="Телефон"
                v-model="suggestion.author.phone"
              />
            </v-col>

            <v-col cols="3">
              <v-radio-group row
                             ref="author.gender"
                             :rules="[rule.required]"
                             v-model="suggestion.author.gender"
              >
                <v-radio label="Мард" :value="1" />
                <v-radio label="Зан" :value="2" />
              </v-radio-group>
            </v-col>

            <v-col cols="2"/>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                type="text"
                clearable
                outlined
                label="Суроғаи пурраи арзкунанда"
                v-model="suggestion.author.home"
              />
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>
         <span>
          <v-icon class="mr-4">mdi-book-open</v-icon>
                  Пешниҳод
        </span>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row>
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
                    clearable
                    disabled
                    label="Санаи пешниҳод"
                    :value="formattedDate(date)"
                    :rules="[rule.required]"
                    ref="date"
                    v-on="on"
                    prepend-icon="mdi-calendar"
                  />
                </template>
                <v-date-picker
                  no-title
                  scrollable
                  locale="ru"
                  v-model="date"
                  color="primary"
                />
              </v-menu>
            </v-col>
            <v-col cols="7">
              <v-select
                outlined
                label="Гурӯҳи пешниҳод"
                v-model="suggestion.group.id"
                :rules="[rule.required]"
                :items="suggestionGroups"
                item-text="name"
                item-value="id"
                ref="group.id"
              />
            </v-col>
            <v-col cols="12">
              <v-textarea
                outlined
                label="Мазмуни мухтасари пешниҳод"
                v-model="suggestion.description"
                :rules="[rule.required]"
                ref="description"
              />
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header>
         <span>
          <v-icon class="mr-4">mdi-comment-text-outline</v-icon>
                  Шарҳи иловагӣ
        </span>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-row>
            <v-col cols="12">
              <v-textarea
                outlined
                label="Шарҳи иловагӣ (дар ҳолати зарурат)"
                v-model="suggestion.comments"
              />
            </v-col>
          </v-row>
          <v-btn
            large
            color="primary"
            height="50px"
            width="200px"
            @click="onSubmit">
            <v-icon left>mdi-content-save</v-icon>
            Сабт намудан
          </v-btn>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script lang="ts" src="./NewSuggestion.ts"></script>
