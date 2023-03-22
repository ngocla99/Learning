export const getCaretPosition = (element) => {
    // Internet Explorer Caret Position (TextArea)
    if (document.selection && document.selection.createRange) {
        var range = document.selection.createRange();
        var bookmark = range.getBookmark();
        var caret_pos = bookmark.charCodeAt(2) - 2;
    } else {
        // Firefox Caret Position (TextArea)
        if (element.setSelectionRange) var caret_pos = element.selectionStart;
    }

    return caret_pos;
};

export const setCaretPosition = (element, caretPos) => {
    if (element != null) {
        if (element.createTextRange) {
            var range = element.createTextRange();
            range.move('character', caretPos);
            range.select();
        } else {
            if (element.selectionStart) {
                element.focus();
                element.setSelectionRange(caretPos, caretPos);
            } else element.focus();
        }
    }
};
