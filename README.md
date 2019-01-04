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
## 参数说明

| 参数 | 说明 | 类型 |可选值 |默认值|
| ------ | ------ | ------ | ------ | ------ |
| tableData | table所展示的数据 | Array |-|-|
| pagiData | 分页的数据 | object[pagiData](#pagiData) |-|{}|
| handle-width | 操作项的宽度 | number |-|200|
| pagination | 是否有分页 | boolean |-|false|
| check-select | 是否有勾选 | boolean |-|false|
| serial-number | 是否有序列 | boolean |-|false|
| handle-btn | 是否有操作列 | boolean |-|false|
| title-configure| 表头的数据值 | Array[title](#title) |-|[]|
| handle-configure | 操作列的具体值 | Array[handle](#handle) |-|[]|
| icon-handle-configure | 带有图标的操作列的具体值 | Array[icon](#icon) |-|[]|

```
pagiData是object，对应的参数如下
```

## <span id="pagiData">pagiData</span>

| 参数 | 说明 | 类型 |可选值 |默认值|
| ------ | ------ | ------ | ------ | ------ |
| currentPage | 当前所在页 | number |-|1|
| pageSizes | 当前页可选择的显示的个数集合 | Array |-|[10, 20, 30, 40]|
| pageSize | 当前页的个数 | number |-|10|
| total | 总个数 | number |-|0|

```
pagiSizes是可以选择的每页可以显示的数据条数
```

## <span id="title">title-configure</span>

| 参数 | 说明 | 类型 |可选值 |默认值|
| ------ | ------ | ------ | ------ | ------ |
| prop | 当前列得数据的key的名称 | string |-|-|
| label | 当前列表头的名称 | string|-|-|
| popoverData | 弹出框显示的内容。当ifPopover为true时，该字段必填 | Array[popoverData](#data) |-|10|
| shortNum | 最多显示文字的个数 | number |-|-|
| ifPopover | 是否需要弹出框 | boolean |-|-|
| width | 该列的宽度 | string |-|-|
| ifOnline | 当前列是否是在离线 | boolean |-|-|


```
popoverData是当ifPopover为true时必填
```
```javascript
{
      prop: "inTemp",
      label: "箱内温度",
      popoverData: [{ prop: "inTemp1", label: '箱内温度1' }, { prop: "inTemp2", label: '箱内温度2' }, { prop: "inTemp3", label: '箱内温度3' }],
      shortNum: "4",
      ifPopover: true,
      width: "69"
    }
```

## <span id="data">popoverData</span>

| 参数 | 说明 | 类型 |可选值 |默认值|
| ------ | ------ | ------ | ------ | ------ |
| prop | 弹出框显示得数据的key的名称 | string |-|-|
| label | 弹出框显示数据的名称 | string|-|-|

```javascript
{ prop: "inTemp1", label: '箱内温度1' }
```

## <span id="handle">handle-configure</span>

| 参数 | 说明 | 类型 |可选值 |默认值|
| ------ | ------ | ------ | ------ | ------ |
| key | 当前操作的key，该key自定义当点击操作后返回相同的key，用于识别点击的哪个操作按钮 | string |-|-|
| btnName | 当前操作的名称 | string|-|-|
| btn | 当前操作是否可显示 | boolean|-|-|

```javascript
{
      key: 'modify',
      btnName: '编辑',
      btn: true,
    }
```

## <span id="icon">icon-handle-configure</span>

| 参数 | 说明 | 类型 |可选值 |默认值|
| ------ | ------ | ------ | ------ | ------ |
| prop | 当前列得数据的key的名称 | string |-|-|
| label | 当前列表头的名称 | string|-|-|
| width | 该列的宽度 | string |-|-|
| btnIcon | icon的名称 | string|-|-|

```javascript
{
      prop: 'virtualLed',
      label: '虚拟站牌',
      width: '69',
      btnIcon: 'el-jn-icon-dianzizhanpai',
    }
```

## 事件

| 事件名 | 说明 | 参数 |
| ------ | ------ | ------ |
| selectionChange | 当前所在页 | - |
| handlePageChange | 当前所在页 | - |
| handleSizeChange | 当前所在页 | - |

```
事件无说明
```