//JSLoader  α��
function JSLoader()
{
	var __this__ = this || null ;
    //�ڲ�����
    //o:Ҫ�����ص�js  
    //p:����Ԫ��
    //c:�ص�
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
    
    //ÿһ��js�ļ��������
    //f:�ص�
    //o:scriptԪ��
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
		//ֻ����һ���ļ�������󣬲ż��ص�ǰ�ļ���
        __innerLoad(js,head,this.load);
		//__innerLoad.call(this,js,head,this.load);
	};
}