document.addEventListener("DOMContentLoaded", () => {
    // Select elements
    const counterDisplay = document.getElementById("counter");
    const plusButton = document.getElementById("plus");
    const minusButton = document.getElementById("minus");
    const likeButton = document.getElementById("heart");
    const pauseButton = document.getElementById("pause");
    const commentForm = document.getElementById("comment-form");
    const commentList = document.getElementById("list");

    // Counter variables
    let counterValue = 0;
    let intervalId;

    // Function to increment counter
    function incrementCounter() {
        counterValue++;
        counterDisplay.textContent = counterValue;
    }

    // Function to decrement counter
    function decrementCounter() {
        counterValue--;
        counterDisplay.textContent = counterValue;
    }

    // Function to handle like button click
    function likeCounter() {
        const likeList = document.querySelector(".likes");
        const existingLike = document.querySelector(`li[data-num="${counterValue}"]`);

        if (existingLike) {
            existingLike.dataset.likes++;
            existingLike.textContent = `${counterValue} has been liked ${existingLike.dataset.likes} times`;
        } else {
            const newLike = document.createElement("li");
            newLike.dataset.num = counterValue;
            newLike.dataset.likes = 1;
            newLike.textContent = `${counterValue} has been liked 1 time`;
            likeList.appendChild(newLike);
        }
    }

    // Function to handle pause button click
    function togglePause() {
        if (pauseButton.textContent === "pause") {
            clearInterval(intervalId);
            plusButton.disabled = true;
            minusButton.disabled = true;
            likeButton.disabled = true;
            pauseButton.textContent = "resume";
        } else {
            intervalId = setInterval(incrementCounter, 1000);
            plusButton.disabled = false;
            minusButton.disabled = false;
            likeButton.disabled = false;
            pauseButton.textContent = "pause";
        }
    }

    // Function to handle comment submission
    function addComment(event) {
        event.preventDefault();
        const commentInput = document.getElementById("comment-input");
        const commentText = commentInput.value.trim();
        if (commentText) {
            const commentItem = document.createElement("li");
            commentItem.textContent = commentText;
            commentList.appendChild(commentItem);
            commentForm.reset();
        }
    }

    // Add event listeners
    plusButton.addEventListener("click", incrementCounter);
    minusButton.addEventListener("click", decrementCounter);
    likeButton.addEventListener("click", likeCounter);
    pauseButton.addEventListener("click", togglePause);
    commentForm.addEventListener("submit", addComment);

    // Start counter
    intervalId = setInterval(incrementCounter, 1000);
});