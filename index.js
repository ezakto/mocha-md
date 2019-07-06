const marked = require('marked');
const prettier = require('prettier');

function getFlags(text) {
	const match = text.trim().match(/^(?:\([a-zE]+\)\s*)+/);
	return match ? match[0] : '';
}

function splitFlags(flags) {
	return flags.trim().slice(1, -1).split(/\)\s*\(/);
}

module.exports = function transpile(text) {
	const tokens = marked.lexer(text);
	let currentDepth = 0;
	let level = 0;
	let open = false;
	let buff = '';

	function buffer(str) {
		buff += `${str}`;
	}

	tokens.forEach(token => {
		switch (token.type) {
			case 'heading': {
				let text = token.text.trim();
				let type = 'describe';
				const flagString = getFlags(text);
				const flags = splitFlags(flagString);
				text = text.replace(flagString, '');

				if (flags.includes('only')) type = `${type}.only`;
				if (flags.includes('skip')) type = `${type}.skip`;
				if (currentDepth >= token.depth) {
					level--;
					buffer('});');
				}

				currentDepth = token.depth;
				buffer(`${type}('${text}', function(){`);
				level++;
				break;
			}

			case 'paragraph': {
				let text = token.text.trim();
				let type = 'it';
				const flagString = getFlags(text);
				const flags = splitFlags(flagString);
				const isAsync = flags.includes('async');
				text = text.replace(flagString, '');

				if (flags.includes('before')) type = `before`;
				if (flags.includes('after')) type = `after`;
				if (flags.includes('beforeEach')) type = `beforeEach`;
				if (flags.includes('afterEach')) type = `afterEach`;
				if (flags.includes('only')) type = `${type}.only`;
				if (flags.includes('skip')) type = `${type}.skip`;

				buffer(`${type}(${text ? `'${text}',` : ''}function(${isAsync ? 'done' : ''}){`);
				level++;
				open = true;
				break;
			}

			case 'code':
				buffer(token.text);

				if (open) {
					level--;
					buffer('});\n\n');
					open = false;
				} else {
					buffer('');
				}

				break;
		}
	});

	while (level--) {
		buffer('});');
	}

	buff = buff.replace(/,?function\(\)\{\}/g, '');

	return prettier.format(buff, { parser: 'babel' });
}
