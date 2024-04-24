import openai
import requests
from requests.auth import HTTPProxyAuth
import os
import configparser

config = configparser.ConfigParser()
config.read("config.ini")

api_key = config['OpenAI']['api_key']
proxy_url = config['Proxy']['proxy_url']

os.environ['http_proxy'] = proxy_url
os.environ['https_proxy'] = proxy_url

openai.api_key = api_key

def get_answer(question):
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