/*
     动态创建DOM元素的相关函数支持
    作者：徐志泽 PCITXZZ
    创建日期：2009-07-01
*/
/*
  获取以某个元素的DOM对象
  @obj  该元素的ID字符串
*/
function getElement(obj)
{
  return typeof obj=='string'?document.getElementById(obj):obj;
}
/*
  获取某个元素的位置
  @obj 该元素的DOM对象，注意不是字符串对象
*/
function getObjectPosition(obj)
{
  if(typeof obj!=='object')
  {
    return;
  }
  var position='';
  if(obj.getBoundingClientRect) //For IEs
  {
    position=obj.getBoundingClientRect();
    return {x:position.left,y:position.top};
  }
  else if(document.getBoxObjectFor)
  {
    position=document.getBoxObjectFor(obj);
    return {x:position.x,y:position.y};
  }
  else
  {
    position={x:obj.offsetLeft,y:obj.offsetTop};
    var parent=obj.offsetParent;
    while(parent)
    {
       position.x+=obj.offsetLeft;
       position.y+=obj.offsetTop;
       parent=obj.offsetParent;
    }
    return position;
  }
}
/*
  为某个DOM对象动态绑定事件
  @oTarget 被绑定事件的DOM对象
  @sEventType 被绑定的事件名，注意，不加on的事件名，如 'click'
  @fnHandler 被绑定的事件处理函数
*/
function addEventHandler(oTarget, sEventType, fnHandler)
{
	if (oTarget.addEventListener) 
	{
		oTarget.addEventListener(sEventType, fnHandler, false);
	} 
	else if (oTarget.attachEvent)  //for IEs
	{
		oTarget.attachEvent("on" + sEventType, fnHandler);
	} 
	else 
	{
		oTarget["on" + sEventType] = fnHandler;
	}
  }
/*
  从某个DOM对象中去除某个事件
  @oTarget 被绑定事件的DOM对象
  @sEventType 被绑定的事件名，注意，不加on的事件名，如 'click'
  @fnHandler 被绑定的事件处理函数
*/
function removeEventHandler(oTarget,sEventType,fnHandler)
{
    if(oTarget.removeEventListener) 
    {
       oTarget.removeEventListener(sEventType,fnHandler,false)
    }
    else if(oTarget.detachEvent)  //for IEs
    {
       oTarget.detachEvent(sEventType,fnHandler);
    }
    else
    {
       oTarget['on'+sEventType]=undefined;
    }
  }

/*
  创建动态的DOM对象
  @domParams是被创建对象的属性的JSON表达，它具有如下属性：
  @relativeNode被创建的对象计算位置时所属的父DOM对象
  @domTag 被创建对象的tag名称，支持常用的布局元素，如div span等，但不支持input\form等特别的元素
  @domId 被创建的对象的ID
  @styleName 被创建的对象的样式名称
  @offsetLeftPx 被创建的对象与其父结点的offsetLeft数值（注意是数字）
  @offsetTopPx 被创建的对象与其父结点的offsetTop数值（注意是数字）
  @content 被创建的对象内容 
  @otherAttributes 为被创建的对象添加除函数必需的属性外其它属性,如[{attrName:'style.color',attrValue:'red'}]
  @eventRegisters 为被创建的对象添加事件，类似[{eventType:'click',eventHandler:adsfasdf}]的数组
  -经过组合后，该参数具有如下形式:
  {relativeNode:****,domTag:'div',domId:'newDiv',styleName:'testcss',offsetLeftPx:50,offsetTopPx:0,content:'这是测试的',otherAttributes:[{attrName:'style.color',attrValue:'red'}],eventRegisters:[{eventType:'click',eventHandler:fnHandler}]}
*/
function dynCreateDomObject(domParams)
{
   if(domParams.domTag.toLowerCase().indexOf('input')!=-1)
   {
     alert('不支持动态创建input元素');
     return;
   }
   if(getElement(domParams.domId))
   {
     if(document.body)
     {
         removeChildNode(document.body,getElement(domParams.domId));
     }
     else if(document.documentElement)
     {
         removeChildNode(document.documentElement,getElement(domParams.domId));
     }
   }
   var srcPosition= getObjectPosition(domParams.relativeNode);  
       
   var dynObj=document.createElement(domParams.domTag);

   with(dynObj)
   {
     setAttribute('id',domParams.domId);
     if(document.all) //for ies
     {
       setAttribute('className',domParams.styleName);
     }
     else
     {
       setAttribute('class',domParams.styleName);
     }     
     innerHTML=domParams.content; //innerHTML是DOM属性，而id等是元素属性，注意区别
     style.position='absolute';
     style.zIndex='8888';
     style.left=srcPosition.x+domParams.offsetLeftPx+'px';
     style.top=srcPosition.y+domParams.offsetTopPx+'px';
   }
   /*添加额外的属性*/
   if(null!=domParams.otherAttributes)
   {
      for(var i=0;i<domParams.otherAttributes.length;i++)
      {
        var otherAttribute =domParams.otherAttributes[i];
        dynObj.setAttribute(otherAttribute.attrName,otherAttribute.attrValue);
      }
   }

   /*end*/
   /*添加相关事件*/
   if(null!=domParams.eventRegisters)
   {
      for(var i=0;i<domParams.eventRegisters.length;i++)
      {
        var eventRegister =domParams.eventRegisters[i];        
        addEventHandler(dynObj,eventRegister.eventType,eventRegister.eventHandler);
      }
   }
   /*end 事件*/  

   if(document.body)
   { 
      document.body.appendChild(dynObj);
   }
   else if(document.documentElement)
   {
      document.documentElement.appendChild(dynObj);
   }   
      
   return dynObj;
}
/*
  从父结点中删除子结点
  @parentNode 父结点的DOM对象
  @childNode 被删除子结点的DOM对象 或者被删除子结点的ID
*/
function removeChildNode(parentNode,childNode)
{
  if(typeof parentNode!=='object')
   return;  
  try
  {
    if(typeof childNode==='object')
    {
      parentNode.removeChild(childNode);
    }
    else if(typeof childNode==='string')
    {
      parentNode.removeChild(getElement(childNode));      
    }
  }
  catch($e)
  {
    alert($e.message);    
  }
}