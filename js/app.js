function reloadOrientation() {
    window.addEventListener("orientationchange", function () {
      location.reload();
    }, false);
}