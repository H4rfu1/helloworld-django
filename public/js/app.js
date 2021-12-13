$("#submit").click( function () {
    var ihsg = $('#ihsg').val();
    var unit = $('#unit').val();
    $.ajaxSetup({
        headers: {
            "X-CSRFToken": document.querySelector('[name=csrfmiddlewaretoken]').value,
        }
    });
    $.ajax({
    url: '/ml/predictnab',
    method: 'POST',
    data: {
      'ihsg': ihsg,
      'unit': unit,
    },
    dataType: 'json',
    success: function (data) {
        // alert('Result : ' + data.result);
        // console.log(data);
        // console.log(data.result);
        $('#result').text('Prediksi NAB : ' + formatRupiah(data.result, 'Rp') )
        // formatRupiah(data.result, 'Rp')
    }
  });
});

function formatRupiah(bilangan, prefix){
  var	number_string = bilangan.toString(),
	sisa 	= number_string.length % 3,
	rupiah 	= number_string.substr(0, sisa),
	ribuan 	= number_string.substr(sisa).match(/\d{3}/g);
		
  // var number_string = angka.replace(/[^,\d]/g, '').toString(),
  // split   		= number_string.split(','),
  // sisa     		= split[0].length % 3,
  // rupiah     		= split[0].substr(0, sisa),
  // ribuan     		= split[0].substr(sisa).match(/\d{3}/gi);

  // tambahkan titik jika yang di input sudah menjadi angka ribuan
  if(ribuan){
    separator = sisa ? '.' : '';
    rupiah += separator + ribuan.join('.');
  }

  // rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
  return prefix == undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '');
}