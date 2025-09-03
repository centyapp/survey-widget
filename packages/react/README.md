# 📊 Survey Widget

Easily embed surveys in your React app with one line of code.  
Lightweight, customizable, and programmatically controllable.

---

## 📦 Installation

```bash
pnpm add @centyapp/react-survey-widget
# or
npm install @centyapp/react-survey-widget
# or
yarn add @centyapp/react-survey-widget
```

## ⚡ Quick Start

1. Add the widget to your app

```tsx
import { SurveyWidget } from "@centyapp/react-survey-widget";

export default function App() {
  return (
    <div>
      <h1>My App</h1>
      <SurveyWidget />
    </div>
  );
}
```

2. Trigger a survey on your demand

```tsx
import { surveyWidget } from "@centyapp/react-survey-widget";

await surveyWidget.show("survey-id");
```
