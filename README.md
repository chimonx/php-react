
# Post Management App

## Overview
The **Post Management App** is a simple, full-featured application that allows users to create, like, and delete posts. Users can also add comments to posts and search for specific posts or authors. Authentication ensures that only logged-in users can interact with the application, and it provides session persistence for a better user experience.

## Features
- **Authentication**: Users can log in and have their session remembered.
- **Create Posts**: Users can add posts with a title and content.
- **Like and Unlike**: Users can like and unlike posts, with likes tracked in Firebase Firestore.
- **Delete Posts**: Users can delete their own posts, with a confirmation prompt.
- **Comment on Posts**: Users can add comments to posts.
- **Search Functionality**: Users can search for posts by title, content, or the author’s username.
- **Session Persistence**: User sessions are persisted using `localStorage`.

## Technologies Used
- **React**: Front-end framework for building the user interface.
- **Firebase**: 
  - **Firestore**: For storing posts, likes, and comments.
  - **Firebase Authentication**: For user authentication and session management.
- **CSS**: For styling the application.

## Getting Started

### Prerequisites
- **Node.js**: Make sure you have Node.js installed on your system.
- **Firebase Project**: Set up a Firebase project and configure Firestore and Authentication.

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/chimonx/kunkorn-react.git
   cd kunkorn-react
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Set Up Firebase**:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
   - Enable Firestore and Authentication in your project.
   - Replace the Firebase configuration in `firebaseConfig.js` with your own credentials.

4. **Run the Application**:
   ```bash
   npm start
   ```
   - The app will be available at `http://localhost:3000`.

## Project Structure
```
src
│
├── components
│   ├── PostForm.js          // Form for adding a new post
│   ├── PostItem.js          // Component for displaying a single post
│   ├── PostList.js          // List of all posts
│   ├── CommentSection.js    // Component for adding and viewing comments
│   └── Login.js             // Login form for user authentication
│
├── firebase
│   └── firebaseConfig.js    // Firebase configuration and initialization
│
├── App.js                   // Main application component
├── index.js                 // Entry point of the React app
└── index.css                // Global CSS styles
```

## Configuration

1. **Firebase Configuration**:
   - Open `firebase/firebaseConfig.js` and replace the configuration object with your Firebase project's credentials:
     ```javascript
     const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_AUTH_DOMAIN",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_STORAGE_BUCKET",
       messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
       appId: "YOUR_APP_ID",
     };
     ```

## Usage

1. **Login**: Use the provided login form to authenticate.
2. **Create Posts**: Enter a title and content to add a new post.
3. **Like Posts**: Click the "Like" button to like a post. Click again to unlike.
4. **Delete Posts**: If you are the author, you can delete your posts.
5. **Add Comments**: Use the comment section below each post to add a comment.
6. **Search**: Use the search bar to find posts by title, content, or author.

## Screenshots
_Add screenshots of your application here to give users a visual overview._

## Contributing
If you'd like to contribute to the project, feel free to fork the repository and submit a pull request. Please make sure to follow the code of conduct and guidelines for contributing.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact
For questions or feedback, please reach out to [kunkorn.trak@bumail.net].

## Acknowledgements
- **React**: For the front-end framework.
- **Firebase**: For providing a reliable backend solution.
- **OpenAI**: For assistance with code and documentation.
