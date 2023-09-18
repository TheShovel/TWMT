(function(Scratch) {
let tempURL = '';
let modmenuOpen = true;
let buttonStyle = 'margin: 4px;color: white;background: #5e5e5e;border-width: 4px;border-radius: 5px;border-color: transparent;';

    // Add div
    var ModMenuDiv = document.createElement("div");
    ModMenuDiv.className = "ModMenu";
    ModMenuDiv.hidden = false;
    ModMenuDiv.style = 'padding: 5px;display: inline-table; transform: translate(0px, 0px); width: 0px; height: 0px;'
    document.querySelector('div[class^="sc-layers"]').appendChild(ModMenuDiv);

    // Add extension loader button
    var LoadExtensionButton = document.createElement("button");
    LoadExtensionButton.hidden = false;
    LoadExtensionButton.textContent = 'Load external extension';
    LoadExtensionButton.addEventListener('click', loadExtension);
    LoadExtensionButton.style = buttonStyle;
    ModMenuDiv.appendChild(LoadExtensionButton);

    // Add sprite loader button
    var LoadSpriteButton = document.createElement("button");
    LoadSpriteButton.hidden = false;
    LoadSpriteButton.textContent = 'Load external sprite';
    LoadSpriteButton.addEventListener('click', loadSprite);
    LoadSpriteButton.style = buttonStyle;
    ModMenuDiv.appendChild(LoadSpriteButton);

    // Add project download button
    var DownloadProjectButton = document.createElement("button");
    DownloadProjectButton.hidden = false;
    DownloadProjectButton.textContent = 'Download project file';
    DownloadProjectButton.addEventListener('click', downloadProject);
    DownloadProjectButton.style = buttonStyle;
    ModMenuDiv.appendChild(DownloadProjectButton);

    // Add framerate button
    var SetFpsButton = document.createElement("button");
    SetFpsButton.hidden = false;
    SetFpsButton.textContent = 'Frame rate\n('+vm.runtime.frameLoop.framerate+')';
    SetFpsButton.addEventListener('click', setFrameRate);
    SetFpsButton.style = buttonStyle;
    ModMenuDiv.appendChild(SetFpsButton);

    // Add interpolation button
    var SetInterpolationButton = document.createElement("button");
    SetInterpolationButton.hidden = false;
    SetInterpolationButton.textContent = 'Interpolation\n('+vm.runtime.interpolationEnabled+')';
    SetInterpolationButton.addEventListener('click', setInterpolation);
    SetInterpolationButton.style = buttonStyle;
    ModMenuDiv.appendChild(SetInterpolationButton);

    // Add HQ pen button
    var SetHQPenButton = document.createElement("button");
    SetHQPenButton.hidden = false;
    SetHQPenButton.textContent = 'High quality pen\n('+vm.runtime.renderer.useHighQualityRender+')';
    SetHQPenButton.addEventListener('click', setHQPen);
    SetHQPenButton.style = buttonStyle;
    ModMenuDiv.appendChild(SetHQPenButton);

    // Add turbo button
    var SetTurboModeButton = document.createElement("button");
    SetTurboModeButton.hidden = false;
    SetTurboModeButton.textContent = 'Turbo Mode\n('+vm.runtime.turboMode+')';
    SetTurboModeButton.addEventListener('click', setTurboMode);
    SetTurboModeButton.style = buttonStyle;
    ModMenuDiv.appendChild(SetTurboModeButton);

    // Add exit loader button
    var ExitModButton = document.createElement("button");
    ExitModButton.hidden = false;
    ExitModButton.textContent = 'Hide mod menu';
    ExitModButton.style = buttonStyle;
    ExitModButton.addEventListener('click', exitMod);
    ModMenuDiv.appendChild(ExitModButton);

    function setTurboMode(){
        if(vm.runtime.turboMode == true){
            vm.runtime.turboMode = false;
        }
        else {
            vm.runtime.turboMode = true;
        }
        SetTurboModeButton.textContent = 'Turbo Mode\n('+vm.runtime.turboMode+')';
    }

    function setHQPen(){
        if(vm.runtime.renderer.useHighQualityRender == true){
            vm.runtime.renderer.setUseHighQualityRender(false);
        }
        else {
            vm.runtime.renderer.setUseHighQualityRender(true);
        }
        SetHQPenButton.textContent = 'High quality pen\n('+vm.runtime.renderer.useHighQualityRender+')';
    }

    function setInterpolation(){
        if(vm.runtime.interpolationEnabled == true){
            vm.runtime.setInterpolation(false);
        }
        else {
            vm.runtime.setInterpolation(true);
        }
        SetInterpolationButton.textContent = 'Interpolation\n('+vm.runtime.interpolationEnabled+')';
    }

    function setFrameRate(){
        tempURL = prompt("Enter frame rate (FPS)");
        if (tempURL !== null){
        vm.runtime.setFramerate(Number(tempURL));
        SetFpsButton.textContent = 'Frame rate\n('+vm.runtime.frameLoop.framerate+')';
        }
    }



    function loadExtension(){
        tempURL = prompt("Enter extension URL");
        vm.extensionManager.loadExtensionURL(tempURL);
    }

    function loadSprite() {
        tempURL = prompt("Enter sprite URL");
        fetch(tempURL)
        .then(r => r.arrayBuffer())
        .then(buffer => vm.addSprite(buffer))
        .then(() => {
          console.log("Done");
          vm.greenFlag();
        })
        .catch((error) => {
          console.log("Error", error);
        });
    }

    function exitMod() {
        if (modmenuOpen == true){
        LoadSpriteButton.style.visibility = 'hidden';
        LoadExtensionButton.style.visibility = 'hidden';
        DownloadProjectButton.style.visibility = 'hidden';
        SetFpsButton.style.visibility = 'hidden';
        SetInterpolationButton.style.visibility = 'hidden';
        SetHQPenButton.style.visibility = 'hidden';
        SetTurboModeButton.style.visibility = 'hidden';
        ExitModButton.textContent = ''
        ExitModButton.style = buttonStyle+'height: 25px;width: 25px;';
        modmenuOpen = false;
    }
        else {
            LoadSpriteButton.style.visibility = 'visible';
            LoadExtensionButton.style.visibility = 'visible';
            DownloadProjectButton.style.visibility = 'visible';
            SetFpsButton.style.visibility = 'visible';
            SetInterpolationButton.style.visibility = 'visible';
            SetHQPenButton.style.visibility = 'visible';
            SetTurboModeButton.style.visibility = 'visible';
            ExitModButton.textContent = 'Hide mod menu';
            ExitModButton.style = buttonStyle;
            modmenuOpen = true;
        }
    }

    function downloadURI(uri, name) {
        var link = document.createElement("a");
        link.download = name;
        link.href = uri;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        delete link;
      }

    async function downloadProject() {
        if (vm.runtime.isPackaged == true) {
            alert("Warning: This project has 'Remove raw asset data after loading to save RAM' enabled, assets that have already been loaded won't save properly. If that happens, consider using https://turbowarp.github.io/unpackager/.")
        }
        let blob = await vm.saveProjectSb3()
        let reader = new FileReader()
        reader.readAsDataURL(blob)
        reader.onload = function(){
    dataUrl = reader.result;
    downloadURI(dataUrl, document.title + '.sb3');
}
    }

    class ModLoader {
        getInfo() {
            return {
                id: 'ModLoader',
                name: "You can't see this lol",
                blocks: []
            };
        }
    }

    Scratch.extensions.register(new ModLoader());
})(Scratch);