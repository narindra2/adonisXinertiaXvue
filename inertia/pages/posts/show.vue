
<template>
    <div class="container">
      <div class="title"> <span>Title : {{  form.title }}</span></div>
      <div class="mb-3">
        <form >
            <div class="mb-3">
                <input type="text" class="form-control" v-model="form.title">
                <MessageError :messageError="form.errors.title" />
            </div>
            <div class="mb-3">
            <label for="" class="form-label">Contenue</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="form.content"></textarea>
                <MessageError :messageError="form.errors.content" />
            </div>
            <div class="mb-3" v-if="post.imageUrl">
                <img :src="post.imageUrl" class="rounded mx-auto d-block" style="max-height: 161px;" :alt="post.title">
            </div>
            <div class="mb-3">
                <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" :checked="post.online  == 1 ? true : false">
                <label class="form-check-label" for="flexCheckDefault">
                  En ligne ?
                </label>
                </div>
                <MessageError :messageError="form.errors.image" />
            </div>
            <div class="mb-3">
                <input type="file" class="form-control form-control-sm"  @input="file =  form.image = $event.target.files[0] ; " />
                <MessageError :messageError="form.errors.image" />
            </div>
            <progress v-if="form.progress && !form.errors.image " :value="form.progress.percentage" max="100">
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
        console.log(this.post);
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
            this.form.clearErrors()
            this.form.transform((data) => ({...data,  image: this.file})).post(app.baseUrl + '/update/article');
        }
    }
  }
  </script>