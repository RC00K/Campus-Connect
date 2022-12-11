// /*====== EVENT TABS ======*/
// Add later for when users join a group a new tab will be created for that group
// const tabs = document.querySelectorAll('[data-target]'),
//       tabContents = document.querySelectorAll('[data-content]')

// tabs.forEach(tab => {
//     tab.addEventListener('click', () => {
//         const target = document.querySelector(tab.dataset.target)

//         tabContents.forEach(tabContent => {
//             tabContent.classList.remove('event__active')
//         })
//         target.classList.add('event__active')

//         tabs.forEach(tab => {
//             tab.classList.remove('event__active')
//         })
//         tab.classList.add('event__active')
//     })
// });

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
