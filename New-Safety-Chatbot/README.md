# 🏗️ Safety Sage - 건설 안전 AI 챗봇 위젯

건설 안전 전문 지식을 제공하는 AI 챗봇을 웹사이트에 쉽게 통합할 수 있는 JavaScript 위젯입니다.

## ✨ 주요 기능

- 🤖 **AI 기반 답변**: 건설 안전 전문 지식을 바탕으로 한 정확한 답변
- 💬 **실시간 채팅**: 직관적이고 사용하기 쉬운 채팅 인터페이스
- 🎤 **음성 인식**: 음성으로 질문을 입력할 수 있는 기능
- 📋 **메시지 복사**: 중요한 정보를 쉽게 복사하여 활용
- 📱 **반응형 디자인**: 모든 기기에서 최적화된 사용자 경험
- 🔒 **안전한 대화**: 건설 안전에 특화된 안전한 AI 응답

## 🚀 빠른 시작

### 1. 개발 서버 실행

```bash
# 의존성 설치
npm install

# 개발 서버 시작
npm run dev
```

### 2. 위젯 빌드

```bash
# 프로덕션 빌드
npm run build
```

### 3. 테스트

브라우저에서 다음 URL로 접속하여 테스트할 수 있습니다:

- **데모 페이지**: `http://localhost:3000/demo.html`
- **테스트 페이지**: `http://localhost:3000/test.html`
- **간단 테스트**: `http://localhost:3000/simple-test.html`

## 📦 위젯 통합

### 기본 사용법

```html
<!DOCTYPE html>
<html>
<head>
    <title>내 웹사이트</title>
</head>
<body>
    <!-- 웹사이트 콘텐츠 -->
    
    <!-- 위젯 컨테이너 -->
    <div id="safety-sage-widget"></div>
    
    <!-- 위젯 스크립트 -->
    <script type="module" src="path/to/dist/widget.js"></script>
    <script>
        window.addEventListener('load', function() {
            if (window.renderChatbotWidget) {
                window.renderChatbotWidget('safety-sage-widget');
            }
        });
    </script>
</body>
</html>
```

### 동적 로드

```html
<script>
function loadSafetySageWidget() {
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

document.addEventListener('DOMContentLoaded', loadSafetySageWidget);
</script>
```

## 🛠️ 기술 스택

- **Frontend**: React 18, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS, shadcn/ui
- **AI Integration**: OpenAI API
- **Voice Recognition**: Web Speech API

## 📁 프로젝트 구조

```
safety-sage-chat-main/
├── src/
│   ├── components/
│   │   ├── ChatInterface.tsx      # 메인 채팅 인터페이스
│   │   ├── FloatingChatBot.tsx    # 플로팅 챗봇 컴포넌트
│   │   └── ui/                    # shadcn/ui 컴포넌트들
│   ├── contexts/                  # React 컨텍스트
│   ├── hooks/                     # 커스텀 훅
│   └── lib/                       # 유틸리티 함수
├── dist/                          # 빌드된 위젯 파일들
│   ├── widget.js                  # 메인 위젯 스크립트
│   └── assets/                    # 번들된 자산들
├── test.html                      # 테스트 페이지
├── demo.html                      # 데모 페이지
└── simple-test.html              # 간단 테스트 페이지
```

## 🔧 개발 가이드

### 새로운 기능 추가

1. `src/components/` 디렉토리에 새 컴포넌트 생성
2. 필요한 경우 `src/hooks/`에 커스텀 훅 추가
3. `src/contexts/`에 상태 관리 로직 추가
4. `npm run build`로 위젯 빌드

### 스타일 커스터마이징

Tailwind CSS 클래스를 사용하여 컴포넌트 스타일을 수정할 수 있습니다:

```tsx
// 예시: 버튼 색상 변경
<Button className="bg-blue-500 hover:bg-blue-600">
  커스텀 버튼
</Button>
```

## 🌐 브라우저 지원

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## 📝 API 참조

### renderChatbotWidget(elementId)

위젯을 지정된 요소에 렌더링합니다.

**매개변수:**
- `elementId` (string): 위젯을 렌더링할 HTML 요소의 ID

**예시:**
```javascript
window.renderChatbotWidget('my-widget-container');
```

## 🐛 문제 해결

### 위젯이 로드되지 않는 경우

1. 파일 경로가 올바른지 확인
2. 브라우저 콘솔에서 오류 메시지 확인
3. CORS 설정 확인 (다른 도메인에서 로드하는 경우)

### 위젯이 렌더링되지 않는 경우

1. `renderChatbotWidget` 함수가 정의되었는지 확인
2. 대상 요소의 ID가 올바른지 확인
3. JavaScript 모듈이 지원되는 브라우저인지 확인

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

## 🤝 기여하기

1. 이 저장소를 포크합니다
2. 새로운 기능 브랜치를 생성합니다 (`git checkout -b feature/amazing-feature`)
3. 변경사항을 커밋합니다 (`git commit -m 'Add some amazing feature'`)
4. 브랜치에 푸시합니다 (`git push origin feature/amazing-feature`)
5. Pull Request를 생성합니다

## 📞 지원

문제가 있거나 기능 요청이 있으시면 이 저장소에 이슈를 등록해주세요.

---

**Safety Sage** - 건설 안전을 위한 AI 챗봇 솔루션 🏗️
