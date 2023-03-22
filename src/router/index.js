import Vue from 'vue'
import VueRouter from 'vue-router'
import Nationwide from '../pages/Nationwide'
import Chungbuk from '../pages/Chungbuk'
import Chungnam from '../pages/Chungnam'
import Daejeon from '../pages/Daejeon'
import Daegu from '../pages/Daegu'
import Gangwon from '../pages/Gangwon'
import Gwangju from '../pages/Gwangju'
import Gyeongbuk from '../pages/Gyeongbuk'
import Gyeonggi from '../pages/Gyeonggi'
import Gyeongnam from '../pages/Gyeongnam'
import Incheon from '../pages/Incheon'
import Jeju from '../pages/Jeju'
import Jeonbuk from '../pages/Jeonbuk'
import Jeonnam from '../pages/Jeonnam'
import Sejong from '../pages/Sejong'
import Seoul from '../pages/Seoul'
import Ulsan from '../pages/Ulsan'
import Busan from '../pages/Busan'

Vue.use(VueRouter)
const routes = [
    {
        path: "/Chungcheongbuk-do",
        name: "Chungbuk",
        component: Chungbuk
    },
    {
        path: "/Chungcheongnam-do",
        name: "Chungnam",
        component: Chungnam
    },
    {
        path: "/Daejeon",
        name: "Daejeon",
        component: Daejeon
    },
    {
        path: "/Daegu",
        name: "Daegu",
        component: Daegu
    },
    {
        path: "/Gangwon-do",
        name: "Gangwon",
        component: Gangwon
    },
    {
        path: "/Gwangju",
        name: "Gwangju",
        component: Gwangju
    },
    {
        path: "/Gyeongsangbuk-do",
        name: "Gyeongbuk",
        component: Gyeongbuk
    },
    {
        path: "/Gyeonggi-do",
        name: "Gyeonggi",
        component: Gyeonggi
    },
    {
        path: "/Gyeongsangnam-do",
        name: "Gyeongnam",
        component: Gyeongnam
    },
    {
        path: "/Incheon",
        name: "Incheon",
        component: Incheon
    },
    {
        path: "/Jeju-do",
        name: "Jeju",
        component: Jeju
    },
    {
        path: "/Jeonbuk",
        name: "Jeonbuk",
        component: Jeonbuk
    },
    {
        path: "/Jellanam-do",
        name: "Jeonnam",
        component: Jeonnam
    },
    {
        path: "/Sejong-si",
        name: "Sejong",
        component: Sejong
    },
    {
        path: "/Seoul",
        name: "Seoul",
        component: Seoul
    },
    {
        path: "/Ulsan",
        name: "Ulsan",
        component: Ulsan
    },
    {
        path: "/Busan",
        name: "Busan",
        component: Busan
    },
    {
        path: "/",
        name: "Nationwide",
        component: Nationwide
    },

];

const router = new VueRouter({
    mode: "history",
    routes
});

export default router;