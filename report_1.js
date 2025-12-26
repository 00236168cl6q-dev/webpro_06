"use strict";
const express = require('express');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(path.join(__dirname + "/public")));
app.use(express.urlencoded({ extended: true }));

let phigros = [
  { name:"Rrhar'il", level:17.6, author_music:"Team Grimoire", author_notes:"RWND -p 16493:62786:92551", bpm:"190", notes_figure:1300, time:132 ,notes_density:9.85, image:"rrharil.jpg.webp"},
  { name:"Distorted Fate", level:17.4, author_music:"Sakuzyo", author_notes:"unDefined Future", bpm:"150", notes_figure:1283, time:162, notes_density:7.92, image:"Distorted_Fate.jpg.webp"},
  { name:"Igallta", level:17.4, author_music:"Se-U-Ra", author_notes:"断罪の剣『神』", bpm:"230", notes_figure:1114, time:122, notes_density:9.13, image:"Igallta_1.jpg.webp"},
  { name:"QZKago Requiem", level:17.4, author_music:"t+pazolite", author_notes:"Salt feat. M3ow", bpm:"257~290", notes_figure:1723, time:138, notes_density:12.49, image:"QZKago_Requiem.webp.webp"},
  { name:"+ERABY+E CONNEC+10N", level:17.3, author_music:"かめりあ", author_notes:"2B45524142592B45", bpm:"230", notes_figure:1579, time:167, notes_density:9.46, image:"tera.jpg.webp"},
  { name:"DESTRUCTION 3,2,1", level:17.3, author_music:"Normal1zer vs. Broken Nerdz", author_notes:"∅", bpm:"321.321", notes_figure:2330, time:160, notes_density:14.56, image:"DESTRUCTION3,2,1.jpg.webp"},
  { name:"祈 -我ら神祖と共に歩む者なり-", level:17.3, author_music:"光吉猛修 VS 穴山大輔 VS Kai VS 水野健治 VS 大国奏音", author_notes:"フィグロス譜面チーム \"Rikko feat. Ner\" .Pray for \"PHI\".", bpm:"219~270", notes_figure:2222, time:180, notes_density:12.34, image:"祈 -我ら神祖と共に歩む者なり-.webp"},
  { name:"AbsoluTe disoRdeR", level:17.2, author_music:"Acute Disarray", author_notes:"Apocalyptic Dissonance", bpm:"256", notes_figure:2025, time:190, notes_density:10.66, image:"AbsoluTe disoRdeR.webp"},
  { name:"Stardust:RAY", level:17.2, author_music:"kanone vs. BlackY", author_notes:"完璧 vs 癒株 -Autumn Memory-", bpm:"164", notes_figure:1570, time:165, notes_density:9.52, image:"Stardust.webp"},
  { name:"Hydra", level:17.1, author_music:"James Landino X Akira Complex", author_notes:"[该用户已被禁言]", bpm:"160", notes_figure:1547, time:150, notes_density:10.31, image:"Hydra.jpg.webp"},
  { name:"幻影鬼魅 (PLEASE)", level:17.0, author_music:"R300K", author_notes:"imd visual charter \"Rikko\" since 2014", bpm:"161", notes_figure:1145, time:125, notes_density:9.16, image:"PLEASE.webp"},
  { name:"BANGING STRIKE", level:16.9, author_music:"Dew Pleiades", author_notes:"魔王、大咩兔の兄『大咩免』!!", bpm:"234", notes_figure:1677, time:147, notes_density:11.41, image:"BANGING_STRIKE.webp"},
  { name:"Der Richter", level:16.9, author_music:"Ωμεγα", author_notes:"Concat(Ramification,Richter)", bpm:"192", notes_figure:1306, time:147, notes_density:8.88, image:"Der_Richter.webp"},
  { name:"Re：End of a Dream", level:16.9, author_music:"uma vs. モリモリあつし", author_notes:"XMT, Encore after the end", bpm:"212", notes_figure:1377, time:141, notes_density:9.77, image:"Re_End_of_a_Dream.webp"},
  { name:"Cuvism³", level:16.8, author_music:"Fl00t vs Halv", author_notes:"JKy vs StrayCat", bpm:"194", notes_figure:1088, time:160, notes_density:6.80, image:"Cuvism.webp"},
  { name:"INFiNiTE ENERZY -Overdoze-", level:16.8, author_music:"Reku Mochizuki", author_notes:"while(TangScend=TangScend);", bpm:"180", notes_figure:888, time:120, notes_density:7.40, image:"INFiNiTE_ENERZY.webp"},
  { name:"sølips", level:16.8, author_music:"rintaro soma", author_notes:"ø", bpm:"199", notes_figure:1175, time:146, notes_density:8.05, image:"solips.webp"},
  { name:"Diamond Dust", level:16.7, author_music:"Masahiro \"Godspeed\" Aoki", author_notes:"StupiGGy", bpm:"200", notes_figure:1518, time:155, notes_density:9.79, image:"Diamond_Dust.webp"},
  { name:"Spasmodic", level:16.7, author_music:"姜米條☆颶風~♫元力上人♫", author_notes:"無極☆雷鳴~♫死の序曲♫", bpm:"200", notes_figure:1671, time:155, notes_density:10.78, image:"Spasmodic.webp"},
  { name:"Stasis", level:16.7, author_music:"Maozon", author_notes:"百九十八", bpm:"180", notes_figure:1700, time:155, notes_density:10.97, image:"Stasis.webp"},
  { name:"ATHAZA", level:16.6, author_music:"LeaF", author_notes:"FORGET :: CLUTTER", bpm:"240~280", notes_figure:1344, time:162, notes_density:8.30, image:"ATHAZA.webp"},
  { name:"Avataar ~Reincarnation of Kalpa~", level:16.6, author_music:"Scarlette a.k.a. CrYmson", author_notes:"XMT & Salt", bpm:"180", notes_figure:1074, time:174, notes_density:6.17, image:"Avataar.webp"},
  { name:"PRAGMATISM -RESURRECTION-", level:16.6, author_music:"Laur", author_notes:"THE LAST 198", bpm:"174", notes_figure:1156, time:156, notes_density:7.41, image:"PRAGMATISM -RESURRECTION-.jpeg"},
  { name:"volcanic", level:16.6, author_music:"DETRO a.k.a. ルゼ", author_notes:"Alloces", bpm:"191~382", notes_figure:1650, time:137, notes_density:12.04, image:"volcanic.webp"},
  { name:"Ark", level:16.5, author_music:"kanoryo", author_notes:"StupiGGy", bpm:"180", notes_figure:1091, time:163, notes_density:6.69, image:"Ark.webp"},
  { name:"Indelible Scar", level:16.5, author_music:"Noah", author_notes:"上班睡大觉_Sleepyhead", bpm:"223", notes_figure:1207, time:140, notes_density:8.62, image:"Indelible_Scar.webp"},
  { name:"Lyrith -迷宮リリス-", level:16.5, author_music:"ユメミド", author_notes:"CN_115 as \"prediCameNt\"", bpm:"177", notes_figure:1122, time:147, notes_density:7.63, image:"Lyrith.webp"},
  { name:"Antithese", level:16.4, author_music:"Blacklolita", author_notes:"弧光", bpm:"172", notes_figure:1200, time:144, notes_density:8.33, image:"Antithese.jpeg"},
  { name:"PANIC PARADISE", level:16.4, author_music:"DJ SHION.Y", author_notes:"StR-1", bpm:"170", notes_figure:1111, time:128, notes_density:8.68, image:"PANIC_PARADISE.jpg"},
  { name:"狂喜蘭舞", level:16.4, author_music:"LeaF", author_notes:"Catcats a.k.a. 無極 vs. H.C.C. fixed by 野从&晨", bpm:"230", notes_figure:954, time:162, notes_density:5.89, image:"狂喜蘭舞.webp"},
  { name:"S.A.T.E.L.L.I.T.E.", level:16.2, author_music:"かめりあ", author_notes:"N.E.R.1.9.8.", bpm:"150", notes_figure:1098, time:190, notes_density:5.78, image:"sat.webp"},
  { name:"Shadow", level:16.4, author_music:"姜米條&SumaiLight", author_notes:"J0(_)I2|\|3y'5 3|\||)", bpm:"172", notes_figure:1089, time:143, notes_density:7.62, image:"Shadow.webp"},
  { name:"Ποσειδών", level:16.4, author_music:"1112 vs. Star*", author_notes:"上班摸大鱼 a.k.a. 海洋咩兔", bpm:"175", notes_figure:1228, time:123, notes_density:9.98, image:"Poseidon.webp"},
  { name:"Cthugha", level:16.3, author_music:"USAO", author_notes:"百九十八 feat. NerSAN", bpm:"213", notes_figure:1444, time:154, notes_density:9.38, image:"Cthugha.webp"},
  { name:"TECHNOPOLIS 2085", level:15.9, author_music:"PRASTIK DANCEFLOOR", author_notes:"TECHNOXMT vs LATENCYPOLIS", bpm:"134", notes_figure:824, time:140, notes_density:5.89, image:"TECHNOPOLIS 2085.webp"},
  { name:"You are the Miserable", level:15.8, author_music:"t+pazolite", author_notes:"Pat Brick Man Mr.C & Mr.B", bpm:"163", notes_figure:1344, time:164, notes_density:8.20, image:"miserable.webp"},
  { name:"Credits", level:15.7, author_music:"Frums", author_notes:"_鉄(Isotope 59)", bpm:"179", notes_figure:638, time:101, notes_density:6.32, image:"credits.png"},
  { name:"月詠に鳴る", level:15.7, author_music:"Feryquitous feat. 藍月なくる", author_notes:"StupiGGy", bpm:"180", notes_figure:938, time:135, notes_density:6.95, image:"Tsukuyomi.webp"},
  { name:"Radiance", level:15.5, author_music:"Nhato", author_notes:"Яadiance", bpm:"155", notes_figure:926, time:147, notes_density:6.30, image:"Radiance.webp"},
  { name:"もぺもぺ", level:15.4, author_music:"LeaF", author_notes:"阿爽", bpm:"100", notes_figure:720, time:110, notes_density:6.55, image:"もぺもぺ.webp"},
  { name:"风屿", level:15.1, author_music:"闫东炜", author_notes:"JKy", bpm:"170", notes_figure:1236, time:179, notes_density:6.91, image:"风屿.webp"},
  { name:"Break Over", level:14.9, author_music:"K-forest", author_notes:"百九十八", bpm:"185", notes_figure:570, time:128, notes_density:4.45, image:"Break_Over.webp"},
  { name:"雪降り ~雪が降っている~", level:14.0, author_music:"AiSS w/ 夜輪 ft. 結月ゆかり", author_notes:"小咩兔的多指课堂 vs. 上课睡大觉", bpm:"156", notes_figure:531, time:151, notes_density:3.52, image:"Yukihuri.webp"},
  { name:"dB doll", level:13.5, author_music:"YUE.STEVEN/uen", author_notes:"NerSAN & 百九十八", bpm:"128", notes_figure:377, time:108, notes_density:3.49, image:"dbdoll.webp"},
];

app.get("/phigros", (req, res) => {
  res.render('phigros', { data: phigros });
});

app.get("/phigros/create", (req, res) => {
  res.redirect('/public/phigros_new.html');
});

app.post("/phigros", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const name = req.body.name;
  const author_music = req.body.author_music;
  const author_notes = req.body.author_notes;
  const level = req.body.level;
  const bpm = req.body.bpm;
  const notes_figure = req.body.notes_figure;
  const notes_density = req.body.notes_density;
  const time = req.body.time;
  const image = req.body.image;
  phigros.push( { name: name, author_music: author_music, author_notes: author_notes, level: level, bpm: bpm, notes_figure: notes_figure, notes_density: notes_density, time: time, image: image } );
  console.log( phigros );
  res.render('phigros', {data: phigros} );
});

app.get("/phigros/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = phigros[ number ];
  res.render("phigros_detail", {id: number, data: detail, icon: { filename: "/public/" + detail.image, alt: detail.name + " jacket" }});
});

app.get("/phigros/edit/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = phigros[ number ];
  res.render('phigros_edit', {id: number, data: detail} );
});

app.post("/phigros/update/:number", (req, res) => {
  // 本来は変更する番号が存在するか，各項目が正しいか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  phigros[req.params.number].name = req.body.name;
  phigros[req.params.number].author_music = req.body.author_music;
  phigros[req.params.number].author_notes = req.body.author_notes;
  phigros[req.params.number].level = req.body.level;
  phigros[req.params.number].bpm = req.body.bpm;
  phigros[req.params.number].notes_figure = req.body.notes_figure;
  phigros[req.params.number].notes_density = req.body.notes_density;
  phigros[req.params.number].time = req.body.time;
  phigros[req.params.number].image = req.body.image;
  console.log( phigros );
  res.redirect("/phigros/" + number);
});

app.get("/phigros/delete/:number", (req, res) => {
  // 本来は削除の確認ページを表示する
  // 本来は削除する番号が存在するか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = phigros[ number ];
  res.render("phigros_delete_check", {id: number, data: detail});
});

app.post("/phigros/delete/:number", (req, res) => {
  const number = req.params.number;
  phigros.splice(number, 1); // ← ここで初めて削除
  res.redirect("/phigros");
});

app.use(function(req, res, next) {
    res.status(404).send('ページが見つかりません');
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));