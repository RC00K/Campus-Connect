const prayers = document.querySelector(".prayers")

// Prayer
const renderPrayer = (data, id) => {
    console.log(data);
    const html = `
    <div class="post__container" data-id="${id}">
        <div class="post__header">
            <div class="post__author">
                <h3>User Name</h3>
            </div>
        </div>
        <div class="post__body">
            <div class="post__title">
                <h4>${data.prayerTitle}</h4>
            </div>
            <div class="post__summary">
                <p>${data.prayerInfo}</p>
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

    prayers.innerHTML += html;
};

// // Remove prayer
const removePrayer = (id) => {
    const prayer = document.querySelector(`.prayer[data-id=${id}]`);
    prayer.remove();
}