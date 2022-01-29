if(CCUtils === undefined) var CCUtils = {};
CCUtils.name = "CCUtils";
CCUtils.version = "0.1";
CCUtils.GameVersion = "2.043";

CCUtils.launch = function(){
	CCUtils.init = function(){
		CCUtils.isLoaded = 1;
        
        Game.customStatsMenu.push(function(){
            CCSE.AppendStatsVersionNumber(CCUtils.name, CCUtils.version);
		});
		
        // ======================================
        // Post-Load Hooks
        // To support other mods interfacing with this one
        // ======================================
		if(CCUtils.postloadHooks) {
			for(var i = 0; i < CCUtils.postloadHooks.length; ++i) {
				(CCUtils.postloadHooks[i])();
			}
		}
		
		if (Game.prefs.popups) Game.Popup("CCUtils loaded!");
		else Game.Notify("CCUtils loaded!", "", "", 1, 1);
	}
	
	if(CCSE.ConfirmGameVersion(CCUtils.name, CCUtils.version, CCUtils.GameVersion)) Game.registerMod(CCUtils.name, CCUtils);
}

// ======================================
// Big Cookie
// ======================================
CCUtils.clickBigCookie = function() {
    Game.ClickCookie();
}

// ======================================
// Golden Cookies
// ======================================

// ======================================
// Lumps
// ======================================

// ======================================
// News Ticker
// ======================================

// ======================================
// Menus
// ======================================
CCUtils.menu = {
    toggleButton: function(config, configId, buttonId, textOn, textOff, callback, description) {
        var str = '<div class="listing">'
            + CCSE.MenuHelper.ToggleButton(config, configId, buttonId, textOn, textOff, callback)
            + '<label>' + description + '</label>'
            + '</div>'
        ;
        
        return str;
    },
    
    slider: function(sliderId, leftText, rightText, value, minValue, maxValue, step, callback) {
        var str = '<div class="listing">'
            + CCSE.MenuHelper.Slider(sliderId, leftText, rightText, value, callback, minValue, maxValue, step)
            + '</div>'
        ;
        
        return str;
    },
    
    buttonTextOn: function(name) {
        return name + " ON";
    },

    buttonTextOff: function(name) {
        return name + " OFF";
    }
};

if(!CCUtils.isLoaded){
    if(CCSE && CCSE.isLoaded){
        CCUtils.launch();
    }
    else{
        if(!CCSE) var CCSE = {};
        if(!CCSE.postLoadHooks) CCSE.postLoadHooks = [];
        CCSE.postLoadHooks.push(CCUtils.launch);
    }
}