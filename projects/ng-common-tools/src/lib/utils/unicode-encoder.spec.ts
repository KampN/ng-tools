import {UnicodeEncoder} from './unicode-encoder';

describe('Utils : UnicodeEncoder', () => {

	describe('toBase64()', () => {
		it('should encode an unicode string', () => {
			expect(UnicodeEncoder.toBase64('sâlût lé amï$'))
				.toEqual('c8OibMO7dCBsw6kgYW3DryQ=');
		});

		it('should encode a large string', () => {
			expect(UnicodeEncoder.toBase64('une_colonne_super_longue_parce_que_j_aime_bien_etre_specifique_dans_mes_annonces'))
				.toEqual('dW5lX2NvbG9ubmVfc3VwZXJfbG9uZ3VlX3BhcmNlX3F1ZV9qX2FpbWVfYmllbl9ldHJlX3NwZWNpZmlxdWVfZGFuc19tZXNfYW5ub25jZXM=');
		});
	});

	describe('fromBase64()', () => {
		it('should decode an unicode string', () => {
			expect(UnicodeEncoder.fromBase64('c8OibMO7dCBsw6kgYW3DryQ='))
				.toEqual('sâlût lé amï$');
		});
		it('should decode a large string', () => {
			expect(UnicodeEncoder.fromBase64('dW5lX2NvbG9ubmVfc3VwZXJfbG9uZ3VlX3BhcmNlX3F1ZV9qX2FpbWVfYmllbl9ldHJlX3NwZWNpZmlxdWVfZGFuc19tZXNfYW5ub25jZXM='))
				.toEqual('une_colonne_super_longue_parce_que_j_aime_bien_etre_specifique_dans_mes_annonces');
		});
	});

});
