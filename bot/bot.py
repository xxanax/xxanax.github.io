from telebot import types, TeleBot
import json
import gpt
import configparser

config = configparser.ConfigParser()
config.read("config.ini")

token = config['Telegram']['token']

bot = TeleBot(token, parse_mode = 'HTML')

@bot.message_handler(commands = ['start'])#Команда старт
def start(message):
	bot.send_chat_action(message.from_user.id, action = 'typing', timeout = 100)
	bot.send_message(message.chat.id, 'Используйте команды меню, чтобы узнать больше👇', reply_markup = types.ReplyKeyboardRemove())

@bot.message_handler(commands = ['portfolio'])
def portfolio(message):
	bot.send_chat_action(message.from_user.id, action = 'typing', timeout = 100)
	mark = types.ReplyKeyboardMarkup(resize_keyboard = True)
	webAppTest = types.WebAppInfo('https://xxanax.github.io')
	mark.add(types.KeyboardButton(text = "🛠 СМОТРЕТЬ ПОРТФОЛИО 🛠", web_app = webAppTest))

	bot.send_message(message.chat.id, 'Смотрите портфолио по кнопке ниже:', reply_markup = mark)

@bot.message_handler(commands = ['random'])
def random(message):
	bot.send_chat_action(message.from_user.id, action = 'typing', timeout = 100)
	mark = types.ReplyKeyboardMarkup(resize_keyboard = True)
	webAppTest = types.WebAppInfo('https://xxanax.github.io/random')
	mark.add(types.KeyboardButton(text = "🎲 Генератор случайных чисел 🎲", web_app = webAppTest))

	bot.send_message(message.chat.id, 'Генератор случайных чисел по кнопке ниже:', reply_markup = mark)

@bot.message_handler(commands = ['gpt'])
def send_gpt(message):
	bot.send_chat_action(message.from_user.id, action = 'typing', timeout = 100)
	mark = types.ReplyKeyboardMarkup(resize_keyboard = True)
	webAppTest = types.WebAppInfo('https://xxanax.github.io/gpt')
	mark.add(types.KeyboardButton(text = "💬 Задать вопрос ChatGPT 💬", web_app = webAppTest))

	bot.send_message(message.chat.id, 'ChatGPT в виде WebApp:', reply_markup = mark)

@bot.message_handler(content_types = "web_app_data")
def answer(webAppMes):
	data = json.loads(webAppMes.web_app_data.data)

	m = bot.send_message(webAppMes.from_user.id, f'💬 Вы: <i>{data["prompt"]}</i>')
	bot.send_chat_action(webAppMes.from_user.id, action = 'typing', timeout=60)

	answer = gpt.get_answer(data['prompt'])

	bot.edit_message_text(chat_id=m.chat.id,message_id=m.message_id,text = f'💬 Вы: <i>{data["prompt"]}</i>\n\n🤖 ChatGPT: <i>{answer}</i>')

if __name__ == '__main__':
	bot.infinity_polling()
