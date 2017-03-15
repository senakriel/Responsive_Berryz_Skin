
/*------------------------------------ 미디어 컨트롤을 위한 변수 설정 ------------------------------------*/
var folder_date = "0" // 폴더 날짜 // 보이기 : 1, 숨기기 : 0

var imgCounter = 0; //이미지 제어를 위한 카운터
var imgList = new Array();

var mp3Counter = 0; //mp3 제어를 위한 카운터
var isPlay = 0;
var mp3Url;
var mp3List = new Array();
var audio = new Audio("");

var mp4Counter = 0; //mp4 제어를 위한 카운터
var mp4List = new Array();
/*--------------------------------------------------------------------------------------------------------*/

/*------------------------------------ 색상 컨트롤을 위한 변수 설정 ------------------------------------*/
var colorSpr = new Array(); //세부 테마 컬러 설정을 위한 변수
var userColor = localStorage.getItem('userColor'); //로컬스토리지에서 사용자 지정 색상을 로드
var defaultColor = mainThemeColor; //기본 색상은 defaultColor에 저장

if (userColor != null && localStorage.getItem('userThemeOn') == 'true') mainThemeColor = userColor; //사용자 컬러가 있고 옵션이 켜져 있으면 기본색으로 사용자 색상을 세팅
/*------------------------------------------------------------------------------------------------------*/

/*------------------------------------ lightColor 설정 부분 ------------------------------------*/
colorSpr[0] = parseInt(mainThemeColor.substring(1, 3), 16);
colorSpr[1] = parseInt(mainThemeColor.substring(3, 5), 16);
colorSpr[2] = parseInt(mainThemeColor.substring(5, 7), 16);

/* 30, 48, 8 */

colorSpr[0] += 30;
colorSpr[1] += 40;
colorSpr[2] += 30;

for (var i = 0; i < 3; i++) {
    if (colorSpr[i] > 255) colorSpr[i] = 255;
}

//밝은 부분의 스킨 색상
var lightColor = "#" + colorSpr[0].toString(16).toUpperCase() + colorSpr[1].toString(16).toUpperCase() + colorSpr[2].toString(16).toUpperCase();
/*----------------------------------------------------------------------------------------------*/

/*------------------------------------ themeColor 설정 부분 ------------------------------------*/
colorSpr[0] = parseInt(mainThemeColor.substring(1, 3), 16);
colorSpr[1] = parseInt(mainThemeColor.substring(3, 5), 16);
colorSpr[2] = parseInt(mainThemeColor.substring(5, 7), 16);

colorSpr[0] -= 36;
colorSpr[1] -= 10;
colorSpr[2] -= 20;

for (var i = 0; i < 3; i++) {
    if (colorSpr[i] < 0) colorSpr[i] = 0;
}

//모바일(chrome)접속 시 보여질 테마 색상
var chromeThemeColor = "#" + colorSpr[0].toString(16).toUpperCase() + colorSpr[1].toString(16).toUpperCase() + colorSpr[2].toString(16).toUpperCase();
/*----------------------------------------------------------------------------------------------*/

/*------------------------------------ 홈페이지 설정 관련 함수 ------------------------------------*/
function setSkinData() {
    /*------------------------------------ JavaScript, CSS, Fonts 설정 ------------------------------------*/
    //JavaScript
    document.write("<script type=\"application/x-javascript\"> addEventListener(\"load\", function() { setTimeout(hideURLbar, 0); }, false); function hideURLbar(){ window.scrollTo(0,1); } <\/script>");
    document.write("<script type=\"text/javascript\" src=\"http://" + location.hostname + "/_skin/js/jquery.min.js\"><\/script>");
    document.write("<script type=\"text/javascript\" src=\"http://" + location.hostname + "/_skin/js/bootstrap.js\"><\/script>");
    document.write("<script type=\"text/javascript\" src=\"http://" + location.hostname + "/_skin/js/common.js\"><\/script>");
    document.write("<script type=\"text/javascript\" src=\"http://" + location.hostname + "/_skin/js/sortabletable.js\"><\/script>");

    //CSS
    document.write("<link href=\"http://" + location.hostname + "/_skin/css/bootstrap.css\" rel=\"stylesheet\" type=\"text/css\" media=\"all\" />");
    document.write("<link href=\"http://" + location.hostname + "/_skin/css/style.css\" rel=\"stylesheet\" type=\"text/css\" media=\"all\" />");
    document.write("<link href=\"http://" + location.host + "/_skin/css/animate.css\" rel=\"stylesheet\" type=\"text/css\" media=\"all\" />");

    //Fonts
    document.write("<link href='http://fonts.googleapis.com/css?family=Roboto+Slab:400,100,300,700' rel='stylesheet' type='text/css'>");
    /*-----------------------------------------------------------------------------------------------------*/
}

function setMetaData() {
    /*------------------------------------ Meta, Title 설정 ------------------------------------*/
    //Meta
    document.write("<meta name=\"googlebot\" content=\"noindex\">");
    document.write("<meta name=\"robots\" content=\"noindex\">");
    document.write("<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">");
    document.write("<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\" />");

    //Title
    document.write("<title>" + title + "</title>");
    /*------------------------------------------------------------------------------------------*/
}

function setThemeColorWithIcon() {
    /*------------------------------------ 테마 컬러 + 아이콘 설정 ------------------------------------*/
    //ThemeColor
    document.write("<meta name=\"theme-color\" content=\"" + chromeThemeColor + "\">");

    //Icon
    document.write("<link rel=\"icon\" id=\"favicon\" type=\"image/x-icon\" href=\"http://" + location.hostname + "/_skin/images/favicon.ico\" />");
    /*-------------------------------------------------------------------------------------------------*/
}

function changeFavicon() {
    /*------------------------------------ 파비콘을 캔버스에서 불러오는 함수 ------------------------------------*/
    var faviconLink = document.getElementById("favicon");
    faviconLink.href = canvas.toDataURL("image/x-icon");
    /*-----------------------------------------------------------------------------------------------------------*/
}

function setCSS() {
    /*------------------------------------ 이미지, 색상 지정을 위한 CSS 삽입 ------------------------------------*/
    document.write("<style type=\"text/css\">\n");
    document.write("@import url(http://fonts.googleapis.com/css?family=Roboto:100);\n");

    //체크박스 선택 이미지
    document.write(".checkbox input + i:after {\n");
    document.write("background: url(\"" + tick + "\") no-repeat 1px 2px;\n");
    document.write("}\n");

    //프로필 배경 이미지
    document.write(".profile-image {\n");
    document.write("background:url('" + pi + "')no-repeat center;\n");
    document.write("}\n");

    //밝은 부분의 스킨 색
    document.write("#location a {background: " + lightColor + ";}\n");
    document.write("#location a:hover {background: " + mainThemeColor + ";}\n");
    document.write("\n");
    document.write("table tr.folder:hover { background: " + lightColor + ";}\n");
    document.write("table tr.file:hover { background: " + lightColor + ";}\n");
    document.write("\n");
    document.write(".navbar-default .navbar-nav > .active > a, .navbar-default .navbar-nav > .active > a:hover, .navbar-default .navbar-nav > .active > a:focus {\n");
    document.write("background-color: " + lightColor + ";\n");
    document.write("}\n");
    document.write(".navbar-default .navbar-nav > .open > a, .navbar-default .navbar-nav > .open > a:hover, .navbar-default .navbar-nav > .open > a:focus {\n");
    document.write("background-color: " + lightColor + ";\n");
    document.write("}\n");
    document.write(".navbar-default .navbar-nav > li > a:hover, .navbar-default .navbar-nav > li > a:focus {\n");
    document.write("background-color: " + lightColor + ";\n");
    document.write("}\n");
    document.write(".callbacks_tabs a:after {\n");
    document.write("background:" + lightColor + ";\n");
    document.write("}\n");
    document.write(".banner-text a:hover{\n");
    document.write("background: " + lightColor + ";\n");
    document.write("}\n");
    document.write(".mid-content a:hover{\n");
    document.write("background:" + lightColor + ";\n");
    document.write("}\n");
    document.write(".col-md a:hover{\n");
    document.write("color: " + lightColor + ";\n");
    document.write("}\n");
    document.write(".col-md1 a{\n");
    document.write("background: " + lightColor + ";\n");
    document.write("}\n");
    document.write("\n");
    document.write("ul.social li a:hover{\n");
    document.write("border:2px solid " + lightColor + ";\n");
    document.write("}\n");
    document.write("\n");
    document.write("::selection {\n");
    document.write("background:" + lightColor + ";\n");
    document.write("}\n");
    document.write("::-moz-selection {\n");
    document.write("background:" + lightColor + ";\n");
    document.write("}\n");

    //어두운 부분의 스킨 색
    document.write("table tr.file:hover > .side{ background: " + mainThemeColor + "; }\n");
    document.write("\n");
    document.write(".mobile-side{\n");
    document.write("background-color: " + mainThemeColor + ";\n");
    document.write("}\n");
    document.write(".navbar-default .navbar-nav > .active > a, .navbar-default .navbar-nav > .active > a:hover, .navbar-default .navbar-nav > .active > a:focus {\n");
    document.write("border-top: 8px solid " + mainThemeColor + ";\n");
    document.write("}\n");
    document.write(".navbar-default .navbar-nav > .open > a, .navbar-default .navbar-nav > .open > a:hover, .navbar-default .navbar-nav > .open > a:focus {\n");
    document.write("border-top: 8px solid " + mainThemeColor + ";\n");
    document.write("}\n");
    document.write(".navbar-default .navbar-nav > li > a:hover, .navbar-default .navbar-nav > li > a:focus {\n");
    document.write("border-top: 8px solid " + mainThemeColor + ";\n");
    document.write("}\n");
    document.write(".dropdown-menu > li > a:hover,\n");
    document.write(".dropdown-menu > li > a:focus {\n");
    document.write("background-color: " + lightColor + ";\n");
    document.write("}\n");
    document.write("</style>\n");
    /*-----------------------------------------------------------------------------------------------------------*/
}

function setMp3CSS() {
    /*------------------------------------ MP3 테마 색상 설정 ------------------------------------*/
    document.write("<style type=\"text/css\">\n");

    document.write("@import url(http://fonts.googleapis.com/earlyaccess/nanumgothic.css);\n");
    document.write("\n");
    document.write("html, body {\n");
    document.write("width: 100%;\n");
    document.write("height: 100%;\n");
    document.write("font-family: 'Nanum Gothic';\n");
    document.write("}\n");
    document.write("#bg {\n");
    document.write("position: fixed;\n");
    document.write("top: -50%;\n");
    document.write("left: -50%;\n");
    document.write("width: 200%;\n");
    document.write("height: 200%;\n");
    document.write("}\n");
    document.write("#bg img {\n");
    document.write("position: absolute;\n");
    document.write("top: 0;\n");
    document.write("left: 0;\n");
    document.write("right: 0;\n");
    document.write("bottom: 0;\n");
    document.write("margin: auto;\n");
    document.write("min-width: 50%;\n");
    document.write("min-height: 50%;\n");
    document.write("}\n");
    document.write("#middleTable {\n");
    document.write("display: table;\n");
    document.write("width: 100%;\n");
    document.write("height: 100%;\n");
    document.write("}\n");
    document.write("#middleCell {\n");
    document.write("display: table-cell;\n");
    document.write("vertical-align: middle;\n");
    document.write("background-color: rgba(20, 20, 20, 0.4);\n");
    document.write("}\n");
    document.write("#lrcArea {\n");
    document.write("color: rgba(255, 255, 255, 0.9);\n");
    document.write("font-size: 1.2em;\n");
    document.write("font-weight: bold;\n");
    document.write("text-shadow: 0 0 2px #000;\n");
    document.write("-moz-text-shadow: 0 0 2px #000;\n");
    document.write("-webkit-text-shadow: 0 0 2px #000;\n");
    document.write("}\n");
    document.write("#cover {\n");
    document.write("cursor: pointer;\n");
    document.write("}\n");

    document.write(".sm2-bar-ui .sm2-main-controls,\n");
    document.write(".sm2-bar-ui .sm2-playlist-drawer {\n");
    document.write("background-color: " + mainThemeColor + ";\n");
    document.write("}\n");

    document.write(".sm2-bar-ui .bd .sm2-button-element:hover {\n");
    document.write("background-image: url(http://" + location.hostname + "/_skin/images/black-10.png);\n");
    document.write("}\n");
    document.write(".sm2-bar-ui .bd .sm2-button-element:active {\n");
    document.write("background-image: url(http://" + location.hostname + "/_skin/images/black-25.png);\n");
    document.write("}\n");
    document.write(".sm2-bar-ui .bd .sm2-extra-controls .sm2-button-element:hover,\n");
    document.write(".sm2-bar-ui .bd .sm2-extra-controls .sm2-button-element:active,\n");
    document.write(".sm2-bar-ui .bd .active {\n");
    document.write("background-image: url(http://" + location.hostname + "/_skin/images/black-10.png);\n");
    document.write("}\n");
    document.write(".sm2-progress .sm2-progress-bar {\n");
    document.write("background-image: url(http://" + location.hostname + "/_skin/images/black-33.png);\n");
    document.write("}\n");
    document.write(".sm2-progress .sm2-progress-track {\n");
    document.write("background-image: url(http://" + location.hostname + "/_skin/images/black-33.png); /* legacy */\n");
    document.write("}\n");
    document.write(".play-pause,\n");
    document.write(".play-pause:hover,\n");
    document.write(".paused .play-pause:hover {\n");
    document.write("background-image: url(http://" + location.hostname + "/_skin/images/icomoon/entypo-25px-ffffff/PNG/play.png);\n");
    document.write("}\n");
    document.write(".playing .play-pause {\n");
    document.write("background-image: url(http://" + location.hostname + "/_skin/images/icomoon/entypo-25px-ffffff/PNG/pause.png);\n");
    document.write("}\n");
    document.write(".sm2-volume-control {\n");
    document.write("background-image: url(http://" + location.hostname + "/_skin/images/icomoon/entypo-25px-ffffff/PNG/volume.png);\n");
    document.write("}\n");
    document.write(".volume-shade {\n");
    document.write("background-image: url(http://" + location.hostname + "/_skin/images/icomoon/entypo-25px-000000/PNG/volume.png);\n");
    document.write("}\n");
    document.write(".menu {\n");
    document.write("background-image: url(http://" + location.hostname + "/_skin/images/icomoon/entypo-25px-ffffff/PNG/list2.png);\n");
    document.write("}\n");
    document.write(".previous {\n");
    document.write("background-image: url(http://" + location.hostname + "/_skin/images/icomoon/entypo-25px-ffffff/PNG/first.png);\n");
    document.write("}\n");
    document.write(".next {\n");
    document.write("background-image: url(http://" + location.hostname + "/_skin/images/icomoon/entypo-25px-ffffff/PNG/last.png);\n");
    document.write("}\n");
    document.write(".shuffle {\n");
    document.write("background-image: url(http://" + location.hostname + "/_skin/images/icomoon/entypo-25px-ffffff/PNG/shuffle.png);\n");
    document.write("}\n");
    document.write(".repeat {\n");
    document.write("background-image: url(http://" + location.hostname + "/_skin/images/icomoon/entypo-25px-ffffff/PNG/loop.png);\n");
    document.write("}\n");
    document.write(".sm2-playlist-wrapper ul li .sm2-cart,\n");
    document.write(".sm2-playlist-wrapper ul li:hover .sm2-cart,\n");
    document.write(".sm2-playlist-wrapper ul li.selected .sm2-cart {\n");
    document.write("background-image: url(http://" + location.hostname + "/_skin/images/icomoon/entypo-25px-ffffff/PNG/cart.png);\n");
    document.write("}\n");
    document.write(".sm2-playlist-wrapper ul li .sm2-music,\n");
    document.write(".sm2-playlist-wrapper ul li:hover .sm2-music,\n");
    document.write(".sm2-playlist-wrapper ul li.selected .sm2-music {\n");
    document.write("background-image: url(http://" + location.hostname + "/_skin/images/icomoon/entypo-25px-ffffff/PNG/music.png);\n");
    document.write("}\n");
    document.write(".sm2-bar-ui.dark-text .sm2-playlist-wrapper ul li .sm2-cart,\n");
    document.write(".sm2-bar-ui.dark-text .sm2-playlist-wrapper ul li:hover .sm2-cart,\n");
    document.write(".sm2-bar-ui.dark-text .sm2-playlist-wrapper ul li.selected .sm2-cart {\n");
    document.write("background-image: url(http://" + location.hostname + "/_skin/images/icomoon/entypo-25px-000000/PNG/cart.png);\n");
    document.write("}\n");
    document.write(".sm2-bar-ui.dark-text .sm2-playlist-wrapper ul li .sm2-music,\n");
    document.write(".sm2-bar-ui.dark-text .sm2-playlist-wrapper ul li:hover .sm2-music,\n");
    document.write(".sm2-bar-ui.dark-text .sm2-playlist-wrapper ul li.selected .sm2-music {\n");
    document.write("background-image: url(http://" + location.hostname + "/_skin/images/icomoon/entypo-25px-000000/PNG/music.png);\n");
    document.write("}\n");
    document.write(".sm2-progress-ball .icon-overlay {\n");
    document.write("}\n");
    document.write(".sm2-playlist-wrapper ul li:hover a {\n");
    document.write("background-image: url(http://" + location.hostname + "/_skin/images/black-20.png);\n");
    document.write("}\n");
    document.write(".sm2-bar-ui.dark-text .sm2-playlist-wrapper ul li:hover a {\n");
    document.write("background-image: url(http://" + location.hostname + "/_skin/images/black-10.png);\n");
    document.write("}\n");
    document.write(".sm2-playlist-wrapper ul li.selected a {\n");
    document.write("background-image: url(http://" + location.hostname + "/_skin/images/black-20.png);\n");
    document.write("}\n");
    document.write(".sm2-bar-ui.dark-text ul li.selected a {\n");
    document.write("background-image: url(http://" + location.hostname + "/_skin/images/black-10.png);\n");
    document.write("}\n");
    document.write(".sm2-bar-ui.dark-text .label {\n");
    document.write("background-image: url(http://" + location.hostname + "/_skin/images/black-10.png);\n");
    document.write("}\n");

    document.write("</style>\n");
    /*--------------------------------------------------------------------------------------------*/
}

function byteConvertor(bytes) {
    /*------------------------------------ 단위 변환 처리 함수 ------------------------------------*/
    bytes = parseInt(bytes.replace(/,/gi, ''));
    if (bytes > 0) {
        var s = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
        var e = Math.floor(Math.log(bytes) / Math.log(1024));
        if (e >= s.length) e = s.length - 1;
        else if (e == "-Infinity") return "0 " + s[0];
        else return (bytes / Math.pow(1024, Math.floor(e))).toFixed(2) + " " + s[e];
    }
    else {
        return "";
    }
    /*---------------------------------------------------------------------------------------------*/
}

function onloadConvertor() {
    /*------------------------------------ 단위 변환 적용 함수 ------------------------------------*/
    var conobj = document.all['cvtsize[]'];
    if (conobj != null) {
        if (conobj.length >= 1) {
            for (var i = 0; i < conobj.length; i++) {
                conobj[i].innerHTML = byteConvertor(conobj[i].innerHTML);
            }
        }
        else {
            return "";
        }
    }
    /*---------------------------------------------------------------------------------------------*/
}

function getLogo() {
    /*------------------------------------ 로고 이미지를 불러오는 함수 ------------------------------------*/
    document.write("<a class=\"navbar-brand\" href=\"/\">\n");
    document.write("<div style=\"position: relative;\">\n");
    document.write("<canvas id=\"myCanvas\" width=\"44\" height=\"40\"></canvas>\n");
    document.write("</div>\n");
    document.write("<div style=\"position: relative; left:46px; top:-42px\">\n");
    document.write("<img src=\"" + logo2 + "\" alt=\"\">\n");
    document.write("</div>\n");
    document.write("<script type=\"text/javascript\">\n");
    document.write("var canvas = document.getElementById(\"myCanvas\");\n");
    document.write("var context2d = canvas.getContext(\"2d\");\n");
    document.write("context2d.arc(21, 20, 19, 0, 2 * Math.PI, true);\n");
    document.write("context2d.fillStyle = '" + mainThemeColor + "';\n");
    document.write("context2d.fill();\n");
    document.write("var img = new Image();\n");
    document.write("\n");
    document.write("img.onload = function(){\n");
    document.write("context2d.drawImage(img, 0, 0);\n");
    if (custumFavicon != "on") {
        document.write("changeFavicon();\n");
    }
    document.write("}\n");
    document.write("img.src = logo1;\n");
    document.write("</script>\n");
    document.write("</a>\n");
    /*-----------------------------------------------------------------------------------------------------*/
}

function getProfile() {
    /*------------------------------------ 프로필 이미지를 불러오는 함수 ------------------------------------*/
    document.getElementById('profile').outerHTML =
      "<div class=\"profile-image\">"
    + "<img class=\"rotate\" src=\"" + thumbnail + "\">"
    + "</div>"
    + "<div class=\"nickname\">"
    + "<p class=\"user\">"
    + nickname
    + "</p>"
    + "</div>";
    /*-------------------------------------------------------------------------------------------------------*/
}

function setPageInfo() {
    /*------------------------------------ 홈페이지 정보를 불러오는 함수 ------------------------------------*/
    document.getElementById('title').outerHTML = "<span>&nbsp;&nbsp;&nbsp;“" + title + "”</span>";
    if (facebookLink != "") {
        document.getElementById('facebook').outerHTML =
          "<p>"
        + "&nbsp;<b>Facebook</b><br />"
        + "&nbsp;ㆍ<a href=\"" + facebookLink + "\" target=\"_blank\">" + facebookLink + "</a>"
        + "</p>";
    }
    else {
        document.getElementById('facebook').outerHTML = "";
    }
    if (blogLink != "") {
        document.getElementById('blog').outerHTML =
          "<p>"
        + "&nbsp;<b>Blog</b><br />"
        + "&nbsp;ㆍ<a href=\"" + blogLink + "\" target=\"_blank\">" + blogLink + "</a>"
        + "</p>";
    }
    else {
        document.getElementById('blog').outerHTML = "";
    }

    document.getElementById('email').outerHTML =
      "<p>"
    + "&nbsp;<b>E-Mail</b><br />"
    + "&nbsp;ㆍ" + email
    + "</p>";
    /*-------------------------------------------------------------------------------------------------------*/
}

function getParameter(param) {
    /*------------------------------------ get방식으로 전달된 변수들을 불러오는 함수 ------------------------------------*/
    var returnValue;
    var url = location.href;
    var parameters = (url.slice(url.indexOf('?') + 1, url.length)).split('&');
    for (var i = 0; i < parameters.length; i++) {
        var varName = parameters[i].split('=')[0];
        if (varName.toUpperCase() == param.toUpperCase()) {
            returnValue = parameters[i].split('=')[1];
            return decodeURIComponent(returnValue);
        }
    }
    /*-------------------------------------------------------------------------------------------------------------------*/
}

function setDefaultSetting() {
    /*------------------------------------ 사용자 설정을 초기화 해주는 함수 ------------------------------------*/
    localStorage.removeItem('userColor');
    localStorage.removeItem('mp3PlayerStartOn');
    localStorage.removeItem('userThemeOn');
    localStorage.removeItem('mp4PlayerListOn');
    localStorage.removeItem('imgFullLoadOn');
    localStorage.removeItem('mp3LyricsOn');
    localStorage.removeItem('adminKeyOn');
    localStorage.removeItem('adminKey');
    location.reload();
    /*----------------------------------------------------------------------------------------------------------*/
}

function isCheckboxOnClick(checkbox, boxNum) {
    /*------------------------------------ 사용자 설정 옵션 선택시 변수를 저장해 주는 함수 ------------------------------------*/
    if (checkbox.checked == true) { //클릭 시
        switch (boxNum) {
            case 0: //사용자 테마 설정
                localStorage.setItem('userThemeOn', 'true');
                location.reload();
                break;
            case 1: //Mp3 파일 플레이어 바로 열기
                localStorage.setItem('mp3PlayerStartOn', 'true');
                break;
            case 2: //Mp4 리스트 함께 열기
                localStorage.setItem('mp4PlayerListOn', 'true');
                break;
            case 3: //이미지 전부 열기
                localStorage.setItem('imgFullLoadOn', 'true');
                break;
            case 4: //Mp3 가사재생
                localStorage.setItem('mp3LyricsOn', 'true');
                break;
            case 5: //관리자 키
                localStorage.setItem('adminKeyOn', 'true');
                break;
        }
    }

    else { // 클릭 해제 시
        switch (boxNum) {
            case 0:
                localStorage.removeItem('userThemeOn');
                location.reload();
                break;
            case 1:
                localStorage.removeItem('mp3PlayerStartOn');
                break;
            case 2:
                localStorage.removeItem('mp4PlayerListOn');
                break;
            case 3:
                localStorage.removeItem('imgFullLoadOn');
                break;
            case 4:
                localStorage.removeItem('mp3LyricsOn');
                break;
            case 5:
                localStorage.removeItem('adminKeyOn');
                break;
        }
    }
    /*-------------------------------------------------------------------------------------------------------------------------*/
}

function toggleSelectBox() {
    /*------------------------------------ 선택된 체크박스를 선택해 주는 함수 ------------------------------------*/
    if (localStorage.getItem('userThemeOn') != null) document.getElementById('option0').innerHTML = "<input type='checkbox' checked=\"checked\" onclick='isCheckboxOnClick(this, 0);' /><i></i>";
    if (localStorage.getItem('mp3PlayerStartOn') != null) document.getElementById('option1').innerHTML = "<input type='checkbox' checked=\"checked\" onclick='isCheckboxOnClick(this, 1);' /><i></i>";
    if (localStorage.getItem('mp4PlayerListOn') != null) document.getElementById('option2').innerHTML = "<input type='checkbox' checked=\"checked\" onclick='isCheckboxOnClick(this, 2);' /><i></i>";
    if (localStorage.getItem('imgFullLoadOn') != null) document.getElementById('option3').innerHTML = "<input type='checkbox' checked=\"checked\" onclick='isCheckboxOnClick(this, 3);' /><i></i>";
    if (localStorage.getItem('mp3LyricsOn') != null) document.getElementById('option4').innerHTML = "<input type='checkbox' checked=\"checked\" onclick='isCheckboxOnClick(this, 4);' /><i></i>";
    if (localStorage.getItem('adminKeyOn') != null) document.getElementById('option5').innerHTML = "<input type='checkbox' checked=\"checked\" onclick='isCheckboxOnClick(this, 5);' /><i></i>";
    /*------------------------------------------------------------------------------------------------------------*/
}

function togleDisplay(checkBox, targetDiv) {
    /*------------------------------- 체크박스 판별 후 div 숨김/보임 설정하는 함수 -------------------------------*/
    var chboxs = document.getElementsByName(checkBox);
    var vis = "none";
    if (chboxs[0].checked) {
        vis = "block";
    }
    document.getElementById(targetDiv).style.display = vis;
    /*------------------------------------------------------------------------------------------------------------*/
}

function startSideSetting() {
    /*------------------------------- 페이지 로드시 index 화면 설정을 보조하는 함수 -------------------------------*/
    setSkinData();
    setMetaData();
    setThemeColorWithIcon();
    setCSS();

    localStorage.removeItem("mp4List");
    localStorage.removeItem("mp3List");
    localStorage.removeItem("imgList");
    /*-------------------------------------------------------------------------------------------------------------*/
}

function endSideSetting() {
    /*------------------------------- 페이지 로드 완료시 화면 설정을 보조하는 함수 -------------------------------*/
    document.getElementById('remove_basic_setting').outerHTML = "";
    document.getElementById('remove_page_setting').outerHTML = "";
    document.getElementById('remove_get_logo').outerHTML = "";

    document.getElementById('manual').outerHTML = "<li><a href=\"http://" + location.host + "/_skin/html/manual.html\">Manual</li>";
    document.getElementById('setting').outerHTML = "<li><a href=\"http://" + location.host + "/_skin/html/setting.html\">Setting</li>";

    getProfile();
    setPageInfo();

    var folderList = document.getElementsByName('dropScript');

    for (var i = 0; i < folderList.length; i++) {
        folderList[i].innerHTML = "";
    }

    for (var i = (folderList.length - 1) ; i >= 0; i--) {
        folderList[i].outerHTML = "";
    }

    localStorage.setItem("mp4List", JSON.stringify(mp4List));
    localStorage.setItem("mp3List", JSON.stringify(mp3List));
    localStorage.setItem("imgList", JSON.stringify(imgList));

    document.getElementById('main').style.display = 'block';
    document.getElementById('extra').style.display = 'block';

    document.getElementById('waiting_for_loading').style.display = 'none';
    /*------------------------------------------------------------------------------------------------------------*/
}

function getExtensionOfFilename(fileName) {
    /*------------------------------- 파일명에서 확장자를 리턴해 주는 함수 -------------------------------*/

    var fileLenth = fileName.length;
    var lastDotPoint = fileName.lastIndexOf('.');

    var fileExtension = fileName.substring(lastDotPoint, fileLenth).toLowerCase(); // 확장자를 추출한 후 소문자로 변경

    return fileExtension;
    /*----------------------------------------------------------------------------------------------------*/
}

function openMp4Player(now, isPlugin) {
    /*------------------------------- 동영상 재생을 위한 설정 함수 -------------------------------*/
    if (isPlugin == "true") {
        window.open("http://" + location.host + "/_skin/html/mp4Player.html?now=" + now + "&isPlugin=true&lSize=" + mp4Counter + "&local=" + location.href, '_blank', 'width=908,height=420,toolbar=no,status=no');
    }
    else {
        window.open("http://" + location.host + "/_skin/html/mp4Player.html?now=" + now + "&isPlugin=false&lSize=" + mp4Counter + "&local=" + location.href, '_blank', 'width=800,height=450,toolbar=no,status=no');
    }
    /*--------------------------------------------------------------------------------------------*/
}

function openMp3Player() {
    /*------------------------------- 음악 재생을 위한 설정 함수 -------------------------------*/
    if (localStorage.getItem("mp3BackGraundImage ") == null) {
        var mp3BackGraundImage = new Array();
        for (var i = 0; i < 3; i++) {
            mp3BackGraundImage[i] = "http://" + location.host + "/_skin/images/mp3Bg" + (i + 1) + ".gif";
        }
        localStorage.setItem("mp3BackGraundImage", JSON.stringify(mp3BackGraundImage));
    }
    window.open("http://" + location.host + "/_skin/html/mp3Player.html?kSize=" + mp3Counter + "&local=" + location.href + "&bgImg=" + imgList[0], '_blank', 'width=460,height=460,status=no,resizable=yes,scrollbars=yes');
    /*------------------------------------------------------------------------------------------*/
}

function playPause(url) {
    /*------------------------------- 빠른 음악 재생을 위한 함수 -------------------------------*/
    if (audio.src == url) {
        if (isPlay == 0) {
            audio.play();
            isPlay = 1;
        }
        else {
            audio.pause();
            isPlay = 0;
        }
    }
    else {
        audio.src = url;
        audio.play();
        isPlay = 1;
    }
    /*------------------------------------------------------------------------------------------*/
}

function openViewer(now) {
    /*------------------------------- 이미지 파일을 위한 설정 함수 -------------------------------*/
    if (now == 0 && localStorage.getItem('imgFullLoadOn') == null) {
        now = 1;
    }
    window.open("http://" + location.host + "/_skin/html/imageViewer.html?now=" + now + "&iSize=" + imgCounter + "&local=" + location.href, '_blank', 'width=460,height=800,status=no,resizable=yes,scrollbars=yes');
    /*--------------------------------------------------------------------------------------------*/
}