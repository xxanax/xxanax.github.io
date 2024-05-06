const tg = window.Telegram.WebApp;
tg.expand();

const minusButton = document.getElementById('minus_length');
const plusButton = document.getElementById('plus_length');
const lengthValue = document.getElementById('password_lenght');

const minLenght = 6;
const maxLenght = 20;

minusButton.addEventListener('click', event => {
	const currentValue = Number(lengthValue.innerHTML) || 0;
	if (currentValue!=minLenght){
		lengthValue.innerHTML = currentValue - 1;
	}

});

plusButton.addEventListener('click', event => {
	const currentValue = Number(lengthValue.innerHTML) || 0;
	if (currentValue!=maxLenght){
		lengthValue.innerHTML = currentValue + 1;
	}
});


function generatePassword(){
	let length = Number(lengthValue.innerHTML) || 0;
	let secure = document.getElementById('secure').checked;
	console.log(secure)
	if (secure == true){
		var charset = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$";
	} else{
		var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	};

	res = '';
	for (var i = 0, n = charset.length; i < length; ++i) {
		res += charset.charAt(Math.floor(Math.random() * n));
	}
	document.getElementById("password").innerHTML = res;

}

document.getElementById("generate").onclick = generatePassword;