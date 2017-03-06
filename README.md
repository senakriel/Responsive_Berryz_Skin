#Responsive Berryz WebShare Skin by Senakriel

[Berryz Webshare(베리즈 웹쉐어)](http://berryz.upnl.org/main.php/)는 서울대학교 컴퓨터공학부 소속 동아리 UPnL에서 개발된 파일 공유 프로그램으로, 간편한 방식으로 하드웨어의 파일을 공유할 수 있는 프로그램입니다.

베리즈 웹쉐어는 현재 저작권상의 문제로 배포 중지(11년 3월 6일) 되어있는 상태입니다.

따라서 최종 배포 버전인 `WebShare0.952Rev1187`를 기준으로, 사용자 편의성에 중점을 둔 스킨을 개발하고자 하였습니다.

자세한 개발일지와 업데이트 정보는 [티스토리 블로그](http://senakriel.tistory.com/category/%EA%B0%9C%EC%9D%B8%ED%99%9C%EB%8F%99/%EC%B7%A8%EB%AF%B8%EA%B0%9C%EB%B0%9C)를 참조해 주시기 바랍니다.

##기본 기능

* `ASX Streaming` - 베리즈 웹쉐어로 공유된 파일을 `.asx` 재생목록 파일로 저장할 수 있습니다.
* `RAR Download` - 여러개의 파일 혹은 폴더를 `.rar` 확장자로 압축하여 다운로드 할 수 있습니다.
* ~~File Uploa` - 베리즈 웹쉐어의 공유된 폴더에 파일을 업로드 할 수 있습니다.~~
* ~~File Name Change - 공유된 파일의 이름을 변경할 수 있습니다.~~
* ~~File Delete - 공유된 파일을 디스크에서 삭제할 수 있습니다.~~

베리즈 웹쉐어의 기본기능과 관련된 부분 중, File을 다루는 부분을 스킨 제작 과정에서 누락시켰습니다. 이는 스킨을 서비스 제공자 관점으로 바라보아, File을 베리즈 웹쉐어 단에서 다루지 않고 FTP를 활용하여 다루는 것을 전제로 하기 때문입니다.

FTP 서버 구축에 관한 자료는 [이쪽](http://senakriel.tistory.com/category/Windows%2010/FTP%20Server)을 참조해 주시기 바랍니다.

##추가 기능
* `Mp3 Player`(미구현) - 공유된 `.mp3` 파일을 스트리밍 방식으로 감상할 수 있는 기능입니다.
* `Mp4 Player`(미구현) - 공유된 `.mp4` 파일을 스트리밍 방식으로 재생할 수 있는 기능입니다.
* `Image Viewer`(미구현) - 같은 폴더 내의 이미지파일을 한 페이지에 모아서 볼 수 있는 기능입니다.

##적용 방법
1. Github 메뉴의 `Clone or download` -> `Download ZIP`을 클릭하거나, [`Releases`](https://github.com/senakriel/Responsive_Berryz_Skin/releases) 된 스킨파일을 선택하여 파일을 저장합니다.
2. 다운로드 된 압축파일의 내용을 `.\WebShare0.952Rev1187\Skin\Responsive_Berryz_Skin`과 같은 방식으로 디렉토리에 복사합니다.
3. 베리즈 웹쉐어를 실행하여 `환경설정` -> `스킨` 탭에서 방금 추가한 `Responsive_Berryz_Skin` 항목을 선택하고 확인을 클릭합니다.

##개발 환경
* `Windows 10`
* `Chrome browser`

##사용 언어
* `Berryz Webshare Skin Markup` - [Wiki](https://github.com/senakriel/Responsive_Berryz_Skin/wiki/Berryz-Webshare-Skin-Markup) 참조
* `HTML5`, `CSS3`, `Javascript`

문의 사항은 `senakriel@gmail.com`으로 연락해 주세요.