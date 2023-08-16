import { createGlobalStyle } from 'styled-components';

const isWindows = window.navigator.platform.includes('Win');

// 맥과 윈도우에 따라 다른 폰트 경로 설정
const fontPath = isWindows
	? '/assets/fonts/RixYeoljeongdo_Regular_Windows.woff' // 윈도우 폰트 경로
	: '/assets/fonts/RixYeoljeongdo_Regular_Mac.woff'; // 맥 폰트 경로

// 외부에서 import 할거니까 모듈 내보내자~!
export default createGlobalStyle`
@font-face {
    font-family: 'RixYeoljeongdo_Regular';
    src: url('${fontPath}') format('woff');
    font-weight: normal;
    font-style: normal;
}

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video, input, textarea, button {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	font-family: 'Noto Sans KR', sans-serif;
	vertical-align: baseline;
	box-sizing: border-box;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
img {
	-webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -o-user-select: none;
  user-select: none;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
	user-select: none;
}

/* 바텀시트 css */
.comment-bottom-sheet > div {
	z-index: 100;
}

/* 멘션 css */
[data-rsbs-footer] {
  overflow: visible;
}
`;
