# TWMT
A modding tool for projects packaged with TurboWarp (https://turbowarp.org)

## How to use
Press Ctrl+Shift+I on your keyboard while playing a project. This will bring up the inspect element tools.  
Now press the "Console" tab.  
![image](https://github.com/TheShovel/TWMT/assets/68913917/63a30f17-dffc-4621-a293-ddf2a2e1b9a4)  
You will then have to copy this line of code ```vm.extensionManager.loadExtensionURL("https://theshovel.github.io/TWMT/ModLoader.js");``` and paste it (pressing Ctrl+V)  
After you press enter, the modding tools will appear like this  
![Screenshot_20230918_190356](https://github.com/TheShovel/TWMT/assets/68913917/fc1ccbeb-7717-44e5-8f98-f3f601b9d85a)
## Load external extension
This will load an external TurboWarp extension, that doesn't already exist in the project. You can find extensions at https://extensions.turbowarp.com
## Load external sprite
This will load an external TurboWarp or vanilla Scratch sprite. You can use this to inject scripts into projects.
### PLEASE NOTE
The sprites you import can't contain
- Broadcasts that don't exist in the original project.
- Blocks from textensions that the project doesn't use, or you didn't manually load with "Load external extension".
## Download project file
Downloads the project file. Duh.
## Frame rate
Sets the framerate to what you specify. Setting it to 0 will leave it to your screen's refresh rate.
## Interpolation
Toggles sprite interpolation.
## High quality pen
Toggles high quality pen rendering.
## Turbo mode
Toggles TurboMode.
