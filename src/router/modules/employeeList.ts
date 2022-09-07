/*
 * @Descripttion: 详情
 * @Author: の_smile.
 * @version: 版本
 * @Date: 2022-04-21 10:30:59
 * @LastEditors: yang fu ren
 * @LastEditTime: 2022-04-21 10:33:27
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
	  path: '/addemployee',
	  name: 'Addemployee',
	  redirect: '/addemployee/employeeList',
	  component: Layout,
	  meta: {
		title: '员工设置',
		icon: renderIcon(ProfileOutlined),
		sort: 2,
	  },
	  children: [
		{
		  path: 'employeeList',
		  name: 'employeeList',
		  meta: {
			title: '员工列表',
		  },
		  component: () => import('@/views/addemployee/employeeList/index.vue'),
		},
	  ],
	},
  ];
  
  export default routes;