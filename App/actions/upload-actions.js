import { RNS3 } from 'react-native-aws3';

export function uploadFile(folder, name, path, uploadComplete) {
    const file = {
        // `uri` can also be a file system path (i.e. file://)
        uri: path,
        name: name,
        type: "image/png"
      }
      
      const options = {
        keyPrefix: folder,
        bucket: "mediq-assets",
        region: "ap-southeast-1",
        accessKey: "AKIAJPFJS6OMBTM5VUDA",
        secretKey: "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",
        successActionStatus: 201
      }
      
      RNS3.put(file, options).then(response => {
        if (response.status !== 201){
            alert(JSON.stringify(response));
          throw new Error("Failed to upload image to S3");
        }
        //alert(response.body);
        uploadComplete();
        /**
         * {
         *   postResponse: {
         *     bucket: "your-bucket",
         *     etag : "9f620878e06d28774406017480a59fd4",
         *     key: "uploads/image.png",
         *     location: "https://your-bucket.s3.amazonaws.com/uploads%2Fimage.png"
         *   }
         * }
         */
      }).catch(error => {
        alert("Error in uploading image, please check your internet connection.");
      });
}