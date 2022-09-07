/*
 * @Descripttion: 详情
 * @Author: の_smile.
 * @version: 版本
 * @Date: 2022-04-15 17:03:40
 * @LastEditors: yang fu ren
 * @LastEditTime: 2022-04-24 15:32:16
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
    title: '员工姓名',
    key: 'name',
    width: 160,
    align: 'center',
    render(row, index) {
      return h('span', row.user.name);
    },
  },
  {
    title: '员工手机号',
    key: 'tel',
    width: 160,
    align: 'center',
    render(row, index) {
      return h('span', row.user.tel);
    },
  },
  {
    title: '订单编号',
    key: 'order_no',
    width: 150,
    align: 'center',
  },
  {
    title: '省',
    key: 'province',
    width: 80,
    align: 'center',
  },
  {
    title: '市',
    key: 'city',
    width: 80,
    align: 'center',
  },
  {
    title: '区',
    key: 'area',
    width: 80,
    align: 'center',
  },
  {
    title: '地址',
    key: 'address',
    width: 150,
    align: 'center',
  },
  {
    title: '机具品牌',
    key: 'brand',
    width: 100,
    align: 'center',
  },
  {
    title: '机具编号',
    key: 'sn_no',
    width: 100,
    align: 'center',
  },
  {
    title: '状态',
    key: 'status',
    width: 100,
    align: 'center',
    render(row) {
      const status = row.status;
      const tagsList = ['待申请', '已申请', '已发货', '已签收', '已拒收', '无效订单'];
      const seatusType = ['default', 'primary', '', 'success', 'warning', 'error'];
      return h(
        NTag,
        {
          style: {
            marginRight: '6px',
          },
          type: seatusType[status],
        },
        {
          default: () => tagsList[status],
        }
      );
    },
  },
  {
    title: '快递编号',
    key: 'delivery_no',
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
