const announcements = document.querySelector(".announcements")

// Announcement
const renderAnnouncement = (data, id) => {
    console.log(data);
    const html = `
    <div class="post__container" data-id="${id}">
        <div class="post__header">
            <div class="post__author">
                <h3>Group Name</h3>
            </div>
        </div>
        <div class="post__body">
            <div class="post__title">
                <h4>${data.announceTitle}</h4>
            </div>
            <div class="post__summary">
                <p>${data.announceInfo}</p>
            </div>
        </div>
        <div class="post__footer">
            <ul>
                <div class="delete">
                    <button class="button" data-id="${id}">Delete</button>
                </div>
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