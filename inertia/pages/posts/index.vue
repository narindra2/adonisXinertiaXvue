
<template>
  <div class="container mt-6">
    <div class="title">AdonisJS {{ version }} x Inertia x Vue.js</div>
    <span>
      Learn more about AdonisJS and Inertia.js by visiting the <Link  href="/test"> Home page </Link>.
    </span>
    <ul>
        <template v-for="post in posts" :key="post.id">
            <div>
                <Link  :href="'/article/'+ post.id"> <li> {{ post.title }}</li> </Link>.  
            </div>
        </template>
    </ul>
  </div>
</template>
<script>
import { Head} from '@inertiajs/vue3'

export default {
    props : ["posts", "version"],
    data () {
        return {
            
        }
    },
   
}
</script>