{
    let createpost = function() {
            let newpostform = $('#new-post-form');

            newpostform.submit(function(event) {
                event.preventDefault();

                $.ajax({
                    type: 'post',
                    url: '/post/create',
                    data: newpostform.serialize(),
                    success: function(data) {
                        let newpost = newpostdom(data.data.post);

                        $('#post-list-container>ul').prepend(newpost);
                        deletepost($(' .delete-post-button', newpost));
                    },
                    error: function(err) {
                        console.log(err);
                    }
                })
            })

        }
        //creating a post in DOM
    let newpostdom = function(post) {
            return $(`<li id="new-post-${post._id}">

        <p>
           
                <small>
                        <a class="delete-post-button" href="/post/destroy/${post._id}">X</a>
                    </small>
            
                    ${post.content}
                        <br>
                        <small>
                        ${post.user.name}
            </small>
        </p>
    
        <div>
           
                <form action="/comments/create" method="POST">
                    <input type="text" name="content" placeholder="Add comment">
                    <input type="hidden" name="post" value="${post._id}">
                    <input type="submit" value="Comment">
                </form>
    
              
        </div>
    
        <div>
            <ul id="post-comments-${post._id}">
               
            </ul>
        </div>
    </li>`)
        }
        //method to delete a post using AJAX from DOM
    let deletepost = function(deleteLink) {
        $(deleteLink).click(function(event) {
            event.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data) {
                    $(`#post-${data.data.post._id}`).remove();
                },
                error: function(err) {
                    console.log(err);
                }
            })
        })
    }

    createpost();
}