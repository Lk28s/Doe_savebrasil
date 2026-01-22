var PayboxV2 = (function(){

    // options.organization_id, options.should_hide_price_selector, options.value, options.subscribe
    function createIframe(options){
  
      options = options || {}
      var iframe = document.createElement('iframe'),
          qs;
  
      iframe.src = getUrl(options);
      iframe.allow = "payment 'self' https://paybox.doare.org https://paybox-v2.doare.org"
  
      iframe.style.width = '100%';
      iframe.style.height = '100%';
  
      iframe.style.backgroundColor = "transparent";
      iframe.style.top = '0px'
      iframe.style.left = '0px';
      iframe.style.margin = '0px';
      iframe.style.position = 'fixed';
      iframe.style.zIndex = '2147483646';
  
      iframe.frameBorder = "0";
      iframe.allowTransparency = "true";
  
      return iframe;
    }
  
    function getUrl(options){
      var id = '';
      
      // var langParam = url.searchParams.get("lang");
  
      // var lang = langParam || options.lang || 'br';
      var lang = options.lang || 'br';
  
      if(options.profileId){
        id = ('/' + options.profileId);
      }
  
      options.referer = window.location.href;
  
      try {
        var url = new URL(window.location.href);
        var utm_source = url.searchParams.get("utm_source");
        console.log(utm_source);
        if(utm_source){
          options.source = utm_source;
        }
      } catch(e){
        console.log(e);
      }
      
  
      if(options.referer){
        options.referer = options.referer.toString().split("/?", 1);
        options.referer = options.referer.toString().split("?", 1);
        options.referer = options.referer.toString().split("#", 1);
      }
  
     
      if(options.sourceURL) {
  
        options.sourceURL = options.sourceURL.toString().split("/?", 1);
        options.sourceURL = options.sourceURL.toString().split("?", 1);
        options.sourceURL = options.sourceURL.toString().split("#?", 1);
        options.sourceURL = options.sourceURL.toString().split("/#", 1);
        options.sourceURL = options.sourceURL.toString().split("#", 1);
  
      }
  
     
  
  
      return '//paybox-v2.doare.org/'+lang+'/paybox' + id + '?' + stringifyQs(options)
    }
  
    function findCampaign(id) {
      var c = ['af729f79-0a35-11ea-99bf-06787f1b93fc',
      '050b8117-0a37-11ea-99bf-06787f1b93fc',
      '8d04eb5a-0a37-11ea-99bf-06787f1b93fc',
      'fcdbe1d9-0a37-11ea-99bf-06787f1b93fc',
      'c709534d-0a38-11ea-99bf-06787f1b93fc',
      '653415b3-0a39-11ea-99bf-06787f1b93fc',
      '15596d7e-0a3a-11ea-99bf-06787f1b93fc',
      '810603d2-0a3a-11ea-99bf-06787f1b93fc',
      '33df6567-0a3b-11ea-99bf-06787f1b93fc',
      'a870de8a-0bcb-11ea-99bf-06787f1b93fc',
      'be2551ad-0a3b-11ea-99bf-06787f1b93fc',
      '459b3214-0b9b-11ea-99bf-06787f1b93fc',
      '6ddc774f-0b9c-11ea-99bf-06787f1b93fc',
      '7d5263f8-0a3c-11ea-99bf-06787f1b93fc',
      'd823922f-0a3e-11ea-99bf-06787f1b93fc',
      '640c230d-0a3f-11ea-99bf-06787f1b93fc',
      'ffaea6e1-0a3f-11ea-99bf-06787f1b93fc',
      'a79b85de-0a40-11ea-99bf-06787f1b93fc',
      'dd27dcda-0a41-11ea-99bf-06787f1b93fc',
      'a86f86dc-0b9d-11ea-99bf-06787f1b93fc',
      '61273ebb-0b9e-11ea-99bf-06787f1b93fc',
      '5aafca67-0b9f-11ea-99bf-06787f1b93fc',
      '501479ce-0ba0-11ea-99bf-06787f1b93fc',
      '85a9dae1-0ba1-11ea-99bf-06787f1b93fc',
      '963552d4-0ba2-11ea-99bf-06787f1b93fc',
      '628f0e32-0a41-11ea-99bf-06787f1b93fc',
      'af292747-0ba3-11ea-99bf-06787f1b93fc',
      '7c9d7e61-0ba4-11ea-99bf-06787f1b93fc',
      '186907a8-0ba5-11ea-99bf-06787f1b93fc',
      'ffe00867-0ba5-11ea-99bf-06787f1b93fc',
      '522e4e56-0ba7-11ea-99bf-06787f1b93fc',
      '0c34324f-0ba8-11ea-99bf-06787f1b93fc',
      'b7c503bd-0ba8-11ea-99bf-06787f1b93fc',
      '2f7fa161-0ba9-11ea-99bf-06787f1b93fc',
      'a8a513f9-0ba9-11ea-99bf-06787f1b93fc',
      '4fb78a78-0baa-11ea-99bf-06787f1b93fc',
      '92b78348-0baa-11ea-99bf-06787f1b93fc',
      '14a51069-0bab-11ea-99bf-06787f1b93fc',
      '33bb7dd3-1e3e-11e9-bdef-06f68befd9da',
      'd498edf6-0bab-11ea-99bf-06787f1b93fc',
      '027f143e-0bac-11ea-99bf-06787f1b93fc',
      '538b86bb-0bac-11ea-99bf-06787f1b93fc',
      '7af587f8-0bac-11ea-99bf-06787f1b93fc',
      'f10a4b9a-0bac-11ea-99bf-06787f1b93fc',
      '670cf0f2-0bad-11ea-99bf-06787f1b93fc',
      'de6c4f61-0bad-11ea-99bf-06787f1b93fc',
      'e62d0c4a-0bca-11ea-99bf-06787f1b93fc',
      '1957636d-0baf-11ea-99bf-06787f1b93fc',
      '97be41c9-0baf-11ea-99bf-06787f1b93fc',
      'c87a8469-0bb9-11ea-99bf-06787f1b93fc',
      'e1ae3980-0bbe-11ea-99bf-06787f1b93fc',
      'f62c1732-0bbf-11ea-99bf-06787f1b93fc',
      'a02fcfd6-0bc0-11ea-99bf-06787f1b93fc',
      '32ac2309-0bc1-11ea-99bf-06787f1b93fc',
      '3a6f0b9c-0bc2-11ea-99bf-06787f1b93fc',
      '3e678d8e-0bc3-11ea-99bf-06787f1b93fc',
      '21f74051-0bc4-11ea-99bf-06787f1b93fc',
      'abe8dcb1-0bc4-11ea-99bf-06787f1b93fc',
      '15cadc7e-0bc5-11ea-99bf-06787f1b93fc',
      '738d5625-0bc5-11ea-99bf-06787f1b93fc',
      '2a6e3ba0-0bc6-11ea-99bf-06787f1b93fc',
      'e0559969-0bc6-11ea-99bf-06787f1b93fc',
      '8be4bdfd-0bc7-11ea-99bf-06787f1b93fc',
      '1143a346-0bc8-11ea-99bf-06787f1b93fc',
      '4bf6c1d6-0bc9-11ea-99bf-06787f1b93fc',
      '29b72597-0bca-11ea-99bf-06787f1b93fc',
      'c4d42ca8-0bb5-11ea-99bf-06787f1b93fc',
      '1d271141-0bb4-11ea-99bf-06787f1b93fc',
      'f09b8614-0bb2-11ea-99bf-06787f1b93fc',
      '410337a9-0bb1-11ea-99bf-06787f1b93fc',
      '39977cfb-0baf-11ea-99bf-06787f1b93fc',
      'd09864fd-0bad-11ea-99bf-06787f1b93fc',
      '83d407d9-0bac-11ea-99bf-06787f1b93fc',
      '6bcc438e-0bab-11ea-99bf-06787f1b93fc',
      '4e5779ec-0baa-11ea-99bf-06787f1b93fc',
      'df8f79bd-0c82-11ea-99bf-06787f1b93fc',
      '65c1b491-0c83-11ea-99bf-06787f1b93fc',
      'a95a7768-0c83-11ea-99bf-06787f1b93fc',
      '13e3d04f-1224-11ea-99bf-06787f1b93fc',
      '6d01ee9b-1224-11ea-99bf-06787f1b93fc',
      'b08c698d-2348-11ea-99bf-06787f1b93fc',
      '9f605437-1604-11ea-99bf-06787f1b93fc',
      '1a44d264-1225-11ea-99bf-06787f1b93fc',
      'd6d1e3da-1604-11ea-99bf-06787f1b93fc',
      'b013e56d-1225-11ea-99bf-06787f1b93fc',
      '738d5625-0bc5-11ea-99bf-06787f1b93fc',
      'ecaf7fe1-1225-11ea-99bf-06787f1b93fc',
      '0a7584d4-1226-11ea-99bf-06787f1b93fc',
      '3e99e70c-1226-11ea-99bf-06787f1b93fc',
      'b77fbd80-1226-11ea-99bf-06787f1b93fc',
      '8045250f-1c1b-11ea-99bf-06787f1b93fc',
      '070b0603-1227-11ea-99bf-06787f1b93fc',
      'f2764111-1cf1-11ea-99bf-06787f1b93fc',
      '7b2ab741-1c35-11ea-99bf-06787f1b93fc',
      '9881dff6-200b-11ea-99bf-06787f1b93fc',
      'd3bf3c80-1c35-11ea-99bf-06787f1b93fc',
      'c6b4ba93-1ba1-11ea-99bf-06787f1b93fc',
      '5c456233-1c36-11ea-99bf-06787f1b93fc',
      'e9be4497-1ba1-11ea-99bf-06787f1b93fc',
      '3fa9b8a5-1ba2-11ea-99bf-06787f1b93fc',
      '65064e2e-1dc9-11ea-99bf-06787f1b93fc',
      '663231d9-1ba2-11ea-99bf-06787f1b93fc',
      '8889f254-1227-11ea-99bf-06787f1b93fc',
      'ad8580df-1227-11ea-99bf-06787f1b93fc',
      '6d7dc406-1cf2-11ea-99bf-06787f1b93fc',
      '4c7b679f-12f1-11ea-99bf-06787f1b93fc',
      'dc9014fc-1227-11ea-99bf-06787f1b93fc',
      'fe1a7c4e-1227-11ea-99bf-06787f1b93fc',
      '9e56adf8-16d3-11ea-99bf-06787f1b93fc',
      '1df5288a-1228-11ea-99bf-06787f1b93fc',
      'cbfd4cc8-16d3-11ea-99bf-06787f1b93fc',
      '7b8cc4b5-1228-11ea-99bf-06787f1b93fc',
      'e14d3c78-12db-11ea-99bf-06787f1b93fc',
      'df315091-1228-11ea-99bf-06787f1b93fc',
      '0e2b98f0-1229-11ea-99bf-06787f1b93fc',
      '39835f6b-1229-11ea-99bf-06787f1b93fc',
      '579c55a1-1229-11ea-99bf-06787f1b93fc',
      'a60158b4-1229-11ea-99bf-06787f1b93fc',
      '4215df86-2ef0-11ea-99bf-06787f1b93fc',
      'c7cfad8a-1229-11ea-99bf-06787f1b93fc',
      '059b4dca-122a-11ea-99bf-06787f1b93fc',
      '59aefb41-12f3-11ea-99bf-06787f1b93fc',
      '853a5606-12f3-11ea-99bf-06787f1b93fc',
      '451a56ab-1611-11ea-99bf-06787f1b93fc',
      'c154efdf-16d4-11ea-99bf-06787f1b93fc',
      '2dfc4067-1605-11ea-99bf-06787f1b93fc',
      '260aff04-122c-11ea-99bf-06787f1b93fc',
      '75add2ce-1605-11ea-99bf-06787f1b93fc',
      '9800c062-16d4-11ea-99bf-06787f1b93fc',
      'c5f16953-1772-11ea-99bf-06787f1b93fc',
      '8af6d313-1c1c-11ea-99bf-06787f1b93fc',
      'c399c71a-1c1c-11ea-99bf-06787f1b93fc',
      '0320195c-122d-11ea-99bf-06787f1b93fc',
      '2b50fa2e-122d-11ea-99bf-06787f1b93fc',
      '47b57340-122d-11ea-99bf-06787f1b93fc',
      '7e008834-122d-11ea-99bf-06787f1b93fc',
      '12080da3-16d5-11ea-99bf-06787f1b93fc',
      '25320f5d-1608-11ea-99bf-06787f1b93fc',
      '10b9fdd4-1609-11ea-99bf-06787f1b93fc',
      '5e0e19d8-1609-11ea-99bf-06787f1b93fc',
      'ed73b139-200e-11ea-99bf-06787f1b93fc',
      '87f50f98-12f2-11ea-99bf-06787f1b93fc',
      'cba26c0b-12f2-11ea-99bf-06787f1b93fc',
      '84cd54e7-160a-11ea-99bf-06787f1b93fc',
      'b04f4f82-1cf2-11ea-99bf-06787f1b93fc',
      'dd1bf514-122e-11ea-99bf-06787f1b93fc',
      '0bcfaddb-122f-11ea-99bf-06787f1b93fc',
      '1840c955-160a-11ea-99bf-06787f1b93fc',
      '3e5345f0-122f-11ea-99bf-06787f1b93fc',
      '5e558dfd-122f-11ea-99bf-06787f1b93fc',
      '7b9d4f49-122f-11ea-99bf-06787f1b93fc',
      '94baa7e8-122f-11ea-99bf-06787f1b93fc',
      '1c16fd9e-1230-11ea-99bf-06787f1b93fc',
      'e28bb75c-160a-11ea-99bf-06787f1b93fc',
      '4136f762-392e-11ea-86fb-06787f1b93fc',
      '71b3a5d3-1827-11ea-99bf-06787f1b93fc',
      '19000a0e-160b-11ea-99bf-06787f1b93fc',
      '4a958fda-1230-11ea-99bf-06787f1b93fc',
      'e4563f46-1230-11ea-99bf-06787f1b93fc',
      'e11b53c8-1cf2-11ea-99bf-06787f1b93fc',
      '151dfb31-1231-11ea-99bf-06787f1b93fc',
      '3cafcf5d-1231-11ea-99bf-06787f1b93fc',
      'c76f4dee-3159-11ea-99bf-06787f1b93fc',
      'a8903405-1231-11ea-99bf-06787f1b93fc',
      'c8384d95-1231-11ea-99bf-06787f1b93fc',
      'eededbef-1231-11ea-99bf-06787f1b93fc',
      '137f9e6d-1232-11ea-99bf-06787f1b93fc',
      'd82c2aa1-1237-11ea-99bf-06787f1b93fc',
      '318be624-1238-11ea-99bf-06787f1b93fc',
      '53ebd8aa-1238-11ea-99bf-06787f1b93fc',
      '19ba395c-1239-11ea-99bf-06787f1b93fc',
      '60b1239c-1239-11ea-99bf-06787f1b93fc',
      '193eda9c-123a-11ea-99bf-06787f1b93fc',
      '8a65e7d5-160b-11ea-99bf-06787f1b93fc',
      '210c63fd-160e-11ea-99bf-06787f1b93fc',
      'c9d7f7c9-20f2-11ea-99bf-06787f1b93fc',
      '59102fda-16d5-11ea-99bf-06787f1b93fc',
      'c35cc671-160e-11ea-99bf-06787f1b93fc',
      '43083843-1827-11ea-99bf-06787f1b93fc',
      '4a8fecf2-1cea-11ea-99bf-06787f1b93fc',
      '388b7d4d-160f-11ea-99bf-06787f1b93fc',
      '5fd96469-160f-11ea-99bf-06787f1b93fc',
      '59d67910-123a-11ea-99bf-06787f1b93fc',
      'f824cd11-123a-11ea-99bf-06787f1b93fc',
      'ff57f731-1c1f-11ea-99bf-06787f1b93fc',
      '27d5320d-123b-11ea-99bf-06787f1b93fc',
      '3af8e857-1610-11ea-99bf-06787f1b93fc',
      '4dd96854-123b-11ea-99bf-06787f1b93fc',
      '834a39f2-123b-11ea-99bf-06787f1b93fc',
      'baa84ca2-1610-11ea-99bf-06787f1b93fc',
      '1991cb73-2295-11ea-99bf-06787f1b93fc',
      'a5ddda3e-123b-11ea-99bf-06787f1b93fc',
      'bea1c206-123b-11ea-99bf-06787f1b93fc',
      'ec756132-16a7-11ea-99bf-06787f1b93fc',
      '2d12cf0b-123c-11ea-99bf-06787f1b93fc',
      '5a5befe2-123c-11ea-99bf-06787f1b93fc',
      '78c4b9f8-123c-11ea-99bf-06787f1b93fc',
      'a5b5ae94-123c-11ea-99bf-06787f1b93fc',
      'd378fea6-123c-11ea-99bf-06787f1b93fc',
      '13d64271-123d-11ea-99bf-06787f1b93fc',
      '70faca14-3093-11ea-99bf-06787f1b93fc',
      'ef55429d-1610-11ea-99bf-06787f1b93fc',
      'da9136c4-322a-11ea-99bf-06787f1b93fc',
      '36597066-123d-11ea-99bf-06787f1b93fc',
      '73ae3804-123d-11ea-99bf-06787f1b93fc',
      '5a5cbae1-1c21-11ea-99bf-06787f1b93fc',
      '6b842e2a-1d11-11ea-99bf-06787f1b93fc',
      '7f4c33dd-1c21-11ea-99bf-06787f1b93fc',
      'b722101f-1c21-11ea-99bf-06787f1b93fc',
      'b781bbf6-2664-11ea-99bf-06787f1b93fc',
      'd6f85e67-1c21-11ea-99bf-06787f1b93fc',
      '231a933e-21d7-11ea-99bf-06787f1b93fc',
      'be6cf238-2010-11ea-99bf-06787f1b93fc',
      '40a2ae4c-9ab3-11ea-9b93-0667b40d75bc',
      'ee56d1a4-9ad4-11ea-9b93-0667b40d75bc',
      '72b72bec-9ae1-11ea-9b93-0667b40d75bc',
      'e249f52a-9ae1-11ea-9b93-0667b40d75bc',
      '391432a5-9b6e-11ea-9b93-0667b40d75bc',
      '947bc3b9-9ae6-11ea-9b93-0667b40d75bc',
      '4cdcb799-9ae5-11ea-9b93-0667b40d75bc',
      '24da534d-9ae7-11ea-9b93-0667b40d75bc',
      '4b7fa0c1-9b70-11ea-9b93-0667b40d75bc',
      'f783bc7e-9b70-11ea-9b93-0667b40d75bc',
      '54fdd878-9b73-11ea-9b93-0667b40d75bc',
      'c643dead-9ae7-11ea-9b93-0667b40d75bc',
      'd06056d5-9b71-11ea-9b93-0667b40d75bc',
      'b92d67f1-9b72-11ea-9b93-0667b40d75bc',
      '652ea038-9b74-11ea-9b93-0667b40d75bc',
      'f1e49375-9b74-11ea-9b93-0667b40d75bc',
      '7d6f9d41-9b75-11ea-9b93-0667b40d75bc',
      '1400bd37-9b76-11ea-9b93-0667b40d75bc',
      '9e4ae8f7-9b77-11ea-9b93-0667b40d75bc',
      '6a9a2b40-9b78-11ea-9b93-0667b40d75bc',
      'f3dad881-9b78-11ea-9b93-0667b40d75bc',
      '76b5c7c7-9b79-11ea-9b93-0667b40d75bc',
      '5d4c0d38-9b7a-11ea-9b93-0667b40d75bc',
      'ec5ef79d-9b7a-11ea-9b93-0667b40d75bc',
      '8e5c6e2b-9b7b-11ea-9b93-0667b40d75bc',
      '4afef864-9b7c-11ea-9b93-0667b40d75bc',
      '494d31bd-9b7e-11ea-9b93-0667b40d75bc',
      '390598b7-9ad2-11ea-9b93-0667b40d75bc',
      '3b880d25-9f80-11ea-9b93-0667b40d75bc',
      '55a9d518-a40d-11ea-9b93-0667b40d75bc',
      'da17fb10-b013-11ea-9b93-0667b40d75bc',
      '624615fd-b15f-11ea-a6c9-0667b40d75bc',
      '8460846c-b15f-11ea-a6c9-0667b40d75bc',
      '167c98db-b160-11ea-a6c9-0667b40d75bc',
      '3c61d3ee-b160-11ea-a6c9-0667b40d75bc',
      '58313257-b160-11ea-a6c9-0667b40d75bc',
      '70a24944-b160-11ea-a6c9-0667b40d75bc',
      '8faf90be-b160-11ea-a6c9-0667b40d75bc',
      'a97a8001-b160-11ea-a6c9-0667b40d75bc',
      'c61261a5-b160-11ea-a6c9-0667b40d75bc',
      '1d05604d-b161-11ea-a6c9-0667b40d75bc',
      '9a2ab751-b161-11ea-a6c9-0667b40d75bc',
      'd43de190-b161-11ea-a6c9-0667b40d75bc',
      'accccdbd-b15f-11ea-a6c9-0667b40d75bc',
      '25caf32a-b577-11ea-8af0-06f5d2fdd56c',
      '92b7da06-b577-11ea-8af0-06f5d2fdd56c',
      'a8d88c56-b577-11ea-8af0-06f5d2fdd56c',
      '246e6619-ba4c-11ea-8af0-06f5d2fdd56c',
      '38f9c8c5-ba4c-11ea-8af0-06f5d2fdd56c',
      '9d7af1df-bba7-11ea-8af0-06f5d2fdd56c',
      'f6e82ec8-bba7-11ea-8af0-06f5d2fdd56c',
      '550c8e03-bba8-11ea-8af0-06f5d2fdd56c',
      '7035838e-bba8-11ea-8af0-06f5d2fdd56c',
      'ce9031e8-bba8-11ea-8af0-06f5d2fdd56c',
      '4105aad6-bbaa-11ea-8af0-06f5d2fdd56c',
      '38ae8008-bba7-11ea-8af0-06f5d2fdd56c',
      '534a8cea-bd71-11ea-8af0-06f5d2fdd56c',
      '469eda18-c604-11ea-8854-06f5d2fdd56c',
      '6eb31256-c604-11ea-8854-06f5d2fdd56c',
      '07a14fbc-c605-11ea-8854-06f5d2fdd56c',
      '27f7a0a7-cb99-11ea-9f39-06c21fae3484']
  
      var found = c.indexOf(id);
  
      if(found < 0){
        return false;
      }
  
      return true;
    }
  
    function isMobile(){
      return ('ontouchstart' in document.documentElement && navigator.userAgent.match(/Mobi/))
    }
  
    function stringifyQs(qs){
      var str = []
      for(var i in qs){
        str.push(i+'='+qs[i])
      }
      return str.join('&')
    }
  
    var publicApi = {
      iframe: null,
      isMobile: isMobile,
      url: getUrl,
      show: function(options){
  
        if(options && options.campaignId && findCampaign(options.campaignId)){
          return false;
        }
  
        if(this.iframe){
          this.remove() // remove if already exists
        }
  
        this.iframe = createIframe(options);
  
        document.body.style.overflow = 'hidden';
        document.body.style.height = '100vh';
        document.documentElement.style.overflow = 'hidden';
        document.documentElement.style.height = '100vh';
        window.scrollTo(0, 0);
        document.documentElement.appendChild(this.iframe);
        return true
      },
      remove: function(){
        if(!this.iframe){
          console.log('Iframe nao foi aberto para ser removido')
          return false
        }
  
        document.body.style.overflow = 'initial';
        document.body.style.height = 'initial';
        document.documentElement.style.overflow = 'initial';
        document.documentElement.style.height = 'initial';
        document.documentElement.removeChild(this.iframe)
        this.iframe = null
        return true
      },
      // eventos que sao recebidos do iframe
      events: {
        onclose: function(){
          publicApi.remove()
        }
      }
    }
  
    // listen for iframe communication
    window.addEventListener("message", function(event){
      var ev;
  
      try {
        ev = JSON.parse(event.data);
  
        if(ev.widgetEvent && ev.widgetEvent instanceof Array && ev.widgetEvent.length > 0){
          var args = ev.widgetEvent,
              fnName = 'on' + args[0];
  
          args.splice(0, 1);
  
          if(typeof publicApi.events[fnName] == 'function'){
            publicApi.events[fnName].apply(self, args);
          }else{
            console.log('DOARE: Event handler ' + fnName + ' não encontrado')
          }
        }
      }catch(e){
        // not our message
      }
    });
  
    return publicApi
  })()
  
  var Paybox = (function(){
  
    // options.organization_id, options.should_hide_price_selector, options.value, options.subscribe
    function createIframe(options){
  
      options = options || {}
      var iframe = document.createElement('iframe'),
          qs;
  
      iframe.src = getUrl(options);
      iframe.allow = "payment 'self' https://paybox.doare.org https://paybox-v2.doare.org"
  
      iframe.style.width = '100%';
      iframe.style.height = '100%';
  
      iframe.style.backgroundColor = "transparent";
      iframe.style.top = '0px'
      iframe.style.left = '0px';
      iframe.style.margin = '0px';
      iframe.style.position = 'fixed';
      iframe.style.zIndex = '2147483646';
  
      iframe.frameBorder = "0";
      iframe.allowTransparency = "true";
  
      return iframe;
    }
  
    function getUrl(options){
      var id = '';
      
      // var langParam = url.searchParams.get("lang");
  
      // var lang = langParam || options.lang || 'br';
      var lang = options.lang || 'br';
  
      if(options.profileId){
        id = ('/' + options.profileId);
      }
  
      options.referer = window.location.href;
  
      try {
        var url = new URL(window.location.href);
        var utm_source = url.searchParams.get("utm_source");
        console.log(utm_source);
        if(utm_source){
          options.source = utm_source;
        }
      } catch(e){
        console.log(e);
      }
      
  
      if(options.referer){
        options.referer = options.referer.toString().split("/?", 1);
        options.referer = options.referer.toString().split("?", 1);
        options.referer = options.referer.toString().split("#", 1);
      }
  
     
      if(options.sourceURL) {
  
        options.sourceURL = options.sourceURL.toString().split("/?", 1);
        options.sourceURL = options.sourceURL.toString().split("?", 1);
        options.sourceURL = options.sourceURL.toString().split("#?", 1);
        options.sourceURL = options.sourceURL.toString().split("/#", 1);
        options.sourceURL = options.sourceURL.toString().split("#", 1);
  
      }
  
     
  
  
      return '//paybox-v2.doare.org/'+lang+'/paybox' + id + '?' + stringifyQs(options)
    }
  
    function findCampaign(id) {
      var c = ['af729f79-0a35-11ea-99bf-06787f1b93fc',
      '050b8117-0a37-11ea-99bf-06787f1b93fc',
      '8d04eb5a-0a37-11ea-99bf-06787f1b93fc',
      'fcdbe1d9-0a37-11ea-99bf-06787f1b93fc',
      'c709534d-0a38-11ea-99bf-06787f1b93fc',
      '653415b3-0a39-11ea-99bf-06787f1b93fc',
      '15596d7e-0a3a-11ea-99bf-06787f1b93fc',
      '810603d2-0a3a-11ea-99bf-06787f1b93fc',
      '33df6567-0a3b-11ea-99bf-06787f1b93fc',
      'a870de8a-0bcb-11ea-99bf-06787f1b93fc',
      'be2551ad-0a3b-11ea-99bf-06787f1b93fc',
      '459b3214-0b9b-11ea-99bf-06787f1b93fc',
      '6ddc774f-0b9c-11ea-99bf-06787f1b93fc',
      '7d5263f8-0a3c-11ea-99bf-06787f1b93fc',
      'd823922f-0a3e-11ea-99bf-06787f1b93fc',
      '640c230d-0a3f-11ea-99bf-06787f1b93fc',
      'ffaea6e1-0a3f-11ea-99bf-06787f1b93fc',
      'a79b85de-0a40-11ea-99bf-06787f1b93fc',
      'dd27dcda-0a41-11ea-99bf-06787f1b93fc',
      'a86f86dc-0b9d-11ea-99bf-06787f1b93fc',
      '61273ebb-0b9e-11ea-99bf-06787f1b93fc',
      '5aafca67-0b9f-11ea-99bf-06787f1b93fc',
      '501479ce-0ba0-11ea-99bf-06787f1b93fc',
      '85a9dae1-0ba1-11ea-99bf-06787f1b93fc',
      '963552d4-0ba2-11ea-99bf-06787f1b93fc',
      '628f0e32-0a41-11ea-99bf-06787f1b93fc',
      'af292747-0ba3-11ea-99bf-06787f1b93fc',
      '7c9d7e61-0ba4-11ea-99bf-06787f1b93fc',
      '186907a8-0ba5-11ea-99bf-06787f1b93fc',
      'ffe00867-0ba5-11ea-99bf-06787f1b93fc',
      '522e4e56-0ba7-11ea-99bf-06787f1b93fc',
      '0c34324f-0ba8-11ea-99bf-06787f1b93fc',
      'b7c503bd-0ba8-11ea-99bf-06787f1b93fc',
      '2f7fa161-0ba9-11ea-99bf-06787f1b93fc',
      'a8a513f9-0ba9-11ea-99bf-06787f1b93fc',
      '4fb78a78-0baa-11ea-99bf-06787f1b93fc',
      '92b78348-0baa-11ea-99bf-06787f1b93fc',
      '14a51069-0bab-11ea-99bf-06787f1b93fc',
      '33bb7dd3-1e3e-11e9-bdef-06f68befd9da',
      'd498edf6-0bab-11ea-99bf-06787f1b93fc',
      '027f143e-0bac-11ea-99bf-06787f1b93fc',
      '538b86bb-0bac-11ea-99bf-06787f1b93fc',
      '7af587f8-0bac-11ea-99bf-06787f1b93fc',
      'f10a4b9a-0bac-11ea-99bf-06787f1b93fc',
      '670cf0f2-0bad-11ea-99bf-06787f1b93fc',
      'de6c4f61-0bad-11ea-99bf-06787f1b93fc',
      'e62d0c4a-0bca-11ea-99bf-06787f1b93fc',
      '1957636d-0baf-11ea-99bf-06787f1b93fc',
      '97be41c9-0baf-11ea-99bf-06787f1b93fc',
      'c87a8469-0bb9-11ea-99bf-06787f1b93fc',
      'e1ae3980-0bbe-11ea-99bf-06787f1b93fc',
      'f62c1732-0bbf-11ea-99bf-06787f1b93fc',
      'a02fcfd6-0bc0-11ea-99bf-06787f1b93fc',
      '32ac2309-0bc1-11ea-99bf-06787f1b93fc',
      '3a6f0b9c-0bc2-11ea-99bf-06787f1b93fc',
      '3e678d8e-0bc3-11ea-99bf-06787f1b93fc',
      '21f74051-0bc4-11ea-99bf-06787f1b93fc',
      'abe8dcb1-0bc4-11ea-99bf-06787f1b93fc',
      '15cadc7e-0bc5-11ea-99bf-06787f1b93fc',
      '738d5625-0bc5-11ea-99bf-06787f1b93fc',
      '2a6e3ba0-0bc6-11ea-99bf-06787f1b93fc',
      'e0559969-0bc6-11ea-99bf-06787f1b93fc',
      '8be4bdfd-0bc7-11ea-99bf-06787f1b93fc',
      '1143a346-0bc8-11ea-99bf-06787f1b93fc',
      '4bf6c1d6-0bc9-11ea-99bf-06787f1b93fc',
      '29b72597-0bca-11ea-99bf-06787f1b93fc',
      'c4d42ca8-0bb5-11ea-99bf-06787f1b93fc',
      '1d271141-0bb4-11ea-99bf-06787f1b93fc',
      'f09b8614-0bb2-11ea-99bf-06787f1b93fc',
      '410337a9-0bb1-11ea-99bf-06787f1b93fc',
      '39977cfb-0baf-11ea-99bf-06787f1b93fc',
      'd09864fd-0bad-11ea-99bf-06787f1b93fc',
      '83d407d9-0bac-11ea-99bf-06787f1b93fc',
      '6bcc438e-0bab-11ea-99bf-06787f1b93fc',
      '4e5779ec-0baa-11ea-99bf-06787f1b93fc',
      'df8f79bd-0c82-11ea-99bf-06787f1b93fc',
      '65c1b491-0c83-11ea-99bf-06787f1b93fc',
      'a95a7768-0c83-11ea-99bf-06787f1b93fc',
      '13e3d04f-1224-11ea-99bf-06787f1b93fc',
      '6d01ee9b-1224-11ea-99bf-06787f1b93fc',
      'b08c698d-2348-11ea-99bf-06787f1b93fc',
      '9f605437-1604-11ea-99bf-06787f1b93fc',
      '1a44d264-1225-11ea-99bf-06787f1b93fc',
      'd6d1e3da-1604-11ea-99bf-06787f1b93fc',
      'b013e56d-1225-11ea-99bf-06787f1b93fc',
      '738d5625-0bc5-11ea-99bf-06787f1b93fc',
      'ecaf7fe1-1225-11ea-99bf-06787f1b93fc',
      '0a7584d4-1226-11ea-99bf-06787f1b93fc',
      '3e99e70c-1226-11ea-99bf-06787f1b93fc',
      'b77fbd80-1226-11ea-99bf-06787f1b93fc',
      '8045250f-1c1b-11ea-99bf-06787f1b93fc',
      '070b0603-1227-11ea-99bf-06787f1b93fc',
      'f2764111-1cf1-11ea-99bf-06787f1b93fc',
      '7b2ab741-1c35-11ea-99bf-06787f1b93fc',
      '9881dff6-200b-11ea-99bf-06787f1b93fc',
      'd3bf3c80-1c35-11ea-99bf-06787f1b93fc',
      'c6b4ba93-1ba1-11ea-99bf-06787f1b93fc',
      '5c456233-1c36-11ea-99bf-06787f1b93fc',
      'e9be4497-1ba1-11ea-99bf-06787f1b93fc',
      '3fa9b8a5-1ba2-11ea-99bf-06787f1b93fc',
      '65064e2e-1dc9-11ea-99bf-06787f1b93fc',
      '663231d9-1ba2-11ea-99bf-06787f1b93fc',
      '8889f254-1227-11ea-99bf-06787f1b93fc',
      'ad8580df-1227-11ea-99bf-06787f1b93fc',
      '6d7dc406-1cf2-11ea-99bf-06787f1b93fc',
      '4c7b679f-12f1-11ea-99bf-06787f1b93fc',
      'dc9014fc-1227-11ea-99bf-06787f1b93fc',
      'fe1a7c4e-1227-11ea-99bf-06787f1b93fc',
      '9e56adf8-16d3-11ea-99bf-06787f1b93fc',
      '1df5288a-1228-11ea-99bf-06787f1b93fc',
      'cbfd4cc8-16d3-11ea-99bf-06787f1b93fc',
      '7b8cc4b5-1228-11ea-99bf-06787f1b93fc',
      'e14d3c78-12db-11ea-99bf-06787f1b93fc',
      'df315091-1228-11ea-99bf-06787f1b93fc',
      '0e2b98f0-1229-11ea-99bf-06787f1b93fc',
      '39835f6b-1229-11ea-99bf-06787f1b93fc',
      '579c55a1-1229-11ea-99bf-06787f1b93fc',
      'a60158b4-1229-11ea-99bf-06787f1b93fc',
      '4215df86-2ef0-11ea-99bf-06787f1b93fc',
      'c7cfad8a-1229-11ea-99bf-06787f1b93fc',
      '059b4dca-122a-11ea-99bf-06787f1b93fc',
      '59aefb41-12f3-11ea-99bf-06787f1b93fc',
      '853a5606-12f3-11ea-99bf-06787f1b93fc',
      '451a56ab-1611-11ea-99bf-06787f1b93fc',
      'c154efdf-16d4-11ea-99bf-06787f1b93fc',
      '2dfc4067-1605-11ea-99bf-06787f1b93fc',
      '260aff04-122c-11ea-99bf-06787f1b93fc',
      '75add2ce-1605-11ea-99bf-06787f1b93fc',
      '9800c062-16d4-11ea-99bf-06787f1b93fc',
      'c5f16953-1772-11ea-99bf-06787f1b93fc',
      '8af6d313-1c1c-11ea-99bf-06787f1b93fc',
      'c399c71a-1c1c-11ea-99bf-06787f1b93fc',
      '0320195c-122d-11ea-99bf-06787f1b93fc',
      '2b50fa2e-122d-11ea-99bf-06787f1b93fc',
      '47b57340-122d-11ea-99bf-06787f1b93fc',
      '7e008834-122d-11ea-99bf-06787f1b93fc',
      '12080da3-16d5-11ea-99bf-06787f1b93fc',
      '25320f5d-1608-11ea-99bf-06787f1b93fc',
      '10b9fdd4-1609-11ea-99bf-06787f1b93fc',
      '5e0e19d8-1609-11ea-99bf-06787f1b93fc',
      'ed73b139-200e-11ea-99bf-06787f1b93fc',
      '87f50f98-12f2-11ea-99bf-06787f1b93fc',
      'cba26c0b-12f2-11ea-99bf-06787f1b93fc',
      '84cd54e7-160a-11ea-99bf-06787f1b93fc',
      'b04f4f82-1cf2-11ea-99bf-06787f1b93fc',
      'dd1bf514-122e-11ea-99bf-06787f1b93fc',
      '0bcfaddb-122f-11ea-99bf-06787f1b93fc',
      '1840c955-160a-11ea-99bf-06787f1b93fc',
      '3e5345f0-122f-11ea-99bf-06787f1b93fc',
      '5e558dfd-122f-11ea-99bf-06787f1b93fc',
      '7b9d4f49-122f-11ea-99bf-06787f1b93fc',
      '94baa7e8-122f-11ea-99bf-06787f1b93fc',
      '1c16fd9e-1230-11ea-99bf-06787f1b93fc',
      'e28bb75c-160a-11ea-99bf-06787f1b93fc',
      '4136f762-392e-11ea-86fb-06787f1b93fc',
      '71b3a5d3-1827-11ea-99bf-06787f1b93fc',
      '19000a0e-160b-11ea-99bf-06787f1b93fc',
      '4a958fda-1230-11ea-99bf-06787f1b93fc',
      'e4563f46-1230-11ea-99bf-06787f1b93fc',
      'e11b53c8-1cf2-11ea-99bf-06787f1b93fc',
      '151dfb31-1231-11ea-99bf-06787f1b93fc',
      '3cafcf5d-1231-11ea-99bf-06787f1b93fc',
      'c76f4dee-3159-11ea-99bf-06787f1b93fc',
      'a8903405-1231-11ea-99bf-06787f1b93fc',
      'c8384d95-1231-11ea-99bf-06787f1b93fc',
      'eededbef-1231-11ea-99bf-06787f1b93fc',
      '137f9e6d-1232-11ea-99bf-06787f1b93fc',
      'd82c2aa1-1237-11ea-99bf-06787f1b93fc',
      '318be624-1238-11ea-99bf-06787f1b93fc',
      '53ebd8aa-1238-11ea-99bf-06787f1b93fc',
      '19ba395c-1239-11ea-99bf-06787f1b93fc',
      '60b1239c-1239-11ea-99bf-06787f1b93fc',
      '193eda9c-123a-11ea-99bf-06787f1b93fc',
      '8a65e7d5-160b-11ea-99bf-06787f1b93fc',
      '210c63fd-160e-11ea-99bf-06787f1b93fc',
      'c9d7f7c9-20f2-11ea-99bf-06787f1b93fc',
      '59102fda-16d5-11ea-99bf-06787f1b93fc',
      'c35cc671-160e-11ea-99bf-06787f1b93fc',
      '43083843-1827-11ea-99bf-06787f1b93fc',
      '4a8fecf2-1cea-11ea-99bf-06787f1b93fc',
      '388b7d4d-160f-11ea-99bf-06787f1b93fc',
      '5fd96469-160f-11ea-99bf-06787f1b93fc',
      '59d67910-123a-11ea-99bf-06787f1b93fc',
      'f824cd11-123a-11ea-99bf-06787f1b93fc',
      'ff57f731-1c1f-11ea-99bf-06787f1b93fc',
      '27d5320d-123b-11ea-99bf-06787f1b93fc',
      '3af8e857-1610-11ea-99bf-06787f1b93fc',
      '4dd96854-123b-11ea-99bf-06787f1b93fc',
      '834a39f2-123b-11ea-99bf-06787f1b93fc',
      'baa84ca2-1610-11ea-99bf-06787f1b93fc',
      '1991cb73-2295-11ea-99bf-06787f1b93fc',
      'a5ddda3e-123b-11ea-99bf-06787f1b93fc',
      'bea1c206-123b-11ea-99bf-06787f1b93fc',
      'ec756132-16a7-11ea-99bf-06787f1b93fc',
      '2d12cf0b-123c-11ea-99bf-06787f1b93fc',
      '5a5befe2-123c-11ea-99bf-06787f1b93fc',
      '78c4b9f8-123c-11ea-99bf-06787f1b93fc',
      'a5b5ae94-123c-11ea-99bf-06787f1b93fc',
      'd378fea6-123c-11ea-99bf-06787f1b93fc',
      '13d64271-123d-11ea-99bf-06787f1b93fc',
      '70faca14-3093-11ea-99bf-06787f1b93fc',
      'ef55429d-1610-11ea-99bf-06787f1b93fc',
      'da9136c4-322a-11ea-99bf-06787f1b93fc',
      '36597066-123d-11ea-99bf-06787f1b93fc',
      '73ae3804-123d-11ea-99bf-06787f1b93fc',
      '5a5cbae1-1c21-11ea-99bf-06787f1b93fc',
      '6b842e2a-1d11-11ea-99bf-06787f1b93fc',
      '7f4c33dd-1c21-11ea-99bf-06787f1b93fc',
      'b722101f-1c21-11ea-99bf-06787f1b93fc',
      'b781bbf6-2664-11ea-99bf-06787f1b93fc',
      'd6f85e67-1c21-11ea-99bf-06787f1b93fc',
      '231a933e-21d7-11ea-99bf-06787f1b93fc',
      'be6cf238-2010-11ea-99bf-06787f1b93fc',
      '40a2ae4c-9ab3-11ea-9b93-0667b40d75bc',
      'ee56d1a4-9ad4-11ea-9b93-0667b40d75bc',
      '72b72bec-9ae1-11ea-9b93-0667b40d75bc',
      'e249f52a-9ae1-11ea-9b93-0667b40d75bc',
      '391432a5-9b6e-11ea-9b93-0667b40d75bc',
      '947bc3b9-9ae6-11ea-9b93-0667b40d75bc',
      '4cdcb799-9ae5-11ea-9b93-0667b40d75bc',
      '24da534d-9ae7-11ea-9b93-0667b40d75bc',
      '4b7fa0c1-9b70-11ea-9b93-0667b40d75bc',
      'f783bc7e-9b70-11ea-9b93-0667b40d75bc',
      '54fdd878-9b73-11ea-9b93-0667b40d75bc',
      'c643dead-9ae7-11ea-9b93-0667b40d75bc',
      'd06056d5-9b71-11ea-9b93-0667b40d75bc',
      'b92d67f1-9b72-11ea-9b93-0667b40d75bc',
      '652ea038-9b74-11ea-9b93-0667b40d75bc',
      'f1e49375-9b74-11ea-9b93-0667b40d75bc',
      '7d6f9d41-9b75-11ea-9b93-0667b40d75bc',
      '1400bd37-9b76-11ea-9b93-0667b40d75bc',
      '9e4ae8f7-9b77-11ea-9b93-0667b40d75bc',
      '6a9a2b40-9b78-11ea-9b93-0667b40d75bc',
      'f3dad881-9b78-11ea-9b93-0667b40d75bc',
      '76b5c7c7-9b79-11ea-9b93-0667b40d75bc',
      '5d4c0d38-9b7a-11ea-9b93-0667b40d75bc',
      'ec5ef79d-9b7a-11ea-9b93-0667b40d75bc',
      '8e5c6e2b-9b7b-11ea-9b93-0667b40d75bc',
      '4afef864-9b7c-11ea-9b93-0667b40d75bc',
      '494d31bd-9b7e-11ea-9b93-0667b40d75bc',
      '390598b7-9ad2-11ea-9b93-0667b40d75bc',
      '3b880d25-9f80-11ea-9b93-0667b40d75bc',
      '55a9d518-a40d-11ea-9b93-0667b40d75bc',
      'da17fb10-b013-11ea-9b93-0667b40d75bc',
      '624615fd-b15f-11ea-a6c9-0667b40d75bc',
      '8460846c-b15f-11ea-a6c9-0667b40d75bc',
      '167c98db-b160-11ea-a6c9-0667b40d75bc',
      '3c61d3ee-b160-11ea-a6c9-0667b40d75bc',
      '58313257-b160-11ea-a6c9-0667b40d75bc',
      '70a24944-b160-11ea-a6c9-0667b40d75bc',
      '8faf90be-b160-11ea-a6c9-0667b40d75bc',
      'a97a8001-b160-11ea-a6c9-0667b40d75bc',
      'c61261a5-b160-11ea-a6c9-0667b40d75bc',
      '1d05604d-b161-11ea-a6c9-0667b40d75bc',
      '9a2ab751-b161-11ea-a6c9-0667b40d75bc',
      'd43de190-b161-11ea-a6c9-0667b40d75bc',
      'accccdbd-b15f-11ea-a6c9-0667b40d75bc',
      '25caf32a-b577-11ea-8af0-06f5d2fdd56c',
      '92b7da06-b577-11ea-8af0-06f5d2fdd56c',
      'a8d88c56-b577-11ea-8af0-06f5d2fdd56c',
      '246e6619-ba4c-11ea-8af0-06f5d2fdd56c',
      '38f9c8c5-ba4c-11ea-8af0-06f5d2fdd56c',
      '9d7af1df-bba7-11ea-8af0-06f5d2fdd56c',
      'f6e82ec8-bba7-11ea-8af0-06f5d2fdd56c',
      '550c8e03-bba8-11ea-8af0-06f5d2fdd56c',
      '7035838e-bba8-11ea-8af0-06f5d2fdd56c',
      'ce9031e8-bba8-11ea-8af0-06f5d2fdd56c',
      '4105aad6-bbaa-11ea-8af0-06f5d2fdd56c',
      '38ae8008-bba7-11ea-8af0-06f5d2fdd56c',
      '534a8cea-bd71-11ea-8af0-06f5d2fdd56c',
      '469eda18-c604-11ea-8854-06f5d2fdd56c',
      '6eb31256-c604-11ea-8854-06f5d2fdd56c',
      '07a14fbc-c605-11ea-8854-06f5d2fdd56c',
      '27f7a0a7-cb99-11ea-9f39-06c21fae3484']
  
      var found = c.indexOf(id);
  
      if(found < 0){
        return false;
      }
  
      return true;
    }
  
    function isMobile(){
      return ('ontouchstart' in document.documentElement && navigator.userAgent.match(/Mobi/))
    }
  
    function stringifyQs(qs){
      var str = []
      for(var i in qs){
        str.push(i+'='+qs[i])
      }
      return str.join('&')
    }
  
    var publicApi = {
      iframe: null,
      isMobile: isMobile,
      url: getUrl,
      show: function(options){
  
        if(options && options.campaignId && findCampaign(options.campaignId)){
          return false;
        }
  
        if(this.iframe){
          this.remove() // remove if already exists
        }
  
        this.iframe = createIframe(options);
  
        document.body.style.overflow = 'hidden';
        document.body.style.height = '100vh';
        document.documentElement.style.overflow = 'hidden';
        document.documentElement.style.height = '100vh';
        window.scrollTo(0, 0);
        document.documentElement.appendChild(this.iframe);
        return true
      },
      remove: function(){
        if(!this.iframe){
          console.log('Iframe nao foi aberto para ser removido')
          return false
        }
  
        document.body.style.overflow = 'initial';
        document.body.style.height = 'initial';
        document.documentElement.style.overflow = 'initial';
        document.documentElement.style.height = 'initial';
        document.documentElement.removeChild(this.iframe)
        this.iframe = null
        return true
      },
      // eventos que sao recebidos do iframe
      events: {
        onclose: function(){
          publicApi.remove()
        }
      }
    }
  
    // listen for iframe communication
    window.addEventListener("message", function(event){
      var ev;
  
      try {
        ev = JSON.parse(event.data);
  
        if(ev.widgetEvent && ev.widgetEvent instanceof Array && ev.widgetEvent.length > 0){
          var args = ev.widgetEvent,
              fnName = 'on' + args[0];
  
          args.splice(0, 1);
  
          if(typeof publicApi.events[fnName] == 'function'){
            publicApi.events[fnName].apply(self, args);
          }else{
            console.log('DOARE: Event handler ' + fnName + ' não encontrado')
          }
        }
      }catch(e){
        // not our message
      }
    });
  
    return publicApi
  })()