document.addEventListener("DOMContentLoaded", function() {
    function fetchRamens() {
        fetch("http://localhost:3000/ramens")
        .then (response => response.json())
        .then (data => {
            // console.log(data);
            renderRamens(data)
        }) 
    }
    fetchRamens();

    const ramenMenu = document.getElementById("ramen-menu");
    const detailImage = document.querySelector(".detail-image");
    const ramenName = document.querySelector(".name");
    const ramenRestaurant = document.querySelector(".restaurant");
    const ramenRating = document.querySelector("#rating-display");
    const ramenComment = document.querySelector("#comment-display");
    const ramenForm = document.querySelector("#new-ramen");

    function renderRamens(ramens) {
        ramens.forEach(function(singleRamenObj) {
            // console.log(singleRamenObj);
            const ramenImage = document.createElement("img");
            ramenImage.setAttribute("src", singleRamenObj.image);
            ramenImage.setAttribute("id", singleRamenObj.id);
            // console.log(ramenImage);
            ramenMenu.appendChild(ramenImage);
            ramenImage.addEventListener("click", function displayDetail() {
                // console.log(detailImage);
                detailImage.setAttribute("src", singleRamenObj.image);
                ramenName.innerText = singleRamenObj.name;
                ramenRestaurant.innerText = singleRamenObj.restaurant;
                ramenRating.innerText = singleRamenObj.rating;
                ramenComment.innerText = singleRamenObj.comment;
            })
        })
    }
    ramenForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const newName = document.querySelector("#new-name").value;
        const newRestaurant = document.querySelector("#new-restaurant").value;
        const newImage = document.querySelector("#new-image").value;
        const newRating = document.querySelector("#new-rating").value;
        const newComment = document.querySelector("#new-comment").value;
        // console.log(newName,newRestaurant,newImage,newRating,newComment);
        const newRamenImage = document.createElement("img");
        newRamenImage.setAttribute("src", newImage);
        // console.log(newRamenImage);
        ramenMenu.appendChild(newRamenImage);
        newRamenImage.addEventListener('click', function() {
            detailImage.setAttribute("src", newImage);
            ramenName.innerText = newName;
            ramenRestaurant.innerText = newRestaurant;
            ramenRating.innerText = newRating;
            ramenComment.innerText = newComment;
        })
    })
})