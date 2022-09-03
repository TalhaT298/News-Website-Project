const loadData = async () => {
    try {
        const url = `https://openapi.programming-hero.com/api/news/categories`;
        const res = await fetch(url);
        const data = await res.json();
        displayData(data.data.news_category);

    }
    catch {

        console.log(error);
    }

}



const displayData = (allCatagory) => {




    const catagories = document.getElementById('catagories');

    allCatagory.forEach(catagory => {

        const newDiv = document.createElement('div');
        newDiv.classList.add('row');

        newDiv.innerHTML = ` <div onclick="loadNewsDetail(${catagory.category_id})" class="col text-dark fw-bold" >${catagory.category_name}</div> `;
        catagories.appendChild(newDiv)
    });

}


const loadNewsDetail = async (category_id) => {
    try {
        toggleSpinner(true);//spinner function parameter
        const url = `https://openapi.programming-hero.com/api/news/category/0${category_id} `;
        const res = await fetch(url);
        const data = await res.json();
        displayNews(data.data);
    }

    catch {

        console.log(error);
    }

}

const displayNews = (allNews) => {

    allNews.sort((a, b) => {
        return b.total_view - a.total_view;
    });

    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ``;

    const count = allNews.length;
    const countNews = document.getElementById('count-news');
    if (count !== 0) {
        countNews.innerHTML = `
    
    <h3 class="text-primary">${count} items Found</h3>
    `;

    }

    else {
        countNews.innerHTML = `
    
        <h3 class="text-primary">No news Found</h3>
        `;


    }





    allNews.forEach(news => {


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
                                <h6 class="p-2">${news.author.name ? news.author.name : 'No data'}</h6>
                            </div>
                        </div>
                        <div class="d-flex">
                            <div><i class="p-2 fa-regular fa-eye"></i></div>
                            <div>
                                <h4>${news.total_view ? news.total_view : 'No data'}</h4>
                            </div>
                        </div>

                        <div>
                        <button type="button" onclick="loadNewsDetails('${news._id}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Modal
                    </button>

                    </div>
                    </div>


`;
        newsContainer.appendChild(newsDiv);



    })

    toggleSpinner(false);////spinner function parameter

}

const loadNewsDetails = async news_id => {
    try {
        const url = `https://openapi.programming-hero.com/api/news/${news_id}`;

        const res = await fetch(url);
        const data = await res.json();
        displayLoadNewsDetails(data.data[0]);


    }

    catch {

        console.log(error);
    }
}

const displayLoadNewsDetails = (newsDetail) => {

    console.log(newsDetail);

    const modalTitle = document.getElementById('exampleModalLabel');
    modalTitle.innerHTML = `
   
       <h3>${newsDetail.author.name}</h3>
       <p>Published date: ${newsDetail.author.published_date ? newsDetail.author.published_date : 'No Data'}</p>
       `;

    const modalDetails = document.getElementById('modal-body');

    modalDetails.innerHTML = `
       
       <p> ${newsDetail.title ? newsDetail.title : 'No data'}</p>
       
       `;



}

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('spinner');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }

    else {
        loaderSection.classList.add('d-none');
    }
}


loadData();