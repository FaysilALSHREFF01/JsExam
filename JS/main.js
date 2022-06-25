let nameInput = document.getElementById("name");
let emailInput = document.getElementById("email");
let phoneInput = document.getElementById("phone");
let ageInput = document.getElementById("age");
let passwordInput = document.getElementById("password");
let rePasswordInput = document.getElementById("rePassword");
let submitBtn = document.getElementById("submitBtn");
let nameIsValid,emailIsValid,phoneIsValid,ageIsValid,passwordIsValid,rePasswordIsValid;
let allMoviesInput = document.getElementById("allMovies");
let searchInput = document.getElementById("search");
let result = [];

//when website start get this api 
(function startApi() {
    let navWidth = $(".menu-nav").innerWidth();

    $(".slider").animate({"left":`-${navWidth}`},10)
    let api = "https://api.themoviedb.org/3/trending/all/day?api_key=2e2b06004fc63104ea5062a6abe9d1e6"
    getMovies(api, ".post");

}
)();
$(document).ready(function(){
    $("#loading").fadeOut(1500,function(){
        $("#loading").remove();
        $("body").css("overflow-y","auto");
    });
});
//when click on any link from nav get this api 
$(".nav-category").click(function (e) {
    let category = $(e.target).attr("id")
   if(category!=`notApi`)
{
    if (category == `trending`) {
        let api = "https://api.themoviedb.org/3/trending/all/day?api_key=2e2b06004fc63104ea5062a6abe9d1e6"
        getMovies(api, ".post");

    }
    else {
        let api = `https://api.themoviedb.org/3/movie/${category}?api_key=2e2b06004fc63104ea5062a6abe9d1e6`
        getMovies(api, ".post");

    }
}
});

// bring data from api
async function getMovies(API, cartoon) {

    let response = await fetch(API);
    result = await response.json();
    result = await result.results
    displayMovies(result, cartoon)
};



function displayMovies(moviesList, cartoon) {

    let box = ``;
    for (let i = 0; i < moviesList.length; i++) {
        box += `  

<div class="col-lg-4 col-md-6 h-100 p-3  shadow">
<div class="movie shadow rounded position-relative overflow-hidden">
    <div class="item">
        <img src="https://image.tmdb.org/t/p/w500/${moviesList[i].poster_path}" class="w-100" alt="movie image">
        <div class="layer d-flex align-items-center justify-content-center">
            <div class="movie-info text-center">
            <h2>${moviesList[i].original_title}</h2>
            <p>${moviesList[i].overview}</p>
            <p>${moviesList[i].vote_average}</p>
            <p>${moviesList[i].release_date}</p>
            </div>
        </div>
    </div>

</div>
</div>



   
    `

    };

    $(cartoon).html(box);
};

// document.addEventListener("resize",function(){})
// slider
$(".header-toggel-menu").click(function () {
    let sliderLeft = $(".slider").css("left")
    let navWidth = $(".menu-nav").innerWidth();
    let headerNavLeft = $(".header-nav").css("left")
    console.log(sliderLeft);

    if (sliderLeft == `0px`) {
        $(".slider").animate({ "left": `-${navWidth}` }, 500)
        $(".header-toggel-menu i").attr("class", "fa fa-align-justify")

        $(`.item1`).animate({ "padding-top": "500px", "opacity": "0" }, 1000)
        $(`.item2`).animate({ "padding-top": "500px", "opacity": "0" }, 1000)
        $(`.item3`).animate({ "padding-top": "500px", "opacity": "0" }, 1000)
        $(`.item4`).animate({ "padding-top": "500px", "opacity": "0" }, 1000)
        $(`.item5`).animate({ "padding-top": "500px", "opacity": "0" }, 1000)
        $(`.item6`).animate({ "padding-top": "500px", "opacity": "0" }, 1000)
    }
    else {
        $(".header-toggel-menu i").attr("class", "fa fa-align-justify fa-times")
        $(".slider").animate({ "left": `0px` }, 500, function () {
            $(`.item1`).animate({ "padding-top": "25px", "opacity": "1" }, 1200)
            $(`.item2`).animate({ "padding-top": "25px", "opacity": "1" }, 1200)
            $(`.item3`).animate({ "padding-top": "25px", "opacity": "1" }, 1200)
            $(`.item4`).animate({ "padding-top": "25px", "opacity": "1" }, 1200)
            $(`.item5`).animate({ "padding-top": "25px", "opacity": "1" }, 1200)
            $(`.item6`).animate({ "padding-top": "25px", "opacity": "1" }, 1200)

        })

    }
});

//get movies by word
allMoviesInput.addEventListener("input", function () {

    let keyWord = this.value;
    keyWord = keyWord.replace(/\s/g, "+");
    let API = `https://api.themoviedb.org/3/search/movie?api_key=2e2b06004fc63104ea5062a6abe9d1e6&query=${keyWord}`;
    getMovies(API, ".post");
});



// search in list(
searchInput.addEventListener("input", function () {
    let cartoon=`.res`
    let searchWord = this.value
    // console.log();
    let searchList = [];
    for (let i = 0; i < result.length; i++) {
        // console.log(result[i].original_title.includes( this.value));
        try {
            if (result[i].original_title.toLowerCase().includes(searchWord.toLowerCase()) == true) {
                searchList.push(result[i])
            }
        }
        catch (e) {
            if (result[i].name.toLowerCase().includes(searchWord.toLowerCase()) == true) {
                searchList.push(result[i])
            }
        }

    }
    //call fun and send list and div class
    displayMovies(searchList, cartoon)
})



//validation
// namevalid
nameInput.addEventListener("input",function (){
    // console.log(1);
    let nameAlert =document.getElementById("nameAlert");
    let regex=/^[A-Za-z]{3,10}(\s?[A-Za-z]{3,10})?$/;
    if(regex.test(nameInput.value)==true && nameInput.value!="")
    {
        console.log(1);
        nameAlert.classList.replace("d-block", "d-none");
        nameIsValid= true;
        inputsValid();
    }
    else
    {
        // console.log(nameAlert);
        nameAlert.classList.replace("d-none", "d-block");
        nameIsValid= false;
        inputsValid();
    }
});
// emailvalid
emailInput.addEventListener("input",function (){
    let emailAlert =document.getElementById("emailAlert");
    let regex=/\S+@\S+\.\S+/;
    if(regex.test(emailInput.value)==true && emailInput.value!="")
    {
        emailAlert.classList.replace("d-block", "d-none");
        emailIsValid= true;
        inputsValid();

    }
    else
    {
        emailAlert.classList.replace("d-none", "d-block");
        emailIsValid= false;
        inputsValid();
    }
}
)
//phoneValid
///^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
phoneInput.addEventListener("input",function (){
    let phoneAlert =document.getElementById("phoneAlert");
    let regex=/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    if(regex.test(phoneInput.value)==true && phoneInput.value!="")
    {
        phoneAlert.classList.replace("d-block", "d-none");
        phoneIsValid= true;
        inputsValid();
    }
    else
    {
        // console.log(phoneAlert);
      
        phoneAlert.classList.replace("d-none", "d-block");
        phoneIsValid= false;
        inputsValid();
    }
}
)
ageInput.addEventListener("input",function (){
    let ageAlert =document.getElementById("ageAlert");
    let regex=/^\S[0-9]{0,3}$/;
    if(regex.test(ageInput.value)==true && ageInput.value!="")
    {
        ageAlert.classList.replace("d-block", "d-none");
        ageIsValid= true;
        inputsValid();
        
    }
    else
    {
        ageAlert.classList.replace("d-none", "d-block");
        ageIsValid= false;
        inputsValid();
    }
}
)
// passwordvalid
passwordInput.addEventListener("input",function (){
    let passwordAlert =document.getElementById("passwordAlert");
    let regex=/^[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    if(regex.test(passwordInput.value)==true && passwordInput.value!="")
    {
        passwordAlert.classList.replace("d-block", "d-none");
        passwordIsValid= true;
        rePasswordInput.removeAttribute(`disabled`)
        inputsValid();
    }
    else
    {
        passwordAlert.classList.replace("d-none", "d-block");
        passwordIsValid= false;
        inputsValid();
    }
})
// 
// passwordvalid
rePasswordInput.addEventListener("input",function (){
    let rePasswordAlert =document.getElementById("rePasswordAlert");
    let regex=/^[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    if(regex.test(rePasswordInput.value)==true && rePasswordInput.value==passwordInput.value)
    {
        rePasswordAlert.classList.replace("d-block", "d-none");
        rePasswordIsValid= true;
        inputsValid();
    }
    else
    {
        rePasswordAlert.classList.replace("d-none", "d-block");
        rePasswordIsValid= false;
        inputsValid();
    }
})


function inputsValid(){
    if(nameIsValid==true && emailIsValid==true && phoneIsValid==true&& ageIsValid==true&& passwordIsValid==true&& rePasswordIsValid==true)
{
    submitBtn.removeAttribute(`disabled`)
}
else
{
    submitBtn.setAttribute('disabled','')
}
}


// // scroll
// $(".nav-category").click(function(e){
//     let linkHref = $(e.target).attr('href');
//     console.log(linkHref);
//         let sectionOffset =$(linkHref).offset().top;
//         console.log(sectionOffset);
//     $("html,body").animate({screenTop:sectionOffset},2500)
// })