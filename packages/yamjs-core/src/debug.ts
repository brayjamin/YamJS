import { Runtime, System } from 'java.lang'

export const getDebugInfo = () => {
  const Long = Java.type('java.lang.Long') as any
  const Bukkit = Java.type('org.bukkit.Bukkit')
  const YamJS = Bukkit.getPluginManager().getPlugin('YamJS')
  const serverRoot = YamJS.getDataFolder().getParentFile().getParentFile()
  const plugins = Bukkit.getPluginManager()
    .getPlugins()
    .map((plugin) => plugin.getName())

  const info = {
    yamJS: {
      coreVersion: '0.0.1',
      pluginVersion: '0.0.1',
      legacyVersion: '0.0.1',
    },

    server: {
      players: `${Bukkit.getOnlinePlayers().size()} / ${Bukkit.getMaxPlayers()}`,
      plugins,
      minecraftVersion: Bukkit.getVersion(),
      bukkitVersion: Bukkit.getBukkitVersion(),
      onlineMode: Bukkit.getOnlineMode(),
    },

    java: {
      version: System.getProperty('java.version'),
      vendor: System.getProperty('java.vendor'),
      vendorUrl: System.getProperty('java.vendor.url'),
      home: System.getProperty('java.home'),
      command: System.getProperty('sun.java.command'),
      timezone: System.getProperty('user.timezone'),
    },

    system: {
      os: {
        name: System.getProperty('os.name'),
        version: System.getProperty('os.version'),
        arch: System.getProperty('os.arch'),
      },
      cpu: {
        cores: Runtime.getRuntime().availableProcessors(),
      },
      memory: {
        free: Runtime.getRuntime().freeMemory(),
        max:
          Runtime.getRuntime().maxMemory() == Long.MAX_VALUE
            ? 'unlimited'
            : Runtime.getRuntime().maxMemory(),
        total: Runtime.getRuntime().totalMemory(),
      },
      storage: {
        free: serverRoot?.getFreeSpace(),
        total: serverRoot?.getTotalSpace(),
        usable: serverRoot?.getUsableSpace(),
      },
    },
    // TODO: Context count
    // TODO: Event registered count
    // TODO: Command registered count
    // TODO: Server started at
    // TODO: Plugins loaded at
  }

  // "   build date: " + ManifestUtil.getManifestValue("Build-Date"),
  // "   build git revision: " + ManifestUtil.getManifestValue("Git-Revision"),
  // "   build number: " + ManifestUtil.getManifestValue("Build-Number"),
  // "   build origin: " + ManifestUtil.getManifestValue("Build-Origin"),

  return info
}
