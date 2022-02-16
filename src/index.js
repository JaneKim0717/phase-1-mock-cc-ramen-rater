document.addEventListener("DOMContentLoaded", function() {
    fetch("http://localhost:3000/ramens")
    .then(response => response.json())
    .then(ramens => renderRamens(ramens))

    const ramenMenu = document.getElementById("ramen-menu");
    // const ramenDetail = document.getElementById("ramen-detail");
    const detailImage = document.querySelector(".detail-image");
    const ramenDetailName = document.querySelector(".name");
    const ramenDetailRestaurant = document.querySelector(".restaurant");
    const ratingDisplay = document.getElementById("rating-display");
    const commentDisplay = document.getElementById("comment-display");

    function renderRamens(ramens) {
        ramens.forEach(function(singleRamenObj) {
            const ramenImage = document.createElement("img")
            ramenImage.setAttribute("src", singleRamenObj.image)
            ramenMenu.appendChild(ramenImage)

            ramenImage.addEventListener("click", function() {
                detailImage.setAttribute("src", singleRamenObj.image);
                ramenDetailName.innerText = singleRamenObj.name;
                ramenDetailRestaurant.innerText = singleRamenObj.restaurant;
                ratingDisplay.innerText = singleRamenObj.rating;
                commentDisplay.innerText = singleRamenObj.comment;
            })
        })
    }

    const newRamenForm = document.getElementById("new-ramen");
    newRamenForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const newName = document.getElementById("new-name").value;
        const newRestaurant = document.getElementById("new-restaurant").value;
        const newImage = document.getElementById("new-image").value;
        const newRating = document.getElementById("new-rating").value;
        const newComment = document.getElementById("new-comment").value;

        const newRamenImage = document.createElement("img");
        newRamenImage.setAttribute("src", newImage);
        ramenMenu.appendChild(newRamenImage)

        newRamenImage.addEventListener("click", function() {
            detailImage.setAttribute("src", newImage);
            ramenDetailName.innerText = newName;
            ramenDetailRestaurant.innerText = newRestaurant;
            commentDisplay.innerText = newComment; 
            ratingDisplay.innerText = newRating;
        })
    })
})