
<template>
    <div class="container">
      <div class="title"> <span>Title : {{  post.title }}</span></div>
      <span> Contenue : {{  post.content }}</span>
      <div class="mb-3">
        <form >
            <div class="mb-3">
                <input type="text" class="form-control" v-model="form.title">
            </div>
            <div class="mb-3">
            <label for="" class="form-label">Example textarea</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="form.content"></textarea>
            </div>
            <div class="mb-3">
                <input type="file" class="form-control form-control-sm" @input="file =  form.image = $event.target.files[0] ; " />
            </div>
            <progress v-if="form.progress" :value="form.progress.percentage" max="100">
                {{ form.progress.percentage }}%
            </progress>
            <div class="mb-3">
                <button type="button" @click="submitForm" class="btn btn-primary">Save</button>
            </div>
        </form>
        </div>
       <Link  href="/articles"> Revenir à tout lesarticles</Link >.
    </div>
  </template>
  <script>
  import { Head} from '@inertiajs/vue3'
  import { Transmit } from '@adonisjs/transmit-client'
import { useForm } from '@inertiajs/vue3'
    export const transmit = new Transmit({
        baseUrl: window.location.origin
    })
  export default {
      props : ["post"],
      data () {
        return {
            app :app ,
            file : null,
            form : useForm({
                title :null ,
                content :null ,
                image :null ,
            })
        }
      },
      async  mounted() {
        if (this.post) {
            this.updateForm(this.post)
        }
        const subscription = transmit.subscription('post/'+this.post.id+'/consulted')
        await subscription.create();
        await subscription.onMessage((data) => {
          console.log(data)
        })
    },
    methods : {
        updateForm(data = {}){
            this.form = useForm(data)
        },
        submitForm() {
            console.log( this.file);
            this.form.transform((data) => ({...data,  image: this.file})).post(app.baseUrl + '/update/article');
        }
    }
  }
  </script>