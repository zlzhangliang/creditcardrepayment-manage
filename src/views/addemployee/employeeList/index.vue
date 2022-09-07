<!--
 * @Descripttion: 详情
 * @Author: の_smile.
 * @version: 版本
 * @Date: 2022-04-21 10:30:09
 * @LastEditors: yang fu ren
 * @LastEditTime: 2022-04-21 17:06:32
-->

<template>
  <n-card :bordered="false" class="proCard">
    <!-- <BasicForm @register="register" @submit="handleSubmit" @reset="handleReset">
      <template #statusSlot="{ model, field }">
        <n-input v-model:value="model[field]" />
      </template>
    </BasicForm> -->

    <BasicTable
      title="员工列表"
      titleTooltip="员工列表"
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
      <template #tableTitle>
        <n-button type="primary" @click="addStaff">
          <template #icon>
            <n-icon>
              <PlusOutlined />
            </n-icon>
          </template>
          添加员工
        </n-button>
      </template>

      <template #toolbar>
        <n-button type="primary" @click="reloadTable">刷新数据</n-button>
      </template>
    </BasicTable>

    <n-modal v-model:show="showModal" :show-icon="false" preset="dialog" title="添加员工">
      <n-form
        :model="staffInfo"
        :rules="rules"
        ref="formRef"
        label-placement="left"
        :label-width="80"
        class="py-4"
      >
        <n-form-item label="员工姓名" path="name">
          <n-input placeholder="请输入员工姓名" v-model:value="staffInfo.name" />
        </n-form-item>
        <n-form-item label="员工手机号" path="tel">
          <n-input placeholder="请输入员工手机号" v-model:value="staffInfo.tel" />
        </n-form-item>
        <n-form-item label="密码" path="password">
         <n-input placeholder="请输入密码" v-model:value="staffInfo.password" />
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
  import { useMessage } from 'naive-ui';
  import { BasicTable, TableAction } from '@/components/Table';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { getUserIndex, AddStaff } from '@/api/staff';
  import { columns } from './columns';
  import { PlusOutlined } from '@vicons/antd';
  import { useRouter } from 'vue-router'
  import { ResultEnum } from '@/enums/httpEnum';
  /**
   * @description: 员工信息定义接口
   * @author: の_smile.
   * @name: StaffInfo
   * @test: test font
   * @msg: 姓名，手机号，密码
   * @param {name,tel,password}
   * @return {*}
   */
  interface StaffInfo {
    name: string;
    tel: string;
    password: string;
  }
  const rules = {
    name: {
      required: true,
      trigger: ['blur', 'input'],
      message: '请输入员工姓名',
    },
    tel: {
      required: true,
      trigger: ['blur', 'input'],
      message: '请输入员工手机号',
    },
    password: {
      required: true,
      trigger: ['blur', 'input'],
      message: '请输入密码',
    },
  };

  const router = useRouter();
  const formRef: any = ref(null);
  const message = useMessage();
  const actionRef = ref();

  const showModal = ref(false);
  const formBtnLoading = ref(false);

  const staffInfo: StaffInfo = reactive({
    name: '', // 员工姓名
    tel: '', // 员工手机号
    password: '', // 密码
  });

  const actionColumn = reactive({
    width: 220,
    title: '操作',
    key: 'action',
    fixed: 'right',
    align: 'center',
    render(record: any) {
      return h(TableAction as any,
        {
          style: 'button',
          actions: [
          //  {
          //     label: '发货',
          //     icon: 'ic:outline-delete-outline',
          //     onClick: handleDeliverGoods.bind(null, record),
          //     // 根据业务控制是否显示 isShow 和 auth 是并且关系
          //       ifShow: record.delivery_no == '' ? true : false,
          //     // 根据权限控制是否显示: 有权限，会显示，支持多个
          //     // auth: ['basic_list'],
          //   },
          ],
        },
       
      );
      
    },
  });
  const [register, {}] = useForm({
    gridProps: { cols: '1 s:1 m:2 l:3 xl:4 2xl:4' },
    labelWidth: 80,
    // schemas,
  });
  
  function addStaff() {
    showModal.value = true;
  }

  const loadDataTable = async (res: any) => {
    return await getUserIndex({ ...res });
  };

  function onCheckedRow(rowKeys: any) {
    console.log(rowKeys);
  }

  function reloadTable() {
    actionRef.value.reload();
  }
  
  function confirmForm(e: { preventDefault: () => void; }) {
    e.preventDefault();
    formBtnLoading.value = true;
    formRef.value.validate(async (errors: any) => {
      if (!errors) {
        try {
          const { code, msg } = await AddStaff(staffInfo);
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

  // function handleDeliverGoods(record: Recordable) {
  //   deliverGoods.id = record.id;
  //   showModal.value = true;
  // }

  function handleSubmit(values: Recordable) {
    console.log(values);
    reloadTable();
  }

  function handleReset(values: Recordable) {
    console.log(values);
  }
</script>

<style lang="less" scoped></style>
