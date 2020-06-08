/**
 * 使用canvas对图片进行压缩
 *
 * @param file <input type='file'> 中获取到的file对象
 * @param afterCompress 压缩后回调 afterCompress(newFile){...}
 * @param iosfix 是否修正ios设备上传导致的旋转问题
 * @param size 压缩的大小，默认不填则为50%  可以填写单个数字表示百分比 比如30 或者填写指定宽高 300x400
 */
export function compressImageFile(file, iosfix, size) {
  // 旋转修正
  if (iosfix) {
    console.log("isofix: " + navigator.userAgent);
    EXIF.getData(file, function() {
      EXIF.getAllTags(this);
      let orientation = EXIF.getTag(this, "Orientation");
      console.log("isofix-na: " + navigator.userAgent);
      console.log("isofix-or: " + orientation);
      if (orientation == "" || typeof orientation == "undefined") {
        orientation = 1;
      }
      return compressAndFixImageFile(file, orientation, size);
    });
  }
  // 直接压缩
  else {
    return compressAndFixImageFile(file, 1, size);
  }
}

export function compressAndFixImageFile(file, orientation, size) {
  return new Promise(resolve => {
    // 压缩图片需要的一些元素和对象
    let reader = new FileReader();
    let img = new Image();
    // 缩放图片需要的canvas
    let canvas = document.createElement("canvas");
    let context = canvas.getContext("2d");

    // 1,3不需要交换宽高
    let needWHChange = orientation == 6 || orientation == 8;

    // base64地址图片加载完毕后
    img.onload = function() {
      // 图片原始尺寸
      let originWidth = this.width;
      let originHeight = this.height;

      console.log("origin: w" + originWidth + " h" + originHeight);

      // 最大可接受尺寸
      let maxWidth = 0;
      let maxHeight = 0;

      // 无配置则默认大小一半
      if (!size) {
        maxWidth = Math.round(originWidth * 0.5);
        maxHeight = Math.round(originHeight * 0.5);
      } else {
        size = ("" + size).toLowerCase();
        // 指定宽高
        if (size.indexOf("x") != -1) {
          let swh = size.split("x");
          maxWidth = parseInt(swh[0]);
          maxHeight = parseInt(swh[1]);
          // 交换下，因为这是在旋转前的
          if (needWHChange) {
            let tmp = maxWidth;
            maxWidth = maxHeight;
            maxHeight = tmp;
          }
        }
        // 单数字百分比
        else {
          let per = parseInt(size);
          if (per == 100) {
            maxWidth = originWidth;
            maxHeight = originHeight;
          } else {
            maxWidth = Math.round(originWidth * (per / 100));
            maxHeight = Math.round(originHeight * (per / 100));
          }
        }
      }

      // 目标尺寸
      let targetWidth = originWidth,
        targetHeight = originHeight;
      // 图片尺寸超过最大图片限制
      if (originWidth > maxWidth || originHeight > maxHeight) {
        if (originWidth / originHeight > maxWidth / maxHeight) {
          // 更宽，按照宽度限定尺寸
          targetWidth = maxWidth;
          targetHeight = Math.round(maxWidth * (originHeight / originWidth));
        } else {
          targetHeight = maxHeight;
          targetWidth = Math.round(maxHeight * (originWidth / originHeight));
        }
      }

      // canvas对图片进行缩放
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      // 清除画布
      context.clearRect(0, 0, targetWidth, targetHeight);
      // 图片压缩
      context.drawImage(img, 0, 0, targetWidth, targetHeight);

      // 是否需要选择
      if (orientation != 1) {
        switch (orientation) {
          case 6: //需要顺时针（向左）90度旋转
            canvas.width = targetHeight;
            canvas.height = targetWidth;
            context.rotate(Math.PI / 2);
            // (0,-imgHeight) 从旋转原理图那里获得的起始点
            context.drawImage(img, 0, -targetHeight, targetWidth, targetHeight);
            break;
          case 8: //需要逆时针（向右）90度旋转
            canvas.width = imgHeight;
            canvas.height = imgWidth;
            context.rotate((3 * Math.PI) / 2);
            context.drawImage(img, -targetWidth, 0, targetWidth, targetHeight);
            break;
          case 3: //需要180度旋转
            context.rotate(Math.PI);
            context.drawImage(img, -targetWidth, -targetHeight, targetWidth, targetHeight);
            break;
        }
      }

      // canvas转为blob并上传
      canvas.toBlob(
        function(blob) {
          resolve(blob);
        },
        file.type || "image/jpeg",
        0.9
      );
    };
    // 文件base64化，以便获知图片原始尺寸
    reader.onload = function(e) {
      img.src = e.target.result;
    };

    // 真正加载图片文件
    if (file.type.indexOf("image") == 0) {
      reader.readAsDataURL(file);
    } else {
      throw "file is not image";
    }
  });
}
