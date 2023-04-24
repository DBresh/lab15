async function fetchQ(page) {
    let link =
        "https://api.unsplash.com/photos/?client_id=ab3411e4ac868c2646c0ed488dfd919ef612b04c264f3374c97fff98ed253dc9&page=";
    link += page;
    const users = await fetch(link);
    const json = await users.json();
    return json;
}

let namesArr = 0;
let smallPhotosArr = 0;

async function main() {
    const gUsers = await fetchQ(1);
    createUsers(gUsers, 0, 10);
}

main();

function createUsers(gUsers, MainList1) {
    if (MainList1) {
        MainList1.remove();
    }
    const app = document.getElementById("app");
    const MainList = document.createElement("div");
    MainList.classList.add("main");
    MainList.id = "main";
    app.appendChild(MainList);
    for (let i = 0; i < 10; i++) {
        CreateUser(gUsers, i, 0, MainList);
    }
}

function CreateUser(gUsers, index, typeOfWork, MainList) {
    const User = document.createElement("div");
    User.classList.add("user");
    User.id = gUsers[index].id;
    if (typeOfWork != 1) {
        User.addEventListener("click", () => OpenPost(gUsers, index, MainList));
    }
    MainList.appendChild(User);

    if (typeOfWork == 1) {
        const BackArrow = document.createElement("div");
        BackArrow.classList.add("arrow-back");
        BackArrow.addEventListener("click", () =>
            createUsers(gUsers, MainList)
        );
        User.appendChild(BackArrow);
    }

    const PhotoDiv = document.createElement("div");
    PhotoDiv.classList.add("photo");
    User.appendChild(PhotoDiv);
    const ProfileImage = document.createElement("img");
    ProfileImage.classList.add("profile-image");
    ProfileImage.src = gUsers[index].user.profile_image.medium;
    PhotoDiv.appendChild(ProfileImage);

    const NameDiv = document.createElement("div");
    NameDiv.classList.add("name");
    User.appendChild(NameDiv);
    const Name = document.createElement("p");
    Name.textContent = gUsers[index].user.username;
    NameDiv.appendChild(Name);
}

function OpenPost(gUsers, index, MainList1) {

    
    for (let i = 0; i < 10; i++){
        const buf = document.getElementById(gUsers[i].id)
        buf.remove()
    }
    CreateUser(gUsers, index, 1, MainList1);
    
    const Main = document.getElementById("main");
    PostDiv = document.createElement("div");
    PostDiv.classList.add("postdiv");
    Main.appendChild(PostDiv);
    Post = document.createElement("img");
    Post.classList.add("post");
    Post.src = gUsers[index].urls.regular;
    PostDiv.appendChild(Post);
}
