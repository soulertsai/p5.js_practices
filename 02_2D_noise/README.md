# 2D noise


### What I learned
#### `loadPixels()` + `updatePixels()`
把canvas中所有的pixel，由左至右、由上至下，分別對r,g,b,alpha分別編碼。
比較需要注意的是如何用for迴圈對每一個pixel進行操控。

#### `noise(x, y)`
當`noise`取了兩個arguments的時候，可以想像在一個丘陵上面，往X軸或是Y軸的方向移動的話，都不會和原點相差很多。
一開始我不沒有意識到可以用取兩個變數，所以我用了一個方法：讓每一列的pixels在換列的時候，xoff歸零，另外多加一個yoff的變數。結果產生下面的圖。
![](https://i.imgur.com/rlQP85e.png)
因為這張圖noise的對稱軸是y = -x, 畫出來圖自然會長成這樣。

#### `noiseDetail()`
知道有這個東西即可，控制perlin noise的解析度和衰減。