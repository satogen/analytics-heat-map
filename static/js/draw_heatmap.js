  // ヒートマップのインスタンス・データを受け取る変数
  let heatmapInstance = resposen_data = null;

  // Iframeタグの参照先の高さを取得・指定
  const iframeResize = async () => {
    window.addEventListener('message', function (e) {
      //if(e.origin=="http://rwd-book.info"){
      console.log('hello ');
      document.getElementById('target_frame').height = document.getElementById('target').height = e.data;
      console.log(document.getElementById('target').height);
      console.log(document.getElementById('target'));
      //}
      create_heat_map();
    }, false);
  }

  // ヒートマップのインスタンス
  const create_heat_map = async () => {
    heatmapInstance = h337.create({
      container: document.querySelector('.canvas'),
      radius: 90
    });
    console.log('create heat');
  }

  //アナリティクスからデータを取得する 
  const get_click_data = async () => {
    // Ajax通信を開始
    await $.ajax({
        url: 'get_click_data',
        type: 'GET',
        dataType: 'json',
      })
      .done(function (data) {
        // 通信成功
        resposen_data = data;
        console.log('success');
      })
      .fail(function () {
        // 通信失敗
        console.log("error")
      });
  }

  // データの取り出しヒートマップに追加
  const heat_map_add = async () => {
    let result = resposen_data.reduce((prev, data, index, array) => {
      add_data_heatmap(data.dimensions);
      return index
    });
    console.log(result);
  }

  // ヒートマップに追加
  const add_data_heatmap = async () => {
    heatmapInstance.addData(resposen_data);
  }

  // 関数の実行
  const processAll = async function () {
    // await iframeResize();
    await get_click_data();
    await add_data_heatmap()
  }
  // プロセスの実行
  processAll()