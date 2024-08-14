/// <reference path="../../adonisrc.ts" />
/// <reference path="../../config/inertia.ts" />

import '../css/app.css';
import { createApp, h } from 'vue'
import type { DefineComponent } from 'vue'
import { createInertiaApp } from '@inertiajs/vue3'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'
import {   Link } from '@inertiajs/vue3'
import  MessageError  from "../pages/components/MessageError.vue";
import { router } from '@inertiajs/vue3'
import axios from '../../config/axios'
import Toast from "vue-toastification"; //https://github.com/Maronato/vue-toastification?tab=readme-ov-file#installation
import "vue-toastification/dist/index.css";
// import { useToast } from 'vue-toastification'
// import { TYPE } from "vue-toastification";
// const toast = useToast()
const appName = import.meta.env.VITE_APP_NAME || 'AdonisJS'
  createInertiaApp({
  progress: { color: '#5468FF' },
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => {
    return resolvePageComponent(
      `../pages/${name}.vue`,
      import.meta.glob<DefineComponent>('../pages/**/*.vue'),
    )
  },
  setup({ el, App, props, plugin }) {
    createApp({ render: () => h(App, props) })
      .use(plugin)
      .use(axios , {baseUrl : "http://localhost:3333"})
      .use(Toast)
      .component('Link', Link)
      .component('MessageError', MessageError)
      .mount(el)
  },
})

var loading = document.getElementById('loading');

// var  loadingToast  = toast.info("Chargement ...");;
router.on('start', () => {
  // loadingToast = toast.info("Chargement ...");
  loading.classList.remove("d-none");
  console.log("start ...");
})
// router.on('error', (errors) => {
//   console.log(errors);
// })
router.on('finish', (event) => {
   if (event.detail.visit.completed) {
    console.log("completed ...");
    loading.classList.add("d-none");
    // toast.update(loadingToast, { content: "Completed !"  });
    // toast.update(loadingToast, { content: "Completed !" , options: { timeout: 5000 , type : "success" } });
  } else if (event.detail.visit.interrupted) {
    console.log("interrupted ...");
    loading.classList.add("d-none");
    // toast.update(loadingToast, { content: "Interrupted ..." });
  } else if (event.detail.visit.cancelled) {
    console.log("cancelled ...");
    loading.classList.add("d-none");
    // toast.update(loadingToast, { content: "Cancelled ..." });
  }
//   setTimeout(() => {
//     toast.dismiss(loadingToast);
//   }, 1000);
 
})
