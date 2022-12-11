const events = document.querySelector(".events")

// Event
const renderEvent = (data, id) => {
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
                <h4>${data.eventDate}</h4>
            </div>
            <div class="post__summary">
                <p>${data.eventInfo}</p>
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

    events.innerHTML += html;
};

// // Remove event
const removeEvent = (id) => {
    const event = document.querySelector(`.event[data-id=${id}]`);
    event.remove();
}