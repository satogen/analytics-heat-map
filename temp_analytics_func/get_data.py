
from apiclient.discovery import build
from oauth2client.service_account import ServiceAccountCredentials

import config


# 取得対象の値
m_list = ['users', 'sessions', 'pageviews', 'bounceRate', 'exitRate', 'avgTimeOnPage',]
d_list = ['dimension2', 'dimension3', 'dimension4', 'dimension5']
metrics = [{'expression': 'ga:' + m} for m in m_list]
dimensions = [{'name': 'ga:' + d} for d in d_list]


# リクエストする基本設定
start_date = '2018-07-01'
end_date = 'today'
page_size = 100000
sampling_level = 'LARGE'


def initialize_analytics_reporting(key_file_location=config.KEY_FILE_LOCATION):
    """
    APIとの接続をする

    Parameters
    ----------
    key_file_location : str
        GCPで取得したサービスアカウントのJsonファイルのパス

    Returns
    -------
    body : dict
        辞書型のBody
    """
    credentials = ServiceAccountCredentials.from_json_keyfile_name(key_file_location, config.SCOPES)
    return build('analyticsreporting', 'v4', credentials=credentials)


def get_body(view_id=config.VIEW_ID):
    """
    レクエストするBodyを返す

    Parameters
    ----------
    view_id : str
        AnalyticsのビューID

    Returns
    -------
    body : dict
        辞書型のBody
    """ 
    body = {
        'reportRequests': [
            {
                'viewId': view_id,
                'dateRanges': [{'startDate': start_date, 'endDate': end_date}],
                'metrics': metrics,
                'dimensions': dimensions,
                'pageSize': page_size,
                'samplingLevel': sampling_level,
                # 'filters': 'ga:dimension2!=0;ga:dimension3!=0',
            }
        ]
    }
    return body


def get_dimensions():
    """
    カスタムディメンションの値を取得する

    Returns
    -------
    data : list
        x, y, window_width, site_idのlist
    """
    analytics = initialize_analytics_reporting(config.KEY_FILE_LOCATION)
    response = analytics.reports().batchGet(body=get_body(config.VIEW_ID)).execute()
    return response['reports'][0]['data']['rows']