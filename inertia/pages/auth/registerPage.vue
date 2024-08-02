<template>
    <div class="container">
        <form>
            <div class="form-group mb-2">
                <label for="exampleInputEmail1">Name</label>
                <input type="text" class="form-control"  placeholder="Name" v-model="formData.fullName">
                <MessageError :messageError="formData.errors.fullName" />
            </div>
            <div class="form-group mb-2">
                <label for="Email1">Email address</label>
                <input type="email" class="form-control"  placeholder="Enter email" v-model="formData.email">
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                <MessageError :messageError="formData.errors.email" />
            </div>
            <div class="form-group mb-2">
                <label for="Password">Password</label>
                <input type="password" class="form-control" v-model="formData.password" placeholder="Password">
                <MessageError :messageError="formData.errors.password" />
            </div>
            <div class="form-group mb-2">
                <label for="Confirmpwd">Confirm password</label>
                <input type="password" class="form-control" v-model="formData.confirmPassword" placeholder="Password">
                <MessageError :messageError="formData.errors.confirmPassword" />
            </div>
            <div class="row">
           
            <dvi class="col-md-6 text-start"> <button type="button" @click="submitLoginForm()" class="btn btn-primary">Submit</button></dvi>
                <dvi class="col-md-6 text-end"> <Link  href="/login"> Se connecter </Link></dvi>

            </div>
        </form>
    </div>
</template>
<script>
import { useForm } from '@inertiajs/vue3'
export default {
    data () {
        return {
            app : app,
            formData : useForm({
                email : "narindrandimby2@gmail.com",
                fullName : null,
                password : '123456',
                confirmPassword : '123456',
            })
        }
    },
    mounted () {
        
    },
    methods : {
        submitLoginForm() {
            this.formData.clearErrors();
            this.formData.post(this.app.baseUrl + '/register');
        }
    }

}
</script>
