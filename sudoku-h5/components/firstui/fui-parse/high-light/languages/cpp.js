// 本文件由FirstUI授权予广州嗨小克智能科技有限公司（会员ID：  181 8，营业执照号：9 1 4  4  0 10 6M  A C  0H T 7N 3 F）专用，请尊重知识产权，勿私下传播，违者追究法律责任。
/*
Language: C++
Category: common, system
Website: https://isocpp.org

Modified by: firstui
organization: FirstUI(https://www.firstui.cn/)
*/

import cLike from './c-like.js';

/** @type LanguageFn */
export default function(hljs) {
  const lang = cLike(hljs);
  // return auto-detection back on
  lang.disableAutodetect = false;
  lang.name = 'C++';
  lang.aliases = ['cc', 'c++', 'h++', 'hpp', 'hh', 'hxx', 'cxx'];
  return lang;
}