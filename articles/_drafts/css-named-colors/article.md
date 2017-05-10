In CSS there are multiple ways to specify colors, you can do it with hex definition `#f00`, functional definition like `rgb(255, 0, 0)` or `hsl(0, 100%, 50%)`. Or in simpler cases, you can use keyword definitions like `red`.

## History

16 of CSS’s named colors came from HTML originally:
    <span style="background: white">white</span>,
    <span style="background: blue">blue</span>,
    <span style="background: aqua">aqua</span>,
    <span style="background: fuchsia">fuchsia</span>,
    <span style="background: red">red</span>,
    <span style="background: lime">lime</span>,
    <span style="background: yellow">yellow</span>,
    <span style="background: silver">silver</span>,
    <span style="background: gray; color: white">gray</span>,
    <span style="background: black; color: white">black</span>,
    <span style="background: maroon; color: white">maroon</span>,
    <span style="background: navy; color: white">navy</span>,
    <span style="background: olive; color: white">olive</span>,
    <span style="background: purple; color: white">purple</span>,
    <span style="background: green; color: white">green</span>,
    <span style="background: teal; color: white">teal</span>.
Most of the rest came from one version of the X11 color system, which is used in Unix systems to specify colors for the console.

### Latest addition

In 2014 [Eric A. Meyer's](https://en.wikipedia.org/wiki/Eric_A._Meyer) daughter Rebecca died on her 6th birthday, less than a year after her diagnosis of a brain tumor. The hex color `#663399` was named <span style="background: rebeccapurple; color: white;">rebeccapurple</span> and added to the CSS color list in her memory.

### Duplicate colors

There are four duplicates between the named colors, and all of them are related to gray (English) &ndash; grey (UK) spelling differences.

The duplicates are:
    <span style="background: gray">gray</span> &ndash; <span style="background: grey">grey</span>,
    <span style="background: lightgray">lightgray</span> &ndash; <span style="background: lightgrey">lightgrey</span>,
    <span style="background: darkgray">darkgray</span> &ndash; <span style="background: darkgrey">darkgrey</span>,
    <span style="background: dimgray">dimgray</span> &ndash; <span style="background: dimgrey">dimgrey</span>.

## Are named colors useful?

There are several cases where named colors might be useful:

- `white`/`black` is more readable than `#fff`/`#000`.
- CSS minifiers optimize for filesize and in some cases named color is the shortest possible value. For example `red` is shorter than `#f00` or `rgb(255,0,0)`.
- In example apps where the exact shade of color is not important.

## Named colors list

Here is a list of all CSS named color grouped by basic color and then sorted by their lightness with the [HSP Color Model](http://alienryderflex.com/hsp.html).
Currently, there are 441 named colors.

### Pink colors

<table>
    <tr style="color:black">
        <td style="background: MistyRose;">MistyRose</td>
        <td style="background: #FFE4E1">#FFE4E1</td>
        <td style="background: rgb(255, 228, 225)">rgb(255, 228, 225)</td>
    </tr>
    <tr style="color:black">
        <td style="background: Pink;">Pink</td>
        <td style="background: #FFC0CB">#FFC0CB</td>
        <td style="background: rgb(255, 192, 203)">rgb(255, 192, 203)</td>
    </tr>
    <tr style="color:black">
        <td style="background: LightPink;">LightPink</td>
        <td style="background: #FFB6C1">#FFB6C1</td>
        <td style="background: rgb(255, 182, 193)">rgb(255, 182, 193)</td>
    </tr>
    <tr style="color:white">
        <td style="background: HotPink;">HotPink</td>
        <td style="background: #FF69B4">#FF69B4</td>
        <td style="background: rgb(255, 105, 180)">rgb(255, 105, 180)</td>
    </tr>
    <tr style="color:white">
        <td style="background: PaleVioletRed;">PaleVioletRed</td>
        <td style="background: #DB7093">#DB7093</td>
        <td style="background: rgb(219, 112, 147)">rgb(219, 112, 147)</td>
    </tr>
    <tr style="color:white">
        <td style="background: DeepPink;">DeepPink</td>
        <td style="background: #FF1493">#FF1493</td>
        <td style="background: rgb(255, 20, 147)">rgb(255, 20, 147)</td>
    </tr>
    <tr style="color:white">
        <td style="background: MediumVioletRed;">MediumVioletRed</td>
        <td style="background: #C71585">#C71585</td>
        <td style="background: rgb(199, 21, 133)">rgb(199, 21, 133)</td>
    </tr>
</table>

### Red colors

<table>
    <tr style="color:black">
        <td style="background: LightSalmon;">LightSalmon</td>
        <td style="background: #FFA07A">#FFA07A</td>
        <td style="background: rgb(255, 160, 122)">rgb(255, 160, 122)</td>
    </tr>
    <tr style="color:black">
        <td style="background: DarkSalmon;">DarkSalmon</td>
        <td style="background: #E9967A">#E9967A</td>
        <td style="background: rgb(233, 150, 122)">rgb(233, 150, 122)</td>
    </tr>
    <tr style="color:black">
        <td style="background: Salmon;">Salmon</td>
        <td style="background: #FA8072">#FA8072</td>
        <td style="background: rgb(250, 128, 114)">rgb(250, 128, 114)</td>
    </tr>
    <tr style="color:black">
        <td style="background: LightCoral;">LightCoral</td>
        <td style="background: #F08080">#F08080</td>
        <td style="background: rgb(240, 128, 128)">rgb(240, 128, 128)</td>
    </tr>
    <tr style="color:white">
        <td style="background: Red;">Red</td>
        <td style="background: #FF0000">#FF0000</td>
        <td style="background: rgb(255, 0, 0)">rgb(255, 0, 0)</td>
    </tr>
    <tr style="color:white">
        <td style="background: IndianRed;">IndianRed</td>
        <td style="background: #CD5C5C">#CD5C5C</td>
        <td style="background: rgb(205, 92, 92)">rgb(205, 92, 92)</td>
    </tr>
    <tr style="color:white ;color:white">
        <td style="background: Crimson;">Crimson</td>
        <td style="background: #DC143C">#DC143C</td>
        <td style="background: rgb(220, 20, 60)">rgb(220, 20, 60)</td>
    </tr>
    <tr style="color:white">
        <td style="background: FireBrick;">FireBrick</td>
        <td style="background: #B22222">#B22222</td>
        <td style="background: rgb(178, 34, 34)">rgb(178, 34, 34)</td>
    </tr>
    <tr style="color:white">
        <td style="background: DarkRed;">DarkRed</td>
        <td style="background: #8B0000">#8B0000</td>
        <td style="background: rgb(139, 0, 0)">rgb(139, 0, 0)</td>
    </tr>
</table>

### Orange colors

<table>
    <tr style="color:black">
        <td style="background: FloralWhite;">FloralWhite</td>
        <td style="background: #FFFAF0">#FFFAF0</td>
        <td style="background: rgb(255, 250, 240)">rgb(255, 250, 240)</td>
    </tr>
    <tr style="color:black">
        <td style="background: Seashell;">Seashell</td>
        <td style="background: #FFF5EE">#FFF5EE</td>
        <td style="background: rgb(255, 245, 238)">rgb(255, 245, 238)</td>
    </tr>
    <tr style="color:black">
        <td style="background: OldLace;">OldLace</td>
        <td style="background: #FDF5E6">#FDF5E6</td>
        <td style="background: rgb(253, 245, 230)">rgb(253, 245, 230)</td>
    </tr>
    <tr style="color:black">
        <td style="background: Linen;">Linen</td>
        <td style="background: #FAF0E6">#FAF0E6</td>
        <td style="background: rgb(250, 240, 230)">rgb(250, 240, 230)</td>
    </tr>
    <tr style="color:black">
        <td style="background: AntiqueWhite;">AntiqueWhite</td>
        <td style="background: #FAEBD7">#FAEBD7</td>
        <td style="background: rgb(250, 235, 215)">rgb(250, 235, 215)</td>
    </tr>
    <tr style="color:black">
        <td style="background: Orange;">Orange</td>
        <td style="background: #FFA500">#FFA500</td>
        <td style="background: rgb(255, 165, 0)">rgb(255, 165, 0)</td>
    </tr>
    <tr style="color:black">
        <td style="background: DarkOrange;">DarkOrange</td>
        <td style="background: #FF8C00">#FF8C00</td>
        <td style="background: rgb(255, 140, 0)">rgb(255, 140, 0)</td>
    </tr>
    <tr style="color:black">
        <td style="background: Coral;">Coral</td>
        <td style="background: #FF7F50">#FF7F50</td>
        <td style="background: rgb(255, 127, 80)">rgb(255, 127, 80)</td>
    </tr>
    <tr style="color:white">
        <td style="background: Tomato;">Tomato</td>
        <td style="background: #FF6347">#FF6347</td>
        <td style="background: rgb(255, 99, 71)">rgb(255, 99, 71)</td>
    </tr>
    <tr style="color:white">
        <td style="background: OrangeRed;">OrangeRed</td>
        <td style="background: #FF4500">#FF4500</td>
        <td style="background: rgb(255, 69, 0)">rgb(255, 69, 0)</td>
    </tr>
</table>

### Yellow colors

<table>
    <tr style="color:black">
        <td style="background: Ivory;">Ivory</td>
        <td style="background: #FFFFF0">#FFFFF0</td>
        <td style="background: rgb(255, 255, 240)">rgb(255, 255, 240)</td>
    </tr>
    <tr style="color:black">
        <td style="background: LightYellow;">LightYellow</td>
        <td style="background: #FFFFE0">#FFFFE0</td>
        <td style="background: rgb(255, 255, 224)">rgb(255, 255, 224)</td>
    </tr>
    <tr style="color:black">
        <td style="background: LemonChiffon;">LemonChiffon</td>
        <td style="background: #FFFACD">#FFFACD</td>
        <td style="background: rgb(255, 250, 205)">rgb(255, 250, 205)</td>
    </tr>
    <tr style="color:black">
        <td style="background: LightGoldenrodYellow;">LightGoldenrodYellow</td>
        <td style="background: #FAFAD2">#FAFAD2</td>
        <td style="background: rgb(250, 250, 210)">rgb(250, 250, 210)</td>
    </tr>
    <tr style="color:black">
        <td style="background: Beige;">Beige</td>
        <td style="background: #F5F5DC">#F5F5DC</td>
        <td style="background: rgb(245, 245, 220)">rgb(245, 245, 220)</td>
    </tr>
    <tr style="color:black">
        <td style="background: PapayaWhip;">PapayaWhip</td>
        <td style="background: #FFEFD5">#FFEFD5</td>
        <td style="background: rgb(255, 239, 213)">rgb(255, 239, 213)</td>
    </tr>
    <tr style="color:black">
        <td style="background: Yellow;">Yellow</td>
        <td style="background: #FFFF00">#FFFF00</td>
        <td style="background: rgb(255, 255, 0)">rgb(255, 255, 0)</td>
    </tr>
    <tr style="color:black">
        <td style="background: Moccasin;">Moccasin</td>
        <td style="background: #FFE4B5">#FFE4B5</td>
        <td style="background: rgb(255, 228, 181)">rgb(255, 228, 181)</td>
    </tr>
    <tr style="color:black">
        <td style="background: PaleGoldenrod;">PaleGoldenrod</td>
        <td style="background: #EEE8AA">#EEE8AA</td>
        <td style="background: rgb(238, 232, 170)">rgb(238, 232, 170)</td>
    </tr>
    <tr style="color:black">
        <td style="background: PeachPuff;">PeachPuff</td>
        <td style="background: #FFDAB9">#FFDAB9</td>
        <td style="background: rgb(255, 218, 185)">rgb(255, 218, 185)</td>
    </tr>
    <tr style="color:black">
        <td style="background: Khaki;">Khaki</td>
        <td style="background: #F0E68C">#F0E68C</td>
        <td style="background: rgb(240, 230, 140)">rgb(240, 230, 140)</td>
    </tr>
    <tr style="color:black">
        <td style="background: Gold;">Gold</td>
        <td style="background: #FFD700">#FFD700</td>
        <td style="background: rgb(255, 215, 0)">rgb(255, 215, 0)</td>
    </tr>
    <tr style="color:black">
        <td style="background: DarkKhaki;">DarkKhaki</td>
        <td style="background: #BDB76B">#BDB76B</td>
        <td style="background: rgb(189, 183, 107)">rgb(189, 183, 107)</td>
    </tr>
</table>

### Brown colors


<table>
    <tr style="color:black">
        <td style="background: Cornsilk;">Cornsilk</td>
        <td style="background: #FFF8DC">#FFF8DC</td>
        <td style="background: rgb(255, 248, 220)">rgb(255, 248, 220)</td>
    </tr>
    <tr style="color:black">
        <td style="background: BlanchedAlmond;">BlanchedAlmond</td>
        <td style="background: #FFEBCD">#FFEBCD</td>
        <td style="background: rgb(255, 235, 205)">rgb(255, 235, 205)</td>
    </tr>
    <tr style="color:black">
        <td style="background: Bisque;">Bisque</td>
        <td style="background: #FFE4C4">#FFE4C4</td>
        <td style="background: rgb(255, 228, 196)">rgb(255, 228, 196)</td>
    </tr>
    <tr style="color:black">
        <td style="background: NavajoWhite;">NavajoWhite</td>
        <td style="background: #FFDEAD">#FFDEAD</td>
        <td style="background: rgb(255, 222, 173)">rgb(255, 222, 173)</td>
    </tr>
    <tr style="color:black">
        <td style="background: Wheat;">Wheat</td>
        <td style="background: #F5DEB3">#F5DEB3</td>
        <td style="background: rgb(245, 222, 179)">rgb(245, 222, 179)</td>
    </tr>
    <tr style="color:black">
        <td style="background: BurlyWood;">BurlyWood</td>
        <td style="background: #DEB887">#DEB887</td>
        <td style="background: rgb(222, 184, 135)">rgb(222, 184, 135)</td>
    </tr>
    <tr style="color:black">
        <td style="background: SandyBrown;">SandyBrown</td>
        <td style="background: #F4A460">#F4A460</td>
        <td style="background: rgb(244, 164, 96)">rgb(244, 164, 96)</td>
    </tr>
    <tr style="color:black">
        <td style="background: Tan;">Tan</td>
        <td style="background: #D2B48C">#D2B48C</td>
        <td style="background: rgb(210, 180, 140)">rgb(210, 180, 140)</td>
    </tr>
    <tr style="color:black">
        <td style="background: Goldenrod;">Goldenrod</td>
        <td style="background: #DAA520">#DAA520</td>
        <td style="background: rgb(218, 165, 32)">rgb(218, 165, 32)</td>
    </tr>
    <tr style="color:black">
        <td style="background: RosyBrown;">RosyBrown</td>
        <td style="background: #BC8F8F">#BC8F8F</td>
        <td style="background: rgb(188, 143, 143)">rgb(188, 143, 143)</td>
    </tr>
    <tr style="color:black">
        <td style="background: Peru;">Peru</td>
        <td style="background: #CD853F">#CD853F</td>
        <td style="background: rgb(205, 133, 63)">rgb(205, 133, 63)</td>
    </tr>
    <tr style="color:black">
        <td style="background: DarkGoldenrod;">DarkGoldenrod</td>
        <td style="background: #B8860B">#B8860B</td>
        <td style="background: rgb(184, 134, 11)">rgb(184, 134, 11)</td>
    </tr>
    <tr style="color:white">
        <td style="background: Chocolate;">Chocolate</td>
        <td style="background: #D2691E">#D2691E</td>
        <td style="background: rgb(210, 105, 30)">rgb(210, 105, 30)</td>
    </tr>
    <tr style="color:white">
        <td style="background: Sienna;">Sienna</td>
        <td style="background: #A0522D">#A0522D</td>
        <td style="background: rgb(160, 82, 45)">rgb(160, 82, 45)</td>
    </tr>
    <tr style="color:white">
        <td style="background: Brown;">Brown</td>
        <td style="background: #A52A2A">#A52A2A</td>
        <td style="background: rgb(165, 42, 42)">rgb(165, 42, 42)</td>
    </tr>
    <tr style="color:white">
        <td style="background: SaddleBrown;">SaddleBrown</td>
        <td style="background: #8B4513">#8B4513</td>
        <td style="background: rgb(139, 69, 19)">rgb(139, 69, 19)</td>
    </tr>
    <tr style="color:white">
        <td style="background: Maroon;">Maroon</td>
        <td style="background: #800000">#800000</td>
        <td style="background: rgb(128, 0, 0)">rgb(128, 0, 0)</td>
    </tr>
</table>


### Green colors

<table>
    <tr style="color:black">
        <td style="background: MintCream;">MintCream</td>
        <td style="background: #F5FFFA">#F5FFFA</td>
        <td style="background: rgb(245, 255, 250)">rgb(245, 255, 250)</td>
    </tr>
    <tr style="color:black">
        <td style="background: Honeydew;">Honeydew</td>
        <td style="background: #F0FFF0">#F0FFF0</td>
        <td style="background: rgb(240, 255, 240)">rgb(240, 255, 240)</td>
    </tr>
    <tr style="color:black">
        <td style="background: GreenYellow;">GreenYellow</td>
        <td style="background: #ADFF2F">#ADFF2F</td>
        <td style="background: rgb(173, 255, 47)">rgb(173, 255, 47)</td>
    </tr>
    <tr style="color:black">
        <td style="background: PaleGreen;">PaleGreen</td>
        <td style="background: #98FB98">#98FB98</td>
        <td style="background: rgb(152, 251, 152)">rgb(152, 251, 152)</td>
    </tr>
    <tr style="color:black">
        <td style="background: Chartreuse;">Chartreuse</td>
        <td style="background: #7FFF00">#7FFF00</td>
        <td style="background: rgb(127, 255, 0)">rgb(127, 255, 0)</td>
    </tr>
    <tr style="color:black">
        <td style="background: LawnGreen;">LawnGreen</td>
        <td style="background: #7CFC00">#7CFC00</td>
        <td style="background: rgb(124, 252, 0)">rgb(124, 252, 0)</td>
    </tr>
    <tr style="color:black">
        <td style="background: LightGreen;">LightGreen</td>
        <td style="background: #90EE90">#90EE90</td>
        <td style="background: rgb(144, 238, 144)">rgb(144, 238, 144)</td>
    </tr>
    <tr style="color:black">
        <td style="background: SpringGreen;">SpringGreen</td>
        <td style="background: #00FF7F">#00FF7F</td>
        <td style="background: rgb(0, 255, 127)">rgb(0, 255, 127)</td>
    </tr>
    <tr style="color:black">
        <td style="background: MediumSpringGreen;">MediumSpringGreen</td>
        <td style="background: #00FA9A">#00FA9A</td>
        <td style="background: rgb(0, 250, 154)">rgb(0, 250, 154)</td>
    </tr>
    <tr style="color:black">
        <td style="background: Lime;">Lime</td>
        <td style="background: #00FF00">#00FF00</td>
        <td style="background: rgb(0, 255, 0)">rgb(0, 255, 0)</td>
    </tr>
    <tr style="color:black">
        <td style="background: YellowGreen;">YellowGreen</td>
        <td style="background: #9ACD32">#9ACD32</td>
        <td style="background: rgb(154, 205, 50)">rgb(154, 205, 50)</td>
    </tr>
    <tr style="color:black">
        <td style="background: MediumAquamarine;">MediumAquamarine</td>
        <td style="background: #66CDAA">#66CDAA</td>
        <td style="background: rgb(102, 205, 170)">rgb(102, 205, 170)</td>
    </tr>
    <tr style="color:black">
        <td style="background: DarkSeaGreen;">DarkSeaGreen</td>
        <td style="background: #8FBC8F">#8FBC8F</td>
        <td style="background: rgb(143, 188, 143)">rgb(143, 188, 143)</td>
    </tr>
    <tr style="color:black">
        <td style="background: LimeGreen;">LimeGreen</td>
        <td style="background: #32CD32">#32CD32</td>
        <td style="background: rgb(50, 205, 50)">rgb(50, 205, 50)</td>
    </tr>
    <tr style="color:black">
        <td style="background: MediumSeaGreen;">MediumSeaGreen</td>
        <td style="background: #3CB371">#3CB371</td>
        <td style="background: rgb(60, 179, 113)">rgb(60, 179, 113)</td>
    </tr>
    <tr style="color:white">
        <td style="background: OliveDrab;">OliveDrab</td>
        <td style="background: #6B8E23">#6B8E23</td>
        <td style="background: rgb(107, 142, 35)">rgb(107, 142, 35)</td>
    </tr>
    <tr style="color:white">
        <td style="background: Olive;">Olive</td>
        <td style="background: #808000">#808000</td>
        <td style="background: rgb(128, 128, 0)">rgb(128, 128, 0)</td>
    </tr>
    <tr style="color:white">
        <td style="background: SeaGreen;">SeaGreen</td>
        <td style="background: #2E8B57">#2E8B57</td>
        <td style="background: rgb(46, 139, 87)">rgb(46, 139, 87)</td>
    </tr>
    <tr style="color:white">
        <td style="background: ForestGreen;">ForestGreen</td>
        <td style="background: #228B22">#228B22</td>
        <td style="background: rgb(34, 139, 34)">rgb(34, 139, 34)</td>
    </tr>
    <tr style="color:white">
        <td style="background: Green;">Green</td>
        <td style="background: #008000">#008000</td>
        <td style="background: rgb(0, 128, 0)">rgb(0, 128, 0)</td>
    </tr>
    <tr style="color:white">
        <td style="background: DarkOliveGreen;">DarkOliveGreen</td>
        <td style="background: #556B2F">#556B2F</td>
        <td style="background: rgb(85, 107, 47)">rgb(85, 107, 47)</td>
    </tr>
    <tr style="color:white">
        <td style="background: DarkGreen;">DarkGreen</td>
        <td style="background: #006400">#006400</td>
        <td style="background: rgb(0, 100, 0)">rgb(0, 100, 0)</td>
    </tr>
    <tr style="color:white;">
        <td style="background: DarkSlateGray;">DarkSlateGray</td>
        <td style="background: #2F4F4F">#2F4F4F</td>
        <td style="background: rgb(47, 79, 79)">rgb(47, 79, 79)</td>
    </tr>
    <tr style="color:white;">
        <td style="background: DarkSlateGrey;">DarkSlateGrey</td>
        <td style="background: #2F4F4F">#2F4F4F</td>
        <td style="background: rgb(47, 79, 79)">rgb(47, 79, 79)</td>
    </tr>
</table>

### Cyan colors

<table>
    <tr style="color:black">
        <td style="background: LightCyan;">LightCyan</td>
        <td style="background: #E0FFFF">#E0FFFF</td>
        <td style="background: rgb(224, 255, 255)">rgb(224, 255, 255)</td>
    </tr>
    <tr style="color:black">
        <td style="background: PaleTurquoise;">PaleTurquoise</td>
        <td style="background: #AFEEEE">#AFEEEE</td>
        <td style="background: rgb(175, 238, 238)">rgb(175, 238, 238)</td>
    </tr>
    <tr style="color:black">
        <td style="background: Aquamarine;">Aquamarine</td>
        <td style="background: #7FFFD4">#7FFFD4</td>
        <td style="background: rgb(127, 255, 212)">rgb(127, 255, 212)</td>
    </tr>
    <tr style="color:black">
        <td style="background: Aqua;">Aqua</td>
        <td style="background: #00FFFF">#00FFFF</td>
        <td style="background: rgb(0, 255, 255)">rgb(0, 255, 255)</td>
    </tr>
    <tr style="color:black">
        <td style="background: Cyan;">Cyan</td>
        <td style="background: #00FFFF">#00FFFF</td>
        <td style="background: rgb(0, 255, 255)">rgb(0, 255, 255)</td>
    </tr>
    <tr style="color:black">
        <td style="background: Turquoise;">Turquoise</td>
        <td style="background: #40E0D0">#40E0D0</td>
        <td style="background: rgb(64, 224, 208)">rgb(64, 224, 208)</td>
    </tr>
    <tr style="color:black">
        <td style="background: MediumTurquoise;">MediumTurquoise</td>
        <td style="background: #48D1CC">#48D1CC</td>
        <td style="background: rgb(72, 209, 204)">rgb(72, 209, 204)</td>
    </tr>
    <tr style="color:black">
        <td style="background: DarkTurquoise;">DarkTurquoise</td>
        <td style="background: #00CED1">#00CED1</td>
        <td style="background: rgb(0, 206, 209)">rgb(0, 206, 209)</td>
    </tr>
    <tr style="color:black">
        <td style="background: LightSeaGreen;">LightSeaGreen</td>
        <td style="background: #20B2AA">#20B2AA</td>
        <td style="background: rgb(32, 178, 170)">rgb(32, 178, 170)</td>
    </tr>
    <tr style="color:white">
        <td style="background: CadetBlue;">CadetBlue</td>
        <td style="background: #5F9EA0">#5F9EA0</td>
        <td style="background: rgb(95, 158, 160)">rgb(95, 158, 160)</td>
    </tr>
    <tr style="color:white">
        <td style="background: DarkCyan;">DarkCyan</td>
        <td style="background: #008B8B">#008B8B</td>
        <td style="background: rgb(0, 139, 139)">rgb(0, 139, 139)</td>
    </tr>
    <tr style="color:white">
        <td style="background: Teal;">Teal</td>
        <td style="background: #008080">#008080</td>
        <td style="background: rgb(0, 128, 128)">rgb(0, 128, 128)</td>
    </tr>
</table>

### Blue colors

<table>
    <tr style="color:black">
        <td style="background: Azure;">Azure</td>
        <td style="background: #F0FFFF">#F0FFFF</td>
        <td style="background: rgb(240, 255, 255)">rgb(240, 255, 255)</td>
    </tr>
    <tr style="color:black">
        <td style="background: AliceBlue;">AliceBlue</td>
        <td style="background: #F0F8FF">#F0F8FF</td>
        <td style="background: rgb(240, 248, 255)">rgb(240, 248, 255)</td>
    </tr>
    <tr style="color:black">
        <td style="background: PowderBlue;">PowderBlue</td>
        <td style="background: #B0E0E6">#B0E0E6</td>
        <td style="background: rgb(176, 224, 230)">rgb(176, 224, 230)</td>
    </tr>
    <tr style="color:black">
        <td style="background: LightBlue;">LightBlue</td>
        <td style="background: #ADD8E6">#ADD8E6</td>
        <td style="background: rgb(173, 216, 230)">rgb(173, 216, 230)</td>
    </tr>
    <tr style="color:black">
        <td style="background: LightSkyBlue;">LightSkyBlue</td>
        <td style="background: #87CEFA">#87CEFA</td>
        <td style="background: rgb(135, 206, 250)">rgb(135, 206, 250)</td>
    </tr>
    <tr style="color:black">
        <td style="background: LightSteelBlue;">LightSteelBlue</td>
        <td style="background: #B0C4DE">#B0C4DE</td>
        <td style="background: rgb(176, 196, 222)">rgb(176, 196, 222)</td>
    </tr>
    <tr style="color:black">
        <td style="background: SkyBlue;">SkyBlue</td>
        <td style="background: #87CEEB">#87CEEB</td>
        <td style="background: rgb(135, 206, 235)">rgb(135, 206, 235)</td>
    </tr>
    <tr style="color:black">
        <td style="background: DeepSkyBlue;">DeepSkyBlue</td>
        <td style="background: #00BFFF">#00BFFF</td>
        <td style="background: rgb(0, 191, 255)">rgb(0, 191, 255)</td>
    </tr>
    <tr style="color:black">
        <td style="background: CornflowerBlue;">CornflowerBlue</td>
        <td style="background: #6495ED">#6495ED</td>
        <td style="background: rgb(100, 149, 237)">rgb(100, 149, 237)</td>
    </tr>
    <tr style="color:black">
        <td style="background: DodgerBlue;">DodgerBlue</td>
        <td style="background: #1E90FF">#1E90FF</td>
        <td style="background: rgb(30, 144, 255)">rgb(30, 144, 255)</td>
    </tr>
    <tr style="color:white;">
        <td style="background: LightSlateGray;">LightSlateGray</td>
        <td style="background: #778899">#778899</td>
        <td style="background: rgb(119, 136, 153)">rgb(119, 136, 153)</td>
    </tr>
    <tr style="color:white;">
        <td style="background: LightSlateGrey;">LightSlateGrey</td>
        <td style="background: #778899">#778899</td>
        <td style="background: rgb(119, 136, 153)">rgb(119, 136, 153)</td>
    </tr>
    <tr style="color:white;">
        <td style="background: SlateGray;">SlateGray</td>
        <td style="background: #708090">#708090</td>
        <td style="background: rgb(112, 128, 144)">rgb(112, 128, 144)</td>
    </tr>
    <tr style="color:white;">
        <td style="background: SlateGrey;">SlateGrey</td>
        <td style="background: #708090">#708090</td>
        <td style="background: rgb(112, 128, 144)">rgb(112, 128, 144)</td>
    </tr>
    <tr style="color:white">
        <td style="background: SteelBlue;">SteelBlue</td>
        <td style="background: #4682B4">#4682B4</td>
        <td style="background: rgb(70, 130, 180)">rgb(70, 130, 180)</td>
    </tr>
    <tr style="color:white">
        <td style="background: RoyalBlue;">RoyalBlue</td>
        <td style="background: #4169E1">#4169E1</td>
        <td style="background: rgb(65, 105, 225)">rgb(65, 105, 225)</td>
    </tr>
    <tr style="color:white">
        <td style="background: Blue;">Blue</td>
        <td style="background: #0000FF">#0000FF</td>
        <td style="background: rgb(0, 0, 255)">rgb(0, 0, 255)</td>
    </tr>
    <tr style="color:white">
        <td style="background: MediumBlue;">MediumBlue</td>
        <td style="background: #0000CD">#0000CD</td>
        <td style="background: rgb(0, 0, 205)">rgb(0, 0, 205)</td>
    </tr>
    <tr style="color:white">
        <td style="background: DarkBlue;">DarkBlue</td>
        <td style="background: #00008B">#00008B</td>
        <td style="background: rgb(0, 0, 139)">rgb(0, 0, 139)</td>
    </tr>
    <tr style="color:white">
        <td style="background: MidnightBlue;">MidnightBlue</td>
        <td style="background: #191970">#191970</td>
        <td style="background: rgb(25, 25, 112)">rgb(25, 25, 112)</td>
    </tr>
    <tr style="color:white">
        <td style="background: Navy;">Navy</td>
        <td style="background: #000080">#000080</td>
        <td style="background: rgb(0, 0, 128)">rgb(0, 0, 128)</td>
    </tr>
</table>

### Purple, violet, and magenta colors

<table>
    <tr style="color:black">
        <td style="background: GhostWhite;">GhostWhite</td>
        <td style="background: #F8F8FF">#F8F8FF</td>
        <td style="background: rgb(248, 248, 255)">rgb(248, 248, 255)</td>
    </tr>
    <tr style="color:black">
        <td style="background: LavenderBlush;">LavenderBlush</td>
        <td style="background: #FFF0F5">#FFF0F5</td>
        <td style="background: rgb(255, 240, 245)">rgb(255, 240, 245)</td>
    </tr>
    <tr style="color:black">
        <td style="background: Lavender;">Lavender</td>
        <td style="background: #E6E6FA">#E6E6FA</td>
        <td style="background: rgb(230, 230, 250)">rgb(230, 230, 250)</td>
    </tr>
    <tr style="color:black">
        <td style="background: Thistle;">Thistle</td>
        <td style="background: #D8BFD8">#D8BFD8</td>
        <td style="background: rgb(216, 191, 216)">rgb(216, 191, 216)</td>
    </tr>
    <tr style="color:black">
        <td style="background: Plum;">Plum</td>
        <td style="background: #DDA0DD">#DDA0DD</td>
        <td style="background: rgb(221, 160, 221)">rgb(221, 160, 221)</td>
    </tr>
    <tr style="color:black">
        <td style="background: Violet;">Violet</td>
        <td style="background: #EE82EE">#EE82EE</td>
        <td style="background: rgb(238, 130, 238)">rgb(238, 130, 238)</td>
    </tr>
    <tr style="color:black">
        <td style="background: Fuchsia;">Fuchsia</td>
        <td style="background: #FF00FF">#FF00FF</td>
        <td style="background: rgb(255, 0, 255)">rgb(255, 0, 255)</td>
    </tr>
    <tr style="color:black">
        <td style="background: Magenta;">Magenta</td>
        <td style="background: #FF00FF">#FF00FF</td>
        <td style="background: rgb(255, 0, 255)">rgb(255, 0, 255)</td>
    </tr>
    <tr style="color:black">
        <td style="background: Orchid;">Orchid</td>
        <td style="background: #DA70D6">#DA70D6</td>
        <td style="background: rgb(218, 112, 214)">rgb(218, 112, 214)</td>
    </tr>
    <tr style="color:white">
        <td style="background: MediumOrchid;">MediumOrchid</td>
        <td style="background: #BA55D3">#BA55D3</td>
        <td style="background: rgb(186, 85, 211)">rgb(186, 85, 211)</td>
    </tr>
    <tr style="color:white">
        <td style="background: MediumPurple;">MediumPurple</td>
        <td style="background: #9370DB">#9370DB</td>
        <td style="background: rgb(147, 112, 219)">rgb(147, 112, 219)</td>
    </tr>
    <tr style="color:white">
        <td style="background: MediumSlateBlue;">MediumSlateBlue</td>
        <td style="background: #7B68EE">#7B68EE</td>
        <td style="background: rgb(123, 104, 238)">rgb(123, 104, 238)</td>
    </tr>
    <tr style="color:white">
        <td style="background: DarkOrchid;">DarkOrchid</td>
        <td style="background: #9932CC">#9932CC</td>
        <td style="background: rgb(153, 50, 204)">rgb(153, 50, 204)</td>
    </tr>
    <tr style="color:white">
        <td style="background: SlateBlue;">SlateBlue</td>
        <td style="background: #6A5ACD">#6A5ACD</td>
        <td style="background: rgb(106, 90, 205)">rgb(106, 90, 205)</td>
    </tr>
    <tr style="color:white">
        <td style="background: BlueViolet;">BlueViolet</td>
        <td style="background: #8A2BE2">#8A2BE2</td>
        <td style="background: rgb(138, 43, 226)">rgb(138, 43, 226)</td>
    </tr>
    <tr style="color:white">
        <td style="background: DarkViolet;">DarkViolet</td>
        <td style="background: #9400D3">#9400D3</td>
        <td style="background: rgb(148, 0, 211)">rgb(148, 0, 211)</td>
    </tr>
    <tr style="color:white">
        <td style="background: DarkMagenta;">DarkMagenta</td>
        <td style="background: #8B008B">#8B008B</td>
        <td style="background: rgb(139, 0, 139)">rgb(139, 0, 139)</td>
    </tr>
    <tr style="color:white">
        <td style="background: Purple;">Purple</td>
        <td style="background: #800080">#800080</td>
        <td style="background: rgb(128, 0, 128)">rgb(128, 0, 128)</td>
    </tr>
    <tr style="color:white">
        <td style="background: DarkSlateBlue;">DarkSlateBlue</td>
        <td style="background: #483D8B">#483D8B</td>
        <td style="background: rgb(72, 61, 139)">rgb(72, 61, 139)</td>
    </tr>
    <tr style="color:white">
        <td style="background: Indigo;">Indigo</td>
        <td style="background: #4B0082">#4B0082</td>
        <td style="background: rgb(75, 0, 130)">rgb(75, 0, 130)</td>
    </tr>
</table>

### Gray and black colors

<table>
    <tr style="color:black">
        <td style="background: White;">White</td>
        <td style="background: #FFFFFF">#FFFFFF</td>
        <td style="background: rgb(255, 255, 255)">rgb(255, 255, 255)</td>
    </tr>
    <tr style="color:black">
        <td style="background: Snow;">Snow</td>
        <td style="background: #FFFAFA">#FFFAFA</td>
        <td style="background: rgb(255, 250, 250)">rgb(255, 250, 250)</td>
    </tr>
    <tr style="color:black">
        <td style="background: WhiteSmoke;">WhiteSmoke</td>
        <td style="background: #F5F5F5">#F5F5F5</td>
        <td style="background: rgb(245, 245, 245)">rgb(245, 245, 245)</td>
    </tr>
    <tr style="color:black">
        <td style="background: Gainsboro;">Gainsboro</td>
        <td style="background: #DCDCDC">#DCDCDC</td>
        <td style="background: rgb(220, 220, 220)">rgb(220, 220, 220)</td>
    </tr>
    <tr style="color:black;">
        <td style="background: LightGray;">LightGray</td>
        <td style="background: #D3D3D3">#D3D3D3</td>
        <td style="background: rgb(211, 211, 211)">rgb(211, 211, 211)</td>
    </tr>
    <tr style="color:black;">
        <td style="background: LightGrey;">LightGrey</td>
        <td style="background: #D3D3D3">#D3D3D3</td>
        <td style="background: rgb(211, 211, 211)">rgb(211, 211, 211)</td>
    </tr>
    <tr style="color:black">
        <td style="background: Silver;">Silver</td>
        <td style="background: #C0C0C0">#C0C0C0</td>
        <td style="background: rgb(192, 192, 192)">rgb(192, 192, 192)</td>
    </tr>
    <tr style="color:black;">
        <td style="background: DarkGray;">DarkGray</td>
        <td style="background: #A9A9A9">#A9A9A9</td>
        <td style="background: rgb(169, 169, 169)">rgb(169, 169, 169)</td>
    </tr>
    <tr style="color:black;">
        <td style="background: DarkGrey;">DarkGrey</td>
        <td style="background: #A9A9A9">#A9A9A9</td>
        <td style="background: rgb(169, 169, 169)">rgb(169, 169, 169)</td>
    </tr>
    <tr style="color:white">
        <td style="background: Gray;">Gray</td>
        <td style="background: #808080">#808080</td>
        <td style="background: rgb(128, 128, 128)">rgb(128, 128, 128)</td>
    </tr>
    <tr style="color:white">
        <td style="background: Grey;">Grey</td>
        <td style="background: #808080">#808080</td>
        <td style="background: rgb(128, 128, 128)">rgb(128, 128, 128)</td>
    </tr>
    <tr style="color:white;">
        <td style="background: DimGray;">DimGray</td>
        <td style="background: #696969">#696969</td>
        <td style="background: rgb(105, 105, 105)">rgb(105, 105, 105)</td>
    </tr>
    <tr style="color:white;">
        <td style="background: DimGrey;">DimGrey</td>
        <td style="background: #696969">#696969</td>
        <td style="background: rgb(105, 105, 105)">rgb(105, 105, 105)</td>
    </tr>
    <tr style="color:white">
        <td style="background: Black;">Black</td>
        <td style="background: #000000">#000000</td>
        <td style="background: rgb(0, 0, 0)">rgb(0, 0, 0)</td>
    </tr>
</table>

## Links

- [https://www.youtube.com/watch?v=HmStJQzclHc](https://www.youtube.com/watch?v=HmStJQzclHc)
- [https://developer.mozilla.org/en/docs/Web/CSS/color_value](https://developer.mozilla.org/en/docs/Web/CSS/color_value)
- [https://www.w3.org/TR/css-color-4/](https://www.w3.org/TR/css-color-4/)
