$(".category_filter ul:not(.color)").each(function(){
		if(Math.ceil($(this).children().length/2)>3)
		{
			$(this).css({"height":$(this).children().eq(0).outerHeight(true)*3}).after("<a href='javascript:void(0)' class='more'><span class='arrow_a'><i></i></span>View more</a>")
		}
});
$(".category_filter ul.color").each(function(){
		if(Math.ceil($(this).height()/$(this).children().eq(0).outerHeight(true))>3)
		{
			$(this).css({"height":$(this).children().eq(0).outerHeight(true)*3}).after("<a href='javascript:void(0)' class='more'><span class='arrow_a'><i></i></span>View more</a>")
		}
});
$(document).on("click",".category_filter a.more",function(){
		if($(this).children('.arrow_a').length>0)
		{
			$(this).html("<span class='arrow_b'><i></i></span>View less").prev().css({"height":"auto"});
		}
		else
		{
			$(this).html("<span class='arrow_a'><i></i></span>View more").prev().css({"height":$(this).prev().children().eq(0).outerHeight(true)*3});
		}
});

//-- this is a test1


if($(".good_box_min,.good_box_max").length>0 && !$(".good_box_min,.good_box_max").hasClass("clothing_isfashion")){
		$(".good_box_min,.good_box_max").find("li").each(function(){
		var goodwarehouseLength = $(this).find(".warehouse").length;
		var goodpriceoldLength =  $(this).find(".price_old.wh_cn").length;
		var goodreviewLength =  $(this).find(".review").length;
		if(goodwarehouseLength>0 && goodpriceoldLength==0){
			if(goodreviewLength==0){
				$(this).find(".price.wh_cn").css("padding-bottom",39);
			}
			else{
			 $(this).find(".price.wh_cn").css("padding-bottom",17);
			}

		}
		else{
			$(this).find(".price.wh_cn").css("padding-bottom",0);
		}
	});

}



/*BG左侧栏类目优化*/
/*20161220 #23012*/
(function(){

    function getshowmore(l,m,s,n){
        l > 5 ? m.show() : m.hide();
        $ (s).filter("li:gt(" + (n - 1) + ")").hide();
    }

    if($(".left_list_theme").length > 0){
    	$(".left_nextCategories_list").addClass("left_nextCategories_list_show");
	}else{

    	//二级类目及查看更多按钮
        var len = $('.category_now_list_one').find('li.cate_li').length;
        getshowmore(len,$('#seemore_cat'),".category_now_list_one > li",5);
        $(document).on('click','#seemore_cat',function(){
            $ (".category_now_list_one > li").filter("li:gt(" + (5 - 1) + ")").toggle ();
        });

        $('.category_now_list_one').eq(0).children("li").addClass("cate_li_inleft");
		 //前三个二级类目的三级类目显示
        $('.category_now_list_one').eq(0).children(".cate_li").children(".category_now_list_sub").hide();
        $('.category_now_list_one').eq(0).children(".cate_li").eq(0).children(".category_now_list_sub").show();
        $('.category_now_list_one').eq(0).children(".cate_li").eq(1).children(".category_now_list_sub").show();
        $('.category_now_list_one').eq(0).children(".cate_li").eq(2).children(".category_now_list_sub").show();

		 //三级类目及查看更多按钮
		 $(".category_now_list_one .category_now_list_sub").each(function() {
			 var $li_sub = $(this).find('.cate_ul_sub > li').length;
			 var $seemore_sub = $(this).find('.seemore_sub');
			 getshowmore($li_sub,$seemore_sub,$(this).find('.cate_ul_sub > li'),5);
		 });
		 $(".seemore_sub").each(function() {
			 $(this).click(function () {
				 $(this).siblings(".cate_ul_sub").find("li").filter("li:gt(" + (5 - 1) + ")").toggle();
			 });
		 });
	}
    $(".category_now_list_one").show();
	/*end BG左侧栏类目优化*/

	//点击关注
	$('.goodlist_search_recommend .wish').click(function() {
		var _this = $(this);
		var products_id = _this.closest('li').attr('data-id');
		var like_num = parseInt(_this.find('.like_num').text());
		if(_this.hasClass('isClick') || _this.hasClass('wish_active'))return;
		_this.addClass('isClick');
		$.ajax({
			url:'/index.php?com=product&t=addWishlist&products_id='+products_id,
			dataType:'json',
			success:function(res){
				if(res.login){
					login();
				}else{
					_this.addClass('wish_active');
					_this.find('.like_num').text(++like_num);
					var wishNum = parseInt($("#userwish").text(), 10);
					$("#userwish").text((wishNum?wishNum:0)+1);
				}
			}
		});
	});
	var products_id = $('.goodlist_search_recommend .wish').closest('li').attr('data-id');
    if (products_id != undefined) {
        $.ajax({
            url:'/index.php?com=product&t=isAddWish&products_id='+products_id,
            dataType:'json',
            success:function(res){
                if(res.isexist){
                    $('.goodlist_search_recommend .wish').addClass('wish_active');
                }else{

                }
            }
        });
    }
})();
/*end 20161220 #23012*/

$(document).on('click','.category_filter .choosemore',function(){
	if($(this).hasClass('active')){
		$(this).parent().next().find('label').hide();
		$(this).parent().next().find('label').next().show();
		$(this).parent().siblings('.more').show();
		$(this).parent().siblings('.choosebtn').hide();
		$(this).parent().next().removeClass('chooseitem').css('height',$(this).parent().next().attr('data-height'));
		$(this).removeClass('active');
		$(this).parent().next().animate({scrollTop:0},300);
	}else{
		var ulheight = $(this).parent().next().height();
		$(this).addClass('active');
		$(this).parent().next().addClass('chooseitem').attr('data-height',ulheight);
		$(this).parent().next().addClass('chooseitem').css({'height':'auto','max-height':240});
		$(this).parent().siblings('.more').hide();
		if($(this).parent().siblings('.choosebtn').length>0){
			$(this).parent().next().find('label').show();
			$(this).parent().next().find('label').next().hide();
			$(this).parent().siblings('.choosebtn').show();
		}
		else{
			$(this).closest('.category_filter_item').append('<div class="choosebtn"><span class="yes">OK</span><span class="no">Cancel</span></div>');
			var length = $(this).parent().next().find('li').length;
			if(length>0){
				$(this).parent().next().find('li').each(function(){
					var href = $(this).find('a').attr('href');
					var html = $(this).find('a').html();
					$(this).attr('data-url',href);
					if($(this).find('a').hasClass('gray')){
						$(this).find('a').before('<label class="checkbox_off"><i></i><a href="javascript:;">'+html+'</a></label>');
					}else{
						$(this).find('a').before('<label class="checkbox_on"><i></i><a href="javascript:;">'+html+'</a></label>');
					}
					$(this).find('label').next().hide();
				});
			}
		}
	}
});
var sle;
$(document).on('click','.category_filter .choosebtn .no',function(){
	$(this).parent().siblings('ul').animate({scrollTop:0},300);
	$(this).parent().hide().siblings('.more').show();
	$(this).parent().siblings('h3').find('.choosemore').removeClass('active');
	$(this).parent().siblings('ul').css('height',$(this).parent().siblings('ul').attr('data-height'));
	$(this).parent().siblings('ul').removeClass('chooseitem').find('li').each(function(){
		var href = $(this).attr('data-url');
		var html = $(this).find('label').hide();
		$(this).find('label').next().show();
	});
});

$(document).on('click','.category_filter .choosebtn .yes',function(){
	var arr = [];
	var checkBoxCount = 0;
	var Jump_url = '';
	var first_tag = '';
	$(this).parent().siblings('ul').find('li').each(function(){
		if($(this).find('label').hasClass('checkbox_on_active'))
		{
			var val = ($(this).find("input").val());
			if(Jump_url == ''){
				first_tag = val;
				Jump_url = $(this).children("a").attr('href');
			}
			arr.push(val);
			checkBoxCount++;
		}
	});
	if(checkBoxCount){
		Jump_url = Jump_url.replace(first_tag,arr.join("-"));
		//modal_bg();
	    //msgbox(0, 'You have select '+arr);
		window.location.href = Jump_url;
	}else{
		modal_bg();
	    msgbox(0, 'Please select one item.');
	}
});



(function(){
	if($('.clearance_ad .clearance_copy_btn').length){
		var clipboard = new Clipboard('.clearance_ad .clearance_copy_btn', {
			text: function(that) {
				return $(that).attr('data-code');
			}
		});

		clipboard.on('success', function(e) {
			modal_bg();
			msgbox(0,$(e.trigger).attr('data-sucess'));
		});

		clipboard.on('error', function(e) {
			//console.log(e);
		});
	}
})();
