# coding=utf-8
from __future__ import absolute_import

import octoprint.plugin

class LIS3DHPlugin(octoprint.plugin.AssetPlugin, octoprint.plugin.TemplatePlugin, octoprint.plugin.SettingsPlugin):
	##-- AssetPlugin 
	def get_assets(self):
			return dict(
				js=["js/LIS3DH.js"]
			)
			
	##-- Settings hooks
	def get_settings_defaults(self):
	#	return dict(cmdProbeArm="M280 P0 S90",cmdProbeUnarm="M280 P0 S10",cmdSelfTest="M280 P0 S120",cmdReleaseAlarm="M280 P0 S160",cmdProbeBed="G29",cmdSaveSettings="M500",confirmation=True)
		return dict(cmdProbeArm="M42 P14 S255",cmdProbeUnarm="M42 P14 S0",cmdSelfTest="M42 P0 S120",cmdReleaseAlarm="M42 P0 S160",cmdProbeBed="G29",cmdSaveSettings="M500",confirmation=True)
	##-- Template hooks
	def get_template_configs(self):
		return [dict(type="settings",custom_bindings=False),dict(type="controls",custom_bindings=False)]

	##~~ Softwareupdate hook
	def get_update_information(self):
		return dict(
			LIS3DH=dict(
				displayName="LIS3DH Plugin",
				displayVersion=self._plugin_version,

				# version check: github repository
				type="github_release",
				user="jneilliii",
				repo="OctoPrint-LIS3DH",
				current=self._plugin_version,

				# update method: pip
				pip="https://github.com/jneilliii/OctoPrint-LIS3DH/archive/{target_version}.zip"
			)
		)

__plugin_name__ = "LIS3DH Plugin"
__plugin_pythoncompat__ = ">=2.7,<4"

def __plugin_load__():
	global __plugin_implementation__
	__plugin_implementation__ = LIS3DHPlugin()

	global __plugin_hooks__
	__plugin_hooks__ = {
		"octoprint.plugin.softwareupdate.check_config": __plugin_implementation__.get_update_information
	}

