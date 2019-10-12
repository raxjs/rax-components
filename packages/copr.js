const path = require('path');
const fs = require('fs');
const shell = require('shelljs');

let data = [
	// 'rax-text'
	'rax-barcode',
	'rax-button',
	'rax-canvas',
	'rax-checkbox',
	'rax-countdown',
	'rax-counter',
	'rax-datepicker',
	'rax-gesture-view',
	'rax-grid',
	'rax-gyroscope-parallax',
	'rax-icon',
	'rax-image',
	'rax-link',
	'rax-modal',
	'rax-multirow',
	'rax-parallax',
	'rax-picker',
	'rax-picture',
	'rax-player',
	'rax-qrcode',
	'rax-recyclerview',
	'rax-refreshcontrol',
	'rax-scrollview',
	'rax-slider',
	'rax-switch',
	'rax-tab-panel',
	'rax-textinput',
	'rax-video',
	'rax-waterfall',
	'rax-xslider',
];

if (!shell.which('git')) {
  shell.echo('Sorry, this script requires git');
  shell.exit(1);
} else {
  shell.echo('git ok');
}

const basePath = '/Users/sunzhao/git/github/raxjs/rax-components/packages';

let Steps = {
	// copy code
	copyCode: function(name) {
		let fromPath = basePath + '/rax-view/';
		let toPath = basePath + '/' + name + '/';
		console.log(fromPath);
		console.log(toPath);
	  // shell.cp('-R', fromPath + 'src' , toPath + 'src');
	  shell.cp(fromPath + '.editorconfig' , toPath + '.editorconfig');
	  shell.cp(fromPath + '.eslintignore' , toPath + '.eslintignore');
	  shell.cp(fromPath + '.eslintrc.js' , toPath + '.eslintrc.js');
	  shell.cp(fromPath + '.gitignore' , toPath + '.gitignore');
	  shell.cp(fromPath + '.npmignore' , toPath + '.npmignore');
  	shell.echo('copyCode ok');
	},

};

function run(step, name) {
  step(name);
}

data.map((name, index) => {
	run(Steps.copyCode, name);
});

