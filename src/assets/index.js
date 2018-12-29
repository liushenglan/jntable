// import Vue from "vue";
// import * as custom from "./filter.js";
// Object.keys(custom).forEach(key => {
//     Vue.filter(key, custom[key]);
// });
import VJntable from './v-jntable.vue'
import * as custom from "./filter.js";

VJntable.install = function (Vue) {
    Object.keys(custom).forEach(key => {
        Vue.filter(key, custom[key]);
    });
    Vue.component('VJntable', VJntable)
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VJntable)
}

export default VJntable
