document.addEventListener("DOMContentLoaded", function(){
    // load/render the page
    
    // grab data but does not render on page
    function fetchRamens() {
        // example: jane sends email to sy to specific email address
        fetch("http://localhost:3000/ramens")
        // exmaple: SY recieves the email - .json(): reading over email
        .then (response => response.json())
        // example: jane gets response from SY
        .then (data => {
            // console.log(data); --> should console log to see the data you're working with
            renderRamens(data)
        }) 
    }
    // MUST invoke function to see the data
    fetchRamens();

    // (ramens) is the data from fetchRamens
    function renderRamens(ramens) {

        const form = document.getElementById('new-ramen');
        const ramenMenu = document.getElementById("ramen-menu");
        const restaurant = document.querySelector(".restaurant");
        const selectImage = document.querySelector(".detail-image");
        const ramenName = document.querySelector(".name");
        const rating = document.querySelector("#rating-display");
        const comment = document.querySelector("#comment-display");
  
        // with the data of ramens which is an array of objs & "ramen" is the parameter that's grabbing the single obj in my array of objects
        ramens.forEach(ramen => {       
            const ramenImage = document.createElement("img");
            // setAttribute(takes in attribute name, source of attribute)
            ramenImage.setAttribute("src", ramen.image);
            ramenImage.setAttribute("id", ramen.id);
            // appendChild (parentNode.appendChild(childNode))
            ramenMenu.appendChild(ramenImage);
            // event listener on click of image - callback function of fetchSingleRamenDetail
            ramenImage.addEventListener('click', () => fetchSingleRamenDetail(ramen))
        })

        // fetch details of each single ramen detail by id
        function fetchSingleRamenDetail(ramen) {
            fetch(`http://localhost:3000/ramens/${ramen.id}`)
            .then (response => response.json())
            // use the individual ramen detail and pass in function renderRamen
            .then (data => renderRamen(data))
        }

        // pass in each single individual ramen
        function renderRamen(ramen) {
            // querySelector - grabs FIRST element that matches
            // --> of CLASSNAME of html element (must be string with '.')
            // --> of ID of html element (must be string with '#')

            // setting the attribute of src to ramen.image which is the 'url' from data
            selectImage.setAttribute("src", ramen.image)
            
            // setting the INNERTEXT or value of the information from data
            ramenName.innerText = ramen.name;
            restaurant.innerText = ramen.restaurant;
            rating.innerText = ramen.rating;
            comment.innerText = ramen.comment;
        }

        function logSubmit(event) {
            event.preventDefault();

            // grab all data from the input form by .value
            const newName = document.getElementById("new-name").value;
            const newRestaurant = document.getElementById("new-restaurant").value;
            const newImage = document.getElementById("new-image").value;
            const newRating = document.getElementById("new-rating").value;
            const newComment = document.getElementById("new-comment").value;

            // create image tag element to add to ramen menu
            const ramenImage = document.createElement("img");
            // set attribute to source of image to the link of url that was put in the form
            ramenImage.setAttribute("src", newImage);
            // once image is created, add the newly created image into ramen menu
            ramenMenu.appendChild(ramenImage);

            // add an eventListener so that once you CLICK the newly added image do this...
            // --> callback function to display information into elements that are on the page
            ramenImage.addEventListener('click', function() {
                selectImage.setAttribute('src', newImage);
                ramenName.innerText = newName;
                restaurant.innerText = newRestaurant;
                rating.innerText = newRating;
                comment.innerText = newComment;
            })
        }
        form.addEventListener('submit', logSubmit);
    }
});