drag(document.getElementById("div2"), document.getElementById("div1"));

function drag(obj, tobj) {
	
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
	
	obj.addEventListener("touchstart", function(e) {
		dragStart(e)
	});
	obj.addEventListener("touchmove", function(e) {
		dragMove(e)
	});
	obj.addEventListener("touchend", function(e) {
		console.log("end")
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
		bottom = parent - top - e.touches[0].pageY - firstY
        //下一步判断方向距离左边的距离+元素的宽度减去自己设定的宽度，只要点击的时候大于在这个区间，他就算右边
        if(top < firstY && firstY < top + 30){
            dir = "top";
        }
		console.log(dir)
		console.log(parent)
		console.log(top)
		console.log(height)
		console.log(bottom)
	}

	dragMove = function(e){
		if(obj.offsetTop < 30){
			console.log(1)
			return;
		} else if ((obj.parentNode.offsetHeight - obj.offsetTop - e.touches[0].pageY + firstY) < 30){
			console.log(2)
			return;
		}
		console.log(12)
        e = e||event;
        switch(dir)
        {
            case "top":
            dragResize(e);
            break;
			case null:
			console.log(21)
			break;
		}
	}

	dragResize = function(e){
		obj.style["height"] = height-(e.touches[0].pageY-firstY)+"px";
		tobj.style["height"] = theight + (e.touches[0].pageY-firstY)+"px";
        // obj.style["top"] = top+(e.touches[0].pageY-firstY)+"px";
	}
}
