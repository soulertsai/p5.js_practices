# perlin field

## 整體的思路
因為每一個particle需要根據自己所在的位置進行更新，更新的辦法是從自己所在的流場得知受力，然後apply力。
用constructor function的好處在於，自己的那個物件可以由自己來更新。試想如果外包給一個外部的function的話，這個function要讀取一個儲存所有particle的容器，可能是array，然後進行處理後再改動個別particle的值，這樣不如用constructor function來的直觀、方便。

## 學到
1. 比較多的是向量的使用方式：`var v = p5.Vector.fromAngle(angle);`…等。其它的還有如何用向量加法來模擬加速度、速度、位置三者的關係。
2. `translate()` `push()` `pop()` 三者的應用
3. 用格子切分的方式來模擬流場，並畫出流場
4. 把流場的整體資訊丟給particle，再由particle自己判斷自己所在的區域