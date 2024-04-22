let tg = window.Telegram.WebApp;
tg.expand();

let btn = document.getElementById("generate");

btn.addEventListener('click', function(){ //вешаем событие на нажатие html-кнопки
	let min = parseInt(document.getElementById("min").value);
	let max = parseInt(document.getElementById("max").value);
	let random = 0;
	if (Number.isInteger(min) && Number.isInteger(max)){
		random = Math.floor(Math.random() * (max - min + 1) + min);
	} else {
		random = 0; 
	};

	let result_div = document.getElementById("random_number");

	result_div.innerText = random;

});
