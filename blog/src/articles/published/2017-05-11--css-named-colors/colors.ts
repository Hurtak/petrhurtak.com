interface IColorGroup {
  title: string;
  colors: [string, string, string, boolean][];
}

const colors: IColorGroup[] = [
  {
    title: "Pink colors",
    colors: [
      ["MistyRose", "#FFE4E1", "rgb(255, 228, 225)", false],
      ["Pink", "#FFC0CB", "rgb(255, 192, 203)", false],
      ["LightPink", "#FFB6C1", "rgb(255, 182, 193)", false],
      ["HotPink", "#FF69B4", "rgb(255, 105, 180)", true],
      ["PaleVioletRed", "#DB7093", "rgb(219, 112, 147)", true],
      ["DeepPink", "#FF1493", "rgb(255, 20, 147)", true],
      ["MediumVioletRed", "#C71585", "rgb(199, 21, 133)", true]
    ]
  },

  {
    title: "Red colors",
    colors: [
      ["LightSalmon", "#FFA07A", "rgb(255, 160, 122)", false],
      ["DarkSalmon", "#E9967A", "rgb(233, 150, 122)", false],
      ["Salmon", "#FA8072", "rgb(250, 128, 114)", false],
      ["LightCoral", "#F08080", "rgb(240, 128, 128)", false],
      ["Red", "#FF0000", "rgb(255, 0, 0)", true],
      ["IndianRed", "#CD5C5C", "rgb(205, 92, 92)", true],
      ["Crimson", "#DC143C", "rgb(220, 20, 60)", true],
      ["FireBrick", "#B22222", "rgb(178, 34, 34)", true],
      ["DarkRed", "#8B0000", "rgb(139, 0, 0)", true]
    ]
  },

  {
    title: "Orange colors",
    colors: [
      ["FloralWhite", "#FFFAF0", "rgb(255, 250, 240)", false],
      ["Seashell", "#FFF5EE", "rgb(255, 245, 238)", false],
      ["OldLace", "#FDF5E6", "rgb(253, 245, 230)", false],
      ["Linen", "#FAF0E6", "rgb(250, 240, 230)", false],
      ["AntiqueWhite", "#FAEBD7", "rgb(250, 235, 215)", false],
      ["Orange", "#FFA500", "rgb(255, 165, 0)", false],
      ["DarkOrange", "#FF8C00", "rgb(255, 140, 0)", false],
      ["Coral", "#FF7F50", "rgb(255, 127, 80)", false],
      ["Tomato", "#FF6347", "rgb(255, 99, 71)", true],
      ["OrangeRed", "#FF4500", "rgb(255, 69, 0)", true]
    ]
  },

  {
    title: "Yellow colors",
    colors: [
      ["Ivory", "#FFFFF0", "rgb(255, 255, 240)", false],
      ["LightYellow", "#FFFFE0", "rgb(255, 255, 224)", false],
      ["LemonChiffon", "#FFFACD", "rgb(255, 250, 205)", false],
      ["LightGoldenrodYellow", "#FAFAD2", "rgb(250, 250, 210)", false],
      ["Beige", "#F5F5DC", "rgb(245, 245, 220)", false],
      ["PapayaWhip", "#FFEFD5", "rgb(255, 239, 213)", false],
      ["Yellow", "#FFFF00", "rgb(255, 255, 0)", false],
      ["Moccasin", "#FFE4B5", "rgb(255, 228, 181)", false],
      ["PaleGoldenrod", "#EEE8AA", "rgb(238, 232, 170)", false],
      ["PeachPuff", "#FFDAB9", "rgb(255, 218, 185)", false],
      ["Khaki", "#F0E68C", "rgb(240, 230, 140)", false],
      ["Gold", "#FFD700", "rgb(255, 215, 0)", false],
      ["DarkKhaki", "#BDB76B", "rgb(189, 183, 107)", false]
    ]
  },

  {
    title: "Brown colors",
    colors: [
      ["Cornsilk", "#FFF8DC", "rgb(255, 248, 220)", false],
      ["BlanchedAlmond", "#FFEBCD", "rgb(255, 235, 205)", false],
      ["Bisque", "#FFE4C4", "rgb(255, 228, 196)", false],
      ["NavajoWhite", "#FFDEAD", "rgb(255, 222, 173)", false],
      ["Wheat", "#F5DEB3", "rgb(245, 222, 179)", false],
      ["BurlyWood", "#DEB887", "rgb(222, 184, 135)", false],
      ["SandyBrown", "#F4A460", "rgb(244, 164, 96)", false],
      ["Tan", "#D2B48C", "rgb(210, 180, 140)", false],
      ["Goldenrod", "#DAA520", "rgb(218, 165, 32)", false],
      ["RosyBrown", "#BC8F8F", "rgb(188, 143, 143)", false],
      ["Peru", "#CD853F", "rgb(205, 133, 63)", false],
      ["DarkGoldenrod", "#B8860B", "rgb(184, 134, 11)", false],
      ["Chocolate", "#D2691E", "rgb(210, 105, 30)", true],
      ["Sienna", "#A0522D", "rgb(160, 82, 45)", true],
      ["Brown", "#A52A2A", "rgb(165, 42, 42)", true],
      ["SaddleBrown", "#8B4513", "rgb(139, 69, 19)", true],
      ["Maroon", "#800000", "rgb(128, 0, 0)", true]
    ]
  },

  {
    title: "Green colors",
    colors: [
      ["MintCream", "#F5FFFA", "rgb(245, 255, 250)", false],
      ["Honeydew", "#F0FFF0", "rgb(240, 255, 240)", false],
      ["GreenYellow", "#ADFF2F", "rgb(173, 255, 47)", false],
      ["PaleGreen", "#98FB98", "rgb(152, 251, 152)", false],
      ["Chartreuse", "#7FFF00", "rgb(127, 255, 0)", false],
      ["LawnGreen", "#7CFC00", "rgb(124, 252, 0)", false],
      ["LightGreen", "#90EE90", "rgb(144, 238, 144)", false],
      ["SpringGreen", "#00FF7F", "rgb(0, 255, 127)", false],
      ["MediumSpringGreen", "#00FA9A", "rgb(0, 250, 154)", false],
      ["Lime", "#00FF00", "rgb(0, 255, 0)", false],
      ["YellowGreen", "#9ACD32", "rgb(154, 205, 50)", false],
      ["MediumAquamarine", "#66CDAA", "rgb(102, 205, 170)", false],
      ["DarkSeaGreen", "#8FBC8F", "rgb(143, 188, 143)", false],
      ["LimeGreen", "#32CD32", "rgb(50, 205, 50)", false],
      ["MediumSeaGreen", "#3CB371", "rgb(60, 179, 113)", false],
      ["OliveDrab", "#6B8E23", "rgb(107, 142, 35)", true],
      ["Olive", "#808000", "rgb(128, 128, 0)", true],
      ["SeaGreen", "#2E8B57", "rgb(46, 139, 87)", true],
      ["ForestGreen", "#228B22", "rgb(34, 139, 34)", true],
      ["Green", "#008000", "rgb(0, 128, 0)", true],
      ["DarkOliveGreen", "#556B2F", "rgb(85, 107, 47)", true],
      ["DarkGreen", "#006400", "rgb(0, 100, 0)", true],
      ["DarkSlateGray", "#2F4F4F", "rgb(47, 79, 79)", true],
      ["DarkSlateGrey", "#2F4F4F", "rgb(47, 79, 79)", true]
    ]
  },

  {
    title: "Cyan colors",
    colors: [
      ["LightCyan", "#E0FFFF", "rgb(224, 255, 255)", false],
      ["PaleTurquoise", "#AFEEEE", "rgb(175, 238, 238)", false],
      ["Aquamarine", "#7FFFD4", "rgb(127, 255, 212)", false],
      ["Aqua", "#00FFFF", "rgb(0, 255, 255)", false],
      ["Cyan", "#00FFFF", "rgb(0, 255, 255)", false],
      ["Turquoise", "#40E0D0", "rgb(64, 224, 208)", false],
      ["MediumTurquoise", "#48D1CC", "rgb(72, 209, 204)", false],
      ["DarkTurquoise", "#00CED1", "rgb(0, 206, 209)", false],
      ["LightSeaGreen", "#20B2AA", "rgb(32, 178, 170)", false],
      ["CadetBlue", "#5F9EA0", "rgb(95, 158, 160)", true],
      ["DarkCyan", "#008B8B", "rgb(0, 139, 139)", true],
      ["Teal", "#008080", "rgb(0, 128, 128)", true]
    ]
  },

  {
    title: "Blue colors",
    colors: [
      ["Azure", "#F0FFFF", "rgb(240, 255, 255)", false],
      ["AliceBlue", "#F0F8FF", "rgb(240, 248, 255)", false],
      ["PowderBlue", "#B0E0E6", "rgb(176, 224, 230)", false],
      ["LightBlue", "#ADD8E6", "rgb(173, 216, 230)", false],
      ["LightSkyBlue", "#87CEFA", "rgb(135, 206, 250)", false],
      ["LightSteelBlue", "#B0C4DE", "rgb(176, 196, 222)", false],
      ["SkyBlue", "#87CEEB", "rgb(135, 206, 235)", false],
      ["DeepSkyBlue", "#00BFFF", "rgb(0, 191, 255)", false],
      ["CornflowerBlue", "#6495ED", "rgb(100, 149, 237)", false],
      ["DodgerBlue", "#1E90FF", "rgb(30, 144, 255)", false],
      ["LightSlateGray", "#778899", "rgb(119, 136, 153)", true],
      ["LightSlateGrey", "#778899", "rgb(119, 136, 153)", true],
      ["SlateGray", "#708090", "rgb(112, 128, 144)", true],
      ["SlateGrey", "#708090", "rgb(112, 128, 144)", true],
      ["SteelBlue", "#4682B4", "rgb(70, 130, 180)", true],
      ["RoyalBlue", "#4169E1", "rgb(65, 105, 225)", true],
      ["Blue", "#0000FF", "rgb(0, 0, 255)", true],
      ["MediumBlue", "#0000CD", "rgb(0, 0, 205)", true],
      ["DarkBlue", "#00008B", "rgb(0, 0, 139)", true],
      ["MidnightBlue", "#191970", "rgb(25, 25, 112)", true],
      ["Navy", "#000080", "rgb(0, 0, 128)", true]
    ]
  },

  {
    title: "Purple, violet, and magenta colors",
    colors: [
      ["GhostWhite", "#F8F8FF", "rgb(248, 248, 255)", false],
      ["LavenderBlush", "#FFF0F5", "rgb(255, 240, 245)", false],
      ["Lavender", "#E6E6FA", "rgb(230, 230, 250)", false],
      ["Thistle", "#D8BFD8", "rgb(216, 191, 216)", false],
      ["Plum", "#DDA0DD", "rgb(221, 160, 221)", false],
      ["Violet", "#EE82EE", "rgb(238, 130, 238)", false],
      ["Fuchsia", "#FF00FF", "rgb(255, 0, 255)", false],
      ["Magenta", "#FF00FF", "rgb(255, 0, 255)", false],
      ["Orchid", "#DA70D6", "rgb(218, 112, 214)", false],
      ["MediumOrchid", "#BA55D3", "rgb(186, 85, 211)", true],
      ["MediumPurple", "#9370DB", "rgb(147, 112, 219)", true],
      ["MediumSlateBlue", "#7B68EE", "rgb(123, 104, 238)", true],
      ["DarkOrchid", "#9932CC", "rgb(153, 50, 204)", true],
      ["SlateBlue", "#6A5ACD", "rgb(106, 90, 205)", true],
      ["BlueViolet", "#8A2BE2", "rgb(138, 43, 226)", true],
      ["DarkViolet", "#9400D3", "rgb(148, 0, 211)", true],
      ["DarkMagenta", "#8B008B", "rgb(139, 0, 139)", true],
      ["Purple", "#800080", "rgb(128, 0, 128)", true],
      ["DarkSlateBlue", "#483D8B", "rgb(72, 61, 139)", true],
      ["Indigo", "#4B0082", "rgb(75, 0, 130)", true]
    ]
  },

  {
    title: "White, Gray, and black colors",
    colors: [
      ["White", "#FFFFFF", "rgb(255, 255, 255)", false],
      ["Snow", "#FFFAFA", "rgb(255, 250, 250)", false],
      ["WhiteSmoke", "#F5F5F5", "rgb(245, 245, 245)", false],
      ["Gainsboro", "#DCDCDC", "rgb(220, 220, 220)", false],
      ["LightGray", "#D3D3D3", "rgb(211, 211, 211)", false],
      ["LightGrey", "#D3D3D3", "rgb(211, 211, 211)", false],
      ["Silver", "#C0C0C0", "rgb(192, 192, 192)", false],
      ["DarkGray", "#A9A9A9", "rgb(169, 169, 169)", false],
      ["DarkGrey", "#A9A9A9", "rgb(169, 169, 169)", false],
      ["Gray", "#808080", "rgb(128, 128, 128)", true],
      ["Grey", "#808080", "rgb(128, 128, 128)", true],
      ["DimGray", "#696969", "rgb(105, 105, 105)", true],
      ["DimGrey", "#696969", "rgb(105, 105, 105)", true],
      ["Black", "#000000", "rgb(0, 0, 0)", true]
    ]
  }
];

export default colors;
