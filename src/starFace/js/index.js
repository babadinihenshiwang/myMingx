$("#camera").on("tap",function(e){e=e||event,$(".bounced").addClass("translate"),e.stopPropagation()}),$("body").on("tap",function(){$(".bounced").removeClass("translate")}),$(".bounced").on("tap",function(e){e=e||event,e.stopPropagation()});var date=new Date,time=date.getTime();wx.config({debug:!0,appId:"",timestamp:time,nonceStr:"",signature:"",jsApiList:[]}),wx.error(function(e){}),wx.checkJsApi({jsApiList:["chooseImage"],success:function(e){}}),$(".phot").on("tap",function(){wx.chooseImage({count:1,sizeType:["original","compressed"],sourceType:["camera"],success:function(e){var s=e.localIds;wx.uploadImage({localId:s,isShowProgressTips:1,success:function(e){var s=e.serverId;$.get("",{media_id:s},function(e){$(".bounced").removeClass("translate"),$(".star img").attr("src",e.src),$(".result").html(function(e){return e.name+"<br>"+e+"<br>"+e}),$(".share, .result").removeClass("hide"),$(".introduce").addClass("hide")})}})}})}),$(".came").on("tap",function(){$(".share, .result").removeClass("hide"),$(".introduce").addClass("hide"),wx.chooseImage({count:1,sizeType:["original","compressed"],sourceType:["album"],success:function(e){var s=e.localIds;wx.uploadImage({localId:s,isShowProgressTips:1,success:function(e){var s=e.serverId;$.get("",{media_id:s},function(e){$(".bounced").removeClass("translate"),$(".star img").attr("src",e.src),$(".result").html(function(e){return e.name+"<br>"+e+"<br>"+e}),$(".share, .result").removeClass("hide"),$(".introduce").addClass("hide")})}})}})}),$(".share").on("tap",function(){$("#load").removeClass("hide")}),$("#load").tap(function(){$("#load").addClass("hide")});