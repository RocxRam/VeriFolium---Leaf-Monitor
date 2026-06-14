# VeriFolium 🌿

**VeriFolium** (Leaf-Monitor) is an AI-powered platform designed to help farmers and gardeners diagnose plant diseases, receive personalized recommendations, and access in-web assistance.

By combining **Edge AI** for instant client-side detection and **Large Language Models (Gemini)** for deep analysis, VeriFolium provides a robust, offline-capable yet highly intelligent diagnostic tool for agriculture.

You can try it live at: https://verifolium-leaf-monitor-production.up.railway.app/

## 🚨 The Problem

Farmers and gardeners worldwide face a critical challenge: **crop disease**. Identifying these diseases accurately and early is difficult, often requiring specialized knowledge that isn't always accessible in the field. Delayed or incorrect diagnosis leads to:
- **Significant Crop Loss:** Entire harvests can be wiped out if diseases spread unchecked.
- **Economic Hardship:** Reduced yields directly impact the livelihoods of growers and food security.
- **Unsustainable Practices:** Incorrect treatments can lead to the overuse of harmful chemicals and wasted resources.

Existing solutions often require high-bandwidth connections or lack the deep, contextual insight needed for effective treatment.

## 💡 Our Approach

We built VeriFolium as a focused, high-performance solution to bridge the gap between field-level observation and expert-level analysis. Our work centered on three core pillars:

1.  **Hybrid AI Pipeline:** We developed a two-stage diagnostic process. A browser-based **Edge AI** (ONNX) provides immediate feedback even in low-connectivity environments, while a **Cloud AI** (Gemini 2.5 Flash Lite) performs deep analysis to verify findings and provide region-aware remedies.
2.  **User-Centric Engineering:** Our team focused on creating a "field-ready" experience. This meant optimizing for mobile captures, ensuring fast inference times (~3 seconds), and building a platform that supports 100+ crop conditions.
3.  **Data-Driven Accuracy:** We trained our models on diverse crop varieties and disease stages to ensure high detection quality under real-world conditions.

## 🚀 Features

- **Instant Diagnosis:** Edge-side disease detection using ONNX models running directly in the browser.
- **Deep Analysis:** Server-side verification using Gemini AI for detailed disease insights and remedies.
- **Personalized Recommendations:** Tailored advice based on land size, soil type, and specific crop profiles.
- **Interactive Dashboard:** Monitor farm health, weather, and historical scans.
- **Offline Ready:** Client-side inference allows for immediate feedback even in areas with poor connectivity.

## 🛠 Tech Stack

### Backend
- **Framework:** Ruby on Rails 8.1.3
- **Database:** PostgreSQL
- **Background Jobs:** Solid Queue
- **Caching:** Solid Cache
- **Real-time:** Solid Cable
- **AI Integration:** `ruby_llm` gem (Gemini 2.5 Flash Lite)

### Frontend
- **Library:** React 19
- **Bridge:** Inertia.js 3
- **Bundler:** Vite 8
- **Styling:** Tailwind CSS 4
- **Edge AI:** Web Workers with ONNX Runtime

## 🏗 Architecture

VeriFolium uses a hybrid AI approach:

1.  **Edge Inference:** When a user uploads or captures a leaf image, a local ONNX model (exported from TensorFlow/PyTorch) runs in a Web Worker. This provides an immediate "Suspected Disease" and "Confidence Score" without hitting the server.
2.  **Server-side Verification:** The scan is then processed by `CropDiseaseAgent` on the Rails backend. It leverages the Gemini LLM to:
    *   Verify the edge-side diagnosis.
    *   Cross-reference with user-specific data (soil type, location).
    *   Generate a detailed PDF-style report of remedies and preventive measures.

To know more about the the AI model used for the edge-inference, visit https://github.com/DerekWinkins-007/VeriFolium

## 🚦 Getting Started

### Prerequisites

- Ruby 3.4.0+
- Node.js 20+
- PostgreSQL
- Gemini API Key (set in `.env` or credentials)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/verifolium.git
    cd verifolium
    ```

2.  **Install dependencies:**
    ```bash
    bundle install
    npm install
    ```

3.  **Setup the database:**
    ```bash
    bin/rails db:setup
    ```

4.  **Configure Environment Variables:**
    Create a `.env` file or use `bin/rails credentials:edit`:
    ```env
    GEMINI_API_KEY=your_api_key_here
    OPENWEATHER_API_KEY=your_api_key_here
    ```

5.  **Start the development server:**
    ```bash
    bin/dev
    ```
    This will start both the Rails server and the Vite development server.

## 🧪 Testing

Run the test suite:
```bash
bin/rails test
```

## 👥 Contributors

- [**Harish Kumar M V**](https://github.com/harishtpj) - Created backend, LLM Integration and real-time streaming
- [**Derek Jeremy Winkins**](https://github.com/DerekWinkins-007) - Engineered the AI model behind the edge-inference system
- [**Subrahmanian Ramakrishnan**](https://github.com/RocxRam) - Created Frontend and UI/UX


