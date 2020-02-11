/*
 *  Copyright 2015-2020 Felix Garcia Carballeira, Alejandro Calderon Mateos, Javier Prieto Cepeda, Saul Alonso Monsalve
 *
 *  This file is part of WepSIM.
 *
 *  WepSIM is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Lesser General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  WepSIM is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Lesser General Public License for more details.
 *
 *  You should have received a copy of the GNU Lesser General Public License
 *  along with WepSIM.  If not, see <http://www.gnu.org/licenses/>.
 *
 */


    //
    // WepSIM Dialog
    //

    wsweb_dialogs = {

         save_assembly: {
            oid:    "lssave2",
	    otitle: "<span class='text-dark'>Save Assembly</span>",
            obody:  "<label for='inputFileNameToSaveAs2'><em><span data-langkey='Please write the file name'>Please write the file name</span>:</em></label>" +
	            "<p><input aria-label='filename to save content' id='inputFileNameToSaveAs2' " +
                    "          class='form-control btn-outline-dark' placeholder='File name where assembly will be saved' style='min-width: 90%;'/></p>",
	    obutt:  {
			 save: {
				label:     "<span data-langkey='Save to File'>Save to File</span>",
				className: 'btn btn-dark',
				callback:  function() {
					       var fileNameToSaveAs = document.getElementById('inputFileNameToSaveAs2').value;
					       var textToWrite      = inputasm.getValue();
					       wepsim_save_to_file(textToWrite, fileNameToSaveAs);
					   }
			 },
			 close: {
				label:     "<span data-langkey='Close'>Close</span>",
				className: 'btn btn-danger',
				callback:  function() { 
					       // add if recording
					       simcore_record_append_new('Close dialog',
									 '$("#lssave2").modal("hide");\n') ;
					   }
			 }
		    }
         },

         load_assembly: {
            oid:    "lsload2",
	    otitle:  "<span class='text-dark'>Load Assembly</span>",
            obody:   "<label for='fileToLoad2'><em><span data-langkey='Load from this File'>Load from this File</span>:</em></label>" +
	             "<p><input aria-label='file to load' type='file' id='fileToLoad2' class='dropify'/></p>",
	    obutt:   {
			 save: {
				label:     "<span data-langkey='Load'>Load</span>",
				className: 'btn btn-dark',
				callback:  function() {
		                               var fileToLoad = document.getElementById('fileToLoad2').files[0];
		                               wepsim_file_loadFrom(fileToLoad,
                                                                     function(txt){ inputasm.setValue(txt); });
					   }
			 },
			 close: {
				label:     "<span data-langkey='Close'>Close</span>",
				className: 'btn btn-danger',
				callback:  function() { 
					       // add if recording
					       simcore_record_append_new('Close dialog',
									 '$("#lsload2").modal("hide");\n') ;
					   }
			 }
		     }
         },

         save_firmware: {
	    oid:     "lssave",
	    otitle:  "<span class='text-dark'>Save Firmware</span>",
            obody:   "<label for='inputFileNameToSaveAs'><em><span data-langkey='Please write the file name'>Please write the file name</span>:</em></label>" +
	             "<p><input aria-label='filename to save content' id='inputFileNameToSaveAs'" +
                     "          class='form-control btn-outline-dark' placeholder='File name where microcode will be saved' style='min-width: 90%;'/></p>",
	    obutt:   {
			 save1: {
				label:     "<span data-langkey='Save Editor content to File'>Save Editor content to File</span>",
				className: 'btn btn-dark',
				callback:  function() {
		                               var fileNameToSaveAs = document.getElementById('inputFileNameToSaveAs').value;
                                               var textToWrite      = inputfirm.getValue();
                                               wepsim_save_to_file(textToWrite, fileNameToSaveAs);
					   }
			 },
			 save2: {
				label:     "<span data-langkey='Save control memory to File'>Save control memory to File</span>",
				className: 'btn btn-dark my-1',
				callback:  function() {
		                               wsweb_save_controlmemory_to_file() ;
					   }
			 },
			 close: {
				label:     "<span data-langkey='Close'>Close</span>",
				className: 'btn btn-danger',
				callback:  function() { 
					       // add if recording
					       simcore_record_append_new('Close dialog',
									 '$("#lssave").modal("hide");\n') ;
					   }
			 }
		     }
         },

         load_firmware: {
	    oid:    "lsload",
	    otitle: "<span class='text-dark'>Load Microcode</span>",
            obody:  "<label for='fileToLoad'><em><span data-langkey='Load from this File'>Load from this File</span>:</em></label>" +
	            "<p><input aria-label='file to load' type='file' id='fileToLoad' class='dropify'/></p>",
	    obutt: {
			 save: {
				label:     "<span data-langkey='Load'>Load</span>",
				className: 'btn btn-dark',
				callback:  function() {
		                               var fileToLoad = document.getElementById('fileToLoad').files[0];
		                               wepsim_file_loadFrom(fileToLoad,
                                                                     function(txt){ inputfirm.setValue(txt); });
					   }
			 },
			 close: {
				label:     "<span data-langkey='Close'>Close</span>",
				className: 'btn btn-danger',
				callback:  function() { 
					       // add if recording
					       simcore_record_append_new('Close dialog',
									 '$("#lsload").modal("hide");\n') ;
					   }
			 }
		   }
         },

	 // binary
         binary: {
            oid:        "bin2",
	    otitle:     "<h5><strong>Binary</strong> <span class='badge badge-pill btn-success'><div class='wsversion'>X</div></span></h5>",
            obody:      "<div id='bin2-container' class='container-fluid' " +
		        "     style='padding:0 0 0 0; overflow:auto; -webkit-overflow-scrolling:touch;'> " +
		        " <div class='ui-body-d ui-content' style='padding: 2px 2px 2px 2px;'> " +
			" <div id='iframe_bin2' style='max-height:80vh; max-width:100%; overflow:auto; -webkit-overflow-scrolling:touch;'> " +
			"   <div id='compile_results' style='padding: 16px 16px 16px 16px;'> " +
			"	<br/> " +
			"	<center> " +
			"	Loading binary, please wait... <br/> " +
			"	WARNING: loading binary might take time on slow mobile devices. " +
			"	</center> " +
		        "	   </div> " +
		        "	 </div> " +
		        "      </div> " +
		        "</div>",
	    obutt:  {
			OK: {
			   label: "OK",
			   className: 'btn btn-primary btn-sm col col-sm-3 float-right shadow-none',
			   callback: function() {
					 // add if recording
					 simcore_record_append_new('Close the "binary" dialogbox',
								   '$("#bin2").modal("hide");\n') ;
				     }
			}
		    }
         },

	 // authors
         about: {
            oid:        "about1",
	    otitle:     "<h5 class='my-0 mx-auto'><strong>WepSIM</strong> <span class='badge badge-pill btn-success'><div class='wsversion'>X</div></span></h5>",
            obody:      "<div id='container-about1' class='container-fluid'" +
			"     style='max-height:80vh; overflow:auto; -webkit-overflow-scrolling:touch;'>" +
			"	<div class='row pb-2'>" +
			"	  <div class='col-sm-12 p-0'>" +
			"	       <span class='float-left mr-auto text-primary'" +
			"                    onclick='wepsim_help_set_relative('about#');" +
			"                             wepsim_help_refresh();" +
			"		              wsweb_about_close();" +
			"			      return false;'>GNU Lesser General Public 3</span>" +
			"	  </div>" +
			"	</div>" +
			"	<ws-authors></ws-authors>" +
			"</div>",
	    obutt:  {
			Description: {
			   label: "&plusmn; <span data-langkey='Description'>Description</span>",
			   className: 'btn btn-outline-dark  btn-sm col col-sm-3 float-left mr-auto',
			   callback: function() {
					$(".cf-all").collapse('toggle') ;
					return false;
				     }
			},
			OK: {
			   label: "OK",
			   className: 'btn btn-primary btn-sm col col-sm-3 float-right shadow-none',
			   callback: function() {
					 // add if recording
					 simcore_record_append_new('Close the "about" dialogbox',
								   '$("#about1").modal("hide");\n') ;
				     }
			}
		    }
         },

	 // notifications
         notifications: {
            oid:        "notifications2",
	    otitle:     "<button type='button' class='btn btn-dark px-3 py-1' disabled>" +
                        "     <span data-langkey='Notifications'>Notifications</span>" +
		        "</button>",
            obody:      "<div id='container-notifications2' class='container-fluid'></div>",
	    obutt:  {
			Description: {
			   label: "&plusmn; <span data-langkey='Description'>Description</span>",
			   className: 'btn btn-outline-dark  btn-sm col col-sm-3 float-left mr-auto',
			   callback: function() {
					$(".cf-all").collapse('toggle') ;
					return false;
				     }
			},
			Reset: {
			   label: "<span data-langkey='Reset'>Reset</span>",
			   className: 'btn btn-outline-danger btn-sm col-auto float-left mr-auto",
			   callback: function() {
					 var wsi = get_cfg('ws_idiom') ;
					 var   q = i18n_get('dialogs',wsi,'Are you sure?') ;
					 if (confirm(q)) {
						  wsweb_dialogbox_reset_notifications();
					 }
					 return false;
				     }
			},
			Close: {
			   label: "Close",
			   className: 'btn btn-primary btn-sm col col-sm-3 float-right shadow-none',
			   callback: function() {
					 // add if recording
					 simcore_record_append_new('Close the "notifications" dialogbox',
								   '$("#notifications2").modal("hide");\n') ;
				     }
			}
		    }
         }

    } ;

