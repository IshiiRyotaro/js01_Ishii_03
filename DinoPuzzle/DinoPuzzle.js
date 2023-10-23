"use strict";

// 厳格モードで起動(エラーチェックが厳しくなるらしい)
const tiles = []; 
// タイルの箱

function init() {
    let table = document.getElementById("table"); 
    // tableのIdを取得

    for (let i = 0; i < 5; i++) {
        // 5行分ループする
        let tr = document.createElement("tr"); 
        // trの作成
        for (let j = 0; j < 5; j++) {
            // 列分ループ
            let td = document.createElement("td"); 
            // tdの作成
            let index = i * 5 + j;
            td.className = "tile";
            // class設定
            td.index = index; 
            // タイルの並び順
            td.value = index; 
            // 描画されている値
            td.textContent = index == 0 ? "" : index; 
            // 0は空欄に
            td.onclick = click; 
            // クリック時のハンドラ登録
            tr.appendChild(td); 
            // trにtdを追加
            tiles.push(td);
        }
        table.appendChild(tr); 
        // テーブルにtrを追加
    }

    for (let i = 0; i < 5000; i++) {
        // 5000回、クリックしてランダムに並べ替える
        // ここの数字変えると難易度変わる
        click({ target: { index: Math.floor(Math.random() * 25) } });
    }
}

function click(e) {
    let i = e.target.index; 
    // どの場所がクリックされたか
    if (i - 5 >= 0 && tiles[i - 5].value == 0) {
        // クリックした場所の上にタイルがあり、かつそのタイルの上が空白の時
        swap(i, i - 5); // 上と入れ替え
    } else if (i + 5 < 25 && tiles[i + 5].value == 0) {
        swap(i, i + 5); // 下と入れ替え
    } else if (i % 5 != 0 && tiles[i - 1].value == 0) {
        swap(i, i - 1); // 左と入れ替え
    } else if (i % 5 != 4 && tiles[i + 1].value == 0) {
        swap(i, i + 1); // 右と入れ替え
    }
}

// i番目のタイルとj番目のタイルの番号を入れ替え
function swap(i, j) {
    let tmp = tiles[i].value;
    tiles[i].textContent = tiles[j].textContent;
    tiles[i].value = tiles[j].value;
    tiles[j].textContent = tmp;
    tiles[j].value = tmp;
    // iをtmpに一旦保存して、iタイルにjタイルのテキストを代入→iの値をjの値に置き換え
    // jにtmpに保存してあったiの値を代入＝数字が入れ替わるのでタイルが入れ替わったように見える
}

