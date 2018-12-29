<template>
  <!-- author：sunnyLiu
  date: 2017-12-8-->
  <!--  该组件主要封装表格：其中包含操作和多选
        html上的引用如下：
       <jn-tablemanage 
          :tableData="userData" 
          :tableConfig="tableConfig" 
          :pagiData="pagiData"
          v-on:handleClick="handleClick"
          v-on:selectionChange="selectionChange"
          v-on:handlePageChange="pageChange" 
          v-on:handleSizeChange="handleSizeChange">
          </jn-tablemanage>
       配置项的传入如下
       ***table的配置项
        tableConfig: {
          ***操作项的宽度配置
          handleWidth
          ***ifSelected是否可多选 必传
          ifSelected:true,
          ***ifIndex是否可多选 必传
          ifIndex:true,
          ***ifHandle是否有操作项 必传
          ifHandle:true,
          ***ifPagination是否需要分页栏 必传
          ifPagination:true,
          ***titleData: 表头的值 prop：指当列在userData的key; label:指当列的表头的值；width:当列的宽 必传
          titleData:[ {
            prop: 'date',
            label: '日期',
            shortNum:"10" //字段如若过长截取10个字符显示，不传默认是截取10个字符
            width: '180'
          }, {
            prop: 'name',
            label: '姓名',
            width: '180',
          }, {
            prop: 'address',
            label: '地址',
          }],
          ***handleData: 有操作按钮的需要传入的值；当ifHandle为true时必传
          ***key：该按钮的代表值,用来区分点击了哪个按钮；
          ***btnName:该按钮的显示值；
          ***btnIcon:该按钮的icon的class
          handleData: [ {
            key: 'del',
            btnName: '删除',
            btnIcon: 'el-icon-delete',
          }, {
            key: 'modify',
            btnName: '编辑',
            btnIcon: 'el-icon-edit',
          }],
        },

        ***分页相关值得传入
        pagiData：{
            currentPage：1当前页
            pageSizes：[10,20,40] 可选的当页条数
            pageSize：10当页条数
            total：20总条数
        }
  -->
  <div>
    <el-table
      class="tableComponent"
      ref="table"
      stripe
      :data="tableData"
      :header-cell-style="headerCellStyle"
      tooltip-effect="dark"
      height="40rem"
      highlight-current-row
      @current-change="handleRowChange"
      @selection-change="selectionChange"
    >
      <el-table-column align="center" v-if="tableConfig.ifSelected" type="selection" width="60"></el-table-column>
      <el-table-column align="center" v-if="tableConfig.ifIndex" label="序号" type="index" width="60"></el-table-column>
      <el-table-column
        align="center"
        v-for="title in tableConfig.titleData"
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
                :content="tableData[scope.$index][title.prop]"
                v-else
              >
                <span
                  slot="reference"
                >{{tableData[scope.$index][title.prop]|strTruncation(title.shortNum||10)}}</span>
              </el-popover>
            </div>
            <div v-else>
              <el-popover ref="popover" placement="right" width="300" trigger="hover">
                <div>{{title.label}}:{{tableData[scope.$index][title.prop]}}</div>
                <div
                  width="150"
                  v-for="popoverData in title.data"
                  :key="popoverData.prop"
                >{{popoverData.label}}:{{tableData[scope.$index][popoverData.prop]}}</div>
                <span
                  slot="reference"
                >{{tableData[scope.$index][title.prop]|strTruncation(title.shortNum||10)}}</span>
              </el-popover>
            </div>
          </div>
        </template>
      </el-table-column>
      <!-- 带有操作图标得列 -->
      <el-table-column
        align="center"
        v-if="tableConfig.ifHasHandleData"
        v-for="handles in tableConfig.hashandleData"
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
        v-if="tableConfig.ifHandle"
        label="操作"
        :width="tableConfig.handleWidth"
      >
        <template slot-scope="scope">
          <el-button
            class="mr05"
            v-if="handle.btn&&tableConfig.handleData.length<3"
            v-for="handle in tableConfig.handleData"
            :key="handle.btnName"
            @click="handleClick(tableData[scope.$index], handle.key)"
            type="text"
            size="small"
          >{{handle.btnName}}</el-button>
          <el-popover ref="popoverHandle" placement="right" width="350" trigger="hover">
            <el-button
              class="mr05"
              v-for="handle in tableConfig.handleData"
              :key="handle.btnName"
              @click="handleClick(tableData[scope.$index], handle.key)"
              type="text"
              size="small"
            >{{handle.btnName}}</el-button>
            <el-button v-if="tableConfig.handleData.length>2" slot="reference">操作</el-button>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagi" v-if="!ifPage">
      <el-pagination
        background
        v-if="tableConfig.ifPagination"
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
    </div>
  </div>
</template>
<script>
export default {
  name: "jn-tablemanage",
  data() {
    return {};
  },
  props: ["tableData", "tableConfig", "pagiData", "ifPage", "shortNum"],
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