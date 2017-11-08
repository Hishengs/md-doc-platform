const href = window.location.href;
const lastFlag = href[href.length - 1];
if(lastFlag !== '/' && href.indexOf('#') === -1){
	window.location.href = window.location.href + '/';
}

// remove link target _blank
/*const markdownBody = document.getElementsByClassName('markdown-body')[0];
if(markdownBody)
	(markdownBody.querySelectorAll('a') || []).forEach(e => {
		console.log(e);
		e.target = '_self';
	});*/