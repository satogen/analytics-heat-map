 /* 
  全体で使用する変数を定義
 */
  
  // ヒートマップのインスタンス・データを受け取る変数
  let heatmapInstance = resposen_data = null;

  // ローカルストレージでサイトの情報を保存するKey名
  const ls_key_name = 'site_data'


 /* 
   ヒートマップに関連する処理
 */

  // Iframeタグの参照先の高さを取得・指定
  const iframeResize = async () => {
    window.addEventListener('message', function (e) {
      //if(e.origin=="http://rwd-book.info"){
      document.getElementById('target_frame').height = document.getElementById('target').height = e.data;
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


  // サイトのデータの追加
  const add_to_html = async (value) =>{
    $('.nav-tabs').append(
    `<li class="nav-item">` + 
      `<a class="nav-link target_site" href="javascript:get_click_data('${value.site_id}')">`+
        value.site_name +
      `</a>` + 
    `</li>`
    ); 
  }


  // ヒートマップ表示までの動作
  const display_heat_map = async (site_url, site_id) =>{
    // Iframeの表示
    document.getElementById('target_frame').src = site_url;

    // Iframeのサイズ調整
    await iframeResize();

    // ターゲットのサイト検索
    await get_click_data(site_id);

    // データを挿入
    await add_data_heatmap();    
  }


 /* 
   ローカルストレージに関係する処理
 */

  // ローカルストレージに保存
  const save_site_data = async (value) =>{
    localStorage.setItem(ls_key_name,JSON.stringify(value));
    // アイテムの追加
    await add_to_html(value);
  }


  // ローカルストレージの値を確認
  const check_site_data = async () => {
    local_site_data = JSON.parse(localStorage.getItem(ls_key_name));
    if (local_site_data){
      await add_to_html(local_site_data);
    }
  }


 /* 
   サイト内での動作に対する処理
 */

  // データの検索
  $("#target_search").submit(async(event) =>{
    event.preventDefault();
    let target_site_url = $("#site_url_field").val();
    let target_site_id = $("#site_id_field").val();
    let target_site_name = $("#site_name_field").val();

    // ローカルストレージに保存
    await save_site_data({
      'url' : target_site_url, 
      'site_id': target_site_id,
      'site_name': target_site_name
    });

    // ヒートマップの描写
    await display_heat_map(target_site_url, target_site_id);

  });
  

  /* 
   初期描写用の関数
 */
  const processAll = async function () {
    await check_site_data();
  }

  // プロセスの実行
  processAll()