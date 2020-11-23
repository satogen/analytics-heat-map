# .env ファイルをロードして環境変数へ反映
from dotenv import load_dotenv
load_dotenv()

# 環境変数を参照
import os

SCOPES = ['https://www.googleapis.com/auth/analytics.readonly', 'https://www.googleapis.com/auth/analytics', 'https://www.googleapis.com/auth/analytics.edit']
KEY_FILE_LOCATION = os.getenv('KEY_FILE_LOCATION')
VIEW_ID = os.getenv('VIEW_ID')
WEB_PROPERTY_ID = os.getenv('WEB_PROPERTY_ID')