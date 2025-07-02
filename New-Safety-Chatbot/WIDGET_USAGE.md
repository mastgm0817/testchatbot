# Safety Sage 챗봇 위젯 사용법

## 개요
Safety Sage 챗봇 위젯은 건설 안전 관련 질문에 답변하는 AI 챗봇을 웹사이트에 쉽게 통합할 수 있게 해주는 JavaScript 위젯입니다.

## 기능
- 🏗️ 건설 안전 전문 지식 제공
- 💬 실시간 채팅 인터페이스
- 🎤 음성 인식 기능
- 📋 메시지 복사 기능
- 📱 반응형 디자인
- 🔒 안전한 AI 응답

## 설치 방법

### 1. 파일 준비
다음 파일들을 웹사이트에 업로드하세요:
```
dist/
├── widget.js
└── assets/
    ├── index-DZjYePrS.css
    ├── main-jNpAiVAl.js
    └── index-biy5v_ZU.js
```

### 2. HTML에 위젯 추가

#### 기본 사용법
```html
<!DOCTYPE html>
<html>
<head>
    <title>내 웹사이트</title>
    <!-- CSS 스타일 -->
    <link rel="stylesheet" href="path/to/dist/assets/index-DZjYePrS.css" />
</head>
<body>
    <!-- 웹사이트 콘텐츠 -->
    
    <!-- 위젯 컨테이너 -->
    <div id="safety-sage-widget"></div>
    
    <!-- 위젯 스크립트 -->
    <script type="module" src="path/to/dist/widget.js"></script>
    <script>
        // 위젯 초기화
        window.addEventListener('load', function() {
            if (window.renderChatbotWidget) {
                window.renderChatbotWidget('safety-sage-widget');
            }
        });
    </script>
</body>
</html>
```

#### 동적 로드 방법
```html
<script>
function loadSafetySageWidget() {
    // CSS 로드
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'path/to/dist/assets/index-DZjYePrS.css';
    document.head.appendChild(link);
    
    // 위젯 스크립트 로드
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'path/to/dist/widget.js';
    script.onload = function() {
        if (window.renderChatbotWidget) {
            window.renderChatbotWidget('safety-sage-widget');
        }
    };
    document.head.appendChild(script);
}

// 페이지 로드 시 위젯 로드
document.addEventListener('DOMContentLoaded', loadSafetySageWidget);
</script>
```

## API 참조

### renderChatbotWidget(elementId)
위젯을 지정된 요소에 렌더링합니다.

**매개변수:**
- `elementId` (string): 위젯을 렌더링할 HTML 요소의 ID

**예시:**
```javascript
window.renderChatbotWidget('my-widget-container');
```

## 사용 예시

### 1. 기본 통합
```html
<!DOCTYPE html>
<html>
<head>
    <title>건설 회사 웹사이트</title>
    <link rel="stylesheet" href="./dist/assets/index-DZjYePrS.css" />
</head>
<body>
    <h1>안전한 건설을 위한 Safety Sage</h1>
    <p>건설 안전에 대한 질문이 있으시면 오른쪽 하단의 챗봇을 이용해주세요.</p>
    
    <div id="safety-widget"></div>
    
    <script type="module" src="./dist/widget.js"></script>
    <script>
        window.addEventListener('load', function() {
            if (window.renderChatbotWidget) {
                window.renderChatbotWidget('safety-widget');
            }
        });
    </script>
</body>
</html>
```

### 2. 조건부 로드
```html
<script>
function loadWidgetOnDemand() {
    // 사용자가 특정 버튼을 클릭했을 때만 위젯 로드
    const loadButton = document.getElementById('load-chatbot');
    loadButton.addEventListener('click', function() {
        if (!window.renderChatbotWidget) {
            // CSS 로드
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = './dist/assets/index-DZjYePrS.css';
            document.head.appendChild(link);
            
            // 위젯 스크립트 로드
            const script = document.createElement('script');
            script.type = 'module';
            script.src = './dist/widget.js';
            script.onload = function() {
                window.renderChatbotWidget('safety-widget');
            };
            document.head.appendChild(script);
        } else {
            window.renderChatbotWidget('safety-widget');
        }
    });
}

document.addEventListener('DOMContentLoaded', loadWidgetOnDemand);
</script>
```

## 반응형 디자인

위젯은 다양한 디바이스 크기에 맞춰 자동으로 조정됩니다:

- **데스크톱 (768px 이상)**: 450px × 600px 크기의 카드형 창
- **태블릿 (768px 이하)**: 화면 너비의 대부분을 차지하는 창
- **모바일 (480px 이하)**: 거의 전체 화면을 차지하는 창

## 스타일링

위젯은 자체적으로 스타일링되어 있지만, 필요에 따라 CSS로 커스터마이징할 수 있습니다:

```css
/* 위젯 컨테이너 스타일링 */
#safety-sage-widget {
    /* 커스텀 스타일 */
}

/* 위젯이 렌더링된 후의 요소들 */
#safety-sage-widget .chatbot-widget {
    /* 위젯 전체 스타일 */
}

#safety-sage-widget .chatbot-button {
    /* 챗봇 버튼 스타일 */
}
```

## 브라우저 지원
- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## 문제 해결

### 위젯이 로드되지 않는 경우
1. 파일 경로가 올바른지 확인
2. 브라우저 콘솔에서 오류 메시지 확인
3. CORS 설정 확인 (다른 도메인에서 로드하는 경우)

### 위젯이 렌더링되지 않는 경우
1. `renderChatbotWidget` 함수가 정의되었는지 확인
2. 대상 요소의 ID가 올바른지 확인
3. JavaScript 모듈이 지원되는 브라우저인지 확인

### 스타일이 적용되지 않는 경우
1. CSS 파일이 올바르게 로드되었는지 확인
2. CSS 파일 경로가 정확한지 확인
3. 브라우저 캐시를 비우고 새로고침

## 라이선스
이 위젯은 MIT 라이선스 하에 배포됩니다.

## 지원
문제가 있거나 기능 요청이 있으시면 프로젝트 저장소에 이슈를 등록해주세요. 