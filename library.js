$(document).ready(function() {
    
    
//Helper Functions
    
    //This clears the selection on the window to avoid double-click selection when interacting with elems
    function clearSelection() {
        if(document.selection && document.selection.empty) {
            document.selection.empty();
        } else if(window.getSelection) {
            var sel = window.getSelection();
            sel.removeAllRanges();
        }
    }
    
    
    
//Click Event Handlers
    
    // When the "Playlist" button is hit it shows the listblock
    $(".expander.plist").click(function() {
        $(".plist.listblock").toggle();
        clearSelection();
    });
    
    //When the browse button is hit, it shows the listblock
    $(".expander.lib").click(function() {
        $(".lib.listblock").toggle();
        clearSelection();
    });
    
    //When a playlist is selected
    $(".plist li").click(function() {
        $(this).parent().find('li').removeClass('selected');
        $('.lib').removeClass('selected');
        $(this).addClass('selected');
    });
    
    //when the library is selected
    $(".lib.listblock").click(function() {
        $('.plist ul').find('li').removeClass('selected');
        $(this).addClass('selected');
    });
    
});