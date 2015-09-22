// ajax to get news
///
///  Javascript Tools 
///  @Author:  McJeremy&Xu pcitxzz
///  @CreateDate: 2008-11-05
///
function $(obj)
{
   try
   {
	   return typeof obj==='string'?document.getElementById(obj):obj;
   }
   catch($e)
   {
      return obj;
   }
}
function JSComponents(){};
JSComponents.AjaxTool=function()
{
   {
     this.requestHeaders={'Count':0,'Items':[]};  
     this.userName='';
     this.userPwd=''; 
   }
}; 
JSComponents.AjaxTool.prototype=    
{                           
	  getInstance:function()
	  {	    
		 return  this.createXmlHttp();		 
	  }, //end of getInstance();
	  createXmlHttp:function()
	  {
		 var tmpXmlHttp=null;
	     if(window.XMLHttpRequest)
		 {
		     tmpXmlHttp= new XMLHttpRequest();
		 }
		 else
		 {
		    var xmlHttps=['Microsoft.XMLHTTP','MSXML2.XMLHTTP','MSXML2.XMLHTTP.5.0', 'MSXML2.XMLHTTP.4.0', 'MSXML2.XMLHTTP.3.0'];
			for(var i=0;i<xmlHttps.length;i++)
			{
			   try
			   {
				  tmpXmlHttp= new ActiveXObject(xmlHttps[i]);
				  break;
			   }
			   catch ($e)
			   {
			      continue;
			   }
			}
		  }
		  if (tmpXmlHttp.readyState == null)  //mozilla
          {
             tmpXmlHttp.readyState = 0;

             tmpXmlHttp.addEventListener('load', function ()
              {
                  tmpXmlHttp.readyState = 4;

                  if (typeof tmpXmlHttp.onreadystatechange == 'function')
                  {
                    tmpXmlHttp.onreadystatechange();
                  }
              }, false);
          }
		  return tmpXmlHttp;
	  }, //end of createXmlHttp()
	  setLoginInfo:function(username,password)
	  {
	     if(typeof username!=='string' || username.length<=0)
		   throw new Error('UserName must be a string');
		 if(typeof password!=='string' || password.length<=0)
		   throw new Error('Password must be a string');
		 this.userName=username;
		 this.userPwd=password;
	  }, //end of setLoginInfo
	  setRequestHeader:function (name, value)
	  {		
		if ('string' !== typeof(name) || name.length<=0)
		{
			throw new Error('RequestHeader\'s name must be a string！');
		}
		if ('string' !== typeof(value)|| value.length<=0)
		{
			throw new Error('RequestHeader\'s value must be a string！');
		}			
		this.requestHeaders.Count = this.requestHeaders.Count + 1;
		this.requestHeaders.Items[name] = value;
	  }, //end of setRequestHeader()
	  handleCallBack:function(xmlHtp,callBack,args)
	  {
	     return function()
		 {
		    if(xmlHtp.readyState==4)
			{
				if(xmlHtp.status==200)
				{
                   if(args.length>5)
				   {
					    var extendArgs=[];
						for(var i=5;i<args.length;i++)
						{
							extendArgs.push(args[i]);
						}
						callBack(xmlHtp,extendArgs);
					}
					else
					{
                       callBack(xmlHtp);
					}
				}
			}
		 }
	  }, //end of handlerCallBack
	  ///@method GET|POST
	  ///@url  Target Page Address
	  ///@data  Params that be Sended to the @url
	  ///@callBack  a Function that to Handle the postback data
	  ///@disableCache allow Cache ?
	  /// and you can send other params that will be send to callBack function as a Array Object
	  sendRequest:function(method,url,data,callBack,disableCache)
	  {	    
	     if (typeof(method)!=='string')
		 {
			throw new Error('method must be a string type');
		 }
		 if (typeof(url)!=='string')
		 {
			throw new Error('url must be a string type');
		 }		 
		 method = method.toLowerCase();
		 if ('get' !== method && 'post' !== method)
		 {
			method = 'get';
		 }
		 var async = ('function' === typeof(callBack));  
		 try
		 {
			var xmlHtp=this.getInstance();
			if(async)
			{
				xmlHtp.onreadystatechange=this.handleCallBack(xmlHtp,callBack,arguments);
				if(method=='get' && typeof(data)=='string' && data.length>0)
				{					
					xmlHtp.open(method,url+(url.indexOf('?')!=-1?('&'+data):('?'+data)),async,this.userName,this.userPwd);
				}
				else
				{					
					xmlHtp.open(method,url,async,this.userName,this.userPwd);
				}
                if (true === disableCache)
			    {				    
				   this.setRequestHeader('If-Modified-Since', '0');
			    }
				if (this.requestHeaders.Count > 0)
			    {
				  for (var key in this.requestHeaders.Items)
				  {
					  xmlHtp.setRequestHeader(key, this.requestHeaders.Items[key]);
				  }
			    }
				if ('get' === method)
			    {
				    xmlHtp.send(null);
			    }
			    else
			    {
				    xmlHtp.send(data);
			    }				
			}
			else  
			{
				return xmlHtp;
			}
		 }
		 catch ($e)
		 {
			 throw $e;
		 }
	  } //end of sendRequest([args]);
};
