const cloudinary = require("cloudinary").v2;

exports.uploadImageToCloudinary = async (file, folder, height, quality) => {
    try {
        // File upload options
        const options = { folder };

        if (height) {
            options.height = height;
        }
        if (quality) {
            options.quality = quality;
        }
        options.resource_type = "auto";

        // Upload file to Cloudinary
        const result = await cloudinary.uploader.upload(file.tempFilePath, options);
        return result;
    } catch (error) {
        console.error("Error uploading file to Cloudinary:", error);
        return {
            success: false,
            message: "Some problem occurred while uploading the file.",
            error: error.message
        };
    }
};
