(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["npm.chartjs-color"],{

/***/ "7W/t":
/*!****************************************************************************************************************************!*\
  !*** /home/ec2-user/environment/dev-ops/projects/slatwall2/node_modules/chartjs-color/node_modules/color-convert/index.js ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

eval("var conversions = __webpack_require__(/*! ./conversions */ \"Nxyu\");\n\nvar convert = function() {\n   return new Converter();\n}\n\nfor (var func in conversions) {\n  // export Raw versions\n  convert[func + \"Raw\"] =  (function(func) {\n    // accept array or plain args\n    return function(arg) {\n      if (typeof arg == \"number\")\n        arg = Array.prototype.slice.call(arguments);\n      return conversions[func](arg);\n    }\n  })(func);\n\n  var pair = /(\\w+)2(\\w+)/.exec(func),\n      from = pair[1],\n      to = pair[2];\n\n  // export rgb2hsl and [\"rgb\"][\"hsl\"]\n  convert[from] = convert[from] || {};\n\n  convert[from][to] = convert[func] = (function(func) { \n    return function(arg) {\n      if (typeof arg == \"number\")\n        arg = Array.prototype.slice.call(arguments);\n      \n      var val = conversions[func](arg);\n      if (typeof val == \"string\" || val === undefined)\n        return val; // keyword\n\n      for (var i = 0; i < val.length; i++)\n        val[i] = Math.round(val[i]);\n      return val;\n    }\n  })(func);\n}\n\n\n/* Converter does lazy conversion and caching */\nvar Converter = function() {\n   this.convs = {};\n};\n\n/* Either get the values for a space or\n  set the values for a space, depending on args */\nConverter.prototype.routeSpace = function(space, args) {\n   var values = args[0];\n   if (values === undefined) {\n      // color.rgb()\n      return this.getValues(space);\n   }\n   // color.rgb(10, 10, 10)\n   if (typeof values == \"number\") {\n      values = Array.prototype.slice.call(args);        \n   }\n\n   return this.setValues(space, values);\n};\n  \n/* Set the values for a space, invalidating cache */\nConverter.prototype.setValues = function(space, values) {\n   this.space = space;\n   this.convs = {};\n   this.convs[space] = values;\n   return this;\n};\n\n/* Get the values for a space. If there's already\n  a conversion for the space, fetch it, otherwise\n  compute it */\nConverter.prototype.getValues = function(space) {\n   var vals = this.convs[space];\n   if (!vals) {\n      var fspace = this.space,\n          from = this.convs[fspace];\n      vals = convert[fspace][space](from);\n\n      this.convs[space] = vals;\n   }\n  return vals;\n};\n\n[\"rgb\", \"hsl\", \"hsv\", \"cmyk\", \"keyword\"].forEach(function(space) {\n   Converter.prototype[space] = function(vals) {\n      return this.routeSpace(space, arguments);\n   }\n});\n\nmodule.exports = convert;\n\n//# sourceURL=webpack:////home/ec2-user/environment/dev-ops/projects/slatwall2/node_modules/chartjs-color/node_modules/color-convert/index.js?");

/***/ }),

/***/ "Nxyu":
/*!**********************************************************************************************************************************!*\
  !*** /home/ec2-user/environment/dev-ops/projects/slatwall2/node_modules/chartjs-color/node_modules/color-convert/conversions.js ***!
  \**********************************************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports) {

eval("/* MIT license */\n\nmodule.exports = {\n  rgb2hsl: rgb2hsl,\n  rgb2hsv: rgb2hsv,\n  rgb2hwb: rgb2hwb,\n  rgb2cmyk: rgb2cmyk,\n  rgb2keyword: rgb2keyword,\n  rgb2xyz: rgb2xyz,\n  rgb2lab: rgb2lab,\n  rgb2lch: rgb2lch,\n\n  hsl2rgb: hsl2rgb,\n  hsl2hsv: hsl2hsv,\n  hsl2hwb: hsl2hwb,\n  hsl2cmyk: hsl2cmyk,\n  hsl2keyword: hsl2keyword,\n\n  hsv2rgb: hsv2rgb,\n  hsv2hsl: hsv2hsl,\n  hsv2hwb: hsv2hwb,\n  hsv2cmyk: hsv2cmyk,\n  hsv2keyword: hsv2keyword,\n\n  hwb2rgb: hwb2rgb,\n  hwb2hsl: hwb2hsl,\n  hwb2hsv: hwb2hsv,\n  hwb2cmyk: hwb2cmyk,\n  hwb2keyword: hwb2keyword,\n\n  cmyk2rgb: cmyk2rgb,\n  cmyk2hsl: cmyk2hsl,\n  cmyk2hsv: cmyk2hsv,\n  cmyk2hwb: cmyk2hwb,\n  cmyk2keyword: cmyk2keyword,\n\n  keyword2rgb: keyword2rgb,\n  keyword2hsl: keyword2hsl,\n  keyword2hsv: keyword2hsv,\n  keyword2hwb: keyword2hwb,\n  keyword2cmyk: keyword2cmyk,\n  keyword2lab: keyword2lab,\n  keyword2xyz: keyword2xyz,\n\n  xyz2rgb: xyz2rgb,\n  xyz2lab: xyz2lab,\n  xyz2lch: xyz2lch,\n\n  lab2xyz: lab2xyz,\n  lab2rgb: lab2rgb,\n  lab2lch: lab2lch,\n\n  lch2lab: lch2lab,\n  lch2xyz: lch2xyz,\n  lch2rgb: lch2rgb\n}\n\n\nfunction rgb2hsl(rgb) {\n  var r = rgb[0]/255,\n      g = rgb[1]/255,\n      b = rgb[2]/255,\n      min = Math.min(r, g, b),\n      max = Math.max(r, g, b),\n      delta = max - min,\n      h, s, l;\n\n  if (max == min)\n    h = 0;\n  else if (r == max)\n    h = (g - b) / delta;\n  else if (g == max)\n    h = 2 + (b - r) / delta;\n  else if (b == max)\n    h = 4 + (r - g)/ delta;\n\n  h = Math.min(h * 60, 360);\n\n  if (h < 0)\n    h += 360;\n\n  l = (min + max) / 2;\n\n  if (max == min)\n    s = 0;\n  else if (l <= 0.5)\n    s = delta / (max + min);\n  else\n    s = delta / (2 - max - min);\n\n  return [h, s * 100, l * 100];\n}\n\nfunction rgb2hsv(rgb) {\n  var r = rgb[0],\n      g = rgb[1],\n      b = rgb[2],\n      min = Math.min(r, g, b),\n      max = Math.max(r, g, b),\n      delta = max - min,\n      h, s, v;\n\n  if (max == 0)\n    s = 0;\n  else\n    s = (delta/max * 1000)/10;\n\n  if (max == min)\n    h = 0;\n  else if (r == max)\n    h = (g - b) / delta;\n  else if (g == max)\n    h = 2 + (b - r) / delta;\n  else if (b == max)\n    h = 4 + (r - g) / delta;\n\n  h = Math.min(h * 60, 360);\n\n  if (h < 0)\n    h += 360;\n\n  v = ((max / 255) * 1000) / 10;\n\n  return [h, s, v];\n}\n\nfunction rgb2hwb(rgb) {\n  var r = rgb[0],\n      g = rgb[1],\n      b = rgb[2],\n      h = rgb2hsl(rgb)[0],\n      w = 1/255 * Math.min(r, Math.min(g, b)),\n      b = 1 - 1/255 * Math.max(r, Math.max(g, b));\n\n  return [h, w * 100, b * 100];\n}\n\nfunction rgb2cmyk(rgb) {\n  var r = rgb[0] / 255,\n      g = rgb[1] / 255,\n      b = rgb[2] / 255,\n      c, m, y, k;\n\n  k = Math.min(1 - r, 1 - g, 1 - b);\n  c = (1 - r - k) / (1 - k) || 0;\n  m = (1 - g - k) / (1 - k) || 0;\n  y = (1 - b - k) / (1 - k) || 0;\n  return [c * 100, m * 100, y * 100, k * 100];\n}\n\nfunction rgb2keyword(rgb) {\n  return reverseKeywords[JSON.stringify(rgb)];\n}\n\nfunction rgb2xyz(rgb) {\n  var r = rgb[0] / 255,\n      g = rgb[1] / 255,\n      b = rgb[2] / 255;\n\n  // assume sRGB\n  r = r > 0.04045 ? Math.pow(((r + 0.055) / 1.055), 2.4) : (r / 12.92);\n  g = g > 0.04045 ? Math.pow(((g + 0.055) / 1.055), 2.4) : (g / 12.92);\n  b = b > 0.04045 ? Math.pow(((b + 0.055) / 1.055), 2.4) : (b / 12.92);\n\n  var x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);\n  var y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);\n  var z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);\n\n  return [x * 100, y *100, z * 100];\n}\n\nfunction rgb2lab(rgb) {\n  var xyz = rgb2xyz(rgb),\n        x = xyz[0],\n        y = xyz[1],\n        z = xyz[2],\n        l, a, b;\n\n  x /= 95.047;\n  y /= 100;\n  z /= 108.883;\n\n  x = x > 0.008856 ? Math.pow(x, 1/3) : (7.787 * x) + (16 / 116);\n  y = y > 0.008856 ? Math.pow(y, 1/3) : (7.787 * y) + (16 / 116);\n  z = z > 0.008856 ? Math.pow(z, 1/3) : (7.787 * z) + (16 / 116);\n\n  l = (116 * y) - 16;\n  a = 500 * (x - y);\n  b = 200 * (y - z);\n\n  return [l, a, b];\n}\n\nfunction rgb2lch(args) {\n  return lab2lch(rgb2lab(args));\n}\n\nfunction hsl2rgb(hsl) {\n  var h = hsl[0] / 360,\n      s = hsl[1] / 100,\n      l = hsl[2] / 100,\n      t1, t2, t3, rgb, val;\n\n  if (s == 0) {\n    val = l * 255;\n    return [val, val, val];\n  }\n\n  if (l < 0.5)\n    t2 = l * (1 + s);\n  else\n    t2 = l + s - l * s;\n  t1 = 2 * l - t2;\n\n  rgb = [0, 0, 0];\n  for (var i = 0; i < 3; i++) {\n    t3 = h + 1 / 3 * - (i - 1);\n    t3 < 0 && t3++;\n    t3 > 1 && t3--;\n\n    if (6 * t3 < 1)\n      val = t1 + (t2 - t1) * 6 * t3;\n    else if (2 * t3 < 1)\n      val = t2;\n    else if (3 * t3 < 2)\n      val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;\n    else\n      val = t1;\n\n    rgb[i] = val * 255;\n  }\n\n  return rgb;\n}\n\nfunction hsl2hsv(hsl) {\n  var h = hsl[0],\n      s = hsl[1] / 100,\n      l = hsl[2] / 100,\n      sv, v;\n\n  if(l === 0) {\n      // no need to do calc on black\n      // also avoids divide by 0 error\n      return [0, 0, 0];\n  }\n\n  l *= 2;\n  s *= (l <= 1) ? l : 2 - l;\n  v = (l + s) / 2;\n  sv = (2 * s) / (l + s);\n  return [h, sv * 100, v * 100];\n}\n\nfunction hsl2hwb(args) {\n  return rgb2hwb(hsl2rgb(args));\n}\n\nfunction hsl2cmyk(args) {\n  return rgb2cmyk(hsl2rgb(args));\n}\n\nfunction hsl2keyword(args) {\n  return rgb2keyword(hsl2rgb(args));\n}\n\n\nfunction hsv2rgb(hsv) {\n  var h = hsv[0] / 60,\n      s = hsv[1] / 100,\n      v = hsv[2] / 100,\n      hi = Math.floor(h) % 6;\n\n  var f = h - Math.floor(h),\n      p = 255 * v * (1 - s),\n      q = 255 * v * (1 - (s * f)),\n      t = 255 * v * (1 - (s * (1 - f))),\n      v = 255 * v;\n\n  switch(hi) {\n    case 0:\n      return [v, t, p];\n    case 1:\n      return [q, v, p];\n    case 2:\n      return [p, v, t];\n    case 3:\n      return [p, q, v];\n    case 4:\n      return [t, p, v];\n    case 5:\n      return [v, p, q];\n  }\n}\n\nfunction hsv2hsl(hsv) {\n  var h = hsv[0],\n      s = hsv[1] / 100,\n      v = hsv[2] / 100,\n      sl, l;\n\n  l = (2 - s) * v;\n  sl = s * v;\n  sl /= (l <= 1) ? l : 2 - l;\n  sl = sl || 0;\n  l /= 2;\n  return [h, sl * 100, l * 100];\n}\n\nfunction hsv2hwb(args) {\n  return rgb2hwb(hsv2rgb(args))\n}\n\nfunction hsv2cmyk(args) {\n  return rgb2cmyk(hsv2rgb(args));\n}\n\nfunction hsv2keyword(args) {\n  return rgb2keyword(hsv2rgb(args));\n}\n\n// http://dev.w3.org/csswg/css-color/#hwb-to-rgb\nfunction hwb2rgb(hwb) {\n  var h = hwb[0] / 360,\n      wh = hwb[1] / 100,\n      bl = hwb[2] / 100,\n      ratio = wh + bl,\n      i, v, f, n;\n\n  // wh + bl cant be > 1\n  if (ratio > 1) {\n    wh /= ratio;\n    bl /= ratio;\n  }\n\n  i = Math.floor(6 * h);\n  v = 1 - bl;\n  f = 6 * h - i;\n  if ((i & 0x01) != 0) {\n    f = 1 - f;\n  }\n  n = wh + f * (v - wh);  // linear interpolation\n\n  switch (i) {\n    default:\n    case 6:\n    case 0: r = v; g = n; b = wh; break;\n    case 1: r = n; g = v; b = wh; break;\n    case 2: r = wh; g = v; b = n; break;\n    case 3: r = wh; g = n; b = v; break;\n    case 4: r = n; g = wh; b = v; break;\n    case 5: r = v; g = wh; b = n; break;\n  }\n\n  return [r * 255, g * 255, b * 255];\n}\n\nfunction hwb2hsl(args) {\n  return rgb2hsl(hwb2rgb(args));\n}\n\nfunction hwb2hsv(args) {\n  return rgb2hsv(hwb2rgb(args));\n}\n\nfunction hwb2cmyk(args) {\n  return rgb2cmyk(hwb2rgb(args));\n}\n\nfunction hwb2keyword(args) {\n  return rgb2keyword(hwb2rgb(args));\n}\n\nfunction cmyk2rgb(cmyk) {\n  var c = cmyk[0] / 100,\n      m = cmyk[1] / 100,\n      y = cmyk[2] / 100,\n      k = cmyk[3] / 100,\n      r, g, b;\n\n  r = 1 - Math.min(1, c * (1 - k) + k);\n  g = 1 - Math.min(1, m * (1 - k) + k);\n  b = 1 - Math.min(1, y * (1 - k) + k);\n  return [r * 255, g * 255, b * 255];\n}\n\nfunction cmyk2hsl(args) {\n  return rgb2hsl(cmyk2rgb(args));\n}\n\nfunction cmyk2hsv(args) {\n  return rgb2hsv(cmyk2rgb(args));\n}\n\nfunction cmyk2hwb(args) {\n  return rgb2hwb(cmyk2rgb(args));\n}\n\nfunction cmyk2keyword(args) {\n  return rgb2keyword(cmyk2rgb(args));\n}\n\n\nfunction xyz2rgb(xyz) {\n  var x = xyz[0] / 100,\n      y = xyz[1] / 100,\n      z = xyz[2] / 100,\n      r, g, b;\n\n  r = (x * 3.2406) + (y * -1.5372) + (z * -0.4986);\n  g = (x * -0.9689) + (y * 1.8758) + (z * 0.0415);\n  b = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);\n\n  // assume sRGB\n  r = r > 0.0031308 ? ((1.055 * Math.pow(r, 1.0 / 2.4)) - 0.055)\n    : r = (r * 12.92);\n\n  g = g > 0.0031308 ? ((1.055 * Math.pow(g, 1.0 / 2.4)) - 0.055)\n    : g = (g * 12.92);\n\n  b = b > 0.0031308 ? ((1.055 * Math.pow(b, 1.0 / 2.4)) - 0.055)\n    : b = (b * 12.92);\n\n  r = Math.min(Math.max(0, r), 1);\n  g = Math.min(Math.max(0, g), 1);\n  b = Math.min(Math.max(0, b), 1);\n\n  return [r * 255, g * 255, b * 255];\n}\n\nfunction xyz2lab(xyz) {\n  var x = xyz[0],\n      y = xyz[1],\n      z = xyz[2],\n      l, a, b;\n\n  x /= 95.047;\n  y /= 100;\n  z /= 108.883;\n\n  x = x > 0.008856 ? Math.pow(x, 1/3) : (7.787 * x) + (16 / 116);\n  y = y > 0.008856 ? Math.pow(y, 1/3) : (7.787 * y) + (16 / 116);\n  z = z > 0.008856 ? Math.pow(z, 1/3) : (7.787 * z) + (16 / 116);\n\n  l = (116 * y) - 16;\n  a = 500 * (x - y);\n  b = 200 * (y - z);\n\n  return [l, a, b];\n}\n\nfunction xyz2lch(args) {\n  return lab2lch(xyz2lab(args));\n}\n\nfunction lab2xyz(lab) {\n  var l = lab[0],\n      a = lab[1],\n      b = lab[2],\n      x, y, z, y2;\n\n  if (l <= 8) {\n    y = (l * 100) / 903.3;\n    y2 = (7.787 * (y / 100)) + (16 / 116);\n  } else {\n    y = 100 * Math.pow((l + 16) / 116, 3);\n    y2 = Math.pow(y / 100, 1/3);\n  }\n\n  x = x / 95.047 <= 0.008856 ? x = (95.047 * ((a / 500) + y2 - (16 / 116))) / 7.787 : 95.047 * Math.pow((a / 500) + y2, 3);\n\n  z = z / 108.883 <= 0.008859 ? z = (108.883 * (y2 - (b / 200) - (16 / 116))) / 7.787 : 108.883 * Math.pow(y2 - (b / 200), 3);\n\n  return [x, y, z];\n}\n\nfunction lab2lch(lab) {\n  var l = lab[0],\n      a = lab[1],\n      b = lab[2],\n      hr, h, c;\n\n  hr = Math.atan2(b, a);\n  h = hr * 360 / 2 / Math.PI;\n  if (h < 0) {\n    h += 360;\n  }\n  c = Math.sqrt(a * a + b * b);\n  return [l, c, h];\n}\n\nfunction lab2rgb(args) {\n  return xyz2rgb(lab2xyz(args));\n}\n\nfunction lch2lab(lch) {\n  var l = lch[0],\n      c = lch[1],\n      h = lch[2],\n      a, b, hr;\n\n  hr = h / 360 * 2 * Math.PI;\n  a = c * Math.cos(hr);\n  b = c * Math.sin(hr);\n  return [l, a, b];\n}\n\nfunction lch2xyz(args) {\n  return lab2xyz(lch2lab(args));\n}\n\nfunction lch2rgb(args) {\n  return lab2rgb(lch2lab(args));\n}\n\nfunction keyword2rgb(keyword) {\n  return cssKeywords[keyword];\n}\n\nfunction keyword2hsl(args) {\n  return rgb2hsl(keyword2rgb(args));\n}\n\nfunction keyword2hsv(args) {\n  return rgb2hsv(keyword2rgb(args));\n}\n\nfunction keyword2hwb(args) {\n  return rgb2hwb(keyword2rgb(args));\n}\n\nfunction keyword2cmyk(args) {\n  return rgb2cmyk(keyword2rgb(args));\n}\n\nfunction keyword2lab(args) {\n  return rgb2lab(keyword2rgb(args));\n}\n\nfunction keyword2xyz(args) {\n  return rgb2xyz(keyword2rgb(args));\n}\n\nvar cssKeywords = {\n  aliceblue:  [240,248,255],\n  antiquewhite: [250,235,215],\n  aqua: [0,255,255],\n  aquamarine: [127,255,212],\n  azure:  [240,255,255],\n  beige:  [245,245,220],\n  bisque: [255,228,196],\n  black:  [0,0,0],\n  blanchedalmond: [255,235,205],\n  blue: [0,0,255],\n  blueviolet: [138,43,226],\n  brown:  [165,42,42],\n  burlywood:  [222,184,135],\n  cadetblue:  [95,158,160],\n  chartreuse: [127,255,0],\n  chocolate:  [210,105,30],\n  coral:  [255,127,80],\n  cornflowerblue: [100,149,237],\n  cornsilk: [255,248,220],\n  crimson:  [220,20,60],\n  cyan: [0,255,255],\n  darkblue: [0,0,139],\n  darkcyan: [0,139,139],\n  darkgoldenrod:  [184,134,11],\n  darkgray: [169,169,169],\n  darkgreen:  [0,100,0],\n  darkgrey: [169,169,169],\n  darkkhaki:  [189,183,107],\n  darkmagenta:  [139,0,139],\n  darkolivegreen: [85,107,47],\n  darkorange: [255,140,0],\n  darkorchid: [153,50,204],\n  darkred:  [139,0,0],\n  darksalmon: [233,150,122],\n  darkseagreen: [143,188,143],\n  darkslateblue:  [72,61,139],\n  darkslategray:  [47,79,79],\n  darkslategrey:  [47,79,79],\n  darkturquoise:  [0,206,209],\n  darkviolet: [148,0,211],\n  deeppink: [255,20,147],\n  deepskyblue:  [0,191,255],\n  dimgray:  [105,105,105],\n  dimgrey:  [105,105,105],\n  dodgerblue: [30,144,255],\n  firebrick:  [178,34,34],\n  floralwhite:  [255,250,240],\n  forestgreen:  [34,139,34],\n  fuchsia:  [255,0,255],\n  gainsboro:  [220,220,220],\n  ghostwhite: [248,248,255],\n  gold: [255,215,0],\n  goldenrod:  [218,165,32],\n  gray: [128,128,128],\n  green:  [0,128,0],\n  greenyellow:  [173,255,47],\n  grey: [128,128,128],\n  honeydew: [240,255,240],\n  hotpink:  [255,105,180],\n  indianred:  [205,92,92],\n  indigo: [75,0,130],\n  ivory:  [255,255,240],\n  khaki:  [240,230,140],\n  lavender: [230,230,250],\n  lavenderblush:  [255,240,245],\n  lawngreen:  [124,252,0],\n  lemonchiffon: [255,250,205],\n  lightblue:  [173,216,230],\n  lightcoral: [240,128,128],\n  lightcyan:  [224,255,255],\n  lightgoldenrodyellow: [250,250,210],\n  lightgray:  [211,211,211],\n  lightgreen: [144,238,144],\n  lightgrey:  [211,211,211],\n  lightpink:  [255,182,193],\n  lightsalmon:  [255,160,122],\n  lightseagreen:  [32,178,170],\n  lightskyblue: [135,206,250],\n  lightslategray: [119,136,153],\n  lightslategrey: [119,136,153],\n  lightsteelblue: [176,196,222],\n  lightyellow:  [255,255,224],\n  lime: [0,255,0],\n  limegreen:  [50,205,50],\n  linen:  [250,240,230],\n  magenta:  [255,0,255],\n  maroon: [128,0,0],\n  mediumaquamarine: [102,205,170],\n  mediumblue: [0,0,205],\n  mediumorchid: [186,85,211],\n  mediumpurple: [147,112,219],\n  mediumseagreen: [60,179,113],\n  mediumslateblue:  [123,104,238],\n  mediumspringgreen:  [0,250,154],\n  mediumturquoise:  [72,209,204],\n  mediumvioletred:  [199,21,133],\n  midnightblue: [25,25,112],\n  mintcream:  [245,255,250],\n  mistyrose:  [255,228,225],\n  moccasin: [255,228,181],\n  navajowhite:  [255,222,173],\n  navy: [0,0,128],\n  oldlace:  [253,245,230],\n  olive:  [128,128,0],\n  olivedrab:  [107,142,35],\n  orange: [255,165,0],\n  orangered:  [255,69,0],\n  orchid: [218,112,214],\n  palegoldenrod:  [238,232,170],\n  palegreen:  [152,251,152],\n  paleturquoise:  [175,238,238],\n  palevioletred:  [219,112,147],\n  papayawhip: [255,239,213],\n  peachpuff:  [255,218,185],\n  peru: [205,133,63],\n  pink: [255,192,203],\n  plum: [221,160,221],\n  powderblue: [176,224,230],\n  purple: [128,0,128],\n  rebeccapurple: [102, 51, 153],\n  red:  [255,0,0],\n  rosybrown:  [188,143,143],\n  royalblue:  [65,105,225],\n  saddlebrown:  [139,69,19],\n  salmon: [250,128,114],\n  sandybrown: [244,164,96],\n  seagreen: [46,139,87],\n  seashell: [255,245,238],\n  sienna: [160,82,45],\n  silver: [192,192,192],\n  skyblue:  [135,206,235],\n  slateblue:  [106,90,205],\n  slategray:  [112,128,144],\n  slategrey:  [112,128,144],\n  snow: [255,250,250],\n  springgreen:  [0,255,127],\n  steelblue:  [70,130,180],\n  tan:  [210,180,140],\n  teal: [0,128,128],\n  thistle:  [216,191,216],\n  tomato: [255,99,71],\n  turquoise:  [64,224,208],\n  violet: [238,130,238],\n  wheat:  [245,222,179],\n  white:  [255,255,255],\n  whitesmoke: [245,245,245],\n  yellow: [255,255,0],\n  yellowgreen:  [154,205,50]\n};\n\nvar reverseKeywords = {};\nfor (var key in cssKeywords) {\n  reverseKeywords[JSON.stringify(cssKeywords[key])] = key;\n}\n\n\n//# sourceURL=webpack:////home/ec2-user/environment/dev-ops/projects/slatwall2/node_modules/chartjs-color/node_modules/color-convert/conversions.js?");

/***/ }),

/***/ "koRa":
/*!*************************************************************************************************!*\
  !*** /home/ec2-user/environment/dev-ops/projects/slatwall2/node_modules/chartjs-color/index.js ***!
  \*************************************************************************************************/
/*! no static exports found */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

eval("/* MIT license */\nvar convert = __webpack_require__(/*! color-convert */ \"7W/t\");\nvar string = __webpack_require__(/*! chartjs-color-string */ \"KCzu\");\n\nvar Color = function (obj) {\n\tif (obj instanceof Color) {\n\t\treturn obj;\n\t}\n\tif (!(this instanceof Color)) {\n\t\treturn new Color(obj);\n\t}\n\n\tthis.valid = false;\n\tthis.values = {\n\t\trgb: [0, 0, 0],\n\t\thsl: [0, 0, 0],\n\t\thsv: [0, 0, 0],\n\t\thwb: [0, 0, 0],\n\t\tcmyk: [0, 0, 0, 0],\n\t\talpha: 1\n\t};\n\n\t// parse Color() argument\n\tvar vals;\n\tif (typeof obj === 'string') {\n\t\tvals = string.getRgba(obj);\n\t\tif (vals) {\n\t\t\tthis.setValues('rgb', vals);\n\t\t} else if (vals = string.getHsla(obj)) {\n\t\t\tthis.setValues('hsl', vals);\n\t\t} else if (vals = string.getHwb(obj)) {\n\t\t\tthis.setValues('hwb', vals);\n\t\t}\n\t} else if (typeof obj === 'object') {\n\t\tvals = obj;\n\t\tif (vals.r !== undefined || vals.red !== undefined) {\n\t\t\tthis.setValues('rgb', vals);\n\t\t} else if (vals.l !== undefined || vals.lightness !== undefined) {\n\t\t\tthis.setValues('hsl', vals);\n\t\t} else if (vals.v !== undefined || vals.value !== undefined) {\n\t\t\tthis.setValues('hsv', vals);\n\t\t} else if (vals.w !== undefined || vals.whiteness !== undefined) {\n\t\t\tthis.setValues('hwb', vals);\n\t\t} else if (vals.c !== undefined || vals.cyan !== undefined) {\n\t\t\tthis.setValues('cmyk', vals);\n\t\t}\n\t}\n};\n\nColor.prototype = {\n\tisValid: function () {\n\t\treturn this.valid;\n\t},\n\trgb: function () {\n\t\treturn this.setSpace('rgb', arguments);\n\t},\n\thsl: function () {\n\t\treturn this.setSpace('hsl', arguments);\n\t},\n\thsv: function () {\n\t\treturn this.setSpace('hsv', arguments);\n\t},\n\thwb: function () {\n\t\treturn this.setSpace('hwb', arguments);\n\t},\n\tcmyk: function () {\n\t\treturn this.setSpace('cmyk', arguments);\n\t},\n\n\trgbArray: function () {\n\t\treturn this.values.rgb;\n\t},\n\thslArray: function () {\n\t\treturn this.values.hsl;\n\t},\n\thsvArray: function () {\n\t\treturn this.values.hsv;\n\t},\n\thwbArray: function () {\n\t\tvar values = this.values;\n\t\tif (values.alpha !== 1) {\n\t\t\treturn values.hwb.concat([values.alpha]);\n\t\t}\n\t\treturn values.hwb;\n\t},\n\tcmykArray: function () {\n\t\treturn this.values.cmyk;\n\t},\n\trgbaArray: function () {\n\t\tvar values = this.values;\n\t\treturn values.rgb.concat([values.alpha]);\n\t},\n\thslaArray: function () {\n\t\tvar values = this.values;\n\t\treturn values.hsl.concat([values.alpha]);\n\t},\n\talpha: function (val) {\n\t\tif (val === undefined) {\n\t\t\treturn this.values.alpha;\n\t\t}\n\t\tthis.setValues('alpha', val);\n\t\treturn this;\n\t},\n\n\tred: function (val) {\n\t\treturn this.setChannel('rgb', 0, val);\n\t},\n\tgreen: function (val) {\n\t\treturn this.setChannel('rgb', 1, val);\n\t},\n\tblue: function (val) {\n\t\treturn this.setChannel('rgb', 2, val);\n\t},\n\thue: function (val) {\n\t\tif (val) {\n\t\t\tval %= 360;\n\t\t\tval = val < 0 ? 360 + val : val;\n\t\t}\n\t\treturn this.setChannel('hsl', 0, val);\n\t},\n\tsaturation: function (val) {\n\t\treturn this.setChannel('hsl', 1, val);\n\t},\n\tlightness: function (val) {\n\t\treturn this.setChannel('hsl', 2, val);\n\t},\n\tsaturationv: function (val) {\n\t\treturn this.setChannel('hsv', 1, val);\n\t},\n\twhiteness: function (val) {\n\t\treturn this.setChannel('hwb', 1, val);\n\t},\n\tblackness: function (val) {\n\t\treturn this.setChannel('hwb', 2, val);\n\t},\n\tvalue: function (val) {\n\t\treturn this.setChannel('hsv', 2, val);\n\t},\n\tcyan: function (val) {\n\t\treturn this.setChannel('cmyk', 0, val);\n\t},\n\tmagenta: function (val) {\n\t\treturn this.setChannel('cmyk', 1, val);\n\t},\n\tyellow: function (val) {\n\t\treturn this.setChannel('cmyk', 2, val);\n\t},\n\tblack: function (val) {\n\t\treturn this.setChannel('cmyk', 3, val);\n\t},\n\n\thexString: function () {\n\t\treturn string.hexString(this.values.rgb);\n\t},\n\trgbString: function () {\n\t\treturn string.rgbString(this.values.rgb, this.values.alpha);\n\t},\n\trgbaString: function () {\n\t\treturn string.rgbaString(this.values.rgb, this.values.alpha);\n\t},\n\tpercentString: function () {\n\t\treturn string.percentString(this.values.rgb, this.values.alpha);\n\t},\n\thslString: function () {\n\t\treturn string.hslString(this.values.hsl, this.values.alpha);\n\t},\n\thslaString: function () {\n\t\treturn string.hslaString(this.values.hsl, this.values.alpha);\n\t},\n\thwbString: function () {\n\t\treturn string.hwbString(this.values.hwb, this.values.alpha);\n\t},\n\tkeyword: function () {\n\t\treturn string.keyword(this.values.rgb, this.values.alpha);\n\t},\n\n\trgbNumber: function () {\n\t\tvar rgb = this.values.rgb;\n\t\treturn (rgb[0] << 16) | (rgb[1] << 8) | rgb[2];\n\t},\n\n\tluminosity: function () {\n\t\t// http://www.w3.org/TR/WCAG20/#relativeluminancedef\n\t\tvar rgb = this.values.rgb;\n\t\tvar lum = [];\n\t\tfor (var i = 0; i < rgb.length; i++) {\n\t\t\tvar chan = rgb[i] / 255;\n\t\t\tlum[i] = (chan <= 0.03928) ? chan / 12.92 : Math.pow(((chan + 0.055) / 1.055), 2.4);\n\t\t}\n\t\treturn 0.2126 * lum[0] + 0.7152 * lum[1] + 0.0722 * lum[2];\n\t},\n\n\tcontrast: function (color2) {\n\t\t// http://www.w3.org/TR/WCAG20/#contrast-ratiodef\n\t\tvar lum1 = this.luminosity();\n\t\tvar lum2 = color2.luminosity();\n\t\tif (lum1 > lum2) {\n\t\t\treturn (lum1 + 0.05) / (lum2 + 0.05);\n\t\t}\n\t\treturn (lum2 + 0.05) / (lum1 + 0.05);\n\t},\n\n\tlevel: function (color2) {\n\t\tvar contrastRatio = this.contrast(color2);\n\t\tif (contrastRatio >= 7.1) {\n\t\t\treturn 'AAA';\n\t\t}\n\n\t\treturn (contrastRatio >= 4.5) ? 'AA' : '';\n\t},\n\n\tdark: function () {\n\t\t// YIQ equation from http://24ways.org/2010/calculating-color-contrast\n\t\tvar rgb = this.values.rgb;\n\t\tvar yiq = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;\n\t\treturn yiq < 128;\n\t},\n\n\tlight: function () {\n\t\treturn !this.dark();\n\t},\n\n\tnegate: function () {\n\t\tvar rgb = [];\n\t\tfor (var i = 0; i < 3; i++) {\n\t\t\trgb[i] = 255 - this.values.rgb[i];\n\t\t}\n\t\tthis.setValues('rgb', rgb);\n\t\treturn this;\n\t},\n\n\tlighten: function (ratio) {\n\t\tvar hsl = this.values.hsl;\n\t\thsl[2] += hsl[2] * ratio;\n\t\tthis.setValues('hsl', hsl);\n\t\treturn this;\n\t},\n\n\tdarken: function (ratio) {\n\t\tvar hsl = this.values.hsl;\n\t\thsl[2] -= hsl[2] * ratio;\n\t\tthis.setValues('hsl', hsl);\n\t\treturn this;\n\t},\n\n\tsaturate: function (ratio) {\n\t\tvar hsl = this.values.hsl;\n\t\thsl[1] += hsl[1] * ratio;\n\t\tthis.setValues('hsl', hsl);\n\t\treturn this;\n\t},\n\n\tdesaturate: function (ratio) {\n\t\tvar hsl = this.values.hsl;\n\t\thsl[1] -= hsl[1] * ratio;\n\t\tthis.setValues('hsl', hsl);\n\t\treturn this;\n\t},\n\n\twhiten: function (ratio) {\n\t\tvar hwb = this.values.hwb;\n\t\thwb[1] += hwb[1] * ratio;\n\t\tthis.setValues('hwb', hwb);\n\t\treturn this;\n\t},\n\n\tblacken: function (ratio) {\n\t\tvar hwb = this.values.hwb;\n\t\thwb[2] += hwb[2] * ratio;\n\t\tthis.setValues('hwb', hwb);\n\t\treturn this;\n\t},\n\n\tgreyscale: function () {\n\t\tvar rgb = this.values.rgb;\n\t\t// http://en.wikipedia.org/wiki/Grayscale#Converting_color_to_grayscale\n\t\tvar val = rgb[0] * 0.3 + rgb[1] * 0.59 + rgb[2] * 0.11;\n\t\tthis.setValues('rgb', [val, val, val]);\n\t\treturn this;\n\t},\n\n\tclearer: function (ratio) {\n\t\tvar alpha = this.values.alpha;\n\t\tthis.setValues('alpha', alpha - (alpha * ratio));\n\t\treturn this;\n\t},\n\n\topaquer: function (ratio) {\n\t\tvar alpha = this.values.alpha;\n\t\tthis.setValues('alpha', alpha + (alpha * ratio));\n\t\treturn this;\n\t},\n\n\trotate: function (degrees) {\n\t\tvar hsl = this.values.hsl;\n\t\tvar hue = (hsl[0] + degrees) % 360;\n\t\thsl[0] = hue < 0 ? 360 + hue : hue;\n\t\tthis.setValues('hsl', hsl);\n\t\treturn this;\n\t},\n\n\t/**\n\t * Ported from sass implementation in C\n\t * https://github.com/sass/libsass/blob/0e6b4a2850092356aa3ece07c6b249f0221caced/functions.cpp#L209\n\t */\n\tmix: function (mixinColor, weight) {\n\t\tvar color1 = this;\n\t\tvar color2 = mixinColor;\n\t\tvar p = weight === undefined ? 0.5 : weight;\n\n\t\tvar w = 2 * p - 1;\n\t\tvar a = color1.alpha() - color2.alpha();\n\n\t\tvar w1 = (((w * a === -1) ? w : (w + a) / (1 + w * a)) + 1) / 2.0;\n\t\tvar w2 = 1 - w1;\n\n\t\treturn this\n\t\t\t.rgb(\n\t\t\t\tw1 * color1.red() + w2 * color2.red(),\n\t\t\t\tw1 * color1.green() + w2 * color2.green(),\n\t\t\t\tw1 * color1.blue() + w2 * color2.blue()\n\t\t\t)\n\t\t\t.alpha(color1.alpha() * p + color2.alpha() * (1 - p));\n\t},\n\n\ttoJSON: function () {\n\t\treturn this.rgb();\n\t},\n\n\tclone: function () {\n\t\t// NOTE(SB): using node-clone creates a dependency to Buffer when using browserify,\n\t\t// making the final build way to big to embed in Chart.js. So let's do it manually,\n\t\t// assuming that values to clone are 1 dimension arrays containing only numbers,\n\t\t// except 'alpha' which is a number.\n\t\tvar result = new Color();\n\t\tvar source = this.values;\n\t\tvar target = result.values;\n\t\tvar value, type;\n\n\t\tfor (var prop in source) {\n\t\t\tif (source.hasOwnProperty(prop)) {\n\t\t\t\tvalue = source[prop];\n\t\t\t\ttype = ({}).toString.call(value);\n\t\t\t\tif (type === '[object Array]') {\n\t\t\t\t\ttarget[prop] = value.slice(0);\n\t\t\t\t} else if (type === '[object Number]') {\n\t\t\t\t\ttarget[prop] = value;\n\t\t\t\t} else {\n\t\t\t\t\tconsole.error('unexpected color value:', value);\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\n\t\treturn result;\n\t}\n};\n\nColor.prototype.spaces = {\n\trgb: ['red', 'green', 'blue'],\n\thsl: ['hue', 'saturation', 'lightness'],\n\thsv: ['hue', 'saturation', 'value'],\n\thwb: ['hue', 'whiteness', 'blackness'],\n\tcmyk: ['cyan', 'magenta', 'yellow', 'black']\n};\n\nColor.prototype.maxes = {\n\trgb: [255, 255, 255],\n\thsl: [360, 100, 100],\n\thsv: [360, 100, 100],\n\thwb: [360, 100, 100],\n\tcmyk: [100, 100, 100, 100]\n};\n\nColor.prototype.getValues = function (space) {\n\tvar values = this.values;\n\tvar vals = {};\n\n\tfor (var i = 0; i < space.length; i++) {\n\t\tvals[space.charAt(i)] = values[space][i];\n\t}\n\n\tif (values.alpha !== 1) {\n\t\tvals.a = values.alpha;\n\t}\n\n\t// {r: 255, g: 255, b: 255, a: 0.4}\n\treturn vals;\n};\n\nColor.prototype.setValues = function (space, vals) {\n\tvar values = this.values;\n\tvar spaces = this.spaces;\n\tvar maxes = this.maxes;\n\tvar alpha = 1;\n\tvar i;\n\n\tthis.valid = true;\n\n\tif (space === 'alpha') {\n\t\talpha = vals;\n\t} else if (vals.length) {\n\t\t// [10, 10, 10]\n\t\tvalues[space] = vals.slice(0, space.length);\n\t\talpha = vals[space.length];\n\t} else if (vals[space.charAt(0)] !== undefined) {\n\t\t// {r: 10, g: 10, b: 10}\n\t\tfor (i = 0; i < space.length; i++) {\n\t\t\tvalues[space][i] = vals[space.charAt(i)];\n\t\t}\n\n\t\talpha = vals.a;\n\t} else if (vals[spaces[space][0]] !== undefined) {\n\t\t// {red: 10, green: 10, blue: 10}\n\t\tvar chans = spaces[space];\n\n\t\tfor (i = 0; i < space.length; i++) {\n\t\t\tvalues[space][i] = vals[chans[i]];\n\t\t}\n\n\t\talpha = vals.alpha;\n\t}\n\n\tvalues.alpha = Math.max(0, Math.min(1, (alpha === undefined ? values.alpha : alpha)));\n\n\tif (space === 'alpha') {\n\t\treturn false;\n\t}\n\n\tvar capped;\n\n\t// cap values of the space prior converting all values\n\tfor (i = 0; i < space.length; i++) {\n\t\tcapped = Math.max(0, Math.min(maxes[space][i], values[space][i]));\n\t\tvalues[space][i] = Math.round(capped);\n\t}\n\n\t// convert to all the other color spaces\n\tfor (var sname in spaces) {\n\t\tif (sname !== space) {\n\t\t\tvalues[sname] = convert[space][sname](values[space]);\n\t\t}\n\t}\n\n\treturn true;\n};\n\nColor.prototype.setSpace = function (space, args) {\n\tvar vals = args[0];\n\n\tif (vals === undefined) {\n\t\t// color.rgb()\n\t\treturn this.getValues(space);\n\t}\n\n\t// color.rgb(10, 10, 10)\n\tif (typeof vals === 'number') {\n\t\tvals = Array.prototype.slice.call(args);\n\t}\n\n\tthis.setValues(space, vals);\n\treturn this;\n};\n\nColor.prototype.setChannel = function (space, index, val) {\n\tvar svalues = this.values[space];\n\tif (val === undefined) {\n\t\t// color.red()\n\t\treturn svalues[index];\n\t} else if (val === svalues[index]) {\n\t\t// color.red(color.red())\n\t\treturn this;\n\t}\n\n\t// color.red(100)\n\tsvalues[index] = val;\n\tthis.setValues(space, svalues);\n\n\treturn this;\n};\n\nif (typeof window !== 'undefined') {\n\twindow.Color = Color;\n}\n\nmodule.exports = Color;\n\n\n//# sourceURL=webpack:////home/ec2-user/environment/dev-ops/projects/slatwall2/node_modules/chartjs-color/index.js?");

/***/ })

}]);