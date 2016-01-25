var isBt = false;
var Jq=jQuery;
function IsvoteBt(n,bt,info){
	if(n&&!isVoted&&bt){
		bt.className = "vote_bt";
		bt.disabled = "";
		bt.value = "投 票";
	}
	if(!n&&!isVoted&&bt){
		bt.className = "vote_over_bt";
		bt.disabled = "disabled";
		bt.value = "投 票";
	}
	if(isVoted&&bt&&info){
		bt.className = "vote_over_bt";
		bt.disabled = "disabled";
		bt.value = "已投票";
		//info.style.display = "block";
		//alert("已提交完毕");
	}
	if(isBt&&isVoted&&info){
		showVoteSuccess(info);
	}
}
function clickVote(vote_id,vote_bt,success_info,isshow){
	var bt = document.getElementById(vote_bt);
	var info = document.getElementById(success_info);
	
	isVoted = true;
	isBt = true;
	IsvoteBt(2,bt,info)
	//alert("提交成功");
	changeInputStatue(vote_id,true);
	
	//判断是否显示结果
	if(isshow){
		showdd(vote_id,vote_bt,success_info);
	}
}
function showVoteSuccess(info){
	Jq(info).show(0,function(){
	//alert(info.id);
	Jq(info).animate({
			filter: "alpha(opacity=0)"
		}, 1000)
		.animate({ 
			filter: "alpha(opacity=1)"
		}, 1000);
	})
	.hide(0,function(){
	Jq(info).animate({
			filter: "alpha(opacity=0)"
		}, 1000);
	})
	isBt =false;
}

function changeInputStatue(vote_id,isVoted){
	var vote = document.getElementById(vote_id);
	var inp = vote.getElementsByTagName("input");
	for(var j=0; j<inp.length; j++){
		if(isVoted){
			if(inp[j].getAttribute("type").toLocaleLowerCase()=="checkbox"||inp[j].getAttribute("type").toLocaleLowerCase()=="radio"||inp[j].getAttribute("type").toLocaleLowerCase()=="text"){
				inp[j].disabled = "disabled";
			}
		}
	}	
}
function showdd(vote_id,vote_bt,success_info){
	var vote = document.getElementById(vote_id);
	var bt = document.getElementById(vote_bt);
	var info = document.getElementById(success_info);

	var dds = vote.getElementsByTagName("dd");
	for(var i=0; i<dds.length; i++){
		if(!isVoted&&dds[i].style.display == "none"){
			dds[i].style.display = "block";							
		}else if(!isVoted&&dds[i].style.display == "block"){
			dds[i].style.display = "block";		
		}else {
			dds[i].style.display = "block";	
		}
	}
	changeInputStatue(vote_id,isVoted);
	for(var j=1; j<=10; j++ ){
		Jq.each(Jq("#"+vote_id+" .li_s"+j),function(){
			var widthValue = Jq(this).css("width");
			
			Jq(this).css("width","0px");
			Jq(this).animate({width: widthValue}, 1000 );
			//alert(widthValue);
		});
	}
	IsvoteBt('',bt,info);
}
function toggleClass(target){
	var inputs = target.getElementsByTagName("input");
	var isChecked = false; 
	for(var j=0; j<inputs.length; j++){
		//alert(inputs[j].checked);
		if(inputs[j].checked&&(inputs[j].getAttribute("type").toLocaleLowerCase()=="checkbox"||inputs[j].getAttribute("type").toLocaleLowerCase()=="radio")){
			target.className = "clearfix v_hover";
			//target.setAttribute("class","clearfix v_hover");
			isChecked=true;
			break;
		}else{
			target.className = "clearfix";
			//target.setAttribute("class","clearfix");
		}
	}
	for(var j=0; j<inputs.length; j++){
		if(inputs[j].getAttribute("type").toLocaleLowerCase()=="text"&&isChecked){
			inputs[j].style.display = "";
		}else if(inputs[j].getAttribute("type").toLocaleLowerCase()=="text"&&!isChecked){
			inputs[j].style.display = "none";	
		}	
	}
}
function votedoing(vote_id,vote_bt,success_info){
	var vote = document.getElementById(vote_id);
	var bt = document.getElementById(vote_bt);
	var info = document.getElementById(success_info);
	
	var dl = vote.getElementsByTagName("dl");
	var inp = vote.getElementsByTagName("input");
	
	for(var i=0; i<dl.length; i++){
		dl[i].onmouseover = function(){
			this.className = "clearfix v_hover ";
		}
		dl[i].onmouseout = function(){
			toggleClass(this);
		}
		toggleClass(dl[i]);	
		
		var n = 0;
		for(var j=0; j<inp.length; j++){
			if(inp[j].checked){
				n = j+1;
				break;
			}
		}
		IsvoteBt(n,bt,info);
		
		dl[i].onclick = function(){
			var inputs = this.getElementsByTagName("input");
			for(var j=0; j<inputs.length; j++){
				//alert(inputs[j].disable);
				if(!inputs[j].disabled){
					if(inputs[j].checked&&inputs[j].getAttribute("type").toLocaleLowerCase()=="checkbox"){
						inputs[j].checked=null;
						this.className = "clearfix";
					}else{
						inputs[j].checked="checked";
						this.className = "clearfix v_hover";
					}
					//if(inputs[j].getAttribute("type").toLocaleLowerCase()=="text"){
					//	inputs[j].style.display = "block";
					//}
				}
			}
			var dl2 = vote.getElementsByTagName("dl");
			for(var k=0; k<dl2.length; k++){
				toggleClass(dl2[k]);
				//alert("1");
			}
			
			var inp = vote.getElementsByTagName("input");
			for(var j=0; j<inp.length; j++){
				if(inp[j].checked){
					var n = 0;
					n = j+1;
					//alert(inp[j].checked.length);
					break;
				}
			}
			
			IsvoteBt(n,bt,info);
			
		}
	}
	for(var i=0; i<inp.length; i++){
		if(inp[i].getAttribute("type").toLocaleLowerCase()=="checkbox"||inp[i].getAttribute("type").toLocaleLowerCase()=="radio"){
			inp[i].onclick = function(){
				//alert(inp[0].checked);
				if(this.checked){
					this.checked=null;
				}else{
					this.checked="checked";
				}
				for(var j=0; j<inp.length; j++){
					if(inp[j].checked){
						var n = 0;
						n = j+1;
						break;
					}
				}
				IsvoteBt(n,bt,info);
			}
		}
	}
	changeInputStatue(vote_id,isVoted);
}