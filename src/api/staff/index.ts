/*
 * @Descripttion: 详情
 * @Author: の_smile.
 * @version: 版本
 * @Date: 2022-04-21 11:22:56
 * @LastEditors: yang fu ren
 * @LastEditTime: 2022-04-21 17:03:22
 */
import { http } from '@/utils/http/axios';
export interface BasicResponseModel<T = any> {
  code: number;
  message: string;
  result: T;
}
export function AddStaff(params: any) {
  return http.request(
    {
      url: 'User/addUser',
      method: 'post',
      params,
    },
    {
      isTransformResponse: false,
    }
  );
}

export function getUserIndex(params) {
  return http.request<BasicResponseModel>(
    {
      url: 'User/index',
      method: 'POST',
      params,
    }
    
  );
}
