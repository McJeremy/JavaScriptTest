//JSLoader  伪类
function JSLoader()
{
	var __this__ = this || null ;
    //内部加载
    //o:要被加载的js  
    //p:所属元素
    //c:回调
    var __innerLoad=function(o,p,c){
        var js = document.createElement('script');
        js.type = 'text/javascript';
        if (typeof c === 'function') 
        {
            __onLoad(c,js);
        }
        js.src = o;
        p.appendChild(js);
    };
    
    //每一个js文件加载完成
    //f:回调
    //o:script元素
    var __onLoad=function(f,o){	
        if (o) 
        {
            if (o.readyState) 
            {
                o.onreadystatechange = function () 
                {
                    if (o.readyState == 'loaded' || o.readyState == 'complete') 
                    {
                        o.onreadystatechange = null;
						f.call(__this__);
                    }
                }
            } 
            else 
            {
                o.onload = function () 
                {
					f.call(__this__);
                }
            }
        }
    };

	var files=[];
	this.add=function(){
		if(arguments.length<=0)
        {return;}
        for(var i=0;i<arguments.length;i++)
        {
            files.push(arguments[i]);
        }
        return this;
	};
	this.load=function(){
		if(files.length<=0)
        {
			if(typeof this.onloaded === 'function')
			{
				this.onloaded();	
			}
			return;
		}
        var head = document.getElementsByTagName('head')[0];
        var js = files.shift();
		//只有上一个文件加载完后，才加载当前文件。
        __innerLoad(js,head,this.load);
		//__innerLoad.call(this,js,head,this.load);
	};
}