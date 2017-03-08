﻿// BASIC
var highlightColor = "#f9f9f9";
var shiftPressed = false;

function mouseDown( e )
{
	var evt = (navigator.appName=="Netscape") ? e : event;
	shiftPressed = evt.shiftKey;
	// evt.shiftKey; evt.altKey; evt.ctrlKey;
	return true;
}
document.onmousedown = mouseDown;

function ToggleSelectAll()
{
	var currform = document.getElementById("fileListForm");
	var cbs = currform.elements;
	for( i=0; i < cbs.length; ++i )
	{
		if( cbs[i].name.substr(0, 9) != "checkbox#" )
			continue;
		cbs[i].checked = currform.selectAllCheckbox.checked;
	}

	var table = document.getElementById("fileListTable");
	for( i=1; i < table.rows.length; ++i )
	{
		table.rows[i].style.backgroundColor = currform.selectAllCheckbox.checked ? highlightColor: "";
	}
}

function HighlightRow( link, checked )
{
	//document.getElementById("tr#"+link).style.backgroundColor = checked ? highlightColor : "";
}

function onMkdir()
{
	var folderName = prompt("새로 만들 폴더 이름을 입력해 주세요.", "");
	if( folderName )
	{
		document.MkdirForm.name.value=folderName;
		document.MkdirForm.submit();	
	}
}

function OnPlugin( sel )
{
	var pluginType = "view";
	var pluginId = sel;

	var cbs = document.getElementById("fileListForm").elements;
	var selectedFiles = "";
	var selectedCount = 0;
	for( i=0; i<cbs.length; ++i )
	{
		if( cbs[i].name.substr(0, 9) != "checkbox#" )
			continue;

		if( cbs[i].checked )
		{
			selectedCount++;
			selectedFiles += cbs[i].value;
			selectedFiles += "\n";
		}
	}

	if( pluginType == "action" && selectedFiles == "" )
	{
		alert("기능을 적용할 대상을 먼저 선택해 주세요.");
		sel.selectedIndex = 0;
		return;
	}
	
	if( sel == "RARdownload" || sel == "ZIPdownload" || sel == "playlist.asx" || sel == "Delete" || sel == "album" ) {
		if(selectedCount < 1) {
			alert("파일을 선택하세요. ("+selectedCount+")");
			return false;
		}
	} else if(sel == "Rename") {
		if(selectedCount < 1) {
			alert("파일을 선택하세요. ("+selectedCount+")");
			return false;
		} else if( selectedCount > 1) {
			alert("변경할 파일은 하나만 선택가능 합니다.");
			return false;
		}
	}

	var form = document.getElementById("pluginForm");
	form.action = "?action=Plugin&type=" + pluginId;
	form.selectedFiles.value = selectedFiles;

	form.submit();
}

// SUBDIR
function create_request()
{
	var request = false;
	try {
		request = new XMLHttpRequest();
	} catch (trymicrosoft) {
		try {
			request = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (othermicrosoft) {
			try {
				request = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (failed) {
				request = false;
			}  
		}
	}

	if (!request)
		alert("Error initializing XMLHttpRequest!");
	return request;
}

var opens = new Array();

// codes for sub directory viewing
var SUBDIR_close_delay = 650;
var SUBDIR_close_timer_key = null;

function SUBDIR_reset_close_timer()
{
	if (SUBDIR_close_timer_key)
	{
		clearTimeout(SUBDIR_close_timer_key);
		SUBDIR_close_timer_key = null;
	}
}

function SUBDIR_close_all()
{
	SUBDIR_reset_close_timer();
	SUBDIR_close_timer_key = setTimeout(function(){
		while(opens.length > 0)
		{
			var d = opens.pop()
			d.style.visibility = "hidden";
		}
	}, SUBDIR_close_delay);
}

function getRealOffsetTop(o) { return o ? o.offsetTop + getRealOffsetTop(o.offsetParent) : 0; }
function getRealOffsetLeft(o) { return o ? o.offsetLeft + getRealOffsetLeft(o.offsetParent) : 0; }

var cache = new Object;
var level = new Object;

function get_id_from_div(div)
{
	return div.id.substr(1);
}

function insert_opened(div)
{
	var i = 0;
	var l = level[get_id_from_div(div)];
	while (i < opens.length)
	{
		if (level[get_id_from_div(opens[i])] >= l && opens[i] != div)
		{
			opens[i].style.visibility = "hidden";
			opens[i] = opens[opens.length-1];
			opens.pop();
			i--;
		}
		i++;
	}
	opens.push(div);
}

var SUBDIR_menu_delay_key = null;

function SUBDIR_open(path)
{
	var a = document.getElementById("a"+path);
	var div = document.getElementById("d"+path);
	for(var i = 0; i < opens.length; i ++)
		if (opens[i] == div)
			return;
	if (level[get_id_from_div(div)] > 1)
	{
		div.style.left = getRealOffsetLeft(a) + a.offsetWidth + "px";
		div.style.top = getRealOffsetTop(a)-3 + "px";
	}
	else
	{
		div.style.left = getRealOffsetLeft(a) + (a.offsetWidth / 2) + "px";
		div.style.top = getRealOffsetTop(a)+ (a.offsetHeight * 4 / 5) + "px";
	}
	if (SUBDIR_menu_delay_key)
	{
		clearTimeout(SUBDIR_menu_delay_key);
		SUBDIR_menu_delay_key = null;
	}

	SUBDIR_menu_delay_key = setTimeout(function(){
	div.style.visibility = "visible";
	insert_opened(div);
	},250);

	if (cache[path])
		return;
	cache[path] = true;

	var request = create_request();
	request.open("GET", encodeURI(path) + "/?action=Subdir", true);
	request.onreadystatechange = function ()
		{
			if (request.readyState == 4)
			{
				var l = level[path];
				var dirs = eval(request.responseText);
				var output = "";
				if (dirs == 'UNAUTHORIZED')
				{ 
					output = "<i>(권한 없음)</i>";
					dirs = [];
				}
				else if (dirs.length < 2)
				{
					var t = path.split('/');
					t = t[t.length-1];
					output = "<i>(하위 폴더 없음)</i>"
				}

				for(var i = 0; i < dirs.length; i ++)
				{
					if (dirs[i] != '/')
					{
						output+= SUBDIR_generate_point(path+"/"+dirs[i], l+1,dirs[i])
					}
				}
				div.innerHTML = output
			}
		}
	request.send(null)

}

function colorme(obj)
{
	obj.style.backgroundColor = highlightColor;
}

function uncolorme(obj)
{
	obj.style.backgroundColor = "";
}

function SUBDIR_generate_point(path, lev, name)
{
	cache[path] = false;
	level[path] = lev;

	if (lev == 1)
		return "<a href="+'"'+path+'"'+" >"+name+"</a>";
	else
		return "<a href="+'"'+path+'"'+" >"+name+"</a>";
}

function write_split_address( addr )
{
	var output = ""
	var path = ".";
	if (addr != "/")
	{
		var arr = addr.split('/');
		for(var i = arr.length - 2; i > 0 ; i --)
		{
		    if (arr[i].indexOf(hideKey) == 0) {
		        output = SUBDIR_generate_point(path, 1, arr[i].substring(hideKey.length, arr[i].length)) + output;
		    }
		    else {
		        output = SUBDIR_generate_point(path, 1, arr[i]) + output;
		    }
			path += "/..";
		}
	}
	output = "<a href='/'>Home</a>" + output;
	document.getElementById('location').innerHTML += output;
}

//file address copy
function copy_address(url) {
	var answer = confirm("파일 또는 폴더 주소를 복사하여 다른 사람과 공유하거나,\n동영상 스트리밍을 통해 파일을 다운받지 않고 실시간 감상이 가능합니다.\n\n주소를 확인 하시겠습니까?")
	if (answer){
		var IE=(document.all)?true:false;
		if (IE) {
		if(confirm("다음 주소를 복사해 사용하세요."))
		window.clipboardData.setData("Text", url);
		} else {
		temp = prompt("다음 주소를 복사해 사용하세요.", url);
		}
	}
}

$(document).ready(function(){
	if (folder_date == "0") {
		$("#fileListTable .folder .date").contents().remove();
	};
	$( "#nav_button" ).click(function() {
		$("#nav, #nav_back").toggle();
		$( "html" ).addClass("open");
	});
	$("#nav_back").click(function() {
		$("#nav, #nav_back").toggle();
		$("html").removeClass("open")
	})
	$( "#pluginWrap #button" ).click(function() {
		$("#pluginWrap #plugin").toggle();
	});
});