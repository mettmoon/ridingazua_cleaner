var toggleButton = document.getElementById("toggleUI");
toggleButton.addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => {
            let isDisplayed = document.querySelector('#div-right-top').style.display != 'none';
            let targetValue = isDisplayed ? 'none' : '';
            /// 우상단 요 제
            document.querySelector('#div-right-top').style.display = targetValue;
            let buttonsInChartElement = document.querySelector('#div-chart .children-spacing');

            /// 맵 흐리게
            let children = document.querySelector('#div-map .gm-style').querySelectorAll('div')[0].querySelectorAll('div')[0].children;
            let mapLayer = children[children.length - 1];
            mapLayer.style["opacity"]= isDisplayed ? 0.7 : 1;


            /// 우 하단, 단축키, 약관 등
            const gmStyleChildren = document.querySelector('.gm-style').children;
            const footerLayer = gmStyleChildren[gmStyleChildren.length - 1];
            footerLayer.style.display = targetValue;

            if (buttonsInChartElement != null) {
                /// 고도표 안, 우상단 버튼 목록 제거
                buttonsInChartElement.style.display = targetValue;
                const mapElement = document.querySelector('#div-map');
                const value = isDisplayed ? -40 : 40;
                let mapBottomInset = parseInt(mapElement.style.bottom);
                mapElement.style.bottom = `${mapBottomInset + value}px`;
                const chartContainerElement = document.querySelector('#div-chart');
                let chartContainerHeight = parseInt(chartContainerElement.style.height);
                chartContainerElement.style.height = `${chartContainerHeight + value}px`;

                let chartElement = chartContainerElement.children[0].children[chartContainerElement.children[0].children.length - 1];
                chartElement.style.inset = `${50 + (isDisplayed ? -40 : 0)}px 0px 0px 0px`;

                /// 우 하단 버튼 목록 제거
                document.querySelector('#div-chart .ns-resize.center').style.display = targetValue;
                /// 우 하단 버튼 목록 제거
                document.querySelector('#div-chart .children-spacing').style.display = targetValue;

            }

            /// 우 하단 버튼 목록 제거
            document.querySelector('#div-right-bottom').style.display = targetValue;
            /// 스트리트 뷰 
            document.querySelector('.gm-svpc').style.display = targetValue;
        }
    });
});