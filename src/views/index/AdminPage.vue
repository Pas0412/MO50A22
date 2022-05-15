<template>
  <div class="admin-page">
    <div class="admin-header">
      <admin-header></admin-header>
    </div>
    <div class="control-cpn">
      <div class="sidebar">
        <admin-sidebar></admin-sidebar>
      </div>
      <div class="router-view">
        <admin-tags></admin-tags>
        <router-view v-slot="{ Component }">
          <keep-alive :include="[]">
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script>
import AdminHeader from "@/components/admin/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTags from "@/components/admin/AdminTags";

export default {
  name: "AdminPage",
  components:{
    AdminHeader,
    AdminSidebar,
    AdminTags
  }
}
</script>

<style scoped>
.admin-page{
  height: 100%;
  display: flex;
  flex-direction: column;
}
.control-cpn{
  flex: 1;
  display: flex;
}
.sidebar{
  flex: 1;
}
.router-view{
  flex: 6;
}
</style>
