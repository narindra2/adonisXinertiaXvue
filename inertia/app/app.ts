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
var container = document.getElementsByClassName('container');
// var  loadingToast  = toast.info("Chargement ...");;
router.on('start', () => {
  // loadingToast = toast.info("Chargement ...");
  container[0].style.opacity = "0.3";
  console.log("start ...");
})
// router.on('error', (errors) => {
//   console.log(errors);
// })
router.on('finish', (event) => {
   if (event.detail.visit.completed) {
    console.log("completed ...");
    // toast.update(loadingToast, { content: "Completed !"  });
    // toast.update(loadingToast, { content: "Completed !" , options: { timeout: 5000 , type : "success" } });
    container[0].style.opacity = "1";
  } else if (event.detail.visit.interrupted) {
    console.log("interrupted ...");
    container[0].style.opacity = "1";
    // toast.update(loadingToast, { content: "Interrupted ..." });
  } else if (event.detail.visit.cancelled) {
    console.log("cancelled ...");
    container[0].style.opacity = "1";
    // toast.update(loadingToast, { content: "Cancelled ..." });
  }
//   setTimeout(() => {
//     toast.dismiss(loadingToast);
//   }, 1000);
 
})
