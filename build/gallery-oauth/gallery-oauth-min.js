YUI.add("gallery-oauth",function(D){var A="http://oauth.googlecode.com/svn/code/javascript/",C=["oauth","sha1"],B=0;if(!YUI.Env.oauthLoaded){D.each(C,function(E){var F=A+E+".js";D.Get.script(F,{onSuccess:function(){B++;if(B===C.length){YUI.Env.oauthLoaded=true;D.oAuth.fire();}}});});}D.namespace("oAuth");D.oAuth={fire:function(){D.each(D.oAuth._items,function(F,E){F();delete D.oAuth._items[E];});},ready:function(E){if(YUI.Env.oauthLoaded){E();}else{D.oAuth._items.push(E);}},_items:[],signURL:function(N,J,F){var K={consumerSecret:J,tokenSecret:""},L="",H="",E="",G="",I="",O,M,Q,P={action:F,method:"GET",parameters:[["oauth_version","1.0"],["oauth_consumer_key",N]]};OAuth.setTimestampAndNonce(P);OAuth.SignatureMethod.sign(P,K);E=OAuth.getParameterMap(P);H=OAuth.decodeForm(OAuth.SignatureMethod.getBaseString(P));if(E.parameters){D.each(E.parameters,function(R){D.each(R,function(S){if(S=="oauth_signature"){G=R[1];}});});}Q=H[2][0].split("&");Q.push("oauth_signature="+G);Q.sort(function(S,R){if(S[0]<R[0]){return -1;}if(S[0]>R[0]){return 1;}if(S[1]<R[1]){return -1;}if(S[1]>R[1]){return 1;}return 0;});D.each(Q,function(S,R){I+=Q[R]+"&";});L=H[1][0]+"?"+I.slice(0,I.length-1);return L;}};if(D.YQLRequest){D.YQLRequest.prototype._send=D.YQLRequest.prototype.send;D.YQLRequest.prototype.send=function(){if(this._params.key&&this._params.secret){if(!this._opts){this._opts={};}this._opts.key=this._params.key;this._opts.secret=this._params.secret;delete this._params.key;delete this._params.secret;if(this._params.base){this._opts.base=this._params.base;delete this._params.base;}if(D.Lang.isFunction(this._callback)){this._callback={on:{success:this._callback}};}this._callback.format=D.bind(function(E,F){return D.oAuth.signURL(this._opts.key,this._opts.secret,(E+"callback="+F));},this);}this._send();};}},"gallery-2010.08.11-20-39",{requires:["jsonp"],optional:["yql"]});