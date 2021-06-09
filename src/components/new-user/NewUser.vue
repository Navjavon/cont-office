<template>
  <v-dialog v-model="show" persistent max-width="600" @keydown.esc="onCloseUserDialog(true)">
    <v-card class="pt-8  pl-2 pr-2">
      <v-card-text>
        <v-row>
          <v-btn icon
                 @click="onCloseUserDialog(true)"
                 color="primary"
                 style="position: absolute; top: 0; right: 0;">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-row>
        <v-form
                ref="form"
                v-model="valid">
        <v-row>
          <v-col cols="12">
            <v-text-field
                    v-model="newUserData.user.firstName"
                    label="Ном:"
                    outlined
                    clearable
                    :rules="[rules.required]"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
                    outlined
                    clearable
                    label="Насаб:"
                    v-model="newUserData.user.lastName"
                    :rules="[rules.required]"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
                    outlined
                    clearable
                    label="Вазифа:"
                    v-model="newUserData.user.position"
                    :rules="[rules.required]"
            />
          </v-col>
          <template v-if="admin">
            <v-col cols="12">
              <v-text-field
                      outlined
                      clearable
                      label="Телефон:"
                      append-icon="mdi-phone"
                      v-model="newUserData.user.username"
                      :rules="[rules.required]"
              />
            </v-col>

            <v-col cols="12" v-if="!newUserData.addNew">
              <v-divider class="mb-4"/>
              <v-btn outlined
                     color="primary"
                     width="100%"
                     @click="onEditPassClick">
                Ивази рамз
                <v-icon right="">mdi-pencil</v-icon>
              </v-btn>
            </v-col>

            <v-col cols="12" v-if="newUserData.addNew || changePass">
              <v-text-field
                      outlined
                      clearable
                      :label="userData.isProfile ? 'Рамзи кӯҳна:' : 'Рамзи нав:' "
                      :type="hidePass ? 'password' : 'text'"
                      :append-icon="hidePass ? 'mdi-eye-off' : 'mdi-eye'"
                      @click:append="hidePass = !hidePass"
                      v-model="password1"
                      :rules="[!changePass ? rules.required : false]"
              />
            </v-col>
            <v-col cols="12" v-if="userData.isProfile && changePass">
              <v-text-field
                      outlined
                      clearable
                      label="Рамзи нав:"
                      :type="hidePass ? 'password' : 'text'"
                      :append-icon="hidePass ? 'mdi-eye-off' : 'mdi-eye'"
                      @click:append="hidePass = !hidePass"
                      v-model="password2"
                      class="pa-0 ma-0"
              />
            </v-col>
          </template>
        </v-row>
        <v-row v-if="!userData.isProfile">
          <v-spacer v-if="userData.addNew"/>
          <v-col clost="12">
            <v-switch
                    label="Администратор"
                    v-model="selectionOptions.isAdministrator"
                    @change="onChangePosition($event, 1)"
            />
          </v-col>
          <v-spacer  v-if="userData.addNew"/>
          <v-col clost="12" v-if="!userData.addNew">
            <v-switch
                    label="Оператор"
                    v-model="selectionOptions.isOperator"
                    @change="onChangePosition($event, 2)"
            />
          </v-col>
          <v-col clost="12" v-if="!userData.addNew">
            <v-switch
                    label="Сабт фаъол"
                    v-model="selectionOptions.isActive"
            />
          </v-col>
        </v-row>
        </v-form>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn elevation="0"
               large
               color="primary"
               :disabled="!valid"
               class="mb-5"
               width="47%"
               @click="onCloseUserDialog(false)"
        >
          Сабт
        </v-btn>
        <v-btn elevation="0"
               large
               color="primary"
               class="mb-5"
               width="47%"
               @click="onCloseUserDialog(true)">
          Бекор
        </v-btn>
        <v-spacer />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" src="./NewUser.ts" />
