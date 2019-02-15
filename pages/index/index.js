//index.js
//获取应用实例
let col1H=0;
let col2H=0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollH: 0,
    col1: [],
    col2: [],
    images:[],
    imgWidth:0,
    loadingCount:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    wx.getSystemInfo({
      success: function(res) {
        let ww = res.windowWidth
        let wh = res.windowHeight
        let imgWidth = ww * 0.48
        let scrollH = wh;
        that.setData({
          scrollH: scrollH,
          imgWidth: imgWidth
        })
        that.loadImages();
      }
    })
  },
  loadImages() {
    let images = [{
        pic: '/pages/images/1.jpg',
        height: 0
      },
      {
        pic: '/pages/images/2.jpg',
        height: 0
      },
      {
        pic: '/pages/images/3.jpg',
        height: 0
      },
      {
        pic: '/pages/images/4.jpg',
        height: 0
      },
      {
        pic: '/pages/images/5.jpg',
        height: 0
      },
      {
        pic: '/pages/images/6.jpg',
        height: 0
      },
      {
        pic: '/pages/images/7.jpg',
        height: 0
      },
      {
        pic: '/pages/images/8.jpg',
        height: 0
      },
      {
        pic: '/pages/images/9.jpg',
        height: 0
      },
      {
        pic: '/pages/images/10.jpg',
        height: 0
      },
      {
        pic: '/pages/images/11.jpg',
        height: 0
      },
      {
        pic: '/pages/images/12.jpg',
        height: 0
      }
    ]
    let baseId = "img-"+(+new Date());
    for(let i=0;i<images.length;i++){
      images[i].id = baseId+"-"+i;
    }
    this.setData({
      images:images,
      loadingCount:images.length
    })
  },
  onImageLoad(e){
    console.log(e)
    let imageId = e.currentTarget.id;
    let oImgH = e.detail.height;
    let oImgW = e.detail.width;
    let imgWidth = this.data.imgWidth;
    let scale = imgWidth/oImgW;
    let imgHeight = scale*oImgH;
    let images = this.data.images;
    let imageObj = null;
    for(let i = 0;i<images.length;i++){
      let img = images[i];
      if(img.id === imageId){
        imageObj = img;
        break;
      }
    }
    imageObj.height = imgHeight
    let loadingCount = this.data.loadingCount - 1
    let col1 = this.data.col1
    let col2 = this.data.col2
    if(col1H <= col2H){
      col1H += imgHeight
      col1.push(imageObj)
    }else{
      col2H += imgHeight;
      col2.push(imageObj)
    }
    let data = {
      loadingCount:loadingCount,
      col1:col1,
      col2:col2
    }
    if(!loadingCount){
      data.images=[]
    }
    this.setData(data)
  }
})