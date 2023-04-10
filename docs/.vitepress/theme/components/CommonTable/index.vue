<script setup lang="ts">
withDefaults(
  defineProps<{
    columns?: any;
    dataSource: any;
  }>(),
  {
    columns: [
      {
        key: 'Property',
        title: 'Property',
        dataIndex: 'parameter'
      },
      {
        title: 'Description',
        dataIndex: 'description'
      },
      {
        key: 'Type',
        title: 'Type',
        dataIndex: 'type'
      },
      {
        title: 'Default',
        dataIndex: 'default'
      }
    ]
  }
);
</script>
<template>
  <a-table
    :dataSource="dataSource"
    :columns="columns"
    :pagination="false"
    bordered
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'Property'">
        <span class="Property"> {{ record.parameter }}</span>
      </template>
      <template v-if="column.key === 'Type'">
        <span class="Type"> {{ record.type }}</span>
      </template>
    </template>
  </a-table>
</template>

<style scoped lang="scss">
.Property {
  font-weight: bold;
  color: var(--vp-c-text-1);
}
.Type {
  color: var(--vp-c-green);
}
:deep(.ant-table) {
  background-color: var(--vp-c-bg-soft-up);
  color: var(--vp-c-text-1);
  table {
    display: table;
  }
  .ant-table-thead {
    & > tr {
      & > th {
        background-color: var(--vp-c-bg-soft);
        color: var(--vp-c-text-2);
        font-weight: bold;
      }
    }
  }
  .ant-table-tbody {
    & > tr {
      &.ant-table-row {
        &:hover {
          & > td {
            background-color: var(--vp-c-bg-soft);
          }
        }
      }
      & > td {
        &.ant-table-cell-row-hover {
          background-color: var(--vp-c-bg-soft);
        }
      }
    }
  }
  &.ant-table-bordered {
    & > .ant-table-container {
      border-left: 1px solid var(--vp-c-border);
      & > .ant-table-content {
        & > table {
          border-top: 1px solid var(--vp-c-border);
          & > thead {
            & > tr {
              & > th {
                border: none;
                border-right: 1px solid var(--vp-c-border);
                border-bottom: 1px solid var(--vp-c-border);
              }
            }
          }
          & > tbody {
            & > tr {
              & > td {
                border: none;
                border-right: 1px solid var(--vp-c-border);
                border-bottom: 1px solid var(--vp-c-border);
              }
            }
          }
        }
      }
    }
  }
}
</style>
