<template>
  <div class="home" >
    <button @click="aesvuetest()">
      aes前端加密前端解密测试
    </button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  methods:{
    aesvuetest(){
      console.log("onLond");
    },
    created() {
      this.onLond();
    },
  },
}
</script>
