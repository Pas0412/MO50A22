<template>
    <div class="tags" v-if="showTags">
        <ul style="padding-left: 0px">
            <li
                class="tags-li"
                v-for="(item,index) in tagsList"
                :class="{'active': isActive(item.path)}"
                :key="index"
            >
                <router-link :to="item.path" class="tags-li-title">{{item.title}}</router-link>
                <span class="tags-li-icon" @click="closeTags(index)">
                  <el-icon><Close /></el-icon>
                </span>
            </li>
        </ul>
        <div class="tags-close-box">
            <el-dropdown @command="handleTags">
                <el-button size="" type="primary">
                  Options
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </el-button>
                <template #dropdown>
                    <el-dropdown-menu size="">
                        <el-dropdown-item command="other">Close others</el-dropdown-item>
                        <el-dropdown-item command="all">Close all</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        tagsList() {
            return this.$store.getters.tagsList;
        },
        showTags() {
            return this.tagsList&&this.tagsList.length > 0;
        }
    },
    methods: {
        isActive(path) {
            return path === this.$route.fullPath;
        },
        // 关闭单个标签
        closeTags(index) {
            const delItem = this.tagsList[index];
            this.$store.commit("delTagsItem", { index });
            const item = this.tagsList[index]
                ? this.tagsList[index]
                : this.tagsList[index - 1];
            if (item) {
                delItem.path === this.$route.fullPath &&
                    this.$router.push(item.path);
            } else {
                this.$router.push("/AdminPage");
            }
        },
        // 关闭全部标签
        closeAll() {
            this.$store.commit("clearTags");
            this.$router.push("/AdminPage");
        },
        // 关闭其他标签
        closeOther() {
            const curItem = this.tagsList.filter(item => {
                return item.path === this.$route.fullPath;
            });
            this.$store.commit("closeTagsOther", curItem);
        },
        // 设置标签
        setTags(route) {
          let isExist = false;
          if(this.tagsList){
            isExist = this.tagsList.some(item => {
              return item.path === route.fullPath;
            });
          }
          if (!isExist) {
            if (this.tagsList&&this.tagsList.length >= 8) {
              this.$store.commit("delTagsItem", { index: 0 });
            }
            this.$store.commit("setTagsItem", {
              name: route.name,
              title: route.meta.title,
              path: route.fullPath
            });
          }
        },
      handleTags(command) {
        command === "other" ? this.closeOther() : this.closeAll();
      }
    },
    watch: {
        $route(newValue) {
            this.setTags(newValue);
        }
    },
    created() {
        this.setTags(this.$route);
        // 关闭当前页面的标签页
        // this.$store.commit("closeCurrentTag", {
        //     $router: this.$router,
        //     $route: this.$route
        // });
    }
};
</script>


<style>
.tags {
    position: relative;
    height: 37px;
    overflow: hidden;
    background: #fff;
    padding-right: 120px;
    box-shadow: 0 5px 10px #ddd;
}

.tags ul {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
}

.tags-li {
  position: relative;
  top: -13px;
    float: left;
    margin: 0px 5px 0px 3px;
    border-radius: 3px;
    font-size: 14px;
    overflow: hidden;
    cursor: pointer;
    height: 28px;
    line-height: 28px;
    border: 1px solid #e9eaec;
    background: #fff;
    padding: 0 5px 0 12px;
    vertical-align: middle;
    color: #666;
    -webkit-transition: all 0.3s ease-in;
    -moz-transition: all 0.3s ease-in;
    transition: all 0.3s ease-in;
}

.tags-li:not(.active):hover {
    background: #f8f8f8;
}

.tags-li.active {
  color: #f8f8f8;
  background-color: #8c8cec;
}

.tags-li-title {
    float: left;
    max-width: 80px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-right: 5px;
    color: #666;
  text-decoration:none
}

.tags-li.active .tags-li-title {
    color: #fff;
}
.tags-li-icon {
  position: relative;
  top: 3px
}
.tags-close-box {
    position: absolute;
    right: 0;
    top: 0;
    box-sizing: border-box;
    padding-top: 2px;
    text-align: center;
    width: 95px;
    height: 32px;
    background: #fff;
    z-index: 10;
}
</style>
