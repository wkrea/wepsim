#!/bin/sh


#*
#*  Copyright 2015-2020 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
#*
#*  This file is part of WepSIM.
#*
#*  WepSIM is free software: you can redistribute it and/or modify
#*  it under the terms of the GNU Lesser General Public License as published by
#*  the Free Software Foundation, either version 3 of the License, or
#*  (at your option) any later version.
#*
#*  WepSIM is distributed in the hope that it will be useful,
#*  but WITHOUT ANY WARRANTY; without even the implied warranty of
#*  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#*  GNU Lesser General Public License for more details.
#*
#*  You should have received a copy of the GNU Lesser General Public License
#*  along with WepSIM.  If not, see <http://www.gnu.org/licenses/>.
#*


# welcome
echo ""
echo "  WepSIM packer"
echo " ---------------"
echo ""
echo "  Requirements:"
echo "  * terser"
echo "  * jq"
echo ""
if [ $# -gt 0 ]; then
     set -x
fi

# skeleton
echo "  Packing:"
echo "  * ws_dist"
                    mkdir -p ws_dist
                    touch    ws_dist/index.html
                    mkdir -p ws_dist/external
                    touch    ws_dist/external/index.html
cp external/jquery.min.js    ws_dist/external
                    mkdir -p ws_dist/help
                    touch    ws_dist/help/index.html

#  hardware model + software model + core (simulation ctrl + UI)
echo "  * ws_dist/min.sim_all.js"
cat sim_hw/sim_hw_index.js \
    sim_hw/sim_hw_values.js \
    sim_hw/sim_hw_behavior.js \
    sim_hw/sim_hw_ep/sim_ep.js \
    sim_hw/sim_hw_ep/sim_hw_board.js \
    sim_hw/sim_hw_ep/sim_hw_cpu.js \
    sim_hw/sim_hw_ep/sim_hw_mem.js \
    sim_hw/sim_hw_ep/sim_hw_io.js \
    sim_hw/sim_hw_ep/sim_hw_kbd.js \
    sim_hw/sim_hw_ep/sim_hw_scr.js \
    sim_hw/sim_hw_ep/sim_hw_l3d.js \
    sim_hw/sim_hw_poc/sim_poc.js \
    sim_hw/sim_hw_poc/sim_hw_board.js \
    sim_hw/sim_hw_poc/sim_hw_cpu.js \
    sim_hw/sim_hw_poc/sim_hw_mem.js \
    sim_hw/sim_hw_poc/sim_hw_io.js \
    sim_hw/sim_hw_poc/sim_hw_kbd.js \
    sim_hw/sim_hw_poc/sim_hw_scr.js \
    sim_hw/sim_hw_poc/sim_hw_l3d.js \
    \
    sim_sw/sim_lang.js \
    sim_sw/sim_lang_firm.js \
    sim_sw/sim_lang_asm.js \
    sim_sw/sim_lang_cis2native.js \
    \
    sim_core/sim_cfg.js \
    sim_core/sim_core_record.js \
    sim_core/sim_core_ctrl.js \
    sim_core/sim_core_ui.js \
    sim_core/sim_api_core.js \
    sim_core/sim_api_native.js \
    sim_core/sim_api_stateshots.js \
    sim_core/sim_core_voice.js \
    sim_core/sim_core_rest.js \
    sim_core/sim_core_notify.js > ws_dist/sim_all.js
terser -o ws_dist/min.sim_all.js ws_dist/sim_all.js
rm -fr ws_dist/sim_all.js

#  WepSIM internalization (i18n)
echo "  * ws_dist/help/..."
cat wepsim_i18n/i18n.js > ws_dist/wepsim_i18n.js
for LANG in es en fr kr ja it pt hi zh_cn ru sv de; do
cat wepsim_i18n/$LANG/gui.js \
    wepsim_i18n/$LANG/tutorial-welcome.js \
    wepsim_i18n/$LANG/tutorial-simpleusage.js \
    wepsim_i18n/$LANG/tour-intro.js \
    wepsim_i18n/$LANG/cfg.js \
    wepsim_i18n/$LANG/help.js \
    wepsim_i18n/$LANG/states.js \
    wepsim_i18n/$LANG/examples.js \
    wepsim_i18n/$LANG/dialogs.js  >> ws_dist/wepsim_i18n.js
cp  wepsim_i18n/$LANG/simulator.html ws_dist/help/simulator-"$LANG".html
cp  wepsim_i18n/$LANG/about.html     ws_dist/help/about-"$LANG".html
done
terser -o ws_dist/min.wepsim_i18n.js ws_dist/wepsim_i18n.js
rm -fr ws_dist/wepsim_i18n.js

#  WepSIM web
echo "  * ws_dist/min.wepsim_core.js"
cat wepsim_core/wepsim_url.js \
    wepsim_core/wepsim_clipboard.js \
    wepsim_core/wepsim_preload_commands.js \
    wepsim_core/wepsim_preload.js \
    wepsim_core/wepsim_checkpoint.js \
    wepsim_core/wepsim_signal.js \
    wepsim_core/wepsim_state.js \
    wepsim_core/wepsim_execute.js \
    wepsim_core/wepsim_notify.js \
    \
    wepsim_core/wepsim_mode.js \
    wepsim_core/wepsim_share.js \
    wepsim_core/wepsim_dialog.js \
    wepsim_core/wepsim_config.js \
    wepsim_core/wepsim_config_commands.js \
    wepsim_core/wepsim_example.js \
    wepsim_core/wepsim_help.js \
    wepsim_core/wepsim_help_commands.js \
    wepsim_core/wepsim_tutorial.js \
    wepsim_core/wepsim_tutorial_welcome.js \
    wepsim_core/wepsim_tutorial_simpleusage.js \
    wepsim_core/wepsim_tour.js \
    wepsim_core/wepsim_tour_commands.js \
    wepsim_core/wepsim_voice.js \
    wepsim_core/wepsim_voice_commands.js \
    \
    wepsim_core/wepsim_dbg_breakpointicons.js > ws_dist/wepsim_core.js
terser -o ws_dist/min.wepsim_core.js ws_dist/wepsim_core.js
rm -fr ws_dist/wepsim_core.js

#  WepSIM web engine
cat ws_dist/min.sim_all.js \
    ws_dist/min.wepsim_i18n.js \
    ws_dist/min.wepsim_core.js \
    \
    wepsim_webui/wepsim_webui_ddown_sel.js \
    wepsim_webui/wepsim_webui_ddown_info.js \
    wepsim_webui/wepsim_webui_cpu.js \
    wepsim_webui/wepsim_webui_mem.js \
    wepsim_webui/wepsim_webui_mem_config.js \
    wepsim_webui/wepsim_webui_console.js \
    wepsim_webui/wepsim_webui_io_info.js \
    wepsim_webui/wepsim_webui_io_config.js \
    wepsim_webui/wepsim_webui_l3d.js \
    wepsim_webui/wepsim_webui_dbg_mc.js \
    wepsim_webui/wepsim_webui_dbg_asm.js \
    wepsim_webui/wepsim_webui_cpusvg.js \
    wepsim_webui/wepsim_webui_authors.js \
    wepsim_webui/wepsim_webui_hw.js \
    wepsim_webui/wepsim_wui_registers.js \
    \
    wepsim_webui/wepsim_webui_loadfile.js \
    wepsim_webui/wepsim_webui_savefile.js \
    wepsim_webui/wepsim_webui_listcfg.js \
    wepsim_webui/wepsim_webui_listexample.js \
    wepsim_webui/wepsim_webui_listprocessor.js \
    \
    wepsim_webui/wepsim_web_ui_dialogs.js \
    wepsim_webui/wepsim_web_ui_quickcfg.js \
    wepsim_webui/wepsim_webui_recordbar.js \
    wepsim_webui/wepsim_webui_executionbar.js \
    wepsim_webui/wepsim_webui_compilationbar.js \
    wepsim_webui/wepsim_webui_toolbar.js \
    \
    wepsim_webui/wepsim_web_api.js \
    \
    wepsim/web/wepsim_web_editor.js \
    wepsim/web/wepsim_web_simulator.js > ws_dist/wepsim_web.js
terser -o ws_dist/min.wepsim_web.js ws_dist/wepsim_web.js
rm -fr ws_dist/wepsim_web.js

#  WepSIM nodejs engine
echo "  * ws_dist/min.wepsim_node.js"
echo "class HTMLElement { }" > ws_dist/min.dummy.js
cat ws_dist/min.dummy.js \
    ws_dist/min.sim_all.js \
    ws_dist/min.wepsim_i18n.js \
    ws_dist/min.wepsim_web.js \
    \
    wepsim/nodejs/wepsim_node_core.js \
    wepsim/nodejs/wepsim_node_action.js > ws_dist/min.wepsim_node.js
rm -fr ws_dist/min.dummy.js

#  external
echo "  * ws_dist/min.external.js"
cat external/knockout-3.5.1.js \
    external/popper.min.js \
    external/bootstrap.min.js \
    external/bootbox.min.js \
    external/spectrum/spectrum.min.js \
    external/timbre.min.js \
    external/codemirror/codemirror.js \
    external/codemirror/mode/javascript/javascript.js \
    external/codemirror/mode/gas/gas.js \
    external/codemirror/keymap/sublime.js \
    external/codemirror/keymap/emacs.js \
    external/codemirror/keymap/vim.js \
    external/codemirror/addon/edit/matchbrackets.js \
    external/codemirror/addon/fold/foldcode.js \
    external/codemirror/addon/fold/foldgutter.js \
    external/codemirror/addon/fold/brace-fold.js \
    external/codemirror/addon/fold/xml-fold.js \
    external/codemirror/addon/fold/comment-fold.js \
    external/codemirror/addon/fold/indent-fold.js \
    external/codemirror/addon/fold/markdown-fold.js \
    external/codemirror/addon/hint/show-hint.js \
    external/codemirror/addon/runmode/colorize.js \
    external/jquery.knob.min.js \
    external/vis/vis-network.min.js \
    external/async.min.js \
    external/qrcode/qrcode.min.js \
    external/bootstrap-tokenfield.js \
    external/introjs/introjs.min.js \
    external/speech-input.js \
    external/annyang.min.js \
    external/speechkitt/speechkitt.min.js \
    external/dropify/dropify.min.js \
    external/masonry.pkgd.min.js \
    external/fontawesome/brands.min.js \
    external/fontawesome/solid.min.js | grep -v sourceMappingURL > ws_dist/external.js
terser -o ws_dist/min.external.js ws_dist/external.js
rm -fr ws_dist/external.js

echo "  * ws_dist/min.external.css"
cat external/bootstrap.min.css \
    external/bootstrap-theme.min.css \
    external/dark-mode.css \
    external/spectrum/spectrum.min.css \
    external/codemirror/codemirror.css \
    external/codemirror/theme/blackboard.css \
    external/codemirror/addon/fold/foldgutter.css \
    external/codemirror/addon/hint/show-hint.css \
    external/vis/vis-network.min.css \
    external/bootstrap-tokenfield.css \
    external/introjs/introjs.min.css \
    external/speech-input.css \
    external/dropify/dropify.min.css \
    external/fontawesome/all.css \
    external/css-tricks.css | grep -v sourceMappingURL > ws_dist/min.external.css

echo "  * ws_dist/external/..."
mkdir -p ws_dist/external/fontawesome/
   touch ws_dist/external/fontawesome/index.html
cp    -a external/fontawesome/webfonts  ws_dist/external/fontawesome
                                  touch ws_dist/external/fontawesome/webfonts/index.html
cp    -a external/dropify               ws_dist/external/
                                  touch ws_dist/external/dropify/index.html
cp    -a external/speechkitt            ws_dist/external/
                                  touch ws_dist/external/speechkitt/index.html
cp    -a external/cordova.js            ws_dist/external/cordova.js

#  examples
DEFAULT_EXAMPLE_SET="examples/examples_set/apps_ep_mips.json examples/examples_set/apps_ep_rv32.json examples/examples_set/apps_ep_z80.json examples/examples_set/apps_poc_mips.json"
jq 'reduce inputs as $i (.; . += $i)' $DEFAULT_EXAMPLE_SET > examples/examples_set/default_packed.json

echo '[ {'                                                               > examples/examples_set/default.json
echo '    "name":         "Default",'                                   >> examples/examples_set/default.json
echo '    "url":          "examples/examples_set/default_packed.json",' >> examples/examples_set/default.json
echo '    "url_base_asm": "examples/assembly/",'                        >> examples/examples_set/default.json
echo '    "url_base_mc":  "examples/microcode/"'                        >> examples/examples_set/default.json
echo '},'                                                               >> examples/examples_set/default.json
echo '{'                                                                >> examples/examples_set/default.json
echo '    "name":         "Snips",'                                     >> examples/examples_set/default.json
echo '    "url":          "examples/examples_set/snips_packed.json",'   >> examples/examples_set/default.json
echo '    "url_base_asm": "examples/assembly_snips/",'                  >> examples/examples_set/default.json
echo '    "url_base_mc":  "examples/microcode/"'                        >> examples/examples_set/default.json
echo '} ]'                                                              >> examples/examples_set/default.json

cp examples/examples_set/default.json examples/apps.json

echo "  * ws_dist/examples/..."
cp -a examples  ws_dist/

#  docs
echo "  * ws_dist/docs/..."
cp -a docs      ws_dist/

#  images
echo "  * ws_dist/images/..."
cp -a images    ws_dist/

#  user interface
echo "  * ws_dist/*.html"
cp   wepsim/web/wepsim_web_classic.html   ws_dist/index.html
cp   wepsim/web/wepsim_web_classic.html   ws_dist/wepsim-classic.html
cp   wepsim/web/wepsim_web_compact.html   ws_dist/wepsim-compact.html
cp   wepsim/web/wepsim_web_null.html      ws_dist/wepsim-null.html
cp   wepsim/web/wepsim_web_pwa.js         ws_dist/min.wepsim_web_pwa.js

echo "  * ws_dist/*.sh"
cp   docs/manifest.webapp         ws_dist/
cp wepsim/nodejs/wepsim_node.sh   ws_dist/
cp wepsim/nodejs/wepsim.sh        ws_dist/
chmod a+x ws_dist/*.sh

#  json: update processors
./ws_dist/wepsim_node.sh  export-hardware ep  > ws_dist/examples/hardware/ep/hw_def.json
./ws_dist/wepsim_node.sh  export-hardware poc > ws_dist/examples/hardware/poc/hw_def.json

# the end
echo ""
echo "  WepSIM packed in ws_dist (if no error was shown)."

