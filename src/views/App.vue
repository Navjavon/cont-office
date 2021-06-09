<template>
  <v-app id="app" class="grey lighten-4 " style="background-color: white !important;">
    <template v-if="!$route.meta.allowAnonymous">
      <Navbar :items="navbarItems" />

      <v-app-bar app flat class="border-bottom">
        <v-toolbar-title>
          <span class="font-weight-light blue--text">Муроҷиат - </span>
          <span class="blue--text">{{pageName}}</span>
        </v-toolbar-title>

        <v-spacer />

        <div>
          <em>{{user ? user.position : ''}}</em>, {{user ? `${user.firstName} ${user.lastName}` : ''}}
        </div>

        <v-btn icon color="primary" @click="onShowProfile">
          <v-icon>mdi-account-circle</v-icon>
        </v-btn>

        <v-btn text dark color="grey" @click="onLogOut">
          <span>Баромад</span>
          <v-icon right>mdi-exit-to-app</v-icon>
        </v-btn>
      </v-app-bar>

      <v-divider />

      <v-content class="mx-4 my-2 mt-5">
        <router-view />
      </v-content>

      <new-user-component
              v-if="showProfile"
              :userData="userComponentData"
              @on-close-user-dialog="onCloseNewUserDialog"
      />
    </template>

    <template v-else>
      <transition>
        <keep-alive>
          <router-view/>
        </keep-alive>
      </transition>
    </template>

    <v-snackbar
            v-model="showMsg"
            :color="isError ? 'error' : 'primary'"
            :timeout="2000"
            top>
      {{ infoMsg }}
    </v-snackbar>
  </v-app>
</template>

<style>
  .border-bottom {
    border-bottom: 1px solid var(--v-primary-base) !important;
  }
</style>

<script lang="ts" src="./App.ts" />
