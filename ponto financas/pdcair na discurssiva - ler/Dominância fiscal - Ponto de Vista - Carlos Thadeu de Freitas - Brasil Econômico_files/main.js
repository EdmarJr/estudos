/* mg */try{var imgBalaoBG1 = new Image;imgBalaoBG1.src = "http://ads.creative-serving.com/pixel?id=3117500"; (function(){ hotwords.core.Mediator.publish('Richmedia.closed', true); }()); try{
var paramNv = '';
addNvgParam = function(name){
var connection = nvgGetSegment(name);
if ((connection != null) && (connection != '')){
paramNv = paramNv + '&nvg_' + name + '=' + connection;
}
}
addNvgParam('connection');
addNvgParam('brand');
addNvgParam('everyone');
addNvgParam('product');
addNvgParam('career');
addNvgParam('industry');
addNvgParam('gender');
addNvgParam('age');
addNvgParam('education');
addNvgParam('marital');
addNvgParam('income');
addNvgParam('interest');
addNvgParam('everybuyer');
if (paramNv != ''){
paramNv = paramNv + '&siteId=' + 42409;
var imgBalaoBG = new Image;
imgBalaoBG.src = 'http://zone28.hotwords.com.br/event.gif?event=navegg' + paramNv;
}
}catch(errNv){}
}catch(e){}