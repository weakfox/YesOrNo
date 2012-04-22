var $add_yes_btn = $('#add_yes_btn'),
	$add_no_btn = $('#add_no_btn'),
	$yes_total = $('#yes_total'),
	$no_total = $('#no_total'),
	$yes_list = $('#yes_list'),
	$no_list = $('#no_list'),
	$yes_reason = $('#yes_reason'),
	$no_reason = $('#no_reason'),
	$yes_weight = $('#yes_weight'),
	$no_weight = $('#no_weight'),
	$bar = $('#bar'),
	$yes_bar = $bar.find('.yes'),
	$show_result_btn = $('#show_result_btn'),
	yes_total = 0,
	no_total = 0,
	show_click_btn = false;
	show_bar = false;

function make_choice(){
	// 获取随机数
	var limit = yes_total + no_total,
		random = Math.ceil(Math.random() * limit);

	if(yes_total === 0){
		return 1;
	}

	if(no_total === 0){
		return -1;
	}
	
	if(random < yes_total){
		// do it;
		return -1;
	}

	if(random == yes_total){
		// make the choice again
		return 0;
	}

	// don't do it
	return 1;
}

function add_yes(reason, weight){
	$('<li />').text(reason)
		.attr('weight', weight)
		.appendTo($yes_list);
	yes_total += weight;
	$yes_total.html(yes_total);
	update_bar();
}

function add_no(reason, weight){
	$('<li />').text(reason)
		.attr('weight', weight)
		.appendTo($no_list);
	no_total += weight;
	$no_total.html(no_total);
	update_bar();
}

function update_bar(){
	if(!show_bar){
		$bar.show();
		show_bar = true;
	}
	var percent = yes_total / (yes_total + no_total) * 100;
	$yes_bar.css('width', percent + '%');
	if(!show_click_btn){
		$show_result_btn.show();
		show_click_btn = true;
	}
}

function reset(){
	yes_total = 0;
	no_total = 0;
	show_click_btn = false;
	show_bar = false;
	$yes_bar.css('width', '50%');
	$yes_total.html('0');
	$no_total.html('0');
	$show_result_btn.hide();
	$yes_list.find('li').remove();
	$no_list.find('li').remove();
}

$(function(){
	$add_yes_btn.off('click').click(function(){
		var reason = $.trim($yes_reason.val()),
			weight = parseInt($yes_weight.val(), 10);
		if(reason == '') return;
		reason += '(' + weight + ')';
		add_yes(reason, weight);
		$yes_reason.val('');
		$yes_weight.val('0');
	});

	$add_no_btn.off('click').click(function(){
		var reason = $.trim($no_reason.val()),
			weight = parseInt($no_weight.val(), 10);
		if($no_reason.val() == '') return;
		reason += '(' + weight + ')';
		add_no(reason, weight);
		$no_reason.val('');
		$no_weight.val('0');
	});

	$show_result_btn.off('click').click(function(){
		var result = make_choice();
		if(result === 0){
			$show_result_btn.html('再试一次');
		}else if(result == -1){
			alert('fucking do it!!!');
			reset();
		}else{
			alert("don't do the fuck thing.")
			reset();
		}
	});
});