# v-jntable

> a project for janan
> 主要封装了element的table用来满足项目的table的各种情况

## Build Setup

``` bash
# install dependencies
npm install v-jntable --save

```

```
vue项目中的引用
import vJntable from 'v-jntable'
Vue.use(vJntable)
```
```html
 <v-jntable
      :tableData="equipmentsData"
      :handle-width="300"
      :pagination="true"
      :check-select="true"
      :serial-number="true"
      :handle-btn="true"
      :icon-handle="false"
      :pagiData="pagiData"
      :title-configure="titleData"
      :handle-configure="handleData"
      v-on:handleClick="handleClick"
      v-on:selectionChange="selectionChange"
      v-on:handlePageChange="pageChange"
      v-on:handleSizeChange="handleSizeChange"
    ></v-jntable>
```
##参数说明

| 参数 | 说明 | 类型 |可选值 |默认值|
| ------ | ------ | ------ | ------ | ------ |
| tableData | table所展示的数据 | Array |-|-|
| pagiData | 分页的数据 | object[pagiData](#pagiData) |-|{}|
| handle-width | 操作项的宽度 | number |-|200|
| pagination | 是否有分页 | boolean |-|false|
| check-select | 是否有勾选 | boolean |-|false|
| serial-number | 是否有序列 | boolean |-|false|
| handle-btn | 是否有操作列 | boolean |-|false|
| title-configure| 表头的数据值 | Array |-|[]|
| handle-configure | 操作列的具体值 | Array |-|[]|
| icon-handle-configure | 带有图标的操作列的具体值 | Array |-|[]|

```
pagiData是object，对应的参数如下
```
##pagiData[#pagiData]

| 参数 | 说明 | 类型 |可选值 |默认值|
| ------ | ------ | ------ | ------ | ------ |
| currentPage | 当前所在页 | number |-|1|
| pageSizes | 当前页可选择的显示的个数集合 | Array |-|[10, 20, 30, 40]|
| pageSize | 当前页的个数 | number |-|10|
| total | 总个数 | number |-|0|

```
pagiSizes是可以选择的每页可以显示的数据条数
```
##事件

| 事件名 | 说明 | 参数 |
| ------ | ------ | ------ |
| selectionChange | 当前所在页 | - |
| handlePageChange | 当前所在页 | - |
| handleSizeChange | 当前所在页 | - |

```
事件无说明
```