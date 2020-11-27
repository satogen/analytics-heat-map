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
  const get_click_data = async (site_id) => {
    // Ajax通信を開始
    await $.ajax({
        url: 'get_click_data',
        type: 'GET',
        dataType: 'json',
        data:{
          'site_id': site_id
        }
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
    if (resposen_data){
      heatmapInstance.addData(resposen_data);
    }else{
      alert('データがありません');
    }
  }

  // データの検索
  $("#target_search").submit(async(event) =>{
    event.preventDefault();
    let target_url = $("#site_url_field").val();
    let target_site_id = $("#site_id_field").val();

    // Iframeの表示
    document.getElementById('target_frame').src = target_url;

    // ターゲットのサイト検索
    await get_click_data(target_site_id);

    // データを挿入
    await add_data_heatmap();

  });

  // 関数の実行
  const processAll = async function () {
    // await iframeResize();
    await create_heat_map()
  }
  // プロセスの実行
  processAll()