import React, { useEffect, useState } from "react";
import { render } from "react-dom";
import AceEditor from "react-ace";
/*eslint-disable no-alert, no-console */
import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/mode-jsx";

const languages = [
  "javascript",
  "java",
  "python",
  "xml",
  "ruby",
  "sass",
  "markdown",
  "mysql",
  "json",
  "html",
  "handlebars",
  "golang",
  "csharp",
  "elixir",
  "typescript",
  "css"
];

const themes = [
  "monokai",
  "github",
  "tomorrow",
  "kuroir",
  "twilight",
  "xcode",
  "textmate",
  "solarized_dark",
  "solarized_light",
  "terminal"
];

languages.forEach(lang => {
  require(`ace-builds/src-noconflict/mode-${lang}`);
  require(`ace-builds/src-noconflict/snippets/${lang}`);
});

themes.forEach(theme => require(`ace-builds/src-noconflict/theme-${theme}`));

const defaultValue = 'code`function $a($$ props $$) { $$$ }`';

const editorProps = {
  placeholder: "Placeholder Text",
  textArea: "Hello world",
  theme: "monokai",
  mode: "javascript",
  enableBasicAutocompletion: false,
  enableLiveAutocompletion: false,
  fontSize: 14,
  showGutter: true,
  showPrintMargin: true,
  highlightActiveLine: true,
  enableSnippets: false,
  showLineNumbers: true
};

function App() {
  const [state, setState] = useState({
	value: defaultValue,
	textArea: "Example non-matching line\n\nfunction foobar(x, props, y)\n{\n\talert('hello world');\n}",
  });

  const onChange = (newValue) => {
	setState({
	  ...state,
	  value: newValue
	});
  }

  const onTextAreaChange = (event) => {
	setState({
	  ...state,
	  textArea: event.target.value,
	});
  }

  useEffect(() => {
	const codeInput = /code`([\s\S]*)`/g.exec(state.value)?.[1];
	let codeRegex = "";
	if (codeInput) {
		try {
			codeRegex = code`${codeInput}`;
		} catch {
			// Do nothing, invalid regex.
		}
	}
	
	if (codeRegex) {
	  const text = document.getElementById("textAreaRegex").value;
	  const replaced = text.replace(codeRegex, (match) => `<mark>${match}</mark>`);
	  document.getElementsByClassName("highlights")[0].innerHTML = replaced;
	}
  });

  const codeInput = /code`([\s\S]*)`/g.exec(state.value)?.[1];
	let codeRegex = "";
	if (codeInput) {
		try {
			codeRegex = code`${codeInput}`;
		} catch {
			// Do nothing, invalid regex.
		}
	}
  let text = state.textArea;
  
  if (codeRegex) {
	text = text.replace(codeRegex, (match) => `<mark>${match}</mark>`);
  }

  return (
	<div className="columns">
	  <div className="examples column">
		<h2 style={{color: "white"}}>checkr `code` syntax</h2>
		<AceEditor
		  name="blah2"
		  onChange={onChange}
		  value={state.value}
		  {...editorProps}
		/>
		<table className="tg" style={{color: "white", backgroundColor: "rgb(39, 40, 34)"}}>
		<thead>
		<tr style={{color: "white", backgroundColor: "rgb(39, 40, 34)"}}>
			<th className="tg-0pky" style={{color: "white", backgroundColor: "rgb(39, 40, 34)"}}>{'Token'}</th>
			<th className="tg-0pky" style={{color: "white", backgroundColor: "rgb(39, 40, 34)"}}>{'Matches'}</th>
			<th className="tg-0pky" style={{color: "white", backgroundColor: "rgb(39, 40, 34)"}}>{'Query'}</th>
			<th className="tg-0pky" style={{color: "white", backgroundColor: "rgb(39, 40, 34)"}}>{'Example Match'}</th>
		</tr>
		</thead>
		<tbody>
		<tr>
			<td className="tg-0pky">{'$a'}</td>
			<td className="tg-0pky">{'variable'}</td>
			<td className="tg-0pky"><span style={{color: "white", backgroundColor: "rgb(39, 40, 34)"}}>{`if ($a == $b) return { $a; }`}</span></td>
			<td className="tg-0pky"><span style={{color: "white", backgroundColor: "rgb(39, 40, 34)"}}>{`if (foo == bar) { return foo; }`}</span></td>
		</tr>
		<tr>
			<td className="tg-0pky">{'$1'}</td>
			<td className="tg-0pky">{'literal'}</td>
			<td className="tg-0pky"><span style={{color: "white", backgroundColor: "rgb(39, 40, 34)"}}>{`$1 + $2 + $1 + $2`}</span></td>
			<td className="tg-0pky"><span style={{color: "white", backgroundColor: "rgb(39, 40, 34)"}}>{`5 + "four" + 5 + "four"`}</span></td>
		</tr>
		<tr>
			<td className="tg-0pky">{'$@op'}</td>
			<td className="tg-0pky">{'operator'}</td>
			<td className="tg-0pky"><span style={{color: "white", backgroundColor: "rgb(39, 40, 34)"}}>{`5 $@ops1 10 $@ 15 $@ops1 33`}</span></td>
			<td className="tg-0pky"><span style={{color: "white", backgroundColor: "rgb(39, 40, 34)"}}>{`5 * 10 + 15 * 33`}</span></td>
		</tr>
		<tr>
			<td className="tg-0pky">{'$#key'}</td>
			<td className="tg-0pky">{'keyword'}</td>
			<td className="tg-0pky"><span style={{color: "white", backgroundColor: "rgb(39, 40, 34)"}}>{`$# ($a == true)`}</span></td>
			<td className="tg-0pky"><span style={{color: "white", backgroundColor: "rgb(39, 40, 34)"}}>{`do (baz == true)`}</span></td>
		</tr>
		<tr>
			<td className="tg-0pky">{'$$'}</td>
			<td className="tg-0pky">{'non-greedy any'}</td>
			<td className="tg-0pky"><span style={{color: "white", backgroundColor: "rgb(39, 40, 34)"}}>{`if ($a $$ $a) { $$ return 3; }`}</span></td>
			<td className="tg-0pky"><span style={{color: "white", backgroundColor: "rgb(39, 40, 34)"}}>{`if (foo, bar, foo) { gt(); return 3; }`}</span></td>
		</tr>
		<tr>
			<td className="tg-0pky">{'$$$'}</td>
			<td className="tg-0pky">{'greedy any'}</td>
			<td className="tg-0pky"><span style={{color: "white", backgroundColor: "rgb(39, 40, 34)"}}>{`case $1: $$$ case $2: throw;`}</span></td>
			<td className="tg-0pky"><span style={{color: "white", backgroundColor: "rgb(39, 40, 34)"}}>{`case "Apples": return 1; case "Bananas": throw; case "Mangos": throw;`}</span></td>
		</tr>
		<tr>
			<td className="tg-0pky">{'REGEX(...)'}</td>
			<td className="tg-0pky">{'regex escape hatch'}</td>
			<td className="tg-0pky"><span style={{color: "white", backgroundColor: "rgb(39, 40, 34)"}}>{`REGEX(3+9+2*) 5 + 5`}</span></td>
			<td className="tg-0pky"><span style={{color: "white", backgroundColor: "rgb(39, 40, 34)"}}>{`33922225+5`}</span></td>
		</tr>
		</tbody>
		</table>
	  </div>
	  <div className="column">
		<h2 style={{color: "white"}}>Compiled Regex</h2>
		<AceEditor
		  mode="jsx"
		  theme="monokai"
		  readOnly={true}
		  value={codeRegex.toString()}
		/>
		<div
		  className="container"
		  style={{ marginTop: "26px" }}
		>
		  <div className="backdrop">
			<div className="highlights"></div>
		  </div>
		  <textarea
			id="textAreaRegex"
			spellCheck={false}
			value={state.textArea}
			onChange={onTextAreaChange}>
		  </textarea>
		</div>
	  </div>
	</div>
  );
}

/********* `code` support *********/
/** Copied from the typescript output folder. */

String.prototype.replaceAll = function (stringOrRegex, replacement) {
	return stringOrRegex instanceof RegExp ?
		this.replace(new RegExp(stringOrRegex, stringOrRegex.flags.includes("g") ?
			stringOrRegex.flags :
			stringOrRegex.flags + "g"), // Warning: typical `replaceAll` throws in this scenario.
		replacement) :
		this.replace(new RegExp(escapeRegExp(stringOrRegex), 'g'), replacement);
};
// NOTE: 2 + 2 is still a literal. Base literals refers to unchained literals.
const baseLiterals = [
	`"[\\s\\S]*?"`,
	"'[\\s\\S]*?'",
	'`[\\s\\S]*?`',
	'-?\\d+([\\w\\.]*\\d*)*',
	`\/[\\s\\S]*?\/`,
	'true',
	'false',
	'NaN',
	'undefined',
	'null'
];
const baseLiteralRegex = `(${baseLiterals.join("|")})`;
const unitaryOperators = ['++', '--', '~'];
const binaryOperators = [
	`+`,
	'-',
	`*`,
	`**`,
	`/`,
	'%',
	'=',
	'==',
	'===',
	'!=',
	'!==',
	'>',
	'<',
	'>=',
	'<=',
	'&',
	`|`,
	'^',
	'<<',
	'>>',
	'>>>'
];
// Excludes ternaries.
const operatorRegex = `(${unitaryOperators.map(escapeRegExp).concat(binaryOperators.map(escapeRegExp)).join("|")})`;
// Includes "future" reserved keywords.
const keywords = [
	'break',
	'case',
	'catch',
	'class',
	'const',
	'continue',
	'debugger',
	'default',
	'delete',
	'do',
	'else',
	'export',
	'extends',
	'finally',
	'for',
	'function',
	'if',
	'import',
	'in',
	'instanceof',
	'new',
	'return',
	'super',
	'switch',
	'this',
	'throw',
	'try',
	'typeof',
	'var',
	'void',
	'while',
	'with',
	'yield',
	'enum',
	'implements',
	'interface',
	'let',
	'package',
	'private',
	'protected',
	'public',
	'static',
	'yield',
	'await'
];
const keywordRegex = `(${keywords.join('|')})`;
const capturedVariableRegex = `(?!(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|NaN|undefined|instanceof)$)([$A-Z_a-z]+[$A-Z_a-z0-9]*)`;
const variablePrefix = "_";
const literalPrefix = "__";
const operatorPrefix = "___";
const keywordPrefix = "____";
const blockPrefix = "_____";
function createNamedVariableRegex(name) {
	// Greatly trimmed down and slightly modified from https://stackoverflow.com/questions/1661197/what-characters-are-valid-for-javascript-variable-names
	return `(?!(?:do|if|in|for|let|new|try|var|case|else|enum|eval|false|null|this|true|void|with|break|catch|class|const|super|throw|while|yield|delete|export|import|public|return|static|switch|typeof|default|extends|finally|package|private|continue|debugger|function|arguments|interface|protected|implements|NaN|undefined|instanceof)$)(?<${name}>[$A-Z_a-z]+[$A-Z_a-z0-9]*)`;
}
function createNamedLiteralRegex(name) {
	return `(?<${name}>${baseLiteralRegex})`;
}
function createNamedOperatorRegex(name) {
	return `(?<${name}>${operatorRegex})`;
}
function createNamedKeywordRegex(name) {
	return `(?<${name}>${keywordRegex})`;
}
// Copied from MDN docs.
function escapeRegExp(theString) {
	return theString.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
function uniqueCaptureGroupName() {
	// https://stackoverflow.com/a/57593036/16617265
	return (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2);
}
// Example usages:
//	code`if ($a == $b) { return $a; }`;
//	code`$#operator($1);`;
function code(strings, ...expressions) {
	let regexTranslation = strings[0];
	for (let i = 0; i < expressions.length; i++)
		regexTranslation += expressions[i] + strings[i + 1];
	// Tokenize special syntax before whitespace is inserted.
	regexTranslation = regexTranslation.replaceAll("$$$", ":????:");
	regexTranslation = regexTranslation.replaceAll("$$", ":????:");
	const variableTokens = [];
	const literalTokens = [];
	const operatorTokens = [];
	const keywordTokens = [];
	const regexTokens = [];
	let match;
	while ((match = regexTranslation.match(/\$[a-zA-Z]+[0-9_]*/))) {
		variableTokens.push(match);
		regexTranslation = regexTranslation.replace(match, " :????: ");
	}
	while ((match = regexTranslation.match(/\$[0-9]+/))) {
		literalTokens.push(match);
		regexTranslation = regexTranslation.replace(match, " :????: ");
	}
	while ((match = regexTranslation.match(/\$@([a-zA-Z]+[0-9_]*)?/))) {
		operatorTokens.push(match[0]);
		regexTranslation = regexTranslation.replace(match[0], " :????: ");
	}
	while ((match = regexTranslation.match(/\$#([a-zA-Z]+[0-9_]*)?/))) {
		keywordTokens.push(match[0]);
		regexTranslation = regexTranslation.replace(match[0], " :????: ");
	}
	while ((match = regexTranslation.match(/REGEX\(([\s\S]*?)\)/))) {
		regexTokens.push(match[1]);
		regexTranslation = regexTranslation.replace(match[0], " :????: ");
	}
	// Insert whitespace between literals, variables, and keywords.
	// Makes it easier to deal with scenarios such as `a+10` or `++a`.
	regexTranslation = regexTranslation.replaceAll(new RegExp(capturedVariableRegex, "g"), " $1 ");
	regexTranslation = regexTranslation.replaceAll(new RegExp(`(${baseLiteralRegex})`, "g"), " $1 ");
	regexTranslation = regexTranslation.replaceAll(new RegExp(`(${keywordRegex})`, "g"), " $1 ");
	// Insert whitespace between `{}`, `()`, and `[]`.
	// Makes it easier to deal with scenarios such as `if()` vs `if ()`.
	regexTranslation = regexTranslation.replaceAll('(', ' ( ');
	regexTranslation = regexTranslation.replaceAll(')', ' ) ');
	regexTranslation = regexTranslation.replaceAll('{', ' { ');
	regexTranslation = regexTranslation.replaceAll('}', ' } ');
	regexTranslation = regexTranslation.replaceAll('[', ' [ ');
	regexTranslation = regexTranslation.replaceAll(']', ' ] ');
	// Insert whitespace between `;`
	regexTranslation = regexTranslation.replaceAll(";", " ; ");
	// Handles overlap between JavaScript and RegExp. For example, `+` needs to be escaped because it has a different meaning in RegExp.
	regexTranslation = escapeRegExp(regexTranslation);
	// Re-add tokens
	let vi = 0;
	while (regexTranslation.includes(":????:"))
		regexTranslation = regexTranslation.replace(":????:", variableTokens[vi++]);
	let li = 0;
	while (regexTranslation.includes(":????:"))
		regexTranslation = regexTranslation.replace(":????:", literalTokens[li++]);
	let oi = 0;
	while (regexTranslation.includes(":????:"))
		regexTranslation = regexTranslation.replace(":????:", operatorTokens[oi++]);
	let ki = 0;
	while (regexTranslation.includes(":????:"))
		regexTranslation = regexTranslation.replace(":????:", keywordTokens[ki++]);
	// Replace special characters, eg `$a`, `$1`, `$#a`, `$@a` etc.
	regexTranslation = replaceVariablesWithRegex(regexTranslation);
	regexTranslation = replaceLiteralsWithRegex(regexTranslation);
	regexTranslation = replaceOperatorsWithRegex(regexTranslation);
	regexTranslation = replaceKeywordsWithRegex(regexTranslation);
	while (regexTranslation.includes(":????:"))
		regexTranslation = regexTranslation.replace(":????:", `(?<${blockPrefix}${uniqueCaptureGroupName()}>[\\s\\S]*)`);
	while (regexTranslation.includes(":????:"))
		regexTranslation = regexTranslation.replace(":????:", `(?<${blockPrefix}${uniqueCaptureGroupName()}>[\\s\\S]*?)`);
	// Replace whitespace with lenient whitespace skips.
	const lenientSkip = '[\\s]*';
	regexTranslation = regexTranslation.replace(new RegExp('[\\s]+', 'g'), lenientSkip);
	// Remove preceding and trailing whitespace matcher. Handles cases such as `if ($a == $b) { $$ }` doesn't match "if (foo == bar) { baz(); }   \n\n    "
	if (regexTranslation.startsWith(lenientSkip))
		regexTranslation = regexTranslation.replace('[\\s]*', "");
	if (regexTranslation.endsWith(lenientSkip))
		regexTranslation = regexTranslation.substring(0, regexTranslation.length - lenientSkip.length);
	// Re-add "escape hatch" regex.
	let ri = 0;
	while (regexTranslation.includes(":????:"))
		regexTranslation = regexTranslation.replace(":????:", regexTokens[ri++]);
	const extendedRegex = new RegExp(regexTranslation, "g");
	extendedRegex.matchAll = function (str) {
		return [...str.matchAll(extendedRegex)].map(parseMatch);
	};
	extendedRegex.matchFirst = function (str) {
		return [...str.matchAll(extendedRegex)].map(parseMatch)[0] || {
			variables: [],
			literals: [],
			keywords: [],
			operators: [],
			blocks: [],
			others: []
		};
	};
	return extendedRegex;
}
function parseMatch(match) {
	const results = {
		variables: [],
		literals: [],
		keywords: [],
		operators: [],
		blocks: [],
		others: []
	};
	// This can occur in situations where no named capture groups are provided.
	// Thus there still is a "match", it's just empty.
	if (match == null || match.groups == null)
		return results;
	for (const [kind, value] of Object.entries(match.groups)) {
		// Warning: `if` order matters.
		if (kind.startsWith(blockPrefix))
			results.blocks.push(value);
		else if (kind.startsWith(keywordPrefix))
			results.keywords.push(value);
		else if (kind.startsWith(operatorPrefix))
			results.operators.push(value);
		else if (kind.startsWith(literalPrefix))
			results.literals.push(value);
		else if (kind.startsWith(variablePrefix))
			results.variables.push(value);
		else
			results.others.push(value);
	}
	return results;
}
/*
 * Note to future maintainer/self:
 * Please do not "DRY" up the below code with a function generator (unless it can be done well).
 * Consider a code generator if it's too tedious to add more functions. (Or refactor the whole algorithm).
 */
// Converts code variable matchers such as $a, $b, $foo, etc with regex.
// Handles complex replacements such as repeated variable captures, eg `$a == $a`.
function replaceVariablesWithRegex(codeString) {
	const captureRegex = /\$([a-zA-Z]+[0-9_]*)/g;
	const matches = codeString.match(captureRegex);
	if (matches == null)
		return codeString;
	const encounteredVariables = new Set();
	let result = codeString;
	for (const match of matches) {
		const normalizedName = match.replace('$', '');
		if (encounteredVariables.has(normalizedName)) {
			// Replace match with back reference, eg `$foobar` becomes `\k<PREFIX_foobar>`.
			result = result.replace(match, `\\k<${variablePrefix}${normalizedName}>`);
		}
		else {
			// Replace match with variable regex, eg `$foobar` becomes `(?<PREFIX_foobar>VAR_REGEX_STRING)`.
			result = result.replace(match, createNamedVariableRegex(`${variablePrefix}${normalizedName}`));
			encounteredVariables.add(normalizedName);
		}
	}
	return result;
}
// Converts code literal matchers such as $1, $2, $99, etc with regex.
// Handles complex replacements such as repeated literal captures, eg `$1 == $1`.
function replaceLiteralsWithRegex(codeString) {
	const captureRegex = /\$([0-9]+)/g;
	const matches = codeString.match(captureRegex);
	if (matches == null)
		return codeString;
	const encounteredLiterals = new Set();
	let result = codeString;
	for (const match of matches) {
		const normalizedName = match.replace('$', '');
		if (encounteredLiterals.has(normalizedName)) {
			// Replace match with back reference, eg `$1` becomes `\k<PREFIX_1>`.
			result = result.replace(match, `\\k<${literalPrefix}${normalizedName}>`);
		}
		else {
			// Replace match with literal regex, eg `$1` becomes `(?<PREFIX_1>LITERAL_REGEX_STRING)`.
			result = result.replace(match, createNamedLiteralRegex(`${literalPrefix}${normalizedName}`));
			encounteredLiterals.add(normalizedName);
		}
	}
	return result;
}
// Converts code operator matchers such as $@, $@op, etc with regex.
// Handles complex replacements such as repeated operator captures, eg `$@op $a $@op`.
function replaceOperatorsWithRegex(codeString) {
	const captureRegex = /\$@([a-zA-Z]+[0-9_]*)?/g;
	const matches = codeString.match(captureRegex);
	if (matches == null)
		return codeString;
	const encounteredOperators = new Set();
	let result = codeString;
	for (const match of matches) {
		const normalizedName = match.replace('$@', '') || uniqueCaptureGroupName();
		if (encounteredOperators.has(normalizedName)) {
			// Replace match with back reference, eg `$@op` becomes `\k<PREFIX_op>`.
			result = result.replace(match, `\\k<${operatorPrefix}${normalizedName}>`);
		}
		else {
			// Replace match with literal regex, eg `$@op` becomes `(?<PREFIX_op>OPERATOR_REGEX_STRING)`.
			result = result.replace(match, createNamedOperatorRegex(`${operatorPrefix}${normalizedName}`));
			encounteredOperators.add(normalizedName);
		}
	}
	return result;
}
// Converts code keyword matchers such as $#, $#a, $#keyword1, etc with regex.
// Handles complex replacements such as repeated keyword captures, eg `$#keyword1 { $$ } $#keyword1`.
function replaceKeywordsWithRegex(codeString) {
	const captureRegex = /\$#([a-zA-Z]+[0-9_]*)?/g;
	const matches = codeString.match(captureRegex);
	if (matches == null)
		return codeString;
	const encounteredKeywords = new Set();
	let result = codeString;
	for (const match of matches) {
		const normalizedName = match.replace('$#', '') || uniqueCaptureGroupName();
		if (encounteredKeywords.has(normalizedName)) {
			// Replace match with back reference, eg `$#keyword` becomes `\k<PREFIX_keyword>`.
			result = result.replace(match, `\\k<${keywordPrefix}${normalizedName}>`);
		}
		else {
			// Replace match with literal regex, eg `$#keyword` becomes `(?<PREFIX_keyword>KEYWORD_REGEX_STRING)`.
			result = result.replace(match, createNamedKeywordRegex(`${keywordPrefix}${normalizedName}`));
			encounteredKeywords.add(normalizedName);
		}
	}
	return result;
}

render(<App />, document.getElementById("example"));
