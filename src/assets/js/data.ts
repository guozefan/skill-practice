const menus=[
  {id:'0',name:'/home/index',path:'/home/index',meta:{title: "首页",icon:'icon-shouye',},children:[]},
  {id:'1',name:'/three/index',path:'/three',meta:{title: "three",icon:'icon-a-3Dhuichang',},children:[
    {id:'11',name:'/three/practice',path:'/three/practice',meta:{title: "汽车展台",icon:'icon-jiaoche-moren'}},
    {id:'12',name:'/three/index',path:'/three/index',meta:{title: "three",icon:'icon-a-3Dhuichang'}},
    {id:'12',name:'/three/leader',path:'/three/leader',meta:{title: "练习",icon:'icon-a-3Dhuichang'}},
  ]},
  {id:'2',name:'/video/index',path:'/video',meta:{title: "视频",icon:'icon-shipin'},children:[]},
  {id:'3',name:'/table/index',path:'/table',meta:{title: "表格",icon:'icon-biaoge_o'},children:[]},
  {id:'4',name:'/editor/index',path:'/editor',meta:{title: "富文本",icon:'icon-fuwenben'},children:[]},
  {id:'5',name:'/fullscreen/index',path:'/fullscreen',meta:{title: "大屏",icon:'icon-shujudaping',},children:[
    {id:'51',name:'/fullscreen/adaptive',path:'/fullscreen/adaptive',meta:{title: "自适应",icon:'Adaptive'}},
  ]},
  {id:'6',name:'/iframe/index',path:'/iframe',meta:{title: "iframe",icon:'icon-iframe'},children:[]},
  {id:'7',name:'/map/index',path:'/map',meta:{title: "地图",icon:'icon-ditu'},children:[]},
  {id:'8',name:'/canvas/index',path:'/canvas',meta:{title: "canvas",icon:'icon-fun'},children:[
    {id:'81',name:'/canvas/camera',path:'/canvas/camera',meta:{title: "相机",icon:'icon-xiangji'}},
    {id:'82',name:'/canvas/index',path:'/canvas/index',meta:{title: "canvas",icon:'CameraFilled'}},
    {id:'83',name:'/canvas/pixi',path:'/canvas/pixi',meta:{title: "pixi",icon:'CameraFilled'}},
  ]},
  {id:'9',name:'/bMap/index',path:'/bMap',meta:{title: "百度地图",icon:'Film'},children:[]},
]

export {
  menus
}
