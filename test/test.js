const fs = require( 'fs' );
const path = require( 'path' );
const assert = require( 'assert' );
const { rollup } = require( 'rollup' );
const legacy = require( '..' );

describe( 'rollup-plugin-legacy', () => {
	fs.readdirSync( 'test/samples' ).forEach( dir => {
		if ( dir[0] === '.' ) return;

		const resolved = path.resolve( 'test/samples', dir );
		const config = require( path.resolve( resolved, '_config.js' ) );

		( config.solo ? it.only : it )( dir, () => {
			process.chdir( resolved );

			return rollup({
				entry: 'main.js',
				plugins: [
					legacy( config.options )
				]
			}).then( bundle => {
				const { code } = bundle.generate({ format: 'cjs' });
				const fn = new Function( 'assert', code );

				try {
					fn( assert );
				} catch ( err ) {
					console.error( code );
					throw err;
				}
			});
		});
	});
});
