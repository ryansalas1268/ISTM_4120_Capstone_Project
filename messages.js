const currentUser = "You";


const chatData = {
   "Beach trip 🔥": {
       subtitle: "5 members • Linked to your event",
       messages: [
           { sender: "Shuba", text: "Hey everyone, Friday 7 PM is winning the vote right now. Are we locking that in?", time: "10:12 AM" },
           { sender: "Lauren", text: "Works for me. I’m already marked as going.", time: "10:14 AM" },
           { sender: "You", text: "I’m good for Friday too. I can bring snacks.", time: "10:16 AM" }
       ]
   },


   "Movie Night 🎬": {
       subtitle: "4 members • Linked to your event",
       messages: [
           { sender: "Lauren", text: "Popcorn is covered already 🍿", time: "7:40 PM" },
           { sender: "Nabil", text: "I can bring drinks.", time: "7:42 PM" },
           { sender: "You", text: "I’ll get there around 8.", time: "7:45 PM" }
       ]
   },


   "Shuba": {
       subtitle: "Direct message",
       messages: [
           { sender: "Shuba", text: "Can you vote on the final time?", time: "1:20 PM" },
           { sender: "You", text: "Yeah, I’ll do it in a minute.", time: "1:22 PM" },
           { sender: "Shuba", text: "Thanks! I want to confirm with everyone tonight.", time: "1:23 PM" }
       ]
   }
};


let activeChat = "Beach trip 🔥";


function renderChat(chatName) {
   const chat = chatData[chatName];
   const chatTitle = document.getElementById("chatTitle");
   const chatSubtitle = document.getElementById("chatSubtitle");
   const chatMessages = document.getElementById("chatMessages");


   activeChat = chatName;
   chatTitle.textContent = chatName;
   chatSubtitle.textContent = chat.subtitle;


   chatMessages.innerHTML = "";


   chat.messages.forEach(msg => {
       const messageRow = document.createElement("div");
       messageRow.classList.add("message-row");


       if (msg.sender === currentUser) {
           messageRow.classList.add("my-message");
       }


       messageRow.innerHTML = `
           <div class="message-bubble">${msg.text}</div>
           <div class="message-meta">${msg.sender} • ${msg.time}</div>
       `;


       chatMessages.appendChild(messageRow);
   });


   chatMessages.scrollTop = chatMessages.scrollHeight;
}


function selectChat(chatName, element) {
   const items = document.querySelectorAll(".conversation-item");
   items.forEach(item => item.classList.remove("active"));
   element.classList.add("active");


   renderChat(chatName);
}


function sendMessage() {
   const input = document.getElementById("messageInput");
   const text = input.value.trim();


   if (text === "") return;


   const newMessage = {
       sender: "You",
       text: text,
       time: "Just now"
   };


   chatData[activeChat].messages.push(newMessage);
   renderChat(activeChat);
   input.value = "";
}


document.getElementById("messageInput").addEventListener("keydown", function(e) {
   if (e.key === "Enter") {
       sendMessage();
   }
});


window.onload = function () {
   renderChat(activeChat);
};
