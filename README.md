# Pyae Sone's Trivia Quiz

A fun and interactive trivia quiz to test how well you know Pyae Sone. The quiz features multiple difficulty levels, randomized questions, and a responsive design for both desktop and mobile devices.

---

## Motivation

This project was created as a fun way to test your knowledge about Pyae Sone. Whether you're a close friend, a casual acquaintance, or just curious, this quiz offers a range of difficulty levels to challenge you. The goal is to make learning about Pyae Sone engaging and entertaining, with a clean and intuitive user interface.

---

## Project Structure

The project is organized as follows:

trivia-ps/
├── public/
│ └── index.html
├── src/
│ ├── components/
│ │ ├── HomePage.js
│ │ ├── StartPage.js
│ │ ├── QuizPage.js
│ │ ├── Question.js
│ │ └── ResultPage.js
│ ├── App.js
│ ├── index.js
│ └── styles/
│ └── App.css
├── questions.js
├── README.md
└── package.json


### Key Files and Folders
- **`public/`**: Contains the `index.html` file, which is the entry point for the app.
- **`src/`**: Contains the React components and styles.
  - **`components/`**: Contains reusable React components like `HomePage`, `StartPage`, `QuizPage`, `Question`, and `ResultPage`.
  - **`styles/`**: Contains the `App.css` file for styling the app.
- **`questions.js`**: Contains the trivia questions organized by difficulty (easy, normal, hard).
- **`README.md`**: Provides an overview of the project, setup instructions, and technical details.

---

## Technical Stuff

### Technologies Used
- **React**: The front-end framework used to build the interactive user interface.
- **CSS**: Used for styling the app, including a dark theme and responsive design.
- **JavaScript**: Used for logic, such as shuffling questions and answers, tracking scores, and handling user interactions.

### Key Features
1. **Difficulty Levels**:
   - **Easy**: 3 easy questions + 2 normal questions.
   - **Normal**: 2 easy questions + 2 normal questions + 1 hard question.
   - **Hard**: 2 normal questions + 3 hard questions.

2. **Randomized Questions**:
   - Questions and answer choices are randomized for each quiz session.

3. **Responsive Design**:
   - The app is fully responsive and optimized for mobile devices (viewport width < 430px and height < 933px).

4. **Result Prompts**:
   - Fun and engaging prompts based on the user's score and selected difficulty.

5. **Retry Quiz**:
   - Users can retry the quiz or return to the home page after completing the quiz.

### Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/pyae-sone-trivia.git
   cd pyae-sone-trivia
2. Install dependencies:
   ```bash
   npm install
3. Start the development server:
   ```bash
   npm start
4. Open your browser and navigate to http://localhost:300

### Author
Pyae Sone Oo
Github: [Tr1pl3x](/https://github.com/Tr1pl3x)
Email: pyaesoneoo54321@gmail.com
