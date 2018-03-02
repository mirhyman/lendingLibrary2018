if (self.CavalryLogger) { CavalryLogger.start_js(["Se6Hb"]); }

__d("TimelineCapsule",["csx","Arbiter","CSS","DataStore","DOM","DOMQuery","DOMScroll","FbFeedKeyboardController","Parent","TimelineConstants","TimelineLegacySections","Vector","$","queryThenMutateDOM"],(function a(b,c,d,e,f,g,h){__p&&__p();var i=function(){__p&&__p();var j={},k={},l=false;function m(o){__p&&__p();c("DOMQuery").scry(o,"._3ram").forEach(function(p){__p&&__p();var q,r=p.getAttribute("data-endmarker"),s=p.getAttribute("data-pageindex"),t=function t(){if(!p.parentNode)return;c("DataStore").set(c("TimelineConstants").DS_LOADED,o.id,s);c("DOM").remove(p);c("Arbiter").inform(c("TimelineConstants").SECTION_FULLY_LOADED,{scrubberKey:r,pageIndex:s,capsuleID:o.id,childCount:o.childNodes.length})};if(c("TimelineLegacySections").get(r))t();else(function(){var u=c("Arbiter").subscribe(c("TimelineConstants").SECTION_REGISTERED,function(v,w){if(w.scrubberKey===r){t();u.unsubscribe()}})})()});c("Arbiter").inform("TimelineCapsule/balanced",{capsule:o});if(!l){l=true;c("FbFeedKeyboardController").init(o)}}function n(o,p){var q=c("Parent").byAttribute(o,"data-size");if(q)if(c("CSS").hasClass(o.parentNode,"timelineReportContent"))p(o);else p(q)}return{removeUnit:function o(p){n(p,function(q){c("DOM").remove(q)})},removeUnitWithID:function o(p){i.removeUnit(c("$")(p))},hideUnit:function o(p){n(p,function(q){c("CSS").addClass(q,"fbTimelineColumnHidden")})},undoHideUnit:function o(p,q){c("DOM").remove(c("Parent").byClass(q,"hiddenText"));n(p,function(r){c("CSS").removeClass(r,"fbTimelineColumnHidden")})},unplacehold:function o(p){var q=c("$")(p);q.style.top=null;c("CSS").removeClass(q,"visiblePlaceholder");c("CSS").removeClass(q,"placeholder");var r=c("Parent").byClass(q,"fbTimelineCapsule");delete j[r.id][p];i.balanceCapsule(r)},scrollToCapsule:function o(p){if(!Object.prototype.hasOwnProperty.call(k,p.id)){var q=c("Vector").getElementPosition(p.parentNode);c("DOMScroll").scrollTo(new(c("Vector"))(c("Vector").getScrollPosition().x,q.y-c("TimelineConstants").SCROLL_TO_OFFSET,"document"));k[p.id]=true}},loadTwoColumnUnits:function o(p,q,r){var s=c("$")(p);c("queryThenMutateDOM")(function(){var t=c("Parent").byClass(s,"fbTimelineSection");if(t&&!q){var u=c("DOMQuery").find(s,"._2t4u"),v=c("DOMQuery").find(s,"._2t4v"),w=v.offsetHeight-u.offsetHeight;c("DataStore").set(c("TimelineConstants").DS_COLUMN_HEIGHT_DIFFERENTIAL,r,w)}},m.bind(null,s))}}}();f.exports=i}),null);
__d("TimelineStickyHeader",["Animation","Arbiter","BlueBar","Bootloader","CSS","DOM","DOMQuery","Event","ProfileTabConst","ProfileTabUtils","ProfileTimelineUILogger","Style","TimelineComponentKeys","TimelineController","Vector","ViewportBounds","UITinyViewportAction","ge","getOrCreateDOMID","queryThenMutateDOM"],(function a(b,c,d,e,f,g){__p&&__p();var h=200,i=358,j=48,k=false,l=false,m=void 0,n=void 0,o=void 0,p=void 0,q=false,r=0,s=void 0,t=void 0,u={},v={VISIBLE:"TimelineStickyHeader/visible",ADJUST_WIDTH:"TimelineStickyHeader/adjustWidth",init:function w(x){__p&&__p();if(k)return;k=true;m=x;n=c("DOM").find(x,"div.name");o=c("DOM").find(x,"div.actions");l=c("CSS").hasClass(x,"fbTimelineStickyHeaderVisible");var y=void 0,z=false,A=true;c("queryThenMutateDOM")(function(){var B=c("BlueBar").getBar();if(B.offsetTop&&!c("ge")("page_admin_panel")&&c("TimelineController").getCurrentKey()!==c("ProfileTabConst").TIMELINE){y=c("Vector").tElementDimensions(B).y;z=true}A=c("BlueBar").hasFixedBlueBar()},function(){if(z)c("Bootloader").loadModules(["StickyController"],function(B){new B(x,y).start()},"TimelineStickyHeader");else c("CSS").addClass(x,"fixed_elem");if(!A)c("CSS").addClass(x,"fbTimelineStickyHeaderNonFixedBlueBar");v.updateBounds(l);v.toggleVisibilityOnFocus();c("TimelineController").register(c("TimelineComponentKeys").STICKY_HEADER,v)},"TimelineStickyHeader/init")},reset:function w(){k=false;l=false;m=null;n=null;o=null;u={};p.remove();p=null},toggleVisibilityOnFocus:function w(){c("Event").listen(m,"focusin",function(){this.toggle(true)}.bind(this));c("Event").listen(m,"focusout",function(event){var x=event.relatedTarget||null;if(!c("DOMQuery").contains(m,x))this.toggle(false)}.bind(this))},handleTabChange:function w(x){r=c("ProfileTabUtils").isTimelineTab(x)?i-j:0;if(!c("ProfileTabUtils").tabHasStickyHeader(x)){this.toggle(false,function(){return c("CSS").hide(m)});return}c("CSS").show(m)},updateBounds:function w(){c("queryThenMutateDOM")(function(){s=m.offsetTop;t=m.scrollHeight},function(){p=c("ViewportBounds").addTop(function(){return l?s+t:0})},"TimelineStickyHeader/init")},check:function w(x){if(c("UITinyViewportAction").isTiny()){this.toggle(false);return}var y=r===0||x>=r;this.toggle(y)},toggle:function w(x,y){__p&&__p();if(x===l){y&&y();return}var z=x?s-t:s,A=x?s:s-t;c("Style").set(m,"top",z+"px");c("CSS").addClass(m,"fbTimelineStickyHeaderAnimating");var B=c("getOrCreateDOMID")(m);u[B]&&u[B].stop();u[B]=new(c("Animation"))(m).from("top",z).to("top",A).duration(h).ondone(function(){__p&&__p();u[B]=null;if(x&&!q){c("ProfileTimelineUILogger").logStickyHeaderImpression();q=true}c("queryThenMutateDOM")(null,function(){c("CSS").conditionClass(m,"fbTimelineStickyHeaderHidden",!x);m.setAttribute("aria-hidden",x?"false":"true");c("CSS").removeClass(m,"fbTimelineStickyHeaderAnimating");c("Style").set(m,"top","");v.updateBounds();c("Arbiter").inform(v.VISIBLE,x);y&&y()})}).go();l=x;if(l)v.adjustWidth()},adjustWidth:function w(){c("Arbiter").inform(v.ADJUST_WIDTH,n,c("Arbiter").BEHAVIOR_STATE)},getRoot:function w(){return m},setActions:function w(x){if(k&&x){c("DOM").setContent(o,x);o=x}}};f.exports=b.TimelineStickyHeader||v}),null);
__d("ButtonGroup",["CSS","DataStore","Parent"],(function a(b,c,d,e,f,g){__p&&__p();var h="firstItem",i="lastItem";function j(o,p){var q=c("Parent").byClass(o,p);if(!q)throw new Error("invalid use case");return q}function k(o){return c("CSS").shown(o)&&Array.from(o.childNodes).some(c("CSS").shown)}function l(o){__p&&__p();var p,q,r;Array.from(o.childNodes).forEach(function(s){r=k(s);c("CSS").removeClass(s,h);c("CSS").removeClass(s,i);c("CSS").conditionShow(s,r);if(r){p=p||s;q=s}});p&&c("CSS").addClass(p,h);q&&c("CSS").addClass(q,i);c("CSS").conditionShow(o,p)}function m(o,p){var q=j(p,"uiButtonGroupItem");o(q);l(q.parentNode)}function n(o){"use strict";this._root=j(o,"uiButtonGroup");c("DataStore").set(this._root,"ButtonGroup",this);l(this._root)}n.getInstance=function(o){"use strict";var p=j(o,"uiButtonGroup"),q=c("DataStore").get(p,"ButtonGroup");return q||new n(p)};Object.assign(n.prototype,{hideItem:m.bind(null,c("CSS").hide),showItem:m.bind(null,c("CSS").show),toggleItem:m.bind(null,c("CSS").toggle)});f.exports=n}),null);
__d("TimelineStickyHeaderNav",["Arbiter","BlueBar","ButtonGroup","CSS","DataStore","DateStrings","DOM","Event","Parent","ProfileTimelineUILogger","SelectorDeprecated","Style","SubscriptionsHandler","TimelineComponentKeys","TimelineConstants","TimelineController","UITinyViewportAction","URI","Vector","queryThenMutateDOM"],(function a(b,c,d,e,f,g){__p&&__p();var h=false,i=void 0,j=void 0,k=void 0,l=void 0,m=void 0,n=void 0,o=void 0,p=void 0,q=void 0,r=void 0,s=void 0,t={},u={},v=[],w=false,x=[],y=[],z=void 0,A=80;function B(){var O=c("SelectorDeprecated").getSelectorMenu(m);z.addSubscriptions(c("Event").listen(O,"click",C),c("Arbiter").subscribe(c("TimelineConstants").SECTION_REGISTERED,E))}function C(event){var O=c("Parent").byTag(event.getTarget(),"a"),P=O&&c("DataStore").get(O,"key");if(P){c("TimelineController").stickyHeaderNavWasClicked(P);c("TimelineController").navigateToSection(P);c("ProfileTimelineUILogger").logStickyHeaderScrubberClick(P);event.prevent()}}function D(O){if(r===O&&Object.prototype.hasOwnProperty.call(p,O)&&!j.custom_subsection_menu)J(O);else F();c("TimelineController").adjustStickyHeaderWidth()}function E(O,P){__p&&__p();var Q=P.section,R=Q&&Q.getParentKey();if(!R)return;var S=I(R),T=c("TimelineController").getCurrentScrubber(),U=Q.getScrubberKey(),V=T?T.getLabelForSubnav(R,U):V=G(U);if(V){if(!Object.prototype.hasOwnProperty.call(p,U))p[R]=[];K(S,{key:U,label:V,sectionKey:R,month:H(U)});D(R)}}function F(){if(k)k.hideItem(n)}function G(O){var P=H(O);return c("DateStrings").getMonthName(P)}function H(O){var P=O.split("_");return parseInt(P.pop(),10)}function I(O){var P=o[O];if(!P){P=o[O]=n.cloneNode(true);var Q=c("DOM").scry(P,"li.activityLog a")[0];if(Q)Q.href=new(c("URI"))(Q.href).addQueryData({key:O});z.addSubscriptions(c("Event").listen(P,"click",C))}return P}function J(O){var P=I(O);c("DOM").insertAfter(n,P);c("CSS").hide(n);for(var Q in o){var R=o[Q];c("CSS").conditionShow(R,R===P)}if(k)k.showItem(n)}function K(O,P){__p&&__p();var Q=c("DOM").create("a",{href:"#",rel:"ignore",className:"itemAnchor",tabIndex:0},c("DOM").create("span",{className:"itemLabel fsm"},P.label));Q.setAttribute("data-key",P.key);Q.setAttribute("aria-checked",false);var R=c("DOM").create("li",{className:"uiMenuItem uiMenuItemRadio uiSelectorOption"},Q);R.setAttribute("data-label",P.label);var S=c("DOM").find(O,"ul.uiMenuInner"),T=c("DOM").create("option",{value:P.key},P.label),U=c("DOM").find(O,"select");if(P.key==="recent"){c("DOM").prependContent(S,R);c("DOM").insertAfter(U.options[0],T)}else if(P.sectionKey!==undefined&&P.sectionKey!==null&&P.month!==undefined&&P.month!==null){var V=p[P.sectionKey];if(V.length<1){c("DOM").appendContent(S,R);c("DOM").appendContent(U,T)}else{var W=null;V.forEach(function(X,Y){if(Y<P.month)W=X});if(W!==null){c("DOM").insertAfter(W.menuItem,R);c("DOM").insertAfter(W.selectOption,T)}else{c("DOM").insertBefore(V[0].menuItem,R);c("DOM").insertBefore(V[0].selectOption,T)}}V[P.month]={menuItem:R,selectOption:T}}else{c("DOM").appendContent(S,R);c("DOM").appendContent(U,T)}}function L(O,P){__p&&__p();var Q=c("DOM").scry(O,"li.uiMenuItem");if(!Q)return;for(var R=0;R<Q.length;R++){var S=Q[R];if(c("CSS").hasClass(S,P)||S.firstChild.getAttribute("data-key")==P){c("DOM").remove(S);break}}var T=c("DOM").find(O,"select"),U=c("DOM").scry(T,"option");for(var V=0;V<U.length;V++)if(U[V].value===P){c("DOM").remove(U[V]);return}}function M(event){var O=c("Parent").byClass(event.target,"itemAnchor");if(O){var P=c("DataStore").get(O,"tab-key");if(P)c("ProfileTimelineUILogger").logStickyHeaderNavItemClick(P)}}var N={init:function O(P,Q){__p&&__p();if(h)return;h=true;i=P;j=Q||{};l=c("DOM").find(i,"div.pageMenu");m=c("DOM").find(i,"div.sectionMenu");n=c("DOM").find(i,"div.subsectionMenu");s=c("DOM").find(l,"li.uiMenuSeparator");k=c("ButtonGroup").getInstance(l);z=new(c("SubscriptionsHandler"))();o={};p={};q={};N.adjustMenuHeights();B();c("TimelineController").register(c("TimelineComponentKeys").STICKY_HEADER_NAV,N);y.forEach(function(R){R()});z.addSubscriptions(c("Event").listen(l,"click",M))},reset:function O(){__p&&__p();h=false;j={};v=[];t={};u={};w=false;x=[];i=null;l=null;m=null;n=null;s=null;o={};p={};q={};z.release()},addTimePeriod:function O(P){__p&&__p();var Q=c("TimelineController").getCurrentScrubber();if(!Q)return;var R=Q.getLabelForNav(P);if(!R)return;K(m,{key:P,label:R});var S=c("DOM").find(m,"ul.uiMenuInner");if(P==="recent"||S.children.length<2)c("SelectorDeprecated").setSelected(m,P,true)},updateSection:function O(P,Q){if(Q){var R=I(P);c("SelectorDeprecated").setSelected(R,Q)}else q[P]=true;r=P;c("SelectorDeprecated").setSelected(m,P,true);D(P)},adjustMenuHeights:function O(){var P="";c("queryThenMutateDOM")(function(){if(!c("UITinyViewportAction").isTiny()){P=c("Vector").getViewportDimensions().y-c("Vector").getElementDimensions(c("BlueBar").getBar()).y-A;P+="px"}},function(){[l,m].map(function(Q){if(Q)c("Style").set(c("DOM").find(Q,"ul.uiMenuInner"),"maxHeight",P)})})},initPageMenu:function O(P,Q){__p&&__p();if(!h){y.push(N.initPageMenu.bind(null,P,Q));return}function R(S,T){S.forEach(function(U){var V=u[U]=c("DOM").create("li");c("CSS").hide(V);T?c("DOM").insertBefore(s,V):c("DOM").appendContent(c("DOM").find(l,"ul.uiMenuInner"),V)})}R(P,true);R(Q,false);t.info=c("DOM").scry(l,"li")[0];v=Q;w=true;if(x.length)x.forEach(function(S){N.registerPageMenuItem(S.key,S.item)})},registerPageMenuItem:function O(P,Q){__p&&__p();if(!w){x.push({key:P,item:Q});return}if(u[P]){c("DOM").replace(u[P],Q);t[P]=Q;delete u[P];if(v.indexOf(P)>=0)c("CSS").show(s)}},removeTimePeriod:function O(P){L(m,P)},hideSectionMenu:function O(){if(h)c("CSS").hide(m)}};f.exports=N}),null);
__d("ButtonGroupMonitor",["ContextualDialog","ContextualLayer","CSS","Layer","Parent","SelectorDeprecated","DataStore"],(function a(b,c,d,e,f,g){__p&&__p();function h(i,j){var k=c("Parent").byClass(i,"bg_stat_elem")||c("Parent").byClass(i,"uiButtonGroup");if(!k&&j)k=c("DataStore").get(j,"toggleElement",null);if(k){j&&c("DataStore").set(j,"toggleElement",k);c("CSS").toggleClass(k,"uiButtonGroupActive")}}c("Layer").subscribe(["hide","show"],function(i,j){if(j instanceof c("ContextualLayer")||j instanceof c("ContextualDialog"))h(j.getCausalElement(),j)});c("SelectorDeprecated").subscribe(["close","open"],function(i,j){h(j.selector)})}),null);