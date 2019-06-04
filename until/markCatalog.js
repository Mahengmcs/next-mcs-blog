

var defaultsOpts = {
    nodesList: ['h1','h2','h3','h4','h5','h6'],
    element: ''
}

/**
    * Merge two or more objects. Returns a new object.
    * @private
    * @param {Boolean}  deep     If true, do a deep (or recursive) merge [optional]
    * @param {Object}   objects  The objects to merge together
    * @returns {Object}          Merged values of defaults and options
    */
   const extend = function ()  {

    let extended = {};
    let deep = false;
    let i = 0;
    let length = arguments.length;

    /* Check if a deep merge */
    if (Object.prototype.toString.call(arguments[0]) === "[object Boolean]") {
        deep = arguments[0];
        i++;
    }

    /* Merge the object into the extended object */
    let merge = function (obj) {
        for (let prop in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                /* If deep merge and property is an object, merge properties */
                if (deep && Object.prototype.toString.call(obj[prop]) === "[object Object]") {
                    extended[prop] = extend(true, extended[prop], obj[prop]);
                } else {
                    extended[prop] = obj[prop];
                }
            }
        }
    };

    /* Loop through each object and conduct a merge */
    for (; i < length; i++) {
        let obj = arguments[i];
        merge(obj);
    }

    return extended;
};




function MarkCatalog(element,opts) {
    this.settings = extend(defaultsOpts, opts || {});
    this.str = '<p class="catalogue">目录</p>'
    this.element = element
    this.nodeArr = document.getElementsByClassName(element)[0].querySelectorAll(this.settings.nodesList); //查找目录节点
    this.copyArr = []
    this.titleList =  document.getElementById('markCatalog').getElementsByClassName('title') //文章内所有的标题集合

    this.init()
    
}
MarkCatalog.prototype = {
    init: function() {
        this.getNodelist()
        document.getElementById('markCatalog').innerHTML = this.createHtml(this.getJsonTree(this.copyArr, null))
        this.setActive()
        this.winScroll()
        this.click()
    },
    getNodelist: function() {//根据父子关系组装成tree
       
        this.nodeArr.forEach((item,index)=>{
            this.copyArr.push({
                'title': item.innerHTML,
                'nodeName': item.nodeName,
                'id': index,
            })
        })
        this.copyArr.forEach((item,index) => {
            for(let i = index; i >= 0; i--) {
                if(i == 0) {
                    item.level = 1
                }else{
                    if(this.copyArr[i-1].nodeName.slice(1) < item.nodeName.slice(1)) {
                        item.parentId = this.copyArr[i-1].id
                        item.level = this.copyArr[i-1].level + 1
                        break
                    }else {
                        item.level = 1
                    }
                }
                
            }
        })
    },
    getJsonTree: function(data, parentId) {//递归获取目录节点树
        var itemArr = [];
        for (var i = 0; i < data.length; i++) {
            var node = data[i];
            if (node.parentId == parentId) {
                node.child = this.getJsonTree(data, node.id);
                itemArr.push(node);
            }
        }
        return itemArr;
    },
    createHtml: function(data) { //tree生成dom
        for (var i = 0; i < data.length; i++) {
            var urlstr = "";
            // urlstr = "<div class='box   b" + data[i]['level'] + "><span class='title   d" + data[i]['level'] + "'>" + data[i]["title"] + "</span><ul>";
            urlstr = "<div class='box'><span class='title   d" + data[i]['level'] + "'>" + data[i]["title"] + "</span><ul>";
            this.str += urlstr;
            if (data[i]["child"] != null) {
                this.createHtml(data[i]["child"]);
            }
            this.str += "</ul></div>"
        }
        return this.str;
    },
    setActive: function() { //给页面到达的标题加上active类
        var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        if(scrollTop == 0) {
            this.titleList[0].classList.add('active')
        }
    },
    click: function() {//目录点击
        var that = this
        for(var i = 0; i < that.titleList.length; i++) {
            that.titleList[i].index = i; //给每个li定义一个属性索引值
            that.titleList[i].onclick = function() {//循环绑定点击事件
                for(var j = 0; j < that.titleList.length; j++) {//先清除所有active类
                    that.titleList[j].classList.remove('active')
                }
                that.titleList[this.index].classList.add('active') //当前点击节点加上active类
                var top = that.nodeArr[this.index].offsetTop
                document.documentElement.scrollTop = top//对应文章内容滚动到相应的高度
                document.body.scrollTop = top
            }
        }
    },
    winScroll: function() { //页面滚动
        var that = this
        var parentheight = document.getElementsByClassName(this.element)[0].offsetTop //文档距离可视区域顶部高
        window.onscroll = function() {
            //为了保证兼容性，这里取两个值，哪个有值取哪一个
            //scrollTop就是触发滚轮事件时滚轮的高度
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop; //滚动的距离
            that.nodeArr.forEach((ele,index)=>{
                if( ele.offsetTop + parentheight - scrollTop <= (parentheight + 30)) { //节点距离顶部高度小于一定数值的时候加上active类
                    for(var i = 0; i < that.titleList.length; i++) {
                        that.titleList[i].classList.remove('active')
                        that.titleList[index].classList.add('active')
                    }
                }
            })
          }
    }
}

export {MarkCatalog}