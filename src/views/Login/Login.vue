<template>
  <v-app id="login">
    <v-content>
      <div class="scarf">
        <div class="middle" style="left: 6px;"></div>
        <div class="middle" style="left: 18px;"></div>
        <div class="middle" style="left: 30px;"></div>
        <div class="middle" style="left: 42px;"></div>
        <div class="middle" style="left: 54px;"></div>
        <div class="middle" style="left: 66px;"></div>
        <div class="side left"></div>
        <div class="side right"></div>
      </div>

      <v-container fluid fill-height>
        <v-layout justify-center>
          <v-flex xs10 sm8 md6 lg5>
            <div class="logo mb-8">
              <v-row align="center" justify="center">
                <v-img
                  src="../../assets/logo.png"
                  max-width="200"
                />
              </v-row>
              <h1 class="primary--text welcome">Муроҷиат</h1>
            </div>

            <v-card elevation="5">
              <v-toolbar color="primary toolbar" height="85px" dark flat>
                <v-toolbar-title class="align-center title-login">Воридшавӣ</v-toolbar-title>
              </v-toolbar>

              <v-card-text class="pl-10 pr-10 pt-8">
                <v-form ref="form" v-model="valid">
                  <v-text-field
                    append-icon="mdi-phone"
                    class="mb-3"
                    name="login"
                    label="Телефон"
                    type="text"
                    v-model="loginData.username"
                    :rules="[rules.required]"
                  />

                  <v-text-field
                    :type="hidePassword ? 'password' : 'text'"
                    :append-icon="hidePassword ? 'mdi-eye-off' : 'mdi-eye'"
                    name="password"
                    label="Рамз"
                    id="password"
                    :rules="[rules.required]"
                    v-model="loginData.password"
                    @click:append="hidePassword = !hidePassword"
                  />
                </v-form>
              </v-card-text>

              <v-card-actions>
                <v-spacer />
                <v-btn
                  x-large
                  class="mb-4 pt-4 pb-4"
                  color="primary"
                  @click="login"
                  :loading="loading"
                  :disabled="!valid"
                  width="50%"
                >
                  Даромадан
                </v-btn>
                <v-spacer />
              </v-card-actions>

            </v-card>
          </v-flex>
        </v-layout>

        <div class="left-bar">
          <p>Барномаи мазкур мутобиқи «Лоиҳаи обтаъминкунӣ ва беҳдошт дар Тоҷикистон» коркард шудааст.</p>
          <p>Данная программа разработана в рамках проекта «Водоснабжение и санитария в Таджикистане».</p>
          <p>This program was developed in the framework of the «Tajikistan water supply and sanitation project</p>
        </div>

        <div class="right-bar">
          <v-img
                  src="../../assets/oxfam-logo.png"
                  class="logo-img"
                  max-height="55"
                  max-width="54"
          />

          <v-img
                  src="../../assets/swiss-agency.png"
                  class="logo-img"
          />

          <v-img
                  src="../../assets/souz-potrebiteley.png"
                  class="logo-img"
          />
        </div>
      </v-container>
    </v-content>
  </v-app>
</template>

<script lang="ts" src="./Login.ts" />

<style scoped>
  p {
    margin-bottom: 0 !important;
  }
  .logo-img {
    display: inline-block;
    max-width: 110px;
  }

  .left-bar {
    position: absolute;
    left: 240px;
    top: 86px;
    width: 262px;
    text-align: center;
    font-size: 10px;
  }

  .right-bar {
    position: absolute;
    top: 87px;
    right: 240px;
  }
</style>
