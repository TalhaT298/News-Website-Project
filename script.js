const loadData = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayData(data.data.news_category);
};

const displayData = (allCatagory) => {

    const catagories = document.getElementById('catagories');

    allCatagory.forEach(catagory => {

        const newDiv = document.createElement('div');
        newDiv.classList.add('row');
        newDiv.innerHTML = ` <div onclick="loadNewsDetails(${catagory.category_id})" class="col text-primary" >${catagory.category_name}</div> `;
        catagories.appendChild(newDiv);
    });
};

const loadNewsDetails = category_id => {
    toggleSpinner(true);
    loadNewsDetail(category_id);
};

const loadNewsDetail = async (category_id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/0${category_id} `;
    const res = await fetch(url);
    const data = await res.json();
    displayNews(data.data);

};
// Default news show
loadNewsDetail(1);

const displayNews = (allNews) => {

    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ``;
    allNews.forEach(news => {
        // console.log(news._id);
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('col');
        newsDiv.innerHTML = `

                    <div class="card">
                        <img src="${news.image_url}" class="card-img-top img-fluid" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${news.title}</h5>
                            <p class="card-text">${news.details.slice(0, 200)}...</p>
                        </div>
                        <div class="d-flex p-3 justify-content-between">
                        <div class="d-flex">
                            <div><img class="image align-middle img-fluid rounded-circle" src="${news.author.img}"></div>
                            <div>
                                <h6 class="p-2">${news.author.name}</h6>
                            </div>
                        </div>
                        <div class="d-flex">
                            <div><i class="p-2 fa-regular fa-eye"></i></div>
                            <div>
                                <h4>${news.total_view}</h4>
                            </div>
                        </div>

                        <div>
                        <!-- Button trigger modal -->
   
                        <button onclick="newsDetails('${news._id}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                            Open Modal
                        </button>

                        </div>
                    </div>
                    </div>`;
        newsContainer.appendChild(newsDiv);
    });
    toggleSpinner(false);

};
loadData();

const newsDetails = (id) => {
    loadNewsModals(id);
};

const loadNewsModals = async (id) => {
    const url = `https://openapi.programming-hero.com/api/news/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayModals(data);
};

const displayModals = (data) => {
    const modal = document.getElementById('modal-id');
    modal.innerHTML = `
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">${data.data[0].title}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
          <img src="${data.data[0].image_url}" class="w-100">
            <p>${data.data[0].details}</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
          </div>
    `;


    console.log(data.data[0].image_url);
    console.log(data.data[0].title);
    console.log(data.data[0].details);
};

loadNewsModals('0282e0e58a5c404fbd15261f11c2ab6a');



const toggleSpinner = (isSpin) => {
    const loaderSpinner = document.getElementById('loader');
    if(isSpin) {
        loaderSpinner.classList.remove('d-none');
    } else {
        loaderSpinner.classList.add('d-none');
    }
}; 