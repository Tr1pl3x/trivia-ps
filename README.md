# Pyae Sone's Trivia Quiz

A fun and interactive trivia quiz to test how well you know Pyae Sone. The quiz features multiple difficulty levels, randomized questions, and a responsive design for both desktop and mobile devices.

---

## Motivation

This project was created as a fun way to test your knowledge about Pyae Sone. Whether you're a close friend, a casual acquaintance, or just curious, this quiz offers a range of difficulty levels to challenge you. The goal is to make learning about Pyae Sone engaging and entertaining, with a clean and intuitive user interface.

---


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

## Google Sheets Integration

This app includes integration with Google Sheets to store quiz results and track user performance over time.

### How It Works

1. **Data Storage**: When a user completes the quiz, their name, score, difficulty level, and timestamp are sent to a Google Sheet.
2. **Google Apps Script**: The app uses Google Apps Script as a backend API to handle communication between the React frontend and Google Sheets.
3. **Result Tracking**: Quiz results are stored for future analysis and to potentially create a leaderboard feature.

### Technical Implementation

#### Google Sheets Setup
1. Create a Google Sheet with the following columns:
   - Name
   - Score
   - Difficulty
   - Timestamp

2. Google Apps Script:
   - The app uses a Google Apps Script web app to process requests from the React frontend
   - The script handles CORS (Cross-Origin Resource Sharing) to allow requests from different origins
   - Data is securely stored in the Google Sheet

#### Google Apps Script Code
```javascript
// Google Apps Script code
function doGet(e) {
  return handleResponse(e);
}

function doPost(e) {
  return handleResponse(e);
}

function handleResponse(e) {
  // Set CORS headers for the preflight request
  if (e.method === "OPTIONS") {
    return ContentService.createTextOutput("")
      .setMimeType(ContentService.MimeType.TEXT)
      .setHeader("Access-Control-Allow-Origin", "*")
      .setHeader("Access-Control-Allow-Methods", "GET, POST")
      .setHeader("Access-Control-Allow-Headers", "Content-Type")
      .setHeader("Access-Control-Max-Age", "3600");
  }

  // Parse the JSON payload from the request
  let data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (e) {
    // If not JSON, use the parameter data
    data = e.parameter;
  }

  // Process the data
  let result = processData(data);

  // Set CORS headers for the actual request
  return ContentService.createTextOutput(JSON.stringify({ result: "success", data: result }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader("Access-Control-Allow-Origin", "*");
}

function processData(data) {
  try {
    // Get the active spreadsheet and the first sheet
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheets()[0]; // Use the first sheet, or specify by name

    // Append a new row with the data
    sheet.appendRow([
      data.name || "Unknown",
      data.score || 0,
      data.difficulty || "Unknown",
      data.timestamp || new Date().toLocaleString()
    ]);
    
    return "Data successfully recorded";
  } catch (error) {
    // Log the error for debugging
    Logger.log(error);
    return "Error: " + error.toString();
  }
}
```

#### Setup Instructions

1. **Create and deploy the Google Apps Script**:
   - Open [Google Apps Script](https://script.google.com/)
   - Create a new project and paste the code above
   - Replace `SpreadsheetApp.getActiveSpreadsheet()` with `SpreadsheetApp.openById('YOUR_SPREADSHEET_ID')` if needed
   - Deploy as a web app:
     - Click **Deploy** > **New deployment**
     - Select **Web app** as the type
     - Set **Execute as** to your Google account
     - Set **Who has access** to "Anyone" (for testing) or "Anyone with Google account" (for production)
     - Click **Deploy** and copy the web app URL

2. **Configure the React app**:
   - Update the `webAppUrl` in the `sendDataToGoogleSheets` function in `App.js`:
   ```javascript
   const webAppUrl = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL';
   ```

### Troubleshooting

#### CORS Issues
If you encounter CORS errors during development:

1. **Check the Google Apps Script CORS headers**:
   - Make sure the script includes proper CORS headers as shown in the example code
   - Re-deploy the script after making changes

2. **Development mode workaround**:
   - Use the `no-cors` mode in fetch requests during development:
   ```javascript
   fetch(webAppUrl, {
     method: 'POST',
     mode: 'no-cors',
     // Other options...
   })
   ```
   - Implement a localStorage fallback to prevent data loss when the connection fails

3. **Test with a deployed version**:
   - CORS issues are often resolved when testing with a properly deployed application rather than localhost

#### API Rate Limits
Google Apps Script has rate limits that may affect high-traffic applications:
- Default quota is 20,000 requests per day
- Maximum execution time is 6 minutes for free accounts
- Consider implementing a queue system for high-traffic scenarios

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
