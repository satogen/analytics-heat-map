from flask import Flask, render_template, jsonify, request

# グーグルのAPIの呼び出し
from temp_analytics_func import get_data
import config

app = Flask(__name__)


@app.route('/')
def top():
    return render_template('top.html', title='Top Page', target_url=config.TARGET_URL)

# TODO: 後々は、Keyでサイトごとに指定をする


@app.route('/get_click_data')
def get_click_data():
    site_id = request.args.get('site_id')
    # アナリティクスからデータの取得
    value = get_data.get_dimensions(target_site_id=site_id)
    #　フロント側にデータの送信
    return jsonify(value)


# おまじない
if __name__ == "__main__":
    app.run(debug=True)
