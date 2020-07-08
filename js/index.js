drag(document.getElementById("div2"), document.getElementById("div1"), document.getElementById("div3"));

function drag(obj, tobj, dobj) {
	
	//设置好方向
    let dir = null;
	//获取第一次点击的横坐标
    let firstX = null;
	//获取第一次点击的纵坐标
    let firstY = null;
	//获取到元素的宽度
    let width = null;
	//获取到元素的高度
    let height = null;
    let theight = null;
	//获取到距离左边的距离
    let left = null;
	//获取到距离上边的距离
    let top = null;
	let upPull = false;
	let downPull = false;
	let pendingY = 0;
	
	dobj.addEventListener("touchstart", function(e) {
		dragStart(e)
	});
	dobj.addEventListener("touchmove", function(e) {
		dragMove(e)
	});
	dobj.addEventListener("touchend", function(e) {
		dir = null;
		// dobj.style["display"] = "none"
	});
	obj.addEventListener("touchstart", function(e) {
		if(dobj.style["opacity"] === "0" || dobj.style["opacity"] === ""){
			dobj.style["opacity"] = "1"
		} else {
			dobj.style["opacity"] = "0"
		}
	});

	dragStart = function(e){
		e = e||event;
        firstX = e.touches[0].pageX;
		//获取第一次点击的纵坐标
        firstY = e.touches[0].pageY;
		//获取到元素的宽度
        width = obj.offsetWidth;
		//获取到元素的高度
        height = obj.offsetHeight;
		theight = tobj.offsetHeight;
		//获取到距离左边的距离
        left = obj.offsetLeft;
		//获取到距离上边的距离
        top = obj.offsetTop;
		parent = obj.parentNode.offsetHeight
		bottom = parent - e.touches[0].pageY
		pendingY = e.touches[0].pageY;
        //下一步判断方向距离左边的距离+元素的宽度减去自己设定的宽度，只要点击的时候大于在这个区间，他就算右边
        if(top - 20 < firstY && firstY < top){
            dir = "top";
        }
		console.log("parent", parent)
		console.log("Top", top)
		console.log("Height", height)
		console.log("Bottom", bottom)
	}

	dragMove = function(e){
        e = e||event;
		console.log("obj.parentNode.offsetHeight", obj.parentNode.offsetHeight)
		console.log("e.touches[0].pageY", e.touches[0].pageY)
		console.log("obj.offsetTop", obj.offsetTop)
		console.log("obj.offsetHeight", obj.offsetHeight)
		console.log("pendingY", pendingY)
		if(obj.offsetTop < 30 && e.touches[0].pageY < pendingY){
			pendingY = 30;
			console.log(1)
			return;
		} else if (obj.offsetHeight < 10 && e.touches[0].pageY > pendingY){
			pendingY = parent - 30;
			console.log(2)
			return;
		} else{
			switch(dir){
				case "top":
				dragResize(e);
				break;
				case null:
				console.log(21)
				break;
			}
		}
		// dragResize(e);
	}

	dragResize = function(e){
		console.log("resize")
		obj.style["height"] = height - (e.touches[0].pageY - firstY) + "px";
		tobj.style["height"] = theight + (e.touches[0].pageY - firstY) + "px";
		dobj.style["top"] = tobj.offsetHeight - 20 + "px"
        // obj.style["top"] = top+(e.touches[0].pageY-firstY)+"px";
		console.log(obj.offsetHeight)
		// if(obj.offsetHeight > (parent - 30)){
		// 	obj.style["height"] = parent - 30 + "px";
		// 	tobj.style["height"] = 10 + "px";
		// 	dobj.style["top"] = 10 + "px"
		// } else if(obj.offsetHeight < 10){
		// 	obj.style["height"] = 10 + "px";
		// 	// tobj.style["height"] = parent - 30 + "px";
		// 	// dobj.style["top"] = parent - 30 + "px"
		// }
	}
}
