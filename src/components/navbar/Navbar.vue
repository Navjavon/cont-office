<template>
  <v-navigation-drawer class="primary" app>
    <v-layout column align-center class="mb-10">
      <v-flex class="mt-5 text-center">
        <v-avatar size="100">
          <v-row align="center" justify="center">
            <v-img
              src="../../assets/logo.png"
              max-width="120"
              class="logoBorder"
            />
          </v-row>
        </v-avatar>
      </v-flex>
    </v-layout>

    <v-list dark>
      <div v-for="item in items" :key="item.text">
        <v-list-item v-if="!item.items"  :to="item.route" router>
          <v-list-item-icon>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{item.text}}</v-list-item-title>
        </v-list-item>

        <v-list-group
          :prepend-icon="item.icon"
          v-model="item.active"
          active-class="white--text"
          no-action
          v-if="item.items"
        >

          <template v-slot:activator>
              <span class="navbar-notification" v-if="item.count">
                 {{item.count > 99 ? '99+' : item.count}}
              </span>
            <v-list-item-content>
              <v-list-item-title v-text="item.text" />
            </v-list-item-content>
          </template>

          <v-list-item
            v-for="(subItem, i) in item.items"
            :key="i"
            :to="subItem.route"
            router
            active-class="white--text"
          >
            <span class="navbar-notification" v-if="subItem.count">
              {{subItem.count > 99 ? '99+' : subItem.count}}
            </span>
            <v-list-item-content>
              <v-list-item-title v-text="subItem.text" />
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </div>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" src="./Navbar.ts" />

<style scoped>
  .logoBorder {
    border: 2px solid #ffffff;
    border-radius: 60px !important;
  }

  .navbar-notification {
    position: absolute;
    top: 2px;
    right: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px;
    min-width: 24px;
    width: auto;
    height: 24px;
    background: #ff5722;
  }
</style>
