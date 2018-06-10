/* global $ JS_PAGE Cookies */

let getAllArticles = `
    query AllArticles {
        allArticles {
            id,
            title,
            content
        }
    }
`;

let getArticle = `
    query GetArticle($id: ID) {
        Article(id: $id) {
            title,
            content
        }
    }
`;

let CreateArticle = `
    mutation CreateArticle($authorId: ID!, $title: String!, $content: String) {
        createArticle(authorId: $authorId, title: $title, content: $content) {
            id,
            title
        }
    }
`;

$(document).ready(function() {
    // List View
    if (typeof JS_PAGE !== 'undefined' && JS_PAGE == 'list_view') {
        $.post({
            url: 'https://api.graph.cool/simple/v1/cjhjstyqy94i60177o216azno',
            data: JSON.stringify({
                query: getAllArticles
            }),
            success: (response) => {
                let articles = response.data.allArticles;
                let html = '';
                for (let article of articles) {
                    html += `
                        <h2>
                            <a href="article_detail.html#${article.id}">
                                ${article.title}
                            </a>
                        </h2>
                        <p>${article.content}</p>
                    `;
                }
                $('#main-content').html(html);
            },
            contentType: 'application/json'
        });
    }
    
    // Detail View
    if (typeof JS_PAGE !== 'undefined' && JS_PAGE == 'detail_view') {
        let article_id = window.location.hash.substring(1);
        console.log('Article id is? ' + article_id);
        $.post({
            url: 'https://api.graph.cool/simple/v1/cjhjstyqy94i60177o216azno',
            data: JSON.stringify({
                query: getArticle,
                variables: {
                    id: article_id
                }
            }),
            success: (response) => {
                let article = response.data.Article;
                $('#article-title').html(article.title);
                $('#article-content').html(article.content);
            },
            contentType: 'application/json' 
        });
    }
    
    // Form View
    if (typeof JS_PAGE !== 'undefined' && JS_PAGE == 'form_view') {
        $('#save-article-button').on('click', (event) => {
            event.preventDefault();
            let title = $('#title').val(),
                content = $('#content').val(),
                authorId = Cookies.get('authorId');
                
            $.post({
                url: 'https://api.graph.cool/simple/v1/cjhjstyqy94i60177o216azno',
                data: JSON.stringify({
                    query: CreateArticle,
                    variables: {
                        title: title,
                        content: content,
                        authorId: authorId
                    }
                }),
                headers: {
                    Authorization: 'Bearer ' + Cookies.get('token')
                },
                success: (response) => {
                    let article = response.data.createArticle;
                    window.location = 'article_detail.html#' + article.id; 
                },
                contentType: 'application/json'
            }); 
        });
    }
});
