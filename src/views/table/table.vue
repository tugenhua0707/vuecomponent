
<template>
  <div style="width:800px; margin: 0 auto;">
    <h3>基础表格</h3>
    <tb-table :columns="columns1" :data="data1"></tb-table>
    <div style="margin-top:20px;"></div>
    <h3>带斑马纹的表格</h3>
    <tb-table :columns="columns1" :data="data1" stripe></tb-table>

    <div style="margin-top:20px;"></div>
    <h3>带边框的表格</h3>
    <tb-table :columns="columns1" :data="data1" border></tb-table>

    <div style="margin-top:20px;"></div>
    <h3>固定表头</h3>
    <tb-table :columns="columns1" :data="data2" fixedhead border></tb-table>

    <div style="margin-top:20px;"></div>
    <h3>固定最左列--横向内容过多时，可选择固定列</h3>
    <tb-table :columns="columns2" :data="data3" border :fixedcol="fixedcol"></tb-table>

    <div style="margin-top:20px;"></div>
    <h3>固定最右列--横向内容过多时，可选择固定列</h3>
    <tb-table :columns="columns5" :data="data5" border :fixedcol="fixedcol2"></tb-table>

    <div style="margin-top:20px;"></div>
    <h3>左右列固定--横向内容过多时，可选择固定列</h3>
    <tb-table :columns="columns2" :data="data3" border :fixedcol="fixedcol3"></tb-table>

    <div style="margin-top:20px;"></div>
    <h3>固定列和表头--横纵向内容过多时，可选择固定列和表头</h3>
    <tb-table :columns="columns2" :data="data4" border fixedhead :fixedcol="fixedcol3" :tableheight="250"></tb-table>

    <div style="margin-top:20px;"></div>
    <h3>单选</h3>
    <tb-table :columns="columns1" :data="data2" border singleTable @single-click="rowclick"></tb-table>

    <div style="margin-top:20px;"></div>
    <h3>多选</h3>
    <tb-table :columns="columns3" :data="data2" border multipleTable @multipe-click="multipeClick"></tb-table>

    <div style="margin-top:20px;"></div>
    <h3>多选-左列固定--横向内容过多时，可选择固定列</h3>
    <tb-table :columns="columns4" :data="data3" :fixedcol="fixedcol" border multipleTable @multipe-click="multipeClick"></tb-table>

    <div style="margin-top:20px;"></div>
    <h3>多选-右列固定--横向内容过多时，可选择固定列</h3>
    <tb-table :columns="columns4" :data="data3" :fixedcol="fixedcol2" border multipleTable @multipe-click="multipeClick"></tb-table>

    <div style="margin-top:20px;"></div>
    <h3>多选-左右列固定--横向内容过多时，可选择固定列</h3>
    <tb-table :columns="columns4" :data="data3" :fixedcol="fixedcol3" border multipleTable @multipe-click="multipeClick"></tb-table>

  </div>
</template>

<script>
  export default {
    data () {
      return {
        columns1: [
          {
            title: '日期',
            key: 'date',
            width: '200',
            height: '40'
          },
          {
            title: '姓名',
            key: 'name',
            width: '200',
            height: '40'
          },
          {
            title: '地址',
            key: 'address',
            width: '400',
            height: '40'
          }
        ],
        columns2: [
          {
            title: '日期',
            key: 'date',
            width: '150',
            height: '40'
          },
          {
            title: '姓名',
            key: 'name',
            width: '120',
            height: '40'
          },
          {
            title: '省份',
            key: 'prov',
            width: '120',
            height: '40'
          },
          {
            title: '市区',
            key: 'city',
            width: '120',
            height: '40'
          },
          {
            title: '地址',
            key: 'address',
            width: '300',
            height: '40'
          },
          {
            title: '邮编',
            key: 'code',
            width: '120',
            height: '40'
          },
          {
            title: '操作',
            key: 'opera',
            width: '100',
            height: '40'
          }
        ],
        columns3: [
          {
            title: '选择',
            width: 60,
            height: 40,
            type: 'checkbox'
          },
          {
            title: '日期',
            key: 'date',
            width: 200,
            height: '40'
          },
          {
            title: '姓名',
            key: 'name',
            width: 200,
            height: '40'
          },
          {
            title: '地址',
            key: 'address',
            width: 340,
            height: '40'
          }
        ],
        columns4: [
          {
            title: '选择',
            width: '60',
            height: '40',
            type: 'checkbox'
          },
          {
            title: '日期',
            key: 'date',
            width: '150',
            height: '40'
          },
          {
            title: '姓名',
            key: 'name',
            width: '120',
            height: '40'
          },
          {
            title: '省份',
            key: 'prov',
            width: '120',
            height: '40'
          },
          {
            title: '市区',
            key: 'city',
            width: '120',
            height: '40'
          },
          {
            title: '地址',
            key: 'address',
            width: '240',
            height: '40'
          },
          {
            title: '邮编',
            key: 'code',
            width: '120',
            height: '40'
          },
          {
            title: '操作',
            key: 'opera',
            width: '100',
            height: '40'
          }
        ],
        data1: [
          {
            date: '2017-05-01',
            name: '空智1',
            address: '华星时代A座22楼华星时代A座22楼华星时代A座22楼华星时代A座22楼华星时代A座22楼华星时代A座22楼'
          },
          {
            date: '2017-05-02',
            name: '空智2',
            address: '华星时代A座22楼华星时代A座22楼华星时代A座22楼华星时代A座22楼华星时代A座22楼华星时代A座22楼华星时代A座22楼华星时代A座22楼'
          },
          {
            date: '2017-05-03',
            name: '空智3',
            address: '华星时代A座22楼华星时代A座22楼华星时代A座22楼华星时代A座22楼华星时代A座22楼华星时代A座22楼华星时代A座22楼华星时代A座22楼'
          }
        ],
        data2: [
          {
            date: '2017-05-01',
            name: '空智1',
            address: '华星时代A座22楼华星时代A座22楼华星时代A座22楼华星时代A座22楼华星时代A座22楼华星时代A座22楼'
          },
          {
            date: '2017-05-02',
            name: '空智2',
            address: '华星时代A座22楼华星时代A座22楼华星时代A座22楼华星时代A座22楼华星时代A座22楼华星时代A座22楼华星时代A座22楼'
          },
          {
            date: '2017-05-03',
            name: '空智3',
            address: '华星时代A座22楼华星时代A座22楼华星时代A座22楼华星时代A座22楼华星时代A座22楼华星时代A座22楼华星时代A座22楼华星时代A座22楼'
          },
          {
            date: '2017-05-01',
            name: '空智1',
            address: '华星时代A座22楼'
          },
          {
            date: '2017-05-02',
            name: '空智2',
            address: '华星时代A座22楼'
          },
          {
            date: '2017-05-03',
            name: '空智3',
            address: '华星时代A座22楼'
          },
          {
            date: '2017-05-01',
            name: '空智1',
            address: '华星时代A座22楼华星时代A座22楼华星时代A座22楼华星时代A座22楼华星时代A座22楼华星时代A座22楼'
          },
          {
            date: '2017-05-02',
            name: '空智2',
            address: '华星时代A座22楼华星时代A座22楼华星时代A座22楼华星时代A座22楼华星时代A座22楼华星时代A座22楼华星时代A座22楼'
          },
          {
            date: '2017-05-03',
            name: '空智3',
            address: '华星时代A座22楼'
          }
        ],
        data3: [
          {
            date: '2017-05-01',
            name: '空智1',
            prov: '浙江省',
            city: '杭州市',
            address: '华星时代A座22楼',
            code: '330222',
            opera: '<span class="tb-button">查看</span><span class="tb-button">编辑</span>'
          },
          {
            date: '2017-05-02',
            name: '空智1',
            prov: '浙江省',
            city: '杭州市',
            address: '华星时代A座22楼华星时代A座22楼华星时代A座22楼华星时代A座22楼华星时代A座22楼华星时代A座22楼',
            code: '330222',
            opera: '<span class="tb-button">查看</span><span class="tb-button">编辑</span>'
          },
          {
            date: '2017-05-03',
            name: '空智1',
            prov: '浙江省',
            city: '杭州市',
            address: '华星时代A座22楼华星时代A座22楼华星时代A座22楼华星时代A座22楼华星时代A座22楼华星时代A座22楼华星时代A座22楼',
            code: '330222',
            opera: '<span class="tb-button">查看</span><span class="tb-button">编辑</span>'
          },
          {
            date: '2017-05-04',
            name: '空智1',
            prov: '浙江省',
            city: '杭州市',
            address: '华星时代A座22楼',
            code: '330222',
            opera: '<span class="tb-button">查看</span><span class="tb-button">编辑</span>'
          },
        ],
        data4: [
          {
            date: '2017-05-01',
            name: '空智1',
            prov: '浙江省',
            city: '杭州市',
            address: '华星时代A座22楼华星时代A座22楼华星时代A座22楼华星时代A座22楼华星时代A座22楼华星时代A座22楼华星时代A座22楼',
            code: '330222',
            opera: '<span class="tb-button">查看</span><span class="tb-button">编辑</span>'
          },
          {
            date: '2017-05-02',
            name: '空智1',
            prov: '浙江省',
            city: '杭州市',
            address: '华星时代A座22楼',
            code: '330222',
            opera: '<span class="tb-button">查看</span><span class="tb-button">编辑</span>'
          },
          {
            date: '2017-05-03',
            name: '空智1',
            prov: '浙江省',
            city: '杭州市',
            address: '华星时代A座22楼华星时代A座22楼华星时代A座22楼华星时代A座22楼华星时代A座22楼华星时代A座22楼华星时代A座22楼',
            code: '330222',
            opera: '<span class="tb-button">查看</span><span class="tb-button">编辑</span>'
          },
          {
            date: '2017-05-04',
            name: '空智1',
            prov: '浙江省',
            city: '杭州市',
            address: '华星时代A座22楼',
            code: '330222',
            opera: '<span class="tb-button">查看</span><span class="tb-button">编辑</span>'
          },
          {
            date: '2017-05-01',
            name: '空智1',
            prov: '浙江省',
            city: '杭州市',
            address: '华星时代A座22楼华星时代A座22楼华星时代A座22楼华星时代A座22楼华星时代A座22楼华星时代A座22楼华星时代A座22楼',
            code: '330222',
            opera: '<span class="tb-button">查看</span><span class="tb-button">编辑</span>'
          },
          {
            date: '2017-05-02',
            name: '空智1',
            prov: '浙江省',
            city: '杭州市',
            address: '华星时代A座22楼',
            code: '330222',
            opera: '<span class="tb-button">查看</span><span class="tb-button">编辑</span>'
          },
          {
            date: '2017-05-03',
            name: '空智1',
            prov: '浙江省',
            city: '杭州市',
            address: '华星时代A座22楼',
            code: '330222',
            opera: '<span class="tb-button">查看</span><span class="tb-button">编辑</span>'
          },
          {
            date: '2017-05-04',
            name: '空智1',
            prov: '浙江省',
            city: '杭州市',
            address: '华星时代A座22楼',
            code: '330222',
            opera: '<span class="tb-button">查看</span><span class="tb-button">编辑</span>'
          }
        ],
        data5: [
          {
            date: '2017-05-01',
            name: '空智1',
            prov: '浙江省',
            city: '杭州市',
            address: '华星时代A座22楼',
            code: '330222'
          },
          {
            date: '2017-05-02',
            name: '空智1',
            prov: '浙江省',
            city: '杭州市',
            address: '华星时代A座22楼华星时代A座22楼华星时代A座22楼华星时代A座22楼华星时代A座22楼华星时代A座22楼',
            code: '330222'
          },
          {
            date: '2017-05-03',
            name: '空智1',
            prov: '浙江省',
            city: '杭州市',
            address: '华星时代A座22楼华星时代A座22楼华星时代A座22楼华星时代A座22楼华星时代A座22楼华星时代A座22楼华星时代A座22楼',
            code: '330222'
          },
          {
            date: '2017-05-04',
            name: '空智1',
            prov: '浙江省',
            city: '杭州市',
            address: '华星时代A座22楼',
            code: '330222'
          }
        ],
        columns5: [
          {
            title: '日期',
            key: 'date',
            width: '150',
            height: '40'
          },
          {
            title: '姓名',
            key: 'name',
            width: '120',
            height: '40'
          },
          {
            title: '省份',
            key: 'prov',
            width: '120',
            height: '40'
          },
          {
            title: '市区',
            key: 'city',
            width: '120',
            height: '40'
          },
          {
            title: '地址',
            key: 'address',
            width: '300',
            height: '40'
          },
          {
            title: '邮编',
            key: 'code',
            width: '120',
            height: '40'
          },
          {
            title: '操作',
            key: 'opera',
            width: '100',
            height: '40',
            render: function(h, params) {
              return h('div', [
                h('span', {
                  'class': {
                    'tb-button': true
                  },
                  on: {
                    click: () => {
                      console.log(params);
                    }
                  }
                }, '查看'),
                h('span', {
                  'class': {
                    'tb-button': true
                  },
                  on: {
                    click: () => {
                      console.log(params);
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        fixedcol: ['0'],
        fixedcol2: ['1'],
        fixedcol3: ['0', '1'],
        rowclick($this, data) {
          console.log(data);
        },
        multipeClick($this, datas) {
          console.log(datas);
        },
        methods: {
          handleClick() {
            console.log(111)
          }
        }
      }
    },
    methods: {
      
    }
  }
</script>