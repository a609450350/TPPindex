import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path:'/cinemasearch',
    name:'cinemasearch',
    component:()=>import('../components/Mapconponent'),
  },
  {
    path:'/pay/:uid/:sid',
    name:'pay',
    component:()=>import('../components/SelectSeat/Pay/Pay'),
  },
  {
    path:'/submitorder/:cid/:mid/:sid/:uid',
    name:'submitorder',
    component:()=>import('../components/SelectSeat/Pay/SubmitOrder'),
  },
      {
        path:'/Select/:cid/:mid/:sid',
        name:'select',
        component:()=>import('../components/SelectSeat/SelectSeat'),
      },
      {
        path:'/cinemas',
        name:'cinemas',
        component:()=>import('../views/MovieViews.vue'),
      },
      {
        path:'/video',
        name:'video',
        component:()=>import('../views/VideoViews.vue'),
      },

  // --------------------------------------------------------------------------------------
  {
    path: '/nc',
    name: 'nc',
    component: () => import('../components/Me/NinCheng'),
  },
  {
    path: '/grxx',
    name: 'grxx',
    component: () => import('../components/Me/grxx'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../components/Me/register'),
  },
  {
    path: '/logon',
    name: 'logon',
    component: () => import('../components/Me/logon'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/Me/Login1'),
  },
  {
    path: '/zx',
    name: 'zx',
    component: () => import('../components/Me/Zx'),
  },
  {
    path: '/xg',
    name: 'xg',
    component: () => import('../components/Me/Xg'),
  },
  {
    path: '/zhyaq',
    name: 'zhyaq',
    component: () => import('../components/Me/Zhyaq'),
  },
  {
    path: '/pf',
    name: 'pf',
    component: () => import('../components/Me/Pf'),
  },
  {
    path: '/kf',
    name: 'kf',
    component: () => import('../components/Me/AiComponents'),
  },
  {
    path: '/fk',
    name: 'fk',
    component: () => import('../components/Me/FK'),
  },
  {
    path: '/dyp',
    name: 'dyp',
    component: () => import('../components/Me/Dyp'),
  },
  {
    path: '/yhq',
    name: 'yhq',
    component: () => import('../components/Me/Yhq'),
  },
  {
    path: '/shezhi',
    name: 'shezhi',
    component: () => import('../components/Me/sheZhi'),
  },
      {
        path: '/xiangqing/:id',
        props:true,
        name: 'xiangqing',
        component: () => import('../components/yanchu/xiangqing.vue'),
      },
      {
        path: '/yanchu',
        props:true,
        name: 'yanchu',
        component: () => import('../views/yanchu.vue')
      },
      {
        path: '/me',
        name: 'me',
        component: () => import('../views/Me.vue')
      },
  {
    path: '/shopping/:name/:id',
    name: 'shopping',
    props:true,
    component: () => import('../components/Index/GouPiao'),
  },
  {
    path: '/shopmovie/:id',
    name: 'shopmovie',
    props:true,
    component: () => import('../components/Index/ShopMovie'),
  },
  {
    path: '/plun/:name/:mid',
    name: 'plun',
    props:true,
    component: () => import('../components/Index/PLun'),
  },
  {
    path: '/xiangqing1/:fid/:mid',
    name: 'xiangqing1',
    props:true,
    component: () => import('../components/Index/XiangQ'),
    children:[
      
    ]
  },
  {
    path: '/city',
    name: 'city',
    component: () => import('../components/Index/City'),
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../components/Index/SouSuo'),
  },
{
  path: '/index',
  name: 'index',
  component: () => import('../views/Index'),
},
{
  path:'/csearch',
  name:'cinemasearch',
  component:()=>import('../components/Movie/search/CinemaSearch.vue'),
},
{
  path: '/',
  redirect: '/index'
},
{
  path:'/nincheng',
  name:'nincheng',
  component:()=>import('../components/Me/NinCheng'),
},
{
  path:'/title',
  name:'title',
  component:()=>import('../components/Me/title'),
}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
