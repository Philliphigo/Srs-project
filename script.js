// Get the elements from the document
const musicFile = document.getElementById("musicFile");
const musicFileName = document.getElementById("musicFileName");
const coverImage = document.getElementById("coverImage");
const coverImageName = document.getElementById("coverImageName");
const coverPreview = document.getElementById("coverPreview");
const audio = document.getElementById("audio");
const playButton = document.getElementById("play-button");
const volumeControl = document.getElementById("volume-control");
const volumeIndicator = document.getElementById("volume-indicator");
const progressBar = document.getElementById("progress-bar");
const progressIndicator = document.getElementById("progress-indicator");
const timeDisplay = document.getElementById("time-display");
const musicUploadForm = document.getElementById("musicUploadForm");

// Add an event listener to the music file input
musicFile.addEventListener("change", function() {
  // Get the selected file
  const file = this.files[0];
  // Check if the file is a valid mp3 file
  if (file && file.type === "audio/mpeg") {
    // Show the file name
    musicFileName.textContent = file.name;
    // Create a URL for the file
    const url = URL.createObjectURL(file);
    // Set the source of the audio element to the file URL
    audio.src = url;
    // Load the audio
    audio.load();
    // Play the audio
    audio.play();
    // Change the play button icon to pause
    playButton.innerHTML = "<i class='fas fa-pause'></i>";
  } else {
    // Show an error message
    alert("Please choose a valid mp3 file");
  }
});

// Add an event listener to the cover image input
coverImage.addEventListener("change", function() {
  // Get the selected file
  const file = this.files[0];
  // Check if the file is a valid image file
  if (file && file.type.startsWith("image/")) {
    // Show the file name
    coverImageName.textContent = file.name;
    // Create a URL for the file
    const url = URL.createObjectURL(file);
    // Set the source of the cover preview to the file URL
    coverPreview.src = url;
  } else {
    // Show an error message
    alert("Please choose a valid image file");
  }
});

// Add an event listener to the play button
playButton.addEventListener("click", function() {
  // Check if the audio is paused
  if (audio.paused) {
    // Play the audio
    audio.play();
    // Change the button icon to pause
    this.innerHTML = "<i class='fas fa-pause'></i>";
  } else {
    // Pause the audio
    audio.pause();
    // Change the button icon to play
    this.innerHTML = "<i class='fas fa-play'></i>";
  }
});

// Add an event listener to the volume control
volumeControl.addEventListener("click", function(e) {
  // Get the position of the click relative to the volume control
  const x = e.offsetX;
  // Get the width of the volume control
  const width = this.offsetWidth;
  // Calculate the percentage of the volume
  const percentage = x / width;
  // Set the volume of the audio to the percentage
  audio.volume = percentage;
  // Set the width of the volume indicator to the percentage
  volumeIndicator.style.width = percentage * 100 + "%";
});

// Add an event listener to the progress bar
progressBar.addEventListener("click", function(e) {
  // Get the position of the click relative to the progress bar
  const x = e.offsetX;
  // Get the width of the progress bar
  const width = this.offsetWidth;
  // Calculate the percentage of the progress
  const percentage = x / width;
  // Calculate the time of the audio based on the percentage
  const time = percentage * audio.duration;
  // Set the current time of the audio to the time
  audio.currentTime = time;
});

// Add an event listener to the audio when it is playing
audio.addEventListener("timeupdate", function() {
  // Get the current time of the audio
  const currentTime = this.currentTime;
  // Get the duration of the audio
  const duration = this.duration;
  // Calculate the percentage of the progress
  const percentage = currentTime / duration;
  // Set the width of the progress indicator to the percentage
  progressIndicator.style.width = percentage * 100 + "%";
  // Format the current time and duration as mm:ss
  const currentMinutes = Math.floor(currentTime / 60);
  const currentSeconds = Math.floor(currentTime % 60);
  const durationMinutes = Math.floor(duration / 60);
  const durationSeconds = Math.floor(duration % 60);
  const formattedCurrentTime = currentMinutes.toString().padStart(2, "0") + ":" + currentSeconds.toString().padStart(2, "0");
  const formattedDuration = durationMinutes.toString().padStart(2, "0") + ":" + durationSeconds.toString().padStart(2, "0");
  // Show the current time and duration in the time display
  timeDisplay.textContent = formattedCurrentTime + " / " + formattedDuration;
});

// Add an event listener to the form when it is submitted
musicUploadForm.addEventListener("submit", function(e) {
  // Prevent the default behavior of the form
  e.preventDefault();
  // Create a new FormData object
  const formData = new FormData(this);
  // Send the form data to the server using fetch
  fetch(this.action, {
    method: this.method,
    body: formData
  })
  .then(response => response.text())
  .then(data => {
    // Show the response from the server
    alert(data);
  })
  .catch(error => {
    // Show the error message
    alert(error);
  });
});
