
---
layout: post
title: "วิธีการย้ายโปรเจ็ค Flutter ข้ามเครื่อง โดยใช้ Android Studio"
categories: [Flutter]
tags:	
- Flutter
- Android Studio

---

> สำหรับคนที่ไม่ได้ใช้ git นะครับ

## การเตรียมตัวก่อนย้ายโปรเจ็ค Flutter


## การเปิดโปรเจ็ค Flutter จาก Android Studio

ลบไฟล์ `.packages`

![Android Studio Error: Dart SDK is not configured](2019-11-24-how-to-flutter-to-other-machine-1.jpg)

![Android Studio : Flutter SDK setting](2019-11-24-how-to-flutter-to-other-machine-2.jpg)


![Android Studio : Packages get error](2019-11-24-how-to-flutter-to-other-machine-3.jpg)


![Android Studio : Run Flutter Normally!](2019-11-24-how-to-flutter-to-other-machine-4.jpg)


## โครงสร้างไฟล์ของโปรเจ็ค Flutter


ไฟล์ gitignore

```
# Miscellaneous
*.class
*.log
*.pyc
*.swp
.DS_Store
.atom/
.buildlog/
.history
.svn/

# IntelliJ related
*.iml
*.ipr
*.iws
.idea/

# The .vscode folder contains launch configuration and tasks you configure in
# VS Code which you may wish to be included in version control, so this line
# is commented out by default.
#.vscode/

# Flutter/Dart/Pub related
**/doc/api/
.dart_tool/
.flutter-plugins
.packages
.pub-cache/
.pub/
/build/

# Android related
**/android/**/gradle-wrapper.jar
**/android/.gradle
**/android/captures/
**/android/gradlew
**/android/gradlew.bat
**/android/local.properties
**/android/**/GeneratedPluginRegistrant.java

# iOS/XCode related
**/ios/**/*.mode1v3
**/ios/**/*.mode2v3
**/ios/**/*.moved-aside
**/ios/**/*.pbxuser
**/ios/**/*.perspectivev3
**/ios/**/*sync/
**/ios/**/.sconsign.dblite
**/ios/**/.tags*
**/ios/**/.vagrant/
**/ios/**/DerivedData/
**/ios/**/Icon?
**/ios/**/Pods/
**/ios/**/.symlinks/
**/ios/**/profile
**/ios/**/xcuserdata
**/ios/.generated/
**/ios/Flutter/App.framework
**/ios/Flutter/Flutter.framework
**/ios/Flutter/Generated.xcconfig
**/ios/Flutter/app.flx
**/ios/Flutter/app.zip
**/ios/Flutter/flutter_assets/
**/ios/ServiceDefinitions.json
**/ios/Runner/GeneratedPluginRegistrant.*

# Exceptions to above rules.
!**/ios/**/default.mode1v3
!**/ios/**/default.mode2v3
!**/ios/**/default.pbxuser
!**/ios/**/default.perspectivev3
!/packages/flutter_tools/test/data/dart_dependencies_test/**/.packages

```