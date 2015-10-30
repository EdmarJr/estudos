
function OAS_VARS(OAS_page, OAS_pos) {
    OAS_Secao = EJESA.Util.getMetaName('be-OAS-vars-secao');   
    OAS_site = "brasileconomico.ig.com.br"
    OAS_sitepage = OAS_site + OAS_Secao;
    OAS_listpos = OAS_pos;

}


    OAS_version = 11;

        
    OAS_url = 'http://adserver.ig.com.br/RealMedia/ads/';
    OAS_query = '';
    OAS_target = '_blank';
    OAS_version = 11;
    OAS_rn = '001234567890'; 
    OAS_rns = '1234567890';
    OAS_rn = new String(Math.random()); OAS_rns = OAS_rn.substring(2, 11);
  


function OAS_NORMAL(pos) { 

    OAS_url = 'http://adserver.ig.com.br/RealMedia/ads/';
    OAS_Secao = EJESA.Util.getMetaName('be-OAS-vars-secao');   
    OAS_site = "brasileconomico.ig.com.br"
    OAS_sitepage = OAS_site + OAS_Secao;
    OAS_rns = '1234567890';
    OAS_listpos = EJESA.Util.getMetaName('be-OAS-vars-tags');
    OAS_query = '';


    document.write('<a href="' + OAS_url + 'click_nx.ads/' + OAS_sitepage + '/1' + OAS_rns + '@' + OAS_listpos + '!' + pos + OAS_query + '" target="_top">');
    document.write('<img src="' + OAS_url + 'adstream_nx.ads/' + OAS_sitepage + '/1' + OAS_rns + '@' + OAS_listpos + '!' + pos + OAS_query + '" border="0"></a>');
}

function OAS_START() {
    

    if (navigator.userAgent.indexOf('Mozilla/3') != -1 || navigator.userAgent.indexOf('Mozilla/4.0 WebTV') != -1) {
        OAS_version = 10;
    }
    
    if (OAS_version >= 11) {
        document.write('<SCRIP' + 'T LANGUAGE=JavaScript1.1 SRC="' + OAS_url + 'adstream_mjx.ads/' + OAS_sitepage + '/1' + OAS_rns + '@' + OAS_listpos + '?' + OAS_query + '"><\/SCRIP' + 'T>');
    }
    
}

document.write('');

function OAS_AD(pos){

    if (OAS_version >= 11) {
        OAS_RICH(pos);
    } else {
        OAS_NORMAL(pos);
    }
}

showX15 = 0;

function abreTopClick() {
    
    if (typeof(timer) != 'undefined')
    {
        clearTimeout(timer);
    }
    
    $('#pubIntervencao').css('display','block');
    $("#pubIntervencao").animate({height:335}, 500); 
}

function fechaTopClick() {

    $("#content").animate({top:20}, 500);
    $("#pubIntervencao").animate({height:90}, 500);
    if (showX15 == 0) {
        mostraX15(); 
    }
}

function mostraX15() {

    showX15 = 1;
    Mostrandox15();
    setTimeout
    (
        function(){ 
            $("#Dhtmlx15").css("display","block");
            $("#Dhtmlx15").css("visibility","visible");
            escondeX15();
        }
        ,1000
    );
}

function escondeX15() {

    setTimeout
    (
        function(){ 
            $("#Dhtmlx15").css("display","none");
            $("#Dhtmlx15").css("visibility","hidden");
        }
        ,15000
    );
}
