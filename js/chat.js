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

export function initializeChat() {
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

      const section = Object.keys(contextExperience).find((key) =>
        userMessage.toLowerCase().includes(key)
      );

      console.log({
        section,
      })

      const answersAvailable = section ? section.length : 0;
      const response = answersAvailable === 0 ?
        contextExperience.default[Math.floor(Math.random() * contextExperience.default.length)] :
        contextExperience[section][Math.floor(Math.random() * contextExperience[section].length)];


      const delay = Math.random() * (1000 - 300) + 300; // Random delay between 300ms and 1s
      setTimeout(() => addMessage(response, "ai"), delay);
    }
  });

  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      chatSend.click();
    }
  });
}