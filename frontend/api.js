const endpoint = "http://localhost/apiconfig/api/";


try {
  const loginform = document.querySelector("#loginform");
  loginform.addEventListener("submit", login);
} catch (e) {}

try {
  const Form = document.querySelector("#Form");
  Form.addEventListener("submit", register);
} catch (e) {}

try {
  const profileForm = document.querySelector("#profileForm");
  profileForm.addEventListener("submit", NewProfile);
} catch (e) {}

try {
  const logoutButton = document.querySelector("#logout");
  logoutButton.addEventListener("click", logout);
} catch (e) {}

try {
  const newTweetsBtn = document.querySelector("#create_tweets");
  newTweetsBtn.addEventListener("click", createNewTweets);
} catch (e) {}

try {
  const deleteBtn = document.querySelector("#deleteBtn");
  deleteBtn.addEventListener("click", handleDeleteTweet);
} catch (e) {}

function getCookie(user_profile) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${user_profile}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

function getUser() {
  fetch(endpoint + "gettweet.php?id=" + getCookie("users_id"))
    .then((response) => response.json())
    .then((data) => {
      document.querySelector("#user_profile").innerHTML =
        data.users.firstname + " " + data.users.lastname;
      console.log(data);
    });
}

function checkSession() {
  const userIDCookie = getCookie("users_id");
  if (userIDCookie) {
    window.location.replace("home.html");
  }
}

function checkLoggedInStatus() {
  const userIDCookie = getCookie("users_id");
  console.log(userIDCookie);
  if (!userIDCookie) {
    window.location.replace("login.html");
  }
}


// Post Functions
function createNewTweets() {
  const content = document.querySelector("#newtweets").value;
  fetch(endpoint + "createtweet.php", {
    method: "POST",
    headers: {
      "Content-Type": "text/javascript; charset=utf-8",
    },
    body: JSON.stringify({
      content: content,
      user_id: getCookie("users_id"),
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      document.querySelector("#newtweets").value = "";
      getTweets();
    });
}

function getTweets() {
  fetch(endpoint + "gettweet.php")
    .then((response) => response.json())
    .then((data) => {
      let postHTML = "";
      data.forEach((tweets) => {
        postHTML += `
            <div class="card mt-4">
            <div class="card-body">
              <p class="fw-bold">${tweets.user_id} ${tweets.date_tweeted}</p>
              <p>${tweets.content}</p>
            </div>
          </div>
            `;
      });
      document.querySelector("#newsfeed").innerHTML = postHTML;
    });
}


function handleDeleteTweet(tweetId) {
  // Confirm the deletion with the user
  if (confirm("Are you sure you want to delete this tweet?")) {
      const data = {
          tweet_id: tweetId
      };

      fetch(endpoint + "deletetweet.php", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
      })
      .then(response => response.json())
      .then(result => {
          if (result.success) {
              console.log("Tweet deleted successfully.");
              const tweetElement = document.getElementById("tweet-" + tweetId);
              tweetElement.remove();
          } else {
              console.error("Error deleting tweet:", result.message);
          }
      });
  }
}



function login(event) {
  event.preventDefault();

  // get form data
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  fetch(endpoint + "login.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // Store user session in a cookie
        document.cookie = `user_id=${data.user_id}; expires=Thu, 18 Dec 2099 12:00:00 GMT`;

        window.location.replace("index.html");
      } else {
        alert(data.message);
      }
      
    });
}

function register(event) {
  event.preventDefault();

  // get form data
  const email = document.querySelector("#email").value;
  const firstname = document.querySelector("#firstname").value;
  const lastname = document.querySelector("#lastname").value;
  const birthdate = document.querySelector("#birthdate").value;
  const password = document.querySelector("#password").value;
  const confirm_password = document.querySelector("#confirm_password").value;

  
  if (password === confirm_password) {
    fetch(endpoint + "register.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        firstname: firstname,
        lastname: lastname,
        birthdate: birthdate,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Registration successful!");
          window.location.replace("login.html");
        } else {
          alert("Email already exists!");
        }
      });
  } else {
    alert("Passwords do not match!");
  }
}

function logout() {
  fetch(endpoint + "logout.php")
    .then((response) => response.json())
    .then((data) => {
      alert(data.message);

      // Clear session cookies
      document.cookie = `users_id=''; expires=Thu, 18 Dec 1970 12:00:00 GMT`;

      window.location.replace("login.html");
    });
}
