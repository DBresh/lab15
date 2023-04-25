let PageNumber = 1;

async function fetchQ(page) {
    const link = `https://api.unsplash.com/photos/?client_id=ab3411e4ac868c2646c0ed488dfd919ef612b04c264f3374c97fff98ed253dc9&page=
        ${page === undefined ? 1 : page}`;
    const users = await fetch(link);
    const json = await users.json();
    return json;
}

async function main() {
    if (PageNumber < 1) {
        PageNumber = 10;
    }
    if (PageNumber > 10) {
        PageNumber = 1;
    }
    const gUsers = await fetchQ(PageNumber);
    createUsers(gUsers);
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
    CreatePages();
}

function CreatePages() {
    const MainList = document.getElementById("main");
    const Pages = document.createElement("div");
    Pages.classList.add("pages");
    Pages.id = "pages";
    MainList.appendChild(Pages);

    const ArrowBack = document.createElement("div");
    ArrowBack.classList.add("arrow-back");
    ArrowBack.addEventListener("click", function () {
        PageNumber--;
        MainList.remove();
        main(PageNumber);
    });
    Pages.appendChild(ArrowBack);

    for (let i = 0; i < 10; i++) {
        const Page = document.createElement("div");
        Page.classList.add("page");
        if (i === PageNumber - 1) {
            const buf = document.getElementById("selected-page");
            Page.classList.add("selected-page");
            Page.id = "selected-page";
        }
        Page.addEventListener("click", function () {
            MainList.remove();
            PageNumber = i + 1;
            main(PageNumber);
        });
        Page.textContent = i + 1;
        Pages.appendChild(Page);
    }

    const ArrowForward = document.createElement("div");
    ArrowForward.classList.add("arrow-back");
    ArrowForward.classList.add("arrow-forward");
    ArrowForward.addEventListener("click", function () {
        PageNumber++;
        MainList.remove();
        main(PageNumber);
    });
    Pages.appendChild(ArrowForward);
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
    const buf1 = document.getElementById("pages");
    buf1.remove();
    for (let i = 0; i < 10; i++) {
        const buf = document.getElementById(gUsers[i].id);
        buf.remove();
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

    const LikesDiv = document.createElement("div");
    LikesDiv.id = "likesdiv"
    LikesDiv.classList.add("likesdiv");
    PostDiv.appendChild(LikesDiv);

    const Like = document.createElement("div");
    Like.classList.add("like");
    Like.addEventListener("click", () => SetLike(gUsers, index, PostDiv));
    LikesDiv.appendChild(Like);

    const AmountOfLikes = document.createElement("p");
    AmountOfLikes.classList.add("amountOflikes");
    AmountOfLikes.textContent = gUsers[index].likes;
    LikesDiv.appendChild(AmountOfLikes);
}

function SetLike(gUsers, index, PostDiv) {
    gUsers[index].likes += 1;
    const buf = document.getElementById("likesdiv")
    buf.remove()

    const LikesDiv = document.createElement("div");
    LikesDiv.id = "likesdiv"
    LikesDiv.classList.add("likesdiv");
    PostDiv.appendChild(LikesDiv);

    const Like = document.createElement("div");
    Like.classList.add("like");
    LikesDiv.appendChild(Like);
    Like.classList.add("like-active");

    const AmountOfLikes = document.createElement("p");
    AmountOfLikes.classList.add("amountOflikes");
    AmountOfLikes.textContent = gUsers[index].likes;
    LikesDiv.appendChild(AmountOfLikes);
}
