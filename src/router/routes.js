/**
 * Created by rain on 2017/9/5.
 */
import RainElm from '@/rainElm';

// 路由懒加载
const Msite = () => import(/*webpackChunkName: "msite"*/ 'pages/msite/msite');
const Discover = () => import(/*webpackChunkName: "discover"*/ 'pages/discover/discover');
const Order = () => import(/*webpackChunkName: "order"*/'pages/order/order');
const Profile = () => import(/*webpackChunkName: "profile"*/'pages/profile/profile');
const Shop = () => import(/*webpackChunkName: "shop"*/'pages/shop/shop');
const Checkout = () => import(/*webpackChunkName: "checkout"*/'pages/checkout/checkout');
const Login = () => import(/*webpackChunkName: "login"*/'pages/login/login');



export default [
  {
    path: '/',
    component: RainElm,
    redirect: '/msite',
    children: [
      {
        path: '/msite',
        component: Msite,
      },
      {
        path: '/discover',
        component: Discover,
      },
      {
        path: '/order',
        component: Order
      },
      {
        path: '/profile',
        component: Profile
      },

      {
        path: '/shop',
        component: Shop
      },
      {
        path: '/checkout',
        component: Checkout,
      },
      {
        path: '/login',
        component: Login
      }


    ]
  }

]