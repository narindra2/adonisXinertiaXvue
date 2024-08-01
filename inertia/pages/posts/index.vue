
<template>
  <div class="container mt-6">
    <div class="title">AdonisJS {{ version }} x Inertia x Vue.js 
      <template v-if="$page.props.authUser">
          avec {{  $page.props.authUser.fullName }}
      </template>
    </div>
    <span>
      Learn more about AdonisJS and Inertia.js by visiting the 
      <template v-if="$page.props.authUser">
        <Link  href="/logout"> Se deconecter </Link>
      </template>
      <template v-else>
        <Link  href="/login"> Se connecter </Link>
      </template>
    </span>
    <ul>
        <template v-for="post in posts.data" :key="post.id">
            <div>
                <Link  :href="'/article/'+ post.id"> <li> {{ post.title }}</li> </Link>.  
            </div>
        </template>
    </ul>
    <nav aria-label="Page navigation example">
  <ul class="pagination">
    <li v-if="currentPage != 1" class="page-item"><Link class="page-link" :href="posts.meta.previousPageUrl">Previous</Link></li>
    <li class="page-item"><Link class="page-link" href="#">{{ posts.meta.currentPage }}</Link></li>
    <!-- <template v-for="page">
      <li class="page-item"><a class="page-link" href="#">1</a></li>
    </template> -->
    <li v-if="currentPage == lastPage" class="page-item"><Link  class="page-link" :href="posts.meta.nextPageUrl">Next</Link></li>
  </ul>
</nav>
  </div>
</template>
<script>
import { Head} from '@inertiajs/vue3'

export default {
    props : ["posts", "version" ,],
    data () {
        return {
            
        }
    },
    mounted (){
        console.log(this.posts);
    }
   
}
</script>