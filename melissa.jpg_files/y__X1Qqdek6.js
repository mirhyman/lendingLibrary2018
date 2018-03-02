if (self.CavalryLogger) { CavalryLogger.start_js(["8\/Gp3"]); }

__d("NotificationCounter",["Arbiter","CrossWindowEventEmitter","CurrentUser","DocumentTitle","FavIcon","JSLogger","MercuryConfig","MessengerEnvironment"],(function a(b,c,d,e,f,g){__p&&__p();var h=new(c("CrossWindowEventEmitter"))("JewelBase"),i={messages:0,notifications:0,requests:0},j={init:function k(){c("Arbiter").subscribe("update_title",this._handleUpdate.bind(this));c("Arbiter").subscribe("jewel/count-updated",this._handleCountUpdate.bind(this));h.addListener("count-updated",function(l){this._handleCountUpdate("",l)}.bind(this))},getCount:function k(){__p&&__p();var l=0;for(var m in i){var n=Number(i[m]);if(typeof i[m]=="string"&&isNaN(n))return i[m];if(isNaN(n)||n<0){c("JSLogger").create("jewels").error("bad_count",{jewel:m,count:i[m]});continue}l+=n}return l},updateTitle:function k(){if(c("MessengerEnvironment").messengerui)return;var l=this.getCount(),m=c("DocumentTitle").get();m=l?"("+l+") "+m:m;c("DocumentTitle").set(m,true)},_handleCountUpdate:function k(l,m){i[m.jewel]=m.count;this.updateTitle()},_handleUpdate:function k(l,m){this.updateTitle()}};f.exports=j}),null);
__d("NotificationJewelController",["Arbiter","Bootloader","Event","EventProfiler","FunnelLogger","NotificationConstants","NotificationCounter","NotificationJewelFunnelLoggingConstants","NotificationSeenState","NotificationStore","NotificationUpdates","XWorkHubController","createObjectFrom","curry","gkx","isInFocusMode","setTimeoutAcrossTransitions"],(function a(b,c,d,e,f,g){__p&&__p();var h=c("NotificationConstants").PayloadSourceType,i=c("NotificationJewelFunnelLoggingConstants").FUNNEL_LOGGING_NAME,j=c("NotificationJewelFunnelLoggingConstants").FUNNEL_LOGGING_EVENT,k=0,l=false;function m(o){var p=c("isInFocusMode")(),q=c("NotificationSeenState").getUnseenCount();c("Arbiter").inform("jewel/count-updated",{jewel:o,count:p?0:q,animation:!p&&l&&q>0?"heart":"none"},c("Arbiter").BEHAVIOR_STATE)}function n(o,p){"use strict";__p&&__p();var q=p.badgeAnimationData,r=p.endPoint,s=p.list,t=p.startTime,u=p.unseenNotifs;if(r)c("NotificationStore").registerEndpoint({endpointURI:r});c("NotificationCounter").init();var v=false,w=null,x=c("Event").listen(o.getRoot(),"mouseover",function(){if(!v){v=true;w=c("EventProfiler").notifyRunningEagerInteraction(["Notifications_Jewel_Button"],"click")}c("FunnelLogger").startFunnel(i);x&&x.remove();x=null;s.open();c("FunnelLogger").appendAction(i,j.MOUSE_OVER_ON_JEWEL)}),y=null;c("Event").listen(o.getRoot(),"mouseover",function(){y=c("setTimeoutAcrossTransitions")(function(){c("Bootloader").loadModules(["QE2Logger"],function(C){C.logExposureForUser("www_jewel_tooltip_experiment")},"NotificationJewelController");y=null},500)});c("Event").listen(o.getRoot(),"mouseout",function(){if(y)clearTimeout(y)});if(c("gkx")("AT7qvBGeY3qi4kzGsfSdDBRKoyiGhUCE2HY_OLm4gW_hIR5XTy870z-6Bh0Vp_U80-c"))c("Event").listen(o.getButton(),"click",function(C){if(C.metaKey||C.ctrlKey){var D=c("XWorkHubController").getURIBuilder().setString("ref","jewel").setString("tab","all").getURI();window.open(D,"notification_hub_tab_identifier")}});var z=false,A=o.subscribe("opened",function(){if(!z){z=true;c("EventProfiler").tagCurrentActiveInteractionsAs("FirstNotificationJewelOpen")}if(w)w();A&&A.unsubscribe();A=null;s.open()}),B=s.pause.bind(s);o.subscribe("opened",function(){setTimeout(B,0);m(o.name);c("Bootloader").loadModules(["NotificationVPVs"],function(C){return C.clearImpressions()},"NotificationJewelController");c("Arbiter").inform("notificationJewel/opened")});o.subscribe("closed",function(){s.unpause();m(o.name);c("Arbiter").inform("notificationJewel/closed")});c("NotificationUpdates").subscribe("seen-state-updated",c("curry")(m,o.name));if(q){if(q.logWithQEUniverse)c("Bootloader").loadModules(["QE2Logger"],function(C){return C.logExposureForUser(q.logWithQEUniverse)},"NotificationJewelController");if(q.injectWithAnimation)c("Bootloader").loadModules(["RelationshipDelightsBadge"],function(C){return C.inject(o,q.injectWithAnimation)},"NotificationJewelController");c("Bootloader").loadModules(["RelationshipDelightUtils"],function(C){__p&&__p();c("NotificationUpdates").subscribe("update-notifications",function(D,E){var F=E.nodes,G=E.payloadsource,H=F&&F.length?F.filter(C.shouldHeartBadge):null;if(H&&H.length){l=true;if(q.injectWithAnimation)if(G===h.INITIAL_LOAD||G===h.INITIAL_SEND)C.logBadgeAnimation(H[0].alert_id)}else l=false});if(q.logWithAlertID)C.logBadgeAnimation(q.logWithAlertID)},"NotificationJewelController")}c("NotificationUpdates").handleUpdate(h.INITIAL_LOAD,{seenState:c("createObjectFrom")(u,k)});m(o.name);c("NotificationUpdates").setEndPoint(r)}f.exports=n}),null);
__d("NotificationBucketUtils",["JSResource"],(function a(b,c,d,e,f,g){"use strict";var h={getCustomModuleForType:function i(j){switch(j){case"TICKER":return c("JSResource")("NotificationBucketTicker.react").__setRef("NotificationBucketUtils");default:return null}}};f.exports=h}),null);
__d("NotificationAsyncWrapper",["NotificationListConfig","React"],(function a(b,c,d,e,f,g){"use strict";__p&&__p();var h=void 0;if(c("NotificationListConfig").reactFiberAsyncNotifications)h=c("React").unstable_AsyncMode;else h=function(){__p&&__p();var i,j;i=babelHelpers.inherits(h,c("React").Component);j=i&&i.prototype;h.prototype.render=function(){"use strict";return this.props.children};function h(){"use strict";i.apply(this,arguments)}return h}();f.exports=h}),null);
__d("NotificationJewelListBucketHeader.react",["cx","React"],(function a(b,c,d,e,f,g,h){"use strict";function i(j){return c("React").createElement("div",{className:"_fyy"},j.title.toUpperCase())}f.exports=i}),null);
__d("NotificationBucketGeneric.react",["cx","NotificationJewelListBucketHeader.react","React"],(function a(b,c,d,e,f,g,h){"use strict";__p&&__p();var i,j;i=babelHelpers.inherits(k,c("React").Component);j=i&&i.prototype;k.prototype.render=function(){var l=this.props,m=l.title,n=l.ids,o=l.listRenderer,p=l.startIndex;if(n.length===0)return null;var q=o(n,p);return c("React").createElement("div",{className:"_32hm"},m?c("React").createElement(c("NotificationJewelListBucketHeader.react"),{title:m}):null,c("React").createElement("ul",null,q))};function k(){i.apply(this,arguments)}f.exports=k}),null);
__d("NotificationBucket.react",["cx","BootloadedComponent.react","NotificationBucketGeneric.react","NotificationBucketUtils","NotificationJewelListBucketHeader.react","React","XUISpinner.react"],(function a(b,c,d,e,f,g,h){"use strict";__p&&__p();var i,j;i=babelHelpers.inherits(k,c("React").Component);j=i&&i.prototype;k.prototype.$NotificationBucket1=function(){var l=this.props.bucket,m=l.bucketType,n=l.title;return c("React").createElement("div",null,c("React").createElement(c("NotificationJewelListBucketHeader.react"),{title:n,bucketType:m}),c("React").createElement(c("XUISpinner.react"),{className:"_1e00"}))};k.prototype.render=function(){var l=this.props,m=l.bucket,n=l.listRenderer,o=l.startIndex,p=m.bucketType,f=c("NotificationBucketUtils").getCustomModuleForType(p);if(!f)return c("React").createElement(c("NotificationBucketGeneric.react"),babelHelpers["extends"]({},m,{listRenderer:n,startIndex:o}));return c("React").createElement(c("BootloadedComponent.react"),babelHelpers["extends"]({bootloadLoader:f,bootloadPlaceholder:this.$NotificationBucket1()},m))};function k(){i.apply(this,arguments)}f.exports=k}),null);
__d("WebNotificationsBottomCollisionsTypedLogger",["Banzai","GeneratedLoggerUtils","nullthrows"],(function a(b,c,d,e,f,g){"use strict";__p&&__p();function h(){this.clear()}h.prototype.log=function(){c("GeneratedLoggerUtils").log("logger:WebNotificationsBottomCollisionsLoggerConfig",this.$WebNotificationsBottomCollisionsTypedLogger1,c("Banzai").BASIC)};h.prototype.logVital=function(){c("GeneratedLoggerUtils").log("logger:WebNotificationsBottomCollisionsLoggerConfig",this.$WebNotificationsBottomCollisionsTypedLogger1,c("Banzai").VITAL)};h.prototype.clear=function(){this.$WebNotificationsBottomCollisionsTypedLogger1={};return this};h.prototype.getData=function(){return babelHelpers["extends"]({},this.$WebNotificationsBottomCollisionsTypedLogger1)};h.prototype.updateData=function(j){this.$WebNotificationsBottomCollisionsTypedLogger1=babelHelpers["extends"]({},this.$WebNotificationsBottomCollisionsTypedLogger1,j);return this};h.prototype.setVC=function(j){this.$WebNotificationsBottomCollisionsTypedLogger1.vc=j;return this};var i={vc:true};f.exports=h}),null);
__d("NotificationJewelList.react",["ix","cx","fbt","AbstractButton.react","Animation","ErrorBoundary.react","Event","EventProfiler","FunnelLogger","Image.react","JewelLogger","LogicalGrid.react","NotificationBucket.react","NotificationJewelFunnelLoggingConstants","NotificationListConfig","NotificationListItem.react","NotificationListPropTypes","NotificationVPVs","NotifTestIDs","QE2Logger","React","ReactDOM","ScrollableArea.react","SubscriptionsHandler","TimeSlice","Vector","WebNotificationsBottomCollisionsTypedLogger","XUISpinner.react","asset","debounce","getObjectValues","isEmpty","performanceNowNoFallback","throttle"],(function a(b,c,d,e,f,g,h,i,j){__p&&__p();var k,l,m=c("NotificationJewelFunnelLoggingConstants").FUNNEL_LOGGING_NAME,n=c("NotificationJewelFunnelLoggingConstants").FUNNEL_LOGGING_EVENT,o=c("NotificationListConfig").numStoriesFromEndBeforeAFetchIsTriggered,p=160,q=530,r=61,s=Math.ceil(r*o),t=430,u=void 0;function v(x){if(u!=x){new(c("WebNotificationsBottomCollisionsTypedLogger"))().log();u=x}}k=babelHelpers.inherits(w,c("React").Component);l=k&&k.prototype;function w(){__p&&__p();var x,y;"use strict";for(var z=arguments.length,A=Array(z),B=0;B<z;B++)A[B]=arguments[B];return y=(x=l.constructor).call.apply(x,[this].concat(A)),this.state={lastMeasuredHeight:null},this.$NotificationJewelList2=[],this.$NotificationJewelList6=new(c("SubscriptionsHandler"))(),this.$NotificationJewelList7=false,this.$NotificationJewelList8=false,this.$NotificationJewelList11=function(){__p&&__p();if(!this.$NotificationJewelList3||!this.$NotificationJewelList5)return;var C=c("ReactDOM").findDOMNode(this.$NotificationJewelList3);if(!C)return;var D=c("ReactDOM").findDOMNode(this.$NotificationJewelList5);if(!D)return;var E=c("NotificationVPVs").getValidatedRectangle(D);if(this.props.afterScroll){var F=function(){this.props.afterScroll(this.$NotificationJewelList9(),C,E)}.bind(this),G=c("Vector").getElementDimensions(D).y,H=this.$NotificationJewelList5&&this.$NotificationJewelList5.getArea();if(H&&H.getContentHeight()>0&&this.$NotificationJewelList7===false&&c("performanceNowNoFallback")&&c("getObjectValues")(this.props.notifs).length>0){this.$NotificationJewelList7=true;c("JewelLogger").logJewelListComponentEvent({jewelName:"notifications",eventName:"list_population_initial",timestamp:c("performanceNowNoFallback")()})}if(H&&G>0&&H.getContentHeight()>=G){if(this.$NotificationJewelList8===false&&c("performanceNowNoFallback")){this.$NotificationJewelList8=true;c("JewelLogger").logJewelListComponentEvent({jewelName:"notifications",eventName:"list_populated",timestamp:c("performanceNowNoFallback")()})}c("TimeSlice").guard(F,"NotificationJewelList afterScrollCallback",{propagationType:c("TimeSlice").PropagationType.ORPHAN})()}else F()}}.bind(this),this.$NotificationJewelList12=function(){return c("getObjectValues")(this.props.notifs).map(function(C){return JSON.stringify(C)})}.bind(this),this.$NotificationJewelList16=function(C,D){__p&&__p();var E,F=this,G=this.$NotificationJewelList13(D);if(C.ids&&C.ids.length){var E=function(){var H=F.props.notifs,I=C.ids.filter(function(J){return!!H[J]});if(I.length===0)return{v:null}}();if(typeof E==="object")return E.v}return c("React").createElement("li",{key:D},c("React").createElement(c("NotificationBucket.react"),{bucket:C,listRenderer:this.$NotificationJewelList17,startIndex:G}))}.bind(this),this.$NotificationJewelList17=function(C,D){D=D||0;return C.map(function(E,F){var G=this.props.notifs[E];if(!G)return null;var H=F+D;return this.$NotificationJewelList18(G,H,H)}.bind(this))}.bind(this),this.$NotificationJewelList19=function(){this.setState(function(C){return babelHelpers["extends"]({},C,{lastMeasuredHeight:this.$NotificationJewelList10()})}.bind(this))}.bind(this),this.$NotificationJewelList20=function(){var C=c("debounce")(this.$NotificationJewelList19);this.$NotificationJewelList6.addSubscriptions(C);return C}.bind(this)(),this.$NotificationJewelList23=function(){if(this.props.onResetRetryCount)this.props.onResetRetryCount()}.bind(this),this.$NotificationJewelList24=function(){c("FunnelLogger").appendAction(m,n.SCROLL_TO_FETCH);this.$NotificationJewelList11()}.bind(this),this.$NotificationJewelList25=c("throttle").acrossTransitionsWithBlocking(this.$NotificationJewelList24),y}w.prototype.$NotificationJewelList9=function(){"use strict";__p&&__p();if(!this.$NotificationJewelList4||!this.$NotificationJewelList5)return false;var x=c("ReactDOM").findDOMNode(this.$NotificationJewelList5);if(!x)return false;var y=c("ReactDOM").findDOMNode(this.$NotificationJewelList4);if(!y)return false;var z=c("Vector").getElementDimensions(x).y;if(z===0)return false;var A=c("Vector").getElementPosition(x).y+z,B=c("Vector").getElementPosition(y).y,C=this.$NotificationJewelList5&&this.$NotificationJewelList5.getArea();if(C&&C.getScrollTop()>0&&B<A)v(c("getObjectValues")(this.props.notifs).length);return B-s<A};w.prototype.$NotificationJewelList10=function(){"use strict";var x=c("Vector").getViewportDimensions().y,y=Math.min(this.props.maxHeight||q,x-p);return y};w.prototype.$NotificationJewelList13=function(x){"use strict";return this.$NotificationJewelList2.slice(0,x).reduce(function(y,z){return y+z},0)};w.prototype.$NotificationJewelList14=function(x){"use strict";this.$NotificationJewelList2=x?x.map(function(y){return y.ids.length}):[]};w.prototype.$NotificationJewelList15=function(){"use strict";if(!this.props.buckets)return null;return this.props.buckets.map(this.$NotificationJewelList16)};w.prototype.$NotificationJewelList18=function(x,y,z){"use strict";var A=x.alert_id;return c("React").createElement(c("ErrorBoundary.react"),{key:A},c("React").createElement(c("NotificationListItem.react"),{getDebugData:this.$NotificationJewelList12,isRead:this.props.readState[A],onChevronHide:this.props.onChevronHide,onChevronShow:this.props.onChevronShow,onClick:this.props.onClick,onRead:this.props.onRead,parent:this,paused:this.props.paused,row:y,rowIndex:z,shortenTimestamp:this.props.shortenTimestamp,target:this.props.target,visible:!this.props.hiddenState[A],notification:x}))};w.prototype.$NotificationJewelList21=function(x){"use strict";if(this.props.onNumNotificationsViewableChange)this.props.onNumNotificationsViewableChange(x/r)};w.prototype.componentWillMount=function(){"use strict";this.$NotificationJewelList14(this.props.buckets);this.$NotificationJewelList6.addSubscriptions(c("Event").listen(window,"resize",this.$NotificationJewelList20));this.$NotificationJewelList19()};w.prototype.componentDidMount=function(){"use strict";var x=this.state.lastMeasuredHeight;if(x!=null)this.$NotificationJewelList21(x);if(c("performanceNowNoFallback"))c("JewelLogger").logJewelListComponentEvent({jewelName:"notifications",eventName:"list_did_mount",timestamp:c("performanceNowNoFallback")()})};w.prototype.componentWillReceiveProps=function(x){"use strict";if(x.buckets===this.props.buckets)return;this.$NotificationJewelList14(x.buckets)};w.prototype.componentDidUpdate=function(x,y){"use strict";__p&&__p();if(this.props.paused&&!x.paused)if(this.props.shouldScroll&&this.$NotificationJewelList5){var z=this.$NotificationJewelList5.getArea();if(z)z.scrollToTop(false)}var A=this.state.lastMeasuredHeight;if(A!=null&&A!==y.lastMeasuredHeight){this.$NotificationJewelList21(A);if(this.$NotificationJewelList1){this.$NotificationJewelList1.stop();delete this.$NotificationJewelList1}if(!c("isEmpty")(this.props.notifs)){var B=c("ReactDOM").findDOMNode(this.$NotificationJewelList5);if(B)this.$NotificationJewelList1=new(c("Animation"))(B).to("height",A+"px").duration(100).go()}}var C=setTimeout(this.$NotificationJewelList11,0);this.$NotificationJewelList6.addSubscriptions({remove:function D(){clearTimeout(C)}})};w.prototype.componentWillUnmount=function(){"use strict";this.$NotificationJewelList6.release();if(this.$NotificationJewelList1){this.$NotificationJewelList1.stop();delete this.$NotificationJewelList1}};w.prototype.$NotificationJewelList22=function(x,y){"use strict";return y.indexOf(x)};w.prototype.$NotificationJewelList26=function(){"use strict";if(this.props.buckets&&this.props.buckets.length)return this.$NotificationJewelList15();var x=c("getObjectValues")(this.props.notifs).filter(Boolean).map(function(y){return y.alert_id});return c("getObjectValues")(this.props.notifs).filter(Boolean).map(function(y,z){var A=y.alert_id,B=this.$NotificationJewelList22(A,x);return this.$NotificationJewelList18(y,B,z)}.bind(this))};w.prototype.render=function(){"use strict";__p&&__p();var x=this.props.notifs,y=null,z=null,A=t,B=null,C=c("React").createElement("ul",{"data-gt":this.props.tracking,"data-testid":c("NotifTestIDs").REACT_NOTIF_LIST});if(!c("isEmpty")(x)){y=c("React").createElement(c("LogicalGrid.react"),{ref:function(H){return this.$NotificationJewelList3=H}.bind(this),component:C},this.$NotificationJewelList26());z=this.state.lastMeasuredHeight}else if(!this.props.canFetchMore)y=c("React").createElement("div",{className:"_572e","data-testid":c("NotifTestIDs").REACT_NOTIF_LIST},j._("No new notifications"));if(this.props.canFetchMore)if(this.props.retryLimitReached&&this.props.onResetRetryCount!=null)B=c("React").createElement(c("AbstractButton.react"),{className:"_3heb","data-hover":"tooltip","data-tooltip-alignh":"center","data-tooltip-content":j._("A temporary issue prevented your notifications from being loaded. Click to try again."),"data-tooltip-delay":true,image:c("React").createElement(c("Image.react"),{className:"_3hec",src:h("458300")}),label:j._("Try again"),labelIsHidden:true,onClick:this.$NotificationJewelList23});else B=c("React").createElement(c("XUISpinner.react"),{ref:function(H){return this.$NotificationJewelList4=H}.bind(this),paused:!this.props.currentlyFetching,className:"jewelLoading"});var D=null;if(this.props.upsell){var E=this.props.upsell.module;D=c("React").createElement(E,this.props.upsell.props)}var F="_50-t"+(this.props.showingChevron?" _2iy1":""),G=c("React").createElement(c("ScrollableArea.react"),{ref:function(H){return this.$NotificationJewelList5=H}.bind(this),width:A,fade:true,persistent:true,onScroll:this.$NotificationJewelList25},y,B);return c("React").createElement("div",{style:z?{height:z+"px"}:{},className:F},G,D)};w.defaultProps={retryLimitExceeded:false};w.propTypes=c("NotificationListPropTypes");f.exports=w}),null);