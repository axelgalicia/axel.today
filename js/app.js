function reloadOrientation() {
    window.addEventListener("orientationchange", function () {
        console.log(screen.orientation);
        location.reload();
    }, false);
}