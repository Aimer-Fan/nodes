```css
.box {
  flex-flow: <flex-direction> || <flex-wrap>;
}
```

#### 4. justify-content

`justify-content`属性定义了项目在主轴上的对齐方式。

它有以下五种属性，对应的效果为：

```css
.box {
  justify-content: flex-start | flex-end | center | space-between | space-around;
}
```

+ flex-start（默认值）：左对齐
+ flex-end：右对齐
+ center：居中
+ space-between：两端对齐，项目之间的间隔都相等
+ space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍

#### 5. align-items

`align-items`属性定义项目在交叉轴上如何对齐。

```css
.box {
  align-items: flex-start | flex-end | center | baseline | stretch;
}
```

- flex-start：交叉轴的起点对齐。
- flex-end：交叉轴的终点对齐。
- center：交叉轴的中点对齐。
- baseline： 项目的第一行文字的基线对齐。
- stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。

#### 6. align-content

`align-content`属性定义了多根轴线的对齐方式。

如果项目只有一根轴线，该属性不起作用。（指flex出现多行显示）

```css
.box {
  align-content: flex-start | flex-end | center | space-between | space-around | stretch;
}
```

- flex-start：与交叉轴的起点对齐。
- flex-end：与交叉轴的终点对齐。
- center：与交叉轴的中点对齐。
- space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。
- space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。
- stretch（默认值）：轴线占满整个交叉轴。

## 4. 项目的属性

#### 1. order

`order`属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。

```css
.item {
  order: <integer>;
}
```

#### 2. flex-grow

`flex-grow`属性定义项目的放大比例，默认为`0`，即如果存在剩余空间，也不放大。

```css
.item {
  flex-grow: <number>; /* default 0 */
}
```

#### 3. flex-shrink

`flex-shrink`属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。负值对该属性无效。

```css
.item {
  flex-shrink: <number>; /* default 1 */
}
```

#### 4. flex-basis

`flex-basis`属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为`auto`，即项目的本来大小。

它可以设为跟`width`或`height`属性一样的值（比如350px），则项目将占据固定空间。

```css
.item {
  flex-basis: <length> | auto; /* default auto */
}
```

#### 5. flex

`flex`属性是`flex-grow`, `flex-shrink` 和 `flex-basis`的简写，默认值为`0 1 auto`。后两个属性可选。

```css
.item {
  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
}
```

该属性有两个快捷值：`auto` (`1 1 auto`) 和 none (`0 0 auto`)。

建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。

#### 6. align-self

`align-self`属性允许单个项目有与其他项目不一样的对齐方式，可覆盖`align-items`属性。默认值为`auto`，表示继承父元素的`align-items`属性，如果没有父元素，则等同于`stretch`。

该属性可能取6个值，除了auto，其他都与align-items属性完全一致。

```css
.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```

