import Vue from 'vue';
import axios from 'axios';
// 默认配置项
// axios.defaults.baseURL = 'http://10.0.0.132.8888'   域名
// axios.defaults.timeout = 2000   超时调用（超过两秒还未成功的话就报错）
let query = {
    install: function (v) {
        v.prototype.$http = axios;
    }
};
Vue.use(query);
export default axios;