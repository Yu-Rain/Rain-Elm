/**
 * Created by rain on 2017/9/5.
 */
import RainElm from '@/rainElm';

// 路由懒加载
const Msite = () => import(/*webpackChunkName: "msite"*/ 'pages/msite/msite');
const Discover = () => import(/*webpackChunkName: "discover"*/ 'pages/discover/discover');
const Order = () => import(/*webpackChunkName: "order"*/'pages/order/order');
const Profile = () => import(/*webpackChunkName: "profile"*/'pages/profile/profile');



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
      }
    ]
  }

]