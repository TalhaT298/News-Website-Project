const loadData = async () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url);
    const data = await res.json();
    displayData(data.data.news_category);


}

const displayData = (allCatagory) => {




    const catagories = document.getElementById('catagories');

    allCatagory.forEach(catagory => {

        const newDiv = document.createElement('div');
        newDiv.classList.add('row');
        newDiv.innerHTML = ` <div onclick="loadNewsDetail(${catagory.category_id})" class="col text-primary" >${catagory.category_name}</div> `;
        catagories.appendChild(newDiv)
    });

}

const loadNewsDetail = async (category_id) => {
    const url = `https://openapi.programming-hero.com/api/news/category/0${category_id} `;
    const res = await fetch(url);
    const data = await res.json();
    displayNews(data.data);

}

const displayNews = (allNews) => {

    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ``;
    allNews.forEach(news => {
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('col');
        newsDiv.innerHTML = `

                    <div class="card">
                        <img src="${news.image_url}" class="card-img-top img-fluid" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${news.title}</h5>
                            <p class="card-text">${news.details.slice(0, 300)}...</p>
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

                        <div><button class="btn btn-primary">Open Modal</button></div>

                    </div>
                    </div>


`;
        newsContainer.appendChild(newsDiv);



    })



}

loadData();