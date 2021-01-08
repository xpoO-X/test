import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', name: 'login',component: resolve => require(['@/page/login'], resolve),},
    {path: '/Home', name: 'Home',component: resolve => require(['@/page/Home'], resolve),},
    {path: '/Me', name: 'Me', component: resolve => require(['@/page/Me'], resolve),},
    {path: '/putaway', name: 'putaway', component: resolve => require(['@/page/putaway'], resolve),},
    {path: '/Lsku', name: 'Lsku', component: resolve => require(['@/page/Lsku'], resolve),},
    {path: '/edit', name: 'edit', component: resolve => require(['@/page/edit'], resolve),},
    {path: '/power', name: 'power', component: resolve => require(['@/page/power'], resolve),},
    {path: '/report', name: 'report', component: resolve => require(['@/page/report'], resolve),},
    {path: '/extension', name: 'extension', component: resolve => require(['@/page/extension'], resolve),},
    {path: '/perfect', name: 'perfect', component: resolve => require(['@/page/perfect'], resolve),},
    {path: '/lawyer', name: 'lawyer', component: resolve => require(['@/page/lawyer'], resolve),},
    {path: '/newest', name: 'newest', component: resolve => require(['@/page/newest'], resolve),},
    {path: '/centre', name: 'centre', component: resolve => require(['@/page/centre'], resolve),},
    {path: '/collect', name: 'collect', component: resolve => require(['@/page/collect'], resolve),},
    {path: '/azdetails', name: 'azdetails', component: resolve => require(['@/page/azdetails'], resolve),},
    {path: '/azdetailH', name: 'azdetailH', component: resolve => require(['@/page/azdetailH'], resolve),},
    {path: '/download', name: 'download', component: resolve => require(['@/page/download'], resolve),},
    {path: '/myCase', name: 'myCase', component: resolve => require(['@/page/myCase'], resolve),},
    {path: '/more', name: 'more', component: resolve => require(['@/page/more'], resolve),},
    {path: '/myMark', name: 'myMark', component: resolve => require(['@/page/myMark'], resolve),},
    {path: '/search', name: 'search', component: resolve => require(['@/page/search'], resolve),},
    {path: '/moreSearch', name: 'moreSearch', component: resolve => require(['@/page/moreSearch'], resolve),},
    {path: '/myCaseSearch', name: 'myCaseSearch', component: resolve => require(['@/page/myCaseSearch'], resolve),},
    {path: '/CaseSearch', name: 'CaseSearch', component: resolve => require(['@/page/CaseSearch'], resolve),},
    {path: '/LsKuSearch', name: 'LsKuSearch', component: resolve => require(['@/page/LsKuSearch'], resolve),},
    {path: '/speed', name: 'speed', component: resolve => require(['@/page/speed'], resolve),},
    {path: '/speedEdit', name: 'speedEdit', component: resolve => require(['@/page/speedEdit'], resolve),},
    {path: '/kong', name: 'kong', component: resolve => require(['@/page/kong'], resolve),},
    {path: '/company', name: 'company', component: resolve => require(['@/page/company'], resolve),},
    {path: '/ranking', name: 'ranking', component: resolve => require(['@/page/ranking'], resolve),},
    {path: '/empower', name: 'empower', component: resolve => require(['@/page/empower'], resolve),},
    {path: '/newsCore', name: 'newsCore', component: resolve => require(['@/page/newsCore'], resolve),},
    {path: '/newsdetails', name: 'newsdetails', component: resolve => require(['@/page/newsdetails'], resolve),},
    {path: '/matters', name: 'matters', component: resolve => require(['@/page/matters'], resolve),},
    {path: '/matterB', name: 'matterB', component: resolve => require(['@/page/matterB'], resolve),},
    {path: '/downloadS', name: 'downloadS', component: resolve => require(['@/page/downloadS'], resolve),},
  ]
})
