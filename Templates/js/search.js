window.onload = async function getBlogl() {
	const ref = await firebase.database().ref('Blog')
	ref.on('value', getData, errorData)
}
let all_blogs = [];
async function getData(data) {
    blogs  = data.val()
	const keys = Object.keys(blogs)
    for (let i = 0; i < keys.length; i++) {
        const k = keys[i]
        const imgurl = await firebase.storage().ref(`BlogImage/${k}/blog.jpg`).getDownloadURL()
        const blog = {Id:k,title:blogs[k].Title,desc:blogs[k].Descripttion,date:blogs[k].Date,intro:blogs[k].Introduction,cont:blogs[k].Content,img:imgurl}
        all_blogs.push(blog)
    } 
}
function errorData(error) {
	console.log(error.message)
}

const search_input = document.getElementById('search');
const results = document.getElementById('results');

let search_term = '';
let list_blogs;
function getBlog(){
    list_blogs = all_blogs;
}
const showBlogs = async () => {
    // clearHTML
    results.innerHTML = '';
    
    // getting the data
    await getBlog();
    
    // creating the structure
    const ul = document.createElement("ul");
    ul.classList.add('all_blogs');
    
    list_blogs.filter(
        blog => blog.title.toLowerCase().includes(search_term.toLowerCase())
    ).forEach(blog => {
        const li = document.createElement('li');
        li.setAttribute('onclick', 'sendBlog(event)')
        li.classList.add('blog-item');

        const id = document.createElement('h5')
        id.setAttribute('hidden', true)
        id.innerText = blog.Id;

        const blog_img = document.createElement('img');
        blog_img.src = blog.img;
        blog_img.classList.add('blog-img');

        const blog_title = document.createElement('h2');
        blog_title.innerText = blog.title;
        blog_title.classList.add('blog-title');

        const desc =  document.createElement('h3');
        desc.setAttribute('hidden', true)
        desc.innerText = blog.desc;

        const intro = document.createElement('p');
        intro.setAttribute('hidden', true)
        intro.innerText = blog.intro;

        const cont = document.createElement('p');
        cont.setAttribute('hidden', true)
        cont.innerText = blog.cont;
        
        
        
                
        li.appendChild(blog_img);
        li.appendChild(blog_title);
        li.appendChild(id)
        li.appendChild(desc);
        li.appendChild(intro);
        li.appendChild(cont)
        ul.appendChild(li);
    })
    results.appendChild(ul);
}

// display initial all_blogs
showBlogs();

search_input.addEventListener('input', (e) => {
    search_term = e.target.value;
    // re-display all_blogs again based on the new search_term
    showBlogs();
});


function sendBlog(event) {
    const info = event.currentTarget
	const img = info.querySelector('img').src
	const title = info.querySelector('.blog-title').innerText
	const desc = info.querySelector('h3').innerText
	const intro = info.querySelectorAll('p')[0].innerText
	const cont = info.querySelectorAll('p')[1].innerText
	const id = info.querySelector('h5').innerText
	window.location.href = `sblog.html?img=${encodeURIComponent(img)}&title=${title}&desc=${desc}&intro=${intro}&cont=${cont}&id=${id}`

}