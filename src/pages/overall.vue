<template>
    <div class="filter-box">
        <div class="selected-condations clearfix">
            <div class="left-title">已选条件：</div>
            <div class="right-area">
                <p class="selected-item" v-if="selected_range_item!='不限'">{{selected_range_item}}
                    <span class="clear-selected" @click="clearRange">x</span>
                </p>
                <p class="selected-item" v-if="selected_area_item!='不限'">{{selected_area_item}}
                    <span class="clear-selected" @click="clearArea">x</span>
                </p>
            </div>
        </div>
        <div class="condations-box">
            <div class="major-range clearfix">
                <div class="left-title">专业层次：</div>
                <div class="right-area"></div>
            </div>
            <school-range :school-range-list="$store.state.school_range_obj"></school-range>
            <school-area :school-area-list="$store.state.school_area_obj"></school-area>
        </div>
        <h3 class="title-second">选考科目分析</h3>
        <div class="remind next">*科目比例：要求所选选考科目的专业总数/条件范围内专业总数。以专业为例：经济统计学专业历史所占比例为66.7%，意为选考历史，66.7%的经济统计学专业均可报考。</div>
            <tab-view class="tab_list" :title_="tab_title" :list_="tab_left_list"></tab-view>
            <tab-view class="tab_list" :title_="tab_title" :list_="tab_right_list"></tab-view>
        <div class="clearfix"></div>
    </div>
</template>
<script>
import school_range from '../components/school_range.vue';
import school_area from '../components/school_area.vue';
import tab_view from "../pages/table_view.vue";
export default {
    data: function() {
        return {}
    },
    computed: {
        "selected_range_item": function () {
            return this.$store.getters.selected_range;
        },
        "selected_area_item": function () {
            return this.$store.getters.selected_area;
        }
    },
    created: function() {
        var vm = this;
        this.$http.get('src/server/schoolRange.json').then(function(res) {
            let range_data = res.data.list.map((value, index) => {
                return index == 0 ? {
                    value: value,
                    selected: true
                } : {
                        value: value,
                        selected: false
                    }
            })
            vm.$store.commit('updata_school_range', range_data)
        })
        this.$http.get('src/server/schoolArea.json').then(function(res) {
            let range_data = res.data.list.map((value, index) => {
                return index == 0 ? {
                    value: value,
                    selected: true
                } : {
                        value: value,
                        selected: false
                    }
            })
            vm.$store.commit('updata_school_area', range_data)
        })
        this.$http.get("data/general.json").then(function(res) {
            vm.tab_title = res.data.result.title;
            var tab_list = res.data.result.analysisData;
            var left_arr = [];
            tab_list.forEach((value, index) => {
                if (index < tab_list.length / 2) {
                    left_arr[index] = value;
                }
            });
            vm.tab_left_list = left_arr;
            var right_arr = [];
            var s = 0;
            tab_list.forEach((value, index) => {
                if (index >= tab_list.length / 2) {
                    right_arr[s] = value;
                    s++;
                }
            });

            // 根据大学数据
            vm.tab_right_list = right_arr;
            vm.college_title = res.data.result.title;
            vm.college_detail = res.data.result.rows;

        })

    },
    methods: {
        clearRange: function() {
            this.$store.commit('clear_range')
        },
        clearArea: function() {
            this.$store.commit('clear_area')
        }
    },
    components: {
        "school-range": school_range,
        "school-area": school_area
    }
} 
</script>
<style>
.filter-box {
    width: 100%;
    margin: 10px auto;
    user-select: none;
}
.left-title,
.right-area {
    float: left;
    box-sizing: border-box;
}
.left-title {
    margin: 5px 0;
    text-indent: 10px;
    width: 10%;
}
.right-area {
    width: 90%;
}
.selected-item {
    margin: 0;
    padding: 0 5px;
    display: inline-block;
    border: 1px solid #ccc;
}
.clear-selected {
    cursor: pointer;
}
.selected-condations {
    padding-left: 10px;
    line-height: 35px;
}
.condations-box {
    border: 1px solid #ccc;
    padding: 10px;
    line-height: 35px;
}
.filter-item {
    display: inline-block;
    min-width: 70px;
    padding: 0 5px;
    height: 35px;
    color: #333;
    text-align: center;
    line-height: 35px;
    margin: 5px;
    cursor: pointer;
}
.filter-item.selected {
    background: rgba(0, 160, 92, 1);
    color: #fff;
}
</style>


