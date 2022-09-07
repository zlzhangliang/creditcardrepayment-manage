/*
 * @Descripttion: 详情
 * @Author: の_smile.
 * @version: 版本
 * @Date: 2022-04-15 16:39:01
 * @LastEditors: yang fu ren
 * @LastEditTime: 2022-04-20 16:35:51
 */
import { RouteRecordRaw } from 'vue-router';
import { Layout } from '@/router/constant';
import { ProfileOutlined } from '@vicons/antd';
import { renderIcon } from '@/utils/index';

/**
 * @param name 路由名称, 必须设置,且不能重名
 * @param meta 路由元信息（路由附带扩展信息）
 * @param redirect 重定向地址, 访问这个路由时,自定进行重定向
 * @param meta.disabled 禁用整个菜单
 * @param meta.title 菜单名称
 * @param meta.icon 菜单图标
 * @param meta.keepAlive 缓存该路由
 * @param meta.sort 排序越小越排前
 *
 * */
const routes: Array<RouteRecordRaw> = [
  {
    path: '/order',
    name: 'Order',
    redirect: '/order/order-lists',
    component: Layout,
    meta: {
      title: '订单',
      icon: renderIcon(ProfileOutlined),
      sort: 1,
    },
    children: [
      {
        path: 'Order-lists',
        name: 'Order-lists',
        meta: {
          title: '订单列表',
        },
        component: () => import('@/views/order/orderlists/index.vue'),
      },
    ],
  },
];

export default routes;
