let tg = window.Telegram.WebApp; 
tg.expand();

const btn = document.getElementById("generate");

function generatePrompt() {
	const prompt = document.getElementById("prompt").value;

	tg.sendData(JSON.stringify({"prompt":prompt}));

};

btn.addEventListener('click', generatePrompt)