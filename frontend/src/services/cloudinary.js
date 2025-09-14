// export async function uploadImageToCloudinary(file) {
//   const url = `https://api.cloudinary.com/v1_1/${
//     import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
//   }/image/upload`;

//   const fd = new FormData();
//   fd.append("file", file);
//   fd.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);
//   // optionally: fd.append('folder', 'venues'); // if you want to override preset folder

//   const res = await fetch(url, { method: "POST", body: fd });
//   if (!res.ok) throw new Error("Cloudinary upload failed");
//   const json = await res.json();
//   // json.secure_url is the hosted image URL
//   return json; // contains secure_url, public_id, width, height, etc.
// }

// // helper to upload many and return array of secure_urls
// export async function uploadImagesToCloudinary(files) {
//   const uploaded = [];
//   for (const file of files) {
//     const r = await uploadImageToCloudinary(file); // sequential; ok for small counts
//     uploaded.push(r);
//   }
//   return uploaded; // array of Cloudinary responses
// }
