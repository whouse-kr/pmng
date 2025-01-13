let currentSlide = 1;
const totalSlides = 10;


const slides = [
    `
<div class="bg-blue-600 flex flex-col h-screen">
    <div class="flex-grow flex flex-col items-center justify-center px-8">
        <h2 class="text-4xl font-bold text-white mb-16 text-center" style="font-size: 2.5rem;"> NH증권 영업직무 AI 비즈니스솔루션 과정</h2>
        <div class="text-center mb-16">
            <h1 class="text-6xl font-bold text-white mb-8" style="font-size: 3rem;">실습 프롬프트</h1>
            <!-- 
            Add Export JSON button 
            <button onclick="extractSlideData()" class="px-4 py-2 bg-white text-blue-600 rounded hover:bg-blue-100 transition-colors">
                Export JSON
            </button>
            -->
        </div>
    </div>
</div>
    `,
    `
<div class="bg-blue-600 flex flex-col h-screen">
    <h2 class="text-4xl font-bold text-white mb-4 px-8 pt-4 text-center mb-8 mt-4" style="font-size: 2.5rem;">챗GPT를 이용한 금융시장조사 및 트렌드 분석</h2>
    <div class="flex-grow overflow-auto">
        <div class="space-y-6 px-8">
            <div class="bg-white p-6 rounded-lg shadow-md">
                <div class="space-y-6">
                    <div class="flex items-stretch">
                        <div class="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 flex-shrink-0 self-start text-xl" style="font-size: 1.5rem; width: 3rem; height: 3rem;">1</div>
                        <div class="flex-grow">
                            <p class="mb-2 text-lg" style="font-size: 1.25rem;">첨부한 문서는 NH투자증권에서 발행한 애널리스트 보고서 입니다.<br>첨부 문서에서 언급한 주요 트렌드를 분석하세요.<br>이 과정에서 핵심 키워드, 주요 이슈, 섹터 전망, 해당 섹터의 기회와 위협 요소를 요약해서 정리하세요.<br>한국어로 답변하세요</p>
                        </div>
                        <div class="flex-shrink-0 ml-4 h-full">
                            <button class="copy-button px-6 py-4 rounded bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 focus:outline-none transition-colors duration-200 ease-in-out flex flex-col items-center justify-center h-full text-xl" style="font-size: 1.5rem; padding: 1rem 1.5rem;"
                                    data-copy-text="첨부한 문서는 NH투자증권에서 발행한 애널리스트 보고서 입니다.
첨부 문서에서 언급한 주요 트렌드를 분석하세요.
이 과정에서 핵심 키워드, 주요 이슈, 섹터 전망, 해당 섹터의 기회와 위협 요소를 요약해서 정리하세요.
한국어로 답변하세요">
                                <svg class="h-10 w-10 mb-2" style="width: 3rem; height: 3rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
                                복사하기
                            </button>
                        </div>
                    </div>
                    <div class="flex items-stretch">
                        <div class="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 flex-shrink-0 self-start text-xl" style="font-size: 1.5rem; width: 3rem; height: 3rem;">2</div>
                        <div class="flex-grow">
                            <p class="mb-2 text-lg" style="font-size: 1.25rem;">웹검색을 이용해서 향후 1년간 예상되는 섹터 핵심 트렌드를 정리하세요.<br>첨부한 문서에서 언급된 주요 이슈들의 실제 반영 가능성 및 그 외의 인사이트 내용을 더해주세요.<br>생각과정을 먼저 문서로 정리한 후 답변을 생성하세요.</p>
                        </div>
                        <div class="flex-shrink-0 ml-4 h-full">
                            <button class="copy-button px-6 py-4 rounded bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 focus:outline-none transition-colors duration-200 ease-in-out flex flex-col items-center justify-center h-full text-xl" style="font-size: 1.5rem; padding: 1rem 1.5rem;"
                                    data-copy-text="웹검색을 이용해서 향후 1년간 예상되는 섹터 핵심 트렌드를 정리하세요.
첨부한 문서에서 언급된 주요 이슈들의 실제 반영 가능성 및 그 외의 인사이트 내용을 더해주세요.
생각과정을 먼저 문서로 정리한 후 답변을 생성하세요.">
                                <svg class="h-10 w-10 mb-2" style="width: 3rem; height: 3rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
                                복사하기
                            </button>
                        </div>
                    </div>
                    <div class="flex items-stretch">
                        <div class="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 flex-shrink-0 self-start text-xl" style="font-size: 1.5rem; width: 3rem; height: 3rem;">3</div>
                        <div class="flex-grow">
                            <p class="mb-2 text-lg" style="font-size: 1.25rem;">향후 5년간 예상되는 장기적인 트렌드를 웹검색을 이용해 일목요연하게 정리하세요.</p>
                        </div>
                        <div class="flex-shrink-0 ml-4 h-full">
                            <button class="copy-button px-6 py-4 rounded bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 focus:outline-none transition-colors duration-200 ease-in-out flex flex-col items-center justify-center h-full text-xl" style="font-size: 1.5rem; padding: 1rem 1.5rem;"
                                    data-copy-text="향후 5년간 예상되는 장기적인 트렌드를 웹검색을 이용해 일목요연하게 정리하세요.">
                                <svg class="h-10 w-10 mb-2" style="width: 3rem; height: 3rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
                                복사하기
                            </button>
                        </div>
                    </div>
                </div>
                <div class="mt-6 text-base">
                    <p class="bg-yellow-100 p-3 rounded-lg text-black" style="font-size: 1.25rem;">다음 파일을 첨부하세요:<br>
                    실습파일 폴더 > 1. 챗GPT를 이용한 금융시장조사 및 트렌드 분석 > 240829_엔비디아_Comment_vF.pdf<br>
                    실습파일 폴더 > 1. 챗GPT를 이용한 금융시장조사 및 트렌드 분석 > NH투자증권_삼성전자_20240731213651.pdf</p>
                </div>
            </div>
        </div>
    </div>
</div>
    `,
    `
<div class="bg-blue-600 flex flex-col h-screen">
    <h2 class="text-4xl font-bold text-white mb-4 px-8 pt-4 text-center mb-8 mt-4" style="font-size: 2.5rem;">챗GPT를 이용한 고객 분류 및 페인포인트 분석</h2>
    <div class="flex-grow overflow-auto">
        <div class="space-y-6 px-8">
            <div class="bg-white p-6 rounded-lg shadow-md">
                <div class="space-y-6">
                    <div class="flex items-stretch">
                        <div class="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 flex-shrink-0 self-start text-xl" style="font-size: 1.5rem; width: 3rem; height: 3rem;">1</div>
                        <div class="flex-grow">
                            <p class="mb-2 text-lg" style="font-size: 1.25rem;">첨부한 파일은 자사 고객 데이터입니다.<br>고객 데이터에는 성별, 연령, 투자 성향, 금융 상품의 위험 구분, 적정 판매 여부, 상품 구분, 종목명, 총자산, 매입원가, 평가 금액 등의 정보가 포함되어 있습니다.<br>먼저 데이터를 분석하여 주요 고객 세그먼트를 정의해주세요.<br>이 세그먼트는 고객의 인구통계적 특성(성별, 연령), 투자 성향, 수익 률(평가금액/매입원가), 자산 규모, 금융 상품 위험 수준 등을 기반으로 구분합니다.<br>분석 결과에 따라 고객 세그먼트의 이름과 설명을 포함한 시트를 하나 생성해주세요.</p>
                        </div>
                        <div class="flex-shrink-0 ml-4 h-full">
                            <button class="copy-button px-6 py-4 rounded bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 focus:outline-none transition-colors duration-200 ease-in-out flex flex-col items-center justify-center h-full text-xl" style="font-size: 1.5rem; padding: 1rem 1.5rem;"
                                    data-copy-text="첨부한 파일은 자사 고객 데이터입니다.
고객 데이터에는 성별, 연령, 투자 성향, 금융 상품의 위험 구분, 적정 판매 여부, 상품 구분, 종목명, 총자산, 매입원가, 평가 금액 등의 정보가 포함되어 있습니다.
먼저 데이터를 분석하여 주요 고객 세그먼트를 정의해주세요.
이 세그먼트는 고객의 인구통계적 특성(성별, 연령), 투자 성향, 수익 률(평가금액/매입원가), 자산 규모, 금융 상품 위험 수준 등을 기반으로 구분합니다.
분석 결과에 따라 고객 세그먼트의 이름과 설명을 포함한 시트를 하나 생성해주세요.">
                                <svg class="h-10 w-10 mb-2" style="width: 3rem; height: 3rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
                                복사하기
                            </button>
                        </div>
                    </div>
                    <div class="flex items-stretch">
                        <div class="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 flex-shrink-0 self-start text-xl" style="font-size: 1.5rem; width: 3rem; height: 3rem;">2</div>
                        <div class="flex-grow">
                            <p class="mb-2 text-lg" style="font-size: 1.25rem;">정의된 고객 세그먼트를 기존 고객 데이터에 반영해주세요.<br>고객 데이터에 '고객 세그먼트' 열을 추가하고, 각 고객에 맞는 세그먼트를 기록합니다.<br>이 데이터를 통합 엑셀 파일에 추가하여, 첫 번째 시트는 고객 세그먼트 정의 시트, 두 번째 시트는 고객 세그먼트가 포함된 고객 데이터 시트로 구성해주세요.</p>
                        </div>
                        <div class="flex-shrink-0 ml-4 h-full">
                            <button class="copy-button px-6 py-4 rounded bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 focus:outline-none transition-colors duration-200 ease-in-out flex flex-col items-center justify-center h-full text-xl" style="font-size: 1.5rem; padding: 1rem 1.5rem;"
                                    data-copy-text="정의된 고객 세그먼트를 기존 고객 데이터에 반영해주세요.
고객 데이터에 '고객 세그먼트' 열을 추가하고, 각 고객에 맞는 세그먼트를 기록합니다.
이 데이터를 통합 엑셀 파일에 추가하여, 첫 번째 시트는 고객 세그먼트 정의 시트, 두 번째 시트는 고객 세그먼트가 포함된 고객 데이터 시트로 구성해주세요.">
                                <svg class="h-10 w-10 mb-2" style="width: 3rem; height: 3rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
                                복사하기
                            </button>
                        </div>
                    </div>
                    <div class="flex items-stretch">
                        <div class="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 flex-shrink-0 self-start text-xl" style="font-size: 1.5rem; width: 3rem; height: 3rem;">3</div>
                        <div class="flex-grow">
                            <p class="mb-2 text-lg" style="font-size: 1.25rem;">첨부한 자사 판매 상품 데이터 이 데이터를 바탕으로 각 고객 세그먼트에 맞는 추천 상품과 설득 전략을 도출해주세요.<br>기존 고객 데이터 시트에 '추천 상품'과 '설득 전략' 열을 추가하여, 각 고객에 맞는 상품과 전략을 기록합니다.<br>
                            
                            이 최종 데이터를 기존 엑셀 파일에 통합하여,<br>고객 세그먼트 시트와 **고객 데이터 시트(고객 세그먼트, 추천 상품, 설득 전략이 포함된 형태)**로 구성된 단일 파일로 완성해주세요.</p>
                        </div>
                        <div class="flex-shrink-0 ml-4 h-full">
                            <button class="copy-button px-6 py-4 rounded bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 focus:outline-none transition-colors duration-200 ease-in-out flex flex-col items-center justify-center h-full text-xl" style="font-size: 1.5rem; padding: 1rem 1.5rem;"
                                    data-copy-text="첨부한 자사 판매 상품 데이터 이 데이터를 바탕으로 각 고객 세그먼트에 맞는 추천 상품과 설득 전략을 도출해주세요.
기존 고객 데이터 시트에 '추천 상품'과 '설득 전략' 열을 추가하여, 각 고객에 맞는 상품과 전략을 기록합니다.
이 최종 데이터를 기존 엑셀 파일에 통합하여,
고객 세그먼트 시트와 **고객 데이터 시트(고객 세그먼트, 추천 상품, 설득 전략이 포함된 형태)**로 구성된 단일 파일로 완성해주세요.">
                                <svg class="h-10 w-10 mb-2" style="width: 3rem; height: 3rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
                                복사하기
                            </button>
                        </div>
                    </div>
                </div>
                <div class="mt-6 text-base">
                    <p class="bg-yellow-100 p-3 rounded-lg text-black" style="font-size: 1.25rem;">다음 파일을 첨부하세요:<br>
                    실습파일 폴더 > 5. 챗GPT를 이용한 고객분류 및 페인포인트 분석 > 판매상품_수정1003.xlsx<br>
                    실습파일 폴더 > 8. 고객성향별 상품 매칭 > Updated_고객투자성향및보유상품.xlsx</p>
                </div>
            </div>
        </div>
    </div>
</div>
    `, 
    `
<div class="bg-blue-600 flex flex-col h-screen">
    <h2 class="text-4xl font-bold text-white mb-4 px-8 pt-4 text-center mb-8 mt-4" style="font-size: 2.5rem;">이디오그램과 Canva로 이미지 생성</h2>
    <div class="flex-grow overflow-auto">
        <div class="space-y-6 px-8">
            <div class="bg-white p-6 rounded-lg shadow-md">
                <div class="space-y-6">
                    <div class="flex items-stretch">
                        <div class="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 flex-shrink-0 self-start text-xl" style="font-size: 1.5rem; width: 3rem; height: 3rem;">1</div>
                        <div class="flex-grow">
                            <div class="flex items-center mb-2">
                                <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                                    <img src="./images/chatgpt.png" alt="ChatGPT" class="w-6 h-6">
                                </div>
                                <span class="text-xl font-bold">ChatGPT</span>
                            </div>
                            <p class="mb-2 text-lg" style="font-size: 1.25rem;">첨부된 파일은 NH투자증권의 로고 이미지입니다.<br>1. 이미지를 분석하여 브랜드 컬러를 추출하세요.<br>2. 추출된 브랜드 컬러를 바탕으로 '투자상품 고객 설명회 안내장' 배경 이미지 생성 프롬프트를 작성하세요.<br><br>다음의 지침을 따르세요.<br>- 프롬프트는 영어로 작성해 주세요.<br>- Dall-E 3을 사용한 이미지 출력은 필요하지 않습니다.</p>
                        </div>
                        <div class="flex-shrink-0 ml-4 h-full">
                            <button class="copy-button px-6 py-4 rounded bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 focus:outline-none transition-colors duration-200 ease-in-out flex flex-col items-center justify-center h-full text-xl" style="font-size: 1.5rem; padding: 1rem 1.5rem;"
                                    data-copy-text="첨부된 파일은 NH투자증권의 로고 이미지입니다.
1. 이미지를 분석하여 브랜드 컬러를 추출하세요.
2. 추출된 브랜드 컬러를 바탕으로 '투자상품 고객 설명회 안내장' 배경 이미지 생성 프롬프트를 작성하세요.

다음의 지침을 따르세요.
- 프롬프트는 영어로 작성해 주세요.
- Dall-E 3을 사용한 이미지 출력은 필요하지 않습니다.">
                                <svg class="h-10 w-10 mb-2" style="width: 3rem; height: 3rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
                                복사하기
                            </button>
                        </div>
                    </div>
                    <div class="flex items-stretch">
                        <div class="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 flex-shrink-0 self-start text-xl" style="font-size: 1.5rem; width: 3rem; height: 3rem;">2</div>
                        <div class="flex-grow">
                            <div class="flex items-center mb-2">
                                <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                                    <img src="./images/ideogram.png" alt="Ideogram" class="w-6 h-6">
                                </div>
                                <span class="text-xl font-bold">Ideogram</span>
                            </div>
                            <p class="mb-2 text-lg text-gray-500" style="font-size: 1.25rem;">(Ideogram에 접속하여 [Step1]에서 생성된 프롬프트를 사용하세요.) 또는 아래의 프롬프트를 사용하세요.</p>
                            <p class="mb-2 text-lg" style="font-size: 1.25rem;">Create a professional and inviting background image for a customer seminar invitation on investment products. The background should feature the colors yellow (#FFD100) and blue (#0072CE) prominently. Use smooth gradients and abstract shapes to convey trust and stability. The design should be modern and clean, with ample white space for text overlay. Incorporate subtle financial or investment-themed icons, like graphs, charts, or growth symbols, in a way that does not distract from the main content. The image should be suitable for both digital and print formats.</p>
                        </div>
                        <div class="flex-shrink-0 ml-4 h-full">
                            <button class="copy-button px-6 py-4 rounded bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 focus:outline-none transition-colors duration-200 ease-in-out flex flex-col items-center justify-center h-full text-xl" style="font-size: 1.5rem; padding: 1rem 1.5rem;"
                                    data-copy-text="Create a professional and inviting background image for a customer seminar invitation on investment products. The background should feature the colors yellow (#FFD100) and blue (#0072CE) prominently. Use smooth gradients and abstract shapes to convey trust and stability. The design should be modern and clean, with ample white space for text overlay. Incorporate subtle financial or investment-themed icons, like graphs, charts, or growth symbols, in a way that does not distract from the main content. The image should be suitable for both digital and print formats.">
                                <svg class="h-10 w-10 mb-2" style="width: 3rem; height: 3rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
                                복사하기
                            </button>
                        </div>
                    </div>
                </div>
                <div class="mt-6 text-base">
                    <p class="bg-yellow-100 p-3 rounded-lg text-black" style="font-size: 1.25rem;">다음 파일을 첨부하세요:<br>실습파일 폴더 > 9. NH투자증권 로고 > NH투자증권 logo.png</p>
                </div>
            </div>
        </div>
    </div>
</div>
    `,
    `
    <div class="bg-blue-600 flex flex-col h-screen">
        <h2 class="text-4xl font-bold text-white mb-4 px-8 pt-4 text-center mb-8 mt-4" style="font-size: 2.5rem;">GPT로 인터넷 정보에 기반한 회사 정보 요약 및 시나리오 작성</h2>
        <div class="flex-grow overflow-auto">
            <div class="space-y-6 px-8">
                <div class="bg-white p-6 rounded-lg shadow-md">
                    <div class="space-y-6">
                        <div class="flex items-stretch">
                            <div class="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 flex-shrink-0 self-start text-xl" style="font-size: 1.5rem; width: 3rem; height: 3rem;">1</div>
                            <div class="flex-grow">
                                <p class="mb-2 text-lg" style="font-size: 1.25rem;">웹 브라우징 기능을 사용하여 '<span class="text-blue-600">[원하는 기업명]</span>' 기업의 최신 정보를 수집하고,<br>해당 정보를 기반으로 기업이 가지고 있는 페인포인트, NH투자증권이 제안할 수 있는 가치, 솔루션을 도출하세요.<br>#한국어로 답변하세요.</p>
                            </div>
                            <div class="flex-shrink-0 ml-4 h-full">
                                <button class="copy-button px-6 py-4 rounded bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 focus:outline-none transition-colors duration-200 ease-in-out flex flex-col items-center justify-center h-full text-xl" style="font-size: 1.5rem; padding: 1rem 1.5rem;"
                                        data-copy-text="웹 브라우징 기능을 사용하여 '[원하는 기업명]' 기업의 최신 정보를 수집하고,
해당 정보를 기반으로 기업이 가지고 있는 페인포인트, NH투자증권이 제안할 수 있는 가치, 솔루션을 도출하세요.
#한국어로 답변하세요.">
                                    <svg class="h-10 w-10 mb-2" style="width: 3rem; height: 3rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
                                    복사하기
                                </button>
                            </div>
                        </div>
                        <div class="flex items-stretch">
                            <div class="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 flex-shrink-0 self-start text-xl" style="font-size: 1.5rem; width: 3rem; height: 3rem;">2</div>
                            <div class="flex-grow">
                                <p class="mb-2 text-lg" style="font-size: 1.25rem;">분석한 내용을 바탕으로, 해당 기업의 방문 목적을 설명하는 시나리오를 작성해주세요.<br>시나리오에는 기업의 현재 재무 상태, 투자 필요성, 그리고 NH투자증권이 제공할 수 있는 금융 솔루션과 가치 제안이 포함되어야 합니다.</p>
                            </div>
                            <div class="flex-shrink-0 ml-4 h-full">
                                <button class="copy-button px-6 py-4 rounded bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 focus:outline-none transition-colors duration-200 ease-in-out flex flex-col items-center justify-center h-full text-xl" style="font-size: 1.5rem; padding: 1rem 1.5rem;"
                                        data-copy-text="분석한 내용을 바탕으로, 해당 기업의 방문 목적을 설명하는 시나리오를 작성해주세요.
시나리오에는 기업의 현재 재무 상태, 투자 필요성, 그리고 NH투자증권이 제공할 수 있는 금융 솔루션과 가치 제안이 포함되어야 합니다.">
                                    <svg class="h-10 w-10 mb-2" style="width: 3rem; height: 3rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
                                    복사하기
                                </button>
                            </div>
                        </div>
                        <div class="flex items-stretch">
                            <div class="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 flex-shrink-0 self-start text-xl" style="font-size: 1.5rem; width: 3rem; height: 3rem;">3</div>
                            <div class="flex-grow">
                                <p class="mb-2 text-lg" style="font-size: 1.25rem;">해당 기업 방문시 상대기업의 예상질문 5개를 생성해주세요.</p>
                            </div>
                            <div class="flex-shrink-0 ml-4 h-full">
                                <button class="copy-button px-6 py-4 rounded bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 focus:outline-none transition-colors duration-200 ease-in-out flex flex-col items-center justify-center h-full text-xl" style="font-size: 1.5rem; padding: 1rem 1.5rem;"
                                        data-copy-text="해당 기업 방문시 상대기업의 예상질문 5개를 생성해주세요.">
                                    <svg class="h-10 w-10 mb-2" style="width: 3rem; height: 3rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
                                    복사하기
                                </button>
                            </div>
                        </div>
                        <div class="flex items-stretch">
                            <div class="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 flex-shrink-0 self-start text-xl" style="font-size: 1.5rem; width: 3rem; height: 3rem;">4</div>
                            <div class="flex-grow">
                                <p class="mb-2 text-lg" style="font-size: 1.25rem;">각 5개의 예상질문에 대한 명쾌한 답변을 근거를 포함해 작성하세요.</p>
                            </div>
                            <div class="flex-shrink-0 ml-4 h-full">
                                <button class="copy-button px-6 py-4 rounded bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 focus:outline-none transition-colors duration-200 ease-in-out flex flex-col items-center justify-center h-full text-xl" style="font-size: 1.5rem; padding: 1rem 1.5rem;"
                                        data-copy-text="각 5개의 예상질문에 대한 명쾌한 답변을 근거를 포함해 작성하세요.">
                                    <svg class="h-10 w-10 mb-2" style="width: 3rem; height: 3rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
                                    복사하기
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    `
    <div class="bg-blue-600 flex flex-col h-screen">
        <h2 class="text-4xl font-bold text-white mb-4 px-8 pt-4 text-center mb-8 mt-4" style="font-size: 2.5rem;">퍼플렉시티를 이용한 검색</h2>
        <div class="flex-grow overflow-auto">
            <div class="space-y-6 px-8">
                <div class="bg-white p-6 rounded-lg shadow-md">
                    <div class="space-y-6">
                        <div class="flex items-stretch mb-6">
                            <div class="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 flex-shrink-0 self-start text-xl" style="font-size: 1.5rem; width: 3rem; height: 3rem;">1</div>
                            <div class="flex-grow">
                                <div class="flex items-center mb-2">
                                    <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                                        <img src="./images/perplexity.png" alt="Perplexity" class="w-6 h-6">
                                    </div>
                                    <span class="text-xl font-bold">Perplexity</span>
                                </div>
                                <p class="mb-2 text-lg" style="font-size: 1.25rem;"><span class="text-blue-600">[트럼프 또는 해리스]</span>의 선거 공약 중에 <span class="text-blue-600">반도체 산업에 관련한 공약과 의견을 정리하세요.</span></p>
                            </div>
                            <div class="flex-shrink-0 ml-4 h-full">
                                <button class="copy-button px-6 py-4 rounded bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 focus:outline-none transition-colors duration-200 ease-in-out flex flex-col items-center justify-center h-full text-xl" style="font-size: 1.5rem; padding: 1rem 1.5rem;"
                                        data-copy-text="[트럼프 또는 해리스]의 선거 공약 중에 반도체 산업에 관련한 공약과 의견을 정리하세요.">
                                    <svg class="h-10 w-10 mb-2" style="width: 3rem; height: 3rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
                                    복사하기
                                </button>
                            </div>
                        </div>
                        <div class="flex items-stretch">
                            <div class="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 flex-shrink-0 self-start text-xl" style="font-size: 1.5rem; width: 3rem; height: 3rem;">2</div>
                            <div class="flex-grow">
                                <div class="flex items-center mb-2">
                                    <div class="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                                        <img src="./images/chatgpt.png" alt="ChatGPT" class="w-6 h-6">
                                    </div>
                                    <span class="text-xl font-bold">ChatGPT</span>
                                </div>
                                <p class="mb-2 text-lg" style="font-size: 1.25rem;">아래 내용을 바탕으로 한국 반도체 기업인 삼성전자와 SK하이닉스에 미칠 영향을 분석하세요.<br><span class="text-blue-600">[Step1에서 생성된 내용을 이곳에 붙여넣기해주세요.]</span></p>
                            </div>
                            <div class="flex-shrink-0 ml-4 h-full">
                                <button class="copy-button px-6 py-4 rounded bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 focus:outline-none transition-colors duration-200 ease-in-out flex flex-col items-center justify-center h-full text-xl" style="font-size: 1.5rem; padding: 1rem 1.5rem;"
                                        data-copy-text="아래 내용을 바탕으로 한국 반도체 기업인 삼성전자와 SK하이닉스에 미칠 영향을 분석하세요.
[Step1에서 생성된 내용을 이곳에 붙여넣기해주세요.]">
                                    <svg class="h-10 w-10 mb-2" style="width: 3rem; height: 3rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
                                    복사하기
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        `,
        `
    <div class="bg-blue-600 flex flex-col h-screen">
        <h2 class="text-4xl font-bold text-white mb-4 px-8 pt-4 text-center mb-8 mt-4" style="font-size: 2.5rem;">특정 주식 미래 가격 예측</h2>
        <div class="flex-grow overflow-auto">
            <div class="space-y-6 px-8">
                <div class="bg-white p-6 rounded-lg shadow-md">
                    <div class="space-y-6">
                        <div class="flex items-stretch">
                            <div class="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 flex-shrink-0 self-start text-xl" style="font-size: 1.5rem; width: 3rem; height: 3rem;">1</div>
                            <div class="flex-grow">
                                <p class="mb-2 text-lg" style="font-size: 1.25rem;">첨부한 파일은 NH투자증권에서 발행한 애널리스트 보고서입니다.<br>보고서를 읽고 최근 5년간 매출, 순이익 정보를 표로 정리해주세요.<br>#한국어로 답변하세요.</p>
                            </div>
                            <div class="flex-shrink-0 ml-4 h-full">
                                <button class="copy-button px-6 py-4 rounded bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 focus:outline-none transition-colors duration-200 ease-in-out flex flex-col items-center justify-center h-full text-xl" style="font-size: 1.5rem; padding: 1rem 1.5rem;"
                                        data-copy-text="첨부한 파일은 NH투자증권에서 발행한 애널리스트 보고서입니다.
보고서를 읽고 최근 5년간 매출, 순이익 정보를 표로 정리해주세요.
#한국어로 답변하세요.">
                                    <svg class="h-10 w-10 mb-2" style="width: 3rem; height: 3rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
                                    복사하기
                                </button>
                            </div>
                        </div>
                        <div class="flex items-stretch">
                            <div class="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 flex-shrink-0 self-start text-xl" style="font-size: 1.5rem; width: 3rem; height: 3rem;">2</div>
                            <div class="flex-grow">
                                <p class="mb-2 text-lg" style="font-size: 1.25rem;">PER을 20, 25, 30을 적용해서 연도별 시가총액을 예측하고 과거 5년, 향후 3년에 대한 주가차트를 그려주세요.</p>
                            </div>
                            <div class="flex-shrink-0 ml-4 h-full">
                                <button class="copy-button px-6 py-4 rounded bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 focus:outline-none transition-colors duration-200 ease-in-out flex flex-col items-center justify-center h-full text-xl" style="font-size: 1.5rem; padding: 1rem 1.5rem;"
                                        data-copy-text="PER을 20, 25, 30을 적용해서 연도별 시가총액을 예측하고 과거 5년, 향후 3년에 대한 주가차트를 그려주세요.">
                                    <svg class="h-10 w-10 mb-2" style="width: 3rem; height: 3rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
                                    복사하기
                                </button>
                            </div>
                        </div>
                        <div class="flex items-stretch">
                            <div class="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 flex-shrink-0 self-start text-xl" style="font-size: 1.5rem; width: 3rem; height: 3rem;">3</div>
                            <div class="flex-grow">
                                <p class="mb-2 text-lg" style="font-size: 1.25rem;">매출 평균 성장율과 평균 순이익율을 계산하고 향후 3년간의 매출과 순이익을 예측해서 표 형식으로 작성해주세요.<br>사용할 수 있는 예측기법을 5가지 생각한 후, 상황에 맞는 예측기법을 선택하세요.</p>
                            </div>
                            <div class="flex-shrink-0 ml-4 h-full">
                                <button class="copy-button px-6 py-4 rounded bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 focus:outline-none transition-colors duration-200 ease-in-out flex flex-col items-center justify-center h-full text-xl" style="font-size: 1.5rem; padding: 1rem 1.5rem;"
                                        data-copy-text="매출 평균 성장율과 평균 순이익율을 계산하고 향후 3년간의 매출과 순이익을 예측해서 표 형식으로 작성해주세요.
사용할 수 있는 예측기법을 5가지 생각한 후, 상황에 맞는 예측기법을 선택하세요.">
                                    <svg class="h-10 w-10 mb-2" style="width: 3rem; height: 3rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
                                    복사하기
                                </button>
                            </div>
                        </div>
                        <div class="flex items-stretch">
                            <div class="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 flex-shrink-0 self-start text-xl" style="font-size: 1.5rem; width: 3rem; height: 3rem;">4</div>
                            <div class="flex-grow">
                                <p class="mb-2 text-lg" style="font-size: 1.25rem;">현재 주가를 검색하고, 미래 가격을 예측해서 표로 정리해주세요.</p>
                            </div>
                            <div class="flex-shrink-0 ml-4 h-full">
                                <button class="copy-button px-6 py-4 rounded bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 focus:outline-none transition-colors duration-200 ease-in-out flex flex-col items-center justify-center h-full text-xl" style="font-size: 1.5rem; padding: 1rem 1.5rem;"
                                        data-copy-text="현재 주가를 검색하고, 미래 가격을 예측해서 표로 정리해주세요.">
                                <svg class="h-10 w-10 mb-2" style="width: 3rem; height: 3rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
                                복사하기
                            </button>
                        </div>
                    </div>
                </div>
                <div class="mt-6 text-base">
                    <p class="bg-yellow-100 p-3 rounded-lg text-black" style="font-size: 1.25rem;">다음 파일을 첨부하세요:<br>
                    실습파일 폴더 > 1. 챗GPT를 이용한 금융시장조사 및 트렌드 분석 > NH투자증권_삼성전자_20240731213651.pdf</p>
                </div>
            </div>
        </div>
    </div>
</div>
    `,
    `
    <div class="bg-blue-600 flex flex-col h-screen">
        <h2 class="text-4xl font-bold text-white mb-4 px-8 pt-4 text-center mb-8 mt-4" style="font-size: 2.5rem;">투자분야 유튜버 영상 요약 및 분석 자동화</h2>
        <div class="flex-grow overflow-auto">
            <div class="space-y-6 px-8">
                <div class="bg-white p-6 rounded-lg shadow-md">
                    <div class="space-y-6">
                        <div class="flex items-stretch">
                            <div class="flex-grow">
                                <p class="mb-2 text-lg" style="font-size: 1.25rem;">아래의 내용은 고객이 신뢰하는 투자조언 유튜버의 영상을 텍스트로 변환한 스크립트입니다.<br>제공된 영상을 요약하고, 유튜버의 투자 의견을 '추천', '관망', '비추천' 중 하나로 분류해 주세요.<br>또한 그 근거(타임스탬프 포함)를 상세히 정리해 주세요.</p>
                                <p class="mb-2 text-lg" style="font-size: 1.25rem;">--------</p>
                                <p class="mb-2 text-lg" style="font-size: 1.25rem;">내용: <span class="text-blue-600">[여기에 영상 내용 입력]</span></p>
                            </div>
                            <div class="flex-shrink-0 ml-4 h-full">
                                <button class="copy-button px-6 py-4 rounded bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 focus:outline-none transition-colors duration-200 ease-in-out flex flex-col items-center justify-center h-full text-xl" style="font-size: 1.5rem; padding: 1rem 1.5rem;"
                                        data-copy-text="아래의 내용은 고객이 신뢰하는 투자조언 유튜버의 영상을 텍스트로 변환한 스크립트입니다.
제공된 영상을 요약하고, 유튜버의 투자 의견을 '추천', '관망', '비추천' 중 하나로 분류해 주세요.
또한 그 근거(타임스탬프 포함)를 상세히 정리해 주세요.

--------
내용: [여기에 영상 내용 입력]">
                                    <svg class="h-10 w-10 mb-2" style="width: 3rem; height: 3rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
                                    복사하기
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="mt-6 text-base">
                        <div class="bg-gray-100 p-3 rounded-lg mb-4">
                            <p class="text-lg" style="font-size: 1.25rem;">예시 영상: <a href="https://www.youtube.com/watch?v=RxF8qkECv78" target="_blank" class="text-blue-600 hover:text-blue-800 underline">https://www.youtube.com/watch?v=RxF8qkECv78</a></p>
                        </div>
                        <p class="bg-yellow-100 p-3 rounded-lg text-black" style="font-size: 1.25rem;">코스닥 주식시황, 나스닥 주식시황, 미국 주식시황 등의 키워드로 유튜브에서 영상을 탐색해보세요.<br><a href="https://downsub.com/" target="_blank" class="text-blue-600 hover:text-blue-800 underline">https://downsub.com/</a> 사이트에서 분석할 영상의 스크립트(srt 파일)를 다운로드 하고, 메모장으로 열어 내용을 복사 & 붙여넣기 해주세요.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    `
    <div class="bg-blue-600 flex flex-col h-screen">
        <h2 class="text-4xl font-bold text-white mb-4 px-8 pt-4 text-center mb-8 mt-4" style="font-size: 2.5rem;">고배당 미국 ETF 추천 영업 시나리오 제작하기</h2>
        <div class="flex-grow overflow-auto">
            <div class="space-y-6 px-8">
                <div class="bg-white p-6 rounded-lg shadow-md">
                    <div class="space-y-6">
                        <div class="flex items-stretch">
                            <div class="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 flex-shrink-0 self-start text-xl" style="font-size: 1.5rem; width: 3rem; height: 3rem;">1</div>
                            <div class="flex-grow">
                                <p class="mb-2 text-lg" style="font-size: 1.25rem;">첨부된 파일에는 고배당 미국 ETF의 최신 상품 정보와 고객의 투자 성향 데이터가 담겨 있습니다.<br>-고배당 미국 ETF 시장의 흐름을 탐구하고, 고객의 투자 성향(공격형, 중립형, 보수형)에 따라 시장에서의 주요 관심사를 정리하세요.<br><br>#한국어로 답변하세요.</p>
                            </div>
                            <div class="flex-shrink-0 ml-4 h-full">
                                <button class="copy-button px-6 py-4 rounded bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 focus:outline-none transition-colors duration-200 ease-in-out flex flex-col items-center justify-center h-full text-xl" style="font-size: 1.5rem; padding: 1rem 1.5rem;"
                                        data-copy-text="첨부된 파일에는 고배당 미국 ETF의 최신 상품 정보와 고객의 투자 성향 데이터가 담겨 있습니다.
-고배당 미국 ETF 시장의 흐름을 탐구하고, 고객의 투자 성향(공격형, 중립형, 보수형)에 따라 시장에서의 주요 관심사를 정리하세요.

#한국어로 답변하세요.">
                                    <svg class="h-10 w-10 mb-2" style="width: 3rem; height: 3rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
                                    복사하기
                                </button>
                            </div>
                        </div>
                        <div class="flex items-stretch">
                            <div class="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 flex-shrink-0 self-start text-xl" style="font-size: 1.5rem; width: 3rem; height: 3rem;">2</div>
                            <div class="flex-grow">
                                <p class="mb-2 text-lg" style="font-size: 1.25rem;">각 투자 성향(공격형, 중립형, 보수형)별로 펀드 투자 제안에 대한 예상 질문 5가지와 답변을 작성해 주세요.</p>
                            </div>
                            <div class="flex-shrink-0 ml-4 h-full">
                                <button class="copy-button px-6 py-4 rounded bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 focus:outline-none transition-colors duration-200 ease-in-out flex flex-col items-center justify-center h-full text-xl" style="font-size: 1.5rem; padding: 1rem 1.5rem;"
                                        data-copy-text="각 투자 성향(공격형, 중립형, 보수형)별로 펀드 투자 제안에 대한 예상 질문 5가지와 답변을 작성해 주세요.">
                                <svg class="h-10 w-10 mb-2" style="width: 3rem; height: 3rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
                                복사하기
                            </button>
                        </div>
                    </div>
                    <div class="flex items-stretch">
                        <div class="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold mr-4 flex-shrink-0 self-start text-xl" style="font-size: 1.5rem; width: 3rem; height: 3rem;">3</div>
                        <div class="flex-grow">
                            <p class="mb-2 text-lg" style="font-size: 1.25rem;">각 투자 성향별로 맞춤형 세일즈 시나리오를 완성해 주세요.</p>
                        </div>
                        <div class="flex-shrink-0 ml-4 h-full">
                            <button class="copy-button px-6 py-4 rounded bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 focus:outline-none transition-colors duration-200 ease-in-out flex flex-col items-center justify-center h-full text-xl" style="font-size: 1.5rem; padding: 1rem 1.5rem;"
                                    data-copy-text="각 투자 성향별로 맞춤형 세일즈 시나리오를 완성해 주세요.">
                                <svg class="h-10 w-10 mb-2" style="width: 3rem; height: 3rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
                                복사하기
                            </button>
                        </div>
                    </div>
                </div>
                <div class="mt-6 text-base">
                    <p class="bg-yellow-100 p-3 rounded-lg text-black" style="font-size: 1.25rem;">다음 파일을 첨부하세요:<br>
                    실습파일 폴더 > 6. 고배당 미국 ETF 추천 > 240911_한미일 고배당 ETF.xlsx<br>
                    실습파일 폴더 > 8. 고객성향별 상품 매칭 > Updated_고객투자성향및보유상품.xlsx</p>
                </div>
            </div>
        </div>
    </div>
</div>
    `,
    `
    <div class="bg-blue-600 flex flex-col h-screen">
        <h2 class="text-4xl font-bold text-white mb-4 px-8 pt-4 text-center mb-8 mt-4" style="font-size: 2.5rem;">GPTs의 이해 및 실무 챗봇 제작</h2>
        <div class="flex-grow overflow-auto">
            <div class="space-y-6 px-8">
                <div class="bg-white p-6 rounded-lg shadow-md">
                    <div class="space-y-6">
                        <div class="flex items-stretch">
                            <div class="flex-grow">
                                <h3 class="text-2xl font-bold mb-4">Role</h3>
                                <p class="mb-2 text-lg" style="font-size: 1.25rem;">당신은 기업 분석 전문가입니다.<br>당신은 기업의 재무 정보와 뉴스를 분석하여 기업에 대한 정보를 일목요연하게 정리합니다.</p>
                                
                                <h3 class="text-2xl font-bold mb-4 mt-6">Objective</h3>
                                <p class="mb-2 text-lg" style="font-size: 1.25rem;">사용자가 제시한 기업명에 대한 분석 보고서를 아래의 형식으로 작성해주세요.<br>가독성이 좋은 글머리를 이용하고 구성 요소별 다른 폰트 크기를 적용해 일목요연하게 작성해 주세요.</p>
                                
                                <h4 class="text-xl font-bold mb-2">1. 회사 개요</h4>
                                <ul class="list-disc list-inside space-y-2 text-lg" style="font-size: 1.25rem;">
                                    <li>사업 포트폴리오에 대한 상세한 설명</li>
                                    <li>최근 1년 내 회사 동향 (주요 사건, 신제품 출시 등)</li>
                                </ul>
                                
                                <h4 class="text-xl font-bold mb-2 mt-4">2. 산업 분석</h4>
                                <ul class="list-disc list-inside space-y-2 text-lg" style="font-size: 1.25rem;">
                                    <li>시장 환경</li>
                                    <li>주요 경쟁사 및 시장 위치</li>
                                    <li>산업 동향 및 전망</li>
                                </ul>
                                
                                <h4 class="text-xl font-bold mb-2 mt-4">3. 재무 분석</h4>
                                <ul class="list-disc list-inside space-y-2 text-lg" style="font-size: 1.25rem;">
                                    <li>재무 상태</li>
                                    <li>실적</li>
                                </ul>
                            </div>
                            <div class="flex-shrink-0 ml-4 h-full">
                                <button class="copy-button px-6 py-4 rounded bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 focus:outline-none transition-colors duration-200 ease-in-out flex flex-col items-center justify-center h-full text-xl" style="font-size: 1.5rem; padding: 1rem 1.5rem;"
                                        data-copy-text="# Role
당신은 기업 분석 전문가입니다. 
당신은 기업의 재무 정보와 뉴스를 분석하여 기업에 대한 정보를 일목요연하게 정리합니다.

# Objective
사용자가 제시한 기업명에 대한 분석 보고서를 아래의 형식으로 작성해주세요.
가독성이 좋은 글머리를 이용하고 구성 요소별 다른 폰트 크기를 적용해 일목요연하게 작성해 주세요.

1. 회사 개요
- 사업 포트폴리오에 대한 상세한 설명
- 최근 1년 내 회사 동향 (주요 사건, 신제품 출시 등)

2. 산업 분석
- 시장 환경
- 주요 경쟁사 및 시장 위치
- 산업 동향 및 전망

3. 재무 분석
- 재무 상태
- 실적">
                                    <svg class="h-10 w-10 mb-2" style="width: 3rem; height: 3rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
                                    복사하기
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
        `
    ];

// 슬라이드 제목 추출 함수
function extractSlideTitle(slideContent) {
    const titleMatch = slideContent.match(/<h2[^>]*>(.*?)<\/h2>/);
    return titleMatch ? titleMatch[1] : `슬라이드 ${i}`;
}

// 복사 버튼 이벤트 리스너 설정 함수
function setupCopyButtons() {
    const copyButtons = document.querySelectorAll('.copy-button');
    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const textToCopy = button.getAttribute('data-copy-text');
            copyToClipboard(textToCopy, button);
        });
    });
}

// 슬라이드 로드 함수 수정
function loadSlide(slideNumber) {
    console.log(`Loading slide ${slideNumber}`);
    const slideContent = slides[slideNumber - 1]; // 배열은 0부터 시작하므로 1을 빼줍니다
    if (slideContent) {
        // 여기서 제목과 본문의 여백을 늘리고 제목을 가운데 정렬합니다
        const modifiedContent = slideContent.replace(
            /<h2 class="(.*?)"/,
            '<h2 class="$1 text-center mb-8 mt-4"'
        );
        document.getElementById('slide').innerHTML = modifiedContent;
        console.log(`Slide ${slideNumber} content loaded`);
        setupCopyButtons(); // 슬라이드 로드 후 복사 버튼 설정
        updateSlideList(); // 슬라이드 로드 후 목차 업데이트
    } else {
        console.log(`Slide ${slideNumber} not found`);
        document.getElementById('slide').innerHTML = `
            <div class="flex items-center justify-center h-screen">
                <p style="font-size: 1.5rem;">Error: Slide ${slideNumber} not found</p>
            </div>
        `;
    }
}

// 복사 기능 추가
function copyToClipboard(text, buttonElement) {
    navigator.clipboard.writeText(text).then(() => {
        // 팝업 생성
        const popup = document.createElement('div');
        popup.innerHTML = `
            <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
            </svg>
            <span style="font-size: 1.5rem;">복사됨!</span>
        `;
        popup.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 20px 40px;
            border-radius: 10px;
            font-size: 24px;
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 15px;
        `;
        document.body.appendChild(popup);

        // 애니메이션 위한 스타일 추가
        const style = document.createElement('style');
        style.textContent = `
            .checkmark {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: block;
                stroke-width: 2;
                stroke: #fff;
                stroke-miterlimit: 10;
                box-shadow: inset 0px 0px 0px #7ac142;
                animation: fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both;
            }
            .checkmark__circle {
                stroke-dasharray: 166;
                stroke-dashoffset: 166;
                stroke-width: 2;
                stroke-miterlimit: 10;
                stroke: #7ac142;
                fill: none;
                animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
            }
            .checkmark__check {
                transform-origin: 50% 50%;
                stroke-dasharray: 48;
                stroke-dashoffset: 48;
                animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
            }
            @keyframes stroke {
                100% {
                    stroke-dashoffset: 0;
                }
            }
            @keyframes fill {
                100% {
                    box-shadow: inset 0px 0px 0px 30px #7ac142;
                }
            }
            @keyframes scale {
                0%, 100% {
                    transform: none;
                }
                50% {
                    transform: scale3d(1.1, 1.1, 1);
                }
            }
        `;
        document.head.appendChild(style);

        // 2초 후 팝업 제거
        setTimeout(() => {
            document.body.removeChild(popup);
            document.head.removeChild(style);
        }, 2000);
    }).catch(err => {
        console.error('복사 실패:', err);
        alert('복사에 실패했습니다.');
    });
}

// 초기 슬라이드 로드 및 이벤트 리스너 설정
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, loading initial slide');
    loadSlide(currentSlide);
    updateSlideList(); // 목차 업데이트
    setupCopyButtons(); // 초기 로드 시 복사 버튼 설정
});

// document.getElementById('prevSlide').addEventListener('click', () => {
//     console.log('Previous slide button clicked');
//     if (currentSlide > 1) {
//         currentSlide--;
//         loadSlide(currentSlide);
//     }
// });

// document.getElementById('nextSlide').addEventListener('click', () => {
//     console.log('Next slide button clicked');
//     if (currentSlide < totalSlides) {
//         currentSlide++;
//         loadSlide(currentSlide);
//     }
// });

// 슬라이드 목록 생성 함수 수정
function updateSlideList() {
    const slideList = document.getElementById('slideList');
    slideList.innerHTML = ''; // 기존 목록 초기화

    // 상단 고정 링크 컨테이너 생성
    const fixedLinksContainer = document.createElement('div');
    fixedLinksContainer.classList.add('fixed-links-container');
    fixedLinksContainer.style.cssText = `
        position: sticky;
        top: 0;
        background-color: white;
        padding: 10px;
        border-bottom: 1px solid #ccc;
        z-index: 100;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        gap: 10px;
    `;

    // 외부 링크 추가
    fixedLinksContainer.innerHTML = `
        <a href="https://gamma.app" target="_blank" style="font-size: 1.25rem; color: #3b82f6; text-decoration: none;">Gamma</a>
        <a href="https://suno.ai" target="_blank" style="font-size: 1.25rem; color: #3b82f6; text-decoration: none;">Suno AI</a>
        <a href="https://www.perplexity.ai" target="_blank" style="font-size: 1.25rem; color: #3b82f6; text-decoration: none;">Perplexity</a>
        <a href="https://ideogram.ai" target="_blank" style="font-size: 1.25rem; color: #3b82f6; text-decoration: none;">Ideogram</a>
    `;

    slideList.appendChild(fixedLinksContainer);

    // 나머지 슬라이드 목록 생성
    for (let i = 0; i < slides.length; i++) {
        const li = document.createElement('li');
        li.classList.add('slide-item');
        li.style.fontSize = '1.25rem'; // 목차 항목 폰트 크기 증가
        
        // 현재 슬라이드 강조
        if (i + 1 === currentSlide) {
            li.classList.add('current-slide');
            li.style.backgroundColor = '#e0e7ff'; // 연한 파란색 배경
            li.style.fontWeight = 'bold';
        }
        
        const numberSpan = document.createElement('span');
        numberSpan.classList.add('slide-number');
        numberSpan.textContent = i + 1;
        numberSpan.style.fontSize = '1.5rem'; // 슬라이드 번호 폰트 크기 증가
        
        const titleSpan = document.createElement('span');
        titleSpan.classList.add('slide-title');
        titleSpan.textContent = extractSlideTitle(slides[i]);
        titleSpan.style.fontSize = '1.25rem'; // 슬라이드 제목 폰트 크기 증가
        
        const previewDiv = document.createElement('div');
        previewDiv.classList.add('slide-preview');
        const previewContent = document.createElement('div');
        previewContent.classList.add('slide-preview-content');
        previewContent.innerHTML = slides[i];
        previewContent.style.fontSize = '1rem'; // 미리보기 내용 폰트 크기 증가
        previewDiv.appendChild(previewContent);
        
        li.appendChild(numberSpan);
        li.appendChild(titleSpan);
        li.appendChild(previewDiv);
        
        li.addEventListener('click', () => {
            currentSlide = i + 1;
            loadSlide(currentSlide);
            updateSlideList(); // 목차 업데이트
        });
        slideList.appendChild(li);
    }
}

// 사이드바 기능 등 기존 코드는 그대로 유지...

// 사이드바 토글 기능
document.getElementById('toggleSidebar').addEventListener('click', () => {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('closed');
    if (sidebar.classList.contains('closed')) {
        document.getElementById('toggleTOC').style.display = 'none';
    } else {
        document.getElementById('toggleTOC').style.display = 'flex';
    }
    document.getElementById('toggleSidebar').style.fontSize = '1.5rem'; // 토글 버튼 폰트 크기 증가
});

// 목차 토글 기능
document.getElementById('toggleTOC').addEventListener('click', () => {
    const slideList = document.getElementById('slideList');
    slideList.classList.toggle('hidden');
    const toggleIcon = document.getElementById('toggleIcon');
    toggleIcon.textContent = slideList.classList.contains('hidden') ? '▼' : '▲';
    toggleIcon.style.fontSize = '1.5rem'; // 토글 아이콘 크기 증가
});

// ... (기존 코드 유지)

function copyToClipboard(text, buttonElement) {
    navigator.clipboard.writeText(text).then(() => {
        // 팝업 생성
        const popup = document.createElement('div');
        popup.innerHTML = `
            <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
            </svg>
            <span style="font-size: 1.5rem;">복사됨!</span>
        `;
        popup.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 20px 40px;
            border-radius: 10px;
            font-size: 24px;
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 15px;
        `;
        document.body.appendChild(popup);

        // 애니메이션 위한 스타일 추가
        const style = document.createElement('style');
        style.textContent = `
            .checkmark {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: block;
                stroke-width: 2;
                stroke: #fff;
                stroke-miterlimit: 10;
                box-shadow: inset 0px 0px 0px #7ac142;
                animation: fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both;
            }
            .checkmark__circle {
                stroke-dasharray: 166;
                stroke-dashoffset: 166;
                stroke-width: 2;
                stroke-miterlimit: 10;
                stroke: #7ac142;
                fill: none;
                animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
            }
            .checkmark__check {
                transform-origin: 50% 50%;
                stroke-dasharray: 48;
                stroke-dashoffset: 48;
                animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
            }
            @keyframes stroke {
                100% {
                    stroke-dashoffset: 0;
                }
            }
            @keyframes fill {
                100% {
                    box-shadow: inset 0px 0px 0px 30px #7ac142;
                }
            }
            @keyframes scale {
                0%, 100% {
                    transform: none;
                }
                50% {
                    transform: scale3d(1.1, 1.1, 1);
                }
            }
        `;
        document.head.appendChild(style);

        // 2초 후 팝업 제거
        setTimeout(() => {
            document.body.removeChild(popup);
            document.head.removeChild(style);
        }, 2000);
    }).catch(err => {
        console.error('복사 실패:', err);
        alert('복사에 실패했습니다.');
    });
}

// 초기 슬라이드 로드 및 이벤트 리스너 설정
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, loading initial slide');
    loadSlide(currentSlide);
    updateSlideList(); // 목차 업데이트
    setupCopyButtons(); // 초기 로드 시 복사 버튼 설정
});

document.getElementById('prevSlide').addEventListener('click', () => {
    console.log('Previous slide button clicked');
    if (currentSlide > 1) {
        currentSlide--;
        loadSlide(currentSlide);
    }
});

document.getElementById('nextSlide').addEventListener('click', () => {
    console.log('Next slide button clicked');
    if (currentSlide < totalSlides) {
        currentSlide++;
        loadSlide(currentSlide);
    }
});

// 슬라이드 목록 생성 함수 수정
function updateSlideList() {
    const slideList = document.getElementById('slideList');
    slideList.innerHTML = ''; // 기존 목록 초기화

    // 상단 고정 링크 컨테이너 생성
    const fixedLinksContainer = document.createElement('div');
    fixedLinksContainer.classList.add('fixed-links-container');
    fixedLinksContainer.style.cssText = `
        position: sticky;
        top: 0;
        background-color: white;
        padding: 10px;
        border-bottom: 1px solid #ccc;
        z-index: 100;
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        gap: 10px;
    `;

    // 외부 링크 추가
    fixedLinksContainer.innerHTML = `
        <a href="https://gamma.app" target="_blank" style="font-size: 1.25rem; color: #3b82f6; text-decoration: none;">Gamma</a>
        <a href="https://suno.ai" target="_blank" style="font-size: 1.25rem; color: #3b82f6; text-decoration: none;">Suno AI</a>
        <a href="https://www.perplexity.ai" target="_blank" style="font-size: 1.25rem; color: #3b82f6; text-decoration: none;">Perplexity</a>
        <a href="https://ideogram.ai" target="_blank" style="font-size: 1.25rem; color: #3b82f6; text-decoration: none;">Ideogram</a>
    `;

    slideList.appendChild(fixedLinksContainer);

    // 나머지 슬라이드 목록 생성
    for (let i = 0; i < slides.length; i++) {
        const li = document.createElement('li');
        li.classList.add('slide-item');
        li.style.fontSize = '1.25rem'; // 목차 항목 폰트 크기 증가
        
        // 현재 슬라이드 강조
        if (i + 1 === currentSlide) {
            li.classList.add('current-slide');
            li.style.backgroundColor = '#e0e7ff'; // 연한 파란색 배경
            li.style.fontWeight = 'bold';
        }
        
        const numberSpan = document.createElement('span');
        numberSpan.classList.add('slide-number');
        numberSpan.textContent = i;
        numberSpan.style.fontSize = '1.5rem'; // 슬라이드 번호 폰트 크기 증가
        
        const titleSpan = document.createElement('span');
        titleSpan.classList.add('slide-title');
        titleSpan.textContent = extractSlideTitle(slides[i]);
        titleSpan.style.fontSize = '1.25rem'; // 슬라이드 제목 폰트 크기 증가
        
        const previewDiv = document.createElement('div');
        previewDiv.classList.add('slide-preview');
        const previewContent = document.createElement('div');
        previewContent.classList.add('slide-preview-content');
        previewContent.innerHTML = slides[i];
        previewContent.style.fontSize = '1rem'; // 미리보기 내용 폰트 크기 증가
        previewDiv.appendChild(previewContent);
        
        li.appendChild(numberSpan);
        li.appendChild(titleSpan);
        li.appendChild(previewDiv);
        
        li.addEventListener('click', () => {
            currentSlide = i + 1;
            loadSlide(currentSlide);
            updateSlideList(); // 목차 업데이트
        });
        slideList.appendChild(li);
    }
}

// 사이드바 기능 등 기존 코드는 그대로 유지...

// 사이드바 토글 기능
document.getElementById('toggleSidebar').addEventListener('click', () => {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('closed');
    if (sidebar.classList.contains('closed')) {
        document.getElementById('toggleTOC').style.display = 'none';
    } else {
        document.getElementById('toggleTOC').style.display = 'flex';
    }
    document.getElementById('toggleSidebar').style.fontSize = '1.5rem'; // 토글 버튼 폰트 크기 증가
});

// 목차 토글 기능
document.getElementById('toggleTOC').addEventListener('click', () => {
    const slideList = document.getElementById('slideList');
    slideList.classList.toggle('hidden');
    const toggleIcon = document.getElementById('toggleIcon');
    toggleIcon.textContent = slideList.classList.contains('hidden') ? '▼' : '▲';
    toggleIcon.style.fontSize = '1.5rem'; // 토글 아이콘 크기 증가
});

function extractSlideData() {
    const slideData = slides.map((slide, index) => {
      // Create temporary div to parse HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = slide;
      
      // Extract title
      const title = tempDiv.querySelector('h2')?.textContent?.trim() || '';
      
      // Extract prompts
      const prompts = Array.from(tempDiv.querySelectorAll('.copy-button')).map(button => {
        const promptContainer = button.closest('.flex');
        // Get text from p tag and replace <br> with newlines
        const pElement = promptContainer?.querySelector('.flex-grow p');
        const displayText = pElement ? pElement.innerHTML
          .replace(/<br\s*\/?>/g, '\n')  // Replace <br> with newline
          .replace(/<[^>]*>/g, '')       // Remove any other HTML tags
          .trim() : '';
        const copyText = button.getAttribute('data-copy-text') || '';
        
        return {
          displayText,
          copyText
        };
      });
  
      return {
        slideNumber: index + 1,
        title,
        prompts
      };
    });
  
    console.log(JSON.stringify(slideData, null, 2));
  }