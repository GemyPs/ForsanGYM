<template>
  <div id="sidebar">
    <div class="app-sidebar__overlay" data-toggle="sidebar"></div>
    <aside class="app-sidebar">
      <div class="app-sidebar__user"><img class="app-sidebar__user-avatar" src="/logo.jpeg" alt="User Image" width="60">
        <div>
          <p class="app-sidebar__user-name">{{ $auth.user.name }}</p>
          <p class="app-sidebar__user-designation">{{ $auth.user.role}}</p>
        </div>
      </div>
      <ul class="app-menu">
        <li v-for="(item,index) in list" :key='index'>
          <div v-if="item.text==='Super Admin Panal'">
            <div v-if="$auth.user.role === 'SuperAdmin' ">
              <router-link class="app-menu__item"
                           :to="item.route">
                <i :class="`app-menu__icon ${item.icon}`" style="color:#eabc17"></i>
                <span class="app-menu__label" style="color:#13ea62">{{ item.text }}</span>
              </router-link>
            </div>
          </div>
          <div v-else>
            <router-link class="app-menu__item"
                         :to="item.route">
              <i :class="`app-menu__icon ${item.icon}`"></i>
              <span class="app-menu__label">{{ item.text }}</span>
            </router-link>
          </div>
        </li>
      </ul>
    </aside>

  </div>

</template>

<script>
export default {
  name: "appSidebar",
  data() {
    return {
      list: [
        {text: "Dashboard", icon: "mdi mdi-home", route: {name: 'home'}},
        {text: "Players", icon: "mdi mdi-account", route: {name: 'allPlayers'}},
        {text: "Plans", icon: "mdi mdi-chart-bar", route: {name: 'allPlans'}},
        {text: "Activities", icon: "mdi mdi-karate", route: {name: 'allActs'}},
        {text: "Signed in players", icon: "mdi mdi-account-check", route: {name: 'SignedIn'}},
        {text: "Super Admin Panal", icon: "mdi mdi-crown", route: {name: 'superAdmin'}},
      ]
    }
  },
  mounted() {
    "use strict";

    var treeviewMenu = $(".app-menu");

    // Toggle Sidebar
    $('[data-toggle="sidebar"]').click(function (event) {
      event.preventDefault();
      $(".app").toggleClass("sidenav-toggled");
    });

    // Activate sidebar treeview toggle
    $("[data-toggle='treeview']").click(function (event) {
      event.preventDefault();
      if (!$(this).parent().hasClass("is-expanded")) {
        treeviewMenu
          .find("[data-toggle='treeview']")
          .parent()
          .removeClass("is-expanded");
      }
      $(this).parent().toggleClass("is-expanded");
    });

    // Set initial active toggle
    $("[data-toggle='treeview.'].is-expanded")
      .parent()
      .toggleClass("is-expanded");

  }
}
</script>

<style scoped>

</style>
