let tg = window.Telegram.WebApp;
tg.expand();
tg.BackButton.isVisible = true;

Telegram.WebApp.onEvent('backButtonClicked', function(){
	window.history.go(-1);
});
