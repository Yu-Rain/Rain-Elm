/**
 * Created by rain on 2017/9/5.
 */
import RainElm from '@/rainElm';
import Msite from '@/pages/msite/msite';
import Discover from '@/pages/discover/discover';
import Order from '@/pages/order/order';
import Profile from '@/pages/profile/profile';


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