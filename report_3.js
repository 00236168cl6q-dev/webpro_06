"use strict";
const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(path.join(__dirname + "/public")));
app.use(express.urlencoded({ extended: true }));

let deltarune = [
    { name:"ダークキャンディ", chapter:"Ch1", effect:"40HP回復", describe:"赤と黒の星形キャンディ。マシュマロみたいな味がする。", place:"Ch1 平原エリアの木・ヌイの店(40D$)", plus_alpha:"所持したまま光の世界に戻ると、マシュマロの香りの「ゴミのかたまり」に変化", image:"nui_Ch1.jpg"},
    { name:"リザレクトミント", chapter:"Ch1・Ch2・Ch3・Ch4", effect:"倒れた仲間が復活", describe:"緑色をした ミントの香りのクリスタル。", place:"Ch1 森の宝箱・Ch2 クイーンの館宝箱・Ch3 ボールマシン・ランク報酬(ラウンド1,A/Bランク)・エントランスのパズル・Ch4 ミズルから「する」・第二の聖域(寄付額による)・第二の聖域ピアノのパズル", plus_alpha:"", image:"Resurrect.png"},
    { name:"トップケーキ", chapter:"Ch1", effect:"仲間全員を160HP回復", describe:"一口食べると舌がクルクルおどる絶品ケーキ。", place:"Ch1 こわれたケーキを修理", plus_alpha:"", image:"top_cake.png"},
    { name:"スピンロール", chapter:"Ch1・Ch2・Ch4", effect:"仲間全員を回復(ランダム)", describe:"コマの形をした菓子パン。", place:"Ch1 トップシェフにトップケーキを渡す・Ch1,Ch2,Ch4 スピンロールを所持していないときトップシェフに話しかける", plus_alpha:"Ch1:80HP回復・Ch2:140HP回復・Ch3:150HP回復・Ch4:160HP回復", image:"spin_role.jpeg"},
    { name:"ダークバーガー", chapter:"Ch1・Ch2", effect:"70HP回復", describe:"ナゾのハンバーガー。なぜか黒い・・・と思ったらコゲてるだけだった!", place:"Ch1,Ch2 ヌイの店(70D$)", plus_alpha:"", image:"nui_Ch1.jpg"},
    { name:"ランサークッキー", chapter:"Ch1・Ch2・Ch4", effect:"HP回復(ランダム)", describe:"ランサーの顔の形をしたクッキー。じつはクッキーじゃないかも・・・", place:"Ch1 スイーツ即売会でランサーとスージィから購入(40D$,1回限り)・Ch2,Ch4 キャッスルタウンでランサーからもらえる", plus_alpha:"戦闘時か否か&チャプターによって回復量が変わる・Ch2,Ch4では未所持の場合、キャッスルタウンのベーカリーにいるランサーに話しかけると何度でももらえる", image:"cokkie.jpg"},
    { name:"クラブサンド", chapter:"Ch1・Ch2", effect:"仲間全員を回復", describe:"3つに割れるサンドイッチ。", place:"Ch1 カルタス城宝箱・Ch2 道場「クローバー・リマッチ」景品", plus_alpha:"Ch1では30HP回復 Ch2では70HP回復", image:"dojo.webp"},
    { name:"ハートドーナツ", chapter:"Ch1", effect:"キャラ毎に回復量変化", describe:"ハートの形のドーナツ。中の赤いジャムは空気に触れると固まる。", place:"Ch1 スイーツ即売会(40D$)", plus_alpha:"<フィールド使用時のHP回復量>クリス:20HP スージィ:80HP ラルセイ:50HP ノエル:30HP", image:"hurt.webp"},
    { name:"チョコダイヤ", chapter:"Ch1", effect:"キャラ毎に回復量変化", describe:"かなり小さい。好きなひとは なぜか ものすごく好き。", place:"Ch1 スイーツ即売会(40D$)", plus_alpha:"<フィールド使用時のHP回復量>クリス:80HP スージィ:20HP ラルセイ:50HP ノエル(とクリス):35HP", image:"hurt.webp"},
    { name:"ルールノールー", chapter:"Ch1", effect:"50HP回復", describe:"ほうじゅんな香りの黒っぽいルー。ミミズ入り。", place:"Ch1 ルールノ・カァドーの店(50D$)", plus_alpha:"", image:"ru-runo-.webp"},
    { name:"CDベーグル", chapter:"Ch2・Ch4", effect:"80HP回復", describe:"なぜか鏡状の 歯ごたえバツグンのベーグル。ひと口ごとに音を奏でる。", place:"Ch2 スイート・キャップ・ケーキ(100D$)・サイバーシティ封印後ヌイの店(100D$)・Ch4 ヌイの店", plus_alpha:"", image:"CD.jpg"},
    { name:"クリスティー", chapter:"Ch2", effect:"キャラ毎に回復量変化", describe:"自分の味のティー。「クリス味」とだけ書いてある。", place:"Ch2 アドソン(100D$)", plus_alpha:"<回復量>クリス:10HP スージィ:120HP ラルセイ:120HP ノエル:70HP", image:"adoson.webp"},
    { name:"ノエルティー", chapter:"Ch2", effect:"キャラ毎に回復量変化", describe:"自分の味のティー。「ノエル味」とだけ書いてある。", place:"Ch2 アドソン(100D$)", plus_alpha:"<回復量>クリス:70HP スージィ:120HP ラルセイ:50HP ノエル:10HP", image:"adoson.webp"},
    { name:"ラルセイティー", chapter:"Ch2", effect:"キャラ毎に回復量変化", describe:"自分の味のティー。「ラルセイ味」とだけ書いてある。", place:"Ch2 アドソン(100D$)", plus_alpha:"<回復量>クリス:60HP スージィ:120HP ラルセイ:10HP ノエル:50HP", image:"adoson.webp"},
    { name:"スージィティー", chapter:"Ch2", effect:"キャラ毎に回復量変化", describe:"自分の味のティー。「スージィ味」とだけ書いてある。", place:"Ch2 アドソン(100D$)", plus_alpha:"<回復量>クリス:120HP スージィ:10HP ラルセイ:120HP ノエル:400HP", image:"adoson.webp"},
    { name:"ダブルDバーガー", chapter:"Ch2", effect:"60HP回復&70HP", describe:"ダブルダークバーガー。2くちで食べよう!", place:"Ch2 アイテム合成(ダークバーガー2個)", plus_alpha:"<回復量>一口目:60HP 二口目:70HP", image:"nui_Ch1.jpg"},
    { name:"ライトキャンディ", chapter:"Ch1・Ch2", effect:"120HP回復", describe:"チョークっぽい食感の白いキャンディ。", place:"Ch1 ホームタウンのノエルとの会話の選択肢次第・Ch2 冒頭で入手", plus_alpha:"", image:"noel.jpg"},
    { name:"シツジュース", chapter:"Ch2", effect:"100HP回復", describe:"正式名称: 執事ジュース。温度によって色が変わる。", place:"Ch2 パレッタの店(200D$)", plus_alpha:"", image:"paretta.jpg"},
    { name:"テンションビッツ", chapter:"Ch2", effect:"TP32%上昇", describe:"(フィールド使用時)・・・バトル中に使ったほうが よさそうだ。", place:"Ch2 サイバーシティーの宝箱", plus_alpha:"", image:"bits.png"},
    { name:"テンションジェム", chapter:"Ch2・Ch3・Ch4", effect:"TP50%上昇", describe:"(フィールド使用時)・・・バトル中に使ったほうが よさそうだ。", place:"Ch2 道場の「CH2オールスター」景品・Ch3 ランク報酬(ラウンド2,A/Bランク)・Ch4 闇の聖域", plus_alpha:"", image:"jem.webp"},
    { name:"リザレクトダスト", chapter:"Ch2", effect:"味方全員HP25%で復活", describe:"ミントの香りの粉。", place:"Ch2 クイーンの館の宝箱", plus_alpha:"", image:"queen.jpg"},
    { name:"S.POISON", chapter:"Ch2", effect:"味方にダメージ", describe:"色とりどりの正方形でできた水薬。飲むと毒状態になる。", place:"Ch2 スパムトンの店(ランダム価格)", plus_alpha:"フィールド使用時HP-20", image:"spamton.jpg"},
    { name:"くさったティー", chapter:"Ch2", effect:"10HP回復", describe:"ザツに いれたせいで 少し時間がたっただけで 味が落ちた お茶。", place:"Ch2からフレーバーティーを持ち越し", plus_alpha:"", image:"adoson.webp"},
    { name:"テンションMAX", chapter:"Ch3", effect:"バトル中TPを満タンにする", describe:"(フィールド使用時)・・・バトル中に使ったほうが よさそうだ。", place:"Ch3 ボールマシン", plus_alpha:"", image:"MAX.png"},
    { name:"TVディナー", chapter:"Ch3", effect:"100HP回復", describe:"(セーブファイル1の場合)テレビの形をしたレンチンフード。大好物のパイの 巨大なかけらつき。(セーブファイル2の場合)テレビの形をしたレンチンフード。とがった鼻が アイスのコーンになっている。(セーブファイル3の場合)テレビの形をしたレンチンフード。ヴィーガンステーキは顔の形じゃない。", place:"Ch3 本番直前のピピンズ(250D$)・楽屋(グリーンルーム)自販機(60PTs/200D$)", plus_alpha:"", image:"gakuya.webp"},
    { name:"TVカス", chapter:"Ch3", effect:"Ch3 楽屋(ワープドアのエリア)自販機(30PTs)・ボールマシン・更衣室自販機(20PTs)", describe:"パッとしない味の 食堂フード。アイスクリームのコーンは ふやけてブヨブヨ。", place:"Ch3 楽屋(ワープドアのエリア)自販機(30PTs)・ボールマシン・更衣室自販機(20PTs)", plus_alpha:"", image:"gakuya.webp"},
    { name:"VIPビュッフェ", chapter:"Ch3・Ch4", effect:"仲間全員を100HP回復", describe:"ギョーカイのお偉いさん向けのディナー。ブルーの\"キャビア\"は 忘れられない味。", place:"Ch3 ボールマシン・Ch4 道場", plus_alpha:"", image:"ball.jpg"},
    { name:"DELUXEディナー", chapter:"Ch3", effect:"140HP回復", describe:"高ランクの挑戦者にふるまわれるTVディナー。取り外し可能なアンテナつき。", place:"Ch3 楽屋(グリーンルーム)自販機(120PTs/600D$)・ボールマシン", plus_alpha:"", image:"gakuya.webp"},
    { name:"ピピス", chapter:"Ch3", effect:"何も起こらない", describe:"とある だれかのXXX。バトル中では使えない。(Ch3のZ部屋の中で操作を15分放置した後に選択すると)とある だれかのXXX。チュンチュン泣いている。", place:"Ch3 BONUS ZONE先のエリア(条件あり)", plus_alpha:"<フィールド使用時のHP回復量>クリス:100HP スージィ:使用不可 ラルセイ:使用不可", image:"pipis.jpg"},
    { name:"気の抜けたソーダ", chapter:"Ch3", effect:"20HP回復", describe:"だれかが開けて ガッツリ飲んで 気が抜けたソーダ。", place:"Ch3 裏ルートスージィ", plus_alpha:"", image:"suzie.jpg"},
    { name:"DDキャンディ", chapter:"Ch4", effect:"120HP回復", describe:"時間がたって 甘さが増したキャンディ。焼いたマシュマロの味がするらしい。", place:"Ch4 ヌイの店・ミズルから「する」", plus_alpha:"", image:"mizuru.png"},
    { name:"オールドスイート", chapter:"Ch4", effect:"400HP回復(クリス専用)", describe:"チョコ味のコーンに まほうのシンボルが 彫り込まれている。", place:"(入手条件)Ch1でダークキャンディを入手していない・Ch2でCDベーグルを入手していない・ダークキャンディ,CDベーグル,リザレクトミント,リザレクトダスト,ダークバーガー,テンションビット/ジェム/MAXを所持していない・Ch4の教会イベントでポケットの中を探る(引き継ぎ無しでCh4を始めれば簡単に入手できる)", plus_alpha:"", image:"old.jpg"},
    { name:"ラプソティー", chapter:"Ch4", effect:"115HP回復", describe:"軽い口当たりの銀色ドリンク。注ぐと やさしい歌声のような音がする。", place:"Ch4 書斎の店(250D$)", plus_alpha:"", image:"syosai.jpg"},
    { name:"スカーレッティー", chapter:"Ch4", effect:"160HP回復", describe:"真っ赤なドリンク。甘ったるいフルーツフレーバー。", place:"Ch4 書斎の店(450D$)・ミズルから「する」・第二の聖域(寄付額による)", plus_alpha:"", image:"syosai.jpg"},
    { name:"ビターティア", chapter:"Ch4", effect:"仲間一人のHPを全回復", describe:"空から降ってきた 苦い水の滴。", place:"Ch4 ミス・ミズルから「する」", plus_alpha:"", image:"ms_mizuru.png"},
]

app.get("/deltarune", (req, res) => {
  res.render('deltarune', { data: deltarune });
});

app.get("/deltarune/create", (req, res) => {
  res.redirect('/public/deltarune_new.html');
});

app.post("/deltarune", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const name = req.body.name;
  const chapter = req.body.chapter;
  const effect = req.body.effect;
  const describe = req.body.describe;
  const place = req.body.place;
  const plus_alpha = req.body.plus_alpha;
  const image = req.body.image;
  deltarune.push( { name: name, chapter: chapter, effect: effect, describe: describe, place: place, plus_alpha: plus_alpha, image: image } );
  console.log( deltarune );
  res.render('deltarune', {data: deltarune} );
});

app.get("/deltarune/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = deltarune[ number ];
  res.render("deltarune_detail", {id: number, data: detail, icon: { filename: "/public/" + detail.image, alt: detail.name + " jacket" }});
});

app.get("/deltarune/edit/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = deltarune[ number ];
  res.render('deltarune_edit', {id: number, data: detail} );
});

app.post("/deltarune/update/:number", (req, res) => {
  // 本来は変更する番号が存在するか，各項目が正しいか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  deltarune[req.params.number].name = req.body.name;
  deltarune[req.params.number].chapter = req.body.chapter;
  deltarune[req.params.number].effect = req.body.effect;
  deltarune[req.params.number].describe = req.body.describe;
  deltarune[req.params.number].place = req.body.place;
  deltarune[req.params.number].plus_alpha = req.body.plus_alpha;
  deltarune[req.params.number].image = req.body.image;
  console.log( deltarune );
  res.redirect('/deltarune' );
});

app.get("/deltarune/delete/:number", (req, res) => {
  // 本来は削除の確認ページを表示する
  // 本来は削除する番号が存在するか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = deltarune[ number ];
  res.render("deltarune_delete_check", {id: number, data: detail});
});

app.post("/deltarune/delete/:number", (req, res) => {
  const number = req.params.number;
  deltarune.splice(number, 1); // ← ここで初めて削除
  res.redirect("/deltarune");
});

app.use(function(req, res, next) {
    res.status(404).send('ページが見つかりません');
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));