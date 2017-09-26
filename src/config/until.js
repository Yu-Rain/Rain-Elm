let imgBaseURL = 'https://fuss10.elemecdn.com';

// 根据img hash值处理图片路径.
function imgURL (imageHash, size){
      if (!imageHash) {
        return;
      }

      var first = imageHash.substr(0, 1);
      var second = imageHash.substr(1, 2);
      var third = imageHash.substr(3);
      var imgType = imageHash.substr(32);

      var path = imgBaseURL + '/' + first + '/' + second + '/' + third + '.' + imgType + '?' + 'imageMogr/thumbnail/!' + size + 'r/gravity/Center/crop/' + size + '/';

      return path;
};

export const mixinOfImgURL = {
  methods: {
    imgURL,

    getBlurImgPath: function(imageHash, p, size) {
      const str = imgURL(imageHash);
      const path = str + 'format/webp/thumbnail/!' + p + 'p/blur/' + size + '/';
      return path;
    },

      }
};