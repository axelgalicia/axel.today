let contextExperience = {};

fetch("./js/context-experience.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to load context-experience.json");
    }
    return response.json();
  })
  .then((data) => {
    contextExperience = data;
  })
  .catch((error) => {
    console.error("Error loading context-experience.json:", error);
  });

export const initializeChat = async () => {
  console.log("Chat initialized");
  const chatMessages = document.getElementById("chat-messages");
  const chatInput = document.getElementById("chat-input");
  const chatSend = document.getElementById("chat-send");

  function addMessage(content, sender) {
    const message = document.createElement("div");
    message.className = `chat-message ${sender}`;
    message.textContent = content;
    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  chatSend.addEventListener("click", () => {
    const userMessage = chatInput.value.trim();
    if (userMessage) {
      addMessage(userMessage, "user");
      chatInput.value = "";

      const words = userMessage.toLowerCase().split(/\s+/);
      let sectionKey = null;
      const synonyms = contextExperience.synonyms;

      for (const word of words) {
        sectionKey = Object.keys(synonyms).find((key) => {
          const isEqual = synonyms[key].some((synonym) => {
            const wordsSynonyms = synonym.toLowerCase().split(/\s+/);
            return wordsSynonyms.some((wordSynonym) => {
              return wordSynonym.toLowerCase() === word;
            });
          });
          return isEqual;
        });
        if (sectionKey) break;
      }

      const defaultResponseSection = contextExperience.sections.default;
      const sections = contextExperience.sections;

      let response;

      if (sectionKey && sections[sectionKey]) {
        const answers = sections[sectionKey];
        response = answers[Math.floor(Math.random() * answers.length)];
      }

      response = response ||
        defaultResponseSection[Math.floor(Math.random() * defaultResponseSection.length)];

      const delay = Math.random() * (1000 - 700) + 700; // Random delay between 300ms and 1s
      setTimeout(() => addMessage(response, "ai"), delay);
    }
  });

  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      chatSend.click();
    }
  });
}