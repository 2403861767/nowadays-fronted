<template>
  <div style="background-color: #f7f8fa">
    <var-app-bar
        round
        style="background-image: linear-gradient(to right, #69dbaa, #3a7afe);z-index: 999"
    >
      <span>个人中心</span>
      <template #left>
        <var-button @click="backRoute" round text color="transparent" text-color="#fff">
          <var-icon name="chevron-left" :size="24"/>
        </var-button>
      </template>

      <template #right>
        <var-button @click="toGithub" round text color="transparent" text-color="#fff">
          <var-icon name="github" :size="24"/>
        </var-button>
        <var-button round text color="transparent" text-color="#fff">
          <var-icon name="cog-outline" :size="24"/>
        </var-button>
      </template>

      <template #content>
        <var-paper @click="toEdit" style="background-color: transparent" ripple>
          <var-cell style="display: flex">
            <var-space direction="column" align="center" style="align-items: center;justify-content: center">
              <van-image
                  v-if="currentUser.avatarUrl"
                  round
                  width="4rem"
                  height="4rem"
                  :src="currentUser.avatarUrl"
              />
              <van-image
                  v-else
                  round
                  width="4rem"
                  height="4rem"
                  src="https://varlet.gitee.io/varlet-ui/cat.jpg"
              />
              <!--              <var-avatar v-else src="https://varlet.gitee.io/varlet-ui/cat.jpg"/>-->
              <!--              <var-avatar src="https://varlet.gitee.io/varlet-ui/cat.jpg"/>-->
              <!--              <span style="color: white">x</span>-->
              <span v-if="currentUser.userName" style="color: white">{{ currentUser.userName }}</span>
            </var-space>
          </var-cell>
        </var-paper>
      </template>
    </var-app-bar>


    <div style="height: 70vh;">
      <div style="margin-top: 1rem;">
        <van-cell-group inset>
          <van-cell title="我的VIP" value="立即升级VIP"
                    size="large" is-link>
            <template #icon>
              <svg t="1678413104742" class="icon" viewBox="0 0 1024 1024" version="1.1"
                   xmlns="http://www.w3.org/2000/svg" p-id="3022" width="1.2rem" height="1.2rem">
                <path
                    d="M311.114667 371.242667L471.146667 169.098667a52.106667 52.106667 0 0 1 81.706666 0l160.032 202.144 153.152-65.632a52.106667 52.106667 0 0 1 71.541334 58.474666l-89.44 430.933334a112.416 112.416 0 0 1-110.08 89.568H285.941333a112.416 112.416 0 0 1-110.08-89.568l-89.429333-430.933334a52.106667 52.106667 0 0 1 71.541333-58.474666l153.152 65.632zM512 220.608L355.648 418.101333a52.106667 52.106667 0 0 1-61.376 15.552l-140.544-60.234666 84.8 408.586666a48.416 48.416 0 0 0 47.402667 38.581334h452.138666a48.416 48.416 0 0 0 47.402667-38.581334l84.8-408.586666-140.544 60.234666a52.106667 52.106667 0 0 1-61.376-15.552L512 220.608z"
                    fill="#000000" p-id="3023"></path>
              </svg>
            </template>
          </van-cell>
        </van-cell-group>
      </div>
      <div style="margin-top: 1rem;">
        <van-cell-group inset>
          <van-cell title="联系我"
                    size="large" is-link>
            <template #icon>
              <svg style="margin-top: 2px;" t="1678410551463" class="icon" viewBox="0 0 1024 1024" version="1.1"
                   xmlns="http://www.w3.org/2000/svg" p-id="3240" width="1.2rem" height="1.2rem">
                <path
                    d="M896 576c0 17.632-14.336 32-32 32h-64v-192h64c17.664 0 32 14.368 32 32v128z m-448 192c0-35.296 28.704-64 64-64s64 28.704 64 64-28.704 64-64 64-64-28.704-64-64z m-224-160H160c-17.664 0-32-14.368-32-32v-128c0-17.632 14.336-32 32-32h64v192z m640-256h-65.888C782.176 208 660.224 96 512 96c-148.224 0-270.176 112-286.112 256H160c-52.928 0-96 43.072-96 96v128c0 52.928 43.072 96 96 96h128v-288c0-123.52 100.512-224 224-224s224 100.48 224 224v224a223.872 223.872 0 0 1-98.56 185.472A128.128 128.128 0 0 0 512 640c-70.592 0-128 57.408-128 128s57.408 128 128 128c137.024 0 251.456-95.776 280.64-224H864c52.928 0 96-43.072 96-96v-128c0-52.928-43.072-96-96-96z"
                    fill="#181818" p-id="3241"></path>
              </svg>
            </template>
          </van-cell>
        </van-cell-group>
      </div>
      <div style="margin-top: 1rem;">
        <van-cell-group inset>
          <van-cell title="关注微信公众号" size="large" is-link>
            <template #icon>
              <svg style="margin-top: 2px;" t="1678411035442" class="icon"
                   viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4478" width="1.3rem"
                   height="1.3rem">
                <path
                    d="M767.818667 409.173333C867.338667 444.266667 938.666667 539.136 938.666667 650.666667c0 42.709333-10.496 83.978667-30.261334 120.842666-1.792 3.338667-4.992 8.928-9.696 16.96l14.613334 53.557334c6.506667 23.893333-15.402667 45.813333-39.296 39.296l-53.642667-14.634667-6.229333 3.669333A254.933333 254.933333 0 0 1 682.666667 906.666667c-77.994667 0-147.84-34.88-194.805334-89.888a352.608 352.608 0 0 1-56.64 4.554666c-63.338667 0-124.266667-16.853333-177.472-48.298666-1.834667-1.088-6.410667-3.733333-13.632-7.893334l-80.544 21.653334c-23.914667 6.432-45.76-15.573333-39.146666-39.434667l21.792-78.752a961.205333 961.205333 0 0 1-15.904-27.317333A336.384 336.384 0 0 1 85.333333 480c0-188.618667 154.965333-341.333333 345.888-341.333333 159.914667 0 297.984 108.010667 335.818667 259.296 0.949333 3.765333 1.173333 7.552 0.778667 11.2z m-68.106667-13.952C662.88 282.037333 555.178667 202.666667 431.221333 202.666667 275.434667 202.666667 149.333333 326.933333 149.333333 480c0 46.272 11.498667 90.837333 33.194667 130.698667 2.88 5.290667 10.176 17.706667 21.621333 36.746666a32 32 0 0 1 3.413334 25.013334l-10.517334 37.994666 39.232-10.549333a32 32 0 0 1 24.234667 3.146667c14.272 8.192 22.773333 13.098667 25.802667 14.890666A283.882667 283.882667 0 0 0 431.221333 757.333333c6.154667 0 12.288-0.192 18.389334-0.576A255.061333 255.061333 0 0 1 426.666667 650.666667c0-141.386667 114.613333-256 256-256 5.728 0 11.413333 0.192 17.045333 0.554666z m133.706667 397.056a32 32 0 0 1 3.338666-24.725333 996.672 996.672 0 0 0 15.242667-26.293333A190.997333 190.997333 0 0 0 874.666667 650.666667c0-106.037333-85.962667-192-192-192s-192 85.962667-192 192 85.962667 192 192 192a190.933333 190.933333 0 0 0 98.570666-27.2c2.208-1.322667 8.288-4.874667 18.517334-10.837334a32 32 0 0 1 24.522666-3.210666l12.565334 3.424-3.424-12.565334zM330.666667 426.666667a42.666667 42.666667 0 1 1 0-85.333334 42.666667 42.666667 0 0 1 0 85.333334z m192 0a42.666667 42.666667 0 1 1 0-85.333334 42.666667 42.666667 0 0 1 0 85.333334z m85.333333 202.666666a32 32 0 1 1 0-64 32 32 0 0 1 0 64z m149.333333 0a32 32 0 1 1 0-64 32 32 0 0 1 0 64z"
                    fill="#000000" p-id="4479"></path>
              </svg>
            </template>
          </van-cell>
        </van-cell-group>
      </div>
      <div style="margin-top: 1rem;">
        <van-cell-group inset>
          <van-cell @click="show=true" title="退出登录" size="large" is-link>
            <template #icon>
              <svg style="margin-top: 3px;" t="1678421280191" class="icon" viewBox="0 0 1024 1024" version="1.1"
                   xmlns="http://www.w3.org/2000/svg" p-id="4487" width="1rem" height="1rem">
                <path
                    d="M1024 510.5v-0.4c0-0.4 0-0.8-0.1-1.1v-0.3c0-0.4-0.1-0.8-0.2-1.2v-0.1c-0.9-6.1-3.7-11.9-8.4-16.6L876.7 352.2c-11.7-11.7-30.8-11.7-42.4 0-11.7 11.7-11.7 30.8 0 42.4l87.4 87.4H478c-16.5 0-30 13.5-30 30s13.5 30 30 30h443.6l-87.4 87.4c-11.7 11.7-11.7 30.8 0 42.4 11.7 11.7 30.8 11.7 42.4 0l138.6-138.6c4.7-4.7 7.5-10.5 8.4-16.6v-0.1c0.1-0.4 0.1-0.8 0.2-1.2v-0.3c0-0.4 0.1-0.8 0.1-1.1v-0.4-1.5c0.1-0.5 0.1-1 0.1-1.5z"
                    fill="" p-id="4488"></path>
                <path
                    d="M738 736c-16.6 0-30 13.4-30 30v164c0 18.8-15.2 34-34 34H94c-18.8 0-34-15.2-34-34V94c0-18.8 15.2-34 34-34h580c18.8 0 34 15.2 34 34v164c0 16.6 13.4 30 30 30s30-13.4 30-30V94c0-51.9-42.1-94-94-94H94C42.1 0 0 42.1 0 94v836c0 51.9 42.1 94 94 94h580c51.9 0 94-42.1 94-94V766c0-16.6-13.4-30-30-30z"
                    fill="" p-id="4489"></path>
              </svg>
            </template>
          </van-cell>
        </van-cell-group>
      </div>
    </div>

    <van-dialog @confirm="loginout" v-model:show="show" title="确认退出吗" show-cancel-button>
    </van-dialog>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {useRouter} from "vue-router";
import myAxios from "../../plugins/myAxios";

const show = ref(false)
const router = useRouter()
const backRoute = () => {
  router.back()
}
const currentUser = ref({})
const user = sessionStorage.getItem('user');

onMounted(async () => {
  // console.log(user)
  currentUser.value = JSON.parse(user)
})
const loginout = async () => {
  const res = await myAxios.post('/user/logout')
  if (res.code === 0){
    sessionStorage.removeItem('user')
    show.value = false
    await router.replace('/login')
  }
}
const toGithub = () => {
  window.open('https://github.com/2403861767', '_blank');
}
const toEdit = () =>{
  router.push('/user/detail')
}


</script>

<style scoped>

</style>
