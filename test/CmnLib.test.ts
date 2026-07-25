/* ***** BEGIN LICENSE BLOCK *****
Copyright (c) 2018-2026 Famibee (famibee.blog38.fc2.com)

This software is released under the MIT License.
http://opensource.org/licenses/mit-license.php
** ***** END LICENSE BLOCK ***** */

import {CmnLib, argChk_Boolean, argChk_Num} from '../src/sn/CmnLib';

import {expect, it} from 'bun:test';


it('argChk_Num0', ()=> {
	expect(argChk_Num(
		{あ:2, い:3.5, う:'0x15', え:'も', ':タグ名':'ぺきゅ'},
		'あ', 13)).toBe(2);
});
it('argChk_Num1', ()=> {
	expect(argChk_Num(
		{あ:2, い:3.5, う:'0x15', え:'も', ':タグ名':'ぺきゅ'},
		'い', 13)).toBe(3.5);
});
it('argChk_Num2', ()=> {
	expect(argChk_Num(
		{あ:2, い:3.5, う:'0x15', え:'も', ':タグ名':'ぺきゅ'},
		'う', 13)).toBe(21);
});
it('argChk_Num5', ()=> {
	expect(argChk_Num(
		{あ:2, い:3.5, う:'0x15', え:'も', ':タグ名':'ぺきゅ'},
		'ぷ', 13)).toBe(13);
});
it('argChk_Num10_err', ()=> {
	expect(()=> argChk_Num(
		{あ:2, い:3.5, う:'0x15', え:'も', ':タグ名':'ぺきゅ'},
		'ぷ', NaN))
	.toThrow('[ぺきゅ]属性 ぷ は必須です');
});
it('argChk_Num11_err', ()=> {
	expect(()=> argChk_Num(
		{あ:2, い:3.5, う:'0x15', え:'も', ':タグ名':'ぺきゅ'},
		'え', 13))
	.toThrow('[ぺきゅ]属性 え の値【も】が数値ではありません');
});


it('argChk_Boolean0', ()=> {
	expect(argChk_Boolean(
		{あ:true, い:false}, 'あ', false)).toBe(true);
});
	it('argChk_Boolean1', ()=> {
		expect(argChk_Boolean(
			{あ:true, い:false}, 'い', true)).toBe(false);
	});
	it('argChk_Boolean2', ()=> {
		expect(argChk_Boolean(
			{あ:false, い:false}, 'う', true)).toBe(true);
	});
it('argChk_Boolean10', ()=> {
	expect(argChk_Boolean(	// x多分defになる
		{あ:null, い:true}, 'あ', true)).toBe(false);
});
	it('argChk_Boolean11', ()=> {
		expect(argChk_Boolean(
			{あ:'null', い:true}, 'あ', true)).toBe(true);	// 空文字じゃないので
	});
it('argChk_Boolean20', ()=> {
	expect(argChk_Boolean(
		{あ:500, い:false}, 'あ', false)).toBe(true);
});
	it('argChk_Boolean21', ()=> {
		expect(argChk_Boolean(
			{あ:0, い:false}, 'あ', false)).toBe(true);	// 空文字じゃないので
	});
	it('argChk_Boolean22', ()=> {
		expect(argChk_Boolean(
			{あ:NaN, い:false}, 'あ', false)).toBe(true);	// 空文字じゃないので
	});
it('argChk_Boolean30', ()=> {
	expect(argChk_Boolean(
		{あ:'true', い:false}, 'あ', false)).toBe(true);
});
	it('argChk_Boolean31', ()=> {
		expect(argChk_Boolean(
			{あ:'false', い:true}, 'あ', true)).toBe(false);
	});

// ===== 実行環境の判別（本家はplatform.js。bluesnovelはUA文字列から出す） =====
//	欲しいのはisSafari/isFirefox/isMac/isMobileの4つだけなので、依存を増やさずUAで判別する。
//	（bestiejs/platform.js は Public archive ＝更新が止まっている）

const UA = {
	mac_chrome	: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
	mac_safari	: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.6 Safari/605.1.15',
	win_firefox	: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:133.0) Gecko/20100101 Firefox/133.0',
	iphone		: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.6 Mobile/15E148 Safari/604.1',
	android		: 'Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36',
};
// navigator.userAgentを差し替えてCmnLib.init()を走らせる
function platOf(ua: string) {
	const org = globalThis.navigator;
	Object.defineProperty(globalThis, 'navigator', {value: {userAgent: ua}, configurable: true});
	CmnLib.init();
	Object.defineProperty(globalThis, 'navigator', {value: org, configurable: true});
	return {
		isSafari: CmnLib.isSafari, isFirefox: CmnLib.isFirefox,
		isMac: CmnLib.isMac, isMobile: CmnLib.isMobile, platform: CmnLib.platform,
	};
}

it('CmnLib_init_macChrome', ()=> {
	// Chrome系もUAに"Safari"を含むので、そこだけでSafari判定してはいけない
	expect(platOf(UA.mac_chrome)).toMatchObject({isSafari: false, isFirefox: false, isMac: true, isMobile: false});
});

it('CmnLib_init_macSafari', ()=> {
	expect(platOf(UA.mac_safari)).toMatchObject({isSafari: true, isFirefox: false, isMac: true, isMobile: false});
});

it('CmnLib_init_winFirefox', ()=> {
	expect(platOf(UA.win_firefox)).toMatchObject({isSafari: false, isFirefox: true, isMac: false, isMobile: false});
});

it('CmnLib_init_iPhone', ()=> {
	// iOSのUAは"like Mac OS X"を含むが、本家（os.family='iOS'）と同じくMac扱いにしない
	expect(platOf(UA.iphone)).toMatchObject({isSafari: true, isMac: false, isMobile: true});
});

it('CmnLib_init_android', ()=> {
	expect(platOf(UA.android)).toMatchObject({isSafari: false, isMac: false, isMobile: true});
});

it('CmnLib_init_platformIsUA', ()=> {
	// 組み込み変数 const.sn.platform はUA文字列そのもの（本家はplatform.jsのJSON）
	expect(platOf(UA.mac_chrome).platform).toBe(UA.mac_chrome);
});
