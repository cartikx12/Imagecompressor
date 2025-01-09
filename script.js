const uploadBox = document.querySelector(".upload-box"),
previewImg = uploadBox.querySelector("img"),
fileInput = uploadBox.querySelector("input"),
widthInput = document.querySelector(".width input"),
heightInput = document.querySelector(".height input"),
ratioInput = document.querySelector(".ratio input"),
qualityInput = document.querySelector(".quality input"),
downloadBtn = document.querySelector(".download-btn");

let ogImageRatio;

const loadFile = (e) => {
    const file = e.target.files[0]; // getting first user selected file
    if(!file) {
        console.log("No file selected");
        return; // return if user hasn't selected any file
    }
    console.log("File selected:", file);
    previewImg.src = URL.createObjectURL(file); // passing selected file url to preview img src
    previewImg.addEventListener("load", () => { // once img loaded
        console.log("Image loaded");
        widthInput.value = previewImg.naturalWidth;
        heightInput.value = previewImg.naturalHeight;
        ogImageRatio = previewImg.naturalWidth / previewImg.naturalHeight;
        document.querySelector(".wrapper").classList.add("active");
    });
}

const resizeAndDownload = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const width = parseInt(widthInput.value);
    const height = parseInt(heightInput.value);
    const quality = parseFloat(qualityInput.value) / 100;

    canvas.width = width;
    canvas.height = height;

    ctx.drawImage(previewImg, 0, 0, width, height);

    canvas.toBlob((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "resized-image.jpg";
        link.click();
    }, "image/jpeg", quality);
}

fileInput.addEventListener("change", loadFile);

uploadBox.addEventListener("click", () => fileInput.click());

widthInput.addEventListener("keyup", () => {
    // getting height according to the ratio checkbox status
    const height = ratioInput.checked ? widthInput.value / ogImageRatio : heightInput.value;
    heightInput.value = Math.floor(height);
});

downloadBtn.addEventListener("click", resizeAndDownload);