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
// Special Cookies (Shimmers)
// ======================================
CCUtils.getSpecialCookies = function() {
    return Game.shimmers;
}

CCUtils.isSpecialCookieGolden = function(shimmer) {
    if (shimmer && shimmer.type == "golden" && shimmer.wrath == 0){
        return true;
    }
    return false;
}

CCUtils.isSpecialCookieWrath = function(shimmer) {
    if (shimmer && shimmer.type == "golden" && shimmer.wrath == 1){
        return true;
    }
    return false;
}

CCUtils.isSpecialCookieReindeer = function(shimmer) {
    if (shimmer && shimmer.type == "reindeer"){
        return true;
    }
    return false;
}

CCUtils.clickSpecialCookie = function(shimmer) {
    if (shimmer) {
        shimmer.pop();
    }
}

CCUtils.clickAllSpecialCookies = function(clickGoldenCookie = true, clickWrathCookie = true, clickReindeer = true) {
    var shimmers = CCUtils.getSpecialCookies();

    for (var i = 0; i < shimmers.length; i++) {
        shimmer = shimmers[i];
        
        if (CCUtils.isSpecialCookieGolden(shimmer) && clickGoldenCookie) {
            CCUtils.clickSpecialCookie(shimmer);
        }
        else if (CCUtils.isSpecialCookieWrath(shimmer) && clickWrathCookie) {
            CCUtils.clickSpecialCookie(shimmer);
        }
        else if (CCUtils.isSpecialCookieReindeer(shimmer) && clickReindeer) {
            CCUtils.clickSpecialCookie(shimmer);
        }
    }
}

// ======================================
// Lumps
// ======================================
CCUtils.getLumpAge = function() {
    var age = Date.now() - Game.lumpT;

    return age;
}

CCUtils.clickLump = function(clickWhenRipe = true) {
    //If clicked when mature but not ripe there's a 50% chance that nothing will be harvested
    var age = CCUtils.getLumpAge();

    if (clickWhenRipe && age >= Game.lumpRipeAge) {
        Game.clickLump();
    }
    else if (!clickWhenRipe && age >= Game.lumpMatureAge) {
        Game.clickLump();
    }
}

// ======================================
// News Ticker
// ======================================
CCUtils.clickFortuneNews = function() {
    if (Game.TickerEffect) {
        Game.tickerL.click();
    }
}

// ======================================
// Buildings
// ======================================
CCUtils.getBuildings = function() {
    return Game.ObjectsById;
}

// ======================================
// Upgrades
// ======================================
CCUtils.getUpgrades = function() {
    return Game.UpgradesById;
}

CCUtils.getAvailableUpgrades = function() {
    return Game.UpgradesInStore;
}

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