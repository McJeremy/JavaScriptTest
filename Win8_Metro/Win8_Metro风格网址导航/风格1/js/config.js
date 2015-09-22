function getUniqueKey(prefix, length)
{
    if (prefix == null)
    {
        prefix = "id";
    }
    if (length == null || length < 8)
    {
        length = 8;
    }
    if (prefix.length >= length)
    {
        return prefix.substr(0, length);
    }

    var result = prefix;
    var chars = "1234567890abcdefghijklmnopqrstuvwxyz";

    var dupCount = 0;
    var preIndex = 0;
    for (var i = 0; i < length - prefix.length; ++i)
    {
        var index = Math.floor(Math.random() * 36.0);
        if (index == preIndex)
        {
            ++dupCount;
        }
        result += chars.charAt(index);
        preIndex = index;
    }
    if (length - prefix.length >= 2 && dupCount >= length - prefix.length - 2)
    {
        return getUniqueKey(prefix, length);
    }

    return result;
}

(function($){
	$.fn.metroNav = function(options)
	{
		var defaults = { 
			hoverEffect:true,
			blocks:[
				{
					Name:'公司填报',
					Bookmarks:[
						{Title:'重大项目推进情况月度报告',Url:'',Thumb:''},
						{Title:'重大项目推进情况季度报告',Url:'',Thumb:''}
					]
				},
				{
					Name:'公司签发',
					Bookmarks:[
						{Title:'重大项目推进情况月度报告',Url:'',Thumb:''},
						{Title:'重大项目推进情况季度报告',Url:'',Thumb:''}
					]
				},
				{
					Name:'板块填报',
					Bookmarks:[
						{Title:'重大项目推进情况月度报告',Url:'',Thumb:''},
						{Title:'重大项目推进情况季度报告',Url:'',Thumb:''}
					]
				},
				{
					Name:'板块签发',
					Bookmarks:[
						{Title:'重大项目推进情况月度报告',Url:'',Thumb:''},
						{Title:'重大项目推进情况季度报告',Url:'',Thumb:''}
					]
				},
				{
					Name:'集团填报',
					Bookmarks:[
						{Title:'重大项目推进情况月度报告',Url:'',Thumb:''},
						{Title:'重大项目推进情况季度报告',Url:'',Thumb:''}
					]
				},
				{
					Name:'集团签发',
					Bookmarks:[
						{Title:'重大项目推进情况月度报告',Url:'',Thumb:''},
						{Title:'重大项目推进情况季度报告',Url:'',Thumb:''}
					]
				},
				{
					Name:'查看',
					Bookmarks:[
						{Title:'重大项目推进情况月度报告',Url:'',Thumb:''},
						{Title:'重大项目推进情况季度报告',Url:'',Thumb:''}
					]
				}
			]
		};

		var winW = $(window).width(), winH = $(window).height();
		var originX = Math.floor((winW - 975) / 2);
		var originY = Math.floor((winH - 480) / 2) - 80;

		this.css({left:originX,top:originY});

		return this.each(function(){
			var _this_ = $(this);
			var opt = $.extend(defaults,options);
			var blockHtml = [];
			var blockUID = '';
			
			$.each(opt.blocks,function(i,block){

				blockUID = getUniqueKey('block',5);	
				
				//生成块标题
			    blockHtml.push('<div id=\''+blockUID+'\' class=\'blockname\' style=\'left:'+(i*500+5)+'px\'>'+block.Name+'</div>');

				//生成块主体区域
				blockHtml.push('<div id=\''+blockUID+'Wrapper\' class=\'blockwrapper\' style=\'left:'+(i*500)+'px\'>');

				$.each(block.Bookmarks,function(j,bookmark){
					blockHtml.push('<div id=\''+blockUID+'Nav_'+j+'\' class=\'blocknav\'>');

					if(bookmark.Thumb='')
					{
						blockHtml.push('<img src=\'lib/net-back.png\'/><a href=\'' + bookmark.Url + '\' target=\'_blank\'><div class=\'title\'>' + bookmark.Title + '</div></a>');
					}
					else 
					{
						blockHtml.push('<a href=\'' + bookmark.Url + '\' target=\'_blank\'><img src=\''+bookmark.Thumb+'\' title=\''+ bookmark.Title +'\'/></a>');
					}

					blockHtml.push('</div>');
				});

				//end 生成块主体区域
				blockHtml.push('</div>');

				_this_.append(blockHtml.join(''));
				blockHtml=[];
			});			
		});
	}
})(jQuery);