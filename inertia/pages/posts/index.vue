
<template>
  <Head title="Post list" />
  <div class="container mt-10">
    <div class="title">AdonisJS {{ version }} & Inertia & Vue.js 
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
    <input class="form-control col-md-6 w-50 mt-2 mb-3" type="search" v-model="search" placeholder="Rechecher ...">
    <small v-if="search && posts && posts.meta.total" id="emailHelp" class="form-text text-muted mb-2">{{ posts.meta.total }} resultat  trouvées.</small>
    <div class="row">
      <template v-for="post in posts.data" :key="post.id">
          <div class="col-md-12 mb-2">
            <div class="card" style="height: 200px;">
              <div class="card-body">
               <div class="row">
                <div class="col-md-6">
                    <h5 class="card-title"><Link  :href="'/article/'+ post.id">  {{ post.title }} </Link> </h5>
                    <p class="card-text">{{ post.content }}</p>
              
                    <p> <i>{{ post.createdAt }}</i></p>
                </div>
                <div class="col-md-6">
                  <img  v-if="post.image" lass="rounded mx-auto d-block" style="max-height: 161px;object-fit: contain;max-width: inherit;" :src="post.imageUrl" alt="Card image cap">
                </div>
               </div>
              </div>
             
            </div>
          </div>
      </template>
    </div>
    <nav aria-label="Page navigation example" v-if="posts && posts.data && posts.data.length ">
      <ul class="pagination">
        <li v-if="posts.meta.previousPageUrl" class="page-item"><Link class="page-link" :href="posts.meta.previousPageUrl+'&search='+search">Previous</Link></li>
        <li class="page-item"><Link class="page-link" href="#">{{ posts.meta.currentPage }}</Link></li>
        <!-- <template v-for="page">
          <li class="page-item"><a class="page-link" href="#">1</a></li>
        </template> -->
        <li v-if="posts.meta.nextPageUrl" class="page-item"><Link  class="page-link" :href="posts.meta.nextPageUrl+'&search='+search">Next</Link></li>
      </ul>
  </nav>
  </div>
</template>
<script>
const socket = io()
import { router } from '@inertiajs/vue3'
import { useToast } from "vue-toastification";
export default {
    props : ["posts", "version" ,"searchProps"],
    data () {
        return {
            app : app,
            search : this.searchProps
        }
    },
    mounted (){
      console.log(this.posts);
      
      setTimeout(() => {
        socket.emit('a-user-consulted-list-post', { userId:  this.$page.props.authUser.id })
      }, 1000);
      socket.on('welcome', function(data) {
          const toast = useToast();
          toast(data.message);
      });
    },
  
    methods  : {
      searchArticle(term = ""){
        router.visit(this.app.baseUrl +"/articles?search="+term, {
              method: 'get',
              preserveState: true ,
              preserveScroll: false,
              only: ["posts","searchProps"],
       })
      }
    },
    watch : {
      search(newVal ,oldVal){
        if (newVal) {
            this.searchArticle(newVal)
        }else{
          this.searchArticle()
        }
      }
    }
   
}
</script>