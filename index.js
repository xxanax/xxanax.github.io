let tg = window.Telegram.WebApp;
tg.expand();
tg.BackButton.isVisible = true;

tg.BackButton.onClick(window.history.go(-1));

