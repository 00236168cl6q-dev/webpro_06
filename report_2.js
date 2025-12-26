"use strict";
const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(path.join(__dirname + "/public")));
app.use(express.urlencoded({ extended: true }));

let wtt = [
    { name:"王楚欽", country:"中国", age:25, world_ranking:1, result:"世界卓球2025優勝・チャイナスマッシュ2025優勝・USスマッシュ2025優勝・チャンピオンズマカオ2025優勝", hand:"左", type:"シェーク攻撃型", image:"chuqin.webp"},
    { name:"林詩棟", country:"中国", age:20, world_ranking:2, result:"チャイナスマッシュ2024優勝・チャンピオンズマカオ2024優勝・チャンピオンズフランクフルト2024優勝", hand:"右", type:"シェーク攻撃型", image:"shidong.webp"},
    { name:"ヒューゴ・カルデラノ", country:"ブラジル", age:29, world_ranking:3, result:"卓球ワールドカップ2025優勝・スターコンテンダーリュブリャナ2025優勝", hand:"右", type:"シェーク攻撃型", image:"hugo.jpg"},
    { name:"張本智和", country:"日本", age:22, world_ranking:4, result:"ファイナルズ香港2025優勝・チャンピオンズ横浜2025優勝", hand:"右", type:"シェーク攻撃型", image:"harimoto.jpg"},
    { name:"トルルス・モーレゴード", country:"スウェーデン", age:23, world_ranking:5, result:"ヨーロッパスマッシュ2025優勝・チャンピオンズモンペリエ2025優勝", hand:"右", type:"シェーク攻撃型", image:"moregard.jpg"},
    { name:"フェリックス・ルブラン", country:"フランス", age:19, world_ranking:6, result:"チャンピオンスモンぺリエ2024優勝・スターコンテンダーマスカット2025優勝", hand:"右", type:"ペンホルダー", image:"F.jpg"},
    { name:"梁靖崑", country:"中国", age:29, world_ranking:7, result:"チャンピオンズ仁川2024優勝・コンテンダー太原2024優勝", hand:"右", type:"シェーク攻撃型", image:"jingkun.webp"},
    { name:"松島輝空", country:"日本", age:18, world_ranking:8, result:"チャンピオンズフランクフルト2025優勝・コンテンダー太原2025優勝", hand:"左", type:"シェーク攻撃型", image:"sora.webp"},
    { name:"アレクシス・ルブラン", country:"フランス", age:22, world_ranking:9, result:"コンテンダーザグレブ2024優勝", hand:"右", type:"シェーク攻撃型", image:"A.jpg"},
    { name:"チウ・ダン", country:"ドイツ", age:29, world_ranking:10, result:"スターコンテンダーロンドン2025優勝", hand:"右", type:"ペンホルダー", image:"dang.jpg"},
    { name:"向鵬", country:"中国", age:22, world_ranking:11, result:"チャンピオンズ仁川2025優勝", hand:"右", type:"シェーク攻撃型", image:"peng.jpg"},
    { name:"ベネディクト・デューダ", country:"ドイツ", age:31, world_ranking:12, result:"コンテンダースコピエ2025優勝", hand:"左", type:"シェーク攻撃型", image:"duda.jpg"},
    { name:"林昀儒", country:"台湾", age:24, world_ranking:13, result:"コンテンダーアルマトイ2023優勝", hand:"左", type:"シェーク攻撃型", image:"yunju.jpg"},
    { name:"ダルコ・ヨルジッチ", country:"スロベニア", age:27, world_ranking:14, result:"コンテンダーリマ2024優勝", hand:"右", type:"シェーク攻撃型", image:"darko.jpg"},
    { name:"安宰賢", country:"韓国", age:26, world_ranking:15, result:"コンテンダー太原2025優勝", hand:"右", type:"シェーク攻撃型", image:"an.webp"},
    { name:"アンデシュ・リンド", country:"デンマーク", age:27, world_ranking:16, result:"コンテンダーラゴス2025優勝", hand:"右", type:"シェーク攻撃型", image:"lind.jpg"},
    { name:"シモン・ゴジ", country:"フランス", age:31, world_ranking:17, result:"コンテンダーザグレブ2025ベスト4", hand:"右", type:"シェーク攻撃型", image:"gausy.jpg"},
    { name:"張禹珍", country:"韓国", age:30, world_ranking:18, result:"コンテンダーマスカット2022優勝", hand:"右", type:"シェーク攻撃型", image:"jang.webp"},
    { name:"李尚洙", country:"韓国", age:35, world_ranking:19, result:"チャンピオンズ仁川2025準優勝", hand:"右", type:"シェーク攻撃型", image:"sansu.webp"},
    { name:"戸上隼輔", country:"日本", age:24, world_ranking:20, result:"コンテンダーアルマトイ2025優勝", hand:"右", type:"シェーク攻撃型", image:"togami.jpg"},
];

app.get("/wtt", (req, res) => {
  res.render('wtt', { data: wtt });
});

app.get("/wtt/create", (req, res) => {
  res.redirect('/public/wtt_new.html');
});

app.post("/wtt", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const name = req.body.name;
  const country = req.body.country;
  const age = req.body.age;
  const world_ranking = req.body.world_ranking;
  const result = req.body.result;
  const hand = req.body.hand;
  const type = req.body.type;
  const image = req.body.image;
  wtt.push( { name: name, country: country, age: age, world_ranking: world_ranking, result: result, hand: hand, type: type, image: image } );
  console.log( wtt );
  res.render('wtt', {data: wtt} );
});

app.get("/wtt/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = wtt[ number ];
  res.render("wtt_detail", {id: number, data: detail, icon: { filename: "/public/" + detail.image, alt: detail.name + " jacket" }});
});

app.get("/wtt/edit/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = wtt[ number ];
  res.render('wtt_edit', {id: number, data: detail} );
});

app.post("/wtt/update/:number", (req, res) => {
  // 本来は変更する番号が存在するか，各項目が正しいか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  wtt[req.params.number].name = req.body.name;
  wtt[req.params.number].country = req.body.country;
  wtt[req.params.number].age = req.body.age;
  wtt[req.params.number].world_ranking = req.body.world_ranking;
  wtt[req.params.number].result = req.body.result;
  wtt[req.params.number].hand = req.body.hand;
  wtt[req.params.number].type = req.body.type;
  wtt[req.params.number].image = req.body.image;
  console.log( wtt );
  res.redirect("/wtt/" + number);
});

app.get("/wtt/delete/:number", (req, res) => {
  // 本来は削除の確認ページを表示する
  // 本来は削除する番号が存在するか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = wtt[ number ];
  res.render("wtt_delete_check", {id: number, data: detail});
});

app.post("/wtt/delete/:number", (req, res) => {
  const number = req.params.number;
  wtt.splice(number, 1); // ← ここで初めて削除
  res.redirect("/wtt");
});

app.use(function(req, res, next) {
    res.status(404).send('ページが見つかりません');
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));