# VoyageHack 2.0 - Tourism Website with AI Integration

## Description

VoyageHack 2.0 is an AI-powered **Tourism Website** designed to help users plan their trips with personalized AI-generated itineraries, explore places, track budgets, and book hotels. The website integrates multiple AI services and APIs, such as OpenStreetMap, Travel Advisor API, OpenWeather API, ExchangeRate API, and TBO API, to provide an intuitive and responsive experience.

The project is built using **React**, **Tailwind CSS**, and **CSS Modules** to ensure a smooth, user-friendly interface.


## API Integrations

### 1. Google APIs:
- **Google Maps API:** For map display, location services, autocomplete, and Place API.
- **Maps SDK for Android, Directions API, Geolocation API, Places API:** Enable rich map functionality.
- **Google Gemini API:** For AI-based extraction of places (requires API keys).

### 2. RapidAPI Integrations:
- **Travel Advisor API:** [Travel Advisor API Documentation](https://rapidapi.com/apidojo/api/travel-advisor)
- **OpenWeather API:** [OpenWeather API Documentation](https://rapidapi.com/worldapi/api/open-weather13/playground/apiendpoint_d15cd885-e8e5-49e7-b94b-588c41687aa1)
- **ExchangeRate API:** For converting currencies in BudgetTracker.

### 3. TBO API: For booking hotel rooms and managing hotel data.

---

## Setup and Installation

### Prerequisites
- **Node.js** (v16 or higher recommended)
- **npm** or **yarn** (Package Managers)

### Installation Steps

1. **Clone the repository:**
    ```bash
    git clone https://github.com/Ramharsh-aidev/VoyageHack_2.O_Prototype
    cd VoyageHack_2.O_Prototype
    ```

2. **Install dependencies:**
    ```bash
    npm install  # or yarn install
    ```

3. **Set up `.env.local` file for API keys:**

    Create a `.env.local` file in the root directory of your project and add the following:

    ```bash
    # Google API Keys (For Google Maps and related services)
    REACT_APP_GOOGLE_MAP_API_KEY=your_google_map_api_key  # For Google Maps JavaScript API and Places API
    REACT_APP_GEMINI_API_KEY_AI=your_gemini_api_key  # For AI-based trip planning and extraction
    REACT_APP_GEMINI_API_KEY_Extrc=your_extrc_gemini_key  # For extracting location-related data using AI

    # Travel Advisor API (via RapidAPI)
    REACT_APP_RAPIDAPI_KEY=your_rapidapi_key  # For accessing the Travel Advisor API (restaurants, hotels, attractions)
    REACT_APP_RAPIDAPI_HOST=your_rapidapi_host_key  # For RapidAPI Host for Travel Advisor API

    # OpenWeather API (via RapidAPI)
    REACT_APP_RAPIDAPI_WEATHER_API_KEY=your_weather_api_key  # For fetching weather data (OpenWeatherMap API)

    # ExchangeRate API (For currency exchange in BudgetTracker)
    REACT_APP_EXCHANGE_RATE_API_KEY=your-exchangerate-api-key  # For real-time currency conversion in BudgetTracker

    # Hotel Booking API (TBO API)
    REACT_APP_HOTEL_API_BASE_URL=your_hotel_api_base_url  # For booking hotel rooms (TBO API base URL)
    REACT_APP_HOTEL_USERNAME=your_hotel_username  # For authenticating TBO API requests (hotel username)
    REACT_APP_HOTEL_PASSWORD=your_hotel_password  # For authenticating TBO API requests (hotel password)

    # Sightseeing API (For fetching tourist attractions)
    REACT_APP_SIGHTSEEING_USERNAME=your_username  # For Sightseeing API authentication
    REACT_APP_SIGHTSEEING_PASSWORD=your_password  # For Sightseeing API authentication
    REACT_APP_SIGHTSEEING_CLIENT_ID=your_client_id  # For Sightseeing API authentication

    # API Base URLs (If applicable for custom backend services)
    REACT_APP_API_BASE_URL=your_api_base_url  # For backend API base URL (if using a custom backend)
    ```

    ##### ***Note : Dont forgot to add the api end-point***

    **API Key Description:**
    - **Google API Keys:**
      - `REACT_APP_GOOGLE_MAP_API_KEY`: This key is used for **Google Maps JavaScript API** and **Google Places API** to enable map features and location services.
      - `REACT_APP_GEMINI_API_KEY_AI`: This key is for **Google Gemini API** (or similar AI service) to generate personalized trip plans and recommendations.
      - `REACT_APP_GEMINI_API_KEY_Extrc`: This key is for extracting location-specific data using the **Gemini API** fine-tuned for tourism-related information.

    - **RapidAPI Keys:**
      - `REACT_APP_RAPIDAPI_KEY`: This key is for accessing the **Travel Advisor API** via RapidAPI to get information about restaurants, hotels, and attractions.
      - `REACT_APP_RAPIDAPI_HOST`: The host for **Travel Advisor API** hosted on RapidAPI.
      - `REACT_APP_RAPIDAPI_WEATHER_API_KEY`: This key is for the **OpenWeather API** to fetch weather data for locations.

    - **ExchangeRate API Key:**
      - `REACT_APP_EXCHANGE_RATE_API_KEY`: This key is used to access the **ExchangeRate API** for converting currencies in the **BudgetTracker** feature.

    - **Hotel Booking (TBO API):**
      - `REACT_APP_HOTEL_API_BASE_URL`: The base URL for the **TBO API** that provides hotel room booking services.
      - `REACT_APP_HOTEL_USERNAME` & `REACT_APP_HOTEL_PASSWORD`: Credentials used to authenticate API requests for hotel bookings via the **TBO API**.

    - **Sightseeing API Credentials:**
      - `REACT_APP_SIGHTSEEING_USERNAME`, `REACT_APP_SIGHTSEEING_PASSWORD`, and `REACT_APP_SIGHTSEEING_CLIENT_ID`: These are used for authenticating API requests to fetch **tourist attractions** or sightseeing-related data.

4. **Start the development server:**
    ```bash
    npm start  # or yarn start
    ```

5. **Open the application in your browser:**
    Visit `http://localhost:3000` to see the app in action.

---

### Additional Notes:
- **Make sure to never commit your `.env.local` file to your version control.** Always keep API keys secure and private.
- If you don’t have the API keys yet, you can obtain them from the respective platforms (Google Cloud, RapidAPI, OpenWeather, ExchangeRate, TBO API, etc.).
- The **Google Gemini API** may require specific access permissions or tokens depending on the service and use case. Ensure that your API keys and credentials are set up correctly for each service.

---

## Technologies Used

- **React:** JavaScript library for building the user interface.
- **Tailwind CSS:** Utility-first CSS framework for styling.
- **CSS Modules:** Scoped CSS for styling components locally.
- **OpenStreetMap:** For interactive map display and location-based services.
- **Travel Advisor API (via RapidAPI):** For fetching data about restaurants, hotels, and attractions.
- **OpenWeatherMap API (via RapidAPI):** For weather data.
- **ExchangeRate API:** For currency exchange rates in BudgetTracker.
- **TBO API:** For hotel room booking and reservations.
- **Axios:** For HTTP requests.
- **React Router:** For routing between components/pages.


## Features and Detailed Flow

### 1. **AITripPlanner:**

#### Flow:
- **User Input:** The user starts a conversation with the AI to plan their trip. The user may specify preferences like trip destination, budget, type of places (restaurants, attractions, hotels), and other personalized preferences for the trip.
  
- **Chat Interface:** The AI interacts with the user through a conversational interface, guiding them through the planning process. The user's inputs are captured as part of the ongoing conversation, allowing the AI to modify responses based on context.
  
- **Prompt Structuring:** The user’s responses are passed as part of the context to the AI. The prompt is dynamically modified, incorporating prior context with new trip-related information. This allows the AI to generate tailored, context-aware responses.
  
- **Fine-Tuned AI Model:** The AI uses a fine-tuned model, possibly powered by Google Gemini or a similar service, to process the conversation and generate personalized recommendations. The model focuses on **tourism-related content** and prioritizes responses that fit the user's preferences (e.g., types of attractions, desired travel experiences).
  
- **Data Extraction from JSON:** The backend processes the AI's response and fetches the corresponding places data from a pre-defined **JSON file** or an API (like **Travel Advisor API**). This data includes place names, categories (restaurants, hotels, attractions), and location coordinates.
  
- **Contextual Data Passing:** After receiving the structured AI response, the backend processes the places data and sends it along with the map coordinates and other relevant information to the frontend. The system ensures the **previous context** of the conversation (e.g., the user’s location, preferences, or budget) is maintained while sending the updated content to ensure continuity.
  
- **Map Visualization:** The data (place names, types, coordinates) is passed to the frontend where the **OpenStreetMap** component is used to display the locations on an interactive map. Each place is marked on the map based on the extracted coordinates.
  
- **User Interaction:** The user can interact with the map, click on place markers, and view detailed information about each recommended location, such as ratings, descriptions, and user reviews. The AI continues the conversation, refining the trip plan as new queries are asked.

---

### 2. **LocalInsights:**

#### Flow:
- **User Input:** The user enters a location to explore nearby places using the search bar.
  
- **Google Maps Integration:** The frontend uses the **Google Maps API** to get the search results and display relevant places (e.g., restaurants, hotels, attractions) around the entered location.
  
- **Results Visualization:** These places are displayed on the map, with markers showing their exact locations. The user can click on these markers to get more details about the places.
  
- **Dynamic Updates:** As the user moves around the map or zooms in, new places are dynamically loaded based on the updated map view.

---

### 3. **BudgetTracker:**

#### Flow:
- **User Input:** The user sets a budget and specifies their preferred currency.
  
- **Expense Tracking:** As the user enters expenses, the app tracks them in different categories (e.g., food, accommodation, transportation).
  
- **Currency Conversion:** The **ExchangeRate API** is used to convert all expenses into the user’s chosen currency, keeping track of the total spend.
  
- **Visual Data:** The data is displayed through charts (e.g., pie charts) to visualize the user's budget progress and expenses across different categories.
  
- **Alerts:** The app triggers notifications when the user’s budget reaches 80%, 90%, or exceeds the set limit, helping users manage their finances.

---

### 4. **Booking Integration:**

#### Flow:
- **User Input:** The user searches for hotels in a specified location and selects preferred dates for their stay.
  
- **Data Fetching:** The backend uses **TBO API** to fetch the available hotels and rooms based on the user's query.
  
- **Real-Time Availability:** The TBO API provides real-time availability and pricing for hotels and rooms.
  
- **Booking Process:** The user selects a hotel and room type, and the app guides them through the booking process, collecting payment information and confirming the reservation.

---

## Notes

- **Important:** Make sure to set up and configure the following API keys and endpoints:
    - **Google API Keys** (for Maps, Places, Directions, etc.)
    - **RapidAPI Keys** (for Travel Advisor and OpenWeather APIs)
    - **ExchangeRate API Key** (for currency exchange in BudgetTracker)
    - **TBO API Keys** (for booking integration)
    - **Gemini API Key** (for AI-based place extraction)

---

## Author

**Ramharsh**  
**Team Name:** Vision_Coders  
**Repository:** [VoyageHack 2.0 Prototype](https://github.com/Ramharsh-aidev/VoyageHack_2.O_Prototype)  
**Email:** [ramsdandekar@gmail.com]    

---
