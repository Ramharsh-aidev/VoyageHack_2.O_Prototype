import { useState, useRef, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import styles from "../cssFiles/AITripPlanner.module.css";
import preferencesData from "../Assests/preferencesData.json";

function AITripPlanner() {
  const [chatHistory, setChatHistory] = useState([]);
  const [question, setQuestion] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, generatingAnswer]);

  const retryAPI = async (e) => {
    if (retryCount < 3) {
      setRetryCount((prev) => prev + 1);
      await generateAnswer(e);
    } else {
      setChatHistory((prev) => [
        ...prev,
        { type: "answer", content: "Sorry, something went wrong. Please try again later." },
      ]);
      setGeneratingAnswer(false);
    }
  };

  // Function to detect preferences from user input based on the available data
  const detectPreferences = (input) => {
    let detectedPreferences = {};
  
    const lowerCaseInput = input.toLowerCase();
  
    // Detect mood
    Object.keys(preferencesData.moods).forEach((mood) => {
      if (preferencesData.moods[mood].some((word) => lowerCaseInput.includes(word))) {
        detectedPreferences.mood = mood;
      }
    });
  
    // Detect activity
    Object.keys(preferencesData.activities).forEach((activity) => {
      if (preferencesData.activities[activity].some((word) => lowerCaseInput.includes(word))) {
        detectedPreferences.activity = activity;
      }
    });
  
    // Detect destination
    Object.keys(preferencesData.destinations).forEach((destination) => {
      if (preferencesData.destinations[destination].some((word) => lowerCaseInput.includes(word))) {
        detectedPreferences.destination = destination;
      }
    });
  
    // Detect season
    Object.keys(preferencesData.seasons).forEach((season) => {
      if (preferencesData.seasons[season].some((word) => lowerCaseInput.includes(word))) {
        detectedPreferences.season = season;
      }
    });
  
    // Detect age group
    Object.keys(preferencesData.ages).forEach((ageGroup) => {
      if (preferencesData.ages[ageGroup].some((word) => lowerCaseInput.includes(word))) {
        detectedPreferences.ageGroup = ageGroup;
      }
    });
  
    // Detect religion
    Object.keys(preferencesData.religion).forEach((religion) => {
      if (lowerCaseInput.includes(religion)) {
        detectedPreferences.religion = religion;
      }
    });
  
    return detectedPreferences;
  };
  
  // Function to generate AI's response based on the user input
  async function generateAnswer(e) {
    e.preventDefault();
    if (!question.trim()) return;

    setGeneratingAnswer(true);
    const currentQuestion = question;
    setQuestion(""); // Clear the input field immediately after submitting

    // Add the current question to chat history only once
    setChatHistory((prev) => [
      ...prev,
      { type: "question", content: currentQuestion },
    ]);

    try {
      // Detect user preferences from the question
      const detectedPreferences = detectPreferences(currentQuestion);

      // Generate additional info based on detected preferences
      let additionalInfo = "";

      // Provide suggestions based on preferences
      if (detectedPreferences.mood) {
        additionalInfo += `For a ${detectedPreferences.mood} mood, consider activities like: ${preferencesData.moods[detectedPreferences.mood].join(", ")}.\n`;
      }

      if (detectedPreferences.activity) {
        additionalInfo += `For activities like ${detectedPreferences.activity}, you might enjoy: ${preferencesData.activities[detectedPreferences.activity].join(", ")}.\n`;
      }

      if (detectedPreferences.destination) {
        additionalInfo += `For destinations, you could explore: ${preferencesData.destinations[detectedPreferences.destination].join(", ")}.\n`;
      }

      if (detectedPreferences.season) {
        additionalInfo += `The best season for such trips is: ${preferencesData.bestTiming[detectedPreferences.season].join(", ")}.\n`;
      }

      if (detectedPreferences.ageGroup) {
        additionalInfo += `As you are in the ${detectedPreferences.ageGroup} age group, you might prefer: ${preferencesData.ages[detectedPreferences.ageGroup].join(", ")}.\n`;
      }

      // Maintain conversation context
      const context = chatHistory.map((message) => ({ text: message.content }));
      context.push({ text: currentQuestion });

      // API request
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GOOGLE_GEMINI_API}`,
        method: "post",
        data: {
          contents: [{ parts: context.map((item) => ({ text: item.text })) }],
        },
      });

      const aiResponse = response.data.candidates[0]?.content?.parts[0]?.text;

      // Combine AI response with additional info
      const fullResponse = aiResponse + "\n\n" + additionalInfo;

      setChatHistory((prev) => [...prev, { type: "answer", content: fullResponse }]);
      setRetryCount(0); // Reset retry count on success
    } catch (error) {
      console.error("Error:", error);
      // If error occurs, try retrying the request
      retryAPI(e);
    }

    setGeneratingAnswer(false);
  }

  return (
    <div className={styles.aiTripPlannerContainer}>
      <div className={styles.header}>
        <a href="/ai-Destination-suggester" target="_blank" rel="noopener noreferrer">
          <h1>AI Destination Suggester</h1>
        </a>
      </div>

      <div ref={chatContainerRef} className={styles.chatContainer}>
        {chatHistory.length === 0 ? (
          <div className={styles.welcomeMessage}>
            <h2>Welcome to the AI Suggester! 🌍</h2>
            <p>Let me help you plan your next destination based on your preferences.</p>
          </div>
        ) : (
          chatHistory.map((chat, index) => (
            <div
              key={index}
              className={`${styles.message} ${chat.type === "question" ? styles.question : styles.answer}`}
            >
              <div className={styles.messageContent}>
                <ReactMarkdown>{chat.content}</ReactMarkdown>
              </div>
            </div>
          ))
        )}

        {generatingAnswer && (
          <div className={styles.thinkingMessage}>
            <span>Thinking...</span>
          </div>
        )}
      </div>

      <form onSubmit={generateAnswer} className={styles.inputForm}>
        <textarea
          className={styles.questionInput}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask about your next trip..."
          rows="2"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              generateAnswer(e);
            }
          }}
        />
        <button
          type="submit"
          className={`${styles.sendButton} ${generatingAnswer ? styles.disabled : ""}`}
          disabled={generatingAnswer}
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default AITripPlanner;

