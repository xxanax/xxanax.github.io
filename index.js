let tg = window.Telegram.WebApp;
tg.expand();
tg.BackButton.isVisible = true;

tg.onEvent('backButtonClicked', function(){
	window.history.back();
});
