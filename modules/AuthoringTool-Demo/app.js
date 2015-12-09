/**
 * Created by Calvin on 2015/12/7.
 */
'use strict';

var EditBar = React.createClass({
    initialOptions : {
        panelId: "#j-edit-panel",
        barId : "#j-edit-bar",
        editTextId: "#j-edit-text",
        gridClass : ".j-gridster",
        panelText: ".edit-panel-text",
        gridBlockClass: ".j-grid-block",
        editorClass: ".wysiwyg-editor",
        hideClass: "hide",
        dataPanelIndex: "data-panel-index",
        dataBarIndex: "data-bar-index",
        placeHolder : "Type your text here..."

    },
    panelOpenHandler: function () {
        var _dateBarIndex = $("#" +this.props.id).attr(this.initialOptions.dataBarIndex),
            $li = $(this.initialOptions.gridBlockClass, this.initialOptions.gridClass).eq(_dateBarIndex);
        var $offset = $li.offset(),
            _top = $offset.top,
            _left = $offset.left +  100;
        var $textArea = $('<textarea id="j-edit-text" name="editor" placeholder="' + this.initialOptions.placeHolder + '"></textarea>');

        $(this.initialOptions.panelId).css({"top":_top -23,"left":_left}).attr(this.initialOptions.dataPanelIndex, _dateBarIndex)
                                        .removeClass(this.initialOptions.hideClass)
                                        .find(this.initialOptions.panelText).empty().append($textArea);

        $(this.initialOptions.editTextId).myTextEditor();


        var $exitTemp = $li.find(this.initialOptions.editorClass),
            $panelEditor =  $(this.initialOptions.panelId).find(this.initialOptions.editorClass);
        if ($exitTemp.length) {
            $panelEditor.empty().append($exitTemp.html());
        }
    },
    render: function() {
        return (
            <div className="edit-bar-icon" >
                <span onClick={this.panelOpenHandler}><img src="images/set.png" alt="" className="bar-set"/></span>
                <span><img src="images/text.png" alt=""/></span>
                <span><img src="images/link.png" alt=""/></span>
                <span><img src="images/fix.png" alt=""/></span>
                <span><img src="images/auto.png" alt=""/></span>
                <span><img src="images/help.png" alt=""/></span>
            </div>
        );
    }
});
/* <svg width="10px" height="10px" viewBox="0 0 18 18" ><path fill="rgb(45,65,79)" fill-rule="evenodd" d="M 17.1 10.73C 17.1 10.73 15.39 11.07 15.39 11.07 15.31 11.32 15.21 11.56 15.09 11.79 15.09 11.79 16.06 13.24 16.06 13.24 16.35 13.68 16.3 14.27 15.92 14.64 15.92 14.64 14.85 15.71 14.85 15.71 14.64 15.93 14.35 16.04 14.06 16.04 13.85 16.04 13.64 15.98 13.45 15.85 13.45 15.85 12 14.89 12 14.89 11.77 15 11.53 15.1 11.28 15.18 11.28 15.18 10.94 16.89 10.94 16.89 10.84 17.41 10.38 17.79 9.85 17.79 9.85 17.79 8.33 17.79 8.33 17.79 7.8 17.79 7.35 17.41 7.24 16.89 7.24 16.89 6.9 15.18 6.9 15.18 6.65 15.1 6.42 15 6.18 14.89 6.18 14.89 4.74 15.85 4.74 15.85 4.55 15.98 4.33 16.04 4.12 16.04 3.83 16.04 3.55 15.93 3.33 15.71 3.33 15.71 2.26 14.64 2.26 14.64 1.89 14.27 1.83 13.68 2.12 13.24 2.12 13.24 3.09 11.79 3.09 11.79 2.97 11.56 2.87 11.32 2.79 11.07 2.79 11.07 1.08 10.73 1.08 10.73 0.56 10.63 0.19 10.17 0.19 9.64 0.19 9.64 0.19 8.13 0.19 8.13 0.19 7.6 0.56 7.14 1.08 7.03 1.08 7.03 2.79 6.69 2.79 6.69 2.87 6.45 2.97 6.21 3.09 5.98 3.09 5.98 2.12 4.53 2.12 4.53 1.83 4.09 1.89 3.5 2.26 3.12 2.26 3.12 3.33 2.05 3.33 2.05 3.55 1.84 3.83 1.73 4.12 1.73 4.33 1.73 4.55 1.79 4.74 1.91 4.74 1.91 6.18 2.88 6.18 2.88 6.42 2.77 6.65 2.67 6.9 2.58 6.9 2.58 7.24 0.87 7.24 0.87 7.35 0.35 7.8-0.02 8.33-0.02 8.33-0.02 9.85-0.02 9.85-0.02 10.38-0.02 10.84 0.35 10.94 0.87 10.94 0.87 11.28 2.58 11.28 2.58 11.53 2.67 11.77 2.77 12 2.88 12 2.88 13.45 1.91 13.45 1.91 13.63 1.79 13.85 1.73 14.06 1.73 14.35 1.73 14.64 1.84 14.85 2.05 14.85 2.05 15.92 3.12 15.92 3.12 16.3 3.5 16.35 4.09 16.06 4.53 16.06 4.53 15.09 5.98 15.09 5.98 15.21 6.21 15.31 6.45 15.39 6.69 15.39 6.69 17.1 7.03 17.1 7.03 17.62 7.14 17.99 7.6 17.99 8.13 17.99 8.13 17.99 9.64 17.99 9.64 17.99 10.17 17.62 10.63 17.1 10.73ZM 9.06 6.19C 7.56 6.19 6.35 7.4 6.35 8.9 6.35 10.39 7.56 11.61 9.06 11.61 10.56 11.61 11.77 10.39 11.77 8.9 11.77 7.4 10.56 6.19 9.06 6.19Z"></path></svg>*/
var EditPanel = React.createClass({
    initialOptions : {
        panelId: "#j-edit-panel",
        barId : "#j-edit-bar",
        gridClass : ".j-gridster",
        panelText: ".edit-panel-text",
        gridBlockClass: ".j-grid-block",
        editorClass: ".wysiwyg-editor",
        hideClass: "hide",
        dataPanelIndex: "data-panel-index"

    },
    closePanelHandler: function () {
        var $createdHtml = $(this.initialOptions.panelText).find(this.initialOptions.editorClass);
        var _indx =  $(this.initialOptions.panelId).attr(this.initialOptions.dataPanelIndex);
        var $gridLi = $(this.initialOptions.gridBlockClass, this.initialOptions.gridClass).eq(_indx),
            $tempLi = $gridLi.find(this.initialOptions.editorClass);
        if ($tempLi.length) {
            $tempLi.remove();
            $gridLi.append($createdHtml);
        }else {
            $gridLi.append($createdHtml);
        }
        $(this.initialOptions.panelId).addClass(this.initialOptions.hideClass);
    },
    render: function () {
        return (
            <div className="">
                <div className="edit-panel-title">
                    <div className="">Editor</div>
                    <div className="" onClick={this.closePanelHandler}>关闭</div>
                </div>
                <div className="edit-panel-text"></div>
            </div>
        )
    }
})


ReactDOM.render(
    <EditBar id="j-edit-bar"/>,
    document.getElementById('j-edit-bar')
);
ReactDOM.render(
    <EditPanel/>,
    document.getElementById('j-edit-panel')
);

/*  my plugin  */
;(function($) {
    /* text editor */
    $.fn.myTextEditor = function () {
        return this.each(function (index, element) {
           $(element).wysiwyg({
                        'class': index == 0 ? 'fake-bootstrap' : (index == 1 ? 'fake-uikit' : 'some-more-classes'),
                        // 'selection'|'top'|'top-selection'|'bottom'|'bottom-selection'
                        toolbar: index == 0 ? 'top-selection' : (index == 1 ? 'bottom-focus' : 'selection'),
                        buttons: {
                            // Dummy-HTML-Plugin
                            dummybutton1: index != 1 ? false : {
                                html: $('<input id="submit" type="button" value="Save" />').click(function() {
                                    alert( 'Ready to save!' );
                                }),
                                //showstatic: true,    // wanted on the toolbar
                                showselection: false    // wanted on selection
                            },
                            // Dummy-Button-Plugin
                            /* dummybutton2: index != 1 ? false : {
                             title: 'Dummy',
                             image: '\uf1e7',
                             click: function( $button ) {
                             // We simply make 'bold'
                             if( $(element).wysiwyg('shell').getSelectedHTML() )
                             $(element).wysiwyg('shell').bold();
                             else
                             alert( 'No text selected' );
                             },
                             //showstatic: true,    // wanted on the toolbar
                             showselection: false    // wanted on selection
                             },*/
                            insertimage: {
                                title: 'Insert image',
                                image: '\uf030', // <img src="path/to/image.png" width="16" height="16" alt="" />
                                showstatic: true,    // wanted on the toolbar
                                showselection: index == 2 ? true : false    // wanted on selection
                            },
                            insertvideo: {
                                title: 'Insert video',
                                image: '\uf03d', // <img src="path/to/image.png" width="16" height="16" alt="" />
                                //showstatic: true,    // wanted on the toolbar
                                showselection: index == 2 ? true : false    // wanted on selection
                            },
                            /*insertlink: {
                             title: 'Insert link',
                             image: '\uf08e' // <img src="path/to/image.png" width="16" height="16" alt="" />
                             },*/
                            // Fontname plugin
                            fontname: index == 1 ? false : {
                                title: 'Font',
                                image: '\uf031', // <img src="path/to/image.png" width="16" height="16" alt="" />
                                popup: function( $popup, $button ) {
                                    var list_fontnames = {
                                        // Name : Font
                                        'Arial, Helvetica' : 'Arial,Helvetica',
                                        'Verdana'          : 'Verdana,Geneva',
                                        'Georgia'          : 'Georgia',
                                        'Courier New'      : 'Courier New,Courier',
                                        'Times New Roman'  : 'Times New Roman,Times'
                                    };
                                    var $list = $('<div/>').addClass('wysiwyg-plugin-list')
                                        .attr('unselectable','on');
                                    $.each( list_fontnames, function( name, font ) {
                                        var $link = $('<a/>').attr('href','#')
                                            .css( 'font-family', font )
                                            .html( name )
                                            .click(function(event) {
                                                $(element).wysiwyg('shell').fontName(font).closePopup();
                                                // prevent link-href-#
                                                event.stopPropagation();
                                                event.preventDefault();
                                                return false;
                                            });
                                        $list.append( $link );
                                    });
                                    $popup.append( $list );
                                },
                                //showstatic: true,    // wanted on the toolbar
                                showselection: index == 0 ? true : false    // wanted on selection
                            },
                            // Fontsize plugin
                            /* fontsize: index != 1 ? false : {*/
                            fontsize: {
                                title: 'Size',
                                /* style: 'color:white;background:red',  */    // you can pass any property - example: "style"
                                image: '\uf034', // <img src="path/to/image.png" width="16" height="16" alt="" />
                                popup: function( $popup, $button ) {
                                    // Hack: http://stackoverflow.com/questions/5868295/document-execcommand-fontsize-in-pixels/5870603#5870603
                                    var list_fontsizes = [];
                                    for( var i=8; i <= 11; ++i )
                                        list_fontsizes.push(i+'px');
                                    for( var i=12; i <= 28; i+=2 )
                                        list_fontsizes.push(i+'px');
                                    list_fontsizes.push('36px');
                                    list_fontsizes.push('48px');
                                    list_fontsizes.push('72px');
                                    var $list = $('<div/>').addClass('wysiwyg-plugin-list')
                                        .attr('unselectable','on');
                                    $.each( list_fontsizes, function( index, size ) {
                                        var $link = $('<a/>').attr('href','#')
                                            .html( size )
                                            .click(function(event) {
                                                $(element).wysiwyg('shell').fontSize(7).closePopup();
                                                $(element).wysiwyg('container')
                                                    .find('font[size=7]')
                                                    .removeAttr("size")
                                                    .css("font-size", size);
                                                // prevent link-href-#
                                                event.stopPropagation();
                                                event.preventDefault();
                                                return false;
                                            });
                                        $list.append( $link );
                                    });
                                    $popup.append( $list );
                                }
                                //showstatic: true,    // wanted on the toolbar
                                //showselection: true    // wanted on selection
                            },
                            // Header plugin
                            /*header: index != 1 ? false : {*/
                            header:  {
                                title: 'Header',
                                /*style: 'color:white;background:blue', */     // you can pass any property - example: "style"
                                image: '\uf1dc', // <img src="path/to/image.png" width="16" height="16" alt="" />
                                popup: function( $popup, $button ) {
                                    var list_headers = {
                                        // Name : Font
                                        'Header 1' : '<h1>',
                                        'Header 2' : '<h2>',
                                        'Header 3' : '<h3>',
                                        'Header 4' : '<h4>',
                                        'Header 5' : '<h5>',
                                        'Header 6' : '<h6>',
                                        'Code'     : '<pre>'
                                    };
                                    var $list = $('<div/>').addClass('wysiwyg-plugin-list')
                                        .attr('unselectable','on');
                                    $.each( list_headers, function( name, format ) {
                                        var $link = $('<a/>').attr('href','#')
                                            .css( 'font-family', format )
                                            .html( name )
                                            .click(function(event) {
                                                $(element).wysiwyg('shell').format(format).closePopup();
                                                // prevent link-href-#
                                                event.stopPropagation();
                                                event.preventDefault();
                                                return false;
                                            });
                                        $list.append( $link );
                                    });
                                    $popup.append( $list );
                                }
                                //showstatic: true,    // wanted on the toolbar
                                //showselection: false    // wanted on selection
                            },
                            bold: {
                                title: 'Bold (Ctrl+B)',
                                image: '\uf032', // <img src="path/to/image.png" width="16" height="16" alt="" />
                                hotkey: 'b'
                            },
                            italic: {
                                title: 'Italic (Ctrl+I)',
                                image: '\uf033', // <img src="path/to/image.png" width="16" height="16" alt="" />
                                hotkey: 'i'
                            },
                            underline: {
                                title: 'Underline (Ctrl+U)',
                                image: '\uf0cd', // <img src="path/to/image.png" width="16" height="16" alt="" />
                                hotkey: 'u'
                            },
                            strikethrough: {
                                title: 'Strikethrough (Ctrl+S)',
                                image: '\uf0cc', // <img src="path/to/image.png" width="16" height="16" alt="" />
                                hotkey: 's'
                            },
                            forecolor: {
                                title: 'Text color',
                                image: '\uf1fc' // <img src="path/to/image.png" width="16" height="16" alt="" />
                            },
                            highlight: {
                                title: 'Background color',
                                image: '\uf043' // <img src="path/to/image.png" width="16" height="16" alt="" />
                            },
                            alignleft: index != 0 ? false : {
                                title: 'Left',
                                image: '\uf036', // <img src="path/to/image.png" width="16" height="16" alt="" />
                                //showstatic: true,    // wanted on the toolbar
                                showselection: false    // wanted on selection
                            },
                            aligncenter: index != 0 ? false : {
                                title: 'Center',
                                image: '\uf037', // <img src="path/to/image.png" width="16" height="16" alt="" />
                                //showstatic: true,    // wanted on the toolbar
                                showselection: false    // wanted on selection
                            },
                            alignright: index != 0 ? false : {
                                title: 'Right',
                                image: '\uf038', // <img src="path/to/image.png" width="16" height="16" alt="" />
                                //showstatic: true,    // wanted on the toolbar
                                showselection: false    // wanted on selection
                            },
                            alignjustify: index != 0 ? false : {
                                title: 'Justify',
                                image: '\uf039', // <img src="path/to/image.png" width="16" height="16" alt="" />
                                //showstatic: true,    // wanted on the toolbar
                                showselection: false    // wanted on selection
                            },
                            subscript: index == 1 ? false : {
                                title: 'Subscript',
                                image: '\uf12c', // <img src="path/to/image.png" width="16" height="16" alt="" />
                                //showstatic: true,    // wanted on the toolbar
                                showselection: true    // wanted on selection
                            },
                            superscript: index == 1 ? false : {
                                title: 'Superscript',
                                image: '\uf12b', // <img src="path/to/image.png" width="16" height="16" alt="" />
                                //showstatic: true,    // wanted on the toolbar
                                showselection: true    // wanted on selection
                            },
                            indent: index != 0 ? false : {
                                title: 'Indent',
                                image: '\uf03c', // <img src="path/to/image.png" width="16" height="16" alt="" />
                                //showstatic: true,    // wanted on the toolbar
                                showselection: false    // wanted on selection
                            },
                            outdent: index != 0 ? false : {
                                title: 'Outdent',
                                image: '\uf03b', // <img src="path/to/image.png" width="16" height="16" alt="" />
                                //showstatic: true,    // wanted on the toolbar
                                showselection: false    // wanted on selection
                            },
                            orderedList: index != 0 ? false : {
                                title: 'Ordered list',
                                image: '\uf0cb', // <img src="path/to/image.png" width="16" height="16" alt="" />
                                //showstatic: true,    // wanted on the toolbar
                                showselection: false    // wanted on selection
                            },
                            unorderedList: index != 0 ? false : {
                                title: 'Unordered list',
                                image: '\uf0ca', // <img src="path/to/image.png" width="16" height="16" alt="" />
                                //showstatic: true,    // wanted on the toolbar
                                showselection: false    // wanted on selection
                            }/*,
                             removeformat: {
                             title: 'Remove format',
                             image: '\uf12d' // <img src="path/to/image.png" width="16" height="16" alt="" />
                             }*/
                        },
                        // Submit-Button
                        submit: {
                            title: 'Submit',
                            image: '\uf00c' // <img src="path/to/image.png" width="16" height="16" alt="" />
                        },
                        // Other properties
                        selectImage: 'Click or drop image',
                        placeholderUrl: 'www.example.com',
                        placeholderEmbed: '<embed/>',
                        maxImageSize: [600,200],
                        //filterImageType: callback( file ) {},
                        onKeyDown: function( key, character, shiftKey, altKey, ctrlKey, metaKey ) {
                            // E.g.: submit form on enter-key:
                            //if( (key == 10 || key == 13) && !shiftKey && !altKey && !ctrlKey && !metaKey ) {
                            //    submit_form();
                            //    return false; // swallow enter
                            //}
                        },
                        onKeyPress: function( key, character, shiftKey, altKey, ctrlKey, metaKey ) {
                        },
                        onKeyUp: function( key, character, shiftKey, altKey, ctrlKey, metaKey ) {
                        },
                        onAutocomplete: function( typed, key, character, shiftKey, altKey, ctrlKey, metaKey ) {
                            if( typed.indexOf('@') == 0 ) // startswith '@'
                            {
                                var usernames = [
                                    'Evelyn',
                                    'Harry',
                                    'Amelia',
                                    'Oliver',
                                    'Isabelle',
                                    'Eddie',
                                    'Editha',
                                    'Jacob',
                                    'Emily',
                                    'George',
                                    'Edison'
                                ];
                                var $list = $('<div/>').addClass('wysiwyg-plugin-list')
                                    .attr('unselectable','on');
                                $.each( usernames, function( index, username ) {
                                    if( username.toLowerCase().indexOf(typed.substring(1).toLowerCase()) !== 0 ) // don't count first character '@'
                                        return;
                                    var $link = $('<a/>').attr('href','#')
                                        .text( username )
                                        .click(function(event) {
                                            var url = 'http://example.com/user/' + username,
                                                html = '<a href="' + url + '">@' + username + '</a> ';
                                            var editor = $(element).wysiwyg('shell');
                                            // Expand selection and set inject HTML
                                            editor.expandSelection( typed.length, 0 ).insertHTML( html );
                                            editor.closePopup().getElement().focus();
                                            // prevent link-href-#
                                            event.stopPropagation();
                                            event.preventDefault();
                                            return false;
                                        });
                                    $list.append( $link );
                                });
                                if( $list.children().length )
                                {
                                    if( key == 13 )
                                    {
                                        $list.children(':first').click();
                                        return false; // swallow enter
                                    }
                                    // Show popup
                                    else if( character || key == 8 )
                                        return $list;
                                }
                            }
                        },
                        onImageUpload: function( insert_image ) {
                            // A bit tricky, because we can't easily upload a file via
                            // '$.ajax()' on a legacy browser without XMLHttpRequest2.
                            // You have to submit the form into an '<iframe/>' element.
                            // Call 'insert_image(url)' as soon as the file is online
                            // and the URL is available.
                            // Example server script (written in PHP):
                            /*
                             <?php
                             $upload = $_FILES['upload-filename'];
                             // Crucial: Forbid code files
                             $file_extension = pathinfo( $upload['name'], PATHINFO_EXTENSION );
                             if( $file_extension != 'jpeg' && $file_extension != 'jpg' && $file_extension != 'png' && $file_extension != 'gif' )
                             die("Wrong file extension.");
                             $filename = 'image-'.md5(microtime(true)).'.'.$file_extension;
                             $filepath = '/path/to/'.$filename;
                             $serverpath = 'http://domain.com/path/to/'.$filename;
                             move_uploaded_file( $upload['tmp_name'], $filepath );
                             echo $serverpath;
                             */
                            // Example client script (without upload-progressbar):
                            var iframe_name = 'legacy-uploader-' + Math.random().toString(36).substring(2);
                            $('<iframe>').attr('name',iframe_name)
                                .load(function() {
                                    // <iframe> is ready - we will find the URL in the iframe-body
                                    var iframe = this;
                                    var iframedoc = iframe.contentDocument ? iframe.contentDocument :
                                        (iframe.contentWindow ? iframe.contentWindow.document : iframe.document);
                                    var iframebody = iframedoc.getElementsByTagName('body')[0];
                                    var image_url = iframebody.innerHTML;
                                    insert_image( image_url );
                                    $(iframe).remove();
                                })
                                .appendTo(document.body);
                            var $input = $(this);
                            $input.attr('name','upload-filename')
                                .parents('form')
                                .attr('action','/script.php') // accessing cross domain <iframes> could be difficult
                                .attr('method','POST')
                                .attr('enctype','multipart/form-data')
                                .attr('target',iframe_name)
                                .submit();
                        },
                        forceImageUpload: false,    // upload images even if File-API is present
                        videoFromUrl: function( url ) {
                            // Contributions are welcome :-)

                            // youtube - http://stackoverflow.com/questions/3392993/php-regex-to-get-youtube-video-id
                            var youtube_match = url.match( /^(?:http(?:s)?:\/\/)?(?:[a-z0-9.]+\.)?(?:youtu\.be|youtube\.com)\/(?:(?:watch)?\?(?:.*&)?v(?:i)?=|(?:embed|v|vi|user)\/)([^\?&\"'>]+)/ );
                            if( youtube_match && youtube_match[1].length == 11 )
                                return '<iframe src="//www.youtube.com/embed/' + youtube_match[1] + '" width="640" height="360" frameborder="0" allowfullscreen></iframe>';

                            // vimeo - http://embedresponsively.com/
                            var vimeo_match = url.match( /^(?:http(?:s)?:\/\/)?(?:[a-z0-9.]+\.)?vimeo\.com\/([0-9]+)$/ );
                            if( vimeo_match )
                                return '<iframe src="//player.vimeo.com/video/' + vimeo_match[1] + '" width="640" height="360" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';

                            // dailymotion - http://embedresponsively.com/
                            var dailymotion_match = url.match( /^(?:http(?:s)?:\/\/)?(?:[a-z0-9.]+\.)?dailymotion\.com\/video\/([0-9a-z]+)$/ );
                            if( dailymotion_match )
                                return '<iframe src="//www.dailymotion.com/embed/video/' + dailymotion_match[1] + '" width="640" height="360" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';

                            // undefined -> create '<video/>' tag
                        }
                    })
                    .change(function() {
                        if( typeof console != 'undefined' )
                            ;//console.log( 'change' );
                    })
                    .focus(function() {
                        if( typeof console != 'undefined' )
                            ;//console.log( 'focus' );
                    })
                    .blur(function() {
                        if( typeof console != 'undefined' )
                            ;//console.log( 'blur' );
                    });
            });
    };
    /*  panel drag */
    $.fn.dragDiv = function(divWrap) {
        return this.each(function() {
            var $divMove = $(this), /*draggable area */
                $divWrap = divWrap ? $divMove.parents(divWrap) : $divMove; /*whole movable area*/
            var mX = 0, mY = 0, dX = 0, dY = 0,
                isDown = false; /*mousedown flag*/
            if(document.attachEvent) { /*ie listener*/
                $divMove[0].attachEvent('onselectstart', function() {
                    return false;
                });
            }
            $divMove.mousedown(function(event) {
                var event = event || window.event;
                mX = event.clientX;
                mY = event.clientY;
                dX = $divWrap.offset().left;
                dY = $divWrap.offset().top;
                isDown = true;/* drag : start */
            });
            $(document).mousemove(function(event) {
                var event = event || window.event;
                var x = event.clientX,
                    y = event.clientY;
                if(isDown) {
                    $divWrap.css({"left": x - mX + dX, "top": y - mY + dY});
                }
            });
            $divMove.mouseup(function() {
                isDown = false; /*drag : start */
            });
        });
    };
})(jQuery);


/* init code  */
var gridster;
$(function() {
    gridster = $(".j-gridster ul").gridster({
        widget_base_dimensions: [100, 55],
        widget_margins: [5, 5],
        autogrow_cols: true,
        resize: {
            enabled: true
        }
    }).data('gridster');


    $('.js-seralize').on('click', function() {
        var s = gridster.serialize();
        $('#log').val(JSON.stringify(s));

        var b = new bsgridster(s, 50, 'graybox');
        var v = b.getHtml();
        $('#grids').html(v);
        $('#bs-log').val(v.innerHTML);
    });

    $(".j-grid-block",".j-gridster").on("mouseover", function () {
        var $offset = $(this).offset(),
            _top = $offset.top,
            _left = $offset.left;
        $("#j-edit-bar").css({"top":_top -23,"left":_left}).removeClass("hide").attr("data-bar-index",$(this).index());
    });

    $(".edit-panel-title").dragDiv("#j-edit-panel");
});