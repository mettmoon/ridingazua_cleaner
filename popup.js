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
        const value = isDisplayed ? 40 : -40;
        let mapBottomInset = parseInt(mapElement.style.bottom);
        mapElement.style.bottom = `${mapBottomInset + value}px`;
        const chartContainerElement = document.querySelector('#div-chart');
        let chartContainerHeight = parseInt(chartContainerElement.style.height);
        chartContainerElement.style.height = `${chartContainerHeight + value}px`;

        let chartElement = chartContainerElement.children[0].children[chartContainerElement.children[0].children.length - 1];
        chartElement.style.inset = `${50 + (isDisplayed ? 0 : -40)}px 0px 0px 0px`;

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

var toggleButton = document.getElementById("toggleUI");
toggleButton.addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
            let isDisplayed = document.querySelector('#div-right-top').style.display != 'none';
            // let isDisplay = doDisplay == null ? !isDisplayed : doDisplay;
            let isDisplay = !isDisplayed;
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
                const value = isDisplayed ? 40 : -40;
                let mapBottomInset = parseInt(mapElement.style.bottom);
                mapElement.style.bottom = `${mapBottomInset + value}px`;
                const chartContainerElement = document.querySelector('#div-chart');
                let chartContainerHeight = parseInt(chartContainerElement.style.height);
                chartContainerElement.style.height = `${chartContainerHeight + value}px`;

                let chartElement = chartContainerElement.children[0].children[chartContainerElement.children[0].children.length - 1];
                chartElement.style.inset = `${50 + (isDisplayed ? 0 : -40)}px 0px 0px 0px`;

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
    })
        .then(injectionResults => {
            for (const { frameId, result } of injectionResults) {
                console.log(`Frame ${frameId} result:`, result);
            }
            chrome.action.setBadgeText({
                tabId: tab.id,
                text: injectionResults[0].result ? "" : "ON"
            });
        })
        ;
});