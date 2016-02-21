function generateJson (form) {
  var publicKeyVal = form.new-cert.value

  var obj = {
    publicKey: publicKeyVal

  }
  var myJson = JSON.stringify(obj);
  console.log(myJson);
}
