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
            if (buttonsInChartElement != null) {
                /// 고도표 안, 우상단 버튼 목록 제거
                buttonsInChartElement.style.display = targetValue;
                const mapElement = document.querySelector('#div-map');
                const value = isDisplayed ? -40 : 40;
                let mapBottomInset = parseInt(mapElement.style.bottom);
                mapElement.style.bottom = `${mapBottomInset + value}px`;
                const chartElement = document.querySelector('#div-chart');
                let chartHeight = parseInt(chartElement.style.bottom);
                chartElement.style.height = `${chartHeight + value}px`;

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