import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.timeout = 30000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
const cookie='access_token=5b7be7b98aeca5f7ba1e3399ca33a0e5';


/**
 * post方法，对应post请求
 * @param  url {String} [请求的url地址]
 * @param  data {Object}[请求时携带的参数]
 */
export function post(url, data) {
    document.cookie = cookie
    return new Promise((resolve, reject) => {
        axios.post(url, data)
            .then(res => {
                // console.log(res)
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}

/**
 * get方法，对应get请求
 * @param  url {String} [请求的url地址]
 * @param  data {Object}[请求时携带的参数]
 */
export function get(url, data) {
    // document.cookie = cookie
    return new Promise((resolve, reject) => {
        axios.get(url, data)
            .then(res => {
                // console.log(res)
                resolve(res.data);
            })
            .catch(err => {
                reject(err.data)
            })
    });
}
