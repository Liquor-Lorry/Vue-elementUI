import Cookie from "js-cookie";

export default {
  state: {
    isFold: false,
    menu: [],
    clickMenu: {},
    tabList: [
      {
        path: "/",
        label: "首页",
        name: "home",
        icon: "s-home"
      }
    ]
  },
  mutations: {
    //设置菜单
    setMenu(state, val) {
      state.menu = val;
      Cookie.set("menu", JSON.stringify(val));
      // console.log('成功')
    },
    //清除菜单
    clearMenu(state) {
      state.menu = [];
      Cookie.remove("menu");
    },
    //动态添加
    addMenu(state, router) {
      if (!Cookie.get("menu")) {
        return;
      }
      let menu = JSON.parse(Cookie.get("menu"));
      state.menu = menu;
      //定义一个要动态添加的数组
      let currentMenu = [
        {
          path: "/",
          component: () => import(`@/views/Main`),
          children: []
        }
      ];
      //console.log(menu)
      menu.forEach((item) => {
        if (item.children) {
          item.children = item.children.map((item) => {
            item.component = () => import(`@/views/${item.url}`);
            return item;
          });
          currentMenu[0].children.push(...item.children);
        } else {
          item.component = () => import(`@/views/${item.url}`);
          currentMenu[0].children.push(item);
        }
      });
      //console.log(currentMenu, 'cur')
      router.addRoutes(currentMenu);
    },
    //点击选中
    selectMenu(state, val) {
      if (val.name !== "home") {
        state.clickMenu = val;
        //数组去重
        let result = state.tabList.findIndex((item) => item.name === val.name);
        result === -1 ? state.tabList.push(val) : "";
      } else {
        state.clickMenu = null;
      }

      //val.name === 'home' ? (state.clickMenu = null) : (state.clickMenu = val)
    },
    //点击关闭一个标签
    closeTab(state, val) {
      let result = state.tabList.findIndex((item) => item.name === val.name);
      state.tabList.splice(result, 1);
    },
    //点击收缩展开
    foldMenu(state) {
      state.isFold = !state.isFold;
    }
  },
  actions: {}
};
