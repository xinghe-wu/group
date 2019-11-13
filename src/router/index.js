import Vue from 'vue'
import Router from 'vue-router'
import Syxidou from '../components/syxidou/index'
import SDG from '../components/sdg-detail/index'
import myWallet from '../components/my-wallet/index'
import Personal from '../components/personal/index'
import PersonalEdit from '../components/personal-edit/index'
import Author from '../components/author/index'
import Shopping from '../components/shopping/components/index/index'
import Search from '../components/shopping/components/search/index'
import createOrder from '../components/shopping/components/createOrder/index'
import order from '../components/shopping/components/order/index'
import Address from '../components/shopping/components/address/index'
import EditAddress from '../components/shopping/components/editaddress/index'
import Home from '../components/shopping/components/home/index'
import OrderDetail from '../components/shopping/components/orderdetail/index'
import SearchDetail from '../components/shopping/components/searchdetail/index'
import GoodsDetail from '../components/shopping/components/goods-detail/index'
import ShoppingCart from '../components/shopping/components/shopping-cart/index'
import PaySuccess from '../components/shopping/components/paysuccess/index'
import My from '../components/shopping/components/my/index'
import MobileLogin from '../components/shopping/components/mobile-login/index'
import OrderList from '../components/shopping/components/order-list/index'

Vue.use(Router)


export default new Router({

  routes: [

    {
      path: '/syxidou',
      name: 'syxidou',
      component: Syxidou,
      meta:{
        title:"同步喜豆"
      }
    },
    {
      path: '/mywallet',
      name: 'mywallet',
      component: myWallet,
      meta:{
        title:"我的钱包"
      }
    },
    {
      path: '/personal',
      name: 'Personal',
      component: Personal,
      meta:{
        title:"个人中心"
      }
    },
    {
      path: '/edit',
      name: 'PersonalEdit',
      component: PersonalEdit,
      meta:{
        title:"个人信息"
      }
    },

    {
      path: '/author',
      name: 'Author',
      component: Author,
    },
    {
      path: '/shopping',
      name: 'Shopping',
      component: Shopping,
      meta:{
        title:"商城"
      },

    },
    {
      path: '/goodsdetail',
      name: 'GoodsDetail',
      component: GoodsDetail,
      meta:{
        title:"商品详情"
      },

    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children:[
        {
          path: 'shoppingcart',
          name: 'ShoppingCart',
          component: ShoppingCart,
          meta:{
            title:"购物车"
          },

        },

        {
          path: '',
          component: Shopping,
          name:'home',
          meta:{
            title:"优选商城"
          },

        },

        {
          path:'my',
          name:'my',
          component:My,
          meta:{
            title:"我的"
          }
        }
      ]
    },

    {
      path: '/order',
      name: 'order',
      component: order,
      children:[
        {
          path: 'orderdetail',
          name: 'orderdetail',
          component: OrderDetail,
          meta:{
            title:"订单详情"
          },
        },
        {
          path: 'createorder',
          name: 'createorder',
          component: createOrder,
          meta:{
            title:"确认订单"
          },
        },
      ]
    },
    {
      path: '/address',
      name: 'address',
      component: Address,
      meta:{
        title:"收货地址"
      },

    },
    {
      path: '/editaddress',
      name: 'editaddress',
      component: EditAddress,
      meta:{
        title:"收货地址"
      },

    },
    {
      path: '/paysuccess',
      name: 'paysuccess',
      component: PaySuccess,
      meta:{
        title:"支付成功"
      },

    },
    {
      path:'/mobilelogin',
      name:'mobilelogin',
      component:MobileLogin,
      meta:{
        title:"手机登录"
      }
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
      meta:{
        title:"搜索"
      },
    },
    {
      path: '/searchdetail',
      name: 'searchdetail',
      component: SearchDetail,
      meta:{
        title:"搜索商品"
      },
    },
    {
      path: '/sdg',
      name: 'SDG',
      component: SDG,
      meta:{
        title:"商品详情"
      },
    },
    {
      path: '/orderlist',
      name: 'orderlist',
      component: OrderList,
      meta:{
        title:"我的订单"
      },
    },
  ]
})
