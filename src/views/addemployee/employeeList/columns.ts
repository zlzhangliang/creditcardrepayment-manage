/*
 * @Descripttion: 详情
 * @Author: の_smile.
 * @version: 版本
 * @Date: 2022-04-21 10:34:56
 * @LastEditors: yang fu ren
 * @LastEditTime: 2022-04-21 17:02:29
 */
/*
 * @Descripttion: 详情
 * @Author: の_smile.
 * @version: 版本
 * @Date: 2022-04-15 17:03:40
 * @LastEditors: yang fu ren
 * @LastEditTime: 2022-04-20 18:46:10
 */
import { h } from 'vue';
import { NAvatar,NTag  } from 'naive-ui';

export const columns = [
  {
    title: 'id',
    key: 'id',
    width: 50,
    align: 'center',
  },
  {
    title: '名称',
    key: 'name',
    width: 100,
    align: 'center',
  },
 
 
  {
    title: '手机号',
    key: 'tel',
    width: 120,
    align: 'center',
  },
  
  {
    title: '开始日期',
    key: 'create_date',
    width: 160,
    align: 'center',
    render(row, index) {
      return h('span', row.created_at);
    },
  },
];
