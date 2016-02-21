    // define(function (require) {
    //       var sjcl = require('core.js');
    //     });
    var public_key, secret_key, public_key_hex, secret_key_hex;
    var canvas, context, imageObj;
    var bitArray, digest_sha256;
    var sig, verified;

    function loadCanvas(){
      canvas = document.createElement('canvas');
      context = canvas.getContext('2d');
      imageObj = new Image();
      imageObj.src = '/img/titulo.jpg';
      console.log("hello!");
    }

    function createKeys(){
      crypto_keys = sjcl.ecc.ecdsa.generateKeys(256);

      public_key = crypto_keys.pub.get();
      secret_key = crypto_keys.sec.get();

      public_key_hex = sjcl.codec.hex.fromBits(public_key.x) + sjcl.codec.hex.fromBits(public_key.y);
      secret_key_hex = sjcl.codec.hex.fromBits(secret_key);

      console.log(public_key_hex + ":::" + secret_key_hex);
    }

    function getImgBase64(){
      var base64 = canvas.toDataURL("image/jpg");
      console.log(base64);
    }

    function getDigest(){
      bitArray = sjcl.hash.sha256.hash(base64);
      digest_sha256 = sjcl.codec.hex.fromBits(bitArray);
      console.log(digest_sha256);
    }

    function sign(digestHash){
      sig = crypto_keys.sec.sign(digest_sha256);
    }

    function verify(digestHash, signature){
      try{
        return crypto_keys.pub.verify(digestHash, signature);
      }catch(err){
        return false;
      }
    }
      loadCanvas();
      imageObj.onload = function() {
        console.log("hola");
        context.drawImage(imageObj, 0, 0, 110, 150);
        console.log("its me!");
        createKeys();
        getImgBase64();
        getDigest();

        // document.getElementById("md5").innerHTML += digest_sha256;
        // document.getElementById("private").innerHTML += secret_key_hex;
        // document.getElementById("public").innerHTML += public_key_hex;
        //document.getElementById("base64").innerHTML += base64;

        console.log("ENCRYPTION");
        sign(digest_sha256);

        verified = verify("digest_sha256", sig);

        if(verified){
          console.log("verified");
        }else{
          console.log("bullshit");
        }
      };
