< script >
  document.onkeydown = fkey;
document.onkeypress = fkey
document.onkeyup = fkey;

var wasPressed = false;

function fkey(e) {
  e = e || window.event;
  if (wasPressed) return;

  if (e.code === 'F5') {
    alert("f5 pressed");
    wasPressed = true;
  } else {
    alert("Window closed");
  }
}

$(function () {
  $('input[name="datetimes"]').daterangepicker({
    timePicker: true,
    startDate: moment().startOf('hour'),
    endDate: moment().startOf('hour').add(32, 'hour'),
    locale: {
      format: 'DD/MM/YYYY hh:mm A'
    }
  });
}); 
</script>



