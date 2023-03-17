<template>
  <div style="background-color: #f7f8fa;height: 100vh">
    <!--    NavBar-->
    <NavBar :titleName="titleName" />

    <div>
      <van-pull-refresh  v-model="refreshing" success-text="刷新成功" @refresh="onRefresh">
        <van-list
            v-model:loading="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
        >
          <van-swipe-cell v-for="plan in allPlans">
            <template v-if="plan.status === 0" #left>
              <van-button @click="openFinishDialog(plan.id)" square type="primary" text="完成"/>
            </template>
            <van-cell :class="{Finished:plan.status===1}" style="margin-bottom: 5px;" :value="plan.createTime">
              <template #title>
                <span class="custom-title">{{ plan.planTitle }}</span>
                <van-tag style="margin-left: 5px;" v-if="plan.tagName" color="#7232dd" plain>{{
                    plan.tagName
                  }}
                </van-tag>
                <van-tag style="margin-left: 5px;" v-else plain>暂无标签</van-tag>
              </template>
            </van-cell>
            <template #right>
              <van-button @click="openDeleteDialog(plan.id)" square type="danger" text="删除"/>
            </template>
          </van-swipe-cell>
        </van-list>

      </van-pull-refresh>
      <van-back-top bottom="10vh" />

    </div>
    <van-dialog @confirm="finishPlan" v-model:show="openFinish" title="确认完成吗" show-cancel-button>
    </van-dialog>
    <van-dialog @confirm="deletePlan" v-model:show="openDelete" title="确认删除吗" show-cancel-button>
    </van-dialog>
  </div>

</template>

<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import {useRouter} from "vue-router";
import NavBar from "../components/NavBar.vue";
import moment from "moment";
import myAxios from "../plugins/myAxios";
import {Snackbar} from "@varlet/ui";

const openDelete = ref(false)
const tempId = ref(0)
const openDeleteDialog = (id) => {
  openDelete.value = true
  tempId.value = id
}
const deletePlan = async () => {
  // console.log(tempId.value)
  const res = await myAxios.get('/plan/delete',{params:{id:tempId.value}})
  if (res.code === 0) {
    openDelete.value =false
    tempId.value = 0
    refreshing.value =true
    onRefresh()
  }else {
    Snackbar.error("出现错误")
  }

}


const openFinish = ref(false)
const openFinishDialog = (id) => {
  openFinish.value = true
  tempId.value = id
}
const finishPlan = async () => {
  // console.log(tempId.value)
  const res = await myAxios.get('/plan/finish',{params:{id:tempId.value}})
  if (res.code === 0) {
    openFinish.value =false
    tempId.value = 0
    refreshing.value =true
    onRefresh()
  }else {
    Snackbar.error("出现错误")
  }

}

const router = useRouter();
const user = ref()
const titleName = ref('主页')
const mockData = {
  planTitle: '学习Java',
  description: '学习Java阿巴巴巴阿爸',
  status: 0,
  priority: 0,
  tagName: 'java',
  createTime: Date,
}
const planList = ref([])
const pageParam = reactive({
  pageNum: 1,
  pageSize: 10,
})
const total = ref(0)
const doGetPageQuery = async () => {
  // 后端得到的数据
  const res = await myAxios.post('/plan/page', pageParam)
  if (res.code === 0) {
    planList.value = res.data.planList
    planList.value.forEach(plan => {
      plan.createTime = moment(plan.createTime).utc().zone(+6).format("YYYY年MM月DD日ddd") + ''
    })
    // console.log(res.data.total)
    total.value = res.data.total
  }
}
const allPlans = ref([])
const loading = ref(false);
const finished = ref(false);
const refreshing = ref(false);

const onLoad = () => {
  setTimeout(async () => {
    await doGetPageQuery()
    if (refreshing.value){
      refreshing.value = false
    }
    for (let i = 0; i <  planList.value.length; i++) {
      allPlans.value.push(planList.value[i])
    }
    loading.value = false;
    pageParam.pageNum+=1
    if (allPlans.value.length >= total.value) {
      finished.value = true;
      pageParam.pageNum = 1
    }

  }, 1000);
};

const onRefresh = () => {
  // 清空列表数据
  finished.value = false;
  // 重新加载数据
  allPlans.value = []
  // console.log("allPlans",allPlans.value)
  // 将 loading 设置为 true，表示处于加载状态
  loading.value = true;
  onLoad();
};

onMounted(async () => {
  // doGetPageQuery()
})


</script>

<style scoped>
.Finished {
  opacity: 0.2;
  color: #646cff;
  background-color: #f7f8fa;
}
</style>
