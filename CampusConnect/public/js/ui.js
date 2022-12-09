document.addEventListener("DOMContentLoaded", function () {
    var modals = document.querySelectorAll(".modal");
    M.Modal.init(modals);
  
    var items = document.querySelectorAll(".collapsible");
    M.Collapsible.init(items);
});  

/*====== EVENT TABS ======*/
const tabs = document.querySelectorAll('[data-target]'),
      tabContents = document.querySelectorAll('[data-content]')

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = document.querySelector(tab.dataset.target)

        tabContents.forEach(tabContent => {
            tabContent.classList.remove('event__active')
        })
        target.classList.add('event__active')

        tabs.forEach(tab => {
            tab.classList.remove('event__active')
        })
        tab.classList.add('event__active')
    })
});


const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');

const setupUI = (user) => {
    if (user) {
        // Toggle UI elements
        loggedOutLinks.forEach(item => item.style.display = 'none');
        loggedInLinks.forEach(item => item.style.display = 'block');
    } else {
        // Toggle UI elements
        loggedOutLinks.forEach(item => item.style.display = 'block');
        loggedInLinks.forEach(item => item.style.display = 'none');
    }
}


// // Populate Data
// const setupAnnouncements = (data) => {
//     let html = '';
//     data.forEach((doc) => {
//         const announcement = doc.data();
//         const li = `
//         <div class="post__header">
//             <div class="post__author">
//                 <h3>Group Name</h3>
//             </div>
//         </div>
//         <div class="post__body">
//             <div class="post__title">
//                 <h1>${data.title}</h1>
//             </div>
//             <div class="post__summary">
//                 <p>${data.information}</p>
//             </div>
//         </div>
//         <div class="post__footer">
//             <ul>
//                 <li class="post__date">${data.time}</li>
//             </ul>
//         </div>
//         `;
//         html += li;
//     });
//     setupAnnouncements.innerHTML = html;
// }



const prayer = document.querySelector(".prayer")

document.addEventListener("DOMContentLoader", function () {
    // Add prayer 
    const forms = document.querySelectorAll(".prayer-form");
});

// Prayer Requests
const renderPrayer = (data, id) => {
    const html = `
    <div class="post__header" data-id="${id}">
        <div class="post__author">
            <h3>${data.name}</h3>
        </div>
    </div>
    <div class="post__body">
        <div class="post__title">
            <h1>${data.title}</h1>
        </div>
        <div class="post__summary">
            <p>${data.request}</p>
        </div>
    </div>
    <div class="post__footer">
        <ul>
            <li class="post__date"></li>
        </ul>
    </div>
    `;

    prayer.innerHTML += html;
};

const announcements = document.querySelector(".announcements")

// document.addEventListener("DOMContentLoader", function () {
//     // Add announcement 
//     const forms = document.querySelectorAll(".announcement-form");
// });

// Announcement
const renderAnnouncement = (data, id) => {
    const html = `
    <div class="post__container" data-id="${id}">
        <div class="post__header">
            <div class="post__author">
                <h3>Group Name</h3>
            </div>
        </div>
        <div class="post__body">
            <div class="post__title">
                <h1>${data.title}</h1>
            </div>
            <div class="post__summary">
                <p>${data.information}</p>
            </div>
        </div>
        <div class="post__footer">
            <ul>
                <li class="post__date">${data.time}</li>
            </ul>
        </div>      
    </div>
    `;

    announcements.innerHTML += html;
};

// // Remove announcement
const removeAnnouncement = (id) => {
    const announcement = document.querySelector(`.announcement[data-id=${id}]`);
    announcement.remove();
}

const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener("click", () => {
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
    container.classList.remove("sign-up-mode");
});