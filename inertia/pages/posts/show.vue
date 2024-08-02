
<template>
    <div class="container">
      <div class="title"> <span>Title : {{  formData.title }}</span></div>
      <div class="mb-3">
        <form >
            <div class="mb-3">
                <input type="text" class="form-control" v-model="formData.title">
                <MessageError :messageError="formData.errors.title" />
            </div>
            <div class="mb-3">
            <label for="" class="form-label">Contenue</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="formData.content"></textarea>
                <MessageError :messageError="formData.errors.content" />
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
            </div>
            <div class="mb-3">
                <input type="file" class="form-control form-control-sm"  @input="file =  formData.image = $event.target.files[0] ; " />
                <div class="progress mb-2" v-if="formData.progress && !formData.errors.image " style="height: 1px;">
                    <div class="progress-bar" role="progressbar" :style="'width: ' + formData.progress.percentage + '%;'" :aria-valuenow="formData.progress.percentage" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <MessageError :messageError="formData.errors.image" />
            </div>
            
            
            <div class="mb-3">
                <button type="button" @click="submitForm" class="btn btn-primary">Save</button>
            </div>
        </form>
        </div>
       <Link  href="#" onclick="history.back();return false;" > Revenir à tout lesarticles</Link >.
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
            formData : useForm({
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
            this.formData = useForm(data)
        },
        submitForm() {
            this.formData.clearErrors()
            this.formData.transform((data) => ({...data,  image: this.file})).post(app.baseUrl + '/update/article');
        }
    }
  }
  </script>