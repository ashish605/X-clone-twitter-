import { GoogleGenAI } from "@google/genai";

const button = document.getElementById('enter');
const textarea = document.getElementById('question');
const chatDiv = document.querySelector('.chat'); // Main wrapper

const ai = new GoogleGenAI({ apiKey: "AIzaSyC_7O8uoBTlissdcVR_fctvMhXScqB73X4" });

async function main(input) {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: input,
  });

  const res = response.text;
  console.log(res);

  // Hide existing chat content
  document.getElementById("pancho").classList.add('hidden');
  document.getElementById("pancho1").classList.add('hidden');
  document.getElementById("pancho2").classList.add('hidden');
  chatDiv.classList.add('overflow-hidden');
  chatDiv.classList.add('max-h-32');

  // Wrapper div for bot response + button (to manage spacing easily)
  const responseWrapper = document.createElement('div');
  responseWrapper.className = "flex flex-col items-center  space-y-3 p-2 overflow-y-scroll scrollbar-hide";

  // Bot message with max height and overflow handling
  const botMessage = document.createElement('div');
  botMessage.textContent = `- ${res}`;
  botMessage.className = "text-white text-sm text-left h-28  w-full p-2 overflow-y-scroll scrollbar-hide";

  // Clear button
  const clearBtn = document.createElement('button');
  clearBtn.textContent = "Clear";
  clearBtn.className = "bg-white text-black font-bold p-2 px-3 m-x-auto rounded-3xl hover:bg-slate-300 m-3";

  // Clear functionality
  clearBtn.addEventListener('click', () => {
    // Show hidden elements
    document.getElementById("pancho").classList.remove('hidden');
    document.getElementById("pancho1").classList.remove('hidden');
    document.getElementById("pancho2").classList.remove('hidden');
    chatDiv.classList.remove('overflow-hidden');
    chatDiv.classList.remove('max-h-32');

    


    // Remove wrapper
    chatDiv.removeChild(responseWrapper);
    document.querySelector(".chatbox").removeChild(clearBtn);
    textarea.value = '';
  });

  // Append message and button to wrapper
  responseWrapper.appendChild(botMessage);
  document.querySelector(".chatbox").appendChild(clearBtn);

  // Append wrapper to chatDiv
  chatDiv.appendChild(responseWrapper);
}

button.addEventListener('click', () => {
  const userInput = textarea.value.trim();
  if (userInput !== '') {
    main(userInput);
  }
});
