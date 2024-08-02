<template>
    <div class="container">
        <form @submit.prevent="submitLoginForm()">
            
            <div class="form-group mb-2">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" class="form-control"  placeholder="Enter email" v-model="formData.email">
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group mb-2">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" class="form-control" v-model="formData.password" placeholder="Password">
            </div>
            <div class="form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1">
                <label class="form-check-label" for="exampleCheck1">Check me out</label>
            </div>
            <MessageError v-show="!submiting" :messageError="messageError" />
            
            <div class="row">
                <dvi class="col-md-6 text-start"> <button type="button" @click="submitLoginForm()" class="btn btn-primary">Submit</button></dvi>
                <dvi class="col-md-6 text-end"> <Link  href="/register"> Creer un compte </Link></dvi>
           </div>
        </form>
    </div>
</template>
<script>
import { useForm } from '@inertiajs/vue3'
export default {
    props : { messageError : null},
    data () {
        return {
            app : app,
            formData : useForm({
                email : "narindrandimby2@gmail.com",
                password : null,
            }),
            submiting : false
        }
    },
    mounted () {
        
    },
    methods : {
        submitLoginForm() {
            this.submiting = true
            this.formData.post(this.app.baseUrl + '/login',{
                onFinish: visit => {
                    this.submiting = false
                },
               
            });
        }
    },
    

}
</script>

