<template>
  <div>
    <v-row>
      <v-col cols="7">
        <v-hover
                v-slot:default="{ hover }"
                open-delay="100"
        >
          <v-card class="mt-4" shaped :elevation="hover ? 8 : 3">
            <v-card-title class="justify-center">
              <v-icon class="mr-4 info--text">mdi-book-open</v-icon>
              Шикоятҳои фаъол
            </v-card-title>

            <v-divider />

            <v-card-text class="pl-6 pr-6 pt-4 pb-0">
              <v-simple-table>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-left subtitle-1 font-weight-bold">
                        №
                      </th>
                      <th class="text-left subtitle-1 font-weight-bold">
                        Сабаби шикоят
                      </th>
                      <th class="text-center subtitle-1 font-weight-bold">
                        Миқдор
                      </th>
                    </tr>
                  </thead>

                  <tbody v-if="!!complaints.length">
                    <tr v-for="(complaint, index) in complaints" :key="index">
                      <td>{{ index + 1 }}</td>
                      <td>{{ getGroupName(complaint.groupId) }}</td>
                      <td class="font-weight-bold text-center">{{ complaint.count }}</td>
                    </tr>
                    <tr>
                      <td />
                      <td class="font-weight-bold title">Ҳамагӣ</td>
                      <td class="font-weight-bold text-center title">{{ getSum(complaints) }}</td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-card-text>
        </v-card>
        </v-hover>
      </v-col>

      <v-col cols="5">
        <v-hover
                v-slot:default="{ hover }"
                open-delay="100"
        >
          <v-card class="mt-4" shaped :elevation="hover ? 8 : 3">
            <v-card-title class="justify-center">
              <v-icon class="mr-4 info--text">mdi-email-newsletter</v-icon>
              Пешниҳодҳо
            </v-card-title>

            <v-divider />

            <v-card-text>
              <report-suggestion-table
                      :reportSuggestion="suggestions"
                      :groups="suggestionGroups"
              />
            </v-card-text>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>
  </div>
</template>

<script src="./Desktop.ts"></script>
<style scoped>
  .v-data-table tbody tr:hover {
     background: none !important;
  }
</style>
