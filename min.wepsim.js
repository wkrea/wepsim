function wepsim_load_from_file(c,a){var b=new FileReader();b.onload=function(d){var e=d.target.result;if(null!=a){a.setValue(e)}};b.onerror=function(d){console.error("File could not be read! Code "+d.target.error.code)};b.readAsText(c,"UTF-8")}function wepsim_save_to_file(b,e){var d=b.getValue();var c=new Blob([d],{type:"text/plain"});var a=document.createElement("a");a.download=e;a.innerHTML="Download File";if(window.webkitURL!=null){a.href=window.webkitURL.createObjectURL(c)}else{a.href=window.URL.createObjectURL(c);a.onclick=function(f){document.body.removeChild(f.target)};a.style.display="none";document.body.appendChild(a)}a.click()}function wepsim_load_from_url(b,a){var c=new XMLHttpRequest();c.onreadystatechange=function(){if((c.readyState==4)&&((c.status==200)||(c.status==0))){var d=c.responseText;if(null!=a){a(d)}}};c.open("GET",b,true);c.send()}function wepsim_compile_assembly(b,c){var a=get_simware();if(a.firmware.length==0){if(c){alert("WARNING: please load the microcode first.");$.mobile.pageContainer.pagecontainer("change","#main3")}return false}var d=simlang_compile(b,a);if(d.error!=null){if(c){showError(d.error,"inputasm")}return false}if(c){$.notify({title:"<strong>INFO</strong>",message:"Assembly was compiled and loaded."},{type:"success",newest_on_top:true,delay:get_cfg("NOTIF_delay"),placement:{from:"top",align:"center"}})}set_simware(d);update_memories(a);if(c){$("#asm_debugger").html(assembly2html(d.mp,d.labels2,d.seg,d.assembly));showhideAsmElements()}reset();return true}function wepsim_compile_firmware(c,a){var b=load_firmware(c);if(b.error!=null){if(a){showError(b.error,"inputfirm")}return false}if(a){$.notify({title:"<strong>INFO</strong>",message:"Microcode was compiled and loaded."},{type:"success",newest_on_top:true,delay:get_cfg("NOTIF_delay"),placement:{from:"top",align:"center"}})}reset();return true}function wepsim_show_binary_code(b,a){$(a).html("<center><br>Loading binary, please wait...<br><br>WARNING: loading binary might take time on slow mobile devices.</center>");$(a).css({width:"100%",height:"inherit !important"});$(b).popup("open");setTimeout(function(){var c=get_simware();$(a).html(mp2html(c.mp,c.labels2,c.seg));$(b).popup("reposition",{positionTo:"window"});for(skey in c.seg){$("#compile_begin_"+skey).html("0x"+c.seg[skey].begin.toString(16));$("#compile_end_"+skey).html("0x"+c.seg[skey].end.toString(16))}},300)}function wepsim_show_binary_microcode(b,a){$(a).html("<center><br>Loading binary, please wait...<br><br>WARNING: loading binary might take time on slow mobile devices.</center>");$(a).css({width:"100%",height:"inherit !important"});$(b).popup("open");setTimeout(function(){var c=get_simware();$(a).html(firmware2html(c.firmware,true));$(a).css({width:"inherit !important",height:"inherit !important"});$(b).enhanceWithin();$(b).trigger("updatelayout");$(b).popup("reposition",{positionTo:"window"});$(b).trigger("refresh")},300)}function wepsim_execute_reset(){return reset()}function wepsim_execute_instruction(){if(check_if_can_execute(true)==false){return false}var a=get_cfg("DBG_limitick");return execute_microprogram(a)}function wepsim_execute_microinstruction(){if(check_if_can_execute(true)==false){return false}return execute_microinstruction()}function wepsim_execute_set_breakpoint(a){return asmdbg_set_breakpoint(a)}var DBG_stop=true;function wepsim_execute_stop(a){$(a).html("Run");$(a).removeClass("ui-icon-minus");$(a).addClass("ui-icon-carat-r");$(a).css("backgroundColor","#CCCCCC");DBG_stop=true}function wepsim_execute_play(a){if(check_if_can_execute(true)==false){return false}$(a).css("backgroundColor","rgb(51, 136, 204)");$(a).html("Stop");$(a).removeClass("ui-icon-carat-r");$(a).addClass("ui-icon-minus");DBG_stop=false;wepsim_execute_chainplay(a)}function wepsim_execute_toggle_play(a){if(DBG_stop==false){DBG_stop=true}else{DBG_stop=false;wepsim_execute_play(a)}}function wepsim_help_refresh(){var b=$("#help1_ref").data("relative");if(b!=""){$("#iframe_help1").load("help/simulator-"+get_cfg("ws_idiom")+".html "+b,function(){$("#help1").trigger("updatelayout");$("#help1").popup("open")});ga("send","event","help","help.simulator","help.simulator."+b);return}var a=$("#help1_ref").data("absolute");if(a!=""){$("#iframe_help1").load("help/"+a+"-"+get_cfg("ws_idiom")+".html",function(){$("#help1").trigger("updatelayout");$("#help1").popup("open")});ga("send","event","help","help."+a,"help."+a+".*");return}}function wepsim_open_help_index(){$("#iframe_help1").html(table_helps_html(helps));$("#iframe_help1").enhanceWithin();$("#help1_ref").data("relative","");$("#help1").trigger("updatelayout");$("#help1").popup("open")}function wepsim_open_help_content(a){$("#iframe_help1").html(a);$("#iframe_help1").enhanceWithin();$("#help1_ref").data("relative","");$("#help1").trigger("updatelayout");$("#help1").popup("reposition",{positionTo:"window"});$("#help1").popup("open")}function wepsim_close_help(){$("#help1").popup("close")}function wepsim_help_set_relative(a){$("#help1_ref").data("relative",a)}function wepsim_help_set_absolute(a){$("#help1_ref").data("absolute",a)}function wepsim_open_examples_index(){$("#container-example1").html(table_examples_html(examples));$("#container-example1").enhanceWithin();$("#example1").trigger("updatelayout");$("#example1").popup("open")}function wepsim_close_examples(){$("#example1").popup("close")}function wepsim_check_stopbynotify_firm(){var e=get_value(sim_states.REG_MICROADDR);var c=MC_dashboard[e].notify.length;if(1==c){return false}var b=false;var a="";for(var d=1;d<c;d++){a=MC_dashboard[e].notify[d];b=confirm("Notify @ "+e+":\n"+a);if(b){return true}}}function wepsim_check_stopbybreakpoint_firm(){var b=get_value(sim_states.REG_MICROADDR);if(false==MC_dashboard[b].breakpoint){return false}var a="0x"+b.toString(16);alert("Breakpoint @ "+a+":\nMicroinstruction at "+a+" is going to be issue.");return true}function wepsim_check_stopbybreakpoint_asm(){var a=get_value(sim_states.REG_PC);var b="0x"+a.toString(16);if(typeof FIRMWARE.assembly[b]=="undefined"){return false}if(false==FIRMWARE.assembly[b].breakpoint){return false}alert("Breakpoint @ "+b+":\nInstruction at "+b+" is going to be fetched.");return true}function wepsim_execute_chainplay(b){if(DBG_stop){wepsim_execute_stop(b);return}var c=get_cfg("DBG_limitick");var a=false;if(get_cfg("DBG_level")=="instruction"){a=execute_microprogram(c)}else{a=execute_microinstruction()}if(a===false){wepsim_execute_stop(b);return}a=wepsim_check_stopbybreakpoint_asm();if(a==true){wepsim_execute_stop(b);return}a=wepsim_check_stopbybreakpoint_firm();if(a==true){wepsim_execute_stop(b);return}a=wepsim_check_stopbynotify_firm();if(a==true){wepsim_execute_stop(b);return}setTimeout(wepsim_execute_chainplay,get_cfg("DBG_delay"),b)}function showError(c,b){var d=c.replace(/\t/g," ").replace(/   /g," ");var e=d.match(/Problem around line \d+/);var a="";if(null!=e){e=parseInt(e[0].match(/\d+/)[0]);a+='<button type="button" class="btn btn-danger"         onclick="$.notifyClose();                      var marked = '+b+".addLineClass("+(e-1)+", 'background', 'CodeMirror-selected');                 setTimeout(function() { "+b+".removeLineClass(marked, 'background', 'CodeMirror-selected'); }, 3000);		     var t = "+b+".charCoords({line: "+e+", ch: 0}, 'local').top;		     var middleHeight = "+b+".getScrollerElement().offsetHeight / 2;		     "+b+'.scrollTo(null, t - middleHeight - 5);">Go line '+e+"</button>&nbsp;"}$.notify({title:"<strong>ERROR</strong>",message:d+"<br><center>"+a+'<button type="button" class="btn btn-danger" onclick="$.notifyClose();">Close</button></center>'},{type:"danger",newest_on_top:true,delay:0,placement:{from:"top",align:"center"}})}function showhideAsmElements(){$("input:checkbox:checked").each(function(){var a="table ."+$(this).attr("name");$(a).show()});$("input:checkbox:not(:checked)").each(function(){var a="table ."+$(this).attr("name");$(a).hide()})}function set_cpu_cu_size(f,d,g){var e=g;var c=100-e;$("#eltos_cpu_a").css({width:e+"%"});$("#eltos_cpu_b").css({width:c+"%"})}function getURLTimeStamp(){var b=new Date();var e=b.getUTCFullYear();var f=b.getUTCMonth()+1;var c=b.getUTCDate();var a=b.getUTCHours();var d=b.getUTCMinutes();return e+f+c+a+d}function load_from_example_assembly(c,d){$.mobile.pageContainer.pagecontainer("change","#main4");inputasm.setValue("Please wait...");inputasm.refresh();var b="examples/exampleCode"+c+".txt?time="+getURLTimeStamp();var a=function(f){inputasm.setValue(f);inputasm.refresh();var g=false;var e=get_simware();if(e.firmware.length!=0){g=wepsim_compile_assembly(f,true)}if(true==g){if(true==d){setTimeout(function(){$.mobile.pageContainer.pagecontainer("change","#main1")},50)}show_memories_values()}$.notify({title:"<strong>INFO</strong>",message:"Example ready to be used."},{type:"success",newest_on_top:true,delay:get_cfg("NOTIF_delay"),placement:{from:"top",align:"center"}})};wepsim_load_from_url(b,a);ga("send","event","example","example.assembly","example.assembly."+c)}function load_from_example_firmware(c,d){$.mobile.pageContainer.pagecontainer("change","#main3");inputfirm.setValue("Please wait...");inputfirm.refresh();var b="examples/exampleMicrocode"+c+".txt?time="+getURLTimeStamp();var a=function(e){inputfirm.setValue(e);inputfirm.refresh();var f=wepsim_compile_firmware(e,true);if(true==f){if(true==d){setTimeout(function(){load_from_example_assembly(c,d)},50)}else{show_memories_values()}}$.notify({title:"<strong>INFO</strong>",message:"Example ready to be used."},{type:"success",newest_on_top:true,delay:get_cfg("NOTIF_delay"),placement:{from:"top",align:"center"}})};wepsim_load_from_url(b,a);ga("send","event","example","example.firmware","example.firmware."+c)}function table_examples_html(b){var f="<div class=\"table-responsive\"><table width=100% class=\"table table-striped table-hover table-condensed\"><thead><tr>  <th>#</th>  <th onclick=\"$('.collapse1').collapse('toggle');\">level</th>  <th>title</th>  <th onclick=\"$('.collapse3').collapse('toggle');\">description</th>  <th onclick=\"$('.collapse4').collapse('toggle');\">load only...</th></tr></thead><tbody>";for(var a=0;a<b.length;a++){var c=b[a]["title"];var d=b[a]["level"];var g=b[a]["description"];var e=b[a]["id"];f=f+" <tr> <td><b>"+(a+1)+'</b></td> <td><b    class="collapse1 collapse in">'+d+'</b></td> <td>   <a href="#" onclick="load_from_example_firmware(\''+e+'\',true);"  style="padding:0 0 0 0;"      class="ui-btn btn btn-group ui-btn-inline btn-primary">   <b class="collapse2 collapse in">'+c+'</b></a> </td> <td><span class="collapse3 collapse in">'+g+'</span></td> <td class="collapse4 collapse in" style="min-width:150px; max-width:200px">     <div class="btn-group btn-group-justified btn-group-md">         <a href="#" onclick="load_from_example_assembly(\''+e+'\',false);"  style="padding:0 0 0 0;"            class="ui-btn btn btn-group ui-btn-inline btn-default">            <b>Assembly</b></a>         <a href="#" onclick="load_from_example_firmware(\''+e+'\',false);" style="padding:0 0 0 0;"            class="ui-btn btn btn-group ui-btn-inline btn-default">            <b>Firmware</b></a>     </div> </td> </tr>'}f=f+"</tbody></table></div>";return f}function table_helps_html(a){var b='<div class="table-responsive"><table width=100% class="table table-striped table-hover table-condensed"><thead><tr>  <th>#</th>  <th>title</th>  <th onclick="$(\'.collapse2\').collapse(\'toggle\');">description</th></tr></thead><tbody>';for(var c=0;c<a.length;c++){var h=a[c]["title"];var e=a[c]["type"];var i=a[c]["reference"];var g=a[c]["description"];var d=a[c]["id"];var f="";if("relative"==e){f="wepsim_help_set_relative('"+i+"');wepsim_help_refresh();"}if("absolute"==e){f="wepsim_help_set_absolute('"+i+"');wepsim_help_refresh();"}if("code"==e){f=i}b=b+"<tr><td><b>"+(c+1)+'</b></td> <td>  <a href="#"      class="ui-btn btn btn-group ui-btn-inline"      style="background-color: #D4DB17; padding:0 0 0 0;"      onclick="'+f+'"><b>'+h+'</b></a> </td> <td class="collapse2 collapse in">   <c>'+g+"</c> </td></tr>"}b=b+"</tbody></table></div>";return b}function sim_prepare_svg_p(){var a=document.getElementById("svg_p").contentDocument;if(a!=null){var b=a.getElementById("text3495");if(b!=null){b.addEventListener("click",function(){$("#tab11").trigger("click")},false)}var b=a.getElementById("text3029");if(b!=null){b.addEventListener("click",function(){$("#tab11").trigger("click")},false)}var b=a.getElementById("text3031");if(b!=null){b.addEventListener("click",function(){$("#tab11").trigger("click")},false)}var b=a.getElementById("text3001");if(b!=null){b.addEventListener("click",function(){$("#tab14").trigger("click")},false)}var b=a.getElementById("text3775");if(b!=null){b.addEventListener("click",function(){$("#tab15").trigger("click")},false)}var b=a.getElementById("text3829");if(b!=null){b.addEventListener("click",function(){$("#tab12").trigger("click")},false)}var b=a.getElementById("text3845");if(b!=null){b.addEventListener("click",function(){$("#tab12").trigger("click")},false)}var b=a.getElementById("text3459-7");if(b!=null){b.addEventListener("click",function(){wepsim_execute_microinstruction()},false)}}}function sim_prepare_svg_cu(){var b=document.getElementById("svg_cu").contentDocument;if(b!=null){var a=b.getElementById("text3010");if(a!=null){a.addEventListener("click",function(){$("#tab16").trigger("click")},false)}var a=b.getElementById("text4138");if(a!=null){a.addEventListener("click",function(){wepsim_execute_microinstruction()},false)}var a=b.getElementById("text4138-7");if(a!=null){a.addEventListener("click",function(){wepsim_execute_microinstruction()},false)}}}function sim_prepare_editor(b){b.setValue("\n\n\n\n\n\n\n\n\n");b.getWrapperElement().style["text-shadow"]="0.0em 0.0em";if(get_cfg("editor_theme")=="blackboard"){b.getWrapperElement().style["font-weight"]="normal";b.setOption("theme","blackboard")}var a=get_cfg("editor_mode");if(a=="vim"){b.setOption("keyMap","vim")}if(a=="emacs"){b.setOption("keyMap","emacs")}if(a=="sublime"){b.setOption("keyMap","sublime")}setTimeout(function(){b.refresh()},100)}function sim_tutorial_showframe(b,a){if(get_cfg("show_tutorials")==false){return}if(a==b.length){return}b[a].code_pre();tutbox=bootbox.dialog({title:b[a].title,message:b[a].message,buttons:{cancel:{label:"Disable this tutorial",className:"btn-danger",callback:function(){set_cfg("show_tutorials",false);save_cfg();$("#radio10-false").trigger("click").checkboxradio("refresh");tutbox.modal("hide")}},confirm:{label:"Next",className:"btn-success",callback:function(){b[a].code_post();setTimeout(function(){sim_tutorial_showframe(b,a+1)},b[a].wait_next)}}},animate:false})};