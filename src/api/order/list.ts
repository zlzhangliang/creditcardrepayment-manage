/*
 * @Descripttion: 详情
 * @Author: の_smile.
 * @version: 版本
 * @Date: 2022-04-15 17:05:28
 * @LastEditors: yang fu ren
 * @LastEditTime: 2022-04-21 14:45:03
 */
import { http } from '@/utils/http/axios';
export interface BasicResponseModel<T = any> {
  code: number;
  message: string;
  result: T;
}
export function getCollarPosIndex(params: any) {
  return http.request({
    url: 'CollarPos/index',
    method: 'post',
    params,
  });
}
// 发货
export function addCollarPosShip(params) {
  return http.request<BasicResponseModel>(
    {
      url: 'CollarPos/ship',
      method: 'POST',
      params,
    },
    {
      isTransformResponse: false,
    }
  );
}
// 拒收签收
export function CollarPosSignStatus(params) {
  return http.request<BasicResponseModel>(
    {
      url: 'CollarPos/signStatus',
      method: 'POST',
      params,
    },
    {
      isTransformResponse: false,
    }
  );
}
