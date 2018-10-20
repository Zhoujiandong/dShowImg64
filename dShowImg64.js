    function changeImg(obj = {}) {                          //id,limitType,limitSize

        if(!obj.id) return;
        if(!obj.limitType)return;
        var dom = document.querySelector("#"+obj.imgBox);
        var files =  document.querySelector("#"+obj.id).files[0];
        var reader = new FileReader();
        var type = files.type && files.type.split('/')[1];           //�ļ������ͣ��ж��Ƿ���ͼƬ
        var size = files.size;         //�ļ��Ĵ�С���ж�ͼƬ�Ĵ�С
        if (obj.limitType.indexOf(type) == -1) {
            alert('�������ϴ�Ҫ��');
            return;
        }
        var limitSize = obj.limitSize ? parseInt(obj.limitSize) : 0;
        if (size < limitSize) {
            reader.readAsDataURL(files);              
            reader.onloadend = function () {
                dom.style.backgroundImage = "url("+this.result+")";
                document.querySelector(".default-box").style.display = "none";
            }
        } else {                                    
            var imageUrl = this.getObjectURL(files);
            this.convertImg(imageUrl, function (base64Img) {
                dom.style.backgroundImage = "url("+base64Img+")";
                document.querySelector(".default-box").style.display = "none";
            }, type)
        }
    }
    function convertImg(url, callback, outputFormat) {
        var canvas = document.createElement('CANVAS');
        var ctx = canvas.getContext('2d');
        var img = new Image;
        img.crossOrigin = 'Anonymous';
        img.onload = function () {
            var width = img.width;
            var height = img.height;
            // ������ѹ��2��
            var rate = (width < height ? width / height : height / width) / 2;
            canvas.width = width * rate;
            canvas.height = height * rate;
            ctx.drawImage(img, 0, 0, width, height, 0, 0, width * rate, height * rate);
            var dataURL = canvas.toDataURL(outputFormat || 'image/png');
            callback.call(this, dataURL);
            canvas = null;
        };
        img.src = url;
    }
    function getObjectURL(file) {
        var url = null;
        if (window.createObjectURL != undefined) {  // basic
            url = window.createObjectURL(file);
        } else if (window.URL != undefined) {       // mozilla(firefox)
            url = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) { // web_kit or chrome
            url = window.webkitURL.createObjectURL(file);
        }
        return url;
    }