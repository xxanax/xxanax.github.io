from telebot import types, TeleBot
from telebot.handler_backends import BaseMiddleware

import datetime
import json
import configparser

import gpt
import db

## Get data from config
config = configparser.ConfigParser()
config.read("config.ini")

token = config['Telegram']['token']
portfolio_url = config['Urls']['portfolio_url']
random_url = config['Urls']['random_url']
gpt_url = config['Urls']['gpt_url']

def time_left_tomorrow():
## Get time left for tomorrow
	today = datetime.datetime.now(datetime.timezone(datetime.timedelta(hours = 3)))
	tomorrow = datetime.datetime.combine(today, datetime.time.min) + datetime.timedelta(days = 1)
	today = today.replace(tzinfo=None)
	d = tomorrow - today		
	mm, ss = divmod(d.seconds, 60)
	hh, mm = divmod(mm, 60)
	return [hh, mm, ss]

class users_middleware(BaseMiddleware):
## Add new users to database and update usernames if changing
	def __init__(self):
		self.update_types = ['message','callback_query']

	def pre_process(self, update, data):
		user = db.get_user(update.from_user.id)
		if user!=[]:
			if update.from_user.username!=None:
				if str(user[1])!=str(update.from_user.username):
					db.update_username(update.from_user.id, update.from_user.username)
		else:
			db.add_user(update.from_user.id, update.from_user.username)
	
	def post_process(self, message, data, exception):
		pass


bot = TeleBot(token, parse_mode = 'HTML', use_class_middlewares=True)

@bot.message_handler(commands = ['start'])
def start(message):
## Start command
	bot.send_chat_action(message.from_user.id, action = 'typing', timeout = 100)
	bot.send_message(message.chat.id, 'Проект на GitHub: <a href="https://github.com/xxanax/xxanax.github.io">ссылка</a>\n\nИспользуйте команды меню, чтобы узнать больше👇', reply_markup = types.ReplyKeyboardRemove())



@bot.message_handler(commands = ['clicker'])
def clicker(message):
## Clicker command, send keyboard with link to clicker telegram bot
	bot.send_chat_action(message.from_user.id, action = 'typing', timeout = 100)
	mark = types.InlineReplyKeyboardMarkup()
	mark.add(types.InlineKeyboardButton(text = "🎲 Генератор случайных чисел 🎲", url = ""))

	bot.send_message(message.chat.id, 'Генератор случайных чисел по кнопке ниже:', reply_markup = mark)


@bot.message_handler(commands = ['portfolio'])
def portfolio(message):
## Portfolio command, send portfolio page webApp
	bot.send_chat_action(message.from_user.id, action = 'typing', timeout = 100)
	mark = types.ReplyKeyboardMarkup(resize_keyboard = True)
	webAppTest = types.WebAppInfo(portfolio_url)
	mark.add(types.KeyboardButton(text = "🛠 СМОТРЕТЬ ПОРТФОЛИО 🛠", web_app = webAppTest))

	bot.send_message(message.chat.id, 'Смотрите портфолио по кнопке ниже:', reply_markup = mark)

@bot.message_handler(commands = ['random'])
def random(message):
## Random command, send random numbers generator page webApp
	bot.send_chat_action(message.from_user.id, action = 'typing', timeout = 100)
	mark = types.ReplyKeyboardMarkup(resize_keyboard = True)
	webAppTest = types.WebAppInfo(random_url)
	mark.add(types.KeyboardButton(text = "🎲 Генератор случайных чисел 🎲", web_app = webAppTest))

	bot.send_message(message.chat.id, 'Генератор случайных чисел по кнопке ниже:', reply_markup = mark)

@bot.message_handler(commands = ['gpt'])
def send_gpt(message):
## Gpt command, send ChatGPT based page webApp
	bot.send_chat_action(message.from_user.id, action = 'typing', timeout = 100)
	mark = types.ReplyKeyboardMarkup(resize_keyboard = True)
	webAppTest = types.WebAppInfo(gpt_url)
	mark.add(types.KeyboardButton(text = "💬 Задать вопрос ChatGPT 💬", web_app = webAppTest))

	bot.send_message(message.chat.id, 'ChatGPT в виде WebApp:', reply_markup = mark)

@bot.message_handler(content_types = "web_app_data")
def answer(webAppMes):
## Handle webAppData and asnwer to prompts if user have less than 5 prompts today
	bot.send_chat_action(webAppMes.from_user.id, action = 'typing', timeout=50)

	user_today_prompts = db.get_user_today_prompts(webAppMes.from_user.id)

	if len(user_today_prompts)<=5:
		data = json.loads(webAppMes.web_app_data.data)

		m = bot.send_message(webAppMes.from_user.id, f'💬 Вы: <i>{data["prompt"]}</i>')
		bot.send_chat_action(webAppMes.from_user.id, action = 'typing', timeout = 100)

		answer = gpt.get_answer(data['prompt'])
		db.add_prompt(webAppMes.from_user.id, data['prompt'], answer)

		bot.edit_message_text(chat_id = m.chat.id, message_id = m.message_id, text = f'💬 Вы: <i>{data["prompt"]}</i>\n\n🤖 ChatGPT: <i>{answer}</i>')
	else:
		time_left = time_left_tomorrow()

		bot.send_message(webAppMes.from_user.id, f'Сегодня вы уже использовали 5 доступных запросов ⛔️\n\nВы сможете попробовать снова через {time_left[0]}ч. {time_left[1]}мин. {time_left[2]}сек. 🕒')

if __name__ == '__main__':
	## Init database tables
	db.create_users_table()
	db.create_prompts_table()

	## Init users midlleware and bot commands list
	bot.setup_middleware(users_middleware())
	bot.set_my_commands(
		[
			types.BotCommand("/portfolio", "Резюме в виде WebApp 📋"),
			types.BotCommand("/random", "Генератор случайных чисел 🔢"),
			types.BotCommand("/gpt", "Задать вопрос ChatGPT 💭")
			types.BotCommand("/clicker", "Пет-проект WebAppClicker 🛠")
		])

	## Run polling
	bot.infinity_polling()
