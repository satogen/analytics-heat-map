from flask import Flask, render_template 

# グーグルの方の呼び出し
from temp_analytics_func import get_data

app = Flask(__name__)

@app.route('/')
def top():
    #アナリティクスからデータの取得
    value = get_data.get_dimensions()
    return render_template('top.html', resposen_data = value, title='flask test') #変更

## おまじない
if __name__ == "__main__":
    app.run(debug=True)