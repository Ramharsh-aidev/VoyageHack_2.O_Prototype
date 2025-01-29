import { useState, useRef, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import styles from "../cssFiles/AITripPlanner.module.css";
import preferencesData from "../Assests/preferencesData.json";
import MapComponent from "../component/MapComponent";
import PlaceExtractor from "../component/PlaceExtractor";

const apiKey = ""; // Replace with your actual Gemini API key

function AITripPlanner() {
  const [chatHistory, setChatHistory] = useState([]);
  const [question, setQuestion] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [places, setPlaces] = useState([]);
  const chatContainerRef = useRef(null);
  const [isMapVisible, setIsMapVisible] = useState(false); // State for map visibility

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

  const detectPreferences = (input) => {
    let detectedPreferences = {};
    const lowerCaseInput = input.toLowerCase();

    Object.keys(preferencesData.moods).forEach((mood) => {
      if (preferencesData.moods[mood].some((word) => lowerCaseInput.includes(word))) {
        detectedPreferences.mood = mood;
      }
    });
    Object.keys(preferencesData.activities).forEach((activity) => {
      if (preferencesData.activities[activity].some((word) => lowerCaseInput.includes(word))) {
        detectedPreferences.activity = activity;
      }
    });
    Object.keys(preferencesData.destinations).forEach((destination) => {
      if (preferencesData.destinations[destination].some((word) => lowerCaseInput.includes(word))) {
        detectedPreferences.destination = destination;
      }
    });
    Object.keys(preferencesData.seasons).forEach((season) => {
      if (preferencesData.seasons[season].some((word) => lowerCaseInput.includes(word))) {
        detectedPreferences.season = season;
      }
    });
    Object.keys(preferencesData.ages).forEach((ageGroup) => {
      if (preferencesData.ages[ageGroup].some((word) => lowerCaseInput.includes(word))) {
        detectedPreferences.ageGroup = ageGroup;
      }
    });
    Object.keys(preferencesData.religion).forEach((religion) => {
      if (lowerCaseInput.includes(religion)) {
        detectedPreferences.religion = religion;
      }
    });

    return detectedPreferences;
  };

  async function generateAnswer(e) {
    e.preventDefault();
    if (!question.trim()) return;

    setGeneratingAnswer(true);
    const currentQuestion = question;
    setQuestion("");

    setChatHistory((prev) => [
      ...prev,
      { type: "question", content: currentQuestion },
    ]);

    try {
      const detectedPreferences = detectPreferences(currentQuestion);
      let additionalInfo = "";

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

      const context = chatHistory.map((message) => ({ text: message.content }));
      context.push({ text: currentQuestion });

      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-thinking-exp-01-21:generateContent?key=${apiKey}`,
        method: "post",
        data: {
          contents: [{ parts: context.map((item) => ({ text: item.text })) }],
        },
      });

      const aiResponse = response.data.candidates[0].content.parts[0].text;
      const fullResponse = aiResponse + "\n\n" + additionalInfo;

      setChatHistory((prev) => [...prev, { type: "answer", content: fullResponse }]);
      setRetryCount(0);
    } catch (error) {
      console.error("Error:", error);
      retryAPI(e);
    }

    setGeneratingAnswer(false);
  }

  const handlePlacesExtracted = (extractedPlaces) => {
    setPlaces(extractedPlaces);
  };

  const toggleMapVisibility = () => {
    setIsMapVisible(!isMapVisible);
  };

  return (
    <div className={styles.aiTripPlannerContainer}>
      <div className={styles.header}>
        <a href="/ai-Destination-suggester" target="_blank" rel="noopener noreferrer">
          <h1>AI Destination Suggester</h1>
        </a>
      </div>

      <div className={styles.mainContent}>
        <div ref={chatContainerRef} className={`${styles.chatContainer} ${isMapVisible ? styles.chatContainerMapVisible : styles.chatContainerMapHidden}`}>
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

        <div className={`${styles.mapColumn} ${isMapVisible ? styles.mapColumnVisible : styles.mapColumnHidden}`}>
          <button className={styles.mapToggleButton} onClick={toggleMapVisibility}>
            {isMapVisible ? "Hide Map" : "Show Map"}
          </button>
          <div className={styles.mapContainerWrapper}>
            {isMapVisible && places.length > 0 && <MapComponent places={places} />}
          </div>
        </div>
      </div>


      {chatHistory.length > 0 && (
        <PlaceExtractor
          aiResponseText={chatHistory[chatHistory.length - 1].content}
          onPlacesExtracted={handlePlacesExtracted}
        />
      )}


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

