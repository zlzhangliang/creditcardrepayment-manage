<template>
  <n-card :bordered="false" class="proCard">
    <!-- <BasicForm @register="register" @submit="handleSubmit" @reset="handleReset">
      <template #statusSlot="{ model, field }">
        <n-input v-model:value="model[field]" />
      </template>
    </BasicForm> -->

    <BasicTable
      title="订单列表"
      titleTooltip="订单列表"
      :columns="columns"
      :request="loadDataTable"
      :row-key="(row) => row.id"
      ref="actionRef"
      :bordered="true"
      :single-line="false"
      :actionColumn="actionColumn"
      @update:checked-row-keys="onCheckedRow"
      :scroll-x="1090"
    >
      <!-- <template #tableTitle>
        <n-button type="primary" @click="addTable">
          <template #icon>
            <n-icon>
              <PlusOutlined />
            </n-icon>
          </template>
          新建
        </n-button>
      </template> -->

      <template #toolbar>
        <n-button type="primary" @click="reloadTable">刷新数据</n-button>
      </template>
    </BasicTable>

    <n-modal v-model:show="showModal" :show-icon="false" preset="dialog" title="新建">
      <n-form
        :model="deliverGoods"
        :rules="rules"
        ref="formRef"
        label-placement="left"
        :label-width="80"
        class="py-4"
      >
        <n-form-item label="机具编号" path="sn_no">
          <n-input placeholder="请输入机具编号" v-model:value="deliverGoods.sn_no" />
        </n-form-item>
        <n-form-item label="快递单号" path="address">
          <n-input placeholder="请输入快递单号" v-model:value="deliverGoods.delivery_no" />
        </n-form-item>
        <n-form-item label="pos机品牌" path="brand">
          <n-select
            v-model:value="deliverGoods.brand"
            placeholder="请选择pos机品牌"
            :options="brandList"
          />
        </n-form-item>
      </n-form>

      <template #action>
        <n-space>
          <n-button @click="() => (showModal = false)">取消</n-button>
          <n-button type="info" :loading="formBtnLoading" @click="confirmForm">确定</n-button>
        </n-space>
      </template>
    </n-modal>
  </n-card>
</template>

<script lang="ts" setup>
  import { h, reactive, ref } from 'vue';
  import { useMessage, useDialog } from 'naive-ui';
  import { BasicTable, TableAction } from '@/components/Table';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { getCollarPosIndex, addCollarPosShip, CollarPosSignStatus } from '@/api/order/list';
  import { columns } from './columns';
  import { PlusOutlined } from '@vicons/antd';
  import { useRouter } from 'vue-router';
  import { ResultEnum } from '@/enums/httpEnum';
  interface DeliverGoods {
    id: string; // 订单id
    brand: string; // pos机品牌
    sn_no: string; // 机具编号
    delivery_no: string; // 快递单号
  }
  const rules = {
    delivery_no: {
      required: true,
      trigger: ['blur', 'input'],
      message: '请输入快递单号',
    },
    sn_no: {
      required: true,
      trigger: ['blur', 'input'],
      message: '请输入机具编号',
    },
    brand: {
      required: true,
      trigger: ['blur', 'change'],
      message: '请选择pos机品牌',
    },
  };

  const router = useRouter();
  const formRef: any = ref(null);
  const message = useMessage();
  const dialog = useDialog();
  const actionRef = ref();

  const showModal = ref(false);
  const formBtnLoading = ref(false);
  const deliverGoods: DeliverGoods = reactive({
    id: '', // 订单id
    brand: '', // pos机品牌
    sn_no: '', // 机具编号
    delivery_no: '', // 快递单号
  });
  const brandList = ['海科', '陆pos', '付临门', '汇付天下'].map((v) => ({
    label: v,
    value: v,
  }));

  const actionColumn = reactive({
    width: 220,
    title: '操作',
    key: 'action',
    fixed: 'right',
    align: 'center',
    render(record: any) {
      return h(TableAction as any, {
        style: 'button',
        actions: [
          {
            label: '发货',
            icon: 'ic:outline-delete-outline',
            onClick: handleDeliverGoods.bind(null, record),
            // 根据业务控制是否显示 isShow 和 auth 是并且关系
            ifShow: record.delivery_no == '' ? true : false,
            // 根据权限控制是否显示: 有权限，会显示，支持多个
            // auth: ['basic_list'],
          },
        ],
        dropDownActions: [
          {
            label: '签收',
            key: 'SignFor',
            // 根据业务控制是否显示: 非enable状态的不显示启用按钮
            ifShow: () => {
              return record.status == '2' ? true : false;
            },
          },
          {
            label: '拒收',
            key: 'Rejection',
            ifShow: () => {
              return record.status == '2' ? true : false;
            },
          },
          {
            label: '无效订单',
            key: 'InvalidOrder',
            ifShow: record.status == '1' ? true : false,
          },
        ],
        select: (key) => {
          if (key === 'SignFor') {
            handleSignFor(record);
          } else if (key === 'Rejection') {
            handleRejection(record);
          } else if (key === 'InvalidOrder') {
            handleInvalidOrder(record);
          }
        },
      });
    },
  });
  /**
   * @description: 已发货签收 确认框
   * @author: の_smile.
   * @name: handleSignFor
   * @test: test font
   * @msg: 订单id 状态 3签收 4拒收
   * @param {id,status}
   * @return {*}
   */
  function handleSignFor(record) {
    dialog.success({
      title: '签收',
      content: '请确认您的快递是否已被签收',
      positiveText: '确定',
      negativeText: '取消',
      maskClosable: true,
      onPositiveClick: () => {
        const data = {
          id: record.id,
          status: 3,
        };
        CollarPosSignStatusApi(data);
      },
    });
  }
  /**
   * @description: 已发货拒收 确认框
   * @author: の_smile.
   * @name: handleRejection
   * @test: test font
   * @msg: 订单id 状态 4拒收
   * @param {id,status}
   * @return {*}
   */
  function handleRejection(record) {
    dialog.warning({
      title: '拒收',
      content: '请确认您的快递是否已被拒收',
      positiveText: '确定',
      negativeText: '取消',
      maskClosable: true,
      onPositiveClick: () => {
        const data = {
          id: record.id,
          status: 4,
        };
        CollarPosSignStatusApi(data);
      },
    });
  }
  /**
   * @description: 无效订单 确认框
   * @author: の_smile.
   * @name: handleInvalidOrder
   * @test: test font
   * @msg: 订单id 状态 5无效订单
   * @param {id,status}
   * @return {*}
   */
  function handleInvalidOrder(record) {
    dialog.warning({
      title: '无效订单',
      content: '此操作将客户设为无效订单，请谨慎操作',
      positiveText: '确定',
      negativeText: '取消',
      maskClosable: true,
      onPositiveClick: () => {
        const data = {
          id: record.id,
          status: 5,
        };
        CollarPosSignStatusApi(data);
      },
    });
  }
  /**
   * @description: 订单签收状态以及是否为无效订单 接口
   * @author: の_smile.
   * @name: CollarPosSignStatusApi
   * @test: test font
   * @msg: 订单id 状态 3签收 4拒收 5无效订单
   * @param {id,status}
   * @return {*}
   */
  const CollarPosSignStatusApi = async (data: { id: any; status: number }) => {
    try {
      const { code, msg } = await CollarPosSignStatus(data);
      if (code == ResultEnum.SUCCESS) {
        message.success(msg);
        reloadTable();
      } else {
        message.info(msg);
      }
    } finally {
      formBtnLoading.value = false;
    }
  };
  const [register, {}] = useForm({
    gridProps: { cols: '1 s:1 m:2 l:3 xl:4 2xl:4' },
    labelWidth: 80,
    // schemas,
  });
  /**
   * @description: 获取订单列表渲染列表数据
   * @author: の_smile.
   * @name: loadDataTable
   * @test: test font
   * @msg: 描述
   * @param {*} res
   * @return {*}
   */
  const loadDataTable = async (res: any) => {
    return await getCollarPosIndex({ ...res });
  };

  function onCheckedRow(rowKeys: any) {
    console.log(rowKeys);
  }

  function reloadTable() {
    actionRef.value.reload();
  }
  /**
   * @description: 发货
   * @author: の_smile.
   * @name: confirmForm
   * @test: addCollarPosShip 发货接口
   * @msg: {订单id,pos机品牌,机具编号,快递单号}
   * @param "{id,brand, sn_no,delivery_no} edeliverGoods"
   * @return {*}
   */
  function confirmForm(e: { preventDefault: () => void }) {
    e.preventDefault();
    formBtnLoading.value = true;
    formRef.value.validate(async (errors: any) => {
      if (!errors) {
        try {
          const { code, msg } = await addCollarPosShip(deliverGoods);
          if (code == ResultEnum.SUCCESS) {
            showModal.value = false;
            message.success(msg);
            reloadTable();
          } else {
            message.info(msg || '发货失败');
          }
        } finally {
          formBtnLoading.value = false;
        }
      } else {
        message.error('请填写完整信息');
      }
      formBtnLoading.value = false;
    });
  }
  /**
   * @description: 点击发货弹出发货框
   * @author: の_smile.
   * @name: handleDeliverGoods
   * @test: test font
   * @msg: 描述
   * @param {*}
   * @return {*}
   */
  function handleDeliverGoods(record: Recordable) {
    deliverGoods.id = record.id;
    showModal.value = true;
  }

  function handleSubmit(values: Recordable) {
    console.log(values);
    reloadTable();
  }

  function handleReset(values: Recordable) {
    console.log(values);
  }
</script>

<style lang="less" scoped>

</style>
