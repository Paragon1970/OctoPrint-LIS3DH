/*
 * View model for OctoPrint-LIS3DH
 *
 * Author: jneilliii
 * License: AGPLv3
 */
$(function() {
    function LIS3DHViewModel(parameters) {
        var self = this;
		
		// assign the injected parameters, e.g.:
		self.controlViewModel = parameters[0];
		self.settingsViewModel = parameters[1];
		
		self.cmdProbeUp = ko.observable();
		self.cmdProbeDown = ko.observable();
		self.cmdSelfTest = ko.observable();
		self.cmdReleaseAlarm = ko.observable();
		self.cmdProbeBed = ko.observable();
		self.cmdSaveSettings = ko.observable();
		
		self.getAdditionalControls = function() {
			if (self.settingsViewModel.settings.plugins.LIS3DH.confirmation()) {
				return [
					{ name: "LIS3DH", type: "section", layout: "horizontal", children: [
						{type: "javascript", javascript: "OctoPrint.control.sendGcode(self.settings.settings.plugins.LIS3DH.cmdProbeUp());", name: "Probe Up"},
						{type: "javascript", javascript: "OctoPrint.control.sendGcode(self.settings.settings.plugins.LIS3DH.cmdProbeDown());", name: "Probe Down"},
						{type: "javascript", javascript: "OctoPrint.control.sendGcode(self.settings.settings.plugins.LIS3DH.cmdSelfTest());", name: "Self Test", confirm: "You are about to run a self test.",},
						{type: "javascript", javascript: "OctoPrint.control.sendGcode(self.settings.settings.plugins.LIS3DH.cmdReleaseAlarm());", name: "Release Alarm", confirm: "You are about to release the alarm."},
						{type: "javascript", javascript: "OctoPrint.control.sendGcode(self.settings.settings.plugins.LIS3DH.cmdProbeBed().split('\\n'));", name: "Probe Bed", confirm: "You are about to probe the bed.",},
						{type: "javascript", javascript: "OctoPrint.control.sendGcode(self.settings.settings.plugins.LIS3DH.cmdSaveSettings());", name: "Save", confirm: "You are about to save settings."}
					]}
				];
			} else {
				return [
					{ name: "LIS3DH", type: "section", layout: "horizontal", children: [
						{type: "javascript", javascript: "OctoPrint.control.sendGcode(self.settings.settings.plugins.LIS3DH.cmdProbeUp());", name: "Probe Up"},
						{type: "javascript", javascript: "OctoPrint.control.sendGcode(self.settings.settings.plugins.LIS3DH.cmdProbeDown());", name: "Probe Down"},
						{type: "javascript", javascript: "OctoPrint.control.sendGcode(self.settings.settings.plugins.LIS3DH.cmdSelfTest());", name: "Self Test"},
						{type: "javascript", javascript: "OctoPrint.control.sendGcode(self.settings.settings.plugins.LIS3DH.cmdReleaseAlarm());", name: "Release Alarm"},
						{type: "javascript", javascript: "OctoPrint.control.sendGcode(self.settings.settings.plugins.LIS3DH.cmdProbeBed().split('\\n'));", name: "Probe Bed"},
						{type: "javascript", javascript: "OctoPrint.control.sendGcode(self.settings.settings.plugins.LIS3DH.cmdSaveSettings());", name: "Save"}
					]}
				];}
		};
		
		self.onBeforeBinding = function() {
			self.cmdProbeUp(self.settingsViewModel.settings.plugins.LIS3DH.cmdProbeUp());
			self.cmdProbeDown(self.settingsViewModel.settings.plugins.LIS3DH.cmdProbeDown());
			self.cmdSelfTest(self.settingsViewModel.settings.plugins.LIS3DH.cmdSelfTest());
			self.cmdReleaseAlarm(self.settingsViewModel.settings.plugins.LIS3DH.cmdReleaseAlarm());
			self.cmdProbeBed(self.settingsViewModel.settings.plugins.LIS3DH.cmdProbeBed());
			self.cmdSaveSettings(self.settingsViewModel.settings.plugins.LIS3DH.cmdSaveSettings());
		};
		
		self.onEventSettingsUpdated = function (payload) {            
            self.cmdProbeUp = self.settingsViewModel.settings.plugins.LIS3DH.cmdProbeUp();
            self.cmdProbeDown = self.settingsViewModel.settings.plugins.LIS3DH.cmdProbeDown();
            self.cmdSelfTest = self.settingsViewModel.settings.plugins.LIS3DH.cmdSelfTest();
            self.cmdReleaseAlarm = self.settingsViewModel.settings.plugins.LIS3DH.cmdReleaseAlarm();
			self.cmdProbeBed(self.settingsViewModel.settings.plugins.LIS3DH.cmdProbeBed());
			self.cmdSaveSettings(self.settingsViewModel.settings.plugins.LIS3DH.cmdSaveSettings());
        };
    };

    // view model class, parameters for constructor, container to bind to
    ADDITIONAL_VIEWMODELS.push([
        LIS3DHViewModel,

        // e.g. loginStateViewModel, settingsViewModel, ...
        ["controlViewModel","settingsViewModel"],

        // e.g. #settings_plugin_LIS3DH, #tab_plugin_LIS3DH, ...
        ["settings_plugin_LIS3DH_form"]
    ]);
});
