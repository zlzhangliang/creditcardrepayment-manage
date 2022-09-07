/*
 * @Descripttion: 详情
 * @Author: の_smile.
 * @version: 版本
 * @Date: 2022-04-20 16:21:32
 * @LastEditors: yang fu ren
 * @LastEditTime: 2022-04-20 16:22:41
 */
/*
 * @Descripttion: 详情
 * @Author: の_smile.
 * @version: 版本
 * @Date: 2022-04-20 16:21:32
 * @LastEditors: yang fu ren
 * @LastEditTime: 2022-04-20 16:21:32
 */
import { http } from '@/utils/http/axios';

/**
 * @description: 根据用户id获取用户菜单
 */
export function adminMenus() {
  return http.request({
    url: '/menus',
    method: 'GET',
  });
}

/**
 * 获取tree菜单列表
 * @param params
 */
export function getMenuList(params?) {
  return http.request({
    url: '/menu/list',
    method: 'GET',
    params,
  });
}
