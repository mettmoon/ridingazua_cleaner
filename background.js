// 이 예제에선 특별한 background 기능은 없어도 되지만, 빈 파일이라도 있어야 함

chrome.action.onClicked.addListener(function (tab) {
    onClicked(tab);
});

function setUIDisplay(doDisplay) {
    let isDisplayed = document.querySelector('#div-right-top').style.display != 'none';
    let isDisplay = doDisplay == null ? !isDisplayed : doDisplay;
    let targetDisplayStyle = isDisplay ? 'block' : 'none';
    /// 우상단 요소 제거
    document.querySelector('#div-right-top').style.display = targetDisplayStyle;
    let buttonsInChartElement = document.querySelector('#div-chart .children-spacing');

    /// 맵 흐리게
    let children = document.querySelector('#div-map .gm-style').querySelectorAll('div')[0].querySelectorAll('div')[0].children;
    let mapLayer = children[children.length - 1];
    mapLayer.style["opacity"] = isDisplay ? 1 : 0.8;


    /// 우 하단, 단축키, 약관 등
    const gmStyleChildren = document.querySelector('.gm-style').children;
    const footerLayer = gmStyleChildren[gmStyleChildren.length - 1];
    footerLayer.style.display = targetDisplayStyle;

    if (buttonsInChartElement != null) {
        /// 고도표 안, 우상단 버튼 목록 제거
        buttonsInChartElement.style.display = targetDisplayStyle;
        const mapElement = document.querySelector('#div-map');
        let mapBottomInset = parseInt(mapElement.style.bottom);
        mapBottomInset += isDisplay ? 40 : -40;
        mapElement.style.bottom = `${mapBottomInset}px`;
        const chartContainerElement = document.querySelector('#div-chart');
        let chartContainerHeight = parseInt(chartContainerElement.style.height);
        chartContainerHeight += isDisplay ? 40 : -40;
        chartContainerElement.style.height = `${chartContainerHeight}px`;

        let chartElement = chartContainerElement.children[0].children[chartContainerElement.children[0].children.length - 1];
        chartElement.style.inset = `${50 + (isDisplay ? 0 : -40)}px 0px 0px 0px`;

        /// 우 하단 버튼 목록 제거
        document.querySelector('#div-chart .ns-resize.center').style.display = targetDisplayStyle;
        /// 우 하단 버튼 목록 제거
        document.querySelector('#div-chart .children-spacing').style.display = targetDisplayStyle;

    }

    /// 우 하단 버튼 목록 제거
    document.querySelector('#div-right-bottom').style.display = targetDisplayStyle;
    /// 스트리트 뷰 
    document.querySelector('.gm-svpc').style.display = targetDisplayStyle;

    return isDisplay
}

function onClicked(tab) {

    const root = chrome.runtime.getURL('');
    const tabid = tab.id;
    console.log(tabid);
    if (tab.url && tab.url.startsWith(root)
        || tab.url && tab.url.startsWith("chrome://")
        || tab.url && tab.url.startsWith("https://chrome.google.com/")) {
        chrome.tabs.sendMessage(tab.id, {
            cmd: 'close'
        });
        return;
    }

    if (!tab.url.startsWith("https://ridingazua.cc/")) {
        console.log("https://ridingazua.cc/ 에서만 실행 가능합니다");
        return;
    }

    chrome.scripting.executeScript({
        target: {
            tabId: tabid,
        },
        func: setUIDisplay
    }).then(injectionResults => {
        for (const { frameId, result } of injectionResults) {
            console.log(`Frame ${frameId} result:`, result);
        }
        chrome.action.setBadgeText({
            tabId: tabid,
            text: injectionResults[0].result ? "" : "ON"
        });

        const target = document.getElementsByClassName("h-100")[0];

        html2canvas(target, {
            useCORS: true, // 외부 이미지 쓸 경우
            allowTaint: false
          }).then(canvas => {
            const link = document.createElement("a");
            link.href = canvas.toDataURL("image/png");
            link.download = "capture.png";
            document.body.appendChild(link); // iOS 대응
            link.click();
            document.body.removeChild(link); // 깔끔하게 제거
          });
    

    });


}

