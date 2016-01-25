/***幻灯片***/

function addEventHandler(oTarget, sEventType, fnHandler) {

	if (oTarget.addEventListener) {

		oTarget.addEventListener(sEventType, fnHandler, false);

	} else if (oTarget.attachEvent) {

		oTarget.attachEvent("on" + sEventType, fnHandler);

	} else {

		oTarget["on" + sEventType] = fnHandler;

	}

};

function removeEventHandler(oTarget, sEventType, fnHandler) {

    if (oTarget.removeEventListener) {

        oTarget.removeEventListener(sEventType, fnHandler, false);

    } else if (oTarget.detachEvent) {

        oTarget.detachEvent("on" + sEventType, fnHandler);

    } else { 

        oTarget["on" + sEventType] = null;

    }

};

var focusHandler = {

	imgArray : [],

	urlArray : [],

	titleArray :[],

	lens :[],

	divObj:null,

	timerViews:0,

	_clientPlatform:'other',

	crrentId:1,

	initSystems : function (divName) {

		focusHandler.getSwfValues();

		var isSwfVal = focusHandler.checkClientPlatform();

		if (isSwfVal) {

			focusHandler.jsFocus(divName);

		} else {

			focusHandler.flashFocus(divName);

		}

	},

	getSwfValues : function () {

		var divSwfValues = focusHandler.$("swfUsefulObj");

        titles =divSwfValues.getElementsByTagName('p')['0'].innerHTML;

		imgs =divSwfValues.getElementsByTagName('p')['1'].innerHTML;

		urls  =focusHandler.verificationUrl(divSwfValues.getElementsByTagName('p')['2'].innerHTML);

	},	

             reBackUrl : function(valUrls) {

		if (valUrls.indexOf('http://') == -1 && valUrls.indexOf('https://') == -1) {

			return domianUrl + valUrls;

		} else {

			return valUrls;

		}

	},

	verificationUrl:function(values) {

		var tempArray = values.split('|');

		var tmpLens = tempArray.length;

		var tempStr = '';

		for (var i = 0; i < tmpLens; i++) {

			tempStr += focusHandler.reBackUrl(tempArray[i]);

			if (i != (tmpLens - 1)) {

				tempStr += '|';

			}

		}

		return tempStr;

	},

	filtrationLabel : function (values) {

		var tempArray = values.split('|');

		var tempLens = tempArray.length;

		var tStr = '';

		for (var i = 0; i < tempLens; i++) {

			tStr += focusHandler.getsetLabel(tempArray[i]);

			if (i != (tempLens - 1)) {

				tStr += '|';

			}

		}

		return tStr;

    },

	getsetLabel : function (values) {

		 if (values.indexOf('<') != -1){

			return values.replace(/<[^>]+>/g,"");//去掉所有的html标记

		 } else {

			return values;

		 }

	},

	jsFocus : function (divName) {

		focusHandler.imgArray = focusHandler.filtrationLabel(imgs).split('|');

		focusHandler.urlArray = focusHandler.filtrationLabel(urls).split('|');

		focusHandler.titleArray = titles.split('|');

		focusHandler.lens = focusHandler.imgArray.length;

		focusHandler.divObj = focusHandler.$(divName);

		focusHandler.divObj.style.position = 'relative';

		focusHandler.writePic(focusHandler.imgArray[0], focusHandler.urlArray[0]);

		focusHandler.writeFonts(focusHandler.titleArray[0], focusHandler.urlArray[0]);

		focusHandler.createBox();

	},

	writePic : function (picUrl, clickUrl) {

		var divListobj = focusHandler.divObj;

		var listShowObj = divListobj.getElementsByTagName('div')[0];

		listShowObj.innerHTML = '<a href="' + clickUrl +'" target="_blank"><img src="' + picUrl + '" border="0" width="' + pw + '" height="' + ph + '" /></a>';

	},

	writeFonts : function (titleStr, clickUrl) {

		var divListobj = focusHandler.divObj;

		var listShowObj = divListobj.getElementsByTagName('div')[1];

		var writeObjs = listShowObj.getElementsByTagName('div')[0];

		var writeObj = writeObjs.getElementsByTagName('div')[0];

		writeObj.innerHTML = '<a href="' + clickUrl +'" target="_blank">' + titleStr + '</a>';

	},

	createBox : function () {

		var divListobj = focusHandler.divObj;

		var listShowObj = divListobj.getElementsByTagName('div')[1];

		var writeObjs = listShowObj.getElementsByTagName('div')[0];

		var writeObj = writeObjs.getElementsByTagName('div')[1];

		for (var i=0; i < focusHandler.lens; i++) {

			var newNode = document.createElement("span");

			newNode.setAttribute("id", "sp"+i);

			writeObj.appendChild(newNode);

			newNode.innerHTML = i+1;

			addEventHandler(newNode, "click", focusHandler.stopTimerHandler);

		}

		focusHandler.$("sp0").className = "on";

		focusHandler.timerViews = window.setInterval("focusHandler.proxyFocusHandler()", Times);

	},

	stopTimerHandler : function (event) {

		var divObj = event.srcElement ? event.srcElement : event.target;

		for (var i=0; i < focusHandler.lens; i++) {

			if (focusHandler.$("sp" + i) == divObj) {

				focusHandler.$("sp" + i).className = "on";

				focusHandler.crrentId = i;

			} else {

				focusHandler.$("sp" + i).className = '';

			}

		}

		focusHandler.writePic(focusHandler.imgArray[focusHandler.crrentId], focusHandler.urlArray[focusHandler.crrentId]);

		focusHandler.writeFonts(focusHandler.titleArray[focusHandler.crrentId], focusHandler.urlArray[focusHandler.crrentId]);

	},

	proxyFocusHandler : function () {

		if (focusHandler.crrentId >= focusHandler.lens) {

			focusHandler.crrentId = 0;

		}

		for (var i=0; i < focusHandler.lens; i++) {

			if (focusHandler.crrentId == i) {

				focusHandler.$("sp" + focusHandler.crrentId).className = 'on';	

			} else {

				focusHandler.$("sp" + i).className = '';

			}

		}

		focusHandler.writePic(focusHandler.imgArray[focusHandler.crrentId], focusHandler.urlArray[focusHandler.crrentId]);

		focusHandler.writeFonts(focusHandler.titleArray[focusHandler.crrentId], focusHandler.urlArray[focusHandler.crrentId]);

		focusHandler.crrentId++;

	},

	$ : function (values) {

		return document.getElementById(values);

	},

	checkClientPlatform : function () {

		var pl = navigator.platform.toLowerCase();

		var ipad = pl.match(/ipad/);

		if (ipad) {

			focusHandler._clientPlatform = "ipad";

			return true;

		}	

		var iphone = pl.match(/iphone/);

		if (iphone) {

			focusHandler._clientPlatform = "iphone";

			return true;

		}

		var ipod = pl.match(/ipod/);

		if (ipod) {

			focusHandler._clientPlatform = "ipod";

			return true;

		}

		return false;

	},

	flashFocus : function (divName) {


		var flashSwf = new SWFObject("flash/focusv1.0.1.swf", "mymovie00214", pw, ph, "7", "");

			  flashSwf.addParam("allowFullScreen", "true");

			  flashSwf.addParam("allowScriptAccess", "always");

			  flashSwf.addParam("quality", "high");

			  flashSwf.addParam("wmode", "Transparent");

			  flashSwf.addVariable("pw", pw);

			  flashSwf.addVariable("ph", ph);

			  flashSwf.addVariable("Times", Times);

			  flashSwf.addVariable("sizes", sizes);

			  flashSwf.addVariable("isbold", isbold);

			  flashSwf.addVariable("umcolor", umcolor);

			  flashSwf.addVariable("bgnub", bgnub);

			  flashSwf.addVariable("btnbg", btnbg);

			  flashSwf.addVariable("hovercolor", hovercolor);

			  flashSwf.addVariable("txtcolor", txtcolor);

			  flashSwf.addVariable("txtLeft", txtLeft);

			  flashSwf.addVariable("nubtouming", nubtouming);

			  flashSwf.addVariable("hovertouming", hovertouming);

			  flashSwf.addVariable("rname", rname);

			  flashSwf.addVariable("rlink", rlink);

			  flashSwf.addVariable("urls", urls);

			  flashSwf.addVariable("titles", titles);

			  flashSwf.addVariable("imgs", imgs);

			  flashSwf.write(divName);

	}

}

/**滚动图片***/
var sid = function (id) {
	return "string" == typeof id ? document.getElementById(id) : id;
};

var Extend = function(destination, source) {
	for (var property in source) {
		destination[property] = source[property];
	}
	return destination;
}

var CurrentStyle = function(element){
	return element.currentStyle || document.defaultView.getComputedStyle(element, null);
}

var Bind = function(object, fun) {
	var args = Array.prototype.slice.call(arguments).slice(2);
	return function() {
		return fun.apply(object, args.concat(Array.prototype.slice.call(arguments)));
	}
}

var Tween = {
	Quart: {
		easeOut: function(t,b,c,d){
			return -c * ((t=t/d-1)*t*t*t - 1) + b;
		}
	},
	Back: {
		easeOut: function(t,b,c,d,s){
			if (s == undefined) s = 1.70158;
			return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
		}
	},
	Bounce: {
		easeOut: function(t,b,c,d){
			if ((t/=d) < (1/2.75)) {
				return c*(7.5625*t*t) + b;
			} else if (t < (2/2.75)) {
				return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
			} else if (t < (2.5/2.75)) {
				return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
			} else {
				return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
			}
		}
	}
}
//容器对象,滑动对象,切换数量
var SlideTrans = function(container, slider, count, options) {
	this._slider = sid(slider);
	this._container = sid(container);//容器对象
	this._timer = null;//定时器
	this._count = Math.abs(count);//切换数量
	this._target = 0;//目标值
	this._t = this._b = this._c = 0;//tween参数
	
	this.Index = 0;//当前索引
	
	this.SetOptions(options);
	
	this.Auto = !!this.options.Auto;
	this.Duration = Math.abs(this.options.Duration);
	this.Time = Math.abs(this.options.Time);
	this.Pause = Math.abs(this.options.Pause);
	this.Tween = this.options.Tween;
	this.onStart = this.options.onStart;
	this.onFinish = this.options.onFinish;
	
	var bVertical = !!this.options.Vertical;
	this._css = bVertical ? "top" : "left";//方向
	
	//样式设置
	var p = CurrentStyle(this._container).position;
	p == "relative" || p == "absolute" || (this._container.style.position = "relative");
	this._container.style.overflow = "hidden";
	this._slider.style.position = "absolute";
	
	this.Change = this.options.Change ? this.options.Change :
		this._slider[bVertical ? "offsetHeight" : "offsetWidth"] / this._count;
};
SlideTrans.prototype = {
  //设置默认属性
  SetOptions: function(options) {
	this.options = {//默认值
		Vertical:	true,//是否垂直方向（方向不能改）
		Auto:		true,//是否自动
		Change:		0,//改变量
		Duration:	50,//滑动持续时间
		Time:		10,//滑动延时
		Pause:		4000,//停顿时间(Auto为true时有效)
		onStart:	function(){},//开始转换时执行
		onFinish:	function(){},//完成转换时执行
		Tween:		Tween.Quart.easeOut//tween算子
	};
	Extend(this.options, options || {});
  },
  //开始切换
  Run: function(index) {
	//修正index
	index == undefined && (index = this.Index);
	index < 0 && (index = this._count - 1) || index >= this._count && (index = 0);
	//设置参数
	this._target = -Math.abs(this.Change) * (this.Index = index);
	this._t = 0;
	this._b = parseInt(CurrentStyle(this._slider)[this.options.Vertical ? "top" : "left"]);
	this._c = this._target - this._b;
	
	this.onStart();
	this.Move();
  },
  //移动
  Move: function() {
	clearTimeout(this._timer);
	//未到达目标继续移动否则进行下一次滑动
	if (this._c && this._t < this.Duration) {
		this.MoveTo(Math.round(this.Tween(this._t++, this._b, this._c, this.Duration)));
		this._timer = setTimeout(Bind(this, this.Move), this.Time);
	}else{
		this.MoveTo(this._target);
		this.Auto && (this._timer = setTimeout(Bind(this, this.Next), this.Pause));
	}
  },
  //移动到
  MoveTo: function(i) {
	this._slider.style[this._css] = i + "px";
  },
  //下一个
  Next: function() {
	this.Run(++this.Index);
  },
  //上一个
  Previous: function() {
	this.Run(--this.Index);
  },
  //停止
  Stop: function() {
	clearTimeout(this._timer); this.MoveTo(this._target);
  }
};
//网站导航
$(function () {
	var _dropBar = $('.drop-bar');
	_dropBar.bind('click',function(){
		_dropId = $(this).attr('id');
		_dropBarTit = $(this).find(".drop-bar-tit");
		_dropBarCon = $(this).find(".drop-bar-con");
		$(".drop-bar-tit").not(_dropBarTit).removeClass('active');
		$(".drop-bar-con").not(_dropBarCon).slideUp(100);
		_dropBarTit.toggleClass('active');
		_dropBarCon.slideToggle(100);
		$(document).bind('click',function(e){
			var e = e || window.event; //浏览器兼容性
			var elem = e.target || e.srcElement;
			while (elem) { //循环判断至根节点，防止点击的是div子元素
				if ( elem.id && elem.id == _dropId ) {
					return;
				}
				elem = elem.parentNode;
			}
			_dropBarTit.removeClass('active');
			_dropBarCon.slideUp(100);
		});
	});
})
