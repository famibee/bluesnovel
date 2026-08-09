/* このファイルは test/e2e/app/mkPrjCrypto.ts が生成する。直接編集しない */
// 複号は本家に無くsnsys_preプラグインが供給する（SysBase.loadedのsetDec/setDecAB/setEnc/getHash）。
//	これはその最小実装で、鍵は**E2E専用の使い捨て**。実プロジェクトの鍵ではない
import type {T_PluginInitArg} from '../../../src/web';

const hPass = {
	"pass": "00000000-0000-4000-8000-000000000000",
	"salt": "a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1",
	"iv": "b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2b2",
	"ite": 100
};

const hex2ab = (h: string)=> new Uint8Array((h.match(/../g) ?? []).map(x=> parseInt(x, 16))).buffer;
const b642ab = (s: string)=> Uint8Array.from(atob(s), c=> c.charCodeAt(0)).buffer;

export async function init(arg: T_PluginInitArg) {
	const {subtle} = crypto;
	const base = await subtle.importKey('raw',
		await subtle.digest('SHA-512', new TextEncoder().encode(hPass.pass)),
		'PBKDF2', false, ['deriveKey']);
	const key = await subtle.deriveKey(
		{name: 'PBKDF2', hash: 'SHA-512', iterations: hPass.ite, salt: hex2ab(hPass.salt)},
		base, {name: 'AES-GCM', length: 256}, false, ['encrypt', 'decrypt']);
	const alg = {name: 'AES-GCM', iv: hex2ab(hPass.iv)};

	// .sn/.json/.htmlは本文まるごと（Base64）。復号できなければ（＝crypto対象外の平文が
	//	来た場合）そのまま返して起動を妨げない
	const REG = /(^|\.)(ss?n|json|html?)$/;
	arg.setDec(async (ext: string, tx: string)=> {
		if (! REG.test(ext)) return tx;
		try {return new TextDecoder().decode(await subtle.decrypt(alg, key, b642ab(tx)))}
		catch {return tx}
	});

	// 画像・動画・音声は素のArrayBufferを暗号化しただけなので、復号してそのまま返す
	//	（本家のような{ext_num, ab}への分離は無い。ts/Crypto.ts参照）
	arg.setDecAB(async (ab: ArrayBuffer)=> subtle.decrypt(alg, key, ab));

	// このフィクスチャではセーブデータ暗号化・改竄検査は対象外（別途ユニットテストで検証済み）
	arg.setEnc(async (tx: string)=> tx);
	arg.getHash((s: string)=> s);
}
