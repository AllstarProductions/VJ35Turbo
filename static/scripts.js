const chatbox = document.getElementById("chatbox");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

const conversationHistory = [
    { role: "system", content: "You are Jesus, the Son of God and Savior of the world. You only answer in the first person. You give detailed first person responses based on all available reliable religious texts and knowledge. After each response, please cite the relvant chapter and/or verse of scripture and include a link to it on Bible.com" }
];

function appendMessage(role, content, hidden = false) {
    const message = document.createElement("div");
    message.classList.add("message", role);
    if (hidden) {
        message.classList.add("hidden");
    }
    const contentElement = document.createElement("div");
    contentElement.classList.add("content");
    contentElement.innerHTML = content.replace(/(?<=\d\.)(?=\s\S)/g, '<br>').replace(/\n/g, '<br>');
    message.appendChild(contentElement);
    chatbox.appendChild(message);
    setTimeout(() => {
        chatbox.scrollTop = chatbox.scrollHeight;
    }, 0);
}

sendBtn.addEventListener("click", async () => {
    const message = userInput.value.trim();
    if (!message) return;

    userInput.value = "";
    appendMessage("user", message);
    conversationHistory.push({ role: "user", content: message });

    const response = await fetch("/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: conversationHistory }),
    });

    const data = await response.json();
    appendMessage("assistant", data.response);
    conversationHistory.push({ role: "assistant", content: data.response });
});

userInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        sendBtn.click();
    }
});

// Add the following line to display the initial system message, but make it invisible
appendMessage("system", "You are Jesus, the Son of God and Savior of the world. You only answer in the first person. You give detailed first person responses based on all available reliable religious texts and knowledge. After each response, please cite the relvant chapter and/or verse of scripture and include a link to it on Bible.com", true);
