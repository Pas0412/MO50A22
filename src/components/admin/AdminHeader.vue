<template>
    <div class="header">
        <!-- 折叠按钮 -->
        <div class="collapse-btn" @click="collapseChange">
            <img style="position: relative;top: 9px" src="~assets/img/openbar.png">
        </div>
        <div class="logo">Canteen Management</div>
        <div class="header-right">
            <div class="header-user-con">
                <!-- 用户头像 -->
                <div class="user-avator">
                    <img src="../../assets/img/cantine.png" />
                </div>
                <!-- 用户名下拉菜单 -->
                <el-dropdown class="user-name" trigger="click" @command="handleCommand">
                    <span class="el-dropdown-link">
                        {{username}}
                        <i class="el-icon-caret-bottom"></i>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <a :href="uniWebUri" target="_blank">
                                <el-dropdown-item>University Website</el-dropdown-item>
                            </a>
                            <el-dropdown-item divided command="logout">Logout</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                  <el-icon :size="15" color="white"><ArrowDown /></el-icon>
                </el-dropdown>&nbsp;
            </div>
        </div>
    </div>
</template>
<script>
import {universityWebsite} from "@/utils/const/const";

export default {
  name:'AdminHeader',
    data() {
        return {
          fullscreen: false,
          name: "admin",
          message: 2,
          collapse:false,
          uniWebUri:universityWebsite
        };
    },
    computed: {
        username() {
          const name = this.$store.getters.username
            return name ? name : this.name;
        },
    },
    methods: {
        // Username dropdown menu select event
        handleCommand(command) {
            if (command == "logout") {
              this.$store.commit("del_token")
              this.$store.commit("del_time")
              this.$store.commit("del_userInfo")
              this.$store.commit("clearTags")
              sessionStorage.removeItem("token")
              sessionStorage.removeItem("nowTime")
              this.$router.replace('/')
            }
        },
        // 侧边栏折叠
        collapseChange() {
          this.collapse = !this.collapse
            this.$store.commit("handleCollapse", this.collapse);
        },

    },
    mounted() {
        if (document.body.clientWidth < 1500) {
            this.collapseChange();
        }
    }
};
</script>
<style scoped>
.header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    color: white;
    background-color: #253142;
}
.collapse-btn {
    float: left;
    padding: 0 13px 0px 16px;
    cursor: pointer;
    line-height: 70px;
}
.header .logo {
    float: left;
    width: 250px;
    line-height: 70px;
}
.header-right {
    float: right;
    padding-right: 50px;
}
.header-user-con {
    display: flex;
    height: 70px;
    align-items: center;
}
.btn-fullscreen {
    transform: rotate(45deg);
    margin-right: 5px;
    font-size: 24px;
}
.btn-fullscreen {
    position: relative;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 15px;
    cursor: pointer;
}
.btn-bell-badge {
    position: absolute;
    right: 0;
    top: -2px;
    width: 8px;
    height: 8px;
    border-radius: 4px;
    background: #f56c6c;
    color: #fff;
}
.btn-bell .el-icon-bell {
    color: #fff;
}
.user-name {
    margin-left: 10px;
}
.user-avator {
    margin-left: 20px;
}
.user-avator img {
    display: block;
    width: 32px;
    height: 32px;
}
.el-dropdown-link {
    color: #fff;
    cursor: pointer;
}
.el-dropdown-menu__item {
    text-align: center;
}
</style>
