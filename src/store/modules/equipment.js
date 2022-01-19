import Vue from 'vue'

const state = {
    equipmentList: [{
        equipmentName: '刀山001',
        equipmentState: 1, //0 - 1
        operator: "小鬼鬼",
        workTime: 35,
        imgSrc: 'u1034.png',
        workRecord: [{
            content: '996,加油打工人',
            timestamp: '2020-15-14'
        }, {
            content: '997,虚空的牢洞法',
            timestamp: '2020-14-14'
        }, {
            content: '996中,加班使帼家致富',
            timestamp: '2020-13-14'
        }]
    },
    {
        equipmentName: '油锅001',
        equipmentState: 0, //0 - 1
        operator: "小鬼桂",
        workTime: 35,
        imgSrc: 'u1069.png',
        workRecord: [{
            content: '996,加油打工人',
            timestamp: '2020-15-14'
        }, {
            content: '997,虚空的牢洞法',
            timestamp: '2020-14-14'
        }, {
            content: '996中,加班使帼家致富',
            timestamp: '2020-13-14'
        }]
    },]
}

const mutations = {
    setEquipmentList(state, option) {
        Vue.set(state.equipmentList[option.index], 'equipmentState', option.value)
    }
}

const getters = {

}

const actions = {

}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}