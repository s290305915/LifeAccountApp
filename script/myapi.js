var KEY = '0123456789abcdef';
(function(window) {
	var u = {};
	u.refreshBgColor = '#eeeeee';
	u.refreshFontColor = '#000000';

	var baseUrl = 'http://118.178.186.60:8089/LifeAccountWebService.asmx/';

	//	var baseUrl = 'http://182.61.55.77/LifeAccount/LifeAccountWebService.asmx/';
	//  var baseUrl = 'http://218.200.187.203:8098/AppService/ChannelService.asmx/';
	//	var baseUrl = 'http://www.easyman.com.cn:8098/AppService/ChannelService.asmx/';

	function GetAbsoluteLocationEx(element) {
		if (arguments.length != 1 || element == null) {
			return null;
		}
		var elmt = element;
		var offsetTop = elmt.offsetTop;
		var offsetLeft = elmt.offsetLeft;
		var offsetWidth = elmt.offsetWidth;
		var offsetHeight = elmt.offsetHeight;
		while ( elmt = elmt.offsetParent) {
			// add this judge
			if (elmt.style.position == 'absolute' || elmt.style.position == 'relative' || (elmt.style.overflow != 'visible' && elmt.style.overflow != '')) {
				break;
			}
			offsetTop += elmt.offsetTop;
			offsetLeft += elmt.offsetLeft;
		}
		return {
			absoluteTop : offsetTop,
			absoluteLeft : offsetLeft,
			offsetWidth : offsetWidth,
			offsetHeight : offsetHeight
		};
	}

	/**
	 *打开选择器
	 */
	u.openSpinner = function(scroll, el, data, key, callback) {
		if (data == undefined || data == null || data.length == 0) {
			return;
		}
		var pos = GetAbsoluteLocationEx(el);
		var left = pos.absoluteLeft;
		var top = pos.absoluteTop;
		var width = pos.offsetWidth;
		var height = pos.offsetHeight;

		//选择器的最大高度
		var maxHeight = 200;

		var offTop = top + height + 4;
		//选择器离上top的距离
		var clientHeight = document.documentElement.clientHeight;
		//窗口大小
		var itemCount = data.length;
		//列表项个数
		var spinnerHeight = 42 * itemCount + 1;
		spinnerHeight = spinnerHeight > 200 ? 200 : spinnerHeight;
		//		if ((clientHeight - offTop) < spinnerHeight) {//下面不足以显示，显示在上方
		//			offTop = top - spinnerHeight - 4;
		//		}

		var spinnerRoot = document.createElement('div');
		var rootStyle = 'position: fixed;z-index:2000;top:0px;left:0px;width:100%;height:100%;background-color: rgba(0,0,0,0);';
		spinnerRoot.setAttribute('style', rootStyle);
		spinnerRoot.setAttribute('id', 'custom_spinner');
		spinnerRoot.addEventListener('click', function() {
			var root = document.getElementById('custom_spinner');
			if (root) {
				document.body.removeChild(root);
				document.body.setAttribute('style', 'overflow:auto;');
			}
		});

		var spinner = document.createElement('div');
		var stylestr = '';
		stylestr += 'position: absolute;';
		stylestr += 'top:' + offTop + 'px;';
		stylestr += 'left: ' + left + 'px;'
		stylestr += 'width: ' + (width - 2) + 'px;';
		stylestr += 'max-height: ' + maxHeight + 'px;';
		stylestr += 'background-color: #FFFFFF;';
		stylestr += 'overflow-x:hidden;';
		stylestr += 'overflow-y: auto;';
		stylestr += 'border-top: 2px solid rgb(60,190,248);';
		stylestr += 'border-left: 2px solid rgb(60,190,248);';
		stylestr += 'border-right: 2px solid rgb(60,190,248);';
		stylestr += 'border-bottom: 2px solid rgb(60,190,248);';
		spinner.setAttribute('style', stylestr);
		var item;
		for (var i = 0; i < data.length; i++) {
			item = document.createElement('label');
			var itemstylestr = '';
			itemstylestr += 'display: block;';
			itemstylestr += 'width: ' + (width - 22) + 'px;';
			itemstylestr += 'padding: 8px 10px;';
			itemstylestr += 'height: 25px;';
			itemstylestr += 'font-size: 14px;';
			itemstylestr += 'color: #333333;';
			if (i != (data.length - 1)) {
				itemstylestr += 'border-bottom: 1px solid rgb(228,228,228);';
			}
			item.setAttribute('style', itemstylestr);
			item.innerHTML = data[i][key];
			item.setAttribute('index', '' + i);
			item.addEventListener('click', function() {
				var index = this.getAttribute('index');
				callback(data[Number(index)]);
				document.body.removeChild(document.getElementById('custom_spinner'));
				document.body.setAttribute('style', 'overflow:auto;');
			});
			spinner.appendChild(item);
		}
		spinnerRoot.appendChild(spinner);

		document.body.appendChild(spinnerRoot);
		document.body.onscroll = function() {

			var tops = document.body.scrollTop + offTop;
			if (scroll == true) {
				$api.css(spinnerRoot, 'position: absolute;top:' + tops + '');
			} else {
				$api.css(spinnerRoot, 'position: fixed;top:' + offTop + '');
			}

		}
		document.body.setAttribute('style', 'overflow:hidden;');
	};

	/**
	 * 		isShowProgress : true,是否显示进度框
	 * 		progressMsg : '进度框提示信息',
	 * 		methodName : '方法名'
	 * 		param : {方法参数：对象
	 * 			p1 : 'p1',
	 * 			p2 : 'p2'
	 * 		}
	 * };
	 * @param {Object} callBack 回调方法
	 */
	u.requestByPost = function(isShowProgress, progressMsg, methodName, param, callBack) {
		console.debug('方法：' + methodName);
		console.debug('参数：' + JSON.stringify(param));
		if (isShowProgress) {
			progressMsg = progressMsg == '' ? '加载中' : progressMsg;
			api.showProgress({
				title : progressMsg
			});
		}
		api.ajax({
			url : baseUrl + methodName,
			method : 'post',
			timeout : 15,
			dataType : 'text',
			contentType : "application/json; charset=utf-8",
			data : {
				values : param
			}
		}, function(ret, err) {
			if (isShowProgress) {
				api.hideProgress();
			}
			console.debug('返回值：ret-->' + ret);
			console.debug('返回值：err-->' + JSON.stringify(err));
			callBack(ret, err);
		});
	};
	/**
	 * 在给定的element元素里面显示提示信息,居中显示
	 * 适合大容器的element
	 */
	u.showRequestTips = function(el, imgSrc, msg, callBack) {
		var root = document.createElement('div');
		var rootStyle = 'position: absolute;';
		rootStyle += 'top:50%;';
		rootStyle += 'left:50%;';
		rootStyle += 'width: 200px;';
		rootStyle += 'height: 140px;';
		rootStyle += 'margin-left: -100px;';
		rootStyle += 'margin-top: -70px;';
		rootStyle += 'text-align: center;';
		root.setAttribute('style', rootStyle);
		var icon = document.createElement('img');
		var iconStyle = 'display:inline-block;width: 90px;';
		icon.setAttribute('style', iconStyle);
		icon.setAttribute('src', imgSrc);
		var msgLabel = document.createElement('label');
		var labelStyle = 'display:inline-block;color:#999999;font-size: 14px;';
		msgLabel.setAttribute('style', labelStyle);
		msgLabel.innerHTML = msg;
		root.appendChild(icon);
		root.appendChild(msgLabel);
		root.addEventListener('click', function() {
			callBack();
		});
		el.innerHTML = '';
		el.appendChild(root);
	}
	/*
	 *随时检查token的网络请求方法
	 */
	u.requestPostWithToken = function(requestFunction) {
		//获取token过期时间
		var tokenEndTime = $api.getStorage("tokenEndTime");
		//获取当前时间的时间戳
		//判断token是否过期

		var nowTime = new Date().getTime();
		console.log("当前时间与token过期时间:" + nowTime + "\n" + tokenEndTime);
		if (nowTime > tokenEndTime) {
			//token过期,去请求token值
			//alert(" token已经过期...");
			var paramObj = {
				userName : $api.getStorage("loginusername"),
				passWord : $api.getStorage("loginpassword")
			};
			u.requestByGet(false, "获取token...", "api/ToKen/GetUserToKen?", paramObj, function(ret, err) {
				api.refreshHeaderLoadDone();
				if (ret) {
					if (ret.errcode == 0) {
						//alert(JSON.stringify(ret));
						var result = ret.Entity;
						//记录token过期时候的时间戳
						var tokenEndTimestamp = (new Date().getTime()) + (result.ContinueTime * 1000);
						//记录token
						$api.setStorage("tokenEndTime", tokenEndTimestamp);
						$api.setStorage("token", result.UserToken);
						//接下来获取了新的token就要再去请求数据了
						requestFunction();
					} else {
						$myapi.showToast(ret.errmsg);
					}
				} else {
					$myapi.showToast(err.msg);
				}
			});
		} else {
			//alert(" token没有过期...");
			requestFunction();
		}

	}
	/**
	 * 在给定的element元素里面显示提示信息,居中显示
	 * 适合小容器的element
	 */
	u.showRequestTipsNew = function(el, info, callBack) {
		var param = {
			img : '../image/no_data.png',
			imgWidth : 40,
			msg : ''
		}
		param.img = info.img ? info.img : param.img;
		param.imgWidth = info.imgWidth ? info.imgWidth : param.imgWidth;
		param.msg = info.msg ? info.msg : param.msg;

		var root = document.createElement('div');
		var rootStyle = 'padding-top:20px;';
		rootStyle += 'padding-bottom:20px;';
		rootStyle += 'width: 100%;';
		rootStyle += 'text-align: center;';
		root.setAttribute('style', rootStyle);
		var icon = document.createElement('img');
		var iconStyle = 'display:inline-block;width: ' + param.imgWidth + 'px;';
		icon.setAttribute('style', iconStyle);
		icon.setAttribute('src', param.img);
		var msgLabel = document.createElement('label');
		var labelStyle = 'display:block;color:#999999;font-size: 13px;text-align: center;';
		msgLabel.setAttribute('style', labelStyle);
		msgLabel.innerHTML = param.msg;
		root.appendChild(icon);
		root.appendChild(msgLabel);
		root.addEventListener('click', function() {
			callBack();
		});
		el.innerHTML = '';
		el.appendChild(root);
	}
	u.noDataDiv = function(el, imgpath, name, callBack) {
		var imgDiv = document.createElement('div');
		var stylestr = '';
		stylestr += 'position: absolute;';
		stylestr += 'top: 150px;';
		stylestr += 'width: 100%;';
		stylestr += 'text-align: center;';
		stylestr += 'display: block;';
		imgDiv.setAttribute('style', stylestr);
		imgDiv.setAttribute('id', 'currentnoDataDiv');
		var img = document.createElement('img');
		var imgstyle = '';
		imgstyle += 'margin: auto auto;';
		imgstyle += 'width: 111px;';
		imgstyle += 'height: 104px;';
		img.setAttribute('style', imgstyle);
		img.src = imgpath;

		var textp = document.createElement('p');
		var textpstyle = '';
		textpstyle += 'font-size: 16px;';

		textpstyle += 'color: #999;';
		textpstyle += 'text-align: center;';
		textp.setAttribute('style', textpstyle);
		textp.innerHTML = name;
		document.body.appendChild(imgDiv);
		imgDiv.appendChild(img);
		imgDiv.appendChild(textp);
		imgDiv.addEventListener('click', function() {
			callBack();
		});
		el.innerHTML = '';
		el.appendChild(imgDiv);
	}
	/**
	 * 显示toast.
	 */
	u.showToast = function(msginfo) {
		api.toast({
			msg : msginfo
		});
	};
	/**
	 * 控制台打印消息
	 * @param {Object} msg
	 */
	u.logOut = function(msg) {
		console.debug(msg);
	};
	window.$myapi = u;

})(window);
//根据当前月,取得历史月份集合(从当前月前推:历史)
function complementHistoryDate(numMonth, index, callback) {
	var complDate = [];
	var YearMonth = [];
	var curDate = new Date();
	var y = curDate.getFullYear();
	var m = curDate.getMonth() + 1;
	//第一次装入当前月(格式yyyymm)
	complDate[0] = y + "" + (m.toString().length == 1 ? "0" + m : m) + "";
	YearMonth[0] = y + "年" + (m.toString().length == 1 ? "0" + m : m) + '月';
	m--;
	//第一次已经装入,numMonth少计算一次
	for (var i = 1; i < index; i++, m--) {
		if (m == 0) {
			//到1月后,后推一年
			y--;
			m = 12;
			//再从12月往后推
		}
		complDate[i] = y + "" + (m.toString().length == 1 ? "0" + m : m) + "";
		YearMonth[i] = y + "年" + (m.toString().length == 1 ? "0" + m : m) + '月';
	}
	callback(complDate, YearMonth);
}

/**
 * 获取下一个月
 *
 * @date 格式为yyyy-mm-dd的日期，如：2014-01-25
 */
function getNextMonth(date, callback) {
	var arr = date.split('-');
	var year = arr[0];
	//获取当前日期的年份
	var month = arr[1];
	//获取当前日期的月份
	//          var day = arr[2]; //获取当前日期的日
	//          var days = new Date(year, month, 0);
	//          days = days.getDate(); //获取当前日期中的月的天数
	var year2 = year;
	var month2 = parseInt(month) + 1;
	if (month2 == 13) {
		year2 = parseInt(year2) + 1;
		month2 = 1;
	}
	//          var day2 = day;
	//          var days2 = new Date(year2, month2, 0);
	//          days2 = days2.getDate();
	//          if (day2 > days2) {
	//              day2 = days2;
	//          }
	if (month2 < 10) {
		month2 = '0' + month2;
	}

	//          var t2 = year2 + '-' + month2 + '-' + day2;
	var t2 = year2 + '年' + month2 + '月';
	callback(t2, year2, month2);

}

/**
 * 获取上一个月
 *
 * @date 格式为yyyy-mm-dd的日期，如：2014-01-25
 */
function getLastMonth(date, callback) {
	var arr = date.split('-');
	var year = arr[0];
	//获取当前日期的年份
	var month = arr[1];
	//获取当前日期的月份
	var year2 = year;
	var month2 = parseInt(month) - 1;
	if (month2 == 0) {
		year2 = parseInt(year2) - 1;
		month2 = 12;
	}
	if (month2 < 10) {
		month2 = '0' + month2;
	}
	var t2 = year2 + '年' + month2 + '月';
	callback(t2, year2, month2);
	//          var t2 = year2 + '-' + month2 + '-' + day2;
	//          return t2;
}

function water(el) {
	var item = '';
	var nameAndtime = '';
	var phone = $api.getStorage('userMsg').Phone;
	var name = $api.getStorage('userMsg').Name;
	var time = DateUtil.dateToStr('yyyy年MM月dd日', new Date());
	if (phone == '' || phone == null) {
		nameAndtime = name + '<br/>' + time;
	} else {
		nameAndtime = name + '(' + phone + ')' + '<br/>' + time;
	}
	item += '<div class="weight1">';
	item += '<label class="syinfo">' + nameAndtime + '</label>';
	item += '<label class="syinfo">' + nameAndtime + '</label>';
	item += '<label class="syinfo">' + nameAndtime + '</label>';
	item += '</div>';
	item += '<div class="weight1">';
	item += '<label class="syinfo">' + nameAndtime + '</label>';
	item += '<label class="syinfo">' + nameAndtime + '</label>';
	item += '<label class="syinfo">' + nameAndtime + '</label>';
	item += '</div>';
	item += '<div class="weight1">';
	item += '<label class="syinfo">' + nameAndtime + '</label>';
	item += '<label class="syinfo">' + nameAndtime + '</label>';
	item += '<label class="syinfo">' + nameAndtime + '</label>';
	item += '</div>';
	item += '<div class="weight1">';
	item += '<label class="syinfo">' + nameAndtime + '</label>';
	item += '<label class="syinfo">' + nameAndtime + '</label>';
	item += '<label class="syinfo">' + nameAndtime + '</label>';
	item += '</div>';
	$api.html(el, item);
}

/**
 *获取当前日期和时间
 */
function currentDateAndTime() {
	var myDate = new Date();

	var year = myDate.getFullYear();
	//获取完整的年份(4位,1970-????)
	var month = myDate.getMonth() + 1;
	//获取当前月份(0-11,0代表1月)
	var day = myDate.getDate();
	//获取当前日(1-31)
	myDate.getDay();
	//获取当前星期X(0-6,0代表星期天)
	myDate.getTime();
	//获取当前时间(从1970.1.1开始的毫秒数)
	var hour = myDate.getHours();
	//获取当前小时数(0-23)
	var minute = myDate.getMinutes();
	//获取当前分钟数(0-59)
	var second = myDate.getSeconds();
	//获取当前秒数(0-59)
	var months = month < 10 ? '0' + month : '' + month;
	var days = day < 10 ? '0' + day : '' + day;
	var hours = hour < 10 ? '0' + hour : '' + hour;
	var minutes = minute < 10 ? '0' + minute : '' + minute;
	var seconds = second < 10 ? '0' + second : '' + second;

	var current = year + "年" + months + '月';
	return current;

}

/**
 *AES加密
 *
 */
function aesEncrypt(data, key) {

	var encrypted = CryptoJS.AES.encrypt(data, key);

	return encrypted.toString();

}

/**
 *AES解密
 *
 */
function aesEncrypt(data, key) {

	var decrypted = CryptoJS.AES.decrypt(encrypted, key);
	decrypted = CryptoJS.enc.Utf8.stringify(decrypted);
	// 转换为 utf8 字符串
	return decrypted;

}

