let imgBaseURL = 'https://fuss10.elemecdn.com';

// 根据img hash值处理图片路径.
function imgPath (imageHash, size){
      if (!imageHash) {
        return;
      }

      var first = imageHash.substr(0, 1);
      var second = imageHash.substr(1, 2);
      var third = imageHash.substr(3);
      var imgType = imageHash.substr(32);

      var path = imgBaseURL + '/' + first + '/' + second + '/' + third + '.' + imgType + '?' + 'imageMogr/';

      return path;
};

export const mixinOfImgURL = {
  methods: {
    imgURL: function (imageHash, size) {
      const url = imgPath(imageHash);
      // console.log('imgURL: ', url + 'format/webp/thumbnail/!'+size+'r/gravity/Center/crop/'+size+'/');
      return url + 'format/webp/thumbnail/!'+size+'r/gravity/Center/crop/'+size+'/';
    },

    getBlurImgPath: function(imageHash, p, size) {
      const str = imgPath(imageHash);
      const path = str + 'format/webp/thumbnail/!' + p + 'p/blur/' + size + '/';
      // console.log('path', path);
      return path;
    },

      }
};