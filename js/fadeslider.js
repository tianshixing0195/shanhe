
//项目中有哪些类：轮播图
function Slider(
				$box,height,imgs,left,
				doudouSize,doudouColor,doudouHighColor,
				isCircle,timeSpace){
	this.$box = $box;//轮播图的容器
	this.$imgs = null;//这是个jQuery对象，存储所有的img标签,
	this.$lis = null;//这是个jQuery对象,存储所有的li标签,
	this.width =$box.width();
	this.height = height;
	this.left = left;
	this.imgs = imgs;//图片数组
	this.doudouSize = doudouSize;
	this.doudouColor = doudouColor;
	this.doudouHighColor = doudouHighColor;//高亮颜色
	this.isCircle = isCircle;
	
	this.timeSpace = timeSpace;//每张图片直接的间隔,大于1000
	this.currOrd = 0;
	this.myTimer = null;
	
	
	this.createUI();

	this.changeImg();
    this.addEvent();
}

Slider.prototype.createUI= function(){
	this.$box.css({
		position:"relative",
		overflow:"hidden"
	});
	
	//1、创建所有的图片
	for(let i=0;i<this.imgs.length;i++){
		let $img = $("<img/>");
		$img.attr("src",this.imgs[i]);
		$img.css({
			"position":"absolute",
			// "backgroundImage":"url("+this.imgs[i]+")",
			// "background-position":"center",
			"top":"0px",
			width:this.width+"px",
			height:this.height+"px",
            "opacity":i==0?1:0,
			// "background-size":"cover"
		    
		});
		
		this.$box.append($img);
		//把创建的图片标签放入数组中
		if(this.$imgs==null){
			this.$imgs=$img;
		}else{
			this.$imgs = this.$imgs.add($img);
			//console.log(this.$imgs);
		}
	}
		//2、创建所有的豆豆
	//1)、豆豆的容器
	let $ul = $("<ul></ul>");
	$ul.css({
		position:"absolute",
	    left:this.left+"px",
		bottom:"10px",
		"list-style":"none",
		"z-index":20
	});
	this.$box.append($ul);
	
	//2)、豆豆
	for(let i=0;i<this.imgs.length;i++){
		let $li = $("<li></li>");
		$li.css({
			float:"left",
			"margin-left":"20px",
			"border":"1px solid white",
			width:this.doudouSize+"px",
			height:this.doudouSize+"px",
			backgroundColor:i==0?this.doudouHighColor:this.doudouColor,
			borderRadius:this.isCircle?"50%":0
		});

		$ul.append($li);
		this.$lis==null?this.$lis=$li:this.$lis=this.$lis.add($li);
	}

//  console.log(this.$lis);
}



Slider.prototype.showImg = function(inOrd,outOrd){
	
	if(inOrd==outOrd){
		return;
	}
	
	//1)、//图片淡入淡出前的准备工作；
	this.$imgs.eq(inOrd).css({"opacity":0});

	//2）、淡入淡出效果
	this.$imgs.eq(inOrd).animate({
		opacity:1
	},500);
	this.$imgs.eq(outOrd).animate({
		opacity:0
	},500);
}

Slider.prototype.showLi=function(){
	//    B、改豆豆		
	this.$lis.eq(this.currOrd)
	.css({
		"backgroundColor":this.doudouHighColor,
	})
	.siblings()
	.css({
		"backgroundColor":this.doudouColor,

	});
}

//1、自动播放图片
Slider.prototype.changeImg=function(){
	
	if (this.myTimer != null) {
		return;
	}
	this.myTimer = setInterval(()=>{
		//1）、数据：改变图片的当前序号（加加），并考虑边界
		//currOrd = ++currOrd>4?0:currOrd;
		let outOrd = this.currOrd;
		this.currOrd++;
		if(this.currOrd>this.imgs.length-1){
			this.currOrd=0;
		}
		
		//2）、外观：
		//A、改图片
		this.showImg(this.currOrd,outOrd);
		//B、改豆豆
		this.showLi();

	},this.timeSpace);
}

//2、停止播放
Slider.prototype.stopChange=function(){
	//停止定时器
	window.clearInterval(this.myTimer);
    this.myTimer = null;
}

//4、跳转到指定的图片
Slider.prototype.goImg=function(transOrd){

	//1）、数据：把transOrd赋给当前图片序号
    // console.log(transOrd);
	let outOrd = this.currOrd;
	this.currOrd = transOrd;
	
	//2）、外观：
	//A、改图片
	this.showImg(this.currOrd,outOrd);
	//B、改豆豆
	this.showLi();
}

Slider.prototype.addEvent = function(){	
	let obj = this;//this是Slider的对象
	
	this.$box.mouseenter(function(){
		obj.stopChange();
	});
	
	this.$box.mouseleave(function(){
		obj.changeImg();
	});
	

	this.$box.children("ul").children("li").on("mouseenter",function(){
        // console.log(this.$lis);
		obj.goImg($(this).index());
	});

}



//文字轮播
function textSlider() {

    let textArr = ["11月华为商城以旧换新活动方案", "华为第四期众测来袭，敬请期待!", "一分钱预定荣耀8X Max活动", "华为Mate20系列99元预定", "华为FlyPods无线耳机，新品上市"]
    let $aText = null;
    let Timer = null;
    let currOrd = 0;

    for (let i in textArr) {
        let $adom = $("<a href='#'>" + textArr[i] + "</a>");
        $("#textBox").append($adom);
        $aText == null ? $aText = $adom : $aText = $aText.add($adom);
    }
    $aText.eq(0).css("top", 0)

    changeText();

    //鼠标移上停止
    $("#textBox").on("mouseenter",function(){
        stopChange();
    });
    $("#textBox").mouseleave(function(){
        changeText();
    });


    //每隔一秒钟变换一次图片；
    function changeText() {
        if (Timer != null){
            return;
        }
        Timer = setInterval(function () {
            let outOrd = currOrd;
            currOrd++;
            if (currOrd > $aText.length - 1) {
                currOrd = 0;
            }
            //图片
            showText(currOrd, outOrd);
        }, 1500);

    }

    // 滑动切换
    function showText(inOrd, outOrd) {

        //1)、滑入滑出前的准备工作
        $aText.eq(inOrd).css({"top": "53px"});

        //2）、滑入滑出效果
        $aText.eq(inOrd).animate({
            top: 0
        }, 800);
        $aText.eq(outOrd).animate({
            top: "-53px"
        }, 800);
    }

    //停止换图
    function stopChange() {
        $("#textBox").mouseenter(function () {
            window.clearInterval(Timer);
            Timer = null;
        });
    }
}