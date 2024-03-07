import React from "react";
import { Link } from "react-router-dom";

const ImageUploadComponent = ({ setError, clearErrors, errors, setValue }) => {
  return (
    <>
      <label htmlFor="MembershipImages" className="form-label">
        {errors._image?.type === "required" ? (
          <p role="alert" className="text-danger">
            Membership Images Size 300 * 300 & UPTO 500 KB is required
          </p>
        ) : (
          "Images Size 300 * 300 & UPTO 500 KB"
        )}
      </label>
      <input
        accept="image/*"
        className="text-input-filed type_2"
        id="MembershipImages"
        type="file"
        name="_image"
        onChange={(e) => {
          const selectedFile = e.target.files[0];
          if (selectedFile) {
            if (selectedFile.size > 512000) {
              setError("_image", {
                type: "maxFileSize",
                message: "File size should be less than or equal to 500 KB ",
              });
            } else {
              setValue("_image", selectedFile);
              clearErrors("_image");
            }
          }
        }}
      />
      {errors._image && errors._image.type === "maxFileSize" && (
        <>
          <span className="text-danger">{errors._image.message}</span>
          <Link to="https://imageresizer.com/">Click Here: imageresizer</Link>
        </>
      )}
    </>
  );
};

export default ImageUploadComponent;
