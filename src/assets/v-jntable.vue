<template>
  <div>
    <el-table
      class="tableComponent"
      :ref="tableRef"
      stripe
      :data="tableData"
      :header-cell-style="headerCellStyle"
      tooltip-effect="dark"
      :height="tableHeight"
      highlight-current-row
      @current-change="handleRowChange"
      @selection-change="selectionChange"
    >
      <el-table-column align="center" v-if="checkSelect" type="selection" width="60"></el-table-column>
      <el-table-column align="center" v-if="serialNumber" label="序号" type="index" width="60"></el-table-column>
      <el-table-column
        align="center"
        v-for="title in titleConfigure"
        :key="title.prop"
        :prop="title.prop"
        :label="title.label"
        :width="title.width"
      >
        <template slot-scope="scope">
          <!-- 是否是在线离线的状态判断 -->
          <div
            class="statusShaw"
            style="left: 44%;"
            v-if="title.ifOnline"
            :class="tableData[scope.$index][title.prop]+''==='0'?'jnStatusOnline':'jnStatusOffline'"
          ></div>
          <!-- 是否是进度条 -->
          <div
            style="left: 44%;"
            v-else-if="title.ifUpdownLoading&&tableData[scope.$index][title.prop]!==null"
          >
            <!-- 下载进行以及下载完成时的进度条 -->
            <el-progress
              v-if="tableData[scope.$index]['downloadStatus']!='2'"
              :text-inside="true"
              :stroke-width="18"
              :percentage="Number(tableData[scope.$index][title.prop])"
              :status="tableData[scope.$index][title.prop]=='100'?'success':'text'"
            ></el-progress>
            <!-- 下载失败 -->
            <el-popover
              ref="popover"
              v-else
              placement="right"
              width="150"
              trigger="hover"
              :content="tableData[scope.$index]['errcodeName']+''"
            >
              <el-progress
                :text-inside="true"
                :stroke-width="18"
                class="pointer"
                :percentage="Number(tableData[scope.$index][title.prop])"
                status="exception"
                slot="reference"
              ></el-progress>
            </el-popover>
          </div>

          <!-- <i class="el-jn-icon-yuandianda" ></i> -->
          <div v-else>
            <div v-if="!title.ifPopover">
              <span
                v-if="(!tableData[scope.$index][title.prop]||tableData[scope.$index][title.prop].length<=(title.shortNum||10))"
              >{{tableData[scope.$index][title.prop]}}</span>
              <el-popover
                ref="popover"
                placement="right"
                width="300"
                trigger="hover"
                :content="tableData[scope.$index][title.prop]+''"
                v-else
              >
                <span
                  slot="reference"
                  class="pointer"
                >{{tableData[scope.$index][title.prop]|strTruncation(title.shortNum||10)}}</span>
              </el-popover>
            </div>
            <div v-else>
              <el-popover ref="popover" placement="right" width="300" trigger="hover">
                <div>{{title.label}}:{{tableData[scope.$index][title.prop]}}</div>
                <div
                  width="150"
                  v-for="popoverData in title.popoverData"
                  :key="popoverData.prop"
                >{{popoverData.label}}:{{tableData[scope.$index][popoverData.prop]}}</div>
                <span
                  slot="reference"
                  class="pointer"
                >{{tableData[scope.$index][title.prop]|strTruncation(title.shortNum||10)}}</span>
              </el-popover>
            </div>
          </div>
        </template>
      </el-table-column>
      <!-- 带有操作图标得列 -->
      <el-table-column
        align="center"
        v-if="iconHandle"
        v-for="handles in iconHandleConfigure"
        :key="handles.prop"
        :label="handles.label"
        :width="handles.width"
      >
        <template slot-scope="scope">
          <el-button @click="handleClick(tableData[scope.$index], handles.prop)" type="text">
            <i :class="handles.btnIcon"></i>
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        fixed="right"
        v-if="handleBtn"
        label="操作"
        :width="handleWidth"
      >
        <template slot-scope="scope">
          <el-button
            class="mr05"
            v-if="handle.btn&&handleConfigure.length<3"
            v-for="handle in handleConfigure"
            :key="handle.btnName"
            @click="handleClick(tableData[scope.$index], handle.key)"
            type="text"
            size="small"
          >
            <i v-if="handle.btnIcon" :class="handle.btnIcon"></i>
            {{handle.btnName||''}}
          </el-button>
          <el-popover ref="popoverHandle" placement="right" width="350" trigger="hover">
            <el-button
              class="mr05"
              v-for="handle in handleConfigure"
              :key="handle.btnName"
              @click="handleClick(tableData[scope.$index], handle.key)"
              type="text"
              size="small"
            >
              <i v-if="handle.btnIcon" :class="handle.btnIcon"></i>
              {{handle.btnName||''}}
            </el-button>
            <el-button class="pointer" v-if="handleConfigure.length>=3" slot="reference">操作</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagi" v-if="pagination">
      <el-pagination
        v-if="paginationMM"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="pagiData.currentPage"
        :page-sizes="pagiData.pageSizes"
        :page-size="pagiData.pageSize"
        prev-text="上一页"
        next-text="下一页"
        layout="pager, ->, prev, next, jumper"
        :total="pagiData.total"
      ></el-pagination>
      <el-pagination
        v-else
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagiData.currentPage"
        :page-sizes="pagiData.pageSizes"
        :page-size="pagiData.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagiData.total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: "jn-tablemanage",
  data() {
    return {};
  },
  props: {
    tableData: {
      default: () => [],
      required: true
    },
    pagiData: {
      default: () => {
        if (!this.pagiData) this.pagiData = {};
        if (!this.pagiData.currentPage) this.pagiData.currentPage = 1;
        if (!this.pagiData.pageSizes)
          this.pagiData.pageSizes = [10, 20, 30, 40];
        if (!this.pagiData.pageSize) this.pagiData.pageSize = 10;
        if (!this.pagiData.total) this.pagiData.total = 0;
        return this.pagiData;
      }
    },
    handleWidth: {
      default: 200
    },
    tableHeight: {
      default: "40rem"
    },
    checkSelect: {
      default: false
    },
    serialNumber: {
      default: false
    },
    pagination: {
      default: false
    },
    handleBtn: {
      default: false
    },
    paginationMM: {
      default: false
    },
    tableRef: {
      default: "table"
    },
    titleConfigure: { default: () => [] },
    handleConfigure: { default: () => [] },
    iconHandleConfigure: { default: () => [] },
    iconHandle: {
      default: false
    }
  },
  methods: {
    // 当点操作按钮时 返回当前行的所有属性，以及按钮的key
    handleClick(data, key) {
      this.$emit("handleClick", data, key);
    },
    headerCellStyle: function(row, index) {
      return {
        "background-color": "#ebecf0"
      };
    },
    //当点有图标列得时候
    // handleSet(data, key) {
    //   this.$emit("handleClick", data, key);
    // },

    setCurrentRow(data) {
      this.$refs.table.setCurrentRow(data);
    },

    //当有选择按钮时返回的所有选中的行的属性
    selectionChange(val) {
      this.$emit("selectionChange", val);
    },

    handleRowChange(val) {
      this.$emit("handleRowChange", val);
    },

    //分页
    handleSizeChange(size) {
      this.$emit("handleSizeChange", size);
    },
    handleCurrentChange(val) {
      this.$emit("handlePageChange", val);
    }
  }
};
</script>
<style type="text/css">
.jnStatusOffline {
  background: rgba(208, 208, 208, 1);
}
.jnStatusOnline {
  animation: load 1.1s infinite ease;
  -webkit-animation: load 1.1s infinite ease;
}
.statusShaw {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
.pointer {
  cursor: pointer;
}
@-webkit-keyframes load {
  0%,
  100% {
    background: rgba(0, 255, 0, 1);
  }
  20%,
  80% {
    background: rgba(0, 255, 0, 0.8);
  }
  40%,
  60% {
    background: rgba(0, 255, 0, 0.5);
  }
  50% {
    background: rgba(0, 255, 0, 0.2);
  }
}
@keyframes load {
  0%,
  100% {
    background: rgba(0, 255, 0, 1);
  }
  20%,
  80% {
    background: rgba(0, 255, 0, 0.8);
  }
  40%,
  60% {
    background: rgba(0, 255, 0, 0.5);
  }
  50% {
    background: rgba(0, 255, 0, 0.2);
  }
}
</style>
