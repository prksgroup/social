{
    console.log('jkndn');
    let commentcreate = function() {
        let newcommentform = $('#comment-post');

        newcommentform.submit(function(event) {
            event.preventDefault();

            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: newcommentform.serialize(),
                success: function(data) {
                    console.log(data);
                    let newcomment = newcommentdom(data.data.comments);
                    $('#comment-div>ul').prepend(newcomment);
                },
                error: function(err) {
                    console.log(err, 'ERROR ');
                }

            })
        })
    }

    let newcommentdom = function(comment) {
        return $(`<li id="comment-li-${comment._id}">

        <p>
                <small>
                    <a href="/comments/destroy/${comment._id}">X</a>
                </small>
               
                ${comment.content}
        </p>
    
    </li>`)
    }

    commentcreate();
}