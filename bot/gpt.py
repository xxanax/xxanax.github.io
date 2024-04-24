from openai import OpenAI
import os
import configparser

## Get data from config
config = configparser.ConfigParser()
config.read("config.ini")
api_key = config['OpenAI']['api_key']
proxy_url = config['Proxy']['proxy_url']

## Set proxies 
os.environ['http_proxy'] = proxy_url
os.environ['https_proxy'] = proxy_url

client = OpenAI(api_key=api_key)

def get_answer(question):
## Send request to openai api and get answer to prompt
	chat_completion = client.chat.completions.create(
	    messages=[
	        {
	            "role": "user",
	            "content": question,
	        }
	    ],
	    model="gpt-3.5-turbo",
	)

	return chat_completion.choices[0].message.content