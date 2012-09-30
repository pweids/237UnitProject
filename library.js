$(document).ready(function() {
    function clearSelection() {
        if(document.selection && document.selection.empty) {
            document.selection.empty();
        } else if(window.getSelection) {
            var sel = window.getSelection();
            sel.removeAllRanges();
        }
    }
    
    $(".expander.plist").click(function() {
        $(".plist.listblock").toggle();
        clearSelection();
    });
    
    $(".expander.lib").click(function() {
        $(".lib.listblock").toggle();
        clearSelection();
    });
    
    $(".plist li").click(function() {
        $(this).parent().find('li').removeClass('selected');
        $('.lib').removeClass('selected');
        $(this).addClass('selected');
    });
    
    $(".lib.listblock").click(function() {
        $('.plist ul').find('li').removeClass('selected');
        $(this).addClass('selected');
    });
    
});