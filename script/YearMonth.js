/**
 * 选择年月
 */
function showYearMonth(yearMonth, leftpath, rightpath, callBack) {
	callback = callBack;
	var htmlstr = '';
	htmlstr += '<div class="selTimeDiv">';
	htmlstr += '<div class="selOutDiv" onclick="closeSelTimePan();"></div>';
	htmlstr += '<div class="selContent">';
	htmlstr += '<div class="horizontalBoxModel">';
	htmlstr += '<img class="changeTimeIcon" src=' + leftpath + ' onclick="monthMinus();"/>';
	htmlstr += '<label class="seledTimeLabel">"' + yearMonth + '"</label>';
	htmlstr += '<img class="changeTimeIcon" src=' + rightpath + '  onclick="monthPlus();"/>';
	htmlstr += '</div>';
	htmlstr += '<div class="monthDiv">';
	htmlstr += '<label class="monthItem" onclick="clickMonth(this);">01月</label>';
	htmlstr += '<label class="monthItem" onclick="clickMonth(this);">07月</label>';
	htmlstr += '<label class="monthItem" onclick="clickMonth(this);">02月</label>';
	htmlstr += '<label class="monthItem" onclick="clickMonth(this);">08月</label>';
	htmlstr += '<label class="monthItem" onclick="clickMonth(this);">03月</label>';
	htmlstr += '<label class="monthItem" onclick="clickMonth(this);">09月</label>';
	htmlstr += '<label class="monthItem" onclick="clickMonth(this);">04月</label>';
	htmlstr += '<label class="monthItem" onclick="clickMonth(this);">10月</label>';
	htmlstr += '<label class="monthItem" onclick="clickMonth(this);">05月</label>';
	htmlstr += '<label class="monthItem" onclick="clickMonth(this);">11月</label>';
	htmlstr += '<label class="monthItem" onclick="clickMonth(this);">06月</label>';
	htmlstr += '<label class="monthItem" onclick="clickMonth(this);">12月</label>';
	htmlstr += '</div>';
	htmlstr += '<div class="btnDiv" onclick="selTimeDone();">确 定</div>';
	htmlstr += '</div>';
	htmlstr += '<div class="selOutDiv" onclick="closeSelTimePan();"></div>';
	htmlstr += '</div>';
	$api.append($api.dom('body'), htmlstr);
	$api.text($api.dom('.seledTimeLabel'), yearMonth);
	var monthItems = $api.domAll('.monthItem');
	for (var i = 0; i < monthItems.length; i++) {
		if ($api.text(monthItems[i]) == (yearMonth.substring(5))) {
			$api.addCls(monthItems[i], 'monthActive');
			break;
		}
	}
	$api.css($api.dom('body'),'overflow:hidde;');
}
/**
 * 选择季度
 */
function showJidu(jidu, leftpath, rightpath, callBack) {
	callback = callBack;
	var htmlstr = '';
	htmlstr += '<div class="selTimeDiv">';
	htmlstr += '<div class="selOutDiv" onclick="closeSelTimePan();"></div>';
	htmlstr += '<div class="selContent">';
	htmlstr += '<div class="horizontalBoxModel">';
	htmlstr += '<img class="changeTimeIcon" src=' + leftpath + ' onclick="monthMinus();"/>';
	htmlstr += '<label class="seledTimeLabel">"' + jidu + '"</label>';
	htmlstr += '<img class="changeTimeIcon" src=' + rightpath + '  onclick="monthPlus();"/>';
	htmlstr += '</div>';
	htmlstr += '<div class="jiduDiv">';
	htmlstr += '<div class="jiduitemdiv">';
	htmlstr += '<label class="jiduItem" onclick="clickJidu(this);">第一季度</label>';
	htmlstr += '</div>';
	htmlstr += '<div class="jiduitemdiv">';
	htmlstr += '<label class="jiduItem" onclick="clickJidu(this);">第三季度</label>';
	htmlstr += '</div>';
	htmlstr += '<div class="jiduitemdiv">';
	htmlstr += '<label class="jiduItem" onclick="clickJidu(this);">第二季度</label>';
	htmlstr += '</div>';
	htmlstr += '<div class="jiduitemdiv">';
	htmlstr += '<label class="jiduItem" onclick="clickJidu(this);">第四季度</label>';
	htmlstr += '</div>';
	htmlstr += '</div>';
	htmlstr += '<div class="btnDiv" onclick="selTimeDone();">确 定</div>';
	htmlstr += '</div>';
	htmlstr += '<div class="selOutDiv" onclick="closeSelTimePan();"></div>';
	htmlstr += '</div>';
	$api.append($api.dom('body'), htmlstr);
	$api.text($api.dom('.seledTimeLabel'), jidu);
	var monthItems = $api.domAll('.jiduItem');
	for (var i = 0; i < monthItems.length; i++) {
		if ($api.text(monthItems[i]) == (jidu.substring(5))) {
			$api.addCls(monthItems[i], 'jiduActive');
			break;
		}
	}
	$api.css($api.dom('body'),'overflow:hidde;');
}

var callback;
function selTimeDone() {
	callback($api.text($api.dom('.seledTimeLabel')));
	closeSelTimePan();
}

function monthMinus() {
	var textval = $api.text($api.dom('.seledTimeLabel'));
	var year = parseInt(textval.substring(0, 4)) - 1;
	$api.text($api.dom('.seledTimeLabel'), year + textval.substring(4));
}

function monthPlus() {
	var textval = $api.text($api.dom('.seledTimeLabel'));
	var year = parseInt(textval.substring(0, 4)) + 1;
	$api.text($api.dom('.seledTimeLabel'), year + textval.substring(4));
}

function clickMonth(el) {
	$api.removeCls($api.dom('.monthActive'), 'monthActive');
	$api.addCls(el, 'monthActive');
	var textval = $api.text($api.dom('.seledTimeLabel'));
	textval = textval.substring(0, 5) + $api.text(el);
	$api.text($api.dom('.seledTimeLabel'), textval);
}

function clickJidu(el) {
	$api.removeCls($api.dom('.jiduActive'), 'jiduActive');
	$api.addCls(el, 'jiduActive');
	var textval = $api.text($api.dom('.seledTimeLabel'));
	textval = textval.substring(0, 5) + $api.text(el);
	$api.text($api.dom('.seledTimeLabel'), textval);
}
function closeSelTimePan() {
	$api.remove($api.dom('.selTimeDiv'));
	$api.css($api.dom('body'),'overflow:auto;');
}

