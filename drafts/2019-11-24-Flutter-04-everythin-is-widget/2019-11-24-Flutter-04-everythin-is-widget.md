---
layout: post
title: "ทุกสิ่งอย่างคือ Widget"
categories: [Flutter]
tags:	
- Flutter
- 
---

สวัสดีครับ ในโพสนี้เราจะมาพูดถึง Widget พื้นฐานกัน เพราะว่า Flutter มองทุกอย่างคือ Widget หมดเลย ดังคำกล่าวที่ว่า

> Everthing is widget

## Widget คือ

Widget คือ บล็อกๆ นึงของ User Interface ซึ่งเราอาจจะใข้แทนถึงอะไรก็ได้ ที่เป็น User Interface
เช่น
- a structural element (like a button or menu)
- a stylistic element (like a font or color scheme)
- an aspect of layout (like padding)
- หรือหน้าที่อื่นๆ 

https://flutter.dev/docs/resources/technical-overview#everythings-a-widget

## ชนิดของ Widget

ทีนี้ Widget ก็สามารถแบ่งออกเป็นได้หลายแบบ

1. แบ่งตามชนิดของ Widget ซึ่งการเรียกใช้งานก็จะต่างกันโดยมี 2 ประเภทดังนี้ 
   1. Stateless Widget
   2. Stateful Widget
2. แบ่งตามการวัตถุประสงค์การใช้งาน ก็แบ่งได้คร่าวๆ 2 แบบด้วยกัน
   1. Widget ใช้เพื่อการแสดงผล UI เช่น ปุ่ม ข้อความ ต่างๆ
   2. Widget ใช้เพื่อจัดโครงร่างของเว็บ (Layout)

## Icon Widget
```dart
Icon(Icons.cake,
  color: Colors.greenAccent,
  size: 64.0,)
```

## Text Widget
```dart
Text("Hello widget",
  style: TextStyle(
    fontSize: 30,
    color: Colors.blueAccent,
    fontStyle: FontStyle.italic,
    decoration: TextDecoration.underline,
  ),
),
```

## TextField Widget
```dart
TextField(),
TextField(
  keyboardType: TextInputType.number,
  decoration: InputDecoration(
    labelText: "Enter an integer"
  ),
)
```