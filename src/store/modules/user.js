import Vue from 'vue'

const state = {
    userInfo: {
        username: '阎王爷',
        password: '996',
        age: '114514',
        isLogin: sessionStorage.getItem("isLogin") || false
    },
    userData: [
        { id: 1, name: "海门", title: '铁磨地狱', humanNumber: 90, painValue: 5, Supplies: 8 },
        { id: 2, name: "鄂尔多斯", title: '孤独地狱', humanNumber: 102, painValue: 15, Supplies: 16 },
        { id: 3, name: "齐齐哈尔", title: '畜生地狱', humanNumber: 140, painValue: 30, Supplies: 20 },
        { id: 4, name: "上海", title: '畜生地狱', humanNumber: 140, painValue: 30, Supplies: 20 },
        { id: 5, name: "广州", title: '铁磨地狱', humanNumber: 140, painValue: 30, Supplies: 20 },
        { id: 6, name: "杭州", title: '孤独地狱', humanNumber: 140, painValue: 30, Supplies: 20 },
        { id: 7, name: "深圳", title: '畜生地狱', humanNumber: 140, painValue: 30, Supplies: 20 },
        { id: 8, name: "成都", title: '铁磨地狱', humanNumber: 140, painValue: 30, Supplies: 20 }
    ],
    geoCoordMap: {
        海门: [121.15, 31.89],
        鄂尔多斯: [109.781327, 39.608266],
        齐齐哈尔: [123.97, 47.33],
        上海: [121.4648, 31.2891],
        '广州': [113.5107, 23.2196],
        '杭州': [119.5313, 29.8773],
        '深圳': [114.5435, 22.5439],
        '成都': [103.9526, 30.7617],
    },
    deathBook: [{
        id: '魂字1350号',
        username: '孙悟空',
        age: '342岁',
        category: '天产石猴',
        wayDeath: '善终',
        type: 'longevity',
        isDel: false
    }, {
        id: '魂字1351号',
        username: '秦始皇',
        age: '66岁',
        category: '天生皇帝',
        wayDeath: '作死',
        type: 'lonelyGhost',
        isDel: false
    }, {
        id: '魂字1352号',
        username: '诸葛亮',
        age: '68岁',
        category: '天才',
        wayDeath: '天天加班',
        type: 'reincarnation',
        isDel: false
    }, {
        id: '魂字1353号',
        username: '刘备',
        age: '54岁',
        category: '普通人',
        wayDeath: '阳寿耗尽',
        type: 'longevity',
        isDel: false
    }],
    ecstasyList: [{
        id: '皇字第1号',
        username: '李世民',
        ecstasy: '牛头、马面',
        ecstasyTime: '贞观十年三月',
        type: 'one',
        chargeback: '阳寿未尽，抓错人了',
    },
    {
        id: '皇字第2号',
        username: '李世民',
        ecstasy: '牛头、马面',
        ecstasyTime: '贞观十年三月',
        type: 'two',
        chargeback: '阳寿未尽，抓错人了',
    }, {
        id: '皇字第3号',
        username: '李世民',
        ecstasy: '牛头、马面',
        ecstasyTime: '贞观十年三月',
        type: 'three',
        chargeback: '阳寿未尽，抓错人了',
    }, {
        id: '皇字第4号',
        username: '李世民',
        ecstasy: '牛头、马面',
        ecstasyTime: '贞观十年三月',
        type: 'four',
        chargeback: '阳寿未尽，抓错人了',
    }]
}

const mutations = {
    setIsLogin(state, flag) {
        state.userInfo.isLogin = flag
    },
    setDeathBookType(state, option) {
        let index = state.deathBook.findIndex(item => {
            return item.id === option.obj.id
        })
        if (index !== -1) {
            Vue.set(state.deathBook[index], 'isDel', option.flag)
        }
    },
    setEcstasyLisType(state, option) {
        let index = state.ecstasyList.findIndex(item => {
            return item.id === option.obj.id
        })
        if (index !== -1) {
            Vue.set(state.ecstasyList[index], 'type', option.type)
        }
    },
    setEcstasyList(state, obj) {
        let index = state.ecstasyList.findIndex(item => {
            return item.id === obj.id
        })
        if (index !== -1) {
            Vue.set(state.ecstasyList, index, obj)
        }
    },
    setDeathBook(state, obj) {
        let index = state.deathBook.findIndex(item => {
            return item.id === obj.id
        })
        if (index !== -1) {
            Vue.set(state.deathBook, index, obj)
        }
    },
}

const getters = {
    convertData(state) {
        return val => {
            let data = val || state.userData
            var res = []
            for (var i = 0; i < data.length; i++) {
                var geoCoord = state.geoCoordMap[data[i].name]
                if (geoCoord) {
                    res.push({
                        name: data[i].name,
                        value: geoCoord.concat(data[i].humanNumber),
                        num: geoCoord.concat(data[i].painValue),
                        id: geoCoord.concat(data[i].id)
                    })
                }
            }
            return res
        }
    }
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
